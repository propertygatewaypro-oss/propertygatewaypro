import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND } from '../../utils/constants';
import PostRequirementIcon from './PostRequirementIcon';

export default function MobileBottomBar({ onOpenRequirementModal }) {
  return (
    <div 
      className="fixed bottom-0 inset-x-0 bg-[#0F1117]/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 z-50 md:hidden flex items-center gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
      style={{ paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={`tel:${BRAND.phoneRaw}`}
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#1A1D26] border border-slate-700 active:bg-slate-800 text-white font-medium text-[11px] uppercase tracking-wider transition-transform active:scale-[0.98] shadow-sm"
        aria-label="Call Property Gateway Advisor directly"
      >
        <Phone className="w-3.5 h-3.5 text-[#B37D4E]" />
        <span>Call</span>
      </a>

      <button
        type="button"
        onClick={onOpenRequirementModal}
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#FAF9F6] active:bg-[#EAE4D8] text-[#0F1117] font-bold text-[11px] uppercase tracking-wider transition-transform active:scale-[0.98] shadow-sm border border-[#DDD6C8] cursor-pointer"
        aria-label="Post Property Requirement"
      >
        <PostRequirementIcon className="w-3.5 h-3.5 text-[#B37D4E]" color="#B37D4E" />
        <span>Requirement</span>
      </button>

      <a
        href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20Property%20Gateway!%20I%20am%20looking%20for%20verified%20properties%20in%20Chennai.%20Please%20guide%20me.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-semibold text-[11px] uppercase tracking-wider transition-transform active:scale-[0.98] shadow-sm"
        aria-label="Chat with Property Gateway Advisor on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-white" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
