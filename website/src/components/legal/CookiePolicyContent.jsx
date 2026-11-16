import React from 'react';
import { Check } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export const COOKIE_SECTIONS = [
  { id: 'what-are-cookies', number: '1', title: 'What Are Cookies?' },
  { id: 'why-we-use-cookies', number: '2', title: 'Why We Use Cookies' },
  { id: 'essential-cookies', number: '3', title: 'Strictly Necessary (Essential) Cookies' },
  { id: 'functional-cookies', number: '4', title: 'Functional & Preference Cookies' },
  { id: 'analytics-cookies', number: '5', title: 'Performance & Analytics Cookies' },
  { id: 'marketing-cookies', number: '6', title: 'Marketing & Campaign Cookies' },
  { id: 'third-party-cookies', number: '7', title: 'Third-Party Cookies & Embeds' },
  { id: 'storage-duration', number: '8', title: 'Cookie Storage Duration & Lifespans' },
  { id: 'manage-preferences', number: '9', title: 'Managing Cookie Preferences' },
  { id: 'disabling-cookies', number: '10', title: 'Disabling Cookies via Browser Settings' },
  { id: 'policy-updates', number: '11', title: 'Policy Updates & Legislative Compliance' },
  { id: 'contact-info', number: '12', title: 'Contact Information & Privacy Officer' },
];

