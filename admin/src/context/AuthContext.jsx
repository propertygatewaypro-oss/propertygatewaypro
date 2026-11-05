import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext(null);

const DEMO_ADMIN = {
  uid: "demo-admin-pg-01",
  email: "admin@propertygateway.in",
  displayName: "Strategy 360 Admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Offline / Local mock mode
      const savedUser = localStorage.getItem('pg_admin_session');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('pg_admin_session');
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } else {
      // Mock / Offline Auth check
      if ((email.trim().toLowerCase() === "admin@propertygateway.in" || email.trim().toLowerCase() === "propertygatewy@gmail.com") && password === "admin123") {
        const sessionUser = {
          ...DEMO_ADMIN,
          email: email.trim().toLowerCase()
        };
        setUser(sessionUser);
        localStorage.setItem('pg_admin_session', JSON.stringify(sessionUser));
        return sessionUser;
      } else {
        throw new Error("Invalid admin credentials. Use demo: admin@propertygateway.in / admin123");
      }
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    setUser(null);
    localStorage.removeItem('pg_admin_session');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: Boolean(user)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
