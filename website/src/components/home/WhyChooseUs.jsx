import React from 'react';
import { ShieldCheck, Tag, FileCheck, Car } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function WhyChooseUs({ onOpenVisitModal }) {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "TNRERA Licensed Advisory",
      description: `Registered with Tamil Nadu RERA (${BRAND.reraId}). We only list properties with approved building sanctions and zero legal encumbrances.`,
      highlight: "100% Legal Scrutiny"
    },
    {
      icon: Tag,
      title: "Zero Brokerage on New Projects",
      description: "Buy directly at developer prices. We charge ₹0 commission to buyers for all newly launched gated community apartments, villas, and plots.",
      highlight: "Save 2% Brokerage"
    },
    {
      icon: FileCheck,
      title: "Title & Document Assistance",
      description: "Our in-house legal advocates verify 30-year parent deeds, patta, CMDA approvals, and assist with bank loan approvals up to 80% from top lenders.",
      highlight: "SBI & HDFC Pre-Approved"
    },
    {
      icon: Car,
      title: "Complimentary Site Visits",
      description: "Experience projects in person with your family. We arrange private, air-conditioned cab pickup and drop from your doorstep anywhere in Chennai.",
      highlight: "Free Family Cab Pickup"
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C98A4B] bg-[#C98A4B]/10 px-3.5 py-1 rounded-full border border-[#C98A4B]/30 inline-block">
            The Property Gateway Assurance
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Why Discerning Chennai Buyers Trust Us
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Buying property is your family's biggest milestone. We eliminate ambiguity, hidden fees, and legal risks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E7E2D8] hover:border-[#C98A4B] hover:shadow-md card-lift-transition shadow-subtle flex flex-col justify-between transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-brand-bronze-600 border border-slate-200 flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-brand-bronze-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F1117] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-brand-bronze-700">
                    ✓ {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Cab Site Visit Callout Banner */}
        <div className="mt-16 bg-[#0F1117] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Want to inspect shortlisted projects this weekend?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Tell us your preferred Chennai micro-market. We will arrange a dedicated private AC cab to pick up your family and tour top gated communities.
            </p>
          </div>
          <button
            onClick={onOpenVisitModal}
            className="shrink-0 px-7 py-4 rounded-xl bg-brand-bronze-600 hover:bg-brand-bronze-700 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider shadow-bronze-glow transition-all flex items-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>Book Free Cab Site Visit</span>
          </button>
        </div>
      </div>
    </section>
  );
}
