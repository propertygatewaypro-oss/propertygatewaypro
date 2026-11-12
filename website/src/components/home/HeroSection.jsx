import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Home, 
  Building2, 
  X, 
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { CHENNAI_LOCATIONS, BRAND } from '../../utils/constants';

// Curated Architectural Photographs: Daylight Luxury Estates in Chennai
const HERO_SLIDES = [
  {
    webp: '/images/hero/hero-architectural-travertine.jpg',
    mobileWebp: '/images/hero/hero-architectural-travertine-mobile.jpg',
    jpg: '/images/hero/hero-architectural-travertine.jpg',
    alt: 'Executive Architectural Travertine Villa in Chennai bathed in warm natural daylight',
    label: 'Travertine Residence'
  },
  {
    webp: '/images/hero/hero-architectural-villa.jpg',
    mobileWebp: '/images/hero/hero-architectural-villa-mobile.jpg',
    jpg: '/images/hero/hero-architectural-villa.jpg',
    alt: 'Contemporary Luxury Villa in Chennai with Lap Pool and Tropical Palms',
    label: 'Coastal Luxury Villa'
  },
  {
    webp: '/images/hero/hero-architectural-penthouse.jpg',
    mobileWebp: '/images/hero/hero-architectural-penthouse-mobile.jpg',
    jpg: '/images/hero/hero-architectural-penthouse.jpg',
    alt: 'Ultra-Luxury High-Rise Penthouse Terrace overlooking Chennai Coastline',
    label: 'Penthouse Terrace'
  },
  {
    webp: '/images/hero/hero-architectural-interior.jpg',
    mobileWebp: '/images/hero/hero-architectural-interior-mobile.jpg',
    jpg: '/images/hero/hero-architectural-interior.jpg',
    alt: 'Sun-drenched Double-Height Travertine Living Pavilion with Garden Atrium',
    label: 'Curated Pavilion'
  }
];

// Search Category Tabs (PropLeaf Inspired)
const SEARCH_TABS = [
  { id: 'all', label: 'All Projects', category: null },
  { id: 'villa', label: 'Luxury Villas', category: 'Luxury Villa' },
  { id: 'plots', label: 'Plots & Land', category: 'Plot / Land' },
];

// Quick Category & Status Filters
const QUICK_FILTERS = [
  { label: 'Apartment', type: 'category', value: 'Apartment', icon: Building2 },
  { label: 'Villa', type: 'category', value: 'Luxury Villa', icon: Home },
  { label: 'Plots', type: 'category', value: 'Plot / Land', icon: MapPin },
  { label: 'New Launch', type: 'status', value: 'New Launch', isLive: true },
  { label: 'Ready to Move', type: 'status', value: 'Ready to Move', icon: CheckCircle2 },
];



