import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, BedDouble, Maximize2, Compass, Calendar, Building, 
  ShieldCheck, Phone, Check, ArrowLeft, 
  Share2, ChevronRight 
} from 'lucide-react';
import { fetchPropertyBySlug, subscribePropertyBySlug, submitLeadInquiry } from '../services/propertyService';
import { BRAND, generateWhatsAppLink } from '../utils/constants';

export default function PropertyDetailPage({ onOpenVisitModal }) {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Quick inquiry form inside detail page
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadTrap, setLeadTrap] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribePropertyBySlug(slug, (liveData) => {
      setProperty(liveData);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-6">
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
        <div className="h-96 w-full bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-navy-950">Property Not Found</h2>
        <p className="text-slate-600 text-sm">
          The property you are looking for may have been sold or removed from the catalog.
        </p>
        <Link 
          to="/properties" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy-900 text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Active Listings</span>
        </Link>
      </div>
    );
  }

  const whatsappUrl = generateWhatsAppLink(property);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryError('');

    if (leadPhone.replace(/\D/g, '').length < 10) {
      setInquiryError('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitting(true);
    try {
      await submitLeadInquiry({
        name: leadName,
        phone: leadPhone,
        propertyTitle: property.title,
        propertyId: property.id,
        leadType: 'Property Inquiry',
        source: 'Property Detail Page Form',
        website_trap_field: leadTrap
      });
      setSubmitted(true);
    } catch (err) {
      setInquiryError(err.message || 'Failed to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const images = property.images && property.images.length > 0 ? property.images : [property.mainImage];

  return (
    <div className="bg-brand-canvas-base min-h-screen pb-24">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-navy-950">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/properties" className="hover:text-brand-navy-950">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-emerald-700 font-semibold truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Title & Basic Specs Bar */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-md text-xs font-semibold bg-brand-emerald-50 text-brand-emerald-700 border border-brand-emerald-200">
                {property.status}
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {property.propertyType}
              </span>
              {property.isFeatured && (
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-brand-gold-100 text-brand-gold-700 border border-brand-gold-500/20">
                  ★ Exclusive Listing
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy-950 tracking-tight">
              {property.title}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-slate-600 mt-1.5">
              <MapPin className="w-4 h-4 text-brand-emerald-600 shrink-0" />
              <span>{property.location}, {property.city}</span>
            </p>
          </div>

          <div className="md:text-right shrink-0">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Direct Builder Price
            </span>
            <span className="text-3xl sm:text-4xl font-black text-brand-navy-950 tabular-nums">
              {property.priceDisplay}
            </span>
            <span className="block text-[11px] text-slate-500 mt-0.5">
              Govt taxes & stamp duty extra as applicable
            </span>
          </div>
        </div>

        {/* High-Resolution Media Gallery Showcase */}
        <div className="space-y-3 mb-10">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#F5F2EA] border border-[#E7E2D8] shadow-md">
            <img
              src={images[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-xs text-[#1E232F] font-bold border border-[#E7E2D8] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#A88548]" />
                <span>TNRERA Registered: {property.reraId || BRAND.reraId}</span>
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-brand-emerald-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-Column Layout (Details Left + Sticky Contact Card Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Quick Specification Grid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {property.bhk > 0 && (
                <div className="space-y-1">
                  <BedDouble className="w-5 h-5 text-brand-emerald-600 mx-auto" />
                  <span className="block text-xs text-slate-400 uppercase font-semibold">BHK</span>
                  <span className="text-base font-bold text-brand-navy-950">{property.bhk} BHK</span>
                </div>
              )}
              <div className="space-y-1">
                <Maximize2 className="w-5 h-5 text-brand-emerald-600 mx-auto" />
                <span className="block text-xs text-slate-400 uppercase font-semibold">Super Built-up</span>
                <span className="text-base font-bold text-brand-navy-950">{property.builtUpArea}</span>
              </div>
              <div className="space-y-1">
                <Compass className="w-5 h-5 text-brand-emerald-600 mx-auto" />
                <span className="block text-xs text-slate-400 uppercase font-semibold">Facing</span>
                <span className="text-base font-bold text-brand-navy-950">{property.facing || 'East'}</span>
              </div>
              <div className="space-y-1">
                <Calendar className="w-5 h-5 text-brand-emerald-600 mx-auto" />
                <span className="block text-xs text-slate-400 uppercase font-semibold">Possession</span>
                <span className="text-base font-bold text-brand-navy-950">{property.status}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
              <h2 className="text-xl font-bold text-brand-navy-950 tracking-tight">
                Property Overview & Architecture
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Developer: <strong className="text-brand-navy-950">{property.builder || 'Verified Builder'}</strong></span>
                <span>RERA ID: <strong className="text-brand-emerald-700">{property.reraId || BRAND.reraId}</strong></span>
              </div>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-subtle space-y-6">
                <h2 className="text-xl font-bold text-brand-navy-950 tracking-tight">
                  Amenities & Facilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-brand-canvas-base border border-slate-100 text-sm font-medium text-slate-800">
                      <div className="w-6 h-6 rounded-full bg-brand-emerald-50 text-brand-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proximity / Landmarks */}
            {property.proximity && property.proximity.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-subtle space-y-6">
                <h2 className="text-xl font-bold text-brand-navy-950 tracking-tight">
                  Location Proximity & Commute
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.proximity.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-800">{item.landmark}</span>
                      <span className="text-xs font-bold text-brand-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                        {item.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guided Site Visit Callout */}
            <div className="bg-gradient-to-r from-brand-navy-950 to-brand-navy-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-brand-navy-800">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-xs font-semibold text-brand-emerald-400 uppercase tracking-wider">
                  Personalized Walkthrough
                </span>
                <h3 className="text-xl font-bold text-white">
                  Schedule an In-Person Site Visit for this Property
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Inspect model units, master plans, and amenities with our senior property specialist.
                </p>
              </div>
              <button
                onClick={onOpenVisitModal}
                className="shrink-0 px-6 py-3 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>

          {/* Sticky Conversion Rail (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">
              
              {/* Main Quick Inquiry Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-5">
                <div className="pb-4 border-b border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pricing & Units
                  </span>
                  <div className="text-2xl font-black text-brand-navy-950 tabular-nums">
                    {property.priceDisplay}
                  </div>
                  <span className="text-xs text-brand-emerald-700 font-semibold mt-1 block">
                    ✓ Zero Brokerage Guaranteed
                  </span>
                </div>

                {/* Primary Conversion Triggers */}
                <div className="space-y-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-5 h-5 object-contain" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    className="w-full py-3 px-4 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4 text-brand-emerald-400" />
                    <span>Call: {BRAND.phoneDisplay}</span>
                  </a>
                </div>

                {/* Inline Lead Capture Form */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Request Detailed Cost Sheet
                  </h4>

                  {submitted ? (
                    <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center space-y-2">
                      <p className="font-bold">Thank you, {leadName}!</p>
                      <p>Our Chennai team will WhatsApp the complete brochure & price breakup within 10 minutes.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-3">
                      {inquiryError && (
                        <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{inquiryError}</p>
                      )}

                      <input
                        type="text"
                        name="website_trap"
                        value={leadTrap}
                        onChange={(e) => setLeadTrap(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                      />

                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base md:text-xs outline-none focus:border-brand-emerald-600"
                      />

                      <input
                        type="tel"
                        required
                        placeholder="10-digit WhatsApp Number"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base md:text-xs outline-none focus:border-brand-emerald-600"
                      />

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 px-4 rounded-lg bg-brand-navy-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors disabled:opacity-50"
                      >
                        {submitting ? 'Submitting...' : 'Send Detailed Brochure'}
                      </button>

                      <p className="text-[10px] text-slate-400 text-center leading-tight">
                        🔒 Safe & confidential. Zero spam calls.
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* RERA Assurance Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald-600" />
                  <span>Legal Guarantee</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Title scrutinized by our in-house legal experts. SBI & HDFC home loan approval available.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
