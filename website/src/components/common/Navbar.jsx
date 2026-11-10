import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function Navbar({ onOpenVisitModal, onOpenRequirementModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isHomeActive = location.pathname === '/' && !location.search;
  const isPropertiesActive = location.pathname.startsWith('/properties');
  const isAboutActive = location.pathname.startsWith('/about');
  const isServicesActive = location.pathname.startsWith('/services');
  const isContactActive = location.pathname.startsWith('/contact');

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E7E2D8] shadow-[0_4px_25px_rgba(20,25,35,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <nav 
          className="flex items-center justify-between h-[74px] sm:h-[80px]"
          aria-label="Main Navigation"
        >
          {/* 1. LEFT WING: BRAND LOGO & WORDMARK */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Link to="/" className="flex items-center group shrink-0">
              {/* Slate/Ivory Rounded Badge with Gold Architectural Emblem */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF9F6] border border-[#A88548]/45 flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway Emblem" 
                  className="w-full h-full object-contain rounded-lg" 
                />
              </div>

              {/* Subtle Vertical Divider */}
              <div className="h-6 sm:h-7 w-[1.5px] bg-[#E7E2D8] mx-3 sm:mx-3.5 shrink-0" />

              {/* Brand Typography in Architectural Slate */}
              <span className="font-serif font-bold text-[19px] sm:text-[21px] xl:text-[22px] text-[#1E232F] tracking-tight leading-none group-hover:text-[#A88548] transition-colors whitespace-nowrap">
                Property Gateway
              </span>
            </Link>
          </div>

          {/* 2. CENTER: DESKTOP NAVIGATION LINKS (Mathematically Centered) */}
          <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 2xl:gap-8 shrink-0">
            
            {/* Home */}
            <Link
              to="/"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isHomeActive 
                  ? 'text-[#A88548] font-bold' 
                  : 'text-[#2D3748] hover:text-[#A88548]'
              }`}
            >
              Home
            </Link>

            {/* Properties (Direct Link) */}
            <Link
              to="/properties"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isPropertiesActive 
                  ? 'text-[#A88548] font-bold' 
                  : 'text-[#2D3748] hover:text-[#A88548]'
              }`}
            >
              Properties
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isAboutActive 
                  ? 'text-[#A88548] font-bold' 
                  : 'text-[#2D3748] hover:text-[#A88548]'
              }`}
            >
              About Us
            </Link>

            {/* Services (Direct Link) */}
            <Link
              to="/services"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isServicesActive 
                  ? 'text-[#A88548] font-bold' 
                  : 'text-[#2D3748] hover:text-[#A88548]'
              }`}
            >
              Services
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isContactActive 
                  ? 'text-[#A88548] font-bold' 
                  : 'text-[#2D3748] hover:text-[#A88548]'
              }`}
            >
              Contact
            </Link>

          </div>

          {/* 3. RIGHT WING: DIRECT DIAL CTA & MOBILE TOGGLE */}
          <div className="flex-1 flex items-center justify-end shrink-0">
            {/* Desktop Direct Dial CTA */}
            <div className="hidden lg:flex items-center">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 h-[40px] xl:h-[42px] px-3.5 xl:px-4 rounded-xl bg-gold-metallic text-white transition-all duration-200 text-xs xl:text-[13.5px] font-bold tracking-wide group shrink-0 shadow-md shadow-[#A88548]/30 active:scale-[0.98]"
                aria-label={`Direct Call: ${BRAND.phoneDisplay}`}
                title={`Direct Call: ${BRAND.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-white fill-current transition-colors shrink-0" />
                <span className="font-mono tracking-tight whitespace-nowrap">{BRAND.phoneDisplay}</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="p-2 rounded-xl text-[#A88548] hover:bg-slate-100 transition-colors"
                aria-label={`Call ${BRAND.phoneDisplay}`}
                title={`Call ${BRAND.phoneDisplay}`}
              >
                <Phone className="w-5 h-5 fill-current" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#1E232F] hover:bg-slate-100 hover:text-[#A88548] focus:outline-none transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#1E232F]" /> : <Menu className="w-5 h-5 text-[#1E232F]" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* 4. MOBILE OFF-CANVAS LEFT SIDEBAR DRAWER (Portaled to document.body) */}
      {typeof document !== 'undefined' && createPortal(
        <div 
          className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${
            mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        >
          {/* Backdrop Overlay */}
          <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Left Drawer Panel */}
          <div 
            className={`fixed top-0 bottom-0 left-0 w-[82vw] max-w-[320px] h-[100dvh] bg-white flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.35)] border-r border-[#E7E2D8] transition-transform duration-300 ease-out z-10 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header: Brand Watermark & Close Button (shrink-0) */}
            <div className="shrink-0 flex items-center justify-between p-4 sm:p-5 border-b border-[#E7E2D8] bg-[#FAF9F6]">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#A88548]/45 p-1.5 shadow-xs shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Property Gateway" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-serif font-bold text-base text-[#1E232F] tracking-tight block truncate">
                    Property Gateway
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#7D5D2A] block">
                    Chennai Real Estate
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-[#1E232F] hover:bg-white border border-transparent hover:border-[#E7E2D8] transition-all cursor-pointer"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body: Navigation Links (flex-1 min-h-0 overflow-y-auto) */}
            <div className="flex-1 min-h-0 overflow-y-auto px-3.5 py-4 space-y-1.5 overscroll-contain">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isHomeActive 
                    ? 'text-[#7D5D2A] bg-[#A88548]/12 font-bold border-l-4 border-[#A88548] pl-3' 
                    : 'text-[#1E232F] hover:text-[#A88548] hover:bg-[#FAF9F6]'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isPropertiesActive 
                    ? 'text-[#7D5D2A] bg-[#A88548]/12 font-bold border-l-4 border-[#A88548] pl-3' 
                    : 'text-[#1E232F] hover:text-[#A88548] hover:bg-[#FAF9F6]'
                }`}
              >
                <span>Properties</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isAboutActive 
                    ? 'text-[#7D5D2A] bg-[#A88548]/12 font-bold border-l-4 border-[#A88548] pl-3' 
                    : 'text-[#1E232F] hover:text-[#A88548] hover:bg-[#FAF9F6]'
                }`}
              >
                <span>About Us</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isServicesActive 
                    ? 'text-[#7D5D2A] bg-[#A88548]/12 font-bold border-l-4 border-[#A88548] pl-3' 
                    : 'text-[#1E232F] hover:text-[#A88548] hover:bg-[#FAF9F6]'
                }`}
              >
                <span>Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isContactActive 
                    ? 'text-[#7D5D2A] bg-[#A88548]/12 font-bold border-l-4 border-[#A88548] pl-3' 
                    : 'text-[#1E232F] hover:text-[#A88548] hover:bg-[#FAF9F6]'
                }`}
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Drawer Footer: Action Buttons & Legal Stamp (shrink-0) */}
            <div 
              className="shrink-0 p-4 border-t border-[#E7E2D8] bg-[#FAF9F6] space-y-2.5"
              style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
            >
              {onOpenRequirementModal && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRequirementModal();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white border border-[#A88548]/45 hover:bg-[#A88548] text-[#7D5D2A] hover:text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                >
                  <span>Post Requirement</span>
                </button>
              )}

              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-gold-metallic text-white font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-[0.98] transition-all"
              >
                <Phone className="w-4 h-4 fill-current text-white" />
                <span>Direct Dial: {BRAND.phoneDisplay}</span>
              </a>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>TNRERA: TN/Agent/020/2019</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
