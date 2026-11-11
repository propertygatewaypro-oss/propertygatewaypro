import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Cookie, 
  RotateCcw, 
  Printer, 
  ChevronRight, 
  List, 
  ChevronDown, 
  Calendar, 
  Building2 
} from 'lucide-react';
import { BRAND } from '../../utils/constants';

const POLICY_TABS = [
  { path: '/privacy-policy', label: 'Privacy Policy', icon: ShieldCheck, key: 'privacy' },
  { path: '/terms-and-conditions', label: 'Terms of Service', icon: FileText, key: 'terms' },
  { path: '/cookie-policy', label: 'Cookie Policy', icon: Cookie, key: 'cookies' },
  { path: '/refund-policy', label: 'Refund Policy', icon: RotateCcw, key: 'refund' },
];

export default function LegalLayout({
  title,
  description,
  activeKey,
  sections = [],
  lastUpdated = 'November 2026',
  children,
}) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || '');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Scrollspy to detect active section in viewport
  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Select topmost visible section
          const sorted = visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSectionId(sorted[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionId(id);
      setIsMobileTocOpen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 antialiased selection:bg-[#A88548]/20 selection:text-[#181B22]">
      
      {/* 1. HERO / HEADER SECTION */}
      <header className="bg-[#FAF9F6] text-[#1E232F] pt-14 pb-12 sm:pt-16 sm:pb-14 border-b border-[#E7E2D8] relative overflow-hidden print:hidden">
        {/* Subtle decorative gold ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A88548]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-mono" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#A88548] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-500">Legal Centre</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#A88548] font-bold">{title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              {/* Bronze Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7E2D8] text-[#7D5D2A] text-[11px] font-bold uppercase tracking-widest shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A88548]" />
                <span>PROPERTY GATEWAY | LEGAL CENTRE</span>
              </div>
              
              {/* Large Ivory Page Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-bold text-[#1E232F] tracking-tight leading-tight">
                {title}
              </h1>

              {/* Short descriptive introduction */}
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* Meta & Print Action */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 text-xs text-slate-500 font-mono shrink-0">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#E7E2D8] text-slate-700 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-[#A88548]" />
                <span>Last Updated: <strong className="text-[#1E232F]">{lastUpdated}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#7D5D2A] font-bold">TNRERA: {BRAND.reraId}</span>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#1E232F] px-2.5 py-1 rounded-md bg-white hover:bg-[#FAF9F6] border border-[#E7E2D8] transition-colors cursor-pointer shadow-2xs"
                  title="Print this legal policy"
                >
                  <Printer className="w-3.5 h-3.5 text-[#A88548]" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONSISTENT HORIZONTAL POLICY NAVIGATION BAR */}
      <nav className="sticky top-16 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E2D8] py-3 print:hidden" aria-label="Legal Policies Navigation">
        <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth">
            {POLICY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeKey === tab.key;
              return (
                <Link
                  key={tab.key}
                  to={tab.path}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gold-metallic text-white shadow-sm border-transparent'
                      : 'bg-white text-slate-700 hover:text-[#1E232F] hover:bg-[#F3EFE7] border border-[#E0D9CD]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT CONTAINER (Desktop: 2-Column with max-w 1150px) */}
      <main className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Mobile Collapsible Table of Contents */}
        {sections.length > 0 && (
          <div className="lg:hidden mb-6 print:hidden">
            <button
              type="button"
              onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E7E2D8] shadow-sm text-left"
            >
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#181B22]">
                <List className="w-4 h-4 text-[#A88548]" />
                <span>On This Page ({sections.length} Sections)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMobileTocOpen && (
              <div className="mt-2 p-4 bg-white rounded-2xl border border-[#E7E2D8] shadow-lg space-y-1.5 max-h-72 overflow-y-auto">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                      activeSectionId === sec.id
                        ? 'bg-gold-metallic text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-[#FAF9F6] hover:text-[#181B22]'
                    }`}
                  >
                    <span className={`font-mono text-[10px] w-5 shrink-0 ${activeSectionId === sec.id ? 'text-white' : 'text-[#A88548]'}`}>
                      {sec.number}.
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
          
          {/* Desktop Left Sidebar: On This Page Table of Contents (~250px) */}
          {sections.length > 0 && (
            <aside className="hidden lg:block w-[250px] shrink-0 sticky top-32 print:hidden">
              <div className="bg-white rounded-2xl border border-[#E7E2D8] p-5 shadow-sm space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#181B22]">
                    <List className="w-4 h-4 text-[#A88548]" />
                    <span>On This Page</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {sections.length}
                  </span>
                </div>

                <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs" aria-label="Table of contents">
                  {sections.map((sec) => {
                    const isCurrent = activeSectionId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-start gap-2 group cursor-pointer ${
                          isCurrent
                            ? 'bg-gold-metallic text-white font-semibold shadow-xs'
                            : 'text-slate-600 hover:text-[#181B22] hover:bg-[#FAF9F6]'
                        }`}
                      >
                        <span className={`font-mono text-[10px] shrink-0 mt-0.5 ${
                          isCurrent ? 'text-white font-bold' : 'text-slate-400 group-hover:text-[#A88548]'
                        }`}>
                          {sec.number}.
                        </span>
                        <span className="leading-tight line-clamp-2">{sec.title}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Print Callout */}
                <div className="pt-3 border-t border-[#E7E2D8]">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FAF9F6] border border-[#E0D9CD] hover:bg-[#F3EFE7] text-[#181B22] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#A88548]" />
                    <span>Print Official Copy</span>
                  </button>
                </div>

              </div>
            </aside>
          )}

          {/* Right Section: Main Legal Document (~800-850px) */}
          <article className="flex-1 max-w-full lg:max-w-[850px] w-full">
            <div className="bg-white rounded-3xl border border-[#E7E2D8] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] print:shadow-none print:border-none print:p-0">
              
              {/* Document Header (Visible in print too) */}
              <div className="pb-8 mb-8 border-b border-[#E7E2D8]">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 mb-2">
                  <div className="inline-flex items-center gap-2 text-[#181B22] font-semibold">
                    <Building2 className="w-4 h-4 text-[#A88548]" />
                    <span>{BRAND.name}</span>
                  </div>
                  <span>TNRERA Registered Agent: {BRAND.reraId}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
                  {title}
                </h2>
                <div className="w-12 h-1 bg-[#A88548] rounded-full mt-3" />
              </div>

              {/* Main Document Content */}
              {children}

              {/* Document Footer Callout */}
              <div className="mt-12 pt-8 border-t border-[#E7E2D8] text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                <div>
                  <p>© {new Date().getFullYear()} {BRAND.name}. All statutory rights reserved.</p>
                  <p>Governing Jurisdiction: Courts of Chennai, Tamil Nadu, India.</p>
                </div>
                <div className="text-right">
                  <p className="text-[#A88548] font-semibold">Official Legal Center Document</p>
                  <p>Inquiries: {BRAND.email}</p>
                </div>
              </div>

            </div>
          </article>

        </div>
      </main>

    </div>
  );
}
