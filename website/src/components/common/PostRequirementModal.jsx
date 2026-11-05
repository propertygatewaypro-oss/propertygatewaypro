import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Phone, Mail, User, ShieldCheck, CheckCircle2, Sparkles, Building2, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLeadInquiry } from '../../services/propertyService';
import { BRAND } from '../../utils/constants';
import PostRequirementIcon from './PostRequirementIcon';

// 3 High-Quality Authentic Chennai Family WebP Images
const FAMILY_SLIDES = [
  {
    image: '/images/families/chennai-family-housewarming.webp',
    title: 'Griha Pravesh Housewarming in Chennai',
    subtitle: 'Over 500+ families found their verified architectural home through Property Gateway.',
    badge: 'TNRERA Verified Homes'
  },
  {
    image: '/images/families/chennai-couple-villa-keys.webp',
    title: 'ECR Seaside Villa Handover',
    subtitle: 'Zero brokerage on direct developer launches with title due diligence.',
    badge: 'Zero Brokerage Guarantee'
  },
  {
    image: '/images/families/chennai-family-balcony-sunset.webp',
    title: 'Three Generations Under One Roof',
    subtitle: 'Spacious high-rise penthouses & villas curated for multigenerational comfort.',
    badge: '100% Legal Clearance'
  }
];

const QUICK_TAGS = [
  '3 BHK Luxury Villa',
  'OMR IT Corridor',
  'ECR Sea-Facing',
  'Ready to Move',
  'Budget ₹1.5 - 2.5 Cr',
  'Commercial Asset'
];

export default function PostRequirementModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
    consent: true,
    website_trap_field: '' // Anti-bot honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const timerRef = useRef(null);

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

  if (!isOpen) return null;

  const nextSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentSlide((prev) => (prev + 1) % FAMILY_SLIDES.length);
  };

  const prevSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentSlide((prev) => (prev - 1 + FAMILY_SLIDES.length) % FAMILY_SLIDES.length);
  };

  const handleQuickTagClick = (tag) => {
    setFormData((prev) => {
      const current = prev.requirement.trim();
      if (current.includes(tag)) return prev;
      const updated = current ? `${current}, ${tag}` : tag;
      return { ...prev, requirement: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Please accept the consent terms to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeadInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
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
      setErrorMessage(err.message || 'Unable to submit requirement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-[#E8E2D5] overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#0F1117]/85 hover:bg-[#0F1117] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 text-[#FAF9F6]" />
        </button>

        {/* ============================================================== */}
        {/* LEFT COLUMN: CHENNAI FAMILY IMAGE CAROUSEL (WebP Slider) */}
        {/* ============================================================== */}
        <div className="relative w-full md:w-1/2 h-52 sm:h-64 md:h-auto overflow-hidden bg-[#0F1117] shrink-0">
          {/* Images Slider */}
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
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/40 to-transparent" />
            </div>
          ))}

          {/* Carousel Slide Overlay Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 text-white pointer-events-none">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1117]/85 border border-[#B37D4E]/40 text-[#B37D4E] text-[10.5px] font-semibold tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-[#B37D4E]" />
                <span>{FAMILY_SLIDES[currentSlide].badge}</span>
              </span>
            </div>

            {/* Bottom Caption & Pagination Dots */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF9F6] leading-tight drop-shadow-md">
                {FAMILY_SLIDES[currentSlide].title}
              </h3>
              <p className="text-xs text-slate-300 drop-shadow leading-relaxed line-clamp-2">
                {FAMILY_SLIDES[currentSlide].subtitle}
              </p>

              {/* Slider Navigation Dots & Controls */}
              <div className="flex items-center justify-between pt-2 pointer-events-auto">
                <div className="flex items-center gap-1.5">
                  {FAMILY_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setCurrentSlide(i);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === currentSlide ? 'w-6 bg-[#B37D4E]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Left/Right Arrows */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevSlide}
                    className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: LEAD REQUIREMENT FORM (Obsidian & Bronze Theme) */}
        {/* ============================================================== */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF9F6]">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 my-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0F1117]">
                Requirement Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our senior Chennai architectural advisor is reviewing your requirements and will reach out shortly with verified properties.
              </p>
              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#0F1117] hover:bg-[#1A1E29] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Close & Explore Properties
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header Title & Official Gold Logo */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B37D4E] mb-1">
                    <PostRequirementIcon className="w-4 h-4 text-[#B37D4E]" color="#B37D4E" />
                    <span>Free Advisory Desk</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1117] leading-snug">
                    Expert Consultation by <span className="text-[#B37D4E]">Architectural Advisors</span>
                  </h2>
                </div>

                {/* Brand Logo Emblem */}
                <div className="w-10 h-10 rounded-xl bg-[#0F1117] p-1 shrink-0 border border-slate-800 shadow-sm">
                  <img src="/logo.png" alt="Property Gateway" className="w-full h-full object-contain rounded-lg" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Share your desired budget, location, and BHK configuration. Our TNRERA certified advisors will curate 100% verified matches with cost sheets.
              </p>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                {/* Honeypot field for anti-bot protection */}
                <input
                  type="text"
                  name="website_trap_field"
                  value={formData.website_trap_field}
                  onChange={(e) => setFormData({ ...formData, website_trap_field: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karthik Sundaram"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E0D9CD] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B37D4E] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="karthik@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E0D9CD] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B37D4E] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Number with India Flag */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700 select-none">
                      <span className="text-sm">🇮🇳</span> +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-16 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E0D9CD] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B37D4E] focus:border-transparent transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Requirement Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                      Property Requirement Details
                    </label>
                    <span className="text-[10px] text-slate-500">Tap chips below to add</span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for a 3 BHK Villa in ECR or OMR with private garden, budget ₹2.2 Cr..."
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl bg-white border border-[#E0D9CD] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B37D4E] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Quick Selection Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleQuickTagClick(tag)}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-[#ECE7DC] hover:bg-[#E2DCce] text-[#0F1117] transition-colors cursor-pointer border border-[#DBD4C6]"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>

                {/* DND / NDNC Compliance Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 rounded text-[#B37D4E] focus:ring-[#B37D4E] border-[#D6CFC1]"
                    />
                    <span className="text-[10px] text-slate-500 leading-snug">
                      I authorize Property Gateway and its advisors to contact me via Call, SMS, WhatsApp, and Email. This overrides registry on DND/NDNC. I agree to the{' '}
                      <a href="/terms" target="_blank" className="underline hover:text-[#0F1117]">Terms</a> &{' '}
                      <a href="/privacy" target="_blank" className="underline hover:text-[#0F1117]">Privacy Policy</a>.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#0F1117] hover:bg-[#1C202C] active:scale-[0.99] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#2D3345] group"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Submitting Requirement...</span>
                      </span>
                    ) : (
                      <>
                        <PostRequirementIcon className="w-4 h-4 text-[#B37D4E] group-hover:scale-110 transition-transform" color="#B37D4E" />
                        <span>Submit Requirement for Free Consultation</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Footer */}
                <div className="flex items-center justify-center gap-3 pt-1 text-[10.5px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B37D4E]" />
                    <span>TNRERA: {BRAND.reraId}</span>
                  </span>
                  <span>•</span>
                  <span>100% Privacy & Zero Spam</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
