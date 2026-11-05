import React, { useState } from 'react';
import { X, Car, Calendar, Phone, User, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLeadInquiry } from '../../services/propertyService';
import { BRAND, generateSiteVisitWhatsAppLink } from '../../utils/constants';

export default function ScheduleVisitModal({ isOpen, onClose, preselectedProperty = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    consent: true,
    website_trap_field: '' // Honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const propertyName = preselectedProperty ? preselectedProperty.title : 'Selected Chennai Properties';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Please check the consent box to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeadInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyTitle: propertyName,
        preferredDate: formData.date || 'Flexible',
        source: 'Free Site Visit Modal',
        website_trap_field: formData.website_trap_field
      });

      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-brand-navy-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 text-brand-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Car className="w-4 h-4" />
            <span>Complimentary Service</span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            Schedule a Free Site Visit
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            We provide private cab pickup and drop across Chennai for you and your family.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-brand-emerald-50 text-brand-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-brand-navy-900">
              Site Visit Request Received!
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our senior property advisor will call you within 15 minutes to coordinate your cab pickup for <strong>{propertyName}</strong>.
            </p>

            <div className="pt-3 flex flex-col gap-2">
              <a
                href={generateSiteVisitWhatsAppLink(propertyName, formData.date)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="py-2.5 px-4 text-xs text-slate-500 hover:text-slate-800"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Honeypot field (hidden from real users) */}
            <input
              type="text"
              name="website_trap_field"
              value={formData.website_trap_field}
              onChange={(e) => setFormData({ ...formData, website_trap_field: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Arunachalam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-brand-emerald-600 focus:ring-1 focus:ring-brand-emerald-600 text-base md:text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Mobile Number (WhatsApp Preferred) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-brand-emerald-600 focus:ring-1 focus:ring-brand-emerald-600 text-base md:text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300 focus:border-brand-emerald-600 text-base md:text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-brand-emerald-600 text-base md:text-sm outline-none"
                />
              </div>
            </div>

            {/* DPDP Act Consent Checkbox */}
            <div className="flex items-start gap-2 pt-1 text-xs text-slate-600">
              <input
                id="consent-check"
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-brand-emerald-600 focus:ring-brand-emerald-500 h-4 w-4"
              />
              <label htmlFor="consent-check" className="cursor-pointer leading-tight">
                I authorize Property Gateway to contact me via Call or WhatsApp to arrange the complimentary cab pickup.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Booking Cab...' : 'Confirm Free Site Visit'}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald-600" />
              <span>100% Free • No Obligation • TNRERA Licensed Advisory</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
