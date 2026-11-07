import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Check,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user, changeAdminPassword } = useAuth();

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Password validation rules
  const isLengthValid = newPassword.length >= 8;
  const isMatchValid = newPassword.length > 0 && newPassword === confirmPassword;

  // Handle Password Update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!isLengthValid) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }

    if (!isMatchValid) {
      setPasswordError('New password and confirmation password do not match.');
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError('New password must be different from your current password.');
      return;
    }

    setPasswordLoading(true);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      setPasswordSuccess('Your administrator password has been updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password. Please check your current password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Security & Password
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your administrator credentials for {user?.email || 'Property Gateway'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium self-start sm:self-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Active Session</span>
        </div>
      </div>

      {/* Main Password Update Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Update Administrator Password</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your current password to authorize, then create a new password of at least 8 characters.
          </p>
        </div>

        {passwordSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">{passwordSuccess}</div>
          </div>
        )}

        {passwordError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">{passwordError}</div>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4" autoComplete="off">
          {/* Hidden dummy inputs to absorb any browser autofill */}
          <input type="text" name="fake_user_to_block_autofill" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="password" name="fake_pwd_to_block_autofill" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name="current_admin_pwd_field"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                autoComplete="new-password"
                data-lpignore="true"
                disabled={passwordLoading}
                className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                tabIndex={-1}
                aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="new_admin_pwd_field"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 8 characters)"
                autoComplete="new-password"
                data-lpignore="true"
                disabled={passwordLoading}
                className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                tabIndex={-1}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_admin_pwd_field"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                autoComplete="new-password"
                data-lpignore="true"
                disabled={passwordLoading}
                className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                tabIndex={-1}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Real-time Checklist */}
          <div className="pt-1 space-y-1.5 text-xs text-slate-500">
            <div className={`flex items-center gap-2 ${isLengthValid ? 'text-emerald-700 font-medium' : 'text-slate-500'}`}>
              <Check className={`w-3.5 h-3.5 ${isLengthValid ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span>At least 8 characters long</span>
            </div>
            <div className={`flex items-center gap-2 ${isMatchValid ? 'text-emerald-700 font-medium' : 'text-slate-500'}`}>
              <Check className={`w-3.5 h-3.5 ${isMatchValid ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span>Passwords match</span>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={passwordLoading || !isLengthValid || !isMatchValid}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              {passwordLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating password...</span>
                </>
              ) : (
                <span>Save New Password</span>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
