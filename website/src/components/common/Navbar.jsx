import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Building2 } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Top Micro-Bar for Trust & Local Authority */}
      <div className="bg-brand-navy-950 text-slate-300 text-xs py-1.5 px-4 hidden sm:block border-b border-brand-navy-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              TNRERA Reg: {BRAND.reraId}
            </span>
            <span className="text-slate-400">• Zero Brokerage on New Projects</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${BRAND.phoneRaw}`} 
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-brand-emerald-400" />
              <span>{BRAND.phoneDisplay}</span>
            </a>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Chennai, Tamil Nadu</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-navy-900 flex items-center justify-center text-brand-emerald-500 shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-brand-emerald-500" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-brand-navy-950 flex items-center">
                Property<span className="text-brand-emerald-600 font-extrabold">Gateway</span>
              </span>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                Chennai Real Estate Advisory
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-emerald-700 bg-brand-emerald-50 font-semibold'
                    : 'text-slate-700 hover:text-brand-navy-900 hover:bg-slate-100'
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
              className="p-2.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </a>

            <button
              onClick={onOpenVisitModal}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-brand-emerald-600 hover:bg-brand-emerald-700 active:scale-[0.98] text-white text-sm font-semibold shadow-sm transition-all"
            >
              Book Site Visit
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenVisitModal}
              className="px-3 py-1.5 rounded-md bg-brand-emerald-600 text-white text-xs font-semibold"
            >
              Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-brand-emerald-700 bg-brand-emerald-50 font-semibold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-brand-navy-900 text-white text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-brand-emerald-400" />
              <span>Call: {BRAND.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20Property%20Gateway,%20I%20am%20looking%20for%20properties%20in%20Chennai.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] text-white text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
