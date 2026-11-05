import React from 'react';
import { ShieldCheck, Award, Users, Car, CheckCircle2, Phone, MessageSquare, ArrowRight, Building2, FileCheck2, Scale } from 'lucide-react';
import { BRAND } from '../utils/constants';

export default function AboutPage({ onOpenVisitModal }) {
  const steps = [
    {
      num: "01",
      title: "Consultation & Shortlisting",
      desc: "We analyze your exact budget, preferred micro-market, commute radius, and family spatial needs before recommending 3 to 4 vetted options."
    },
    {
      num: "02",
      title: "Complimentary Cab Site Visit",
      desc: "Inspect shortlisted properties stress-free. We arrange private, sanitized AC cab transportation directly from your doorstep across Chennai."
    },
    {
      num: "03",
      title: "Legal & RERA Verification",
      desc: "Complete document scrutinization by experienced property advocates: CMDA/DTCP approvals, encumbrance certificates (EC), and RERA sanction compliance."
    },
    {
      num: "04",
      title: "Transparent Price Negotiation",
      desc: "Zero hidden builder markups. We secure direct developer pre-launch discounts, transparent payment schedules, and end-to-end bank loan approvals."
    }
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Government RERA Registered",
      desc: `Registered under Tamil Nadu Real Estate Regulatory Authority (Reg: ${BRAND.reraId}). Every listed project strictly holds valid CMDA/DTCP sanctions.`
    },
    {
      icon: Scale,
      title: "Zero Brokerage on Direct Launches",
      desc: "You pay zero consultation fee or agency commission for new builder projects. Our pricing matches direct developer pricing with added advisory support."
    },
    {
      icon: FileCheck2,
      title: "Title & Legal Clearance",
      desc: "30-year parent document history check, encumbrance verification, and layout approval confirmation prior to collecting any booking token."
    },
    {
      icon: Users,
      title: "Tier-1 Developer Alliances",
      desc: "Authorized marketing partners for Casagrand, TVS Emerald, Shriram Properties, Puravankara, Brigade Group, and Appaswamy Real Estates."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-navy-950 text-white py-16 sm:py-24 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" />
              TNRERA Reg: {BRAND.reraId}
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight leading-tight">
              Advising Chennai homebuyers with uncompromising legal clarity.
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed font-sans">
              Property Gateway was founded to remove ambiguity from real estate decisions in Chennai. 
              We do not treat property purchase as a transactional classified ad — we act as your personal advisory desk from first inquiry to key handover.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenVisitModal?.()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-navy-950"
              >
                <Car className="w-4 h-4" />
                Book Free Site Visit
              </button>
              <a
                href={`https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent("Hi Property Gateway, I would like to speak to a senior property advisor.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Chat with Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Our Advisory Standards</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-navy-950">
            Why Chennai buyers trust Property Gateway
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-navy-900 mb-5">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-base text-navy-950 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Step Advisory Process */}
      <section className="bg-white border-y border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">The Property Gateway Protocol</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-navy-950">
              A transparent, 4-step home buying process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="relative bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif font-bold text-slate-300 block mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-semibold text-base text-navy-950 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office & Agency Credentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-navy-900 text-white rounded-2xl p-8 sm:p-12 border border-navy-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Physical Presence</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-slate-100">
                Operating from the heart of South Chennai
              </h2>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                Our central consulting office is located in Adambakkam, providing easy access to prime growth corridors including OMR, GST Road, Velachery, and the Inner Ring Road.
              </p>
              
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Registered Office:</strong> {BRAND.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><strong>TNRERA Registration:</strong> {BRAND.reraId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><strong>Digital & Marketing Partner:</strong> {BRAND.agency}</span>
                </div>
              </div>
            </div>

            <div className="bg-navy-950 p-6 sm:p-8 rounded-xl border border-navy-800 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Speak With Our Advisory Desk</h3>
              <p className="mt-1 text-sm text-slate-400">Available Monday through Sunday, 9:00 AM – 8:00 PM</p>
              
              <a
                href={`tel:${BRAND.phone}`}
                className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors"
              >
                Call {BRAND.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${BRAND.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center w-full py-3 px-6 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-colors"
              >
                WhatsApp Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
