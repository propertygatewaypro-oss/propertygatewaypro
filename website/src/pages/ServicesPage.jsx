import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Scale, 
  Coins, 
  Globe2, 
  Car, 
  FileCheck2, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  KeyRound, 
  Briefcase, 
  Layers,
  Sparkles,
  Award,
  BadgePercent
} from 'lucide-react';
import { BRAND, generateSiteVisitWhatsAppLink } from '../utils/constants';

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

// Lightweight Scroll Reveal Hook
function useScrollReveal(options = { threshold: 0.12 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

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

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const [secServicesRef, secServicesInView] = useScrollReveal();
  const [secComparisonRef, secComparisonInView] = useScrollReveal();
  const [secCtaRef, secCtaInView] = useScrollReveal();

  // Categories
  const categories = ['All', 'Homebuyers', 'Luxury & Coastal', 'NRI Services', 'Property Owners', 'Legal & Banking'];

  // Comprehensive Services Catalog (Inspired by Connection Point & Institutional Advisory)
  const allServices = [
    {
      id: 'builder-launches',
      icon: Building2,
      category: 'Homebuyers',
      title: '0% Brokerage on New Builder Launches',
      tagline: 'Authorized Channel Advisory for Chennai Tier-1 Developers',
      description: 'Direct developer pricing with zero agency commission. We provide first-hand access to pre-launches, inventory selection, and developer payment subsidies across Chennai.',
      deliverables: [
        'Casagrand, TVS Emerald, Shriram, Puravankara, Brigade & Appaswamy launches',
        'Direct pre-launch price advantage and unit selection',
        'Zero commission charged to homebuyers',
        'Guided on-site property walkthroughs with senior advisors'
      ],
      ctaText: 'Explore New Launches',
      ctaLink: '/properties?status=New+Launch'
    },
    {
      id: 'legal-audit',
      icon: FileCheck2,
      category: 'Legal & Banking',
      title: '30-Year Parent Title & Legal Scrutiny',
      tagline: 'Independent High-Court Advocate Verification',
      description: 'Buying property without complete title clarity is your biggest risk. Our in-house real estate advocates audit 30-year parent deeds, revenue records, and statutory approvals.',
      deliverables: [
        '30-year parent document chain audit and encumbrance certificates (EC)',
        'CMDA, DTCP, and local body planning permit verification',
        'TNRERA registration and sanction plan compliance',
        'Drafting of flawless sale agreements and builder tripartite deeds'
      ],
      ctaText: 'Request Legal Consultation',
      ctaLink: '/contact?purpose=legal-audit'
    },
    {
      id: 'luxury-villas',
      icon: Sparkles,
      category: 'Luxury & Coastal',
      title: 'Luxury Beachfront Villas & Private Estates',
      tagline: 'Chennai’s Most Prestigious Coastal & Boulevard Addresses',
      description: 'Bespoke advisory for ultra-high-net-worth individuals, business founders, and film professionals seeking private seaside estates on ECR and penthouses in Central Chennai.',
      deliverables: [
        'Direct sea-facing villas on ECR (Neelankarai, Akkarai, Injambakkam)',
        'Heritage luxury apartments in Anna Nagar, Adyar, and Alwarpet',
        'High privacy protocols and confidential transactions',
        'Architectural design consultation and customized floor layouts'
      ],
      ctaText: 'View Luxury Villas',
      ctaLink: '/properties?category=Luxury+Villa'
    },
    {
      id: 'nri-desk',
      icon: Globe2,
      category: 'NRI Services',
      title: 'NRI & Global Investor Concierge',
      tagline: 'Frictionless Remote Property Acquisition Across Time Zones',
      description: 'End-to-end support for non-resident Indians across the US, Gulf, Singapore, and UK. We handle property identification, video inspections, and power-of-attorney registration.',
      deliverables: [
        '4K live walkthroughs and neighborhood drone footage',
        'Dual-time-zone consultation over Zoom and WhatsApp',
        'Power of Attorney (POA) drafting and consular attestation guidance',
        'Repatriation, NRE/NRO banking guidance, and capital gains advisory'
      ],
      ctaText: 'Connect with NRI Desk',
      ctaLink: '/contact?purpose=nri-desk'
    },
    {
      id: 'resale-property',
      icon: KeyRound,
      category: 'Property Owners',
      title: 'Property Resale & Exclusive Mandate Sales',
      tagline: 'Maximizing Capital Returns with Targeted Buyer Reach',
      description: 'Looking to sell your premium apartment, villa, or land parcel? We screen high-intent buyers, create cinematic property listings, and manage price negotiations to secure top value.',
      deliverables: [
        'Comprehensive comparative market valuation (CMA) report',
        'Professional architectural photography and verified listing',
        'Targeted digital distribution across our network of 950+ qualified buyers',
        'Seamless token agreement, bank NOC coordination, and deed registration'
      ],
      ctaText: 'List Your Property for Sale',
      ctaLink: '/contact?purpose=resale'
    },
    {
      id: 'home-loans',
      icon: Coins,
      category: 'Legal & Banking',
      title: 'Pre-Approved Home Loans & Capital Solutions',
      tagline: 'Direct Corporate Tie-Ups with Top Banking Lenders',
      description: 'Navigate home financing with ease. Through institutional alliances with SBI, HDFC Bank, ICICI Bank, and Axis Bank, we unlock preferred interest rates and fast sanctions.',
      deliverables: [
        'Pre-approval in 48 to 72 hours with maximum loan-to-value (up to 80%)',
        'Lowest floating interest rates with waiver of processing charges',
        'Zero coordination headaches — our loan specialists manage paperwork',
        'Loan transfer, balance transfer, and top-up options available'
      ],
      ctaText: 'Check Loan Eligibility',
      ctaLink: '/contact?purpose=home-loan'
    },
    {
      id: 'site-visits',
      icon: Building2,
      category: 'Homebuyers',
      title: 'Guided Project Site Inspections',
      tagline: 'Personalized Property Walkthroughs Across Chennai',
      description: 'Experience your prospective communities in comfort. We organize dedicated, guided on-site project walkthroughs across Chennai for your family.',
      deliverables: [
        'Personalized property walkthrough accompanied by a senior specialist',
        'Accompanied by a senior micro-market advisory specialist',
        'Multi-project itinerary organized in a single smooth schedule',
        'Transparent comparative analysis between builders'
      ],
      ctaText: 'Schedule Site Visit',
      ctaLink: '/contact?purpose=site-visit'
    },
    {
      id: 'commercial-investments',
      icon: Briefcase,
      category: 'Property Owners',
      title: 'Commercial Offices & High-Yield Assets',
      tagline: 'Grade-A Tech Park Spaces & Retail High Streets',
      description: 'Strategic commercial property acquisitions and leasing for business enterprises and investors seeking robust 7% to 9% rental yields in OMR, Guindy, and Mount Road.',
      deliverables: [
        'Pre-leased commercial office units with institutional corporate tenants',
        'High-street retail spaces in prime South and Central Chennai catchments',
        'Industrial warehouses and logistics land along Sriperumbudur corridor',
        'Lease agreement structuring and escalations management'
      ],
      ctaText: 'Explore Commercial Real Estate',
      ctaLink: '/properties?category=Commercial+Office'
    }
  ];

  const filteredServices = activeTab === 'All' 
    ? allServices 
    : allServices.filter(s => s.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-12">
      
      {/* 1. HERO DIRECTORY HEADER */}
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
            <span className="text-[#A88548] font-bold">Services</span>
          </nav>

          {/* Hairline Editorial Eyebrow */}
          <div 
            className={`inline-flex items-center gap-3 mb-3.5 transition-all duration-700 ease-out delay-100 ${
              isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="h-[1px] w-6 sm:w-10 bg-[#A88548]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#7D5D2A]">
              END-TO-END REAL ESTATE ADVISORY
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-[#A88548]" />
          </div>

          <div className="max-w-3xl">
            <h1 
              className={`text-3xl sm:text-5xl lg:text-5xl font-serif font-bold text-[#1E232F] tracking-tight leading-[1.15] transition-all duration-700 ease-out delay-150 ${
                isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Best Real Estate <span className="text-gold-metallic italic">Services in Chennai</span>
            </h1>
            
            <p 
              className={`mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl transition-all duration-700 ease-out delay-200 ${
                isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              A tradition of legal clarity, zero buyer brokerage, and institutional due diligence. Whether you are acquiring a family home, investing from overseas, or liquidating a high-value property, our dedicated advisory desk manages your entire journey.
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
                <Building2 className="w-4 h-4" />
                <span>Schedule Property Visit</span>
              </Link>
              
              <a
                href={generateSiteVisitWhatsAppLink('General Real Estate Services')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#1E232F] border border-[#E7E2D8] hover:border-[#A88548] font-bold text-sm transition-all shadow-xs"
              >
                <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-4 h-4 object-contain" />
                <span>Chat on WhatsApp</span>
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
                Successful Closures
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
                  end={30} 
                  suffix=" Yrs" 
                  trigger={isHeroLoaded} 
                  duration={1800} 
                />
              </div>
              <div className="text-xs text-slate-600 mt-1 uppercase tracking-wider font-sans font-semibold">
                Title Deed Scrutiny
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICES CATALOG WITH INTERACTIVE CATEGORY TABS */}
      <section 
        ref={secServicesRef}
        className="py-10 sm:py-14 bg-[#FAF9F6] border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className={`text-center max-w-2xl mx-auto mb-8 transition-all duration-700 ease-out ${
              secServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88548]">
              WHAT WE DO FOR YOU
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Complete Real Estate Services Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Choose your requirement below to explore our tailored real estate services across Chennai.
            </p>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    activeTab === cat
                      ? 'bg-gold-metallic text-white border-transparent shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {filteredServices.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className={`p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#A88548]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${
                    secServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#A88548] group-hover:scale-110 group-hover:bg-[#A88548] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-md font-semibold">
                        {svc.category}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#A88548] transition-colors leading-snug">
                      {svc.title}
                    </h3>

                    <p className="text-xs font-semibold text-[#A88548] uppercase tracking-wider mt-1">
                      {svc.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-sans">
                      {svc.description}
                    </p>

                    {/* What's Included Deliverables Checklist */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Key Service Deliverables:
                      </span>
                      {svc.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      to={svc.ctaLink}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-metallic text-white text-xs font-bold transition-all active:scale-[0.98] shadow-xs"
                    >
                      <span>{svc.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Inquire Details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. THE PROPERTY GATEWAY DIFFERENCE (Comparison Architecture) */}
      <section 
        ref={secComparisonRef}
        className="py-10 sm:py-14 bg-white border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className={`text-center max-w-2xl mx-auto mb-8 sm:mb-10 transition-all duration-700 ease-out ${
              secComparisonInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88548]">
              THE ADVISORY ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Traditional Brokerage vs Property Gateway
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Why 950+ families chose our structured advisory model over unregulated agents.
            </p>
          </div>

          <div 
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-700 ease-out ${
              secComparisonInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Traditional Agent Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-serif font-bold text-lg text-slate-700">Traditional Real Estate Agents</h3>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
                  Outdated Model
                </span>
              </div>
              <ul className="space-y-3 text-xs leading-relaxed">
                <li className="flex items-start gap-2 text-slate-600">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Charges 2% to 3% buyer brokerage on new builder projects</span>
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>No independent legal advocate scrutiny; buyer risks unapproved layouts</span>
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Pushes whichever developer offers the highest broker commission</span>
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Buyer coordinates unassisted site visits and bank paperwork</span>
                </li>
              </ul>
            </div>

            {/* Property Gateway Advisory Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white text-[#1E232F] border border-[#E7E2D8] shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#A88548]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8] relative z-10">
                <h3 className="font-serif font-bold text-lg text-[#1E232F]">Property Gateway Advisory</h3>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8]">
                  TNRERA Verified
                </span>
              </div>
              <ul className="space-y-3 text-xs leading-relaxed text-slate-600 relative z-10">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                  <span><strong>Zero Brokerage Guarantee:</strong> Exactly ₹0 commission to buyers on new launches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                  <span><strong>30-Year Title Scrutiny:</strong> In-house advocates audit parent deeds & approvals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                  <span><strong>Objective Advisory:</strong> We prioritize your family's commute, budget, and ROI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A88548] shrink-0 mt-0.5" />
                  <span><strong>Personalized Site Visits:</strong> Guided on-site project walkthroughs across Chennai</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PHYSICAL HEADQUARTERS & SERVICE INQUIRY DESK */}
      <section 
        ref={secCtaRef}
        className="py-8 sm:py-12 bg-[#FAF9F6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className={`rounded-3xl bg-white text-[#1E232F] p-7 sm:p-10 lg:p-12 border border-[#E7E2D8] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 transition-all duration-700 ease-out ${
              secCtaInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
            }`}
          >
            
            <div className="max-w-2xl space-y-3.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8]">
                <Building2 className="w-3.5 h-3.5 text-[#A88548]" /> BESPOKE SERVICE DESK
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E232F] tracking-tight leading-snug">
                Need Help With a Specific <span className="text-gold-metallic italic">Real Estate Service?</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Our senior advisors and real estate advocates are available Monday through Sunday (9:00 AM – 8:00 PM) for private consultations, property site inspections, and title audits.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-1 text-xs text-slate-600">
                <div>
                  <strong className="text-[#1E232F]">Advisory Office:</strong> {BRAND.address}
                </div>
                <div>
                  <strong className="text-[#1E232F]">TNRERA:</strong> {BRAND.reraId}
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
                <span>Request Custom Service</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
