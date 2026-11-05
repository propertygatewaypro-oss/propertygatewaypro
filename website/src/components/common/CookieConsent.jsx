import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

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
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-white border border-slate-200 p-4 rounded-xl shadow-2xl z-40 animate-slideUp"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-emerald-50 text-brand-emerald-600 shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs text-slate-600">
          <p className="font-semibold text-slate-900 text-sm">
            We value your privacy
          </p>
          <p className="leading-relaxed">
            We use essential cookies to maintain search filters and enhance your property browsing experience. Read our{' '}
            <Link to="/cookie-policy" className="text-brand-emerald-700 underline hover:text-emerald-800">
              Cookie Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => handleAccept('all')}
              className="px-3 py-1.5 rounded-md bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white font-medium text-xs shadow-sm transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => handleAccept('essential')}
              className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={() => handleAccept('dismiss')}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
