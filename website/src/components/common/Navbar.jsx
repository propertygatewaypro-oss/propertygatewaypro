import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Building2, Car } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#232733] text-white transition-colors">
      {/* Main Navigation Bar */}
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
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${BRAND.phone}`}
              className="text-xs font-mono text-slate-300 hover:text-brand-bronze-300 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-brand-bronze-400" />
              <span>{BRAND.phoneDisplay}</span>
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
