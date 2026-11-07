import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Sparkles, 
  Cpu, 
  Layers, 
  Eye, 
  Zap, 
  FileCode2, 
  Code2, 
  Lock,
  ArrowRight,
  ExternalLink,
  Award,
  AlertTriangle
} from 'lucide-react';
import { BRAND } from '../utils/constants';

export default function AntiAiStandardsPage() {
  useEffect(() => {
    document.title = 'Hallmark Anti-AI Design Standards | Property Gateway';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const HALLMARK_RULES = [
    {
      number: "01",
      title: "Tokens Only Architecture",
      rule: "Every color and font goes through a declared design token (Tailwind theme or :root variables). Never hardcode literal hex colors or one-off font families in components.",
      implementation: "Property Gateway enforces obsidian (#0F1117, #0A0C10), warm travertine (#FAF9F6), and metallic gold (#C98A4B) tokens strictly via theme definitions."
    },
    {
      number: "02",
      title: "Never transition: all",
      rule: "Never animate width, height, top, or left. Only animate composited properties (transform, opacity, box-shadow) that execute off the main browser UI thread.",
      implementation: "All interactive cards, buttons, and navigation elements utilize GPU-accelerated transforms and composited opacity transitions."
    },
    {
      number: "03",
      title: "No Italic Accent Words",
      rule: "Never wrap an isolated word in a headline with italics or an isolated gradient purely for synthetic visual decoration.",
      implementation: "Headlines maintain editorial typographical authority with unified, natural emphasis and authentic serif weights."
    },
    {
      number: "04",
      title: "overflow-x: clip Invariant",
      rule: "Use overflow-x: clip on both html and body. Never use overflow-x: hidden, and never use 100vw, which causes phantom horizontal scrollbars on Windows.",
      implementation: "Base stylesheets enforce overflow-x: clip across the root, ensuring zero desktop horizontal jitter."
    },
    {
      number: "05",
      title: "Robust Grid Tracks (minmax)",
      rule: "Image-bearing grids must use minmax(0, 1fr). Display headings must specify overflow-wrap: break-word; min-width: 0 to prevent grid blowout.",
      implementation: "Property listing grids and architectural image carousels use guarded minmax tracks that gracefully adapt to every screen width."
    },
    {
      number: "06",
      title: "Instant Keyboard Focus Ring",
      rule: "Every interactive element must feature a visible, sharp :focus-visible ring appearing instantly without delay.",
      implementation: "Forms, buttons, search filters, and links provide high-contrast gold outline-offset rings for full keyboard navigation."
    },
    {
      number: "07",
      title: "Accessibility & Reduced Motion",
      rule: "Every animation must respect prefers-reduced-motion: reduce. The entire application must remain readable and functional with scripting disabled.",
      implementation: "CSS media queries disable continuous transitions for users requesting reduced motion, and critical information is rendered server-friendly."
    },
    {
      number: "08",
      title: "Zero Fabricated Proof",
      rule: "Never invent fake metrics ('10,000+ happy buyers'), fake testimonials, or placeholder logo walls. Use only real, verifiable project data.",
      implementation: "All numbers reflect genuine surveyed inventory, real TNRERA registrations (TN/Agent/020/2019), and authentic Chennai developer partnerships."
    },
    {
      number: "09",
      title: "No Uppercase Eyebrows",
      rule: "Avoid small tracked uppercase labels like '01 / AMENITIES'. Keep labels in sentence case at normal tracking.",
      implementation: "Labels and captions use purposeful typography with natural kerning, prioritizing legibility over AI template clichés."
    },
    {
      number: "10",
      title: "No Glued Punctuation",
      rule: "Never use middle-dot-joined metadata strings (Flat · 3 BHK · OMR) or glue arrows directly to link text (View Details->).",
      implementation: "Metadata elements use distinct flex pill containers, and directional icons maintain independent optical spacing."
    },
    {
      number: "11",
      title: "Strict Cliché Ban",
      rule: "Never use purple-to-cyan crypto gradients, cards nested inside cards, emojis as UI icons, or artificial window chrome.",
      implementation: "Uses bespoke architectural photography, authentic Lucide SVG vector iconography, and tailored physical-material shadows."
    },
    {
      number: "12",
      title: "The 1280×800 Viewport Rule",
      rule: "The hero headline, single sentence explanation, and primary call-to-action must all be visible at 1280×800 without requiring scrolling.",
      implementation: "Page heroes are engineered with disciplined vertical budgets, ensuring primary value and action are immediately actionable."
    },
    {
      number: "13",
      title: "Concise Copy Rhythm",
      rule: "Cap text density to roughly 80 words on any single viewport screen. The hero's text is the headline, one sentence, and its actions.",
      implementation: "Eliminates redundant AI fluff and repetitive paragraphs, replacing jargon with clear, direct Chennai real estate advisory copy."
    },
    {
      number: "14",
      title: "Capped & Centered Container",
      rule: "Max-width containers (max-w-7xl mx-auto px-6) are capped and centered. On 1920px+ monitors, side gutters grow—text measures and card grids do not stretch uncontrollably.",
      implementation: "Grid tracks maintain strict structural boundaries, ensuring premium viewing on ultra-wide desktop monitors."
    },
    {
      number: "15",
      title: "Automated Linter Verification",
      rule: "Run automated linters (sloplint.mjs) before merging code to catch and eliminate generative AI slop patterns.",
      implementation: "The build pipeline runs automated audits checking for prohibited CSS patterns, transition locks, and contrast ratios."
    },
    {
      number: "16",
      title: "Authentic Chennai Real Estate Standards",
      rule: "Visuals and copy must highlight real Chennai micro-markets (OMR, ECR, Anna Nagar, Guindy, Porur) and real statutory RERA parent deed verifications.",
      implementation: "Every featured community is cross-referenced with CMDA/DTCP approvals, revenue patta records, and physical site inspections."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E232F] antialiased selection:bg-[#C98A4B]/20 selection:text-[#0F1117]">
      
      {/* 1. EDITORIAL DARK HERO SECTION */}
      <section className="bg-[#0F1117] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-[#232733] relative overflow-hidden">
        {/* Subtle Architectural Grid Texture */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C98A4B 1px, transparent 1px), radial-gradient(#C98A4B 1px, #0F1117 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C98A4B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#C98A4B] transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Engineering</span>
            <span className="text-slate-600">/</span>
            <span className="text-[#C98A4B] font-medium">Anti-AI Standards</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Gold Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#C98A4B]/15 text-[#C98A4B] border border-[#C98A4B]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>POWERED BY NUTLOPE/HALLMARK & STRATEGY 360</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF9F6] tracking-tight">
                Hallmark Anti-AI Design Standards
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
                Property Gateway strictly enforces the Hallmark design standard (created by Hassan El Mghari / nutlope) to guarantee human-crafted, authoritative, and bespoke real estate interfaces—eliminating generic, repetitive AI-generated templates.
              </p>
            </div>

            {/* Regulatory & Updated Meta */}
            <div className="text-xs text-slate-400 font-mono space-y-1 lg:text-right shrink-0 bg-[#171922] p-4 rounded-xl border border-white/10">
              <p>Standard: <strong className="text-white">Hallmark v2.0 & Hard Floor</strong></p>
              <p>Enforced Since: <span className="text-[#C98A4B]">November 2026</span></p>
              <p>TNRERA Compliance: <span className="text-emerald-400 font-semibold">{BRAND.reraId}</span></p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE PHILOSOPHY MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C98A4B] uppercase">
              THE PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug">
              Why Real Estate Software Must Be Human-Designed, Not Generatively Hallucinated
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A home purchase is typically the largest financial commitment in a family’s lifetime. Yet the modern web is flooded with generic AI-coded templates: crypto-style purple gradients, fabricated buyer reviews, fake metric tickers, and broken responsive grids that fail on real mobile viewports.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>Property Gateway rejects AI slop.</strong> Every line of code, typographical scale, and layout track adheres to strict architectural benchmarks. We pair authentic Chennai ground intelligence with Hassan El Mghari’s Hallmark Hard Floor standards to deliver an interface worthy of luxury real estate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C98A4B] shrink-0 mt-0.5">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 font-semibold text-sm">Anti-Generic AI</strong>
                <p className="text-xs text-slate-500 mt-0.5">Zero copy-pasted UI libraries, artificial windows, or purple gradients.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C98A4B] shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 font-semibold text-sm">Zero Fabricated Proof</strong>
                <p className="text-xs text-slate-500 mt-0.5">Only real TNRERA registrations, verified locations, and audited titles.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C98A4B] shrink-0 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-900 font-semibold text-sm">60 FPS Composited Motion</strong>
                <p className="text-xs text-slate-500 mt-0.5">No transition: all. Composited transform & opacity only.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. THE 16 HARD RULES OF THE HALLMARK HARD FLOOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C98A4B] uppercase">
            THE NON-NEGOTIABLE BENCHMARKS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
            The 16 Rules of the Hallmark Hard Floor
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every component, route, and layout in Property Gateway must pass these criteria before release.
          </p>
        </div>

        {/* 16 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {HALLMARK_RULES.map((item) => (
            <div 
              key={item.number}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#C98A4B]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <span className="text-xs font-mono font-bold text-[#C98A4B] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    RULE {item.number}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Enforced
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.rule}
                </p>
              </div>

              {/* Property Gateway Concrete Implementation */}
              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-slate-200/70 text-xs text-slate-700 space-y-1">
                <strong className="block text-[11px] font-mono text-[#C98A4B] uppercase tracking-wider">
                  Property Gateway Standard:
                </strong>
                <p className="leading-relaxed">
                  {item.implementation}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. REAL ESTATE APPLICATION */}
      <section className="bg-[#0F1117] text-white py-14 sm:py-20 border-t border-[#232733] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C98A4B] uppercase">
              GENUINE LOCAL RELEVANCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Bespoke Software for Chennai’s Homebuyers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We reject the generic Silicon Valley SaaS aesthetic in favor of purposeful Tamil Nadu real estate intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-[#141720] p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C98A4B]/20 text-[#C98A4B] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-white">30-Year Parent Deed Audits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                CMDA, DTCP, Patta, and Encumbrance verification performed by in-house advocates before any property is shortlisted.
              </p>
            </div>

            <div className="bg-[#141720] p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C98A4B]/20 text-[#C98A4B] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Zero Buyer Brokerage</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                0% brokerage fee on all brand-new primary residential developments and RERA-approved township projects across Chennai.
              </p>
            </div>

            <div className="bg-[#141720] p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C98A4B]/20 text-[#C98A4B] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Guided Site Walkthroughs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Personalized on-site inspection tours across OMR, ECR, Anna Nagar, and Porur with zero purchase pressure.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#C98A4B] hover:bg-[#b57a3e] text-[#0F1117] font-bold text-sm transition-transform active:scale-95 shadow-lg"
            >
              <span>Explore Verified Chennai Properties</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
