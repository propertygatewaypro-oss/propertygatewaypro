import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, Sparkles, ArrowRight, Car, ShieldCheck } from 'lucide-react';
import { CHENNAI_LOCATIONS, PROPERTY_TYPES, BUDGET_RANGES, BRAND } from '../../utils/constants';

export default function HeroSection({ onOpenVisitModal }) {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('All Types');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocation !== 'All Locations') params.set('location', selectedLocation);
    if (selectedCategory !== 'All Types') params.set('category', selectedCategory);
    if (selectedBudget !== 'Any Budget') params.set('budget', selectedBudget);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center bg-[#0F1117] text-white overflow-hidden">
      {/* 1. Background Villa Twilight Image on the Right */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-villa.jpg"
          alt="Luxury Architectural Villa in Chennai"
          className="w-full h-full object-cover object-right md:object-center"
        />
        {/* Cinematic Gradient Overlays: Deep Obsidian on Left, Feathered to Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C10] via-[#0F1117]/90 to-transparent lg:via-[#0F1117]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-[#0A0C10]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D26]/90 border border-[#2E3342] text-xs font-medium text-brand-bronze-400 mb-6 backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-4 h-4 text-brand-bronze-400" />
          <span>TNRERA Reg: {BRAND.reraId} • 0% Brokerage on Builder Launches</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-2xl lg:max-w-3xl space-y-5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.12]">
            Architectural Villas & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-bronze-300 via-brand-bronze-400 to-amber-200">
              Luxury Estates in Chennai
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            Vetted sea-facing villas along ECR, high-rises on OMR, and heritage residences in Anna Nagar. Direct developer pricing with comprehensive 30-year legal title verification.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenVisitModal?.()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-bronze-600 hover:bg-brand-bronze-700 text-white font-semibold text-sm transition-all shadow-bronze-glow active:scale-[0.98]"
            >
              <Car className="w-4 h-4" />
              <span>Book Free Cab Site Visit</span>
            </button>
            <a
              href="#search-bar"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-medium text-sm border border-white/15 backdrop-blur-md transition-colors"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Floating Dark Obsidian Multi-Filter Search Bar */}
        <div id="search-bar" className="mt-12 lg:mt-16 max-w-5xl">
          <form 
            onSubmit={handleSearch}
            className="bg-[#141720]/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-700/80 shadow-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center text-slate-200"
          >
            {/* Location Selector */}
            <div className="flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-800">
              <MapPin className="w-5 h-5 text-brand-bronze-400 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                  Micro-Market
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {CHENNAI_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#141720] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Type Selector */}
            <div className="flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 md:border-r border-slate-800">
              <Home className="w-5 h-5 text-brand-bronze-400 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                  Property Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#141720] text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Range Selector */}
            <div className="flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r md:border-r-0 border-slate-800">
              <IndianRupee className="w-5 h-5 text-brand-bronze-400 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                  Investment Range
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b.label} value={b.label} className="bg-[#141720] text-white">
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="px-1">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-brand-bronze-600 hover:bg-brand-bronze-700 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-bronze-glow transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Micro-Market Links */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="text-slate-400 font-medium">Prime Hotspots:</span>
          {['East Coast Road (ECR)', 'Old Mahabalipuram Road (OMR)', 'Anna Nagar', 'Porur', 'Guindy'].map((area) => (
            <button
              key={area}
              onClick={() => {
                setSelectedLocation(area);
                navigate(`/properties?location=${encodeURIComponent(area)}`);
              }}
              className="px-3 py-1 rounded-full bg-[#1B1E28]/80 hover:bg-brand-bronze-600/20 text-slate-300 hover:text-brand-bronze-300 border border-slate-800 hover:border-brand-bronze-500/40 transition-colors"
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
