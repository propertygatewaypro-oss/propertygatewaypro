import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../utils/constants';

export default function RefundPolicyPage() {
  useEffect(() => {
    document.title = 'Refund Policy | Property Gateway';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E232F] antialiased selection:bg-[#A88548]/20 selection:text-[#181B22]">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#FAF9F6] text-[#1E232F] pt-28 pb-14 sm:pt-32 sm:pb-16 border-b border-[#E7E2D8] relative overflow-hidden print:bg-white print:text-black print:p-0 print:border-none">
        <div className="w-[90%] max-w-[1440px] mx-auto">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-mono print:hidden" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#A88548] transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">Legal</span>
            <span className="text-slate-400">/</span>
            <span className="text-[#A88548] font-bold">Refund Policy</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-block text-[#7D5D2A] text-xs font-bold tracking-widest uppercase font-mono">
                PROPERTY GATEWAY | LEGAL
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E232F] tracking-tight print:text-black">
                Refund Policy
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1 print:text-slate-700">
                Commercial policy clarifying our 100% complimentary homebuyer advisory services, developer booking token escrows, and fee guidelines.
              </p>
            </div>

            <div className="text-xs text-slate-600 font-mono space-y-1 lg:text-right shrink-0 print:text-black">
              <p>TNRERA Agent: <strong className="text-[#1E232F] print:text-black">{BRAND.reraId}</strong></p>
              <p>Effective Date: <span className="text-[#7D5D2A] font-bold">November 2026</span></p>
              <p>Jurisdiction: Chennai, Tamil Nadu, India</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN WIDE DOCUMENT CONTENT */}
      <main className="w-[90%] max-w-[1440px] mx-auto py-12 sm:py-16">
        <article className="space-y-12 text-[15px] sm:text-base text-[#1E232F] leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              1. 100% Free Homebuyer Advisory Services
            </h2>
            <p>
              All property search assistance, requirement evaluations, tele-consultations, and guided on-site property inspections arranged by Property Gateway for primary residential developer projects in Chennai are <strong>entirely free of charge to prospective homebuyers</strong>.
            </p>
            <p>
              We do not charge registration fees, viewing charges, or brokerage on primary new launches. Consequently, no refund obligations arise for standard website enquiries or site visits.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              2. Third-Party Developer Booking Payments
            </h2>
            <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-6 space-y-2">
              <h3 className="text-lg font-serif font-bold text-[#181B22]">
                Developer Token Deposits & Escrow Accounts
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                All booking token deposits, expressions of interest (EOI), and construction milestone payments are paid directly to the authorized property developer's designated RERA Escrow Bank Account. Property Gateway does not collect, hold, or process booking deposits for property purchases.
              </p>
            </div>
            <p className="pt-2">
              Any cancellation of a unit allotment, refund of booking advance, or deduction of cancellation charges is governed exclusively by the Developer’s Allotment Letter, Builder Agreement of Sale, and TNRERA rules.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              3. Contracted Paid Advisory Services (If Applicable)
            </h2>
            <p>
              In specialized instances where a client formally contracts bespoke paid services (such as customized title scrutiny liaison or NRI portfolio management) under a signed Service Agreement, refund eligibility will be assessed based on the milestone deliverables completed prior to written notice of cancellation.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              4. Contact for Billing Queries
            </h2>
            <p>
              For any questions regarding billing or payment clarifications, please contact our accounts desk at <a href={`mailto:${BRAND.email}`} className="text-[#A88548] hover:underline font-mono">{BRAND.email}</a> or call <a href={`tel:${BRAND.phone}`} className="text-[#A88548] hover:underline font-mono">{BRAND.phoneDisplay}</a>.
            </p>
          </section>

        </article>
      </main>

    </div>
  );
}
