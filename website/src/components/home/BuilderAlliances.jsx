import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Builder logos tailored to match official brand identities (100% crisp vector/SVG)
const BUILDERS = [
  {
    id: 'akshaya',
    name: 'Akshaya',
    searchQuery: 'Akshaya',
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <div className="flex items-baseline font-extrabold text-xl sm:text-2xl tracking-tighter text-[#181B22]">
          <span>Aksh</span>
          <span className="text-[#E85D04]">a</span>
          <span>ya</span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-medium tracking-widest text-slate-500 lowercase mt-0.5">
          uncompromise.
        </span>
      </div>
    ),
  },
  {
    id: 'radiance',
    name: 'Radiance Realty',
    searchQuery: 'Radiance',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-orange-600 border-r-yellow-500 flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700">RADIANCE</span>
          <span className="text-base sm:text-lg font-serif font-bold text-[#181B22] -mt-0.5">Residencia</span>
          <span className="text-[8px] font-mono tracking-wider text-slate-400 uppercase">THAIYUR</span>
        </div>
      </div>
    ),
  },
  {
    id: 'adityaram',
    name: 'Adityaram Group',
    searchQuery: 'Adityaram',
    renderLogo: () => (
      <div className="bg-[#181B22] px-3.5 py-1.5 rounded-md flex flex-col items-center justify-center shadow-xs">
        <div className="flex items-center gap-0.5 text-amber-400 text-[10px]">
          <span>▲</span>
          <span>▲</span>
        </div>
        <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#E5C985] font-serif uppercase">
          ADITYARAM
        </span>
        <span className="text-[9px] font-bold tracking-[0.25em] text-white uppercase -mt-0.5">
          GROUP
        </span>
      </div>
    ),
  },
  {
    id: 'dac',
    name: 'DAC Developers',
    searchQuery: 'DAC',
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E40AF]">
          DAC
        </span>
        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-[#1E40AF]/80 uppercase mt-0.5">
          DEVELOPERS
        </span>
      </div>
    ),
  },
  {
    id: 'tvs',
    name: 'TVS Emerald',
    searchQuery: 'TVS',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-emerald-800 flex items-center justify-center text-white font-bold text-xs tracking-tighter">
          TVS
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-950 uppercase">
            TVS EMERALD
          </span>
          <span className="text-[8px] tracking-widest text-emerald-700 font-semibold uppercase mt-0.5">
            HOMES FOR LIFE
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'brigade',
    name: 'Brigade Group',
    searchQuery: 'Brigade',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-6 bg-red-700 rounded-xs" />
        <div className="flex flex-col leading-none">
          <span className="text-base sm:text-lg font-black tracking-wider text-[#181B22] uppercase font-serif">
            BRIGADE
          </span>
          <span className="text-[8px] tracking-widest text-slate-500 uppercase mt-0.5">
            Building Positive Spaces
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'urbanrise',
    name: 'Urbanrise',
    searchQuery: 'Urbanrise',
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-lg sm:text-xl font-black tracking-tight text-[#0284C7] uppercase">
          URBANRISE
        </span>
        <span className="text-[8px] font-medium tracking-widest text-slate-500 uppercase mt-0.5">
          South India's No. 1
        </span>
      </div>
    ),
  },
  {
    id: 'sobha',
    name: 'Sobha Limited',
    searchQuery: 'Sobha',
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-lg sm:text-xl font-serif font-extrabold tracking-widest text-[#B45309] uppercase">
          SOBHA
        </span>
        <span className="text-[8px] tracking-[0.2em] text-slate-500 uppercase mt-0.5">
          PASSION AT WORK
        </span>
      </div>
    ),
  },
  {
    id: 'casagrand',
    name: 'Casagrand',
    searchQuery: 'Casagrand',
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-base sm:text-lg font-black tracking-wider text-[#991B1B] uppercase">
          CASAGRAND
        </span>
        <span className="text-[8px] tracking-widest text-slate-500 uppercase mt-0.5">
          Building Aspirations
        </span>
      </div>
    ),
  },
  {
    id: 'prestige',
    name: 'Prestige Group',
    searchQuery: 'Prestige',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-[9px] font-serif font-bold">
          P
        </div>
        <span className="text-base sm:text-lg font-serif font-bold tracking-wider text-[#1E3A8A] uppercase">
          PRESTIGE
        </span>
      </div>
    ),
  },
];

