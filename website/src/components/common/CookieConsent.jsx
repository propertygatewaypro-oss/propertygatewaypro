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
      className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-2xl bg-[#0F1117]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_0_1px_rgba(201,138,75,0.2)] p-3.5 sm:px-5 sm:py-3.5 z-40 animate-slideUp text-white"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5">
        {/* Concise Contextual Notice */}
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-[12.5px] text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Cookie Preferences:</span> We use essential cookies to maintain search filters and enhance your property browsing. Read our{' '}
            <a 
              href="/cookie-policy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#C98A4B] hover:underline font-medium inline-block"
            >
              Cookie Policy
            </a>.
          </p>
        </div>

        {/* Refined Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleAccept('essential')}
            className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white font-medium text-xs transition-colors cursor-pointer border border-white/10 text-center active:scale-95"
          >
            Essential Only
          </button>
          <button
            onClick={() => handleAccept('all')}
            className="flex-1 sm:flex-initial px-4 py-1.5 rounded-xl bg-[#C98A4B] hover:bg-[#b87a3d] text-[#0F1117] font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-sm text-center"
          >
            Accept All
          </button>
          <button
            onClick={() => handleAccept('dismiss')}
            className="w-7 h-7 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-0.5"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
