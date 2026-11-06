import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../utils/constants';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions | Property Gateway';
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
            <span className="text-[#C98A4B] font-medium">Terms & Conditions</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Bronze Eyebrow */}
              <div className="inline-block text-[#C98A4B] text-xs font-semibold tracking-widest uppercase font-mono">
                PROPERTY GATEWAY | LEGAL
              </div>
              
              {/* Large Ivory Page Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF9F6] tracking-tight print:text-black">
                Terms & Conditions
              </h1>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1 print:text-slate-700">
                Comprehensive terms governing your access to Property Gateway’s real estate advisory portal, verified property listings, consultations, and developer site inspections in Chennai.
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
              1. Introduction & Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>Property Gateway</strong> (<a href="https://propertygateway.com" className="text-[#C98A4B] hover:underline font-medium">propertygateway.com</a>). These Terms & Conditions constitute a legally binding agreement between you (whether visiting as an individual, family, NRI buyer, or commercial investor) and Property Gateway.
            </p>
            <p>
              By accessing, browsing, or utilizing our website, enquiry tools, consultation schedulers, or concierge advisory services, you acknowledge that you have read, understood, and unequivocally agreed to be bound by these Terms and our <Link to="/privacy-policy" className="text-[#C98A4B] hover:underline font-medium">Privacy Policy</Link>. If you do not accept these Terms in their entirety, you must immediately discontinue using our website and services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              2. About Property Gateway
            </h2>
            <p>
              Property Gateway is a real estate advisory consultancy and property marketing firm based in Chennai, Tamil Nadu. The firm operates with regulatory registration under the Real Estate (Regulation and Development) Act, 2016 (TNRERA Agent Registration: <strong>{BRAND.reraId}</strong>).
            </p>
            <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-6 space-y-1.5 text-xs font-mono text-slate-800">
              <p><strong className="text-[#0F1117]">Firm Name:</strong> {BRAND.name}</p>
              <p><strong className="text-[#0F1117]">Regulatory Authority:</strong> Tamil Nadu Real Estate Regulatory Authority (TNRERA)</p>
              <p><strong className="text-[#0F1117]">Registration Certificate:</strong> {BRAND.reraId}</p>
              <p><strong className="text-[#0F1117]">Principal Office:</strong> {BRAND.address}</p>
              <p><strong className="text-[#0F1117]">Corporate Contact:</strong> {BRAND.email} | {BRAND.phoneDisplay}</p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              3. Scope of Real Estate Services
            </h2>
            <p>
              Property Gateway functions in the capacity of an authorized channel partner and real estate advisory facilitator. Our core services comprise:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Curation and presentation of verified primary residential developments (apartments, row villas, independent houses, plotted subdivisions) and commercial spaces in Chennai.</li>
              <li>Impartial requirement analysis and comparative evaluation across key micro-markets including OMR, ECR, Anna Nagar, Porur, Adyar, and surrounding corridors.</li>
              <li>Arranging and coordinating complimentary chauffeured AC cab site inspections to developer project locations.</li>
              <li>Liaising between prospective purchasers and authorized developer sales management desks to clarify technical specifications, payment milestones, and statutory approval statuses.</li>
            </ul>
            <p className="pt-2">
              Property Gateway acts as an intermediary communication platform under Section 79 of the Information Technology Act, 2000. Property Gateway is not the property builder, architectural designer, construction contractor, or legal title insurer of any featured project.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              4. Property Listings & Information Accuracy
            </h2>
            <p>
              All project details displayed on this website—including unit dimensions, carpet area, floor plans, master layout sketches, artistic renderings, amenity specifications, and projected possession dates—are derived directly from developer marketing collateral and statutory disclosures submitted to TNRERA.
            </p>
            <p>
              <strong>Important Notice on Pricing & Availability:</strong> Indicative prices shown on our website (such as starting prices, base rate per square foot, or estimated installment costs) are published on an informational basis. Real-time unit availability, floor-rise premiums, preferred location charges (PLC), car parking fees, clubhouse infrastructure charges, and statutory taxes (GST, stamp duty, registration fees) are determined solely by respective developers and are subject to revision without prior notice. Final confirmed cost sheets must always be verified directly at the developer’s authorized sales office.
            </p>
            <p>
              Photographs, 3D renderings, and virtual walkthroughs represent artistic impressions, scale models, or furnished show units. Finished physical units may differ in minor details, fixture brands, or finishes as per the final construction agreements executed between you and the builder.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              5. User Responsibilities
            </h2>
            <p>When using Property Gateway, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Provide accurate, genuine, and verifiable contact details (name, phone number, email) when submitting enquiries or consultation requests.</li>
              <li>Refrain from using automated web scraping tools, robotic crawlers, or unauthorized extraction scripts to duplicate or harvest our listing databases, pricing data, or curated photography.</li>
              <li>Refrain from transmitting defamatory, obscene, fraudulent, or unlawful communications through our contact desks or WhatsApp chatbot.</li>
              <li>Comply with standard site safety guidelines (wearing hardhats when advised, remaining within designated visitor corridors) during physical construction site inspections.</li>
              <li>Ensure that any funds deployed for property transactions comply with the Reserve Bank of India (RBI), Prevention of Money Laundering Act (PMLA), and Foreign Exchange Management Act (FEMA) guidelines.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              6. Property Enquiries & Site Visits
            </h2>
            <p>
              Submitting an enquiry form, requesting a brochure, downloading a floor plan, or attending a scheduled site visit through Property Gateway <strong>DOES NOT constitute a reservation, confirmed allotment, booking, or contractual hold on any real estate unit</strong>.
            </p>
            <p>
              A legally binding property booking is created exclusively when you complete and sign the developer’s official Allotment Application form and remit the requisite booking advance directly into the developer's registered RERA Escrow Bank Account.
            </p>
            <p>
              Site visits arranged by Property Gateway are organized in good faith based on vehicle availability and developer inspection timings. Property Gateway reserves the right to reschedule or decline site visits due to adverse weather conditions, safety restrictions, or incomplete customer verification.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              7. Brokerage, Service Charges & Payments
            </h2>
            <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-6 space-y-2">
              <h3 className="text-lg font-serif font-bold text-[#0F1117]">
                Zero Brokerage Advisory for Individual Homebuyers
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Property Gateway operates under a transparent <strong>Zero Brokerage policy for individual buyers</strong> purchasing primary residential apartments, villas, and new launches from our empaneled developer partners. Our advisory services, comparative market analysis, and site visit coordination are provided with zero brokerage charges to the homebuyer. Our services are compensated by developers through institutional marketing and channel partnership commissions.
              </p>
            </div>
            <p className="pt-2">
              <strong>Strict Prohibition on Cash Handling:</strong> Property Gateway advisors, relationship managers, and field staff are strictly prohibited from receiving physical cash from clients for any purpose. All payments toward property purchases, token advances, or stamp duty must be made directly to the authorized developer's registered escrow account via crossed account-payee cheque, RTGS, NEFT, or approved bank portal. Property Gateway disclaims all liability for any cash handed to any representative.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              8. Third-Party Property Owners & Developers
            </h2>
            <p>
              Real estate developers, construction firms, and property owners featured on Property Gateway (such as Casagrand, TVS Emerald, Puravankara, Brigade Group, Appaswamy, and Shriram Properties) are independent commercial and corporate entities.
            </p>
            <p>
              Property Gateway has no operational control over construction schedules, labor management, raw material procurement, or administrative handover delays caused by developers. The contractual terms, warranty periods, construction specifications, and cancellation penalties governing your purchase are determined exclusively by the Agreement for Sale and Construction Agreement executed between you and the respective developer.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              9. No Guarantee of Investment Returns
            </h2>
            <p>
              Real estate investments carry inherent commercial and market risks. Historical price appreciation in Chennai micro-markets (such as ECR, OMR, or Central Chennai) does not guarantee future capital appreciation, rental yield percentages, or continuous tenant occupancy.
            </p>
            <p>
              Property Gateway does not provide guaranteed return assurances, speculative financial promises, or tax advisory. Any market trends, rental yield estimates, or infrastructural growth discussions shared by our consultants represent informational assessments only. Prospective buyers must conduct independent financial and legal due diligence before making monetary commitments.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              10. Intellectual Property
            </h2>
            <p>
              All materials published on Property Gateway—including website design layouts, text content, editorial guides, logos, graphic insignias, brand emblems, custom code, and photographic arrangements—are the intellectual property of Property Gateway or its content suppliers and are protected under Indian copyright, trademark, and design laws.
            </p>
            <p>
              You may print or download property sheets and floor plans strictly for your personal, non-commercial home-buying search. You may not republish, distribute, broadcast, scrape, reverse engineer, or commercially exploit any material from our portal without prior written consent from Property Gateway.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              11. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable Indian law, Property Gateway, its proprietors, partners, consultants, and technical service providers shall not be held liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Any indirect, special, incidental, or consequential damages resulting from your use of or inability to access our website.</li>
              <li>Construction handover delays, specification modifications, or developer financial insolvencies.</li>
              <li>Inaccuracies or typographical errors in promotional material supplied by third-party developers.</li>
              <li>Temporary technical glitches, hosting interruptions, or network latency affecting form submissions.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              12. External Links
            </h2>
            <p>
              Our website may contain hyperlinks to external portals, such as official developer portals, government regulatory portals (e.g. TNRERA: <a href="https://rera.tn.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#C98A4B] hover:underline font-mono">rera.tn.gov.in</a>), banking institutions, and mapping platforms. These links are provided solely for user convenience. Property Gateway does not endorse, verify, or assume responsibility for the accuracy, security, or terms of third-party websites.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              13. Changes to These Terms
            </h2>
            <p>
              We reserve the right to amend, update, or replace any portion of these Terms & Conditions at our discretion to align with regulatory amendments, technological upgrades, or updated operational workflows. Changes will take effect upon posting with an updated "Effective Date". Your continued use of the website following published updates constitutes acceptance of the amended terms.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              14. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions, and any contractual or non-contractual disputes arising out of or related to your use of Property Gateway, shall be governed by, and interpreted exclusively in accordance with, the laws of the Republic of India.
            </p>
            <p className="font-semibold text-[#0F1117]">
              You irrevocably agree that the competent civil courts located in Chennai, Tamil Nadu, India, shall hold exclusive legal jurisdiction to adjudicate any claims, disputes, or proceedings arising under these Terms.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1117] tracking-tight">
              15. Contact Information
            </h2>
            <p>
              If you have any questions or require legal clarification regarding these Terms & Conditions, please contact our legal advisory desk:
            </p>
            <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-6 sm:p-8 space-y-2 text-sm font-mono text-slate-800">
              <p><strong className="text-[#0F1117]">Firm Name:</strong> {BRAND.name}</p>
              <p><strong className="text-[#0F1117]">TNRERA Registration:</strong> {BRAND.reraId}</p>
              <p><strong className="text-[#0F1117]">Official Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-[#C98A4B] hover:underline">{BRAND.email}</a></p>
              <p><strong className="text-[#0F1117]">Helpline:</strong> <a href={`tel:${BRAND.phone}`} className="text-[#C98A4B] hover:underline">{BRAND.phoneDisplay}</a></p>
              <p><strong className="text-[#0F1117]">Office Address:</strong> {BRAND.address}</p>
            </div>
            <p className="text-xs text-slate-500 pt-2 font-mono">
              Official legal inquiries will be processed within standard business hours Monday through Saturday.
            </p>
          </section>

        </article>
      </main>

    </div>
  );
}
