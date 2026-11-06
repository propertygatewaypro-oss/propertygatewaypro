import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND, CHENNAI_LOCATIONS, PROPERTY_TYPES } from '../utils/constants';
import { submitLeadInquiry } from '../services/propertyService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: 'Any Location',
    propertyType: 'All Types',
    message: '',
    agreeConsent: true,
    website_hp: '' // Honeypot field
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

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
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    if (!formData.agreeConsent) {
      setErrorMsg('Please consent to contact so we can reach you.');
      return;
    }

    setStatus('loading');
    try {
      await submitLeadInquiry({
        ...formData,
        leadType: 'General Consultation',
        submittedAt: new Date().toISOString()
      });
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredLocation: 'Any Location',
        propertyType: 'All Types',
        message: '',
        agreeConsent: true,
        website_hp: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Unable to submit inquiry right now. Please message us on WhatsApp.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Header */}
      <section className="bg-navy-950 text-white py-14 sm:py-20 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Connect With Us</span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-slate-100">
              Get in touch with Chennai's property advisory team.
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you are planning to purchase a family apartment, invest in a villa on ECR, or require legal guidance on title verification, our team is at your service.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Contact Details & Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-serif font-bold text-navy-950">Advisory Office</h2>
              
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-navy-900 shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-1">Office Address</strong>
                    <p className="text-slate-600 leading-relaxed">{BRAND.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-navy-900 shrink-0">
                    <Phone className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-1">Direct Calling</strong>
                    <a href={`tel:${BRAND.phone}`} className="text-navy-950 font-medium hover:text-emerald-700 underline underline-offset-2">
                      {BRAND.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-navy-900 shrink-0">
                    <Mail className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-1">Email Desk</strong>
                    <a href={`mailto:${BRAND.email}`} className="text-navy-950 font-medium hover:text-emerald-700 underline underline-offset-2">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-navy-900 shrink-0">
                    <Clock className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-1">Consultation Hours</strong>
                    <p className="text-slate-600">Monday – Sunday: 9:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent("Hello Property Gateway,\n\nI would like to schedule a consultation with an advisor regarding verified residential communities and projects in Chennai. Thank you!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-sm transition-all shadow-sm active:scale-[0.98]"
                >
                  <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-5 h-5 object-contain" />
                  Instant WhatsApp Consultation
                </a>
              </div>
            </div>

            {/* RERA Notice Box */}
            <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-navy-950">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Statutory Compliance Notice</span>
              </div>
              <p>
                Property Gateway operates under Tamil Nadu Real Estate Regulatory Authority Agent Registration <strong>{BRAND.reraId}</strong>. We do not accept undisclosed cash charges or broker commissions on builder direct offerings.
              </p>
            </div>
          </div>

          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-navy-950 mb-1">Send an Inquiry</h2>
              <p className="text-sm text-slate-600 mb-6">
                Fill in your requirements below. Our Chennai micro-market specialist will contact you within 2 business hours.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h3 className="text-base font-semibold text-emerald-950">Inquiry Received Successfully</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Thank you! Our property advisory specialist has received your requirements and will reach out shortly with vetted options.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
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
                        className="w-full text-base px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="e.g. 98400 12345"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full text-base px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. anand@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-base px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredLocation" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Location
                      </label>
                      <select
                        id="preferredLocation"
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                        className="w-full text-base px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                      >
                        <option value="Any Location">Any Location in Chennai</option>
                        {CHENNAI_LOCATIONS.filter(l => l !== "All Locations").map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="propertyType" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Property Category
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full text-base px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                      >
                        {PROPERTY_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Specific Requirements or Questions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="e.g. Looking for a 3 BHK near Tidel Park or Guindy within ₹1.2 Cr, ready within 6 months."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full text-base px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                    ></textarea>
                  </div>

                  {/* DPDP Consent */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="agreeConsent"
                      name="agreeConsent"
                      checked={formData.agreeConsent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700"
                    />
                    <label htmlFor="agreeConsent" className="text-xs text-slate-600 leading-normal">
                      I consent to Property Gateway contacting me via Phone or WhatsApp regarding relevant Chennai properties per the DPDP Act 2023. We do not sell or spam your contact info.
                    </label>
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-navy-950 hover:bg-navy-900 text-white font-medium text-sm transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'loading' ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
