import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { CHENNAI_LOCATIONS, PROPERTY_TYPES, BUDGET_RANGES } from '../../utils/constants';

export default function HeroSection() {
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
    <section className="relative bg-brand-navy-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Subtle Architectural Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
      />

      {/* Decorative Glow restricted to Navy/Emerald */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-900 border border-brand-navy-800 text-xs font-medium text-brand-emerald-400 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-emerald-400" />
          <span>TNRERA Registered Advisory • Zero Brokerage on New Launches</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Find Your Ideal Home in <span className="text-brand-emerald-400">Chennai</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Verified residential apartments, coastal villas, and prime commercial plots across Chennai's premier corridors. Direct builder pricing with 100% legal title clearance.
          </p>
        </div>

        {/* Floating Multi-Filter Search Bar */}
        <div className="mt-10 max-w-5xl">
          <form 
            onSubmit={handleSearch}
            className="bg-white p-3 sm:p-4 rounded-2xl md:rounded-full shadow-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center text-slate-800"
          >
            {/* Location Selector */}
            <div className="flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
              <MapPin className="w-5 h-5 text-brand-emerald-600 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {CHENNAI_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="text-slate-900">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Type Selector */}
            <div className="flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 md:border-r border-slate-200">
              <Home className="w-5 h-5 text-brand-emerald-600 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Property Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type} className="text-slate-900">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Range Selector */}
            <div className="flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 sm:border-r md:border-r-0 border-slate-200">
              <IndianRupee className="w-5 h-5 text-brand-emerald-600 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Budget
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b.label} value={b.label} className="text-slate-900">
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
                className="w-full py-3.5 px-6 rounded-xl md:rounded-full bg-brand-emerald-600 hover:bg-brand-emerald-700 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Micro-Market Links */}
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="text-slate-400 font-medium">Popular Hotspots:</span>
          {['East Coast Road (ECR)', 'Old Mahabalipuram Road (OMR)', 'Anna Nagar', 'Porur', 'Guindy'].map((area) => (
            <button
              key={area}
              onClick={() => {
                setSelectedLocation(area);
                navigate(`/properties?location=${encodeURIComponent(area)}`);
              }}
              className="px-3 py-1 rounded-full bg-brand-navy-900/80 hover:bg-brand-navy-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
