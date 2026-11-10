import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../utils/constants';

export default function CookiePolicyPage() {
  useEffect(() => {
    document.title = 'Cookie Policy | Property Gateway';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E232F] antialiased selection:bg-[#A88548]/20 selection:text-[#181B22]">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#FAF9F6] text-[#1E232F] pt-28 pb-14 sm:pt-32 sm:pb-16 border-b border-[#E7E2D8] relative overflow-hidden print:bg-white print:text-black print:p-0 print:border-none">
        <div className="w-[90%] max-w-[1440px] mx-auto">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-mono print:hidden" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#A88548] transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">Legal</span>
            <span className="text-slate-400">/</span>
            <span className="text-[#A88548] font-bold">Cookie Policy</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-block text-[#7D5D2A] text-xs font-bold tracking-widest uppercase font-mono">
                PROPERTY GATEWAY | LEGAL
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E232F] tracking-tight print:text-black">
                Cookie Policy
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1 print:text-slate-700">
                Transparent information regarding how cookies, session tokens, and local storage mechanisms are utilized on Property Gateway, with your preference controls.
              </p>
            </div>

            <div className="text-xs text-slate-600 font-mono space-y-1 lg:text-right shrink-0 print:text-black">
              <p>TNRERA Agent: <strong className="text-[#1E232F] print:text-black">{BRAND.reraId}</strong></p>
              <p>Effective Date: <span className="text-[#7D5D2A] font-bold">November 2026</span></p>
              <p>Jurisdiction: Chennai, Tamil Nadu, India</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN WIDE DOCUMENT CONTENT */}
      <main className="w-[90%] max-w-[1440px] mx-auto py-12 sm:py-16">
        <article className="space-y-12 text-[15px] sm:text-base text-[#1E232F] leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you browse websites. They are widely used to ensure websites function properly, retain user preferences across visits, and provide anonymized reporting data to site operators.
            </p>
            <p>
              Along with cookies, modern web technologies also utilize <code>localStorage</code> and <code>sessionStorage</code> to store temporary preferences (such as your chosen property budget tier or active search filter in Chennai) directly in your browser.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              2. Why We Use Cookies
            </h2>
            <p>Property Gateway uses cookies and client storage for clear, legitimate operational purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Essential Operation:</strong> Verifying security tokens, preventing automated spam bots, and maintaining secure sessions.</li>
              <li><strong>Filter Preferences:</strong> Remembering your selected Chennai micro-markets (OMR, ECR, Anna Nagar) and property configurations.</li>
              <li><strong>Popup Management:</strong> Ensuring that consultation modals are not displayed repeatedly once dismissed.</li>
              <li><strong>Performance Telemetry:</strong> Measuring page load speeds to optimize high-resolution floor plan and gallery rendering.</li>
            </ul>
          </section>

          {/* Section 3: Categories of Cookies Used */}
          <section className="space-y-6 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              3. Categories of Cookies Used on Property Gateway
            </h2>
            <p>
              We classify cookies into four distinct functional tiers for transparency and compliance:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Category 1 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#181B22]">Strictly Necessary Cookies</h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Required for core platform functionality, security verification, route authentication, and saving your consent preferences. These cookies cannot be deactivated.
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono">
                  Storage: Session &amp; LocalStorage
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#181B22]">Functional &amp; Preference Cookies</h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#A88548]/15 text-[#A88548]">
                    User Preference
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Allows our platform to remember your property search configurations (such as preferred Chennai locations, BHK type, and price range) to avoid re-entering them.
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono">
                  Storage: 30 to 180 Days
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#181B22]">Performance &amp; Analytics Cookies</h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Anonymized
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Collects aggregate, pseudonymous data regarding page render speeds, popular Chennai residential projects, and navigation flow to optimize responsiveness.
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono">
                  Storage: Aggregated Metrics
                </div>
              </div>

              {/* Category 4 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#181B22]">Advisory &amp; Communication Cookies</h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Consent Based
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Measures the responsiveness of direct WhatsApp consultations, new project launch alerts, and concierge site visit bookings for verified builder launches.
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono">
                  Storage: First-Party Only
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-b border-[#E7E2D8] pb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              4. Managing Cookies Manually in Your Browser
            </h2>
            <p>
              You have full manual control over cookies directly through your web browser settings. You can delete existing cookies or configure your browser to block them altogether:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] text-xs space-y-1">
                <strong className="block text-slate-900 font-semibold">Google Chrome</strong>
                <p className="text-slate-600 text-[11px]">Settings → Privacy &amp; Security → Third-party cookies → Clear or Block.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] text-xs space-y-1">
                <strong className="block text-slate-900 font-semibold">Apple Safari (iOS / Mac)</strong>
                <p className="text-slate-600 text-[11px]">Settings → Safari → Advanced → Privacy → Block All Cookies.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] text-xs space-y-1">
                <strong className="block text-slate-900 font-semibold">Mozilla Firefox</strong>
                <p className="text-slate-600 text-[11px]">Settings → Privacy &amp; Security → Enhanced Tracking Protection.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] text-xs space-y-1">
                <strong className="block text-slate-900 font-semibold">Microsoft Edge</strong>
                <p className="text-slate-600 text-[11px]">Settings → Cookies and Site Permissions → Manage and delete cookies.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B22] tracking-tight">
              5. Contact Information
            </h2>
            <p>
              For any questions regarding our Cookie Policy, please contact our privacy desk at <a href={`mailto:${BRAND.email}`} className="text-[#A88548] hover:underline font-mono">{BRAND.email}</a>.
            </p>
          </section>

        </article>
      </main>

    </div>
  );
}
