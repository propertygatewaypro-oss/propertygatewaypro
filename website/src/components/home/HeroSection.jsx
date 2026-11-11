import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Home, 
  Building2,
  X,
  ChevronDown, 
  ShieldCheck 
} from 'lucide-react';
import { CHENNAI_LOCATIONS, BRAND } from '../../utils/constants';

// Option 3 Curated Architectural Photographs: Daylight Luxury Estates in Chennai
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

// Quick Category & Status Filters (Directly beneath search bar, highlighting Apartment and Villa)
const QUICK_FILTERS = [
  { label: 'Apartment', type: 'category', value: 'Apartment', isFlagship: true },
  { label: 'Villa', type: 'category', value: 'Luxury Villa', isFlagship: true },
  { label: 'Plots', type: 'category', value: 'Plot / Land', isFlagship: false },
  { label: 'Up Coming', type: 'status', value: 'New Launch', isFlagship: false },
  { label: 'New Launch', type: 'status', value: 'New Launch', isFlagship: false },
  { label: 'Under Construction', type: 'status', value: 'Under Construction', isFlagship: false },
  { label: 'Ready to move', type: 'status', value: 'Ready to Move', isFlagship: false },
];

export default function HeroSection() {
  const navigate = useNavigate();
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

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocation && selectedLocation !== 'All Locations') {
      params.set('location', selectedLocation);
    }
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
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
      className="relative w-full bg-[#FAF9F6] text-[#1E232F] border-b border-[#E7E2D8] flex flex-col justify-center"
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
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
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

        {/* Daylight Pearl Editorial Fog: subtle gradient preserving full clarity of luxury architectural photos */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[#FAF9F6]/25 pointer-events-none" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16 w-full flex flex-col justify-center">
        
        <div className="max-w-4xl space-y-4 sm:space-y-6">
          
          {/* Trust Authority Badge in Daylight Pearl & Gold */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E7E2D8] text-[11px] sm:text-xs text-[#8C6239] font-medium shadow-xs animate-hero-fade-up">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A88548] shrink-0" />
            <span>TN RERA Registered ({BRAND.reraId}) | 0% Brokerage on Builder Launches</span>
          </div>

          {/* Headline in High-Contrast Slate Typography */}
          <div className="space-y-1.5 sm:space-y-2 animate-hero-fade-up" style={{ animationDelay: '100ms' }}>
            <span className="text-[12px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#7D5D2A] uppercase block">
              Curated Chennai Real Estate Advisory
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-[#1E232F] leading-[1.12]">
              Find Your Ideal Home in Chennai. <br className="hidden sm:inline" />
              <span className="text-gold-metallic italic font-serif font-bold">Direct Developer Pricing.</span>
            </h1>
          </div>

          {/* Value Proposition Subtitle */}
          <p 
            className="text-sm sm:text-base lg:text-lg text-slate-700 font-sans max-w-2xl leading-relaxed animate-hero-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            Verified RERA apartments, beachfront villas along ECR, and gated plotted communities. Zero buyer brokerage, guaranteed title scrutiny, and dedicated advisory.
          </p>

          {/* 3. Streamlined Responsive Search Bar (Inspiration Image 2) */}
          <div 
            className="w-full max-w-[1050px] animate-hero-fade-up relative z-30 pt-2"
            style={{ animationDelay: '300ms' }}
          >
            {/* The Integrated Horizontal Search Box (Responsive 2-tier on mobile, 1-row on desktop) */}
            <form 
              onSubmit={handleSearch}
              className="bg-white rounded-xl sm:rounded-2xl border-2 border-[#E7E2D8] shadow-[0_15px_35px_rgba(20,25,35,0.08)] flex flex-col sm:flex-row items-stretch overflow-hidden transition-all hover:border-[#A88548] focus-within:border-[#A88548] focus-within:shadow-[0_15px_40px_rgba(168,133,72,0.16)]"
            >
              {/* Location Select (Stacked on mobile, Left segment on desktop) */}
              <div className="relative shrink-0 border-b sm:border-b-0 sm:border-r border-[#E7E2D8] flex items-center bg-[#FAF9F6] sm:bg-white px-3 sm:px-4 py-2.5 sm:py-0 min-w-0 sm:min-w-[150px] md:min-w-[165px]">
                <MapPin className="w-4 h-4 text-[#A88548] shrink-0 mr-2" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full py-1 sm:py-4 bg-transparent text-xs sm:text-sm font-bold text-[#1E232F] cursor-pointer appearance-none focus:outline-none pr-6"
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
              <div className="flex-1 flex items-center min-w-0 px-3.5 sm:px-4 py-3 sm:py-0">
                <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2 sm:hidden" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by: Project Name/ Property Name/ Location"
                  className="w-full py-1 sm:py-4 text-xs sm:text-[14.5px] text-[#1E232F] placeholder:text-slate-400 bg-transparent focus:outline-none"
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

              {/* Search Submit Button - 100% Full Height, Flush to Right Edge, Zero White Margins */}
              <button
                type="submit"
                className="bg-gold-metallic hover:opacity-95 active:scale-[0.98] text-white flex items-center justify-center gap-2 py-3.5 sm:py-0 px-5 sm:w-16 md:w-20 shrink-0 self-stretch transition-all cursor-pointer shadow-none"
                aria-label="Search Properties"
                title="Search Properties"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
                <span className="sm:hidden text-xs font-bold uppercase tracking-wider">Search Properties</span>
              </button>
            </form>

            {/* Quick Filter Pills Row (Highlighting Apartment and Villa) */}
            <div className="mt-3 sm:mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 -mx-1 sm:mx-0">
              {QUICK_FILTERS.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => handlePillClick(pill)}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-xs shrink-0 ${
                    pill.isFlagship
                      ? 'bg-white hover:bg-amber-50/80 text-[#7D5D2A] font-bold border-2 border-[#A88548] shadow-sm hover:shadow-md ring-2 ring-[#A88548]/15'
                      : 'bg-white hover:bg-slate-50 text-[#1E232F] font-semibold border border-[#E7E2D8] hover:border-[#A88548]'
                  }`}
                >
                  {pill.label === 'Apartment' && <Building2 className="w-3.5 h-3.5 text-[#A88548]" />}
                  {pill.label === 'Villa' && <Home className="w-3.5 h-3.5 text-[#A88548]" />}
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