export default function CookiePolicyContent() {
  return (
    <div className="space-y-10 text-slate-700 leading-relaxed text-sm">
      
      {/* 1. What Are Cookies? */}
      <section id="what-are-cookies" className="scroll-mt-36 space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            01
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            What Are Cookies?
          </h2>
        </div>
        <p>
          Cookies are compact text files containing alphanumeric strings that are transferred to your computer, tablet, or smartphone when you visit a website. Together with modern browser storage mechanisms such as <code>localStorage</code> and <code>sessionStorage</code>, cookies enable web servers to identify your device, recall browsing preferences, and provide persistent navigation experiences.
        </p>
        <p>
          At <strong>Property Gateway</strong> (<a href="https://www.propertygatewaypro.com" className="text-[#A88548] hover:underline font-medium">propertygatewaypro.com</a>), browser storage helps remember your preferences while you explore Chennai properties.
        </p>
      </section>

      {/* 2. Why We Use Cookies */}
      <section id="why-we-use-cookies" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            02
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Why We Use Cookies
          </h2>
        </div>
        <p>We use browser storage and optional analytics for these purposes:</p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Remembering whether you chose essential storage or accepted analytics;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Keeping property filters in the page URL when you share a search;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Preventing annoying popup fatigue by remembering when you dismiss consultation prompts;</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#A88548]/15 text-[#A88548] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Measuring visits with Google Analytics when you choose "Accept All".</span>
          </div>
        </div>
      </section>

      {/* 3. Essential Cookies */}
      <section id="essential-cookies" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            03
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Strictly Necessary (Essential) Cookies
          </h2>
        </div>
        <p>
          The public site stores your cookie choice and temporary form display preferences in your browser. These settings support the site experience you request.
        </p>
        <div className="p-4 rounded-2xl bg-white border border-[#E7E2D8] space-y-2 font-mono text-xs">
          <p><span className="text-[#A88548] font-semibold">Browser keys:</span> <code>pg_cookie_consent</code>, <code>pg_post_req_dismissed</code>, <code>pg_requirement_submitted</code></p>
          <p><span className="text-[#A88548] font-semibold">Purpose:</span> Remember your cookie choice and avoid repeatedly showing the requirement popup.</p>
          <p><span className="text-[#A88548] font-semibold">Duration:</span> The dismissal key lasts for the browser session; the other keys remain until you clear site data.</p>
        </div>
      </section>

      {/* 4. Functional Cookies */}
      <section id="functional-cookies" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            04
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Functional & Preference Cookies
          </h2>
        </div>
        <p>
          The site uses browser storage to remember your popup and cookie choices. Property filters are represented in the page URL when available.
        </p>
      </section>

      {/* 5. Analytics Cookies */}
      <section id="analytics-cookies" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            05
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Performance & Analytics Cookies
          </h2>
        </div>
        <p>
          If you choose "Accept All", we load Google Analytics to measure visits and site usage. If you choose "Essential Only", we do not load it.
        </p>
      </section>

      {/* 6. Advertising and Marketing Cookies */}
      <section id="marketing-cookies" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            06
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Marketing & Campaign Cookies
          </h2>
        </div>
        <p>
          This site does not currently load a separate advertising or remarketing tag. We will update this policy and seek an appropriate choice before adding one.
        </p>
      </section>

      {/* 7. Third-Party Cookies */}
      <section id="third-party-cookies" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            07
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Third-Party Cookies & Embeds
          </h2>
        </div>
        <p>
          Links to third-party services, such as Google Maps or WhatsApp, take you to those services when you choose to open them. Their privacy practices apply after you leave this site.
        </p>
      </section>

      {/* 8. Cookie Storage Duration */}
      <section id="storage-duration" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            08
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Cookie Storage Duration & Lifespans
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E2D8] space-y-1.5">
            <h3 className="font-bold text-xs text-[#181B22] uppercase tracking-wider">Session Cookies</h3>
            <p className="text-xs text-slate-600">
              Temporary cookies that exist solely while your browser tab remains open. They are automatically deleted from memory when you close your browser.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E2D8] space-y-1.5">
            <h3 className="font-bold text-xs text-[#181B22] uppercase tracking-wider">Persistent Cookies</h3>
            <p className="text-xs text-slate-600">
              Remain saved on your hard drive for a designated duration (ranging from 30 days to 12 months) or until you manually clear your browser cache.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Managing Cookie Preferences */}
      <section id="manage-preferences" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            09
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Managing Cookie Preferences
          </h2>
        </div>
        <p>
          You can accept analytics or choose essential storage only from the banner. You can clear your saved choice through your browser's site data settings:
        </p>
        <div className="bg-[#FAF9F6] border border-[#E7E2D8] rounded-2xl p-4 sm:p-5 space-y-2 text-xs text-slate-700">
          <p>
            • <strong>Essential Cookies:</strong> Always enabled to ensure secure navigation and prevent bot attacks.
          </p>
          <p>
            • <strong>Analytics:</strong> Loads only after you select "Accept All". Clear site data to choose again.
          </p>
        </div>
      </section>

      {/* 10. Disabling Cookies via Browser Settings */}
      <section id="disabling-cookies" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            10
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Disabling Cookies via Browser Settings
          </h2>
        </div>
        <p>
          You can clear saved choices or block cookies through your browser settings:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
          <li><strong>Google Chrome:</strong> Settings → Privacy & Security → Third-party cookies;</li>
          <li><strong>Apple Safari:</strong> Preferences → Privacy → Prevent cross-site tracking;</li>
          <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection;</li>
          <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies.</li>
        </ul>
        <p className="text-xs text-slate-500 italic">
          Note: Clearing site data resets your cookie and popup preferences.
        </p>
      </section>

      {/* 11. Policy Updates */}
      <section id="policy-updates" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            11
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Policy Updates & Legislative Compliance
          </h2>
        </div>
        <p>
          We review our Cookie Policy routinely to conform with statutory standards under the DPDP Act 2023, MeitY directives, and global privacy standards. Revisions will be published on this page with an updated timestamp.
        </p>
      </section>

      {/* 12. Contact Information */}
      <section id="contact-info" className="scroll-mt-36 space-y-3.5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] text-[#7D5D2A] border border-[#E7E2D8] font-mono font-bold text-xs flex items-center justify-center">
            12
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181B22] tracking-tight">
            Contact Information & Privacy Officer
          </h2>
        </div>
        <p>
          If you have questions regarding our cookie practices or local data storage mechanisms, please contact:
        </p>
        <div className="bg-[#FAF9F6] text-[#1E232F] border border-[#E7E2D8] p-5 sm:p-6 rounded-2xl border border-[#A88548]/30 space-y-2.5 text-xs font-mono">
          <p><strong className="text-[#A88548]">Officer:</strong> Privacy & Cookie Compliance Desk</p>
          <p><strong className="text-[#A88548]">Entity:</strong> {BRAND.name} (TNRERA {BRAND.reraId})</p>
          <p><strong className="text-[#A88548]">Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-emerald-400 hover:underline">{BRAND.email}</a></p>
          <p><strong className="text-[#A88548]">Phone:</strong> <a href={`tel:${BRAND.phone}`} className="text-emerald-400 hover:underline">{BRAND.phoneDisplay}</a></p>
          <p><strong className="text-[#A88548]">Office:</strong> {BRAND.address}</p>
        </div>
      </section>

    </div>
  );
}
