import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, Phone } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export const PRIVACY_SECTIONS = [
  { id: 'introduction', number: '1', title: 'Introduction & Data Fiduciary Identity' },
  { id: 'information-we-collect', number: '2', title: 'Information We Collect' },
  { id: 'personal-information', number: '3', title: 'Personal Information' },
  { id: 'property-requirements', number: '4', title: 'Property Requirements & Preferences' },
  { id: 'enquiry-forms', number: '5', title: 'Enquiry Forms & Consultation Requests' },
  { id: 'how-we-use-information', number: '6', title: 'How We Use Your Information' },
  { id: 'communications', number: '7', title: 'Communication Through Calls, Email & WhatsApp' },
  { id: 'marketing-communications', number: '8', title: 'Marketing & Promotional Communication' },
  { id: 'sharing-with-developers', number: '9', title: 'Sharing Information With Developers & Partners' },
  { id: 'third-party-services', number: '10', title: 'Third-Party Service Providers' },
  { id: 'data-storage-retention', number: '11', title: 'Data Storage & Retention' },
  { id: 'data-security', number: '12', title: 'Data Security Measures' },
  { id: 'cookies-analytics', number: '13', title: 'Cookies & Website Analytics' },
  { id: 'privacy-rights', number: '14', title: 'Privacy Rights & Consent Withdrawal' },
  { id: 'childrens-privacy', number: '15', title: "Children's Privacy" },
  { id: 'policy-updates', number: '16', title: 'Policy Updates & Amendments' },
  { id: 'contact-grievance', number: '17', title: 'Contact & Grievance Redressal Desk' },
];

