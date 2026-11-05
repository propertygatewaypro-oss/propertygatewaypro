import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function MobileBottomBar() {
  return (
    <div 
      className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 z-50 md:hidden flex items-center gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={`tel:${BRAND.phoneRaw}`}
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-brand-navy-900 active:bg-brand-navy-800 text-white font-medium text-sm transition-transform active:scale-[0.98] shadow-sm"
        aria-label="Call Property Gateway Advisor directly"
      >
        <Phone className="w-4 h-4 text-brand-emerald-400" />
        <span>Call Now</span>
      </a>

      <a
        href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20Property%20Gateway!%20I%20am%20looking%20for%20verified%20properties%20in%20Chennai.%20Please%20guide%20me.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba56] text-white font-semibold text-sm transition-transform active:scale-[0.98] shadow-sm"
        aria-label="Chat with Property Gateway Advisor on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
