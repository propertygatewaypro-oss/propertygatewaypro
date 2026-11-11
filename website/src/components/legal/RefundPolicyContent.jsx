import React from 'react';
import { ShieldCheck, AlertCircle, Building2 } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export const REFUND_SECTIONS = [
  { id: 'introduction', number: '1', title: 'Introduction & Consumer Transparency' },
  { id: 'scope-policy', number: '2', title: 'Scope of the Refund Policy' },
  { id: 'free-enquiries', number: '3', title: 'Free Property Enquiries & Site Visits' },
  { id: 'paid-advisory', number: '4', title: 'Paid Advisory Services (When Contracted)' },
  { id: 'payment-conditions', number: '5', title: 'Payment Conditions & Invoicing' },
  { id: 'cancellation-requests', number: '6', title: 'Cancellation Requests & Notice' },
  { id: 'refund-eligibility', number: '7', title: 'Refund Eligibility & Deductions' },
  { id: 'duplicate-payments', number: '8', title: 'Duplicate & Erroneous Payments' },
  { id: 'builder-booking-payments', number: '9', title: 'Third-Party Developer Booking Payments' },
  { id: 'refund-processing', number: '10', title: 'Refund Processing & Timelines' },
  { id: 'dispute-resolution', number: '11', title: 'Dispute Resolution & Grievance Desk' },
  { id: 'contact-info', number: '12', title: 'Billing & Refund Contact Desk' },
];

