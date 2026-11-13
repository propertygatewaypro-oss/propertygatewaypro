import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND } from '../utils/constants';
import { submitLeadInquiry } from '../services/propertyService';
import { useDynamicLocations } from '../hooks/useDynamicLocations';
import SEO from '../components/common/SEO';
import { getRealEstateAgentSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const { locations, counts } = useDynamicLocations();
  const propertyParam = searchParams.get('property') || '';
  const locationParam = searchParams.get('location') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredLocation: locationParam || 'All Locations',
    targetTimeline: 'Immediate (Within 30 Days)',
    message: propertyParam ? `Inquiring about ${propertyParam}.` : '',
    consent: true,
    website_hp: '' // Honeypot
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  // Keep form in sync if query parameters change
  useEffect(() => {
    if (locationParam) {
      setFormData(prev => ({ ...prev, preferredLocation: locationParam }));
    }
    if (propertyParam) {
      setFormData(prev => ({ ...prev, message: `Inquiring about ${propertyParam}.` }));
    }
  }, [searchParams, locationParam, propertyParam]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name and contact number.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Please accept the DPDP Act privacy consent to proceed.');
      return;
    }

    setStatus('loading');
    try {
      const leadTitle = propertyParam 
        ? propertyParam 
        : (formData.preferredLocation && formData.preferredLocation !== 'All Locations' 
            ? `${formData.preferredLocation} Inquiry` 
            : 'Chennai Real Estate Inquiry');

      const typeLabel = propertyParam 
        ? 'Property Site Visit' 
        : 'General Property Inquiry';

      await submitLeadInquiry({
        name: formData.name,
        phone: formData.phone,
        preferredLocation: formData.preferredLocation !== 'All Locations' ? formData.preferredLocation : 'Any Prime Location in Chennai',
        targetTimeline: formData.targetTimeline,
        message: formData.message,
        propertyTitle: leadTitle,
        leadType: typeLabel,
        source: 'Website Contact Page',
        website_trap_field: formData.website_hp,
        submittedAt: new Date().toISOString()
      });

      setStatus('success');
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#A88548', '#181B22', '#E0C27E', '#25D366']
        });
      } catch (e) {
        // Confetti fallback
      }

      setFormData({
        name: '',
        phone: '',
        preferredLocation: 'All Locations',
        targetTimeline: 'Immediate (Within 30 Days)',
        message: '',
        consent: true,
        website_hp: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Unable to submit right now. Please message us on WhatsApp or call our advisory desk.');
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getRealEstateAgentSchema(),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Contact Us', url: '/contact' }
      ])
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-16 sm:pb-20">
      <SEO
        title="Contact Property Gateway | Real Estate Advisory Saidapet, Chennai"
        description="Connect directly with Property Gateway real estate consultants in Saidapet, Chennai. Call +91 75989 54635 or schedule a personalized property site inspection across OMR, ECR & Central Chennai."
        canonicalUrl="/contact"
        schemaData={contactSchema}
      />
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="bg-[#FAF9F6] text-[#1E232F] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#E7E2D8] relative overflow-hidden">
        {/* Architectural Grid Texture */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#A88548 1px, transparent 1px), radial-gradient(#A88548 1px, #FAF9F6 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A88548]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium">
            <Link to="/" className="hover:text-[#A88548] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#A88548] font-bold">Contact Us</span>
          </nav>

          {/* Hairline Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-6 sm:w-10 bg-[#A88548]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7D5D2A]">
              PROPERTY GATEWAY ADVISORY
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-[#A88548]" />
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E232F] tracking-tight leading-tight">
              Let’s Connect & <span className="text-gold-metallic italic">Find Your Next Property</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
              Zero brokerage on new builder projects, 30-year parent title verification, and personalized site inspections across Chennai.
            </p>
          </div>

          {/* 3 Quick Value Tickers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E7E2D8] max-w-3xl">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="w-8 h-8 rounded-lg bg-[#A88548]/15 flex items-center justify-center text-[#7D5D2A] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <span>Guided On-Site Inspections</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="w-8 h-8 rounded-lg bg-[#A88548]/15 flex items-center justify-center text-[#7D5D2A] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>0% Brokerage on New Launches</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="w-8 h-8 rounded-lg bg-[#A88548]/15 flex items-center justify-center text-[#7D5D2A] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span>Quick 10-Minute Response</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN CONTENT GRID (Generous Spacing & Gaps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Fast Connect, Office Info & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1-Tap Fast Contact Card */}
            <div className="bg-white text-[#1E232F] p-6 sm:p-7 rounded-3xl border border-[#E7E2D8] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#A88548]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D5D2A] font-bold">
                    IMMEDIATE ASSISTANCE
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Advisors Online
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1E232F]">
                    Prefer to Talk Directly?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-1">
                    Chat instantly with our senior Chennai property advisors over WhatsApp or call directly.
                  </p>
                </div>

                {/* Instant WhatsApp Action */}
                <a
                  href={`https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
                    propertyParam 
                      ? `Hello Property Gateway,\n\nI would like more information and pricing details for "${propertyParam}". Please share the brochure and floor plans. Thank you!`
                      : "Hello Property Gateway,\n\nI would like to consult with an advisor regarding verified residential communities in Chennai. Thank you!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-sm transition-all shadow-md active:scale-[0.98]"
                >
                  <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-5 h-5 object-contain" />
                  <span>Chat on WhatsApp (Instant)</span>
                </a>

                {/* Direct Telephone Action */}
                <a
                  href={`tel:${BRAND.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-[#FAF9F6] hover:bg-white text-[#1E232F] font-bold text-sm border border-[#E7E2D8] hover:border-[#A88548] transition-all active:scale-[0.98] shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-[#A88548]" />
                  <span>Call {BRAND.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Physical Headquarters & Timings */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center justify-between pb-3 border-b border-slate-100">
                <span>Advisory Headquarters</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  CHENNAI
                </span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#A88548] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Office Address</strong>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{BRAND.address}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.name + ' ' + BRAND.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A88548] hover:underline mt-1.5"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#A88548] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Consultation Timings</strong>
                    <p className="text-slate-600 text-xs sm:text-sm">Monday – Sunday: 9:00 AM – 8:00 PM</p>
                    <p className="text-xs text-emerald-700 font-medium mt-0.5">Site visit appointments available all 7 days</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#A88548] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Official Inquiries</strong>
                    <a href={`mailto:${BRAND.email}`} className="text-slate-600 hover:text-[#A88548] text-xs sm:text-sm">
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* RERA & MSME Notice Pill */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>TNRERA Registered Agent: <strong className="text-slate-800">{BRAND.reraDisplay}</strong></span>
                </div>
                <div className="pl-6 text-[11px] font-mono text-slate-500">
                  File No: {BRAND.reraFileNo} | MSME: {BRAND.udyamRegNo}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Generous, Well-Spaced Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
              
              {/* Form State Success Message */}
              {status === 'success' ? (
                <div className="py-12 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-emerald-950">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Thank you! Our senior property advisory specialist has received your request and will contact you within 2 business hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs sm:text-sm font-bold hover:bg-emerald-800 transition-colors shadow-xs"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Leave this empty</label>
                    <input
                      type="text"
                      id="website_hp"
                      name="website_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_hp}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Simple Text Header */}
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                      {propertyParam ? `Inquire About ${propertyParam}` : 'Schedule a Visit or Inquiry'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {propertyParam 
                        ? 'Share your details below to receive brochure, verified pricing, and schedule a private inspection.'
                        : 'Connect with a certified Chennai property specialist. We respond within 2 hours.'}
                    </p>
                  </div>

                  {/* 2. NAME & PHONE INPUTS (Well-Spaced Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="e.g. Anand Sundaram"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full text-sm px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#A88548] focus:border-[#A88548] bg-[#FAF9F6]/40 focus:bg-white transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="e.g. 98400 12345"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full text-sm px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#A88548] focus:border-[#A88548] bg-[#FAF9F6]/40 focus:bg-white transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* 3. LOCALITY & TIMELINE INPUTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="preferredLocation" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Target Locality
                      </label>
                      <select
                        id="preferredLocation"
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                        className="w-full text-sm px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#A88548] focus:border-[#A88548] bg-white cursor-pointer shadow-2xs"
                      >
                        <option value="All Locations">Any Prime Location in Chennai</option>
                        {locations.filter(l => l !== "All Locations").map(loc => (
                          <option key={loc} value={loc}>
                            {loc} {counts[loc] ? `(${counts[loc]} active projects)` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="targetTimeline" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Target Move-In Date / Timeline
                      </label>
                      <select
                        id="targetTimeline"
                        name="targetTimeline"
                        value={formData.targetTimeline}
                        onChange={handleChange}
                        className="w-full text-sm px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#A88548] focus:border-[#A88548] bg-white cursor-pointer shadow-2xs"
                      >
                        <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                        <option value="1 to 3 Months">1 to 3 Months</option>
                        <option value="3 to 6 Months">3 to 6 Months</option>
                        <option value="Under Construction (1-2 Years)">Under Construction (1-2 Years)</option>
                        <option value="Investment / Exploring">Investment / Just Exploring</option>
                      </select>
                    </div>
                  </div>

                  {/* 4. SPECIFIC REQUIREMENTS */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Specific Requirements or Questions (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3.5}
                      placeholder="e.g. Looking for 3 BHK near OMR or ECR under ₹1.5 Cr, or need to schedule a site inspection this weekend."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full text-sm px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#A88548] focus:border-[#A88548] bg-[#FAF9F6]/40 focus:bg-white transition-all shadow-2xs resize-none"
                    ></textarea>
                  </div>

                  {/* 5. PRIVACY & DPDP ACT CONSENT CHECKBOX */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#A88548] focus:ring-[#A88548] accent-[#A88548] cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I authorize Property Gateway to contact me via Phone or WhatsApp regarding verified properties per DPDP Act 2023. We strictly safeguard your privacy.
                      </span>
                    </label>
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  {/* 6. SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gold-metallic text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {status === 'loading' ? 'Submitting Details...' : 'Submit Inquiry'}
                      </span>
                    </button>
                  </div>

                  {/* Privacy Assurance Note */}
                  <p className="text-xs text-slate-400 text-center pt-2 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Privacy Protected. TNRERA Reg: {BRAND.reraId}. No spam, ever.</span>
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
