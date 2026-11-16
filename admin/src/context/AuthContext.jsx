import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  getIdTokenResult
} from 'firebase/auth';
import { formatFirebaseAuthError } from '../utils/authErrors';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Production-level session subscriber via official Firebase SDK
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      // Safety timeout: prevent indefinite spinner on slow/offline networks
      const safetyTimer = setTimeout(() => {
        setLoading(false);
      }, 2500);

      const unsubscribe = onAuthStateChanged(
        auth, 
        async (currentUser) => {
          clearTimeout(safetyTimer);
          try {
            const claims = currentUser ? (await getIdTokenResult(currentUser, true)).claims : null;
            setUser(currentUser);
            setIsAdmin(claims?.admin === true);
          } catch (error) {
            console.error('Could not verify admin claim:', error);
            setUser(null);
            setIsAdmin(false);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          clearTimeout(safetyTimer);
          console.error("Firebase Auth observer error:", error);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      );
      return () => {
        clearTimeout(safetyTimer);
        unsubscribe();
      };
    } else {
      // No demo fallback — pure production initialization state
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
    }
  }, []);

  /**
   * Production Firebase Sign-In with Configurable Persistence (Remember Me)
   */
  const login = async (email, password, rememberMe = true) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error(
        'Firebase is not connected. Please provide production Firebase credentials in your environment variables (VITE_FIREBASE_API_KEY).'
      );
    }

    try {
      // Set session persistence based on "Remember me" checkbox
      try {
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence
        );
      } catch (persistErr) {
        console.warn("Could not set auth persistence:", persistErr);
      }

      const userCredential = await signInWithEmailAndPassword(
        auth, 
        email.trim(), 
        password
      );
      const token = await getIdTokenResult(userCredential.user, true);
      if (token.claims.admin !== true) {
        await fbSignOut(auth);
        throw new Error('This account is not authorized for the admin portal.');
      }
      return userCredential.user;
    } catch (err) {
      if (err.message === 'This account is not authorized for the admin portal.') throw err;
      const friendlyMessage = formatFirebaseAuthError(err);
      throw new Error(friendlyMessage);
    }
  };

  /**
   * Production Firebase Sign-Out
   */
  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    setUser(null);
    setIsAdmin(false);
  };

  /**
   * Production Firebase Password Reset via Email
   */
  const resetPassword = async (email) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error(
        'Firebase is not connected. Please configure your production Firebase environment.'
      );
    }

    if (!email || !email.trim()) {
      throw new Error('Please enter the email address to receive password reset instructions.');
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err) {
      const friendlyMessage = formatFirebaseAuthError(err);
      throw new Error(friendlyMessage);
    }
  };

  /**
   * Securely change Admin Password requiring current password verification
   */
  const changeAdminPassword = async (currentPassword, newPassword) => {
    if (!auth || !auth.currentUser) {
      throw new Error('No authenticated administrator found. Please log in again.');
    }

    if (!currentPassword) {
      throw new Error('Please enter your current password to authorize this change.');
    }

    if (!newPassword || newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long.');
    }

    try {
      const currentUser = auth.currentUser;
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      
      // Step 1: Re-authenticate to prove current ownership
      await reauthenticateWithCredential(currentUser, credential);

      // Step 2: Update password directly in Firebase Authentication
      await updatePassword(currentUser, newPassword);
      return true;
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        throw new Error('Your current password is incorrect. Please verify and try again.');
      }
      const friendlyMessage = formatFirebaseAuthError(err);
      throw new Error(friendlyMessage);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    resetPassword,
    changeAdminPassword,
    isFirebaseConfigured,
    isAuthenticated: Boolean(user && isAdmin)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
