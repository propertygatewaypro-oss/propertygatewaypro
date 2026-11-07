import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone
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
    <header className="sticky top-0 z-50 w-full bg-[#0F1117] border-b border-[#C98A4B]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <nav 
          className="flex items-center justify-between h-[74px] sm:h-[80px]"
          aria-label="Main Navigation"
        >
          {/* 1. LEFT WING: BRAND LOGO & WORDMARK */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Link to="/" className="flex items-center group shrink-0">
              {/* Dark Rounded Badge with Gold Architectural Emblem */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#17191F] border border-[#C98A4B]/30 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway Emblem" 
                  className="w-full h-full object-contain rounded-lg" 
                />
              </div>

              {/* Subtle Vertical Divider */}
              <div className="h-6 sm:h-7 w-[1.5px] bg-[#E7E2D8]/20 mx-3 sm:mx-3.5 shrink-0" />

              {/* Brand Typography in Ivory */}
              <span className="font-serif font-bold text-[19px] sm:text-[21px] xl:text-[22px] text-[#F1EEE7] tracking-tight leading-none group-hover:text-[#C98A4B] transition-colors whitespace-nowrap">
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
                  ? 'text-[#C98A4B] font-semibold' 
                  : 'text-[#F1EEE7] hover:text-[#C98A4B]'
              }`}
            >
              Home
            </Link>

            {/* Properties (Direct Link) */}
            <Link
              to="/properties"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isPropertiesActive 
                  ? 'text-[#C98A4B] font-semibold' 
                  : 'text-[#F1EEE7] hover:text-[#C98A4B]'
              }`}
            >
              Properties
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isAboutActive 
                  ? 'text-[#C98A4B] font-semibold' 
                  : 'text-[#F1EEE7] hover:text-[#C98A4B]'
              }`}
            >
              About Us
            </Link>

            {/* Services (Direct Link) */}
            <Link
              to="/services"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isServicesActive 
                  ? 'text-[#C98A4B] font-semibold' 
                  : 'text-[#F1EEE7] hover:text-[#C98A4B]'
              }`}
            >
              Services
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`py-1 text-[14px] xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                isContactActive 
                  ? 'text-[#C98A4B] font-semibold' 
                  : 'text-[#F1EEE7] hover:text-[#C98A4B]'
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
                className="flex items-center gap-2 h-[40px] xl:h-[42px] px-3.5 xl:px-4 rounded-xl bg-[#171922] hover:bg-[#C98A4B] text-[#F1EEE7] hover:text-[#0F1117] border border-[#C98A4B]/60 hover:border-[#C98A4B] transition-all duration-200 text-xs xl:text-[13.5px] font-bold tracking-wide group shrink-0 shadow-sm shadow-[#C98A4B]/10 active:scale-[0.98]"
                aria-label={`Direct Call: ${BRAND.phoneDisplay}`}
                title={`Direct Call: ${BRAND.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#C98A4B] group-hover:text-[#0F1117] fill-current transition-colors shrink-0" />
                <span className="font-mono tracking-tight whitespace-nowrap">{BRAND.phoneDisplay}</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="p-2 rounded-xl text-[#C98A4B] hover:bg-white/[0.08] transition-colors"
                aria-label={`Call ${BRAND.phoneDisplay}`}
                title={`Call ${BRAND.phoneDisplay}`}
              >
                <Phone className="w-5 h-5 fill-current" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#F1EEE7] hover:bg-white/[0.08] hover:text-[#C98A4B] focus:outline-none transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#F1EEE7]" /> : <Menu className="w-5 h-5 text-[#F1EEE7]" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* 4. MOBILE DRAWER MENU (Scrollable, Safe Area Inset, Compact Rhythm) */}
      {mobileMenuOpen && (
        <div 
          className="border-t border-[#C98A4B]/30 bg-[#0F1117] px-4 pt-3 text-[#F1EEE7] space-y-1 sm:space-y-1.5 lg:hidden shadow-2xl max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain"
          style={{ paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom))' }}
        >
          <Link
            to="/"
            className={`block px-3 py-2 rounded-xl text-sm font-medium ${
              isHomeActive ? 'text-[#C98A4B] bg-[#C98A4B]/15 font-semibold' : 'text-[#F1EEE7] hover:text-[#C98A4B]'
            }`}
          >
            Home
          </Link>

          {/* Properties (Direct Link) */}
          <Link
            to="/properties"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-xl text-sm font-medium ${
              isPropertiesActive ? 'text-[#C98A4B] bg-[#C98A4B]/15 font-semibold' : 'text-[#F1EEE7] hover:text-[#C98A4B]'
            }`}
          >
            Properties
          </Link>

          <Link
            to="/about"
            className={`block px-3 py-2 rounded-xl text-sm font-medium ${
              isAboutActive ? 'text-[#C98A4B] bg-[#C98A4B]/15 font-semibold' : 'text-[#F1EEE7] hover:text-[#C98A4B]'
            }`}
          >
            About Us
          </Link>

          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-xl text-sm font-medium ${
              isServicesActive ? 'text-[#C98A4B] bg-[#C98A4B]/15 font-semibold' : 'text-[#F1EEE7] hover:text-[#C98A4B]'
            }`}
          >
            Services
          </Link>

          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-xl text-sm font-medium ${
              isContactActive ? 'text-[#C98A4B] bg-[#C98A4B]/15 font-semibold' : 'text-[#F1EEE7] hover:text-[#C98A4B]'
            }`}
          >
            Contact
          </Link>

          {/* Post Requirement & Direct Dial in Mobile Menu */}
          <div className="pt-2 px-0.5 pb-2 space-y-2">
            {onOpenRequirementModal && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRequirementModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#171922] border border-[#C98A4B]/50 hover:bg-[#C98A4B] text-[#C98A4B] hover:text-[#0F1117] font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                <span>Post Requirement</span>
              </button>
            )}

            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center justify-center gap-2.5 w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#C98A4B] text-[#0F1117] font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-[0.98] transition-all"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#0F1117]" />
              <span>Direct Dial: {BRAND.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