export default function PrivacyPolicyContent() {
  return (
    <div className="space-y-10 text-slate-700 leading-relaxed text-sm">
      
      {/* 1. Introduction & Data Fiduciary Identity */}
      <section id="introduction" className="scroll-mt-36 space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            01
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Introduction & Data Fiduciary Identity
          </h2>
        </div>
        <p>
          At <strong>Property Gateway</strong> (<a href="https://propertygateway.com" className="text-[#A88548] hover:underline font-medium">propertygateway.com</a>), your privacy and data autonomy are fundamental to our advisory relationship. This Privacy Policy outlines the categories of data we collect, why we collect it, how it is processed, and the statutory safeguards provided to you.
        </p>
        <p>
          This document is published in strict conformity with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the Digital Personal Data Protection Rules, the <strong>Information Technology Act, 2000</strong>, and regulatory guidelines established by the <strong>Tamil Nadu Real Estate Regulatory Authority (TNRERA)</strong>.
        </p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-1.5 text-xs font-mono">
          <p><strong className="text-[#181B22]">Data Fiduciary Entity:</strong> {BRAND.name}</p>
          <p><strong className="text-[#181B22]">TNRERA Agent Registration:</strong> {BRAND.reraId}</p>
          <p><strong className="text-[#181B22]">Registered Advisory Office:</strong> {BRAND.address}</p>
          <p><strong className="text-[#181B22]">Authorized Digital Desk:</strong> {BRAND.email} | {BRAND.phoneDisplay}</p>
        </div>
      </section>

      {/* 2. Information We Collect */}
      <section id="information-we-collect" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            02
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Information We Collect
          </h2>
        </div>
        <p>
          We operate under strict data minimization principles. We only collect information that is strictly necessary to fulfill your real estate advisory requests, facilitate developer site inspections, verify TNRERA compliance, and provide accurate market assessments across Chennai.
        </p>
        <p>Information is collected through two principal channels:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E2D8] space-y-1.5">
            <h3 className="font-bold text-xs text-[#181B22] uppercase tracking-wider">Direct User Submission</h3>
            <p className="text-xs text-slate-600">
              Information you deliberately submit via our Post Requirement popup, Schedule Visit modal, WhatsApp chatbot, contact forms, or phone consultations.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E2D8] space-y-1.5">
            <h3 className="font-bold text-xs text-[#181B22] uppercase tracking-wider">Technical & Browsing Data</h3>
            <p className="text-xs text-slate-600">
              Aggregated browser type, device category, IP address, referral URLs, and filter states stored temporarily to ensure responsive site operation and bot protection.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Personal Information */}
      <section id="personal-information" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            03
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Personal Information
          </h2>
        </div>
        <p>
          When you register an enquiry or request property advisory assistance, we may collect the following personal identifiers:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm pl-2">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A88548] shrink-0 mt-2" />
            <span><strong>Full Legal Name:</strong> Used to personalize communication and register your site visit passes with developer security gates.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A88548] shrink-0 mt-2" />
            <span><strong>Verified Mobile Number:</strong> Required for tele-consultation, SMS OTP verification, and coordinating chauffeur arrival for site visits.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A88548] shrink-0 mt-2" />
            <span><strong>Email Address:</strong> Utilized to transmit comprehensive project brochures, unit floor plans, price breakdowns, and TNRERA sanction letters.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A88548] shrink-0 mt-2" />
            <span><strong>Country of Residence & Dialing Code:</strong> Crucial for identifying Non-Resident Indian (NRI) compliance workflows, time-zone alignment, and FEMA guidelines.</span>
          </li>
        </ul>
      </section>

      {/* 4. Property Requirements and Preferences */}
      <section id="property-requirements" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            04
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Property Requirements & Preferences
          </h2>
        </div>
        <p>
          To curate relevant inventory without spamming you with unsuitable projects, we collect specific property search parameters:
        </p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
          <p>• <strong>Micro-Market Preferences:</strong> Specific Chennai residential zones such as ECR, OMR, Anna Nagar, Porur, Adyar, Velachery, or Kovilambakkam.</p>
          <p>• <strong>Typology & Configuration:</strong> 2 BHK, 3 BHK, 4 BHK luxury apartments, sea-facing coastal villas, residential plots, or commercial retail spaces.</p>
          <p>• <strong>Financial Outlay & Budget:</strong> Planned investment range (e.g. ₹50 Lakhs to ₹2.5+ Crores) and home loan pre-approval status.</p>
          <p>• <strong>Possession Timeline:</strong> Ready-to-move-in properties vs. under-construction milestones and new launch opportunities.</p>
        </div>
      </section>

      {/* 5. Enquiry Forms and Consultation Requests */}
      <section id="enquiry-forms" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            05
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Enquiry Forms & Consultation Requests
          </h2>
        </div>
        <p>
          Every form on Property Gateway features an explicit consent acknowledgement. Submitting an enquiry indicates your conscious decision to initiate communication regarding specified properties. We record the exact timestamp, form identifier, and IP address of your submission to maintain an immutable consent audit trail required by the DPDP Act.
        </p>
      </section>

      {/* 6. How We Use Your Information */}
      <section id="how-we-use-information" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            06
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            How We Use Your Information
          </h2>
        </div>
        <p>Your data is processed strictly for lawful purposes directly connected to real estate advisory:</p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Synthesizing tailored recommendations matching your micro-market, lifestyle, and budget parameters;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Transmitting authenticated developer cost sheets, floor plans, and TNRERA sanction document links;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Arranging personalized on-site inspections with licensed developer representatives;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Verifying user identity to protect our community against automated scraping, fraudulent listings, and bot attacks.</span>
          </div>
        </div>
      </section>

      {/* 7. Communication Through Calls, Email and WhatsApp */}
      <section id="communications" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            07
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Communication Through Calls, Email & WhatsApp
          </h2>
        </div>
        <p>
          When you submit your phone number or email, our verified property specialists may contact you via telephonic voice calls, SMS, WhatsApp Business messaging, or direct email to fulfill your specific enquiry.
        </p>
        <div className="bg-[#FAF9F6] border-2 border-[#A88548]/30 rounded-2xl p-4 sm:p-5 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#181B22] flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#A88548]" />
            <span>National DND / NDNC Registry Exemption</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            By voluntarily posting a property requirement, submitting an enquiry, or requesting a callback, you provide express transactional consent to receive communications from Property Gateway advisors, irrespective of your registration with the National Do Not Call (NDNC) or Telecom Commercial Communications Customer Preference Portal (TRAI DND).
          </p>
        </div>
      </section>

      {/* 8. Marketing and Promotional Communication */}
      <section id="marketing-communications" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            08
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Marketing & Promotional Communication
          </h2>
        </div>
        <p>
          We may occasionally send curated updates regarding new pre-launches, RERA approval notices, or Chennai real estate market trends. You retain the absolute right to opt out of promotional messages at any time by:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
          <li>Clicking the "Unsubscribe" link in any promotional email;</li>
          <li>Replying <strong>"STOP"</strong> or <strong>"UNSUBSCRIBE"</strong> to any WhatsApp communication;</li>
          <li>Sending an email to <a href={`mailto:${BRAND.email}`} className="text-[#A88548] hover:underline font-mono">{BRAND.email}</a> with the subject line <em>"Opt-Out Communications"</em>.</li>
        </ul>
      </section>

      {/* 9. Sharing Information With Developers and Partners */}
      <section id="sharing-with-developers" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            09
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Sharing Information With Developers & Partners
          </h2>
        </div>
        <div className="bg-[#FAF9F6] border-2 border-emerald-600/30 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-[#181B22] text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Our Zero Third-Party Telemarketing Sale Policy</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Property Gateway <strong>never sells, rents, licenses, or broadcasts your personal data</strong> to generic third-party data brokers, insurance telemarketers, credit card issuers, or independent real estate aggregators.
          </p>
        </div>
        <p className="pt-2">
          <strong>Authorized Developer Sharing:</strong> When you specifically request a site visit, cost sheet, or booking assistance for a designated developer project (e.g., Casagrand, TVS Emerald, Puravankara, Brigade Group, Appaswamy), your contact details are shared exclusively with the authorized developer’s sales management desk solely to coordinate your visit pass, register your client record under our agency code, and ensure official RERA pricing protection.
        </p>
      </section>

      {/* 10. Third-Party Service Providers */}
      <section id="third-party-services" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            10
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Third-Party Service Providers
          </h2>
        </div>
        <p>
          We engage reputable infrastructure and technology vendors (Data Processors) to maintain secure hosting, database replication, transactional email delivery, and mapping services. These vendors operate under strict Non-Disclosure Agreements (NDAs) and data processing covenants compliant with the DPDP Act.
        </p>
      </section>

      {/* 11. Data Storage and Retention */}
      <section id="data-storage-retention" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            11
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Data Storage & Retention
          </h2>
        </div>
        <p>
          All personal data collected is stored on secure, encrypted cloud servers adhering to Indian data sovereignty norms. We retain personal data only for as long as reasonably required to fulfill property search advisory, comply with TNRERA audit trails, resolve disputes, or satisfy statutory tax requirements under Indian law.
        </p>
      </section>

      {/* 12. Data Security */}
      <section id="data-security" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            12
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Data Security Measures
          </h2>
        </div>
        <p>
          We employ state-of-the-art administrative, technical, and physical security measures including TLS 1.3 encryption in transit, salted password hashing, least-privilege role-based access controls, firewalls, and continuous vulnerability scans. While no digital platform is invulnerable, our security protocols meet or exceed industry benchmarks.
        </p>
      </section>

      {/* 13. Cookies and Website Analytics */}
      <section id="cookies-analytics" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            13
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Cookies & Website Analytics
          </h2>
        </div>
        <p>
          Property Gateway utilizes cookies to preserve your filter criteria (such as budget range and micro-market selections), safeguard form submissions against Cross-Site Request Forgery (CSRF), and assess website load speeds. Please consult our detailed <Link to="/cookie-policy" className="text-[#A88548] font-medium hover:underline">Cookie Policy</Link> for comprehensive technical disclosures and our interactive preference toggle.
        </p>
      </section>

      {/* 14. Privacy Rights and Consent Withdrawal */}
      <section id="privacy-rights" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            14
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Privacy Rights & Consent Withdrawal (DPDP Act 2023)
          </h2>
        </div>
        <p>As a Data Principal under India's DPDP Act, 2023, you hold enforceable statutory rights:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
            <h4 className="font-bold text-xs text-[#181B22]">Right to Access Summary</h4>
            <p className="text-[11px] text-slate-600 mt-1">Obtain a transparent summary of all personal data held and processed by Property Gateway.</p>
          </div>
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
            <h4 className="font-bold text-xs text-[#181B22]">Right to Rectification</h4>
            <p className="text-[11px] text-slate-600 mt-1">Update, correct, or complete any inaccurate or obsolete contact details or property preferences.</p>
          </div>
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
            <h4 className="font-bold text-xs text-[#181B22]">Right to Erasure (Data Purge)</h4>
            <p className="text-[11px] text-slate-600 mt-1">Request complete deletion of your records from active marketing and advisory databases within 48 business hours.</p>
          </div>
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E2D8]">
            <h4 className="font-bold text-xs text-[#181B22]">Right of Grievance Redressal</h4>
            <p className="text-[11px] text-slate-600 mt-1">Direct access to our Chennai-based Compliance Officer before approaching the Data Protection Board.</p>
          </div>
        </div>
      </section>

      {/* 15. Children's Privacy */}
      <section id="childrens-privacy" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            15
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Children's Privacy
          </h2>
        </div>
        <p>
          Our real estate advisory platform and consultation services are directed solely to individuals who have attained the age of majority (18 years) capable of entering into legally binding real estate contracts under the Indian Contract Act, 1872. We do not knowingly collect personal data from minors.
        </p>
      </section>

      {/* 16. Policy Updates */}
      <section id="policy-updates" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            16
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Policy Updates & Amendments
          </h2>
        </div>
        <p>
          We periodically review this policy to reflect legislative updates, statutory rule notifications under the DPDP Act, and technological enhancements. Substantive updates will be highlighted on this portal with a revised "Last Updated" timestamp. Continued use of our portal constitutes acceptance of revised terms.
        </p>
      </section>

      {/* 17. Contact and Grievance Redressal */}
      <section id="contact-grievance" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            17
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Contact & Grievance Redressal Desk
          </h2>
        </div>
        <p>
          In compliance with the DPDP Act 2023 and the Information Technology Rules, the designated Grievance & Compliance Officer for Property Gateway is:
        </p>
        <div className="bg-[#FAF9F6] text-[#1E232F] border border-[#E7E2D8] p-5 sm:p-6 rounded-2xl border border-[#A88548]/30 space-y-2.5 text-xs font-mono">
          <p><strong className="text-[#A88548]">Designation:</strong> Data Protection & Grievance Officer</p>
          <p><strong className="text-[#A88548]">Entity:</strong> {BRAND.name} (TNRERA {BRAND.reraId})</p>
          <p><strong className="text-[#A88548]">Official Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-emerald-400 hover:underline">{BRAND.email}</a></p>
          <p><strong className="text-[#A88548]">Helpline:</strong> <a href={`tel:${BRAND.phone}`} className="text-emerald-400 hover:underline">{BRAND.phoneDisplay}</a></p>
          <p><strong className="text-[#A88548]">Registered Office:</strong> {BRAND.address}</p>
          <p><strong className="text-[#A88548]">Response Timeline:</strong> Formal grievance acknowledgement within 24 hours; resolution within 30 statutory days.</p>
        </div>
      </section>

    </div>
  );
}
