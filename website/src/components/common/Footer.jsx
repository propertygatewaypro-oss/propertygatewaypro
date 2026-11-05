import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import { BRAND, CHENNAI_LOCATIONS, PROPERTY_TYPES } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-[#0A0C10] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-[#1C1F28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Authority Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-brand-bronze-600 via-amber-400 to-brand-bronze-400 shadow-md shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway" 
                  className="w-full h-full rounded-full object-cover bg-black" 
                />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                Property<span className="text-brand-bronze-400 font-sans font-extrabold ml-1">Gateway</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Chennai's premier real estate consultancy. We partner with tier-1 developers to curate verified residential apartments, coastal villas, and grade-A commercial offices with 0% brokerage on new launches.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141720] border border-slate-800 text-xs text-brand-bronze-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-bronze-400" />
                <span>TNRERA Registered: {BRAND.reraId}</span>
              </div>
            </div>
          </div>

          {/* Key Chennai Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-4">
              Micro-Markets
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CHENNAI_LOCATIONS.slice(1, 6).map((loc) => (
                <li key={loc}>
                  <Link to={`/properties?location=${encodeURIComponent(loc)}`} className="hover:text-brand-bronze-400 transition-colors">
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-4">
              Property Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {PROPERTY_TYPES.slice(1).map((type) => (
                <li key={type}>
                  <Link to={`/properties?category=${encodeURIComponent(type)}`} className="hover:text-brand-bronze-400 transition-colors">
                    {type} in Chennai
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/properties" className="text-brand-bronze-400 font-medium hover:underline inline-flex items-center gap-1">
                  View All Listings →
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-4">
              Advisory Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-bronze-400 shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-bronze-400 shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-white font-mono text-slate-300">
                  {BRAND.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-bronze-400 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white text-slate-300 truncate">
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statutory & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. Registered under TNRERA ({BRAND.reraId}).
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-brand-bronze-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-brand-bronze-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/cookie-policy" className="hover:text-brand-bronze-400 transition-colors">
              Cookie Policy
            </Link>
            <Link to="/refund-policy" className="hover:text-brand-bronze-400 transition-colors">
              Refund Policy
            </Link>
            <a 
              href="http://localhost:3001" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>Admin Desk</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
