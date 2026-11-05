import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Cookie, RotateCcw, Mail, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../utils/constants';

export default function LegalPoliciesPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('privacy');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('terms')) setActiveTab('terms');
    else if (path.includes('cookie')) setActiveTab('cookies');
    else if (path.includes('refund')) setActiveTab('refund');
    else setActiveTab('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="bg-navy-950 text-white py-12 border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Compliance, Trust & Statutory Disclosures
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-100">
            Legal Policies & Consumer Rights
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Strictly aligned with India's Digital Personal Data Protection (DPDP) Act 2023 and Tamil Nadu RERA regulations.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
          <Link
            to="/privacy-policy"
            onClick={() => setActiveTab('privacy')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'privacy'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy Policy
          </Link>
          <Link
            to="/terms-and-conditions"
            onClick={() => setActiveTab('terms')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'terms'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Terms of Service
          </Link>
          <Link
            to="/cookie-policy"
            onClick={() => setActiveTab('cookies')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'cookies'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Cookie className="w-4 h-4" />
            Cookie Policy
          </Link>
          <Link
            to="/refund-policy"
            onClick={() => setActiveTab('refund')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'refund'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            Refund Policy
          </Link>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-sm leading-relaxed text-slate-700 text-sm space-y-6">
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-navy-950">Privacy Policy (DPDP Act 2023 Aligned)</h2>
              <p className="text-xs text-slate-500">Effective Date: November 2025 | Last Updated: March 2026</p>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">1. Data Controller Identification</h3>
                <p>
                  <strong>{BRAND.name}</strong>, with registered address at {BRAND.address}, operates as the Data Fiduciary under the Digital Personal Data Protection Act, 2023 (DPDP Act). For queries or data grievances, our Data Protection Officer is reachable at <a href={`mailto:${BRAND.email}`} className="text-emerald-700 underline">{BRAND.email}</a>.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">2. Personal Data We Collect</h3>
                <p>We practice strict data minimization. We only collect details you voluntarily provide through our site forms or WhatsApp inquiries:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li><strong>Contact Details:</strong> Full Name, Mobile / WhatsApp Number, and Email Address.</li>
                  <li><strong>Property Preferences:</strong> Desired budget range, bedroom configuration (BHK), preferred Chennai micro-markets (e.g., OMR, ECR, Anna Nagar).</li>
                  <li><strong>Site Visit Scheduling Data:</strong> Preferred inspection date and pickup location for our complimentary AC cab visit.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">3. Purpose and Lawful Basis for Processing</h3>
                <p>
                  We process your data strictly to arrange requested site visits, share developer floor plans and cost sheets, and answer your inquiries. We do not sell, rent, or lease your personal information to third-party marketing brokers.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">4. Your Data Rights & Deletion</h3>
                <p>
                  Under DPDP Act 2023, you retain full rights to:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Request a summary of personal data held about you.</li>
                  <li>Request correction of inaccurate information.</li>
                  <li>Withdraw consent and request immediate deletion of your records.</li>
                </ul>
                <p className="mt-2">
                  To request complete deletion of your data, simply email us at <strong>{BRAND.email}</strong> with the subject line <em>"Data Deletion Request"</em> and your phone number. Your record will be permanently purged within 48 business hours.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-navy-950">Terms & Conditions of Service</h2>
              <p className="text-xs text-slate-500">Effective Date: November 2025</p>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">1. Regulatory Status & Scope</h3>
                <p>
                  {BRAND.name} is a licensed Real Estate Consulting entity operating under Tamil Nadu Real Estate Regulatory Authority Agent Registration <strong>{BRAND.reraId}</strong>. We act as an authorized channel sales facilitator between prospective property buyers and RERA-registered real estate developers in Tamil Nadu.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">2. Accuracy of Project Details & Floor Plans</h3>
                <p>
                  All project specifications, dimensions, amenities, and floor plans displayed on this website are sourced directly from developer project brochures and official RERA filings. While we make every effort to maintain accurate data, developer specifications remain subject to change per official builder agreements and RERA sanction amendments.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">3. Zero Brokerage Guarantee</h3>
                <p>
                  We guarantee <strong>0% brokerage fee</strong> charged to homebuyers on all direct builder primary sale units. Any secondary resale or private transactional arrangements are executed under distinct, written agreements before any advance or consideration is paid.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">4. Limitation of Liability</h3>
                <p>
                  Final sale agreements, construction delivery timelines, and handover schedules remain the sole contractual responsibility of the respective project developer. Buyers are advised to conduct independent title verification through qualified legal counsel prior to signing sale agreements.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-navy-950">Cookie & Storage Policy</h2>
              <p className="text-xs text-slate-500">Effective Date: November 2025</p>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">1. What are Cookies?</h3>
                <p>
                  Cookies and local storage are small text files placed on your device to make web browsing seamless and remember your browsing preferences.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">2. How We Use Storage</h3>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li><strong>Essential Cookies:</strong> Used to maintain your search filter preferences (location, budget) and remember your cookie banner decision.</li>
                  <li><strong>Performance & Analytics:</strong> Aggregated, anonymous metrics to understand which micro-markets (e.g. OMR or Anna Nagar) are most popular so we can curate relevant properties.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">3. Managing Preferences</h3>
                <p>
                  You can clear or disable cookies via your browser settings at any time without impacting your ability to browse listed properties on {BRAND.name}.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-navy-950">Refund & Cancellation Policy</h2>
              <p className="text-xs text-slate-500">Effective Date: November 2025</p>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">1. Advisory Consultation & Site Visits</h3>
                <p>
                  Property consultation, project shortlisting, and door-to-door cab site visit arrangements provided by {BRAND.name} are <strong>100% complimentary</strong>. There are no registration fees, consultation charges, or cancellation penalties.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">2. Booking Tokens & Developer Consideration</h3>
                <p>
                  {BRAND.name} does <strong>not</strong> collect property purchase advance payments or token booking amounts directly into our accounts. All booking payments, allotment tokens, and installment considerations are remitted directly to the respective builder's designated RERA Escrow Bank Account.
                </p>
                <p className="mt-2">
                  Refund of booking tokens is governed strictly by the developer's official Allotment Letter and RERA guidelines. If a booking is cancelled within the builder's statutory cooling-off window, the refund is processed directly by the builder per RERA norms.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-navy-950">3. Inquiries & Assistance</h3>
                <p>
                  For any questions regarding property cancellation terms or builder escrow receipts, please reach out to our client grievance desk at <strong>{BRAND.email}</strong> or <strong>{BRAND.phoneDisplay}</strong>.
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>{BRAND.name} • TNRERA Reg: {BRAND.reraId}</span>
            <a href={`mailto:${BRAND.email}`} className="text-emerald-700 hover:underline">
              Contact Compliance Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
