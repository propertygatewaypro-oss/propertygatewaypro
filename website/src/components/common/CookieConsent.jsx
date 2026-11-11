import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('pg_cookie_consent');
    if (!hasConsented) {
      const timer = setTimeout(() => setShowConsent(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type) => {
    localStorage.setItem('pg_cookie_consent', type);
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div 
      className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-2xl bg-white/95 backdrop-blur-xl border border-[#E7E2D8] rounded-2xl shadow-[0_20px_50px_rgba(20,25,35,0.15)] p-3.5 sm:px-5 sm:py-3.5 z-40 animate-slideUp text-[#1E232F]"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5">
        {/* Concise Contextual Notice */}
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed">
            <span className="font-semibold text-[#1E232F]">Cookie Preferences:</span> We use essential cookies to maintain search filters and enhance your property browsing. Read our{' '}
            <a 
              href="/cookie-policy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#A88548] hover:underline font-medium inline-block"
            >
              Cookie Policy
            </a>.
          </p>
        </div>

        {/* Refined Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleAccept('essential')}
            className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F0EDE6] text-slate-700 font-semibold text-xs transition-colors cursor-pointer border border-[#E7E2D8] text-center active:scale-95"
          >
            Essential Only
          </button>
          <button
            onClick={() => handleAccept('all')}
            className="flex-1 sm:flex-initial px-4 py-1.5 rounded-xl bg-gold-metallic text-white font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-xs text-center"
          >
            Accept All
          </button>
          <button
            onClick={() => handleAccept('dismiss')}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-0.5"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