export default function BuilderAlliances() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef(null);

  // Tripled list for infinite bidirectional continuous looping
  const loopBuilders = [...BUILDERS, ...BUILDERS, ...BUILDERS];

  // Initialize scroll position in middle set to allow seamless scrolling in both directions
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Small delay to ensure layout rendered
    const timer = setTimeout(() => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth > 0 && container.scrollLeft === 0) {
        container.scrollLeft = singleSetWidth;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Smooth automatic right-to-left RAF continuous glide
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId;
    let lastTimestamp = performance.now();

    const glide = (now) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      if (!isPaused && container) {
        // Smooth ~40px per second across any screen refresh rate
        const step = (40 * delta) / 1000;
        container.scrollLeft += step;

        const singleSetWidth = container.scrollWidth / 3;
        if (singleSetWidth > 0) {
          // Seamless infinite wrap when reaching the 2nd boundary
          if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft -= singleSetWidth;
          } else if (container.scrollLeft <= 5) {
            container.scrollLeft += singleSetWidth;
          }
        }
      }

      animId = requestAnimationFrame(glide);
    };

    animId = requestAnimationFrame(glide);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused]);

  // Arrow button click handler with automatic position wrapping & pause
  const handleArrowClick = useCallback((direction) => {
    const container = scrollRef.current;
    if (!container) return;

    // Pause auto-sliding briefly so user can inspect their clicked card
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);

    // Calculate step: 1 card width + gap
    const card = container.querySelector('[data-builder-card]');
    const gap = 16;
    const stepSize = card ? card.offsetWidth + gap : 260;

    const singleSetWidth = container.scrollWidth / 3;

    // If near edges, adjust before scroll to maintain infinite continuity
    if (direction === 'left' && container.scrollLeft <= singleSetWidth * 0.5) {
      container.scrollLeft += singleSetWidth;
    } else if (direction === 'right' && container.scrollLeft >= singleSetWidth * 2.2) {
      container.scrollLeft -= singleSetWidth;
    }

    container.scrollBy({
      left: direction === 'left' ? -stepSize : stepSize,
      behavior: 'smooth',
    });
  }, []);

  const handleCardClick = (searchQuery) => {
    navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative w-full bg-[#FAF9F6] border-b border-[#E6E1D6] py-8 sm:py-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Exact match to client reference */}
        <div className="text-center mb-5 sm:mb-7">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#181B22]">
            Our <span className="text-gold-metallic">Builder Alliances</span>
          </h2>
        </div>

        {/* Carousel Row with Circular Gold Arrow Controls */}
        <div 
          className="relative flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 2000);
          }}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleArrowClick('left')}
            className="absolute left-0 sm:-left-2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold-metallic text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous builder alliance"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
          </button>

          {/* Continuous Infinite Scrolling Track */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-scroll no-scrollbar py-2 px-8 sm:px-10"
            style={{ scrollBehavior: 'auto' }}
          >
            <div className="flex items-center gap-3 sm:gap-4 w-max">
              {loopBuilders.map((builder, idx) => (
                <div
                  key={`${builder.id}-${idx}`}
                  data-builder-card="true"
                  onClick={() => handleCardClick(builder.searchQuery)}
                  /*
                    Responsive width rules:
                    - Mobile (<640px): 2 cards visible -> w-[calc(50vw-2.5rem)]
                    - Tablet (640px - 1023px): 3 cards visible -> sm:w-[calc(33.33vw-2.5rem)]
                    - Desktop (1024px+): Exactly 4 cards visible -> lg:w-[calc((100vw-12rem)/4)] lg:max-w-[270px]
                  */
                  className="w-[calc(50vw-2.5rem)] sm:w-[calc(33.33vw-2.5rem)] lg:w-[264px] h-20 sm:h-24 lg:h-28 shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#A88548]/40 transition-all duration-200 flex items-center justify-center p-3 sm:p-4 cursor-pointer"
                  title={`Explore projects by ${builder.name}`}
                >
                  {builder.renderLogo()}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleArrowClick('right')}
            className="absolute right-0 sm:-right-2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold-metallic text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Next builder alliance"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
          </button>

        </div>

      </div>
    </section>
  );
}
