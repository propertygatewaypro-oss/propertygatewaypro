import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, Phone, Mail, MapPin, AlertCircle, Building2, ExternalLink, Scale } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export const TERMS_SECTIONS = [
  { id: 'acceptance', number: '1', title: 'Acceptance of Terms' },
  { id: 'about-gateway', number: '2', title: 'About Property Gateway' },
  { id: 'nature-scope', number: '3', title: 'Nature & Scope of Real Estate Advisory' },
  { id: 'website-usage', number: '4', title: 'Website Usage & Permitted Activities' },
  { id: 'listings-descriptions', number: '5', title: 'Property Listings & Descriptions' },
  { id: 'prices-availability', number: '6', title: 'Accuracy of Prices & Real-Time Availability' },
  { id: 'third-party-developers', number: '7', title: 'Third-Party Developers & Builders' },
  { id: 'user-responsibilities', number: '8', title: 'User Responsibilities & Due Diligence' },
  { id: 'property-enquiries', number: '9', title: 'Property Enquiries & Booking Disclaimers' },
  { id: 'site-visits', number: '10', title: 'Site Visits & Consultations' },
  { id: 'brokerage-charges', number: '11', title: 'Brokerage & Advisory Charges' },
  { id: 'independent-verification', number: '12', title: 'Property Transactions & Legal Due Diligence' },
  { id: 'intellectual-property', number: '13', title: 'Intellectual Property Rights' },
  { id: 'third-party-websites', number: '14', title: 'Third-Party Websites & External Feeds' },
  { id: 'limitation-liability', number: '15', title: 'Limitation of Liability & Statutory Safe Harbor' },
  { id: 'modification-services', number: '16', title: 'Suspension or Modification of Services' },
  { id: 'governing-law', number: '17', title: 'Governing Law & Exclusive Jurisdiction' },
  { id: 'contact-info', number: '18', title: 'Contact Information & Compliance Notices' },
];

