import React from 'react';
import { Phone } from 'lucide-react';
import { BRAND } from '../../utils/constants';

/**
 * Direct Floating Action Stack (Direct Phone Call + WhatsApp)
 * Sits in the bottom-right corner of the viewport.
 * - Phone Button: Direct tel: dialer in signature gold
 * - WhatsApp Button: High-res emblem linking to direct pre-filled chat
 */
export default function WhatsAppChatbot() {
  const message = `Hello Property Gateway,\n\nI am looking for verified residential properties in Chennai and would like to speak with a property advisor. Please share available options. Thank you!`;
  const whatsappUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-5 md:bottom-7 md:right-7 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
      {/* 1. Direct Dial Phone Button */}
      <a
        href={`tel:${BRAND.phone}`}
        className="w-12 h-12 md:w-[54px] md:h-[54px] rounded-full bg-[#A88548] hover:bg-[#b87a3d] text-[#181B22] flex items-center justify-center shadow-[0_8px_20px_rgba(201,138,75,0.4)] hover:shadow-[0_12px_28px_rgba(201,138,75,0.6)] transition-all hover:scale-110 active:scale-95 duration-200 cursor-pointer border border-white/20 group"
        aria-label={`Direct Call: ${BRAND.phoneDisplay}`}
        title={`Direct Call: ${BRAND.phoneDisplay}`}
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#181B22] fill-current group-hover:rotate-12 transition-transform" />
      </a>

      {/* 2. WhatsApp Direct Floating Action */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-110 active:scale-95 duration-200 cursor-pointer drop-shadow-lg hover:drop-shadow-2xl"
        aria-label="Chat with Property Gateway on WhatsApp"
        title="Chat with Property Gateway on WhatsApp"
      >
        <img
          src="/icons/whatsapp-icon.webp"
          alt="Chat with Property Gateway on WhatsApp"
          className="w-12 h-12 md:w-[54px] md:h-[54px] object-contain select-none"
          loading="lazy"
        />
      </a>
    </div>
  );
}
