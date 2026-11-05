import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Maximize2, MessageCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppLink } from '../../utils/constants';

export default function PropertyCard({ property }) {
  const whatsappUrl = generateWhatsAppLink(property);

  const getStatusBadge = (status) => {
    switch (status) {
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
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden card-lift-transition shadow-subtle hover:shadow-card-hover flex flex-col justify-between">
      <div>
        {/* Image Container with 16:10 Aspect Ratio & Zoom Physics */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={property.mainImage}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover photo-zoom-transition"
          />

          {/* Top Floating Status Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border shadow-sm backdrop-blur-sm ${getStatusBadge(property.status)}`}>
              {property.status}
            </span>

            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-brand-gold-100 text-brand-gold-700 border border-brand-gold-500/20 shadow-sm">
                ★ Exclusive
              </span>
            )}
          </div>

          {/* RERA Verified Stamp */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-navy-950/80 backdrop-blur-sm text-[10px] text-white font-medium">
              <ShieldCheck className="w-3 h-3 text-brand-emerald-400" />
              <span>RERA Approved</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          {/* Builder & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-brand-emerald-700 uppercase tracking-wider">
              {property.builder || 'Verified Builder'}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.location}</span>
            </span>
          </div>

          {/* Property Title */}
          <h3 className="text-lg font-bold text-brand-navy-950 tracking-tight leading-snug group-hover:text-brand-emerald-700 transition-colors">
            <Link to={`/property/${property.slug}`}>
              {property.title}
            </Link>
          </h3>

          {/* Spec Badges Row */}
          <div className="flex items-center gap-3 py-2 border-y border-slate-100 text-xs text-slate-600">
            {property.bhk > 0 && (
              <div className="flex items-center gap-1.5 font-medium">
                <BedDouble className="w-4 h-4 text-slate-400" />
                <span>{property.bhk} BHK</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 font-medium">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.builtUpArea}</span>
            </div>
            <div className="text-slate-400 font-light">•</div>
            <span className="text-slate-600">{property.propertyType}</span>
          </div>
        </div>
      </div>

      {/* Footer Price & Conversion Trigger Actions */}
      <div className="p-5 pt-0 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            Starting Price
          </span>
          <span className="text-xl font-extrabold text-brand-navy-950 tabular-nums">
            {property.priceDisplay}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* 1-Tap Dynamic WhatsApp Conversion Trigger */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-[#25D366] text-brand-emerald-700 hover:text-white transition-all shadow-sm active:scale-95"
            title="Inquire details on WhatsApp"
            aria-label={`Inquire about ${property.title} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          {/* View Details Link */}
          <Link
            to={`/property/${property.slug}`}
            className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-800 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
