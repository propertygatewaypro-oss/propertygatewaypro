import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, MapPin, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND, CHENNAI_LOCATIONS } from '../../utils/constants';

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

  const handleMouseEnter = (menu) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isHomeActive = location.pathname === '/' && !location.search;
  const isPropertiesActive = location.pathname.startsWith('/properties');
  const isAboutActive = location.pathname.startsWith('/about');
  const isContactActive = location.pathname.startsWith('/contact');

  // Dropdown menu options
  const propertiesMenu = [
    { label: 'All Verified Properties', path: '/properties', badge: 'Active' },
    { label: 'Luxury Architectural Villas', path: '/properties?type=Villa', badge: 'Exclusive' },
    { label: 'Premium Penthouses & Apartments', path: '/properties?type=Apartment' },
    { label: 'Direct Builder Launches (0% Brokerage)', path: '/properties?builder=direct', badge: 'Hot' },
    { label: 'Commercial & High-Yield Assets', path: '/properties?type=Commercial' },
  ];

  const locationsMenu = [
    { label: 'OMR — IT Expressway', path: '/properties?location=OMR', tag: 'Fast Appreciation' },
    { label: 'ECR — Beachfront Luxury', path: '/properties?location=ECR', tag: 'High Net Worth' },
    { label: 'Anna Nagar — Prime West', path: '/properties?location=Anna%20Nagar', tag: 'Elite Living' },
    { label: 'Adyar & Besant Nagar', path: '/properties?location=Adyar', tag: 'Heritage Prime' },
    { label: 'Guindy & Adambakkam', path: '/properties?location=Adambakkam', tag: 'Central Chennai' },
    { label: 'Velachery & Medavakkam', path: '/properties?location=Velachery', tag: 'High Rental Yield' },
  ];

  const servicesMenu = [
    { 
      label: 'Free Cab Site Visit', 
      desc: 'Chauffeured site tours for short-listed villas & plots', 
      action: () => onOpenVisitModal && onOpenVisitModal(),
      highlight: true
    },
    { 
      label: 'TNRERA Legal Verification', 
      desc: '100% verified titles & government approval audit', 
      path: '/about#compliance' 
    },
    { 
      label: 'NRI Portfolio Advisory', 
      desc: 'Complete remote management & investment advisory', 
      path: '/contact?service=NRI+Advisory' 
    },
    { 
      label: 'Pre-Approved Home Loans', 
      desc: 'Preferred interest rates with leading nationalized banks', 
      path: '/contact?service=Home+Loan' 
    },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header className={`sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 ${
      isHomePage ? '-mb-[76px] sm:-mb-[84px] relative' : ''
    }`}>
      {/* Floating Pill Container (Exact Ivory / Off-White Aesthetic) */}
      <nav 
        className="relative bg-[#FAF9F5] border border-[#E7E2D8] rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.08)] px-4 sm:px-7 py-2.5 sm:py-3 transition-all backdrop-blur-md"
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between">
          
          {/* 1. BRAND LOGO & SUBTITLE */}
          <Link to="/" className="flex items-center group shrink-0">
            {/* Dark Rounded Badge with Gold Architectural Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0F1117] border border-slate-800 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/logo.png" 
                alt="Property Gateway Emblem" 
                className="w-full h-full object-contain rounded-lg" 
              />
            </div>

            {/* Subtle Vertical Divider */}
            <div className="h-7 w-[1.5px] bg-[#D6D0C4] mx-3 sm:mx-3.5 shrink-0" />

            {/* Brand Typography */}
            <div className="flex flex-col justify-center">
              <span className="font-serif font-bold text-[17px] sm:text-[19px] text-[#11141D] tracking-tight leading-none group-hover:text-[#B37D4E] transition-colors">
                Property Gateway
              </span>
              <span className="font-sans text-[8px] sm:text-[8.5px] uppercase font-semibold tracking-[0.24em] text-[#636A79] mt-1 leading-none">
                Chennai Architectural Advisory
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            
            {/* Home (Active with Bottom Underline Indicator) */}
            <Link
              to="/"
              className={`relative py-1 text-[14px] font-medium transition-colors ${
                isHomeActive 
                  ? 'text-[#B37D4E] font-semibold' 
                  : 'text-[#1F2430] hover:text-[#B37D4E]'
              }`}
            >
              <span>Home</span>
              {isHomeActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#B37D4E] rounded-full" />
              )}
            </Link>

            {/* Properties Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('properties')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'properties' ? null : 'properties')}
                className={`flex items-center gap-1 py-1 text-[14px] font-medium transition-colors cursor-pointer ${
                  isPropertiesActive 
                    ? 'text-[#B37D4E] font-semibold' 
                    : 'text-[#1F2430] hover:text-[#B37D4E]'
                }`}
              >
                <span>Properties</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                  activeDropdown === 'properties' ? 'rotate-180 text-[#B37D4E]' : ''
                }`} />
              </button>

              {/* Properties Dropdown Menu Panel */}
              {activeDropdown === 'properties' && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5E0D6] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {propertiesMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-[#FAF8F3] transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#B37D4E]/10 text-[#B37D4E]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
                className="flex items-center gap-1 py-1 text-[14px] font-medium text-[#1F2430] hover:text-[#B37D4E] transition-colors cursor-pointer"
              >
                <span>Locations</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                  activeDropdown === 'locations' ? 'rotate-180 text-[#B37D4E]' : ''
                }`} />
              </button>

              {/* Locations Dropdown Menu Panel */}
              {activeDropdown === 'locations' && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5E0D6] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Prime Chennai Zones
                  </div>
                  {locationsMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-[#FAF8F3] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#B37D4E]" />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[9.5px] text-slate-500 font-mono">
                        {item.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <Link
              to="/about"
              className={`py-1 text-[14px] font-medium transition-colors ${
                isAboutActive 
                  ? 'text-[#B37D4E] font-semibold' 
                  : 'text-[#1F2430] hover:text-[#B37D4E]'
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className="flex items-center gap-1 py-1 text-[14px] font-medium text-[#1F2430] hover:text-[#B37D4E] transition-colors cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                  activeDropdown === 'services' ? 'rotate-180 text-[#B37D4E]' : ''
                }`} />
              </button>

              {/* Services Dropdown Menu Panel */}
              {activeDropdown === 'services' && (
                <div className="absolute top-full -left-12 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5E0D6] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {servicesMenu.map((item) => (
                    item.action ? (
                      <button
                        key={item.label}
                        onClick={() => {
                          setActiveDropdown(null);
                          item.action();
                        }}
                        className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-[#FAF8F3] transition-colors flex items-start gap-2.5 group cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#B37D4E] mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-[#B37D4E] transition-colors">
                            {item.label}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="p-2.5 rounded-xl text-xs hover:bg-[#FAF8F3] transition-colors flex items-start gap-2.5 group"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-[#B37D4E] transition-colors">
                            {item.label}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Career */}
            <Link
              to="/contact?subject=Career+Inquiry"
              className="py-1 text-[14px] font-medium text-[#1F2430] hover:text-[#B37D4E] transition-colors"
            >
              Career
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`py-1 text-[14px] font-medium transition-colors ${
                isContactActive 
                  ? 'text-[#B37D4E] font-semibold' 
                  : 'text-[#1F2430] hover:text-[#B37D4E]'
              }`}
            >
              Contact
            </Link>

          </div>

          {/* 3. MOBILE HAMBURGER BUTTON */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 hover:bg-slate-200/60 focus:outline-none transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

        </div>

        {/* 4. MOBILE DRAWER MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#E7E2D8] space-y-2 pb-2">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-xl text-sm font-medium ${
                isHomeActive ? 'text-[#B37D4E] bg-amber-50/80 font-semibold' : 'text-slate-800'
              }`}
            >
              Home
            </Link>

            {/* Mobile Properties Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'properties' ? null : 'properties')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-800"
              >
                <span>Properties</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'properties' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpandedSection === 'properties' && (
                <div className="pl-4 pr-2 py-1 space-y-1">
                  {propertiesMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Locations Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'locations' ? null : 'locations')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-800"
              >
                <span>Locations</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'locations' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpandedSection === 'locations' && (
                <div className="pl-4 pr-2 py-1 space-y-1">
                  {locationsMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-800"
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-800"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpandedSection === 'services' && (
                <div className="pl-4 pr-2 py-1 space-y-1">
                  {servicesMenu.map((item) => (
                    item.action ? (
                      <button
                        key={item.label}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          item.action();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#B37D4E] font-medium"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="block px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact?subject=Career+Inquiry"
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-800"
            >
              Career
            </Link>

            <Link
              to="/contact"
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-800"
            >
              Contact
            </Link>

            <div className="pt-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="w-full py-2.5 rounded-full bg-[#11141D] text-white font-medium text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#B37D4E]" />
                <span>Call Advisor: {BRAND.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
