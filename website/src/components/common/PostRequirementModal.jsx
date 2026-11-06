import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLeadInquiry } from '../../services/propertyService';

// 3 High-Quality Authentic Chennai Family WebP Images
const FAMILY_SLIDES = [
  {
    image: '/images/families/chennai-family-housewarming.webp',
    title: 'Griha Pravesh Housewarming in Chennai',
    subtitle: 'Over 500+ families found their verified architectural home through Property Gateway.'
  },
  {
    image: '/images/families/chennai-couple-villa-keys.webp',
    title: 'ECR Seaside Villa Handover',
    subtitle: 'Zero brokerage on direct developer launches with legal due diligence.'
  },
  {
    image: '/images/families/chennai-family-balcony-sunset.webp',
    title: 'Three Generations Under One Roof',
    subtitle: 'Spacious high-rise penthouses & villas curated for multigenerational comfort.'
  }
];

export default function PostRequirementModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
    consent: false,
    website_trap_field: '' // Anti-bot honeypot
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    consent: '',
    general: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const timerRef = useRef(null);
  const formScrollRef = useRef(null);

  // Auto-slide carousel every 4.5 seconds
  useEffect(() => {
    if (!isOpen) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FAMILY_SLIDES.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset state on close
      setErrors({ name: '', email: '', phone: '', consent: '', general: '' });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Field change handlers that clear validation errors when corrected
  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, name: val }));
    if (errors.name && val.trim()) {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));
    if (errors.email) {
      if (val.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }
  };

  const handlePhoneChange = (e) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: clean }));
    if (errors.phone && clean.length === 10) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleConsentChange = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({ ...prev, consent: checked }));
    if (errors.consent && checked) {
      setErrors((prev) => ({ ...prev, consent: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = {
      name: '',
      email: '',
      phone: '',
      consent: '',
      general: ''
    };
    let hasError = false;

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
      hasError = true;
    }

    // 2. Email validation
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = 'Please enter your email.';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address.';
      hasError = true;
    }

    // 3. Indian Mobile Number validation (10 digits starting with 6, 7, 8, or 9)
    const cleanDigits = formData.phone.replace(/\D/g, '');
    if (!cleanDigits) {
      newErrors.phone = 'Please enter your mobile number.';
      hasError = true;
    } else if (cleanDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
      hasError = true;
    } else if (!/^[6-9]/.test(cleanDigits)) {
      newErrors.phone = 'Mobile number must start with 6, 7, 8, or 9.';
      hasError = true;
    }

    // 4. Consent validation
    if (!formData.consent) {
      newErrors.consent = 'Please check the consent box to proceed.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      // Smoothly scroll to the first error within the form scrollable container
      if (formScrollRef.current) {
        formScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({ name: '', email: '', phone: '', consent: '', general: '' });

    // Format complete E.164 Indian Phone Number
    const fullPhoneNumber = `+91 ${cleanDigits}`;

    try {
      await submitLeadInquiry({
        name: formData.name,
        email: formData.email,
        phone: fullPhoneNumber,
        message: formData.requirement || 'Looking for personalized Chennai property options.',
        leadType: 'Post Requirement Popup',
        source: 'Psychological Post Requirement Modal',
        website_trap_field: formData.website_trap_field
      });

      // Mark in localStorage so it never auto-pops again
      try {
        localStorage.setItem('pg_requirement_submitted', 'true');
        sessionStorage.setItem('pg_post_req_dismissed', 'true');
      } catch (err) {
        // ignore storage errors
      }

      setIsSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err.message || 'Unable to submit requirement. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs animate-modal-backdrop overflow-hidden"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Card (Responsive: compact on mobile, tailored snug fit on desktop) */}
      <div 
        className="relative w-full max-w-[94vw] sm:max-w-[420px] md:max-w-[800px] max-h-[92dvh] bg-[#FAF9F6] rounded-2xl shadow-[0_25px_60px_rgba(15,17,23,0.4)] border border-[#E6E0D4] flex flex-col md:flex-row animate-modal-card overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Responsive Circular Close Button: Inset cleanly inside card, eliminating edge collisions and click outlines */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-50 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F1117] hover:bg-[#C98A4B] text-slate-300 hover:text-white font-bold shadow-md flex items-center justify-center transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#C98A4B] select-none cursor-pointer active:scale-95"
          aria-label="Close dialog"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
        </button>

        {/* ============================================================== */}
        {/* 1. LEFT COLUMN: CHENNAI FAMILY IMAGE CAROUSEL (Desktop Only)   */}
        {/* ============================================================== */}
        <div className="hidden md:block relative md:w-1/2 overflow-hidden bg-[#0F1117] md:rounded-l-2xl shrink-0 self-stretch">
          {FAMILY_SLIDES.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Refined gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/45 to-transparent" />
            </div>
          ))}

          {/* Carousel Slide Overlay Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-5 md:p-6 text-white pointer-events-none">
            {/* Bottom Caption & Pagination Controls */}
            <div className="space-y-1.5">
              <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-white leading-tight drop-shadow-md">
                {FAMILY_SLIDES[currentSlide].title}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-slate-300 drop-shadow leading-snug line-clamp-2">
                {FAMILY_SLIDES[currentSlide].subtitle}
              </p>

              {/* Sleek Dots Progress Indicator (Auto-slides every 4.5s or click to switch) */}
              <div className="flex items-center gap-1.5 pt-1 pointer-events-auto">
                {FAMILY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (timerRef.current) clearInterval(timerRef.current);
                      setCurrentSlide(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer outline-none focus:outline-none ${
                      i === currentSlide ? 'w-5 sm:w-6 bg-[#C98A4B]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. RIGHT COLUMN: STREAMLINED LEAD FORM                         */}
        {/* ============================================================== */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl md:rounded-l-none md:rounded-r-2xl flex flex-col min-h-0 overflow-hidden relative">
          
          {isSubmitted ? (
            /* Success State */
            <div className="p-6 sm:p-8 text-center space-y-3 sm:space-y-3.5 my-auto animate-fadeIn">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0F1117]">
                Thank You!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your requirement has been received. Our senior advisor will contact you shortly with verified properties.
              </p>
              <div className="pt-1.5 sm:pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2 sm:py-2.5 rounded-xl bg-[#0F1117] hover:bg-[#1A1E29] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Active Form Panel (Eliminates dead vertical gaps by flowing naturally) */
            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
              
              {/* A. Top Header (Symmetrical & Brand-Aligned) */}
              <div className="pt-3.5 sm:pt-4 md:pt-5 pb-1 sm:pb-1.5 px-8 sm:px-10 md:px-7 text-center space-y-1 shrink-0">
                <h2 className="text-xs sm:text-sm md:text-base font-bold text-[#0F1117] tracking-tight leading-snug">
                  Expert Consultation by <span className="text-[#C98A4B]">Professionals</span>
                </h2>

                {/* Brand Logo & Company Name */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 rounded-md sm:rounded-lg bg-[#0F1117] border border-[#C98A4B]/35 flex items-center justify-center p-0.5 sm:p-1 shadow-xs shrink-0">
                    <img 
                      src="/logo.png" 
                      alt="Property Gateway Logo" 
                      className="w-full h-full object-contain rounded" 
                    />
                  </div>
                  <span className="font-serif font-bold text-xs sm:text-sm md:text-[15px] text-[#0F1117] tracking-tight">
                    Property Gateway
                  </span>
                </div>
              </div>

              {/* B. Form Fields Container (Tight, cohesive spacing with zero empty gap) */}
              <div 
                ref={formScrollRef}
                className="overflow-y-auto px-4 sm:px-6 md:px-7 pt-1 pb-3.5 sm:pb-4 md:pb-5 space-y-2 sm:space-y-2.5 overscroll-contain"
              >
                {/* General Error Banner (if any) */}
                {errors.general && (
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium animate-fadeIn">
                    {errors.general}
                  </div>
                )}

                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="website_trap_field"
                  value={formData.website_trap_field}
                  onChange={(e) => setFormData({ ...formData, website_trap_field: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* 1. Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={handleNameChange}
                    className={`w-full h-9 sm:h-10 px-3 sm:px-3.5 text-base md:text-sm rounded-xl bg-white border text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.name 
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20' 
                        : 'border-[#DDD6C8] focus:border-[#C98A4B] focus:ring-1 focus:ring-[#C98A4B]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1 animate-fadeIn">
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* 2. Email Input */}
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleEmailChange}
                    className={`w-full h-9 sm:h-10 px-3 sm:px-3.5 text-base md:text-sm rounded-xl bg-white border text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.email 
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20' 
                        : 'border-[#DDD6C8] focus:border-[#C98A4B] focus:ring-1 focus:ring-[#C98A4B]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1 animate-fadeIn">
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* 3. Mobile Number with Fixed Indian +91 Prefix */}
                <div>
                  <div className={`flex h-9 sm:h-10 w-full rounded-xl border bg-white transition-all focus-within:border-[#C98A4B] focus-within:ring-1 focus-within:ring-[#C98A4B] ${
                    errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-[#DDD6C8]'
                  }`}>
                    <div className="flex h-full items-center px-3 sm:px-3.5 bg-[#FAF9F6] border-r border-[#DDD6C8] rounded-l-xl text-slate-800 text-xs sm:text-sm font-semibold font-mono select-none shrink-0">
                      +91
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Mobile Number (10 digits) *"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full h-full px-3 sm:px-3.5 text-base md:text-sm bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none font-mono tracking-tight"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1 animate-fadeIn">
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* 4. Compact Requirement Textarea */}
                <div>
                  <textarea
                    rows={2}
                    placeholder="Please share your requirement here."
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full h-[52px] sm:h-[58px] md:h-[64px] p-2 sm:p-2.5 text-base md:text-sm rounded-xl bg-white border border-[#DDD6C8] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C98A4B] focus:border-[#C98A4B] transition-all resize-none"
                  />
                </div>

                {/* DND / NDNC Compliance Consent Checkbox */}
                <div className="pt-0.5">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={handleConsentChange}
                      className="mt-0.5 rounded text-[#0F1117] focus:ring-[#C98A4B] border-[#DDD6C8]"
                    />
                    <span className="text-[10px] sm:text-[10.5px] text-slate-600 leading-tight">
                      I authorise Property Gateway to contact me via email, SMS, WhatsApp, and call (overrides DND). I agree to the{' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#C98A4B] hover:underline font-medium">Privacy Policy</a> &{' '}
                      <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#C98A4B] hover:underline font-medium">Terms</a>.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1 animate-fadeIn">
                      <span>{errors.consent}</span>
                    </p>
                  )}
                </div>

                {/* C. Direct Submit Button - Flows immediately after consent (No unwanted gaps) */}
                <div className="pt-1.5 sm:pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 sm:h-11 rounded-xl bg-[#0F1117] hover:bg-[#1C202C] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center border border-[#232733] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>

              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
