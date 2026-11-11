import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  Phone, 
  MessageSquare 
} from 'lucide-react';
import { BRAND } from '../utils/constants';

// Luxury Quartic Ease-Out Number Counter
function AnimatedStatCounter({ 
  start = 0, 
  end, 
  duration = 2000, 
  decimals = 0, 
  prefix = '', 
  suffix = '', 
  trigger = true 
}) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease-out for ultra smooth luxury deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentVal = start + (end - start) * easeOut;
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [start, end, duration, trigger]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span className="tabular-nums font-mono font-bold">
      {prefix}{formatted}{suffix}
    </span>
  );
}

// Lightweight, performant scroll observer hook
function useScrollReveal(options = { threshold: 0.12 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default function AboutPage() {
  // Mount animation for hero
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsHeroLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Section scroll reveal observers
  const [sec2Ref, sec2InView] = useScrollReveal();
  const [sec3Ref, sec3InView] = useScrollReveal();
  const [sec4Ref, sec4InView] = useScrollReveal();
  const [sec5Ref, sec5InView] = useScrollReveal();
  const [sec6Ref, sec6InView] = useScrollReveal();

  // 6 Core Services (Inspired by PropLeaf's high-converting services architecture)
  const services = [
    {
      icon: Compass,
      title: "Strategic Property Advisory",
      category: "Bespoke Consulting",
      desc: "Tailored residential guidance analyzing commute radii, micro-market price benchmarks, builder delivery history, and 5-year capital appreciation potential."
    },
    {
      icon: Globe2,
      title: "NRI & Global Investor Concierge",
      category: "Cross-Border Desk",
      desc: "Dedicated advisory for non-resident Indians across the US, Middle East, Singapore, and UK. Includes 4K live video walk-throughs, power-of-attorney coordination, and repatriation advisory."
    },
    {
      icon: Sparkles,
      title: "Premium Villas & Coastal Estates",
      category: "Luxury Portfolio",
      desc: "Exclusive access to Chennai's most sought-after addresses — sea-facing villas on ECR, sky-villas on OMR, and elite residential enclaves in Anna Nagar, Adyar, and Alwarpet."
    },
    {
      icon: FileCheck2,
      title: "Legal Due Diligence & Title Audit",
      category: "In-House Legal",
      desc: "Rigorous 30-year parent deed scrutinization by veteran high-court property advocates: CMDA/DTCP building sanctions, revenue patta, and RERA registration compliance."
    },
    {
      icon: Coins,
      title: "Pre-Approved Home Loans Desk",
      category: "Institutional Banking",
      desc: "Direct corporate tie-ups with SBI, HDFC Bank, ICICI Bank, and Axis Bank. We secure competitive interest rates, waiver of loan processing hurdles, and sanctions up to 80%."
    },
    {
      icon: BadgePercent,
      title: "0% Brokerage on New Projects",
      category: "Developer Partner",
      desc: "As authorized channel partners for Chennai's tier-1 builders (Casagrand, TVS Emerald, Shriram, Puravankara, Brigade, Appaswamy), you pay the exact developer price with zero added fees."
    }
  ];

  // Why Choose Us Pillars (PropLeaf Inspired)
  const whyChooseUs = [
    {
      title: "100% Verified Legal Scrutiny",
      highlight: "Zero Risk",
      desc: "Every listed project has passed stringent CMDA, DTCP, and TNRERA regulatory compliance before being recommended to clients."
    },
    {
      title: "Zero Brokerage Guarantee",
      highlight: "Save 2% - 3%",
      desc: "We charge absolutely zero commission to buyers for newly launched and under-construction gated communities across Chennai."
    },
    {
      title: "Guided Property Site Visits",
      highlight: "Personalized",
      desc: "Tour multiple shortlisted projects with your family accompanied by our certified property specialists anywhere in Chennai."
    },
    {
      title: "4.9★ Client Trust Rating",
      highlight: "350+ Reviews",
      desc: "Ranked among Chennai's highest-rated real estate consultancies, backed by honest guidance and prompt post-booking support."
    },
    {
      title: "Tier-1 Developer Alliances",
      highlight: "Direct Access",
      desc: "First-hand access to pre-launches, exclusive unit allotments, and developer pre-launch discounts across prime Chennai corridors."
    },
    {
      title: "End-to-End Handover Support",
      highlight: "Post-Sale Care",
      desc: "Our commitment continues beyond booking to parent document registration, interior coordination, and rental tenant management."
    }
  ];

  // 4-Step Structured Protocol
  const steps = [
    {
      num: "01",
      title: "Requirement & Spatial Profiling",
      desc: "We evaluate your family's exact budget, spatial configuration, school/office commute corridors, and timeline before curating 3 to 4 vetted communities."
    },
    {
      num: "02",
      title: "Guided On-Site Property Tours",
      desc: "Inspect shortlisted projects stress-free. We coordinate personalized on-site property walkthroughs for your entire family across Chennai."
    },
    {
      num: "03",
      title: "Comprehensive Legal Verification",
      desc: "Complete 30-year document audit by experienced property advocates: CMDA/DTCP approvals, encumbrance certificates (EC), and RERA sanction compliance."
    },
    {
      num: "04",
      title: "Transparent Price Negotiation",
      desc: "Zero hidden builder markups. We secure direct developer pre-launch terms, transparent milestone payment schedules, and end-to-end bank disbursements."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-12">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative bg-[#FAF9F6] text-[#1E232F] pt-10 pb-14 sm:pt-14 sm:pb-16 border-b border-[#E7E2D8] overflow-hidden">
        {/* Subtle Architectural Glow & Grid Texture */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#A88548 1px, transparent 1px), radial-gradient(#A88548 1px, #FAF9F6 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A88548]/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav 
            className={`flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-5 font-medium transition-all duration-700 ease-out ${
              isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            <Link to="/" className="hover:text-[#A88548] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#A88548] font-bold">About Us</span>
          </nav>

          {/* Hairline Editorial Eyebrow */}
          <div 
            className={`inline-flex items-center gap-3 mb-3.5 transition-all duration-700 ease-out delay-100 ${
              isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="h-[1px] w-6 sm:w-10 bg-[#A88548]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#7D5D2A]">
              CHENNAI'S PREMIER REAL ESTATE ADVISORY
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-[#A88548]" />
          </div>

          <div className="max-w-3xl">
            <h1 
              className={`text-3xl sm:text-5xl lg:text-5xl font-serif font-bold text-[#1E232F] tracking-tight leading-[1.15] transition-all duration-700 ease-out delay-150 ${
                isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Advising Chennai Homebuyers with <span className="text-gold-metallic italic">Uncompromising Integrity</span>
            </h1>
            
            <p 
              className={`mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl transition-all duration-700 ease-out delay-200 ${
                isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Property Gateway was founded to remove ambiguity, aggressive sales pitches, and legal blind spots from Chennai real estate. We treat property acquisition as your family's biggest milestone — offering institutional-grade due diligence, direct developer pricing, and 0% buyer brokerage.
            </p>

            <div 
              className={`mt-6 flex flex-wrap items-center gap-3.5 transition-all duration-700 ease-out delay-300 ${
                isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                to="/contact?purpose=site-visit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-metallic text-white font-bold text-sm transition-all shadow-md active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Property Visit</span>
              </Link>
              
              <a
                href={`https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent("Hello Property Gateway,\n\nI would like to speak with a senior property advisor regarding verified homes in Chennai. Thank you!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#1E232F] border border-[#E7E2D8] hover:border-[#A88548] font-bold text-sm transition-all shadow-xs"
              >
                <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-4 h-4 object-contain" />
                <span>Chat with Advisor</span>
              </a>
            </div>
          </div>

          {/* Key Metrics Strip (With Smooth Deceleration Counter Animation) */}
          <div 
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-7 border-t border-[#E7E2D8] max-w-4xl transition-all duration-700 ease-out delay-350 ${
              isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7E2D8] shadow-2xs group hover:border-[#A88548] hover:shadow-xs transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#7D5D2A]">
                <AnimatedStatCounter 
                  end={4500} 
                  suffix="+" 
                  trigger={isHeroLoaded} 
                  duration={2200} 
                />
              </div>
              <div className="text-xs text-slate-600 mt-1 uppercase tracking-wider font-sans font-semibold">
                Properties Evaluated
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7E2D8] shadow-2xs group hover:border-[#A88548] hover:shadow-xs transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#7D5D2A]">
                <AnimatedStatCounter 
                  end={950} 
                  suffix="+" 
                  trigger={isHeroLoaded} 
                  duration={2000} 
                />
              </div>
              <div className="text-xs text-slate-600 mt-1 uppercase tracking-wider font-sans font-semibold">
                Families Assisted
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7E2D8] shadow-2xs group hover:border-[#A88548] hover:shadow-xs transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#7D5D2A]">
                <AnimatedStatCounter 
                  start={2} 
                  end={0} 
                  suffix="%" 
                  trigger={isHeroLoaded} 
                  duration={1600} 
                />
              </div>
              <div className="text-xs text-slate-600 mt-1 uppercase tracking-wider font-sans font-semibold">
                Buyer Brokerage
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7E2D8] shadow-2xs group hover:border-[#A88548] hover:shadow-xs transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#7D5D2A] flex items-baseline gap-1">
                <AnimatedStatCounter 
                  end={4.9} 
                  decimals={1} 
                  trigger={isHeroLoaded} 
                  duration={1800} 
                />
                <span className="text-base text-slate-400 font-sans font-normal">/ 5.0</span>
              </div>
              <div className="text-xs text-slate-600 mt-1 uppercase tracking-wider font-sans font-semibold">
                Verified Client Rating
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. WHO WE ARE: OUR STORY & ETHOS (Gaps Tightened to py-10 sm:py-14) */}
      <section 
        ref={sec2Ref}
        className="py-10 sm:py-14 bg-white border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div 
              className={`lg:col-span-7 space-y-4 transition-all duration-700 ease-out ${
                sec2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#A88548] text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                WHO WE ARE
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Not a Transactional Brokerage. Your Personal <span className="text-[#A88548] italic">Real Estate Counsel</span>.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                Operating under Tamil Nadu Real Estate Regulatory Authority Registration <strong>{BRAND.reraId}</strong>, Property Gateway is a specialized advisory consultancy founded by professionals with deep backgrounds in structured real estate, banking due diligence, and property law.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                Traditional real estate often prioritizes developer push over consumer interest. We engineered an advisory-first model: we don’t list unapproved layouts, we independently audit 30-year parent deeds, and we provide honest micro-market intelligence so you never overpay.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 hover:border-[#A88548]/40 transition-colors shadow-2xs">
                  <div className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>TNRERA Registered</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Licensed agent: {BRAND.reraId}. Complete statutory compliance under TN RERA regulations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 hover:border-[#A88548]/40 transition-colors shadow-2xs">
                  <div className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>In-House Legal Advocates</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Independent title scrutiny of CMDA, DTCP, Patta, and Encumbrance certificates.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Credential Column */}
            <div 
              className={`lg:col-span-5 transition-all duration-700 ease-out delay-150 ${
                sec2InView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
              }`}
            >
              <div className="relative rounded-3xl bg-white text-[#1E232F] p-7 sm:p-8 border border-[#E7E2D8] shadow-xl overflow-hidden hover:border-[#A88548] transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#A88548]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E2D8]">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#7D5D2A] font-bold">
                      AUTHORITY BADGE
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8]">
                      VERIFIED AGENCY
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#1E232F]">
                    The Property Gateway Standard
                  </h3>

                  <ul className="space-y-3 text-xs text-slate-600 font-sans">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                      <span><strong>Zero Buyer Commission:</strong> 100% free consultation on all new builder projects.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                      <span><strong>Guided On-Site Inspections:</strong> Personalized property walkthroughs for your family.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                      <span><strong>Tier-1 Developers Only:</strong> Casagrand, TVS Emerald, Shriram, Puravankara, Brigade, Appaswamy.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                      <span><strong>Home Loan Desk:</strong> SBI, HDFC, ICICI instant sanctions with lowest floating rates.</span>
                    </li>
                  </ul>

                  <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Chennai Headquarters</span>
                    <span className="font-bold text-[#A88548]">Saidapet, Chennai - 600 015</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES WE PROVIDE (Gaps Tightened to py-10 sm:py-14, Staggered Card Entrance) */}
      <section 
        id="services" 
        ref={sec3Ref}
        className="py-10 sm:py-14 bg-[#FAF9F6] scroll-mt-20 border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className={`text-center max-w-2xl mx-auto mb-8 sm:mb-10 transition-all duration-700 ease-out ${
              sec3InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88548]">
              COMPREHENSIVE ADVISORY SUITE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Services We Provide
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              From first shortlisting and on-site property inspections to legal parent document verification and home loan sanctioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  style={{ transitionDelay: `${i * 75}ms` }}
                  className={`p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#A88548]/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group ${
                    sec3InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#A88548] group-hover:scale-110 group-hover:bg-[#A88548] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                        {svc.category}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#A88548] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-sans">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100">
                    <Link
                      to="/contact"
                      className="text-xs font-bold text-[#A88548] group-hover:text-[#9e632b] flex items-center gap-1.5"
                    >
                      <span>Inquire about this service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE PROPERTY GATEWAY */}
      <section 
        ref={sec4Ref}
        className="py-10 sm:py-14 bg-[#F5F2EA] text-[#1E232F] relative overflow-hidden border-b border-[#E6E1D6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div 
            className={`text-center max-w-2xl mx-auto mb-8 sm:mb-10 transition-all duration-700 ease-out ${
              sec4InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#7D5D2A]">
              THE CLIENT ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E232F] mt-1">
              Why Discerning Chennai Buyers Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              We eliminate friction, bias, and uncertainty from the real estate buying journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${idx * 75}ms` }}
                className={`p-6 rounded-2xl bg-white border border-[#E7E2D8] hover:border-[#A88548] hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(168,133,72,0.15)] transition-all duration-300 flex flex-col justify-between group ${
                  sec4InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#7D5D2A]">0{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8]">
                      {item.highlight}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1E232F] group-hover:text-[#A88548] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. THE 4-STEP ADVISORY PROCESS (Gaps Tightened to py-10 sm:py-14) */}
      <section 
        ref={sec5Ref}
        className="py-10 sm:py-14 bg-white border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className={`text-center max-w-2xl mx-auto mb-8 sm:mb-10 transition-all duration-700 ease-out ${
              sec5InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88548]">
              THE PROPERTY GATEWAY PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              A Transparent, 4-Step Home Buying Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              How our advisors shepherd you safely from requirement analysis to registration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 flex flex-col justify-between hover:border-[#A88548]/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                  sec5InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div>
                  <span className="text-3xl font-serif font-bold text-[#A88548] block mb-2.5">
                    {step.num}
                  </span>
                  <h3 className="font-serif font-bold text-base text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PHYSICAL HEADQUARTERS & ADVISORY DESK BANNER (Tightened to py-8 sm:py-12) */}
      <section 
        ref={sec6Ref}
        className="py-8 sm:py-12 bg-[#FAF9F6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className={`rounded-3xl bg-white text-[#1E232F] p-7 sm:p-10 lg:p-12 border border-[#E7E2D8] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 transition-all duration-700 ease-out ${
              sec6InView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
            }`}
          >
            
            <div className="max-w-2xl space-y-3.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8]">
                <Building2 className="w-3.5 h-3.5 text-[#A88548]" /> PHYSICAL ADVISORY HEADQUARTERS
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E232F] tracking-tight leading-snug">
                Speak With Chennai’s <span className="text-gold-metallic italic">Property Advisory Team</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Our central consulting office is located in Saidapet, providing easy access to prime growth corridors including Guindy, OMR, GST Road, and ECR. Open Monday through Sunday, 9:00 AM – 8:00 PM.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 sm:gap-6 pt-1 text-xs text-slate-600">
                <div>
                  <strong className="text-[#1E232F]">Address:</strong> {BRAND.address}
                </div>
                <div>
                  <strong className="text-[#1E232F]">TNRERA:</strong> {BRAND.reraId} (dated {BRAND.reraDate})
                </div>
                <div>
                  <strong className="text-[#1E232F]">MSME:</strong> {BRAND.udyamRegNo}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <a
                href={`tel:${BRAND.phone}`}
                className="px-6 py-3.5 rounded-xl bg-gold-metallic text-white font-bold text-sm active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BRAND.phoneDisplay}</span>
              </a>

              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#1E232F] border border-[#E7E2D8] hover:border-[#A88548] font-bold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#A88548]" />
                <span>Submit Requirements</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