export default function RefundPolicyContent() {
  return (
    <div className="space-y-10 text-slate-700 leading-relaxed text-sm">
      
      {/* 1. Introduction */}
      <section id="introduction" className="scroll-mt-36 space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            01
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Introduction & Consumer Transparency
          </h2>
        </div>
        <p>
          At <strong>Property Gateway</strong> (<a href="https://propertygateway.com" className="text-[#A88548] hover:underline font-medium">propertygateway.com</a>), we maintain the highest standards of financial transparency and professional ethics in accordance with the <strong>Consumer Protection Act, 2019</strong> and the <strong>Real Estate (Regulation and Development) Act, 2016 (TNRERA)</strong>.
        </p>
        <p>
          This Refund & Cancellation Policy sets forth the terms and conditions governing financial transactions, fee structures, and the clear distinction between advisory services provided by Property Gateway versus property allotment payments remitted directly to real estate developers.
        </p>
      </section>

      {/* 2. Scope of the Refund Policy */}
      <section id="scope-policy" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            02
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Scope of the Refund Policy
          </h2>
        </div>
        <p>
          This policy applies exclusively to payments remitted directly to Property Gateway's designated corporate bank accounts. It explicitly delineates our obligations as a TNRERA registered real estate consultancy firm from the independent financial policies of third-party real estate developers, builders, and financial institutions in Chennai.
        </p>
      </section>

      {/* 3. Free Property Enquiries */}
      <section id="free-enquiries" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            03
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Free Property Enquiries & Site Visits
          </h2>
        </div>
        <div className="bg-[#FAF9F6] border-2 border-emerald-600/30 rounded-2xl p-5 space-y-2">
          <h3 className="font-serif font-bold text-[#181B22] text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>100% Complimentary Homebuyer Advisory</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            All general property browsing, enquiry submissions, requirement registrations, phone consultations, brochure downloads, and property site inspections arranged by Property Gateway for primary residential projects in Chennai are <strong>entirely free of charge</strong>.
          </p>
        </div>
        <p className="text-xs text-slate-600 pt-1">
          No credit card information, advance security deposit, or consultation fee is ever required or accepted to view property listings or consult with our advisors on primary developer projects. Because no fee is charged, no refund obligations arise for standard website enquiries.
        </p>
      </section>

      {/* 4. Paid Advisory Services */}
      <section id="paid-advisory" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            04
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Paid Advisory Services (When Contracted)
          </h2>
        </div>
        <p>
          In specific specialized scenarios—such as bespoke legal title scrutiny liaison, specialized NRI property management packages, or complex commercial corporate mandate agreements—Property Gateway may offer fee-based professional services.
        </p>
        <p>
          Such paid services are always formalized through a written Service Agreement specifying the scope of deliverables, professional fee, applicable Goods and Services Tax (GST), and milestone schedules.
        </p>
      </section>

      {/* 5. Payment Conditions */}
      <section id="payment-conditions" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            05
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Payment Conditions & Invoicing
          </h2>
        </div>
        <p>
          All authorized paid services are invoiced with a valid Tax Invoice featuring our GSTIN and TNRERA registration number. Payments must be processed through verified banking channels (RTGS, NEFT, IMPS, authorized UPI, or secure payment gateway links).
        </p>
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Strict Anti-Cash Advisory</span>
          </p>
          <p>
            Property Gateway advisors and employees are strictly forbidden from accepting physical cash. The Company disclaims all liability for cash handed to any individual without an official printed receipt stamped by our registered office.
          </p>
        </div>
      </section>

      {/* 6. Cancellation Requests */}
      <section id="cancellation-requests" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            06
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Cancellation Requests & Notice
          </h2>
        </div>
        <p>
          If you have contracted a fee-based advisory service and wish to cancel, you must submit a written cancellation request via email to <a href={`mailto:${BRAND.email}`} className="text-[#A88548] hover:underline font-mono">{BRAND.email}</a> stating your invoice number, full name, and reason for cancellation.
        </p>
      </section>

      {/* 7. Refund Eligibility */}
      <section id="refund-eligibility" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            07
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Refund Eligibility & Deductions
          </h2>
        </div>
        <p>For contracted paid services, refund eligibility is assessed based on work completed:</p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
          <p>• <strong>Prior to Work Commencement:</strong> If cancellation is received within 24 hours of invoice payment before any title search or administrative work has commenced, a 100% refund of the service fee will be issued (less applicable third-party gateway charges);</p>
          <p>• <strong>Work in Progress:</strong> If preliminary legal searches or document retrieval has already commenced, refunds will be issued on a pro-rata basis deducting actual expenses incurred and professional hours expended;</p>
          <p>• <strong>Completed Deliverables:</strong> Once title opinions, specialized diligence dossiers, or physical reports have been rendered and delivered, service fees are non-refundable;</p>
          <p>• <strong>Statutory Deductions:</strong> Statutory GST collected is remitted to the Government of India and can only be credited subject to GST regulatory timelines and credit note provisions.</p>
        </div>
      </section>

      {/* 8. Duplicate and Incorrect Payments */}
      <section id="duplicate-payments" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            08
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Duplicate & Erroneous Payments
          </h2>
        </div>
        <p>
          In the event of a technical glitch causing an accidental duplicate deduction or an erroneous excess transfer, please notify our accounts desk immediately with transaction reference numbers. Upon verification, the duplicate sum will be refunded 100% within <strong>5 to 7 business days</strong> to the original payment source.
        </p>
      </section>

      {/* 9. Third-Party Property Booking Payments */}
      <section id="builder-booking-payments" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            09
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Third-Party Developer Booking Payments
          </h2>
        </div>
        <div className="bg-[#FAF9F6] border-2 border-[#A88548]/30 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-[#181B22] text-base flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#A88548]" />
            <span>Critical Distinction: Developer Token Deposits & Escrows</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            All booking token amounts, expression of interest (EOI) advances, allotment deposits, and milestone construction payments are paid by the homebuyer <strong>directly into the designated RERA Escrow Bank Account of the respective property developer</strong> (e.g. Casagrand, TVS Emerald, Puravankara, Brigade Group).
          </p>
          <p className="text-xs text-slate-700 leading-relaxed font-semibold">
            Property Gateway NEVER collects, holds, or manages property purchase deposits.
          </p>
          <p className="text-xs text-slate-600">
            Consequently, any cancellation of a property allotment, withdrawal from a developer project, or request for refund of booking advance is governed strictly by the <strong>Developer's Allotment Letter, TNRERA Rules, and Builder Terms of Sale</strong>. Property Gateway holds no authority to process, withhold, or expedite builder token refunds.
          </p>
        </div>
      </section>

      {/* 10. Refund Processing */}
      <section id="refund-processing" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            10
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Refund Processing & Timelines
          </h2>
        </div>
        <p>
          Approved refunds for Property Gateway direct advisory fees will be processed back to the original bank account, credit card, or UPI VPA from which the payment originated.
        </p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-1.5 text-xs font-mono">
          <p><span className="text-[#A88548] font-semibold">Approval Verification:</span> 2 to 3 business days from written request;</p>
          <p><span className="text-[#A88548] font-semibold">Banking Credit Timeline:</span> 7 to 10 working days depending on the customer's acquiring bank;</p>
          <p><span className="text-[#A88548] font-semibold">Currency:</span> Indian Rupees (INR) exclusively.</p>
        </div>
      </section>

      {/* 11. Dispute Resolution */}
      <section id="dispute-resolution" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            11
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Dispute Resolution & Grievance Desk
          </h2>
        </div>
        <p>
          In case of any discrepancy or dissatisfaction regarding billing or service performance, clients are invited to contact our Senior Advisory Management team. We are committed to resolving billing grievances cordially within 15 working days.
        </p>
      </section>

      {/* 12. Contact Information */}
      <section id="contact-info" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            12
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Billing & Refund Contact Desk
          </h2>
        </div>
        <p>
          For all billing inquiries, invoice clarifications, or formal refund communications:
        </p>
        <div className="bg-[#FAF9F6] text-[#1E232F] border border-[#E7E2D8] p-5 sm:p-6 rounded-2xl border border-[#A88548]/30 space-y-2.5 text-xs font-mono">
          <p><strong className="text-[#A88548]">Desk:</strong> Accounts & Refund Cell</p>
          <p><strong className="text-[#A88548]">Entity:</strong> {BRAND.name} (TNRERA {BRAND.reraId})</p>
          <p><strong className="text-[#A88548]">Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-emerald-400 hover:underline">{BRAND.email}</a></p>
          <p><strong className="text-[#A88548]">Phone:</strong> <a href={`tel:${BRAND.phone}`} className="text-emerald-400 hover:underline">{BRAND.phoneDisplay}</a></p>
          <p><strong className="text-[#A88548]">Office:</strong> {BRAND.address}</p>
        </div>
      </section>

    </div>
  );
}
