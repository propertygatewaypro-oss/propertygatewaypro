import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Home, 
  IndianRupee, 
  ArrowRight, 
  ChevronDown, 
  Calendar,
  Check,
  Phone
} from 'lucide-react';
import { CHENNAI_LOCATIONS, PROPERTY_TYPES, BUDGET_RANGES } from '../../utils/constants';

// Curated Architectural Photographs with crossfade (Desktop 16:9 + Mobile 9:16)
const HERO_SLIDES = [
  {
    webp: '/images/hero/hero-villa.webp',
    mobileWebp: '/images/hero/hero-villa-mobile.webp',
    jpg: '/images/hero/hero-villa.webp',
    alt: 'Contemporary Luxury Independent Villa in Chennai with warm interior lighting',
    label: 'Luxury Villas'
  },
  {
    webp: '/images/hero/hero-interior.webp',
    mobileWebp: '/images/hero/hero-interior-mobile.webp',
    jpg: '/images/hero/hero-interior.webp',
    alt: 'Spacious Luxury Living Room and Curated Interior in Chennai',
    label: 'Curated Interiors'
  },
  {
    webp: '/images/hero/hero-apartments.webp',
    mobileWebp: '/images/hero/hero-apartments-mobile.webp',
    jpg: '/images/hero/hero-apartments.webp',
    alt: 'Modern Luxury Residential Community in Chennai',
    label: 'Luxury Apartments'
  }
];

// Popular Chennai Location Shortcuts
const POPULAR_LOCATIONS = [
  { label: 'ECR', fullName: 'East Coast Road (ECR)' },
  { label: 'OMR', fullName: 'Old Mahabalipuram Road (OMR)' },
  { label: 'Anna Nagar', fullName: 'Anna Nagar' },
  { label: 'Porur', fullName: 'Porur' },
  { label: 'Guindy', fullName: 'Guindy' }
];

