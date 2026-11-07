import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Home,
  Users,
  Calendar,
  Building2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  // Load remembered admin email from storage
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem('pg_admin_remember_email') || '';
    } catch {
      return '';
    }
  });
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return Boolean(localStorage.getItem('pg_admin_remember_email'));
    } catch {
      return false;
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Pass rememberMe so Firebase Auth sets session persistence (browserLocalPersistence vs browserSessionPersistence)
      await login(email, password, rememberMe);
      
      // Store or clear remembered email
      if (rememberMe) {
        localStorage.setItem('pg_admin_remember_email', email.trim());
      } else {
        localStorage.removeItem('pg_admin_remember_email');
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-[var(--color-canvas)] text-[var(--color-text-primary)] flex flex-col justify-center relative overflow-x-clip selection:bg-[var(--color-accent-gold)]/30 selection:text-white"
    >
      
      {/* Full-width split screen without artificial margins or black side gutters */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 relative z-10">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: HERO SHOWCASE (Desktop Only ≥ 1024px)         */}
        {/* ========================================================= */}
        <div className="hidden lg:flex relative flex-col justify-between p-8 xl:p-14 overflow-hidden border-r border-[var(--color-border)] bg-[var(--color-surface-panel)] min-w-0">
          
          {/* Villa Architecture Twilight Background with warm glow */}
          <div 
            className="absolute inset-0 bg-cover bg-bottom opacity-35 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('/hero-villa.webp')` }}
          />

          {/* Deep Obsidian Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-canvas)] via-[var(--color-canvas)]/85 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-canvas)] via-transparent to-transparent pointer-events-none" />

          {/* Upper Branding Block */}
          <div className="relative z-10 my-auto text-center py-6 xl:py-8 max-w-lg mx-auto w-full">
            
            {/* Architectural Logo Emblem */}
            <div className="inline-flex flex-col items-center">
              <div className="w-18 h-18 xl:w-20 xl:h-20 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-accent-gold)]/40 p-2.5 xl:p-3 shadow-lg flex items-center justify-center mb-4 transition-transform duration-150 motion-reduce:transition-none hover:scale-105">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway" 
                  className="w-full h-full rounded-xl object-contain" 
                />
              </div>

              {/* Brand Title */}
              <h1 className="font-serif text-3xl xl:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] break-words min-w-0">
                Property Gateway
              </h1>

              {/* Natural Sentence-Case Label */}
              <div className="flex items-center justify-center gap-2.5 mt-2">
                <span className="h-[1px] w-6 bg-[var(--color-accent-gold)]/50" />
                <span className="text-xs text-[var(--color-accent-gold)] font-medium">
                  Administration and lead console
                </span>
                <span className="h-[1px] w-6 bg-[var(--color-accent-gold)]/50" />
              </div>

              {/* Tagline */}
              <p className="mt-3 text-xs xl:text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto leading-relaxed">
                Manage verified Chennai properties, buyer inquiries, and site visit bookings.
              </p>
            </div>

            {/* 3 Feature Pills */}
            <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2.5 xl:gap-3.5 max-w-xs xl:max-w-md mx-auto mt-6 xl:mt-8">
              
              {/* Feature 1: Properties */}
              <div className="bg-[var(--color-surface-card)]/80 border border-[var(--color-border)] rounded-2xl p-2.5 xl:p-3.5 text-center shadow-md transition-transform duration-150 motion-reduce:transition-none hover:-translate-y-0.5">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-[var(--color-accent-gold)]/10 border border-[var(--color-accent-gold)]/25 flex items-center justify-center mx-auto mb-1.5 text-[var(--color-accent-gold)]">
                  <Home className="w-4 h-4 xl:w-4.5 xl:h-4.5" aria-hidden="true" />
                </div>
                <span className="block text-xs font-medium text-[var(--color-text-primary)] truncate">
                  Properties
                </span>
              </div>

              {/* Feature 2: Leads */}
              <div className="bg-[var(--color-surface-card)]/80 border border-[var(--color-border)] rounded-2xl p-2.5 xl:p-3.5 text-center shadow-md transition-transform duration-150 motion-reduce:transition-none hover:-translate-y-0.5">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-[var(--color-accent-gold)]/10 border border-[var(--color-accent-gold)]/25 flex items-center justify-center mx-auto mb-1.5 text-[var(--color-accent-gold)]">
                  <Users className="w-4 h-4 xl:w-4.5 xl:h-4.5" aria-hidden="true" />
                </div>
                <span className="block text-xs font-medium text-[var(--color-text-primary)] truncate">
                  Leads
                </span>
              </div>

              {/* Feature 3: Site Visits */}
              <div className="bg-[var(--color-surface-card)]/80 border border-[var(--color-border)] rounded-2xl p-2.5 xl:p-3.5 text-center shadow-md transition-transform duration-150 motion-reduce:transition-none hover:-translate-y-0.5">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-[var(--color-accent-gold)]/10 border border-[var(--color-accent-gold)]/25 flex items-center justify-center mx-auto mb-1.5 text-[var(--color-accent-gold)]">
                  <Calendar className="w-4 h-4 xl:w-4.5 xl:h-4.5" aria-hidden="true" />
                </div>
                <span className="block text-xs font-medium text-[var(--color-text-primary)] truncate">
                  Site visits
                </span>
              </div>

            </div>

          </div>

          {/* Compliance Credit */}
          <div className="relative z-10 text-center py-2 text-[11px] text-[var(--color-text-muted)] font-mono">
            TNRERA Agent: TN/Agent/020/2019
          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: ADMIN PORTAL LOGIN FORM                      */}
        {/* ========================================================= */}
        <div className="relative flex flex-col justify-center items-center px-4 py-8 sm:px-8 sm:py-12 bg-[var(--color-canvas)] min-h-screen lg:min-h-0 min-w-0">
          
          {/* Form Container */}
          <div className="w-full max-w-[360px] sm:max-w-[400px] mx-auto relative z-10 my-auto">
            
            {/* Mobile & Tablet Focused Branding (< 1024px) */}
            <div className="lg:hidden text-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-panel)] border border-[var(--color-accent-gold)]/40 p-2 shadow-md mx-auto flex items-center justify-center mb-2">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway" 
                  className="w-full h-full rounded-xl object-contain" 
                />
              </div>
              <h1 className="font-serif text-2xl font-bold text-[var(--color-text-primary)]">
                Property Gateway
              </h1>
              <p className="text-xs text-[var(--color-accent-gold)] mt-0.5 font-medium">
                Administration and lead console
              </p>
            </div>

            {/* Shield Icon & Title Header */}
            <div className="text-center mb-5 sm:mb-6">
              <div className="hidden lg:flex w-12 h-12 rounded-2xl bg-[var(--color-surface-panel)] border border-[var(--color-accent-gold)]/40 p-2.5 mx-auto items-center justify-center shadow-md mb-2.5">
                <Building2 className="w-6 h-6 text-[var(--color-accent-gold)]" aria-hidden="true" />
              </div>

              <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] tracking-tight">
                Admin portal
              </h2>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Sign in to manage your Property Gateway account.
              </p>
            </div>

            {/* Firebase Configuration Warning (Only if credentials missing in environment) */}
            {!isFirebaseConfigured && (
              <div 
                role="alert"
                className="mb-4 p-3 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-2 shadow-sm"
              >
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" aria-hidden="true" />
                <span className="leading-relaxed">
                  Firebase configuration keys are not set. Add <code className="font-mono text-amber-300">VITE_FIREBASE_API_KEY</code> and project IDs to your <code className="font-mono text-amber-300">.env</code> file.
                </span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div 
                role="alert"
                className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start gap-2 shadow-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" aria-hidden="true" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* The Form */}
            <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
              
              {/* Field 1: Admin Email Address */}
              <div>
                <label 
                  htmlFor="admin-email" 
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" aria-hidden="true" />
                  <span>Admin email address</span>
                </label>
                <div className="relative">
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@propertygateway.in"
                    autoComplete="username"
                    disabled={loading}
                    className="block w-full px-3.5 py-3 text-xs sm:text-sm bg-[var(--color-surface-input)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] transition-opacity duration-150 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <label 
                  htmlFor="admin-password" 
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" aria-hidden="true" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    disabled={loading}
                    className="block w-full pl-3.5 pr-11 py-3 text-xs sm:text-sm bg-[var(--color-surface-input)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] tracking-wider transition-opacity duration-150 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded-lg cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>
              </div>

              {/* Options Row */}
              <div className="flex items-center text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none py-1 text-[var(--color-text-secondary)]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-surface-input)] text-[var(--color-accent-gold)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] accent-[var(--color-accent-gold)] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Primary Sign In Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-hover)] text-[#0A0C10] font-bold text-xs sm:text-sm tracking-wide transition-transform duration-150 motion-reduce:transition-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)]"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0A0C10] border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      <span>Signing in to console...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in to admin portal</span>
                      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Compliance Note */}
            <div className="mt-6 text-center text-xs text-[var(--color-text-muted)] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              <span>TNRERA Registered Agent Console</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
