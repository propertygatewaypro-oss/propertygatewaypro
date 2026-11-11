import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function Footer() {
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    // Lightweight native IntersectionObserver (0kb JS library)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Triggers smoothly once
        }
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-[#FAF9F6] text-slate-700 pt-10 sm:pt-12 lg:pt-14 pb-24 sm:pb-14 lg:pb-10 border-t border-[#E7E2D8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid:
            - Mobile (<640px): 1 column stack with touch-friendly tap targets
            - Tablet (640px - 1023px): 2x2 symmetrical grid (Row 1: Brand + Properties, Row 2: Locations + Contact)
            - Desktop (>=1024px): 12-column proportional layout (4 / 3 / 2 / 3) with zero voids
            - Motion: GPU-composited smooth staggered reveal when scrolled into view
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 border-b border-[#E7E2D8] items-start">
          
          {/* 1. Brand & Authority Column */}
          <div 
            className={`sm:col-span-1 lg:col-span-4 space-y-3.5 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl p-1 bg-white border border-[#E7E2D8] shadow-xs shrink-0 group-hover:border-[#A88548]/60 transition-colors flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-xl sm:text-[22px] font-serif font-bold tracking-tight text-[#1E232F]">
                Property<span className="text-[#A88548] font-sans font-extrabold ml-1">Gateway</span>
              </span>
            </Link>

            <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Chennai's premier real estate consultancy. Direct developer launches, luxury villas, and verified residential communities with 0% brokerage.
            </p>

            <div className="pt-0.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E7E2D8] text-[11px] sm:text-xs text-[#8C6239] font-medium shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A88548] shrink-0" />
                <span>TNRERA Registered: {BRAND.reraId}</span>
              </div>
            </div>
          </div>

          {/* 2. Properties Column */}
          <div 
            className={`sm:col-span-1 lg:col-span-3 space-y-3 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '80ms' }}
          >
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E232F] mb-2.5 sm:mb-4">
              Properties
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-[13.5px] sm:text-sm text-slate-600">
              <li>
                <Link 
                  to="/properties?status=New+Launch" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  New Launches (0% Brokerage)
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?type=Luxury+Villa" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Luxury Villas &amp; Resale
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?type=Apartment" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Residential Apartments
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?type=Commercial" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Commercial Offices &amp; Tech Parks
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?type=Plot+/+Land" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Approved Plots &amp; Land
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Chennai Locations Column */}
          <div 
            className={`sm:col-span-1 lg:col-span-2 space-y-3 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '160ms' }}
          >
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E232F] mb-2.5 sm:mb-4">
              Locations
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-[13.5px] sm:text-sm text-slate-600">
              <li>
                <Link 
                  to="/properties?location=East+Coast+Road+(ECR)" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  East Coast Road (ECR)
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?location=Old+Mahabalipuram+Road+(OMR)" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Old Mahabalipuram (OMR)
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?location=Anna+Nagar" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Anna Nagar
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?location=Porur" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Porur
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties?location=Guindy" 
                  className="inline-block py-0.5 hover:text-[#A88548] hover:translate-x-1 transition-all duration-200"
                >
                  Guindy
                </Link>
              </li>
              <li className="pt-1">
                <Link 
                  to="/properties" 
                  className="inline-flex items-center gap-1 font-semibold text-xs text-[#A88548] hover:text-[#7D5D2A] transition-colors"
                >
                  <span>Browse All Properties</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Advisory & Contact Column */}
          <div 
            className={`sm:col-span-1 lg:col-span-3 space-y-3 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E232F] mb-2.5 sm:mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-sm text-slate-600">
              <div>
                <a 
                  href={`tel:${BRAND.phone}`} 
                  className="inline-flex items-center gap-2.5 py-0.5 hover:text-[#A88548] font-mono text-[#1E232F] font-semibold transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#A88548] shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span>{BRAND.phoneDisplay}</span>
                </a>
              </div>
              <div className="min-w-0">
                <a 
                  href={`mailto:${BRAND.email}`} 
                  className="inline-flex items-center gap-2.5 py-0.5 hover:text-[#A88548] text-[#1E232F] truncate max-w-full transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#A88548] shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="truncate">{BRAND.email}</span>
                </a>
              </div>
              <div>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.name + ' ' + BRAND.address)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 py-0.5 group"
                  aria-label="View office on Google Maps"
                >
                  <MapPin className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="leading-snug text-slate-600 group-hover:text-[#1E232F] text-xs sm:text-[13px] transition-colors">
                    {BRAND.address}
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. TNRERA: <span className="font-mono text-[#1E232F] font-semibold">{BRAND.reraId}</span> | MSME: <span className="font-mono text-[#1E232F] font-semibold">{BRAND.udyamRegNo}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2.5 pr-0 md:pr-20 lg:pr-24 text-xs text-slate-500">
            <Link to="/privacy-policy" className="py-0.5 hover:text-[#A88548] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="py-0.5 hover:text-[#A88548] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/cookie-policy" className="py-0.5 hover:text-[#A88548] transition-colors">
              Cookie Policy
            </Link>
            <Link to="/refund-policy" className="py-0.5 hover:text-[#A88548] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
