import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import { BRAND, CHENNAI_LOCATIONS, PROPERTY_TYPES } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-navy-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-brand-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Authority Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-emerald-600 flex items-center justify-center text-white shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Property<span className="text-brand-emerald-400 font-extrabold">Gateway</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Chennai's premier real estate consultancy. We partner with top-tier builders to provide 100% verified residential apartments, coastal villas, and commercial spaces with zero brokerage on new launches.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-navy-900 border border-slate-800 text-xs text-brand-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>TNRERA Registered: {BRAND.reraId}</span>
              </div>
            </div>
          </div>

          {/* Key Chennai Locations */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Top Locations
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {CHENNAI_LOCATIONS.slice(1, 6).map((loc) => (
                <li key={loc}>
                  <Link to={`/properties?location=${encodeURIComponent(loc)}`} className="hover:text-brand-emerald-400 transition-colors">
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Property Types
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {PROPERTY_TYPES.slice(1).map((type) => (
                <li key={type}>
                  <Link to={`/properties?category=${encodeURIComponent(type)}`} className="hover:text-brand-emerald-400 transition-colors">
                    {type} in Chennai
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/properties" className="text-brand-emerald-400 font-medium hover:underline inline-flex items-center gap-1">
                  View All Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Registered Office
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-emerald-400 mt-1 shrink-0" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-white transition-colors">
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors break-all">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers & Policies */}
        <div className="pt-8 space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-400">Statutory Disclaimer:</strong> Property Gateway is an independent real estate consultancy and marketing channel partner registered with the Tamil Nadu Real Estate Regulatory Authority under {BRAND.reraId}. Project details, floor layouts, amenities, and specifications displayed are sourced from builders and developers for informational purposes. Prices are subject to revision without prior notice. Govt taxes, stamp duty, and registration charges are extra as applicable.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-900">
            <p>
              © {new Date().getFullYear()} Property Gateway. All rights reserved. Developed by {BRAND.agency}.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-brand-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms-and-conditions" className="hover:text-brand-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/cookie-policy" className="hover:text-brand-emerald-400 transition-colors">
                Cookie Policy
              </Link>
              <span>•</span>
              <Link to="/refund-policy" className="hover:text-brand-emerald-400 transition-colors">
                Refund Policy
              </Link>
              <span>•</span>
              <a 
                href="http://localhost:3001" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-slate-300 flex items-center gap-1"
                title="Staff Admin Portal"
              >
                <span>Admin Login</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
