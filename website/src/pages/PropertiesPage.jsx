import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, Search, RotateCcw, MapPin } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import { fetchProperties, subscribeProperties } from '../services/propertyService';
import { CHENNAI_LOCATIONS, PROPERTY_TYPES, BUDGET_RANGES, POSSESSION_STATUSES, BRAND } from '../utils/constants';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [location, setLocation] = useState(searchParams.get('location') || 'All Locations');
  const [category, setCategory] = useState(searchParams.get('category') || 'All Types');
  const [budgetLabel, setBudgetLabel] = useState(searchParams.get('budget') || 'Any Budget');
  const [status, setStatus] = useState(searchParams.get('status') || 'All Statuses');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('latest');
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if query params change
  useEffect(() => {
    if (searchParams.get('location')) setLocation(searchParams.get('location'));
    const cat = searchParams.get('category') || searchParams.get('type');
    if (cat) setCategory(cat);
    if (searchParams.get('budget')) setBudgetLabel(searchParams.get('budget'));
    if (searchParams.get('status')) setStatus(searchParams.get('status'));
    if (searchParams.get('search') !== null) setSearchQuery(searchParams.get('search'));
    else if (searchParams.get('q') !== null) setSearchQuery(searchParams.get('q'));
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const budgetObj = BUDGET_RANGES.find(b => b.label === budgetLabel) || BUDGET_RANGES[0];
    
    // Realtime subscription: updates automatically whenever admin changes property data or status
    const unsubscribe = subscribeProperties((liveResults) => {
      setProperties(liveResults);
      setLoading(false);
    }, {
      search: searchQuery,
      location,
      category,
      budgetMin: budgetObj.min,
      budgetMax: budgetObj.max,
      status,
      sortBy,
      pageSize: 24
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [searchQuery, location, category, budgetLabel, status, sortBy]);

  const handleReset = () => {
    setLocation('All Locations');
    setCategory('All Types');
    setBudgetLabel('Any Budget');
    setStatus('All Statuses');
    setSortBy('latest');
    setSearchParams({});
  };

  const hasActiveFilters = location !== 'All Locations' || category !== 'All Types' || budgetLabel !== 'Any Budget' || status !== 'All Statuses';

  return (
    <div className="bg-brand-canvas-base min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald-700 bg-brand-emerald-50 px-3 py-1 rounded-full border border-brand-emerald-100">
            Chennai Real Estate Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 tracking-tight mt-2">
            Verified Properties for Sale & Rent
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse RERA-approved apartments, sea-facing villas, residential plots, and grade-A offices in Chennai.
          </p>
        </div>

        {/* Filter Bar & Controls Header */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-navy-900 text-white text-xs font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-emerald-400" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            {/* Desktop Quick Selectors */}
            <div className="hidden md:flex items-center gap-2">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-emerald-600"
              >
                {CHENNAI_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-emerald-600"
              >
                {PROPERTY_TYPES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select
                value={budgetLabel}
                onChange={(e) => setBudgetLabel(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-emerald-600"
              >
                {BUDGET_RANGES.map(b => <option key={b.label} value={b.label}>{b.label}</option>)}
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-emerald-600"
              >
                {POSSESSION_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-slate-600">
            <span className="font-medium text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="latest">Latest Properties</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
            Showing <span className="text-brand-navy-950 font-extrabold">{properties.length}</span> Verified Properties
          </p>
        </div>

        {/* Grid Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-xl mx-auto border border-slate-200 shadow-sm space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-brand-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy-950">
              No matching properties found
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We frequently receive off-market listings and new project launches in Chennai that aren't public yet. Send us your requirements directly!
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Clear All Filters
              </button>
              <a
                href={(() => {
                  const criteria = [];
                  if (location && location !== 'All Locations') criteria.push(`Location: ${location}`);
                  if (category && category !== 'All Types') criteria.push(`Type: ${category}`);
                  if (budgetLabel && budgetLabel !== 'Any Budget') criteria.push(`Budget: ${budgetLabel}`);

                  const criteriaText = criteria.length > 0 
                    ? ` matching:\n• ${criteria.join('\n• ')}` 
                    : '';

                  const text = `Hello Property Gateway,\n\nI am looking for verified properties in Chennai${criteriaText}.\n\nPlease share matching project brochures and available options. Thank you!`;
                  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(text)}`;
                })()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-4 h-4 object-contain" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Mobile Filters Slide-Up Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/60 backdrop-blur-sm md:hidden animate-fadeIn">
          <div className="bg-white rounded-t-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto animate-slideUp">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-brand-navy-950">Filter Properties</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-base"
                >
                  {CHENNAI_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Property Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-base"
                >
                  {PROPERTY_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Budget Range</label>
                <select
                  value={budgetLabel}
                  onChange={(e) => setBudgetLabel(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-base"
                >
                  {BUDGET_RANGES.map(b => <option key={b.label} value={b.label}>{b.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Possession Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-base"
                >
                  {POSSESSION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3.5 rounded-xl bg-brand-emerald-600 text-white text-sm font-bold shadow-md"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
