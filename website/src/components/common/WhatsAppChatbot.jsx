import React, { useState, useEffect } from 'react';
import { X, Send, CheckCheck, ShieldCheck, Phone, ClipboardList, Clock } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function WhatsAppChatbot({ onOpenVisitModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  // Show friendly teaser tooltip after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const quickChips = [
    { 
      label: "📋 Post Requirement / Budget", 
      text: "Hi Property Gateway! I'd like to post my requirement (BHK, Budget, Preferred Location).",
      action: "modal"
    },
    { 
      label: "🚗 Book Free Cab Site Visit", 
      text: "Hi Property Gateway! I'd like to book a complimentary door-to-door cab site visit for my family.",
      action: "modal"
    },
    { 
      label: "📍 3 BHK Flats in OMR / ECR", 
      text: "Hi Property Gateway! I am looking for 3 BHK properties along OMR / ECR." 
    },
    { 
      label: "💰 Cost Sheets & Floor Plans", 
      text: "Hi Property Gateway! Please share detailed floor plans and builder cost sheets." 
    },
    { 
      label: "⚖️ TNRERA Title Verification", 
      text: "Hi Property Gateway! I need legal guidance and title verification for Chennai projects." 
    },
  ];

  const handleLaunchWhatsApp = (text) => {
    const msg = text || customMessage || "Hi Property Gateway! I am looking for verified real estate options in Chennai.";
    const url = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleChipClick = (chip) => {
    if (chip.action === 'modal' && onOpenVisitModal) {
      setIsOpen(false);
      onOpenVisitModal();
    } else {
      handleLaunchWhatsApp(chip.text);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleLaunchWhatsApp(customMessage);
  };

  return (
    <>
      {/* Floating Action Cluster (Inspired by Connection Point & PropLeaf Right Dock) */}
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-2.5">
        
        {/* Quick Action Floating Pills (Desktop & Tablet) */}
        {!isOpen && (
          <div className="hidden sm:flex flex-col items-end gap-2 mb-1 animate-fadeIn">
            {/* Quick Call Button */}
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#0F1117]/90 hover:bg-[#1A1D26] backdrop-blur-md border border-slate-700 text-white text-[11px] font-semibold tracking-wide shadow-lg hover:border-emerald-500/50 transition-all hover:scale-105 group"
              title="Call Senior Advisor"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Phone className="w-3 h-3 fill-current" />
              </span>
              <span>Call Advisor</span>
            </a>

            {/* Quick Post Requirement Button */}
            {onOpenVisitModal && (
              <button
                onClick={onOpenVisitModal}
                className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-gradient-to-r from-brand-bronze-500/90 to-brand-bronze-600/90 hover:from-brand-bronze-500 hover:to-brand-bronze-600 backdrop-blur-md text-slate-950 text-[11px] font-bold tracking-wide shadow-lg transition-all hover:scale-105 cursor-pointer"
                title="Post Requirement"
              >
                <ClipboardList className="w-3.5 h-3.5 text-slate-950" />
                <span>Post Requirement</span>
              </button>
            )}
          </div>
        )}

        {/* Floating Attention Prompt Bubble (Dismissible) */}
        {showTooltip && !isOpen && (
          <div className="mb-1 mr-1 bg-white text-slate-800 text-xs py-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2.5 animate-bounce-subtle max-w-[260px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="leading-snug">
              Need help shortlisting Chennai homes? <strong>Chat with an advisor on WhatsApp.</strong>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Circular WhatsApp Launcher Button using Official WebP Icon */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.7)] transition-all duration-300 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
          aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chat"}
        >
          {isOpen ? (
            <div className="w-16 h-16 rounded-full bg-[#0F1117] text-white flex items-center justify-center border border-slate-700 shadow-2xl">
              <X className="w-7 h-7 transition-transform rotate-0 hover:rotate-90 text-brand-bronze-400" />
            </div>
          ) : (
            <>
              {/* Soft ambient aura pulse */}
              <span className="absolute inset-0 rounded-full bg-[#25D366]/25 animate-ping opacity-60 pointer-events-none" />

              <img 
                src="/icons/whatsapp-icon.webp" 
                alt="WhatsApp" 
                className="relative w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
              {/* Online Notification Badge */}
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md animate-pulse">
                1
              </span>
            </>
          )}
        </button>
      </div>

      {/* Realistic WhatsApp Chatbot Modal / Card */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 md:right-8 z-50 w-[92vw] max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Header in Official WhatsApp Teal Green (#075E54) with Verified Badge & Operating Time */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Property Gateway Desk" 
                  className="w-11 h-11 rounded-full object-cover shadow-sm bg-black ring-1 ring-white/30"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-sm leading-tight">
                  <span>Property Gateway Desk</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <p className="text-[10px] text-emerald-100 font-normal mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  <span>Online • Advisory: 9AM – 8PM IST</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Bubble Area with WhatsApp Tint */}
          <div className="p-4 bg-[#ECE5DD] flex-1 overflow-y-auto space-y-3.5 text-xs">
            {/* Timestamp */}
            <div className="text-center">
              <span className="bg-[#D1E4E2] text-slate-600 px-2.5 py-0.5 rounded-md text-[10px] font-medium shadow-2xs">
                Today
              </span>
            </div>

            {/* Incoming Message from Advisor */}
            <div className="bg-white text-slate-800 p-3 rounded-xl rounded-tl-none shadow-xs border border-slate-200/50 max-w-[85%] space-y-1.5">
              <p className="leading-relaxed">
                Vanakkam! 🙏 Welcome to <strong>Property Gateway Chennai</strong>.
              </p>
              <p className="leading-relaxed text-slate-600">
                Are you looking for verified apartments, sea-facing villas on ECR, or direct builder pricing on new launches?
              </p>
              <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 pt-0.5">
                <span>Just now</span>
                <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
              </div>
            </div>

            {/* Quick Interactive Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 pl-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Instant Inquiries (Avg. &lt; 5 mins response):</span>
              </p>
              <div className="flex flex-col gap-1.5">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChipClick(chip)}
                    className="text-left py-2 px-3 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-medium text-xs border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{chip.label}</span>
                    <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-1.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Message Input Footer */}
          <form onSubmit={handleFormSubmit} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your requirement..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-slate-300 focus:outline-none focus:border-[#075E54] focus:ring-1 focus:ring-[#075E54] bg-slate-50"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#075E54] hover:bg-[#128C7E] text-white flex items-center justify-center shrink-0 transition-colors shadow-xs active:scale-95 cursor-pointer"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>

          {/* Bottom Security Note */}
          <div className="bg-slate-50 py-1.5 px-3 text-center border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official WhatsApp Channel • Verified under TNRERA ({BRAND.reraId})</span>
          </div>
        </div>
      )}
    </>
  );
}