export default function HeroSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slideshow crossfade
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    if (tab.category) {
      const params = new URLSearchParams();
      if (selectedLocation && selectedLocation !== 'All Locations') {
        params.set('location', selectedLocation);
      }
      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }
      params.set('category', tab.category);
      navigate(`/properties?${params.toString()}`);
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocation && selectedLocation !== 'All Locations') {
      params.set('location', selectedLocation);
    }
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    const currentTabObj = SEARCH_TABS.find(t => t.id === activeTab);
    if (currentTabObj?.category) {
      params.set('category', currentTabObj.category);
    }
    navigate(`/properties?${params.toString()}`);
  };

  const handlePillClick = (filter) => {
    const params = new URLSearchParams();
    if (selectedLocation && selectedLocation !== 'All Locations') {
      params.set('location', selectedLocation);
    }
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    if (filter.type === 'category') {
      params.set('category', filter.value);
    } else if (filter.type === 'status') {
      params.set('status', filter.value);
    }
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section 
      className="relative w-full bg-[#FAF9F6] text-[#181B22] border-b border-[#E7E2D8] flex flex-col justify-center overflow-hidden"
      aria-label="Property Gateway Homepage Hero"
    >
      {/* 1. Background Slideshow with subtle Ken Burns drift */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#FAF9F6]" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.webp}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <picture>
                <source 
                  media="(max-width: 767px)" 
                  srcSet={slide.mobileWebp || slide.jpg} 
                />
                <source 
                  media="(min-width: 768px)" 
                  srcSet={slide.webp || slide.jpg} 
                />
                <img
                  src={slide.jpg}
                  alt={slide.alt}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className={`w-full h-full object-cover object-center select-none ${
                    isActive ? 'animate-ken-burns' : ''
                  }`}
                />
              </picture>
            </div>
          );
        })}

        {/* Luminous Daylight Pearl Editorial Scrim (Zero Dark Theme) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/95 to-[#FAF9F6]/35 sm:to-transparent/20 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#FAF9F6] via-transparent to-white/40 pointer-events-none" />
      </div>

      {/* 2. Hero Content Container (Compact 100% First-View Profile) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 w-full flex flex-col justify-center">
        
        {/* Top Header with Headline */}
        <div className="max-w-2xl animate-hero-fade-up mb-5 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-[#181B22] leading-[1.14]">
            No Brokerage.<span className="text-[#A88548]">*</span> <br className="hidden sm:inline" />
            <span className="text-[#181B22]">Verified Chennai Properties.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-sans mt-2 sm:mt-2.5 max-w-xl leading-relaxed">
            Find your perfect home with direct developer pricing across prime corridors.
          </p>
        </div>

        {/* 3. Search Engine Hub (Tabs + Search Bar + Filter Pills) */}
        <div className="w-full max-w-[1050px] animate-hero-fade-up relative z-30" style={{ animationDelay: '100ms' }}>
          
          {/* Tabs Above Search (Inspired by PropLeaf) */}
          <div className="flex items-center gap-2 mb-2">
            {SEARCH_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#181B22] text-white shadow-xs'
                      : 'bg-white/95 hover:bg-white text-slate-700 hover:text-[#181B22] border border-[#E7E2D8]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* The Integrated Horizontal Search Box */}
          <form 
            onSubmit={handleSearch}
            className="bg-white rounded-xl sm:rounded-2xl border-2 border-[#E7E2D8] shadow-[0_15px_35px_rgba(20,25,35,0.08)] flex flex-col sm:flex-row items-stretch overflow-hidden transition-all hover:border-[#A88548] focus-within:border-[#A88548] focus-within:shadow-[0_15px_40px_rgba(168,133,72,0.16)]"
          >
            {/* Location Select (Stacked on mobile, Left segment on desktop) */}
            <div className="relative shrink-0 border-b sm:border-b-0 sm:border-r border-[#E7E2D8] flex items-center bg-[#FAF9F6] sm:bg-white px-3.5 sm:px-4 py-2.5 sm:py-0 min-w-0 sm:min-w-[150px] md:min-w-[170px]">
              <MapPin className="w-4 h-4 text-[#A88548] shrink-0 mr-2" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-1 sm:py-3.5 bg-transparent text-xs sm:text-sm font-bold text-[#1E232F] cursor-pointer appearance-none focus:outline-none pr-6"
                aria-label="Select Location"
              >
                <option value="All Locations">Chennai (All Locations)</option>
                {CHENNAI_LOCATIONS.filter(l => l !== 'All Locations').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Text Search Input (Fills center) */}
            <div className="flex-1 flex items-center min-w-0 px-3.5 sm:px-4 py-2.5 sm:py-0">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2 sm:hidden" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by: Project Name, Builder, Location..."
                className="w-full py-1 sm:py-3.5 text-xs sm:text-[14.5px] text-[#1E232F] placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors mr-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Submit Button - Full Height, Flush to Right Edge */}
            <button
              type="submit"
              className="bg-gold-metallic hover:opacity-95 active:scale-[0.98] text-white flex items-center justify-center gap-2 py-3 sm:py-0 px-5 sm:w-16 md:w-20 shrink-0 self-stretch transition-all cursor-pointer shadow-none"
              aria-label="Search Properties"
              title="Search Properties"
            >
              <Search className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2.5]" />
              <span className="sm:hidden text-xs font-bold uppercase tracking-wider">Search Properties</span>
            </button>
          </form>

          {/* Quick Filter Pills Row (Highlighting Core Property Types) */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 px-0.5 -mx-1 sm:mx-0">
            <span className="text-[11px] font-mono font-bold uppercase text-slate-400 hidden sm:inline mr-1 shrink-0">
              Popular:
            </span>
            {QUICK_FILTERS.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => handlePillClick(pill)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-[#181B22] border border-[#E7E2D8] hover:border-[#A88548] transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-2xs shrink-0"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#A88548]" />}
                  {pill.isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A88548] animate-pulse shrink-0" />
                  )}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

