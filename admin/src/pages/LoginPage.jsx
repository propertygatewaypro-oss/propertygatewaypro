import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Building2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../utils/constants';

// Curated Architectural Slideshow for Admin Hero Showcase
const LOGIN_SLIDES = [
  {
    image: '/images/hero/hero-architectural-travertine.jpg',
    tag: 'CURATED CHENNAI LUXURY',
    title: 'The Gateway to Exceptional Real Estate',
    subtitle: 'Direct developer launches, luxury residences, and verified legal scrutiny across Chennai.'
  },
  {
    image: '/images/hero/hero-architectural-villa.jpg',
    tag: 'PRIVATE COASTAL ESTATES',
    title: 'Unrivaled Coastal Living & Modern Architecture',
    subtitle: 'Exclusive beachfront villas and secluded contemporary compounds on ECR.'
  },
  {
    image: '/images/hero/hero-architectural-penthouse.jpg',
    tag: 'PANORAMIC SKY RESIDENCES',
    title: 'Elevated Chennai Penthouses & Skyline Views',
    subtitle: 'Bespoke high-floor residences designed for discerning homeowners and investors.'
  },
  {
    image: '/images/hero/hero-architectural-interior.jpg',
    tag: 'TIMELESS INTERIOR MASTERY',
    title: 'Double-Height Atriums & Travertine Finishes',
    subtitle: 'Handcrafted luxury spaces with natural light, cross ventilation, and serene gardens.'
  }
];

export default function LoginPage() {
  // Sliding Image Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide carousel every 4 seconds with smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % LOGIN_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
        <div className="hidden lg:flex relative flex-col justify-between p-10 xl:p-14 overflow-hidden border-r border-[#E7E2D8] min-w-0 bg-[#FAF9F6]">
          
          {/* Pristine Full-Bleed Sliding Image Slideshow with Crossfade */}
          {LOGIN_SLIDES.map((slide, idx) => (
            <div 
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover object-center select-none"
              />
            </div>
          ))}

          {/* Minimal Top Brand Watermark (Zero Opaque Box) */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-[#A88548]/45 p-1 shadow-sm flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Property Gateway" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#181B22] tracking-tight block drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                Property Gateway
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#7D5D2A] block drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                Executive Console
              </span>
            </div>
          </div>

          {/* Minimal Editorial Typography (Direct on photo, zero white boxes) */}
          <div className="relative z-10 max-w-md space-y-2 pt-20">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#7D5D2A] block transition-opacity duration-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {LOGIN_SLIDES[currentSlide].tag}
            </span>
            <h2 className="font-serif text-3xl xl:text-4xl font-bold text-[#181B22] tracking-tight leading-tight transition-opacity duration-300 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] min-h-[4.5rem]">
              {LOGIN_SLIDES[currentSlide].title}
            </h2>
            <p className="text-xs xl:text-sm text-slate-800 font-medium leading-relaxed transition-opacity duration-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] min-h-[2.5rem]">
              {LOGIN_SLIDES[currentSlide].subtitle}
            </p>

            {/* Sleek Dot Progress Indicators for the Sliding Images */}
            <div className="flex items-center gap-2 pt-2">
              {LOGIN_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? 'w-8 bg-gold-metallic' : 'w-2 bg-[#181B22]/40 hover:bg-[#181B22]/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-700 font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              TNRERA Registered Agent: {BRAND.reraId}
            </div>
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
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-panel)] border border-[var(--color-accent-gold)]/40 p-1.5 shadow-md mx-auto flex items-center justify-center mb-2">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway" 
                  className="w-full h-full object-contain" 
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
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-gold-metallic text-white font-bold text-xs sm:text-sm tracking-wide transition-transform duration-150 motion-reduce:transition-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A88548] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)]"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
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
