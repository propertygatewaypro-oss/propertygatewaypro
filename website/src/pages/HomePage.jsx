import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Phone, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import PropertyCard from '../components/property/PropertyCard';
import WhyChooseUs from '../components/home/WhyChooseUs';
import SEO from '../components/common/SEO';
import { subscribeProperties, subscribeTestimonials } from '../services/propertyService';
import { INITIAL_TESTIMONIALS } from '../data/initialProperties';
import { BRAND } from '../utils/constants';
import { getRealEstateAgentSchema, getFaqSchema } from '../utils/seoSchemas';

export default function HomePage({ onOpenVisitModal }) {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isFeaturedInView, setIsFeaturedInView] = useState(false);
  const [isFaqInView, setIsFaqInView] = useState(false);
  const featuredSectionRef = useRef(null);
  const faqSectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsFeaturedInView(true);
      setIsFaqInView(true);
      return;
    }

    const featuredObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFeaturedInView(true);
          featuredObserver.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (featuredSectionRef.current) {
      featuredObserver.observe(featuredSectionRef.current);
    }

    const faqObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFaqInView(true);
          faqObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (faqSectionRef.current) {
      faqObserver.observe(faqSectionRef.current);
    }

    return () => {
      featuredObserver.disconnect();
      faqObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    // Realtime subscription to properties (auto-updates when admin publishes or edits)
    const unsubscribeProps = subscribeProperties((liveProps) => {
      setFeaturedProperties(liveProps.slice(0, 6));
      setLoading(false);
    }, { pageSize: 6 });

    // Live subscription to client feedbacks / testimonials
    const unsubscribeTestimonials = subscribeTestimonials((liveData) => {
      if (liveData && liveData.length > 0) {
        setTestimonials(liveData);
      }
    });

    return () => {
      if (typeof unsubscribeProps === 'function') {
        unsubscribeProps();
      }
      if (typeof unsubscribeTestimonials === 'function') {
        unsubscribeTestimonials();
      }
    };
  }, []);

  const filteredList = activeTab === 'All' 
    ? featuredProperties 
    : featuredProperties.filter(p => {
        const typeStr = (p.propertyType || p.type || '').toLowerCase();
        return typeStr.includes(activeTab.toLowerCase());
      });

  const faqs = [
    {
      q: "Why is there 0% brokerage on new builder projects?",
      a: `As an authorized channel advisory partner under TNRERA (${BRAND.reraId}) for Chennai's tier-1 builders (Casagrand, TVS Emerald, Shriram, Puravankara, Brigade, Appaswamy), our consultation fees are remunerated directly by the builders. You pay the exact direct developer price with zero added commission or hidden charges.`
    },
    {
      q: "How do Property Site Visits work?",
      a: "Once you shortlist properties, our advisory team coordinates a personalized site visit for you and your family. A senior property specialist will walk you through the model homes, floor plans, and amenities with zero pressure or obligation."
    },
    {
      q: "Are all listed properties approved by TNRERA and local authorities?",
      a: "Yes. Every residential apartment, villa, and plot listed on Property Gateway is strictly validated against TNRERA filings, CMDA / DTCP planning approvals, and 30-year title clearance by legal advocates prior to listing."
    },
    {
      q: "Can Property Gateway assist with bank home loan approvals and legal paperwork?",
      a: "Yes. We maintain direct loan facilitation desks with leading banks including SBI, HDFC Bank, ICICI Bank, and Axis Bank for expedited home loan processing at optimal interest rates, alongside end-to-end guidance during registration at the Sub-Registrar Office."
    }
  ];

  // Schema.org Graph for Homepage
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getRealEstateAgentSchema(),
      getFaqSchema(faqs)
    ]
  };

  return (
    <div className="space-y-0">
      <SEO
        title="Verified Chennai Real Estate & RERA Approved Properties"
        description="Explore RERA-approved luxury apartments, beachside villas along ECR, and gated communities along OMR Chennai. Direct developer pricing, title verification & 0% buyer brokerage."
        canonicalUrl="/"
        schemaData={homeSchema}
      />

      {/* 1. Hero Section with Search Bar */}
      <HeroSection onOpenVisitModal={onOpenVisitModal} />

      {/* 2. Featured Projects Grid - Warm Travertine Luxury Gallery */}
      <section 
        ref={featuredSectionRef}
        className="bg-[#FAF9F6] border-b border-[#E6E1D6] pt-12 sm:pt-16 pb-20 sm:pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 transition-all duration-700 ease-out ${
            isFeaturedInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7D5D2A] bg-[#A88548]/15 px-3 py-1 rounded-full border border-[#A88548]/30 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A88548] shrink-0" />
                <span>TNRERA Verified Projects</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181B22] tracking-tight mt-2.5">
                Featured Projects Across Chennai
              </h2>
              <p className="text-sm sm:text-[14.5px] text-slate-600 mt-1.5 max-w-xl leading-relaxed">
                Direct developer pricing, CMDA/DTCP legal approvals, and 0% brokerage on all new launches.
              </p>
            </div>

            {/* Category Tabs Filter - Travertine Stone Pill Container */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EFECE5] rounded-xl border border-[#E0DBD0] self-start md:self-auto overflow-x-auto no-scrollbar shadow-xs">
              {['All', 'Apartment', 'Villa', 'Commercial'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab
                      ? 'bg-gold-metallic text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  {tab === 'All' ? 'All Verified' : `${tab}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Property Grid with Staggered Cascading Entrance */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 rounded-2xl bg-[#EFECE5] animate-pulse border border-[#E0DBD0]" />
              ))}
            </div>
          ) : filteredList.length > 0 ? (
            <div 
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredList.map((property, idx) => (
                <div
                  key={property.id}
                  className={isFeaturedInView ? "animate-card-cascade" : "opacity-0"}
                  style={{ animationDelay: `${idx * 75}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E6E1D6] p-8 space-y-3">
              <p className="text-slate-600 text-sm">
                No properties found in this category right now.
              </p>
              <Link to="/properties" className="text-[#A88548] font-semibold text-sm hover:underline">
                View all listings →
              </Link>
            </div>
          )}

          {/* View All Listings CTA */}
          <div className="text-center mt-12 sm:mt-14">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold-metallic text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              <span>Explore All Chennai Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Why Discerning Buyers Choose Us */}
      <WhyChooseUs onOpenVisitModal={onOpenVisitModal} />

      {/* 4. Authentic Homebuyer Case Studies & Reviews - Compact Two-Tier Modern Marquee */}
      <section className="pt-10 sm:pt-12 md:pt-14 pb-4 sm:pb-6 bg-[#FAF9F6] border-t border-[#EAE6DE] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-2.5">
              <span className="w-5 sm:w-6 h-[1px] bg-[#A88548]/50" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#7D5D2A]">
                Verified Client Journeys
              </span>
              <span className="w-5 sm:w-6 h-[1px] bg-[#A88548]/50" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-[#181B22] tracking-tight mt-1.5 leading-snug sm:leading-tight">
              Trusted by Homebuyers <span className="text-gold-metallic font-serif">Across Chennai</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Real families and investors sharing authentic experiences purchasing verified homes through Property Gateway.
            </p>
          </div>
        </div>

        {/* Continuous Right-to-Left Marquee Carousel */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Fade Gradients (Vignettes - Scaled for mobile) */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-16 md:w-28 z-20 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/85 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-16 md:w-28 z-20 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/85 to-transparent" />

          {/* Marquee Track */}
          <div className="animate-marquee-rtl py-2 px-1 sm:px-2 flex gap-3.5 sm:gap-5">
            {[...testimonials, ...testimonials].map((t, idx) => {
              const displayInitials = t.initials || (t.author ? t.author.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() : 'PG');
              return (
                <div 
                  key={`${t.id || 't'}-${idx}`}
                  className="w-[285px] sm:w-[350px] md:w-[410px] shrink-0 bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 md:p-6 border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#A88548]/50 transition-all duration-300"
                >
                  <div>
                    {/* Rating stars & verified tag */}
                    <div className="flex items-center justify-between gap-1 mb-2.5">
                      <div className="flex items-center gap-0.5 text-[#D4AF37]">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      {t.verified !== false && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Homeowner
                        </span>
                      )}
                    </div>

                    {/* Top: Quote with styled quotation marks and bolded highlights */}
                    <p className="text-slate-700 text-xs sm:text-sm md:text-[14px] leading-relaxed">
                      <span className="text-[#A88548] font-serif font-black text-lg sm:text-xl mr-1 select-none">“</span>
                      {t.beforeHighlight !== undefined ? (
                        <>
                          {t.beforeHighlight}
                          {t.highlight && <strong className="font-bold text-slate-900">{t.highlight}</strong>}
                          {t.afterHighlight}
                        </>
                      ) : (
                        <>
                          {t.highlight && <strong className="font-bold text-slate-900 mr-1">{t.highlight}</strong>}
                          {t.content || t.quote}
                        </>
                      )}
                      <span className="text-[#A88548] font-serif font-black text-lg sm:text-xl ml-1 select-none">”</span>
                    </p>
                  </div>

                  {/* Bottom Inset Panel: Avatar, Name, and Role */}
                  <div className="bg-white rounded-xl p-3 sm:p-3.5 md:p-4 border border-slate-100 shadow-xs flex items-center gap-2.5 sm:gap-3.5 mt-3.5 sm:mt-4 md:mt-5">
                    <div className="relative shrink-0">
                      {t.avatar ? (
                        <img 
                          src={t.avatar} 
                          alt={t.author} 
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-[#A88548] ring-offset-2 ring-offset-white"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) {
                              e.target.nextElementSibling.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#181B22] to-[#272B38] text-[#A88548] font-bold text-xs ring-2 ring-[#A88548] ring-offset-2 ring-offset-white ${t.avatar ? 'hidden' : 'flex'} items-center justify-center`}
                      >
                        {displayInitials}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm md:text-[15px] text-[#181B22] truncate">
                        {t.author}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) Accordion - Full Width Animated Lite Editorial */}
      <section 
        ref={faqSectionRef}
        className="pt-6 sm:pt-8 pb-12 sm:pb-16 md:pb-18 bg-[#FAF9F6] border-t border-[#EAE6DE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-2xl mx-auto mb-6 sm:mb-8 transition-all duration-700 ease-out ${
            isFaqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="inline-flex items-center gap-2 sm:gap-2.5">
              <span className="w-5 sm:w-6 h-[1px] bg-[#A88548]/50" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#A88548]">
                Clarity & Legal Transparency
              </span>
              <span className="w-5 sm:w-6 h-[1px] bg-[#A88548]/50" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-[#181B22] tracking-tight mt-1.5 leading-snug sm:leading-tight">
              Frequently Asked <span className="text-[#A88548]">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
              Everything you need to know about our zero-brokerage advisory, TNRERA approvals, and guided property site visits.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    transitionDelay: isFaqInView ? `${idx * 90}ms` : '0ms'
                  }}
                  className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-0.5 ${
                    isFaqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  } ${
                    isOpen 
                      ? 'border border-[#A88548]/50 border-l-4 border-l-[#A88548] shadow-sm' 
                      : 'border border-[#E2E8F0] hover:border-[#A88548]/40 shadow-xs hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full text-left p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4 group transition-colors min-h-[52px]"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 min-w-0">
                      <span className={`text-xs sm:text-sm font-mono font-bold shrink-0 transition-colors duration-200 ${
                        isOpen ? 'text-[#7D5D2A]' : 'text-slate-400 group-hover:text-[#A88548]'
                      }`}>
                        {`0${idx + 1}`}
                      </span>
                      <span className={`font-bold text-xs sm:text-sm md:text-base leading-snug sm:leading-normal transition-colors duration-200 ${
                        isOpen ? 'text-[#7D5D2A]' : 'text-[#181B22] group-hover:text-[#A88548]'
                      }`}>
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-[#A88548]' : 'rotate-0 text-slate-400 group-hover:text-[#A88548]'
                    }`} />
                  </button>
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-8 sm:pl-10 md:pl-14">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. High-Converting Instant WhatsApp Hook */}
      <section className="py-16 bg-[#FAF9F6] text-[#1E232F] relative overflow-hidden border-t border-[#E7E2D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E232F]">
            Looking for something specific in Chennai?
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
            Send our senior property consultants your exact requirements (Location, BHK, Budget). We will send curated brochures and verified unit options directly to your WhatsApp in 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <a
              href={`https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent("Hello Property Gateway,\n\nI am looking for verified property options in Chennai matching my requirements. Please share suitable project brochures and details. Thank you!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
            >
              <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-5 h-5 object-contain" />
              <span>Send Requirements on WhatsApp</span>
            </a>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#1E232F] hover:text-[#A88548] font-bold text-sm border border-[#E7E2D8] flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#A88548]" />
              <span>Call: {BRAND.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
