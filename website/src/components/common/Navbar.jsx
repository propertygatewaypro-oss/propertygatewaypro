import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Building2, ShieldCheck, ClipboardList, Mail, Clock } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function Navbar({ onOpenVisitModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header className="sticky top-0 z-40 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#232733] text-white transition-colors shadow-lg">
      {/* 1. Top Utility Strip (Inspired by Connection Point & PropLeaf) */}
      <div className="bg-[#08090E] border-b border-slate-800/80 text-[11px] text-slate-300 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Operating Hours & Live Status + TNRERA */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Advisory Open: <strong className="text-white font-semibold">9:00 AM – 8:00 PM IST</strong></span>
            </span>

            <span className="hidden md:inline text-slate-700">•</span>

            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-bronze-400 shrink-0" />
              <span>TNRERA Registered: <strong className="text-slate-300 font-semibold">{BRAND.reraId}</strong></span>
            </span>

            <span className="hidden lg:inline text-slate-700">•</span>

            <span className="hidden lg:inline text-emerald-400 font-medium">
              Zero Brokerage on Verified New Projects
            </span>
          </div>

          {/* Right: Quick Action Triggers */}
          <div className="flex items-center gap-3.5 text-xs">
            <a
              href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20Property%20Gateway!%20I%20am%20looking%20for%20verified%20properties%20in%20Chennai.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
              title="Chat directly with our senior consultant on WhatsApp"
            >
              <img 
                src="/icons/whatsapp-icon.webp" 
                alt="WhatsApp" 
                className="w-3.5 h-3.5 rounded-full inline object-cover" 
              />
              <span className="font-medium">WhatsApp Us</span>
            </a>

            <span className="text-slate-700">|</span>

            <a
              href={`mailto:${BRAND.email}`}
              className="hidden sm:inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-mono">{BRAND.email}</span>
            </a>

            <span className="hidden sm:inline text-slate-700">|</span>

            <button
              onClick={onOpenVisitModal}
              className="inline-flex items-center gap-1 text-brand-bronze-400 hover:text-brand-bronze-300 font-semibold text-xs tracking-wide transition-colors cursor-pointer"
              title="Submit your property requirements"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Post Requirement</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo with Official Gold Luxury Emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-brand-bronze-600 via-amber-400 to-brand-bronze-400 shadow-md group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/logo.png" 
                alt="Property Gateway" 
                className="w-full h-full rounded-full object-cover bg-black" 
              />
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
          <nav className="hidden lg:flex items-center gap-1.5">
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

          {/* Right Action Conversion Trigger Buttons (Inspired by PropLeaf & Connection Point) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Post Requirement Button (Inspired by PropLeaf Gold CTA) */}
            <button
              onClick={onOpenVisitModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-bronze-400 via-brand-bronze-500 to-brand-bronze-600 hover:from-brand-bronze-500 hover:to-brand-bronze-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 group cursor-pointer"
              title="Post your property requirement (BHK, Budget, Location)"
            >
              <ClipboardList className="w-4 h-4 text-slate-950" />
              <span>Post Requirement</span>
            </button>

            {/* Direct Phone Hotline Pill Button (Inspired by PropLeaf & Connection Point) */}
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center justify-center gap-2.5 py-2 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-xs tracking-wide shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer group"
              title="Call senior Chennai real estate advisor directly"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-3.5 h-3.5 text-white fill-white" />
              </span>
              <span className="font-mono text-xs font-bold tracking-wider">{BRAND.phoneDisplay}</span>
            </a>
          </div>

          {/* Mobile Hamburger & Quick CTA Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenVisitModal}
              className="px-3 py-1.5 rounded-lg bg-brand-bronze-500 text-slate-950 font-bold text-xs shadow-xs"
            >
              Post Requirement
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
        <div className="md:hidden bg-[#0A0C10] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
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

          {/* Mobile Operating Hours Info */}
          <div className="pt-2 pb-1 border-t border-slate-800/80 px-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Advisory Open: 9AM – 8PM IST</span>
            </span>
            <span className="text-[10px] text-brand-bronze-400 font-medium">TNRERA Verified</span>
          </div>

          {/* Mobile Action CTAs */}
          <div className="pt-1 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVisitModal();
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-brand-bronze-400 to-brand-bronze-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Post Property Requirement</span>
            </button>

            <a
              href={`tel:${BRAND.phone}`}
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Advisor: {BRAND.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
