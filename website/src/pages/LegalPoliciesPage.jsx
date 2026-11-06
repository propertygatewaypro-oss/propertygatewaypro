import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Cookie, RotateCcw, Check, Phone, Mail, MapPin, ExternalLink, ArrowRight, Building2 } from 'lucide-react';
import { BRAND } from '../utils/constants';

export default function LegalPoliciesPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('terms');

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('privacy')) setActiveTab('privacy');
    else if (path.includes('cookie')) setActiveTab('cookies');
    else if (path.includes('refund')) setActiveTab('refund');
    else setActiveTab('terms');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 antialiased selection:bg-[#C98A4B]/20 selection:text-[#0F1117]">
      
      {/* 1. HERO HEADER WITH OBSIDIAN & BRONZE ACCENTS */}
      <div className="bg-[#0F1117] text-white pt-28 pb-14 border-b border-[#232733] relative overflow-hidden">
        {/* Subtle decorative gold gradient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C98A4B]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
            <Link to="/" className="hover:text-[#C98A4B] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#C98A4B] font-medium capitalize">
              {activeTab === 'terms' && 'Terms of Use'}
              {activeTab === 'privacy' && 'Privacy Policy'}
              {activeTab === 'cookies' && 'Cookie Policy'}
              {activeTab === 'refund' && 'Refund & Cancellation Policy'}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1E29] border border-[#C98A4B]/40 text-[#C98A4B] text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-[#C98A4B]" />
                <span>TNRERA Registered: {BRAND.reraId}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF9F6] tracking-tight">
                {activeTab === 'terms' && 'Terms of Use'}
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'cookies' && 'Cookie Policy'}
                {activeTab === 'refund' && 'Refund & Cancellation Policy'}
              </h1>
              {/* Bronze Accent Underline Bar */}
              <div className="w-16 h-1 bg-[#C98A4B] rounded-full mt-3" />
            </div>

            <div className="text-xs text-slate-400 space-y-1 md:text-right font-mono">
              <p>Legal Entity: <span className="text-white font-semibold">{BRAND.name}</span></p>
              <p>Jurisdiction: <span className="text-white">Chennai, Tamil Nadu, India</span></p>
              <p className="text-[#C98A4B]">Aligned with DPDP Act 2023 & TNRERA</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="sticky top-16 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E2D8] py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to="/termsofuse"
              onClick={() => setActiveTab('terms')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-[#0F1117] text-white shadow-md border border-[#C98A4B]/40'
                  : 'bg-white text-slate-700 hover:text-[#0F1117] hover:bg-[#F3EFE7] border border-[#E0D9CD]'
              }`}
            >
              <FileText className={`w-4 h-4 ${activeTab === 'terms' ? 'text-[#C98A4B]' : 'text-slate-500'}`} />
              <span>Terms of Use</span>
            </Link>

            <Link
              to="/privacy-policy"
              onClick={() => setActiveTab('privacy')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-[#0F1117] text-white shadow-md border border-[#C98A4B]/40'
                  : 'bg-white text-slate-700 hover:text-[#0F1117] hover:bg-[#F3EFE7] border border-[#E0D9CD]'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${activeTab === 'privacy' ? 'text-[#C98A4B]' : 'text-slate-500'}`} />
              <span>Privacy Policy</span>
            </Link>

            <Link
              to="/cookie-policy"
              onClick={() => setActiveTab('cookies')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-[#0F1117] text-white shadow-md border border-[#C98A4B]/40'
                  : 'bg-white text-slate-700 hover:text-[#0F1117] hover:bg-[#F3EFE7] border border-[#E0D9CD]'
              }`}
            >
              <Cookie className={`w-4 h-4 ${activeTab === 'cookies' ? 'text-[#C98A4B]' : 'text-slate-500'}`} />
              <span>Cookies Policy</span>
            </Link>

            <Link
              to="/refund-policy"
              onClick={() => setActiveTab('refund')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'refund'
                  ? 'bg-[#0F1117] text-white shadow-md border border-[#C98A4B]/40'
                  : 'bg-white text-slate-700 hover:text-[#0F1117] hover:bg-[#F3EFE7] border border-[#E0D9CD]'
              }`}
            >
              <RotateCcw className={`w-4 h-4 ${activeTab === 'refund' ? 'text-[#C98A4B]' : 'text-slate-500'}`} />
              <span>Refund & Cancellation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. POLICY BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl border border-[#E7E2D8] p-6 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.05)] text-slate-700 text-sm leading-relaxed space-y-8">
          
          {/* ========================================================= */}
          {/* A. TERMS OF USE (Directly Inspired by PropLeaf Reference) */}
          {/* ========================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-8">
              
              {/* Preamble & Intermediary Role */}
              <section className="space-y-3.5">
                <h2 className="text-2xl font-serif font-bold text-[#0F1117] tracking-tight">
                  1. Nature of Platform & Intermediary Role
                </h2>
                <p>
                  <strong>Property Gateway</strong> (<a href="https://propertygateway.com" className="text-[#C98A4B] hover:underline">propertygateway.com</a>) intends to connect the buyer of various verified properties with the seller or developer of such properties through its Website. In providing a unified interface to verified residential villas, apartments, plots, and commercial projects in Chennai, Property Gateway or any of its affiliates does not provide any service of any nature to the users either for commercial purposes or otherwise, save and except for the limited purposes of providing access to a communication and consultation system over which information would be made available by developers/third parties to you which shall be transmitted or temporarily stored or hosted.
                </p>
                <p>
                  However, Property Gateway does not:
                </p>
                <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Initiate any electronic transmission without user request or inquiry;</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Select the receiver of the transmission without explicit customer engagement;</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Select or modify the information contained in the transmission without developer verification.</span>
                  </div>
                </div>
                <p>
                  If you have any questions regarding this Disclaimer or our regulatory standing, you may please{' '}
                  <Link to="/contact" className="text-[#C98A4B] font-medium hover:underline">contact us</Link>{' '}
                  and our compliance desk will attend to your query.
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  2. Irrevocable Acceptance of Terms
                </h2>
                <p>
                  Any use of this Website would expressly mean that you irrevocably accept all the terms of use specified herein. You understand that you are free to not accept the terms and conditions contained herein and in such event you are advised not to use or access this Website in any manner. Your use or access of this Website in any manner shall constitute an irrevocable acceptance of this terms of use.
                </p>
              </section>

              {/* Proprietary Rights & Copyright */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  3. Proprietary Rights & Intellectual Property
                </h2>
                <p>
                  Any person who is accessing or has accessed any information or data from this Website acknowledges and agrees that all proprietary rights, statutory or otherwise, in the information received by such person shall remain the exclusive property of Property Gateway. Any reproduction, redistribution, or transmission, for consideration or otherwise, of any such information contained in this Website is strictly prohibited and would constitute a breach of the laws of India.
                </p>
              </section>

              {/* Invitation to Offer & Cross-Border Data */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  4. Invitation to Offer & International / NRI Usage
                </h2>
                <p>
                  This Website is not to be and should not be construed as purporting to offer or an invitation to offer. Further, this website is not to be and should not be construed as purporting to offer or inviting to offer any information or services to citizens of countries other than who are subject to the jurisdiction of and the laws of India.
                </p>
                <p>
                  The User agrees that given the nature of the Internet, even though the Website is targeted to Indian residents and Non-Resident Indians (NRIs) seeking property in Chennai, it may be accessed in other parts of the world. If the User is not an Indian resident and yet uses the Website, he acknowledges, understands and agrees that he is doing so on his own initiative and at his own risk and that it is his responsibility (and not Property Gateway's responsibility) to make sure that his use of the Website complies with all applicable local laws.
                </p>
                <p>
                  If the User is not an Indian resident, by using this Website and/or submitting his personally identifiable information or any other information on the Website, he expressly consents to the transfer of such data to India, and to the processing of such data on Property Gateway's Indian servers, where his data will be governed by Indian laws that may provide a level of data protection different than his country.
                </p>
              </section>

              {/* No Financial / Legal Advice Disclaimer */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  5. No Investment, Legal, or Tax Advisory
                </h2>
                <p>
                  Property Gateway does not provide any financial or investment advice in this regard and shall not be liable to any person who enters into any business relationship with the entity whose name appears on this Website and/or any other party based on any information accessed from this Website or uses such information or is accessing any information for any investment, company affairs, legal, tax or accounting advice or advice regarding the suitability or profitability of a security or real estate investment.
                </p>
                <p>
                  Any information on this Website must not be construed as business or investment advice, and the user should exercise due caution and/or seek independent legal advice before the user enters into any business relationship with any builder entity or enters into any investment or financial obligation based on any information provided on this Website.
                </p>
              </section>

              {/* Third-Party Links */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  6. Third-Party Links & Developer Portals
                </h2>
                <p>
                  This website may contain links to other Websites or videos that may belong to and/or hosted and/or operated by parties other than Property Gateway, for e.g. videos hosted by our third party service provider's server or any other similar activity. Property Gateway is not responsible for the contents of any nature (including any related advertisements or videos) or information offered by any such linked Website or any link contained in a linked Website, or any changes or updates to such Websites, irrespective of whether these Websites are operated by affiliates of Property Gateway or other third parties. Inclusion of such a link on this Website does not imply any degree of endorsement of any nature by Property Gateway regarding the quality of information provided or the nature of content by such a linked Website.
                </p>
                <p>
                  This Website may contain information sourced from third parties. Property Gateway is not responsible for the contents of or information offered by such third parties on this Website. Inclusion of such information on this Website does not imply any degree of endorsement by Property Gateway regarding the quality of information provided or the nature of content provided by the third party.
                </p>
              </section>

              {/* Marketing, SMS, WhatsApp & National DND Override */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <div className="bg-[#FAF9F6] border-2 border-[#C98A4B]/30 rounded-2xl p-5 sm:p-6 space-y-3">
                  <h2 className="text-lg font-serif font-bold text-[#0F1117] tracking-tight flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C98A4B]" />
                    <span>7. Communication Consent & National DND/NDNC Override</span>
                  </h2>
                  <p>
                    By agreeing to post a property requirement, scheduling a free cab site visit, requesting a cost sheet, or submitting any inquiry at Property Gateway (<a href="https://propertygateway.com" className="text-[#C98A4B] hover:underline">propertygateway.com</a>) or by using the services of Property Gateway, the user hereby acknowledges and allows Property Gateway, its partners, and advisors to get in touch with him/her from time to time for intimating the users on events, potential buyers, verified villas, apartments, or properties they might be interested in. This could include offers to upgrade to premium services, information, as well as promotions.
                  </p>
                  <p className="font-semibold text-[#0F1117]">
                    Property Gateway can use the user's email address and/or contact numbers for this purpose irrespective of the user's registration with the National Do Not Call Registry (NDNC) and will override any such DND registrations.
                  </p>
                </div>
              </section>

              {/* License & Restrictions */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  8. License & Content Restrictions
                </h2>
                <p>
                  Unless otherwise stated, Property Gateway and/or its licensors own the intellectual property rights for all material on Property Gateway. All intellectual property rights are reserved. You may access this from Property Gateway for your own personal use subjected to restrictions set in these terms and conditions.
                </p>
                <p className="font-semibold text-slate-900">You must not:</p>
                <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs">✕</span>
                    <span>Republish material from Property Gateway;</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs">✕</span>
                    <span>Sell, rent, or sub-license material from Property Gateway;</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs">✕</span>
                    <span>Reproduce, duplicate, or copy material from Property Gateway;</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs">✕</span>
                    <span>Redistribute content from Property Gateway without prior written authorization.</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-mono">This Agreement shall begin on the date of your first access to this Website.</p>
              </section>

              {/* User Inquiries & Warranties */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  9. User Comments & Consultation Submissions
                </h2>
                <p>
                  Parts of this website allow users to post requirements and submit inquiries. Property Gateway does not filter, edit, publish, or review comments prior to their appearance on the website. Comments and requirements reflect the views of the person who posts them. To the extent permitted by applicable laws, Property Gateway shall not be liable for any requirements or for any liability, damages, or expenses caused or suffered as a result of any use of or posting of or appearance of comments on this website.
                </p>
                <p>
                  Property Gateway reserves the right to monitor all requirements and remove any submissions which can be considered inappropriate, offensive, fraudulent, or causes breach of these Terms and Conditions.
                </p>
              </section>

              {/* Governing Law */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  10. Governing Law & Jurisdiction
                </h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in relation hereto shall be subject to the exclusive jurisdiction of the competent courts in <strong>Chennai, Tamil Nadu, India</strong>.
                </p>
              </section>

            </div>
          )}

          {/* ========================================================= */}
          {/* B. PRIVACY POLICY (DPDP Act 2023 & Indian Law Aligned) */}
          {/* ========================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-8">
              
              {/* Introduction */}
              <section className="space-y-3.5">
                <h2 className="text-2xl font-serif font-bold text-[#0F1117] tracking-tight">
                  1. Privacy Commitment & Data Fiduciary Details
                </h2>
                <p>
                  At <strong>Property Gateway</strong>, accessible from <a href="https://propertygateway.com" className="text-[#C98A4B] hover:underline">propertygateway.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by Property Gateway and how we use and protect it, in strict accordance with India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>Information Technology Act, 2000</strong>.
                </p>
                <p>
                  <strong>Data Fiduciary Identity:</strong> Property Gateway, operating from {BRAND.address}. TNRERA Agent Registration: <strong>{BRAND.reraId}</strong>.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  2. Information We Collect
                </h2>
                <p>
                  The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E2D8] space-y-1.5">
                    <h3 className="font-bold text-[#0F1117] text-sm">Direct Contact Details</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your full name, email address, international dialing code, and mobile phone number provided when requesting a consultation, submitting a requirement, or scheduling a visit.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E2D8] space-y-1.5">
                    <h3 className="font-bold text-[#0F1117] text-sm">Property Preferences</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Preferred Chennai micro-markets (OMR, ECR, Anna Nagar, Adyar), configuration (BHK, luxury villas, penthouses), and estimated investment budget ranges.
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  3. Lawful Purpose & Processing
                </h2>
                <p>We use the information we collect in various ways, including to:</p>
                <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Provide, operate, and maintain our property advisory platform;</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Curate personalized verified property shortlists, floor plans, and developer cost sheets;</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Coordinate complimentary, chauffeured AC cab site visits with licensed TNRERA developers;</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Communicate with you directly, including customer service updates, via Phone, WhatsApp, SMS, and Email;</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C98A4B]/15 text-[#C98A4B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Prevent bot spam, unauthorized access, and protect platform data security.</span>
                  </div>
                </div>
              </section>

              {/* Zero Data Selling Guarantee */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <div className="bg-[#FAF9F6] border-2 border-emerald-600/30 rounded-2xl p-5 space-y-2">
                  <h3 className="font-serif font-bold text-[#0F1117] text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>4. Zero Third-Party Data Selling Policy</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Property Gateway maintains a strict, unconditional guarantee: <strong>We do not sell, rent, trade, or broadcast your personal data to third-party telemarketing agencies, commercial brokers, or bulk advertisers.</strong> Your information is solely utilized by Property Gateway consultants to assist your real estate acquisition in Chennai.
                  </p>
                </div>
              </section>

              {/* User Rights under DPDP Act 2023 */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  5. Your Statutory Rights (DPDP Act 2023)
                </h2>
                <p>Every homebuyer and platform user is entitled to the following statutory rights:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
                    <h4 className="font-bold text-xs text-[#0F1117]">Right to Access & Summary</h4>
                    <p className="text-[11px] text-slate-600 mt-1">Request a complete summary of all personal data held about you.</p>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
                    <h4 className="font-bold text-xs text-[#0F1117]">Right to Correction & Updating</h4>
                    <p className="text-[11px] text-slate-600 mt-1">Request rectification of inaccurate, outdated, or incomplete data.</p>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
                    <h4 className="font-bold text-xs text-[#0F1117]">Right to Erasure / Deletion</h4>
                    <p className="text-[11px] text-slate-600 mt-1">Request complete purge of your contact data within 48 business hours.</p>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
                    <h4 className="font-bold text-xs text-[#0F1117]">Right to Grievance Redressal</h4>
                    <p className="text-[11px] text-slate-600 mt-1">Direct access to our dedicated Data Protection Officer in Chennai.</p>
                  </div>
                </div>
              </section>

              {/* Grievance Officer & Contact */}
              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  6. Grievance Officer & Data Deletion Desk
                </h2>
                <p>
                  In accordance with the DPDP Act 2023, if you have any questions, wish to withdraw consent, or request permanent deletion of your data, please contact our designated officer:
                </p>
                <div className="bg-[#0F1117] text-white p-5 rounded-2xl border border-[#C98A4B]/30 space-y-2 text-xs font-mono">
                  <p><strong className="text-[#C98A4B]">Officer:</strong> Compliance & Data Protection Officer</p>
                  <p><strong className="text-[#C98A4B]">Agency:</strong> {BRAND.name}</p>
                  <p><strong className="text-[#C98A4B]">Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-emerald-400 hover:underline">{BRAND.email}</a></p>
                  <p><strong className="text-[#C98A4B]">Phone:</strong> <a href={`tel:${BRAND.phone}`} className="text-emerald-400 hover:underline">{BRAND.phoneDisplay}</a></p>
                  <p><strong className="text-[#C98A4B]">Postal Address:</strong> {BRAND.address}</p>
                </div>
              </section>

            </div>
          )}

          {/* ========================================================= */}
          {/* C. COOKIE POLICY */}
          {/* ========================================================= */}
          {activeTab === 'cookies' && (
            <div className="space-y-8">
              <section className="space-y-3.5">
                <h2 className="text-2xl font-serif font-bold text-[#0F1117] tracking-tight">
                  1. What Are Cookies
                </h2>
                <p>
                  Like almost all professional websites, this site employs the use of cookies, which are tiny files downloaded to your device, to improve your browsing experience. This section describes what information they gather, how we use it, and why we sometimes need to store these cookies.
                </p>
              </section>

              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  2. How We Use Cookies & Local Storage
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E7E2D8]">
                    <h3 className="font-bold text-[#0F1117] text-sm">Essential & Functional Cookies</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Used to remember your selected search filters (micro-market, budget range, property types) as you browse across pages so you do not need to re-enter them on every click.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E7E2D8]">
                    <h3 className="font-bold text-[#0F1117] text-sm">Behavioral & Frequency Capping</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Remembers when you dismiss the consultation popup so you are not disturbed again during your active browsing session.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  3. Disabling Cookies
                </h2>
                <p>
                  You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies may affect the functionality of this and many other websites that you visit.
                </p>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* D. REFUND & CANCELLATION POLICY */}
          {/* ========================================================= */}
          {activeTab === 'refund' && (
            <div className="space-y-8">
              <section className="space-y-3.5">
                <h2 className="text-2xl font-serif font-bold text-[#0F1117] tracking-tight">
                  1. Zero Consultation Fee Guarantee
                </h2>
                <p>
                  All real estate consulting services provided by <strong>Property Gateway</strong> — including personalized architectural shortlists, RERA documentation audits, developer cost sheets, and chauffeured AC cab site tours in Chennai — are <strong>100% complimentary</strong> to prospective homebuyers. We charge zero advisory fees or site inspection fees.
                </p>
              </section>

              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  2. Allotment Tokens & Developer Escrow Payments
                </h2>
                <p>
                  Property Gateway does <strong>NOT</strong> collect property purchase advances, booking tokens, or installment payments into its bank accounts. All purchase considerations are remitted directly to the respective builder's designated <strong>TNRERA Escrow Account</strong>.
                </p>
                <p>
                  Cancellation of an allotment booking and refund of token deposits are governed strictly by the developer's official Allotment Letter and Section 18 of the Real Estate (Regulation and Development) Act, 2016. If a cancellation is requested within the developer's cooling-off period, refunds are disbursed directly by the builder into your registered bank account.
                </p>
              </section>

              <section className="space-y-3.5 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#0F1117] tracking-tight">
                  3. Escalation & Client Assistance
                </h2>
                <p>
                  Should you encounter any delays in receiving a developer refund or need assistance with builder cancellation protocols, our senior advisory team will liaise with the developer's management on your behalf:
                </p>
                <div className="p-4 bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-[#0F1117] block">Chennai Client Support Desk</span>
                    <span className="text-slate-600">Operating Hours: Mon – Sun (9:00 AM – 8:00 PM IST)</span>
                  </div>
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F1117] text-white font-medium hover:bg-[#1A1E29] transition-colors shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C98A4B]" />
                    <span>{BRAND.phoneDisplay}</span>
                  </a>
                </div>
              </section>
            </div>
          )}

          {/* Statutory Footer Badge */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <strong className="text-slate-900">{BRAND.name}</strong> • TNRERA Agent Reg: <span className="font-mono text-[#C98A4B] font-semibold">{BRAND.reraId}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="text-[#C98A4B] hover:underline font-medium">
                Submit Legal Query
              </Link>
              <span>•</span>
              <a href={`mailto:${BRAND.email}`} className="text-slate-600 hover:text-slate-900">
                {BRAND.email}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
