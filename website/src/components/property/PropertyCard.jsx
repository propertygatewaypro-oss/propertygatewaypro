import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Maximize2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppLink } from '../../utils/constants';

export default function PropertyCard({ property }) {
  const whatsappUrl = generateWhatsAppLink(property);
  const status = property.status || property.possessionStatus || 'Ready to Move';
  const displayImage = property.mainImage || property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  const isFeatured = property.isFeatured || property.featured;
  const propType = property.propertyType || property.type || 'Apartment';
  const bhkDisplay = typeof property.bhk === 'string' ? property.bhk : `${property.bhk} BHK`;
  const areaDisplay = property.builtUpArea ? (typeof property.builtUpArea === 'number' ? `${property.builtUpArea} sq.ft` : property.builtUpArea) : null;

  const getStatusBadge = (s) => {
    switch (s) {
      case 'Ready to Move':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Under Construction':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'New Launch':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <article className="group bg-white rounded-2xl border border-[#E6E1D6] hover:border-[#A88548]/70 overflow-hidden card-lift-transition shadow-subtle hover:shadow-card-hover flex flex-col justify-between transition-all duration-300">
      <div>
        {/* Image Container with 16:10 Aspect Ratio & Zoom Physics */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={displayImage}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover photo-zoom-transition"
          />

          {/* Top Floating Status Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border shadow-sm backdrop-blur-sm ${getStatusBadge(status)}`}>
              {status}
            </span>

            {isFeatured && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#A88548]/15 text-[#7D5D2A] border border-[#A88548]/30 shadow-xs backdrop-blur-xs">
                ★ Exclusive
              </span>
            )}
          </div>

          {/* RERA Verified Stamp */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 backdrop-blur-xs text-[10px] text-[#1E232F] font-bold border border-[#E7E2D8] shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#A88548]" />
              <span>RERA Approved</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          {/* Builder & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-[#A88548] uppercase tracking-wider font-mono text-[11px]">
              {property.builder || 'Verified Project'}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.location}</span>
            </span>
          </div>

          {/* Property Title */}
          <h3 className="text-lg font-bold text-[#181B22] tracking-tight leading-snug group-hover:text-[#A88548] transition-colors">
            <Link to={`/property/${property.slug}`}>
              {property.title}
            </Link>
          </h3>

          {/* Spec Badges Row */}
          <div className="flex items-center gap-3 py-2 border-y border-[#F0EBE1] text-xs text-slate-600">
            {property.bhk && (
              <div className="flex items-center gap-1.5 font-medium">
                <BedDouble className="w-4 h-4 text-slate-400" />
                <span>{bhkDisplay}</span>
              </div>
            )}
            {areaDisplay && (
              <div className="flex items-center gap-1.5 font-medium">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{areaDisplay}</span>
              </div>
            )}
            <div className="text-slate-400 font-light">•</div>
            <span className="text-slate-600">{propType}</span>
          </div>
        </div>
      </div>

      {/* Footer Price & Conversion Trigger Actions */}
      <div className="p-5 pt-0 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            Starting Price
          </span>
          <span className="text-xl font-extrabold text-[#181B22] tabular-nums">
            {property.priceDisplay}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* 1-Tap Direct WhatsApp Conversion Trigger (Pure Icon, No Outer Box) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shrink-0 select-none cursor-pointer p-0.5"
            title="Inquire details on WhatsApp"
            aria-label={`Inquire about ${property.title} on WhatsApp`}
          >
            <img 
              src="/icons/whatsapp-icon.webp" 
              alt="WhatsApp" 
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain drop-shadow-sm hover:drop-shadow-md transition-all select-none" 
              loading="lazy"
            />
          </a>

          {/* View Details Link with Metallic Gold */}
          <Link
            to={`/property/${property.slug}`}
            className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl bg-gold-metallic text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
