import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../utils/constants';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Property Gateway';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E232F] antialiased selection:bg-[#C98A4B]/20 selection:text-[#0F1117]">
      
      {/* 1. DARK BLACK HERO SECTION */}
      <section className="bg-[#0F1117] text-white pt-28 pb-14 sm:pt-32 sm:pb-16 border-b border-[#232733] relative overflow-hidden print:bg-white print:text-black print:p-0 print:border-none">
        <div className="w-[90%] max-w-[1440px] mx-auto">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono print:hidden" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#C98A4B] transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Legal</span>
            <span className="text-slate-600">/</span>
            <span className="text-[#C98A4B] font-medium">Privacy Policy</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Bronze Eyebrow */}
              <div className="inline-block text-[#C98A4B] text-xs font-semibold tracking-widest uppercase font-mono">
                PROPERTY GATEWAY | LEGAL
              </div>
              
              {/* Large Ivory Page Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF9F6] tracking-tight print:text-black">
                Privacy Policy
              </h1>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1 print:text-slate-700">
                Learn how Property Gateway handles your personal information, consultation inquiries, and communication preferences with complete transparency.
              </p>
            </div>

            {/* Regulatory & Updated Meta */}
            <div className="text-xs text-slate-400 font-mono space-y-1 lg:text-right shrink-0 print:text-black">
              <p>TNRERA Agent: <strong className="text-white print:text-black">{BRAND.reraId}</strong></p>
              <p>Effective Date: <span className="text-[#C98A4B]">November 2026</span></p>
              <p>Jurisdiction: Chennai, Tamil Nadu, India</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN WIDE DOCUMENT CONTENT (90% width, max 1440px, centered) */}
      <main className="w-[90%] max-w-[1440px] mx-auto py-12 sm:py-16">
        <article className="space-y-12 text-[15px] sm:text-base text-[#1E232F] leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              1. Introduction & Privacy Commitment
            </h2>
            <p>
              Property Gateway operates as a trusted real estate consultancy and digital advisory platform in Chennai, Tamil Nadu, registered under the Tamil Nadu Real Estate Regulatory Authority (TNRERA Registration: <strong>{BRAND.reraId}</strong>). We connect prospective homebuyers and investors with verified residential apartments, coastal villas, plotted layouts, and commercial properties.
            </p>
            <p>
              This Privacy Policy explains how Property Gateway collects, uses, maintains, and safeguards information obtained from users through our website (<a href="https://propertygateway.com" className="text-[#C98A4B] hover:underline font-medium">propertygateway.com</a>), enquiry forms, WhatsApp advisory chats, telephonic consultations, and site visit coordination services. We are dedicated to handling your personal data responsibly, ethically, and in accordance with applicable Indian privacy standards and regulatory guidelines.
            </p>
            <p>
              By accessing our website or registering an enquiry for any property listing, you acknowledge the data handling practices outlined in this policy. If you do not agree with any aspect of this policy, please refrain from submitting personal information or using our online services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              2. Information We Collect
            </h2>
            <p>
              We collect information that is strictly necessary to assist your property search, arrange developer site visits, evaluate home loan options, and provide accurate real estate guidance. Information is collected primarily through direct user submissions and standard technical logging.
            </p>
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-serif font-semibold text-[#0F1117]">A. Personal Information Submitted Voluntarily</h3>
              <p>When you fill out a consultation form, post a requirement, or request a call from our advisors, we may collect:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
                <li><strong>Full Legal Name:</strong> To address you properly and register authorized visitor passes at developer sales offices and security gates.</li>
                <li><strong>Mobile Phone Number:</strong> To coordinate advisory consultations, provide project updates, and share verified floor plans.</li>
                <li><strong>Email Address:</strong> To transmit comprehensive project brochures, pricing breakdowns, TNRERA documentation, and payment schedules.</li>
                <li><strong>Country of Residence & Dialing Code:</strong> To customize communication timelines and identify Non-Resident Indian (NRI) transaction requirements under FEMA regulations.</li>
              </ul>
            </div>
            <div className="space-y-3 pt-3">
              <h3 className="text-lg font-serif font-semibold text-[#0F1117]">B. Property Preferences</h3>
              <p>To deliver relevant recommendations and avoid presenting unsuitable inventory, we record details regarding:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
                <li>Preferred micro-markets in Chennai (e.g., OMR, ECR, Anna Nagar, Porur, Velachery, Adyar).</li>
                <li>Property typologies (apartments, row houses, independent villas, or residential plots).</li>
                <li>Target budget ranges and financing preferences (self-funded or bank home loan).</li>
                <li>Target possession timelines (ready-to-move-in versus under-construction projects).</li>
              </ul>
            </div>
            <div className="space-y-3 pt-3">
              <h3 className="text-lg font-serif font-semibold text-[#0F1117]">C. Technical Browsing Information</h3>
              <p>
                When you browse our portal, our servers automatically record standard non-identifying technical data, including your IP address, browser type, device operating system, referring URL, pages viewed, and visit timestamps. This data is utilized solely for technical troubleshooting, platform security, and server capacity planning.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              3. How We Use Your Information
            </h2>
            <p>
              Property Gateway uses your personal details for transparent, specified purposes directly related to facilitating your property search and purchase:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Requirement Analysis & Shortlisting:</strong> Matching your budget and location criteria with verified inventory from Grade-A developers in Chennai.</li>
              <li><strong>Project Documentation:</strong> Delivering official developer brochures, master plans, sanction letters, and payment milestone sheets.</li>
              <li><strong>Site Visit Coordination:</strong> Arranging guided on-site property inspections and scheduling dedicated appointments with builder representatives.</li>
              <li><strong>Advisory Follow-ups:</strong> Answering your questions regarding unit availability, floor-rise charges, clubhouse amenities, and legal clearances.</li>
              <li><strong>Platform Security:</strong> Safeguarding our digital infrastructure against fraudulent activity, spam submissions, and unauthorized automated scraping.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              4. Property Enquiries & Contact Information
            </h2>
            <p>
              When you submit a consultation request or property enquiry, your information is assigned to a dedicated Property Gateway property specialist who reviews your requirements before reaching out. We do not distribute your requirement indiscriminately across open networks.
            </p>
            <p>
              Submitting an enquiry on our website does not create a financial obligation or contract to purchase. It serves purely as an initiation of real estate advisory assistance. You may update or withdraw your enquiry at any time by speaking with your assigned advisor or emailing our desk.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              5. Phone Calls, WhatsApp & Communication
            </h2>
            <p>
              Direct, timely communication is vital when evaluating real estate developments. By submitting your mobile number on Property Gateway, you grant explicit consent for our property specialists to communicate with you via:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
              <li>Direct voice phone calls to discuss property shortlists, site visit schedules, and developer offers.</li>
              <li>WhatsApp Business messages to transmit floor plans, video walkthroughs, location pins, and cost sheets.</li>
              <li>Transactional SMS messages with appointment confirmations, driver details, and OTP verifications.</li>
            </ul>
            <p className="pt-2">
              <strong>National DND Registry Clarification:</strong> Because real estate consultations are requested directly by the user, your enquiry represents an express transactional opt-in. Our communications are conducted in response to your enquiry and are exempt from standard commercial solicitation restrictions under the National Do Not Call (NDNC) registry. However, if you decide you no longer wish to receive calls or messages, simply inform our advisor or reply "STOP" on WhatsApp, and we will update your preference immediately.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              6. Sharing of Personal Information
            </h2>
            <p>
              We maintain a strict principle regarding personal data: <strong>Property Gateway does not sell, rent, trade, or broadcast your personal contact details to third-party data brokers, telemarketing companies, or unrelated advertisers.</strong>
            </p>
            <p>
              Your information is disclosed only in the following legitimate operational situations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Authorized Property Developers:</strong> When you express interest in a specific developer project (such as Casagrand, TVS Emerald, Puravankara, Brigade, Appaswamy, or Shriram Properties) and request a site visit, cost sheet, or unit reservation, your name and contact details are shared with that developer’s authorized sales desk. This ensures your visitor pass is registered under our official channel partner code and guarantees developer direct pricing.
              </li>
              <li>
                <strong>Banking & Home Loan Partners (On Explicit Request):</strong> If you ask our team to assist with home loan pre-approval, your financial requirements are shared only with designated representatives of licensed banks (such as SBI, HDFC, ICICI) with your prior verbal or written consent.
              </li>
              <li>
                <strong>Statutory & Legal Requirements:</strong> We may disclose information if required to comply with court orders, TNRERA regulatory requests, or applicable Indian laws.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              7. Third-Party Services & External Links
            </h2>
            <p>
              Our website may utilize trusted third-party service providers to support our operations—such as secure cloud hosting facilities, transactional email gateways, mapping services, and WhatsApp communication APIs. These service providers process data strictly on our instructions and under contractual confidentiality standards.
            </p>
            <p>
              Our portal may also contain links to external websites, including builder portals, the official TNRERA portal (<a href="https://rera.tn.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#C98A4B] hover:underline font-mono">rera.tn.gov.in</a>), and video platforms. Property Gateway does not control and is not responsible for the privacy practices or content of these independent websites. We encourage you to review their terms independently.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              8. Data Storage & Retention
            </h2>
            <p>
              All user data collected by Property Gateway is stored on secure, encrypted server infrastructure located in data centers adhering to Indian data protection standards.
            </p>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected—specifically, guiding your real estate search, fulfilling regulatory audit documentation under TNRERA regulations, resolving disputes, and maintaining accounting records. Once your property requirement is concluded or upon your request for deletion, your contact details are archived or securely purged from active communication databases.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              9. Data Security
            </h2>
            <p>
              We maintain reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, alteration, or disclosure. These measures include encrypted data transmission (HTTPS/TLS), role-based employee access controls, database firewalls, and regular security reviews.
            </p>
            <p>
              While we implement rigorous security measures, no digital transmission or internet storage method can be guaranteed 100% impenetrable. We advise users to exercise prudence and never transmit sensitive banking passwords or payment PINs across unencrypted channels.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              10. Your Privacy Rights
            </h2>
            <p>
              As a user and consumer, you hold clear rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Right to Review:</strong> You may request a summary of the personal contact details and property preferences we maintain on record.</li>
              <li><strong>Right to Correction:</strong> You may request that we update, amend, or correct any obsolete or inaccurate information.</li>
              <li><strong>Right to Opt-Out:</strong> You may withdraw your consent for advisory follow-ups or promotional announcements at any time.</li>
              <li><strong>Right to Erasure:</strong> You may request that your personal contact records be permanently removed from our active marketing and advisory desks.</li>
            </ul>
            <p className="pt-2">
              To exercise any of these rights, please send a written request to <a href={`mailto:${BRAND.email}`} className="text-[#C98A4B] hover:underline font-mono">{BRAND.email}</a>. We respond to all verified privacy requests within a reasonable timeframe.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              11. Children's Privacy
            </h2>
            <p>
              Property Gateway's services and website are intended strictly for adults (individuals who have reached the age of 18) who possess legal capacity to enter into binding contracts for real estate transactions under Indian law. We do not intentionally solicit or collect personal information from minors. If you believe that a minor has submitted personal information on our portal without parental consent, please contact us immediately so we can remove the data.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              12. Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our operational procedures, technological upgrades, or applicable legislative and regulatory requirements in India. When revisions are made, the "Effective Date" at the top of this document will be updated accordingly. We encourage you to review this page periodically to remain informed about how we protect your information.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              13. Contact & Grievance Information
            </h2>
            <p>
              If you have any questions, comments, concerns, or grievances regarding this Privacy Policy or our handling of your personal data, please reach out to our designated compliance desk:
            </p>
            <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-6 sm:p-8 space-y-2 text-sm font-mono text-slate-800">
              <p><strong className="text-[#0F1117]">Entity Name:</strong> {BRAND.name}</p>
              <p><strong className="text-[#0F1117]">TNRERA Registration:</strong> {BRAND.reraId}</p>
              <p><strong className="text-[#0F1117]">Compliance & Grievance Officer:</strong> Grievance Officer, Property Gateway</p>
              <p><strong className="text-[#0F1117]">Official Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-[#C98A4B] hover:underline">{BRAND.email}</a></p>
              <p><strong className="text-[#0F1117]">Advisory Helpline:</strong> <a href={`tel:${BRAND.phone}`} className="text-[#C98A4B] hover:underline">{BRAND.phoneDisplay}</a></p>
              <p><strong className="text-[#0F1117]">Registered Office Address:</strong> {BRAND.address}</p>
            </div>
            <p className="text-xs text-slate-500 pt-2 font-mono">
              Written grievances will be acknowledged within 48 hours and addressed diligently in accordance with applicable Indian dispute resolution guidelines.
            </p>
          </section>

        </article>
      </main>

    </div>
  );
}