export default function TermsOfServiceContent() {
  return (
    <div className="space-y-10 text-slate-700 leading-relaxed text-sm">
      
      {/* 1. Acceptance of Terms */}
      <section id="acceptance" className="scroll-mt-36 space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            01
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Acceptance of Terms
          </h2>
        </div>
        <p>
          These Terms of Service constitute a legally binding agreement between you (whether personally or on behalf of an entity, referred to as <strong>"User"</strong>, <strong>"You"</strong>, or <strong>"Your"</strong>) and <strong>Property Gateway</strong> (referred to as <strong>"Company"</strong>, <strong>"We"</strong>, <strong>"Us"</strong>, or <strong>"Our"</strong>), governing your access to and use of <a href="https://propertygateway.com" className="text-[#A88548] hover:underline font-medium">propertygateway.com</a> as well as any related web applications, forms, consultation channels, and concierge services.
        </p>
        <p>
          By accessing or utilizing any part of this Website, you acknowledge that you have read, understood, and irrevocably agreed to be bound by these Terms, together with our <Link to="/privacy-policy" className="text-[#A88548] hover:underline font-medium">Privacy Policy</Link> and <Link to="/cookie-policy" className="text-[#A88548] hover:underline font-medium">Cookie Policy</Link>. If you do not agree with all of these terms, you are expressly prohibited from using this site and must discontinue use immediately.
        </p>
      </section>

      {/* 2. About Property Gateway */}
      <section id="about-gateway" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            02
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            About Property Gateway
          </h2>
        </div>
        <p>
          Property Gateway operates as a premier real estate consultancy and digital advisory platform based in Chennai, Tamil Nadu. The firm operates with full regulatory compliance under the Real Estate (Regulation and Development) Act, 2016 (RERA).
        </p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-1.5 text-xs font-mono">
          <p><strong className="text-[#181B22]">Licensed Real Estate Agent:</strong> {BRAND.name}</p>
          <p><strong className="text-[#181B22]">TNRERA Registration Number:</strong> {BRAND.reraId}</p>
          <p><strong className="text-[#181B22]">Registered Office Address:</strong> {BRAND.address}</p>
          <p><strong className="text-[#181B22]">Statutory Jurisdiction:</strong> Chennai, Tamil Nadu, Republic of India</p>
        </div>
      </section>

      {/* 3. Nature and Scope of Real Estate Advisory */}
      <section id="nature-scope" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            03
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Nature & Scope of Real Estate Advisory
          </h2>
        </div>
        <p>
          Property Gateway acts in the capacity of a professional real estate facilitator and marketing channel partner for licensed property developers in Chennai. We connect prospective homebuyers and commercial investors with verified residential apartments, coastal villas, integrated townships, and plotted layouts.
        </p>
        <p>
          In accordance with Section 79 of the Information Technology Act, 2000, Property Gateway serves as an electronic communication system and discovery interface. We do not:
        </p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Initiate any electronic message transmission without explicit user prompt or enquiry;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Select the recipient of transmission without verified customer consent;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Alter or fabricate technical project specifications provided by the sanctioning authority or developer.</span>
          </div>
        </div>
      </section>

      {/* 4. Website Usage */}
      <section id="website-usage" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            04
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Website Usage & Permitted Activities
          </h2>
        </div>
        <p>
          You are granted a limited, non-exclusive, non-transferable, revocable license to access and browse Property Gateway solely for your personal, non-commercial acquisition of real estate properties in Chennai.
        </p>
        <p className="font-semibold text-slate-900">Prohibited Conduct:</p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
          <p>• <strong>Automated Scraping:</strong> Deploying crawlers, bots, data mining algorithms, or screen-scraping utilities to harvest floor plans, prices, or photographs;</p>
          <p>• <strong>System Tampering:</strong> Introducing malicious code, SQL injection payloads, denial-of-service scripts, or probing backend API endpoints;</p>
          <p>• <strong>Misrepresentation:</strong> Impersonating another person or registering fictitious telephone numbers and identities in enquiry forms;</p>
          <p>• <strong>Commercial Reselling:</strong> Republishing, sub-licensing, or duplicating our curated property writeups or market analytics for external brokerage syndicates.</p>
        </div>
      </section>

      {/* 5. Property Listings and Descriptions */}
      <section id="listings-descriptions" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            05
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Property Listings & Descriptions
          </h2>
        </div>
        <p>
          All project descriptions, architectural 3D renderings, floor layout sketches, master plans, amenity catalogues, and projected handover dates displayed on Property Gateway are collated from promotional brochures and statutory filings submitted by respective builders to TNRERA.
        </p>
        <p>
          Photographs and visual renderings depict artistic impressions, model show villas, or sample apartments. Actual finished units may vary in colour schemes, fittings, and fixture specifications depending on developer construction milestones.
        </p>
      </section>

      {/* 6. Accuracy of Prices and Availability */}
      <section id="prices-availability" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            06
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Accuracy of Prices & Real-Time Availability
          </h2>
        </div>
        <div className="bg-[#FAF9F6] border-2 border-[#A88548]/30 rounded-2xl p-5 space-y-2.5">
          <h3 className="font-serif font-bold text-[#181B22] text-base flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#A88548]" />
            <span>Pricing & Inventory Disclaimer</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Property prices displayed on this portal (e.g., base cost per sq. ft., total starting value) are indicative base quotations supplied by developers. <strong>Prices, availability, floor-rise premiums, preferred location charges (PLC), clubhouse fees, car park allotments, statutory GST, stamp duty, and registration charges are subject to frequent revisions by builders without prior notice.</strong>
          </p>
          <p className="text-xs text-slate-600">
            Real-time inventory status and final cost sheets must always be verified and validated directly at the developer's authorized site office prior to executing any booking transaction.
          </p>
        </div>
      </section>

      {/* 7. Third-Party Developers and Builders */}
      <section id="third-party-developers" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            07
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Third-Party Developers & Builders
          </h2>
        </div>
        <p>
          Developers featured on our portal (such as Casagrand, TVS Emerald, Puravankara, Shriram Properties, Appaswamy, Brigade Group) are independent legal entities. Property Gateway does not own, build, construct, or hold title to any real estate property presented, and does not act as general contractor, employer, or managing agent for these developers.
        </p>
      </section>

      {/* 8. User Responsibilities */}
      <section id="user-responsibilities" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            08
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            User Responsibilities & Due Diligence
          </h2>
        </div>
        <p>
          As an active user of Property Gateway, you agree to:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
          <li>Provide truthful, current, and verifiable contact credentials when submitting requirements;</li>
          <li>Comply with developer site safety protocols (helmets, authorized visitor paths) during project visits;</li>
          <li>Conduct personal due diligence regarding property title deeds, approval sanctions, and zoning restrictions;</li>
          <li>Ensure that foreign inward remittances for NRI investments strictly comply with Reserve Bank of India (RBI) and Foreign Exchange Management Act (FEMA) guidelines.</li>
        </ul>
      </section>

      {/* 9. Property Enquiries */}
      <section id="property-enquiries" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            09
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Property Enquiries & Booking Disclaimers
          </h2>
        </div>
        <p>
          Submitting a requirement form, downloading a project brochure, requesting an advisory callback, or registering for a site visit on Property Gateway <strong>DOES NOT constitute a confirmed booking, allotment, or reservation of any specific apartment, villa, or plot</strong>.
        </p>
        <p>
          A legally binding booking is established only when you execute a formal Allotment Application directly with the respective developer entity and deposit the requisite token advance into the designated developer RERA escrow bank account.
        </p>
      </section>

      {/* 10. Site Visits and Consultations */}
      <section id="site-visits" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            10
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Site Visits & Consultations
          </h2>
        </div>
        <p>
          Property Gateway arranges complimentary consultations and guided on-site property inspections to premier project locations across Chennai. Site visits are arranged in good faith based on developer site inspection hours. Property Gateway reserves the right to reschedule or decline site visits in cases of inclement weather, safety hazards, or incomplete user verification.
        </p>
      </section>

      {/* 11. Brokerage and Advisory Charges */}
      <section id="brokerage-charges" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            11
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Brokerage & Advisory Charges
          </h2>
        </div>
        <div className="bg-[#FAF9F6] border-2 border-emerald-600/30 rounded-2xl p-5 space-y-2">
          <h3 className="font-serif font-bold text-[#181B22] text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Zero Brokerage Policy for Homebuyers</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Property Gateway provides <strong>100% Zero Brokerage advisory services to individual homebuyers</strong> for primary builder new launches, pre-launches, and under-construction residential properties in Chennai. Our advisory and coordination costs are remunerated directly by partner developers as institutional channel partner fees.
          </p>
        </div>
        <p className="text-xs text-slate-600 pt-1">
          Specialized secondary resale facilitation, customized NRI tenant management, or bespoke corporate leasing mandates may attract clearly defined commercial advisory fees, which will always be agreed upon in a written contract prior to engagement.
        </p>
      </section>

      {/* 12. Property Transactions and Independent Verification */}
      <section id="independent-verification" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            12
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Property Transactions & Legal Due Diligence
          </h2>
        </div>
        <p>
          Real estate acquisitions involve substantial financial commitments. Users are strongly urged to engage independent legal counsel and registered property evaluators to examine:
        </p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
          <p>• Parent title deeds, Patta/Chitta revenue records, and 30-year Encumbrance Certificates (EC);</p>
          <p>• CMDA / DTCP planning permissions, building sanctions, and environmental clearance orders;</p>
          <p>• Live registration standing and compliance filings on the official TNRERA portal (<a href="https://rera.tn.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#A88548] hover:underline font-mono">rera.tn.gov.in</a>);</p>
          <p>• Joint Venture (JV) agreements, power of attorney documents, and completion/occupancy certificates.</p>
        </div>
        <p className="text-xs text-slate-600 italic">
          Property Gateway never guarantees capital appreciation rates, rental yields, resale liquidity, or future infrastructural completions.
        </p>
      </section>

      {/* 13. Intellectual Property */}
      <section id="intellectual-property" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            13
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Intellectual Property Rights
          </h2>
        </div>
        <p>
          All content included on Property Gateway, including brand emblems, typography layouts, user experience designs, curated architectural photography, editorial micro-market guides, codebases, and audio-visual assets, is the exclusive proprietary property of Property Gateway or its content licensors and is protected by Indian and international copyright and trademark laws.
        </p>
      </section>

      {/* 14. Third-Party Websites */}
      <section id="third-party-websites" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            14
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Third-Party Websites & External Feeds
          </h2>
        </div>
        <p>
          Our platform may feature hyperlinks to external websites, such as official developer portals, banking loan eligibility calculators, YouTube walkthroughs, or TNRERA government directories. Property Gateway exercises no editorial control over such external resources and assumes no responsibility for their operational uptime, content veracity, or data collection practices.
        </p>
      </section>

      {/* 15. Limitation of Liability */}
      <section id="limitation-liability" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            15
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Limitation of Liability & Statutory Safe Harbor
          </h2>
        </div>
        <p>
          To the maximum extent permitted by applicable Indian law, Property Gateway, its directors, officers, consultants, and technological partners shall not be held liable for any indirect, punitive, incidental, special, or consequential damages resulting from:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
          <li>Delays in project completion or construction defaults committed by third-party builders;</li>
          <li>Inaccuracies in developer price sheets, area measurements, or possession timelines;</li>
          <li>Temporary digital downtime, network transmission interruptions, or server maintenance;</li>
          <li>Financial losses arising out of unauthorized property transactions executed without independent legal verification.</li>
        </ul>
      </section>

      {/* 16. Suspension or Modification of Services */}
      <section id="modification-services" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            16
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Suspension or Modification of Services
          </h2>
        </div>
        <p>
          We reserve the unilateral right to revise, update, suspend, or discontinue any feature, inventory listing, or advisory service offered on Property Gateway at any time without prior notice. We shall incur no liability to you or any third party for any modification, suspension, or discontinuance of website features.
        </p>
      </section>

      {/* 17. Governing Law and Jurisdiction */}
      <section id="governing-law" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            17
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Governing Law & Exclusive Jurisdiction
          </h2>
        </div>
        <p>
          These Terms of Service and any contractual or non-contractual disputes arising out of or in connection with them shall be governed by, and construed exclusively in accordance with, the laws of the Republic of India.
        </p>
        <p className="font-semibold text-[#181B22]">
          You irrevocably submit to the exclusive jurisdiction of the competent civil courts and tribunals located in Chennai, Tamil Nadu, India, to settle any claim or dispute.
        </p>
      </section>

      {/* 18. Contact Information */}
      <section id="contact-info" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            18
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Contact Information & Compliance Notices
          </h2>
        </div>
        <p>
          If you require clarification regarding these Terms of Service or wish to serve formal legal notices, please communicate with our legal advisory desk:
        </p>
        <div className="bg-[#FAF9F6] text-[#1E232F] border border-[#E7E2D8] p-5 sm:p-6 rounded-2xl border border-[#A88548]/30 space-y-2.5 text-xs font-mono">
          <p><strong className="text-[#A88548]">Entity Name:</strong> {BRAND.name}</p>
          <p><strong className="text-[#A88548]">TNRERA Registration:</strong> {BRAND.reraId}</p>
          <p><strong className="text-[#A88548]">Legal Communications:</strong> <a href={`mailto:${BRAND.email}`} className="text-emerald-400 hover:underline">{BRAND.email}</a></p>
          <p><strong className="text-[#A88548]">Telephone Helpline:</strong> <a href={`tel:${BRAND.phone}`} className="text-emerald-400 hover:underline">{BRAND.phoneDisplay}</a></p>
          <p><strong className="text-[#A88548]">Office Address:</strong> {BRAND.address}</p>
        </div>
      </section>

    </div>
  );
}
