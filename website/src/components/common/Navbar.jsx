import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Phone,
  Building2,
  Briefcase,
  Home,
  ShieldCheck,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { BRAND } from '../../utils/constants';

// 4 Strategic Pillars for Properties Mega-Menu
const PROPERTIES_MEGA_MENU = [
  {
    title: 'New Residential Projects',
    subtitle: 'Direct Developer Launches',
    icon: Building2,
    links: [
      { label: 'New Launches (0% Brokerage)', path: '/properties?status=New+Launch' },
      { label: 'Under Construction Projects', path: '/properties?status=Under+Construction' },
      { label: 'Ready to Move In Homes', path: '/properties?status=Ready+to+Move' },
      { label: 'Upcoming Pre-Launches', path: '/properties?status=Upcoming' },
    ]
  },
  {
    title: 'Commercial Projects',
    subtitle: 'High ROI & Corporate Assets',
    icon: Briefcase,
    links: [
      { label: 'Grade-A Office Spaces', path: '/properties?type=Commercial' },
      { label: 'IT Tech Parks (OMR / Guindy)', path: '/properties?type=Commercial&zone=IT' },
      { label: 'Retail Showrooms & Plazas', path: '/properties?type=Commercial&category=retail' },
      { label: 'Pre-Leased High-Yield Assets', path: '/properties?type=Commercial&yield=high' },
    ]
  },
  {
    title: 'Luxury Villas & Resale',
    subtitle: 'Exclusive Architectural Living',
    icon: Home,
    links: [
      { label: 'Beachfront Villas (ECR)', path: '/properties?location=East+Coast+Road+(ECR)&type=Luxury+Villa' },
      { label: 'Gated Community Villas', path: '/properties?type=Luxury+Villa' },
      { label: 'Ultra-Luxury Penthouses', path: '/properties?type=Apartment&tier=luxury' },
      { label: 'Verified Resale Homes', path: '/properties?status=Resale' },
    ]
  },
  {
    title: 'Plots & Land Parcels',
    subtitle: 'CMDA / DTCP Verified Land',
    icon: MapPin,
    links: [
      { label: 'CMDA & DTCP Approved Plots', path: '/properties?type=Plot+/+Land' },
      { label: 'Villa Plots in OMR Corridor', path: '/properties?location=Old+Mahabalipuram+Road+(OMR)&type=Plot+/+Land' },
      { label: 'Commercial Land Parcels', path: '/properties?type=Plot+/+Land&purpose=commercial' },
      { label: 'Farm Land & Weekend Plots', path: '/properties?type=Plot+/+Land&purpose=farm' },
    ]
  }
];

export default function Navbar({ onOpenVisitModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'properties' | 'locations' | 'services' | null
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  // Close dropdown on outside click or route change
  useEffect(() => {
    setActiveDropdown(null);
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

  const handleMouseEnter = (menu) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const isHomeActive = location.pathname === '/' && !location.search;
  const isPropertiesActive = location.pathname.startsWith('/properties');
  const isAboutActive = location.pathname.startsWith('/about');
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

            {/* Properties Mega-Menu Dropdown */}
            <div 
              className="static"
              onMouseEnter={() => handleMouseEnter('properties')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'properties' ? null : 'properties')}
                className={`flex items-center gap-1.5 py-1 text-[14px] xl:text-[15px] font-medium transition-colors cursor-pointer group whitespace-nowrap ${
                  isPropertiesActive 
                    ? 'text-[#C98A4B] font-semibold' 
                    : 'text-[#F1EEE7] hover:text-[#C98A4B]'
                }`}
                aria-expanded={activeDropdown === 'properties'}
              >
                <span>Properties</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#C98A4B] transition-transform duration-200 ${
                  activeDropdown === 'properties' ? 'rotate-180 text-[#C98A4B]' : ''
                }`} />
              </button>

              {/* Mega-Menu Solid Dark Panel (4 Categorized Columns) */}
              {activeDropdown === 'properties' && (
                <div 
                  className="absolute top-[calc(100%+6px)] left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 bg-[#0F1117] rounded-2xl border border-[#C98A4B]/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] p-7 lg:p-9 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('properties')}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* 4 Columns Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-9 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.09]">
                    {PROPERTIES_MEGA_MENU.map((col, idx) => {
                      const Icon = col.icon;
                      return (
                        <div key={col.title} className={idx > 0 ? "lg:pl-7 xl:pl-8 pt-4 lg:pt-0" : ""}>
                          {/* Pillar Header */}
                          <div className="flex items-center gap-3 mb-4 pb-2.5 border-b border-white/[0.09]">
                            <div className="w-9 h-9 rounded-xl bg-[#C98A4B]/15 border border-[#C98A4B]/30 flex items-center justify-center shrink-0">
                              <Icon className="w-5 h-5 text-[#C98A4B]" />
                            </div>
                            <div>
                              <h4 className="text-[15px] xl:text-[16px] font-bold text-white tracking-tight leading-snug">
                                {col.title}
                              </h4>
                              <span className="text-[11.5px] xl:text-[12px] text-[#C98A4B] font-medium block mt-0.5">
                                {col.subtitle}
                              </span>
                            </div>
                          </div>

                          {/* Sub-links */}
                          <ul className="space-y-2.5">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  to={link.path}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group flex items-center justify-between text-[13.5px] xl:text-[14.5px] text-slate-200/90 hover:text-[#C98A4B] transition-all duration-150 py-1"
                                >
                                  <span className="group-hover:translate-x-1.5 transition-transform duration-150">
                                    {link.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Locations (Direct Link) */}
            <Link
              to="/properties"
              className="py-1 text-[14px] xl:text-[15px] font-medium text-[#F1EEE7] hover:text-[#C98A4B] transition-colors whitespace-nowrap"
            >
              Locations
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
              to="/about#services"
              className="py-1 text-[14px] xl:text-[15px] font-medium text-[#F1EEE7] hover:text-[#C98A4B] transition-colors whitespace-nowrap"
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

          {/* Mobile Properties Accordion (Clean 2x2 Touch Cards) */}
          <div>
            <button
              type="button"
              onClick={() => setMobileExpandedSection(mobileExpandedSection === 'properties' ? null : 'properties')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#F1EEE7] hover:text-[#C98A4B]"
            >
              <span>Properties</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'properties' ? 'rotate-180 text-[#C98A4B]' : ''}`} />
            </button>
            {mobileExpandedSection === 'properties' && (
              <div className="pl-3 pr-2 py-1 space-y-0.5 animate-fadeIn">
                {PROPERTIES_MEGA_MENU.map((col) => {
                  const Icon = col.icon;
                  const primaryPath = col.links[0]?.path || '/properties';
                  return (
                    <Link
                      key={col.title}
                      to={primaryPath}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-sm text-[#F1EEE7] hover:text-[#C98A4B] hover:bg-white/[0.04] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#C98A4B] shrink-0" />
                      <span className="font-medium text-[13.5px]">{col.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/properties"
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#F1EEE7] hover:text-[#C98A4B]"
          >
            Locations
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
            to="/about#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#F1EEE7] hover:text-[#C98A4B]"
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

          {/* Direct Dial Call Card in Mobile Menu */}
          <div className="pt-2 px-0.5 pb-2">
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