// Custom Obsidian Gold Luxury Dropdown Component
function CustomSearchDropdown({
  label,
  icon: Icon,
  value,
  options,
  onChange,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isTwoColumn = options.length > 6;

  return (
    <div ref={dropdownRef} className={`relative ${isOpen ? 'z-50' : 'z-10'} ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center gap-3 focus:outline-none cursor-pointer group py-1"
      >
        {Icon && <Icon className="w-5 h-5 text-[#C98A4B] shrink-0" />}
        <div className="w-full min-w-0 pr-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C98A4B] mb-0.5 leading-none cursor-pointer">
            {label}
          </label>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[14.5px] sm:text-[15px] font-semibold text-white truncate block">
              {value}
            </span>
            <ChevronDown 
              className={`w-3.5 h-3.5 text-slate-300 group-hover:text-[#C98A4B] transition-transform duration-200 shrink-0 ${
                isOpen ? 'rotate-180 text-[#C98A4B]' : ''
              }`} 
            />
          </div>
        </div>
      </button>

      {/* Luxury Obsidian Popover Menu */}
      {isOpen && (
        <div className={`absolute top-full left-0 mt-2.5 ${
          isTwoColumn ? 'w-[320px] sm:w-[490px]' : 'w-64 sm:w-72'
        } bg-[#0F1117] rounded-2xl border border-[#C98A4B]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}>
          {/* Subtle Popover Title */}
          <div className="px-3 py-1 mb-1.5 border-b border-white/[0.08] flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#C98A4B]">
              Select {label}
            </span>
            <span className="text-[10px] text-slate-400">
              {options.length} Options
            </span>
          </div>

          <div className={isTwoColumn ? "grid grid-cols-1 sm:grid-cols-2 gap-1.5" : "space-y-1"}>
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#C98A4B]/20 text-[#C98A4B] font-semibold border border-[#C98A4B]/30'
                      : 'text-[#F1EEE7] hover:bg-white/[0.08] hover:text-[#C98A4B]'
                  }`}
                >
                  <span className="leading-snug pr-1 whitespace-nowrap">{opt}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C98A4B] shrink-0 ml-1.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroSection({ onOpenVisitModal }) {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('All Types');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget');
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
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocation !== 'All Locations') params.set('location', selectedLocation);
    if (selectedCategory !== 'All Types') params.set('category', selectedCategory);
    if (selectedBudget !== 'Any Budget') params.set('budget', selectedBudget);

    navigate(`/properties?${params.toString()}`);
  };

  const handleLocationChipClick = (locFullName) => {
    setSelectedLocation(locFullName);
    navigate(`/properties?location=${encodeURIComponent(locFullName)}`);
  };

  return (
    <section 
      className="relative w-full bg-[#07090E] text-white border-b border-[#232733] min-h-[780px] lg:min-h-[820px] xl:min-h-[850px] flex flex-col justify-between"
      aria-label="Property Gateway Homepage Hero"
    >
      {/* 1. Background Slideshow with subtle Ken Burns drift */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#07090E]" aria-hidden="true">
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
                {/* Mobile Viewport: Dedicated 9:16 Portrait Photograph */}
                <source 
                  media="(max-width: 767px)" 
                  srcSet={slide.mobileWebp} 
                  type="image/webp" 
                />
                {/* Desktop Viewport: 16:9 Landscape Photograph */}
                <source 
                  media="(min-width: 768px)" 
                  srcSet={slide.webp} 
                  type="image/webp" 
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

        {/* Sophisticated Dark Vignette Gradient Overlays */}
        {/* Left deep obsidian overlay for sharp text contrast; smoothly feathered to right */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#07090E] via-[#07090E]/95 via-45% to-transparent lg:via-[#07090E]/90 lg:via-52%" />
        {/* Bottom subtle grounding vignette for lawn & search panel */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#07090E]/90 via-[#07090E]/20 to-transparent" />
        {/* Top subtle shading under navbar */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#07090E]/60 via-transparent to-transparent h-20" />
      </div>

      {/* 2. Main Hero Content Container (Left-aligned, max-w-7xl) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 flex flex-col justify-between h-full">
        
        {/* Top Content Block */}
        <div className="flex flex-col items-start max-w-[760px] w-full text-left">
          
          {/* Main Headline (Exact Display Serif with Animated Curved Underline under Chennai) */}
          <h1 
            className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[68px] font-serif font-bold text-white tracking-tight leading-[1.08] animate-hero-fade-up"
            style={{ animationDelay: '40ms' }}
          >
            Discover Exceptional <br />
            Properties in{' '}
            <span className="relative inline-block text-[#C98A4B]">
              Chennai
              {/* Golden Graceful Curved Underline Stroke - Animated SVG Draw */}
              <svg 
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-2.5 sm:h-3 text-[#C98A4B] overflow-visible pointer-events-none" 
                viewBox="0 0 200 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  className="animate-stroke-draw"
                  d="M2 9.5C55 2.5 145 2.5 198 9.5" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />
              </svg>
            </span>
          </h1>

          {/* Supporting Description */}
          <div 
            className="mt-4 sm:mt-5 max-w-[560px] animate-hero-fade-up"
            style={{ animationDelay: '140ms' }}
          >
            <p className="text-[15px] sm:text-[16.5px] text-slate-200/90 font-normal leading-[1.6]">
              Explore handpicked homes, premium villas and investment opportunities across Chennai with trusted real-estate guidance.
            </p>
          </div>

          {/* Two Action Buttons (Exact Rounded-2xl Style with subtle micro-interaction) */}
          <div 
            className="flex flex-wrap items-center gap-4 mt-7 sm:mt-8 animate-hero-fade-up"
            style={{ animationDelay: '220ms' }}
          >
            <Link
              to="/properties"
              className="h-[50px] px-8 rounded-2xl bg-[#C98A4B] hover:bg-[#b87a3d] text-[#0F1117] font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-[#C98A4B]/20 active:scale-[0.98] inline-flex items-center gap-2.5 shrink-0 cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="h-[50px] px-8 rounded-2xl bg-[#0B0D13]/60 hover:bg-white/[0.08] text-white border border-[#C98A4B]/80 hover:border-[#C98A4B] font-semibold text-sm tracking-wide transition-all active:scale-[0.98] cursor-pointer inline-flex items-center gap-2.5 backdrop-blur-md shrink-0"
            >
              <Phone className="w-4 h-4 text-[#C98A4B]" />
              <span>Contact an Advisor</span>
            </Link>
          </div>
        </div>

        {/* Bottom Hero Block (Floating Search Bar + Popular Locations) */}
        <div className="w-full mt-10 lg:mt-14">
          
          {/* Floating Luxury Search Panel (3 Columns + Search Properties Button) */}
          <div 
            className="w-full max-w-[1100px] animate-hero-fade-up relative z-30"
            style={{ animationDelay: '300ms' }}
          >
            <form 
              onSubmit={handleSearch}
              className="bg-[#0E131F]/92 backdrop-blur-md rounded-2xl sm:rounded-[24px] border border-[#C98A4B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.65)] p-2.5 sm:p-3 flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-white/10 min-h-[74px] transition-all hover:border-[#C98A4B]/70 relative z-30"
            >
              {/* Field 1: LOCATION */}
              <div className="flex-1 w-full px-3.5 sm:px-4 py-2 flex items-center">
                <CustomSearchDropdown
                  label="LOCATION"
                  icon={MapPin}
                  value={selectedLocation}
                  options={CHENNAI_LOCATIONS}
                  onChange={(loc) => setSelectedLocation(loc)}
                  className="w-full"
                />
              </div>

              {/* Field 2: PROPERTY TYPE */}
              <div className="flex-1 w-full px-3.5 sm:px-4 py-2 flex items-center">
                <CustomSearchDropdown
                  label="PROPERTY TYPE"
                  icon={Home}
                  value={selectedCategory}
                  options={PROPERTY_TYPES}
                  onChange={(cat) => setSelectedCategory(cat)}
                  className="w-full"
                />
              </div>

              {/* Field 3: BUDGET */}
              <div className="flex-1 w-full px-3.5 sm:px-4 py-2 flex items-center">
                <CustomSearchDropdown
                  label="BUDGET"
                  icon={IndianRupee}
                  value={selectedBudget}
                  options={BUDGET_RANGES.map((b) => b.label)}
                  onChange={(b) => setSelectedBudget(b)}
                  className="w-full"
                />
              </div>

              {/* Field 4: Search Properties Button */}
              <div className="w-full md:w-auto p-1.5 shrink-0">
                <button
                  type="submit"
                  className="w-full md:w-auto h-[50px] sm:h-[52px] px-8 rounded-xl sm:rounded-2xl bg-[#C98A4B] hover:bg-[#b87a3d] active:scale-[0.98] text-[#0F1117] font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer hover:shadow-[#C98A4B]/20"
                >
                  <Search className="w-4 h-4 text-[#0F1117]" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>

          {/* Popular Locations Row */}
          <div 
            className="mt-4 sm:mt-5 flex items-center animate-hero-fade-up relative z-10"
            style={{ animationDelay: '380ms' }}
          >
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 text-xs text-slate-300 overflow-x-auto no-scrollbar pb-0.5">
              <span className="text-[#C98A4B] font-semibold text-sm shrink-0">
                Popular Locations:
              </span>
              {POPULAR_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc.fullName;
                return (
                  <button
                    key={loc.label}
                    type="button"
                    onClick={() => handleLocationChipClick(loc.fullName)}
                    className={`h-[30px] px-4 rounded-full text-xs font-medium border transition-all cursor-pointer shrink-0 inline-flex items-center active:scale-95 ${
                      isSelected
                        ? 'bg-[#C98A4B]/25 text-[#C98A4B] border-[#C98A4B]'
                        : 'bg-black/40 text-white border-white/20 hover:border-[#C98A4B] hover:text-[#C98A4B]'
                    }`}
                  >
                    {loc.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
