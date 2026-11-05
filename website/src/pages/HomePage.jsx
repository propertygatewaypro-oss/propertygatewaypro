import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building, Phone, MessageCircle } from 'lucide-react';
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
    : featuredProperties.filter(p => p.propertyType.toLowerCase().includes(activeTab.toLowerCase()));

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
            <span>Explore All 20+ Chennai Properties</span>
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

      {/* 6. High-Converting Instant WhatsApp Hook */}
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
