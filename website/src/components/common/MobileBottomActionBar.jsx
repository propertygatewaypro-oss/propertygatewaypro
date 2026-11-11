import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Building2, Mail } from 'lucide-react';
import { BRAND } from '../../utils/constants';

/**
 * MobileBottomActionBar
 * Sticky bottom 4-column quick action bar for mobile devices (< 768px).
 * Replaces intrusive floating chatbot bubbles with a clean, high-converting action bar:
 * 1. Call: Instant direct dial to +91 75989 54635
 * 2. WhatsApp: Direct pre-filled WhatsApp consultation
 * 3. Post Property: Opens requirement / property post modal
 * 4. Enquire: Direct contact / lead inquiry
 */
export default function MobileBottomActionBar({ onOpenRequirementModal }) {
  const whatsappMessage = `Hello Property Gateway,\n\nI am looking for verified residential properties in Chennai and would like to speak with a property advisor. Please share available options. Thank you!`;
  const whatsappUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <nav 
      aria-label="Mobile Quick Actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t-2 border-[#E7E2D8] shadow-[0_-8px_30px_rgba(0,0,0,0.14)]"
      style={{ paddingBottom: 'max(0.35rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-4 items-stretch divide-x divide-[#E7E2D8] h-[58px] bg-white">
        
        {/* 1. CALL ACTION */}
        <a
          href={`tel:${BRAND.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 text-center bg-white hover:bg-[#FAF9F6] active:bg-[#F5F2EA] active:scale-95 transition-all text-[#181B22] group"
          aria-label={`Call ${BRAND.phoneDisplay}`}
        >
          <PhoneCall className="w-5 h-5 text-[#181B22] group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-semibold text-[#181B22] mt-1 tracking-tight leading-none">
            Call
          </span>
        </a>

        {/* 2. WHATSAPP ACTION */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 text-center bg-white hover:bg-[#FAF9F6] active:bg-[#F5F2EA] active:scale-95 transition-all group"
          aria-label="Chat on WhatsApp"
        >
          <svg 
            className="w-5 h-5 fill-[#25D366] group-hover:scale-110 transition-transform" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="text-[11px] font-semibold text-[#181B22] mt-1 tracking-tight leading-none">
            WhatsApp
          </span>
        </a>

        {/* 3. POST PROPERTY ACTION */}
        <button
          type="button"
          onClick={onOpenRequirementModal}
          className="flex flex-col items-center justify-center py-1.5 px-1 text-center bg-white hover:bg-[#FAF9F6] active:bg-[#F5F2EA] active:scale-95 transition-all text-[#181B22] group cursor-pointer"
          aria-label="Post Property or Requirement"
        >
          <Building2 className="w-5 h-5 text-[#0F172A] group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-semibold text-[#181B22] mt-1 tracking-tight leading-none">
            Post Property
          </span>
        </button>

        {/* 4. ENQUIRE ACTION */}
        <Link
          to="/contact?purpose=inquiry"
          className="flex flex-col items-center justify-center py-1.5 px-1 text-center bg-white hover:bg-[#FAF9F6] active:bg-[#F5F2EA] active:scale-95 transition-all group"
          aria-label="Enquire with Property Gateway"
        >
          <Mail className="w-5 h-5 text-[#DC2626] group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-semibold text-[#181B22] mt-1 tracking-tight leading-none">
            Enquire
          </span>
        </Link>

      </div>
    </nav>
  );
}
