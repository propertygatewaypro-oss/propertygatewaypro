import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Home, 
  IndianRupee, 
  ArrowRight, 
  ChevronDown, 
  Check,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { CHENNAI_LOCATIONS, PROPERTY_TYPES, BUDGET_RANGES, BRAND } from '../../utils/constants';

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

// Popular Chennai Location Shortcuts
const POPULAR_LOCATIONS = [
  { label: 'ECR', fullName: 'East Coast Road (ECR)' },
  { label: 'OMR', fullName: 'Old Mahabalipuram Road (OMR)' },
  { label: 'Anna Nagar', fullName: 'Anna Nagar' },
  { label: 'Porur', fullName: 'Porur' },
  { label: 'Guindy', fullName: 'Guindy' }
];

// Executive Architectural Slate Luxury Dropdown Component
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
        {Icon && <Icon className="w-5 h-5 text-[#A88548] shrink-0" />}
        <div className="w-full min-w-0 pr-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C6239] mb-0.5 leading-none cursor-pointer">
            {label}
          </label>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[14.5px] sm:text-[15px] font-bold text-[#1E232F] truncate block">
              {value}
            </span>
            <ChevronDown 
              className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#A88548] transition-transform duration-200 shrink-0 ${
                isOpen ? 'rotate-180 text-[#A88548]' : ''
              }`} 
            />
          </div>
        </div>
      </button>

      {/* Daylight Ivory Popover Menu */}
      {isOpen && (
        <div className={`absolute top-full left-0 mt-2.5 ${
          isTwoColumn ? 'w-[320px] sm:w-[490px]' : 'w-64 sm:w-72'
        } bg-white rounded-2xl border border-[#E7E2D8] shadow-[0_25px_60px_rgba(20,25,35,0.18)] p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}>
          {/* Subtle Popover Title */}
          <div className="px-3 py-1 mb-1.5 border-b border-[#E7E2D8] flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8C6239]">
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
                      ? 'bg-[#A88548]/15 text-[#8C6239] font-bold border border-[#A88548]/30'
                      : 'text-[#2D3748] hover:bg-[#F7F5F0] hover:text-[#8C6239]'
                  }`}
                >
                  <span className="leading-snug pr-1 whitespace-nowrap">{opt}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#A88548] shrink-0 ml-1.5" />}
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
      </div>

      {/* 2. Main Hero Content Container (Left-aligned, max-w-7xl) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 flex flex-col justify-center">
        
        {/* Top Content Block */}
        <div className="flex flex-col items-start max-w-[760px] w-full text-left">
          
          {/* Top Trust Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#A88548]/50 text-xs text-[#8C6239] font-bold tracking-wide shadow-xs backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A88548] shrink-0" />
              <span>TN RERA Registered ({BRAND.reraId}) | 0% Brokerage on Builder Launches</span>
            </div>
          </div>

          {/* Main Headline (Executive Serif with Metallic Brushed Gold accent under Chennai) */}
          <h1 
            className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[68px] font-serif font-bold text-[#1E232F] tracking-tight leading-[1.08] animate-hero-fade-up"
            style={{ animationDelay: '40ms' }}
          >
            Discover Exceptional <br />
            Properties in{' '}
            <span className="relative inline-block text-gold-metallic font-serif">
              Chennai
              {/* Golden Graceful Curved Underline Stroke - Animated SVG Draw */}
              <svg 
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-2.5 sm:h-3 text-[#B8914B] overflow-visible pointer-events-none" 
                viewBox="0 0 200 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  className="animate-stroke-draw"
                  d="M2 9.5C55 2.5 145 2.5 198 9.5" 
                  stroke="currentColor" 
                  strokeWidth="3.5" 
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
            <p className="text-[15px] sm:text-[16.5px] text-[#3E4756] font-normal leading-[1.6]">
              Explore handpicked homes, premium villas and investment opportunities across Chennai with trusted real-estate guidance.
            </p>
          </div>

          {/* Two Action Buttons */}
          <div 
            className="flex flex-wrap items-center gap-4 mt-7 sm:mt-8 animate-hero-fade-up"
            style={{ animationDelay: '220ms' }}
          >
            <Link
              to="/properties"
              className="h-[50px] px-8 rounded-2xl bg-gold-metallic text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] inline-flex items-center gap-2.5 shrink-0 cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="h-[50px] px-8 rounded-2xl bg-white/95 hover:bg-white text-[#1E232F] border border-[#D5CEBF] hover:border-[#A88548] font-bold text-sm tracking-wide transition-all active:scale-[0.98] cursor-pointer inline-flex items-center gap-2.5 shadow-xs backdrop-blur-md shrink-0"
            >
              <Phone className="w-4 h-4 text-[#A88548]" />
              <span>Contact an Advisor</span>
            </Link>
          </div>
        </div>

        {/* Bottom Hero Block (Floating Search Bar + Popular Locations) */}
        <div className="w-full mt-10 lg:mt-14">
          
          {/* Floating Daylight Ivory Search Panel (3 Columns + Search Properties Button) */}
          <div 
            className="w-full max-w-[1100px] animate-hero-fade-up relative z-30"
            style={{ animationDelay: '300ms' }}
          >
            <form 
              onSubmit={handleSearch}
              className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-[24px] border border-[#E7E2D8] shadow-[0_20px_50px_rgba(20,25,35,0.12)] p-2.5 sm:p-3 flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-slate-200 min-h-[74px] transition-all hover:border-[#A88548]/60 relative z-30"
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

              {/* Field 4: Search Properties Button in Metallic Brushed Gold Gradient */}
              <div className="w-full md:w-auto p-1.5 shrink-0">
                <button
                  type="submit"
                  className="w-full md:w-auto h-[50px] sm:h-[52px] px-8 rounded-xl sm:rounded-2xl bg-gold-metallic active:scale-[0.98] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>

          {/* Popular Locations Row & Slideshow Controls */}
          <div 
            className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-hero-fade-up relative z-10"
            style={{ animationDelay: '380ms' }}
          >
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 text-xs text-slate-600 overflow-x-auto no-scrollbar pb-0.5">
              <span className="text-[#7D5D2A] font-bold text-sm shrink-0">
                Popular Locations:
              </span>
              {POPULAR_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc.fullName;
                return (
                  <button
                    key={loc.label}
                    type="button"
                    onClick={() => handleLocationChipClick(loc.fullName)}
                    className={`h-[30px] px-4 rounded-full text-xs font-semibold border transition-all cursor-pointer shrink-0 inline-flex items-center active:scale-95 ${
                      isSelected
                        ? 'bg-gold-metallic text-white border-transparent shadow-xs'
                        : 'bg-white/90 hover:bg-white text-[#2D3748] border-[#E2DBD0] hover:border-[#A88548] hover:text-[#7D5D2A] shadow-2xs'
                    }`}
                  >
                    {loc.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Slideshow Pagination Dots */}
            <div className="flex items-center gap-2 self-start sm:self-auto py-1 px-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E7E2D8] shadow-xs">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.label}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx 
                      ? 'w-7 bg-gold-metallic' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Show ${slide.label}`}
                  title={slide.label}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
