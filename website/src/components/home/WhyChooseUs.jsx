import React, { useState, useEffect, useRef } from 'react';
import { BRAND } from '../../utils/constants';

function SpotlightCard({ item, idx, isVisible }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      style={{
        transitionDelay: `${idx * 110}ms`,
      }}
      className={`p-5 sm:p-6 lg:p-7 rounded-2xl bg-[#151720] border transition-all duration-500 flex flex-col justify-between group relative overflow-hidden ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-7'
      } ${
        isHovered
          ? 'border-[#C98A4B]/60 shadow-[0_20px_40px_-15px_rgba(201,138,75,0.22)] -translate-y-2'
          : 'border-white/[0.08] hover:border-[#C98A4B]/30'
      }`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 138, 75, 0.15), transparent 80%)`,
        }}
      />

      {/* Subtle Card Top Ambient Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C98A4B]/0 to-transparent group-hover:via-[#C98A4B]/80 transition-all duration-500" />

      <div className="relative z-10">
        {/* Editorial Top Lockup: Serif Index + Official Micro-Badge */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C98A4B] tracking-tight group-hover:text-[#E5B57E] transition-colors duration-300">
            {item.index}
          </span>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08] group-hover:border-[#C98A4B]/40 group-hover:text-[#C98A4B] group-hover:bg-[#C98A4B]/10 transition-all duration-300">
            {item.tag}
          </span>
        </div>

        <div className="pt-4">
          <h3 className="text-base sm:text-lg font-bold text-[#F1EEE7] tracking-tight group-hover:text-white transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed mt-2.5">
            {item.description}
          </p>
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center gap-2 text-xs font-bold text-[#C98A4B] relative z-10">
        <span className="w-4 h-4 rounded-full bg-[#C98A4B]/15 border border-[#C98A4B]/30 flex items-center justify-center text-[10px] shrink-0 group-hover:bg-[#C98A4B] group-hover:text-black transition-all duration-300">
          ✓
        </span>
        <span className="tracking-wide group-hover:text-[#E5B57E] transition-colors">
          {item.highlight}
        </span>
      </div>
    </div>
  );
}

export default function WhyChooseUs({ onOpenVisitModal }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      index: "01",
      tag: "TNRERA #020/2019",
      title: "TNRERA Licensed Advisory",
      description: `Registered with Tamil Nadu RERA (${BRAND.reraId}). We only list properties with approved building sanctions and zero legal encumbrances.`,
      highlight: "100% Legal Scrutiny"
    },
    {
      index: "02",
      tag: "0% COMMISSION",
      title: "Zero Brokerage on New Projects",
      description: "Buy directly at developer prices. We charge ₹0 commission to buyers for all newly launched gated community apartments, villas, and plots.",
      highlight: "Save 2% Brokerage"
    },
    {
      index: "03",
      tag: "30-YR TITLE AUDIT",
      title: "Title & Document Assistance",
      description: "Our in-house legal advocates verify 30-year parent deeds, patta, CMDA approvals, and assist with bank loan approvals up to 80% from top lenders.",
      highlight: "SBI & HDFC Pre-Approved"
    },
    {
      index: "04",
      tag: "GUIDED INSPECTIONS",
      title: "Complimentary Site Visits",
      description: "Experience projects in person with your family. We organize dedicated, guided on-site visits with expert project walkthroughs across Chennai.",
      highlight: "Personalized Site Walkthroughs"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-14 sm:py-18 md:py-20 lg:py-24 bg-[#0F1117] border-y border-[#C98A4B]/20 relative overflow-hidden"
    >
      {/* Animated Left-to-Right Horizon Light Beam Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.06] overflow-hidden pointer-events-none">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#C98A4B] to-transparent animate-beam-sweep blur-[0.5px]" />
      </div>

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#C98A4B]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 lg:mb-16 space-y-2.5 sm:space-y-3 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#C98A4B] bg-[#C98A4B]/15 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#C98A4B]/35 inline-flex items-center gap-1.5 shadow-sm">
            <span>★</span>
            <span>The Property Gateway Assurance</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-serif font-bold text-[#F1EEE7] tracking-tight leading-tight">
            Why Discerning Chennai Buyers <span className="text-[#C98A4B]">Trust Us</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
            Buying property is your family's biggest milestone. We eliminate ambiguity, hidden fees, and legal risks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {pillars.map((item, idx) => (
            <SpotlightCard 
              key={idx} 
              item={item} 
              idx={idx} 
              isVisible={isVisible} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
