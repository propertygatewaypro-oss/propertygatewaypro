/**
 * Maps Firebase Authentication error codes to professional, security-compliant user messages.
 * Prevents account enumeration and provides actionable guidance.
 */
export function formatFirebaseAuthError(error) {
  if (!error) return 'An unexpected authentication error occurred.';
  const code = error.code || '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email address or password. Please verify your credentials and try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid, properly formatted email address.';
    case 'auth/user-disabled':
      return 'This administrator account has been suspended or disabled. Please contact security.';
    case 'auth/too-many-requests':
      return 'Access temporarily blocked due to consecutive failed attempts. Please reset your password or try again later.';
    case 'auth/network-request-failed':
      return 'Network connection failure. Please check your internet connectivity.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    case 'auth/missing-email':
      return 'Please enter your administrator email address.';
    case 'auth/requires-recent-login':
      return 'For security purposes, please re-enter your current password and try again.';
    case 'auth/weak-password':
      return 'The new password is too weak. Please use at least 8 characters with a mix of letters and numbers.';
    case 'auth/email-already-in-use':
      return 'This email address is already in use by another account.';
    case 'auth/operation-not-allowed':
      return 'This operation is not permitted. Please verify your authentication settings.';
    default:
      return error.message || 'Authentication failed. Please check your credentials and try again.';
  }
}
