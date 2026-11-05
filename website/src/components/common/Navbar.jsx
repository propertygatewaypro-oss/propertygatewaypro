import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Building2, Car, Sparkles, ChevronRight } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function Navbar({ onOpenVisitModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const location = useLocation();

  const tickerSlides = [
    {
      icon: ShieldCheck,
      badge: "Govt Licensed",
      text: `TNRERA: ${BRAND.reraId}`,
      subtext: "100% Verified Legal Titles & CMDA Approvals",
      action: null
    },
    {
      icon: Sparkles,
      badge: "Direct Pricing",
      text: "0% Brokerage on New Projects",
      subtext: "Tier-1 Developer Pricing with Zero Commission",
      action: null
    },
    {
      icon: Car,
      badge: "Complimentary",
      text: "Free Doorstep AC Cab Pickup",
      subtext: "Private Family Site Visits Across Chennai",
      action: onOpenVisitModal
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setTickerIndex((prev) => (prev + 1) % tickerSlides.length);
        setIsFading(false);
      }, 300);
    }, 4800);

    return () => clearInterval(timer);
  }, [tickerSlides.length]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const currentSlide = tickerSlides[tickerIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <header className="sticky top-0 z-40 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#232733] text-white transition-colors">
      
      {/* 1. Dynamic Rotating Luxury Announcement Micro-Bar */}
      <div className="bg-[#080A0E] text-slate-300 text-[11px] py-1.5 px-3 sm:px-6 border-b border-[#1E222D] relative z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left / Center: Dynamic Fade Ticker */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Ticker Item */}
            <div 
              onClick={() => currentSlide.action && currentSlide.action()}
              className={`flex items-center gap-2 min-w-0 transition-opacity duration-300 ease-in-out cursor-pointer select-none ${
                isFading ? 'opacity-0 translate-y-0.5' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Badge Pill */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1A1612] border border-brand-bronze-500/40 text-brand-bronze-300 font-medium text-[10px] tracking-wide shrink-0">
                <SlideIcon className="w-3 h-3 text-brand-bronze-400" />
                <span className="font-semibold uppercase tracking-wider">{currentSlide.badge}</span>
              </span>

              {/* Main Headline */}
              <span className="font-medium text-slate-200 truncate font-mono text-[11px] sm:text-xs">
                {currentSlide.text}
              </span>

              {/* Desktop Subtext */}
              <span className="text-slate-600 hidden lg:inline">•</span>
              <span className="text-slate-400 font-normal hidden lg:inline truncate">
                {currentSlide.subtext}
              </span>
            </div>

            {/* Subtle Ticker Dots Indicator */}
            <div className="hidden sm:flex items-center gap-1 ml-1.5 shrink-0">
              {tickerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTickerIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    tickerIndex === idx ? 'w-3 bg-brand-bronze-400' : 'w-1 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Live Desk Status & Direct Click-to-Call Hotline */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-slate-300 font-medium">
            {/* Live Desk Indicator (Desktop only) */}
            <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Desk Open (9 AM – 8 PM)</span>
            </div>

            <span className="text-slate-700 hidden md:inline">|</span>

            {/* Direct Calling Hotline */}
            <a 
              href={`tel:${BRAND.phoneRaw}`} 
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-brand-bronze-300 transition-colors group"
              title="Call Senior Property Advisor"
            >
              <Phone className="w-3 h-3 text-brand-bronze-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs tracking-tight">
                <span className="hidden sm:inline">{BRAND.phoneDisplay}</span>
                <span className="sm:hidden text-brand-bronze-300 font-semibold uppercase text-[10px] tracking-wider">
                  Call Desk
                </span>
              </span>
            </a>

            {/* Chennai Location Tag */}
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-slate-400 text-[10px] hidden sm:inline uppercase tracking-wider">
              Chennai, TN
            </span>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#1A1D26] border border-[#2E3342] flex items-center justify-center text-brand-bronze-400 shadow-sm group-hover:border-brand-bronze-500/50 transition-colors">
              <Building2 className="w-5 h-5 text-brand-bronze-400" />
            </div>
            <div>
              <span className="text-xl font-serif font-bold tracking-tight text-white flex items-center">
                Property<span className="text-brand-bronze-400 font-sans font-extrabold ml-1">Gateway</span>
              </span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Chennai Architectural Advisory
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-bronze-400 bg-white/5 border border-brand-bronze-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Trigger Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20Property%20Gateway,%20I%20am%20looking%20for%20verified%20properties%20in%20Chennai.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </a>

            <button
              onClick={onOpenVisitModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-bronze-600 hover:bg-brand-bronze-700 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider shadow-bronze-glow transition-all"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenVisitModal}
              className="px-3 py-1.5 rounded-md bg-brand-bronze-600 text-white text-xs font-semibold"
            >
              Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0C10] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? 'text-brand-bronze-400 bg-white/5 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVisitModal();
              }}
              className="w-full py-3 rounded-lg bg-brand-bronze-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-bronze-glow"
            >
              <Car className="w-4 h-4" />
              <span>Book Free Cab Site Visit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
