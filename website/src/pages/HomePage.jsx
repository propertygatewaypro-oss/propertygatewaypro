import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Building, 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Car, 
  CheckCircle2, 
  Quote 
} from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import PropertyCard from '../components/property/PropertyCard';
import WhyChooseUs from '../components/home/WhyChooseUs';
import EmiCalculator from '../components/home/EmiCalculator';
import { fetchProperties } from '../services/propertyService';
import { BRAND, BUILDER_PARTNERS } from '../utils/constants';

export default function HomePage({ onOpenVisitModal }) {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchProperties({ pageSize: 6 });
      setFeaturedProperties(data);
      setLoading(false);
    }
    loadData();
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
      q: "How does the Doorstep AC Cab Site Visit work?",
      a: "Once you shortlist properties, our team coordinates with you to schedule a sanitized private AC cab to pick you and your family up from your doorstep anywhere in Chennai, tour the selected sites with our property advisor, and drop you back safely. This service is 100% complimentary."
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

  const testimonials = [
    {
      quote: "Finding a 3 BHK near Tidel Park without paying hefty broker commissions was seamless. The private cab pickup made inspecting multiple projects on OMR with our parents completely stress-free.",
      author: "Anand & Meera Sundaram",
      location: "OMR IT Corridor Buyer",
      tag: "3 BHK High-Rise Residence"
    },
    {
      quote: "Parent document legal verification was our paramount condition. Property Gateway provided complete 30-year title documents and CMDA sanctions before collecting any booking token.",
      author: "Dr. S. Radhakrishnan",
      location: "Anna Nagar",
      tag: "Regal Crest Luxury Apartment"
    },
    {
      quote: "Secured our sea-facing villa along East Coast Road with transparent builder pricing and zero markup. Highly professional advisory team with deep Chennai market insights.",
      author: "Priya & Rajesh Narayanan",
      location: "East Coast Road (ECR)",
      tag: "The Sovereign Bay Villa"
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Section with Search Bar */}
      <HeroSection />

      {/* 2. Featured Projects Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald-700 bg-brand-emerald-50 px-3 py-1 rounded-full border border-brand-emerald-100">
              Handpicked Portfolios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 tracking-tight mt-2">
              Featured Chennai Properties
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Carefully vetted residential and commercial assets with verified RERA documentation.
            </p>
          </div>

          {/* Category Tabs Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto no-scrollbar">
            {['All', 'Apartment', 'Villa', 'Commercial'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white text-brand-navy-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'All' ? 'All Verified' : `${tab}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredList.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <p className="text-slate-600 text-sm">
              No properties found in this category right now.
            </p>
            <Link to="/properties" className="text-brand-emerald-700 font-semibold text-sm hover:underline">
              View all listings →
            </Link>
          </div>
        )}

        {/* View All Listings CTA */}
        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-800 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <span>Explore All Chennai Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. Partner Builders Ribbon */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Authorized Channel Partner for Chennai's Leading Developers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-75">
            {BUILDER_PARTNERS.map((builder, i) => (
              <div key={i} className="text-center">
                <span className="text-base font-extrabold text-brand-navy-950 tracking-tight block">
                  {builder.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  {builder.focus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Discerning Buyers Choose Us */}
      <WhyChooseUs onOpenVisitModal={onOpenVisitModal} />

      {/* 5. Interactive EMI Calculator */}
      <EmiCalculator />

      {/* 6. Authentic Homebuyer Case Studies & Reviews */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald-700 bg-brand-emerald-50 px-3 py-1 rounded-full border border-brand-emerald-100">
              Verified Client Journeys
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 tracking-tight mt-2">
              Trusted by Homebuyers Across Chennai
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Authentic feedback from families and investors who purchased through Property Gateway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-brand-emerald-600/30 mb-4" />
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-sm text-brand-navy-950">{t.author}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t.location}</div>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) Accordion */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald-700 bg-brand-emerald-50 px-3 py-1 rounded-full border border-brand-emerald-100">
              Clarity & Legal Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 tracking-tight mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Everything you need to know about our zero-brokerage advisory and site visit process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-brand-navy-950">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-1 text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. High-Converting Instant WhatsApp Hook */}
      <section className="py-16 bg-brand-navy-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6 fill-[#25D366]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Looking for something specific in Chennai?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Send our senior property consultants your exact requirements (Location, BHK, Budget). We will send curated brochures and verified unit options directly to your WhatsApp in 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <a
              href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20Property%20Gateway,%20I%20am%20looking%20for%20a%20property%20in%20Chennai.%20My%20budget%20is:`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send Requirements on WhatsApp</span>
            </a>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-800 text-white font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-brand-emerald-400" />
              <span>Call: {BRAND.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
