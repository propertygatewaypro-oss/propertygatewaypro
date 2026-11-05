import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCheck, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../utils/constants';

// Official Meta WhatsApp Vector Logo (Exact Official Glyph & Palette)
function OfficialWhatsAppLogo({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#25D366"/>
      <path 
        fill="#FFFFFF" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M24 10.5c-7.456 0-13.5 6.044-13.5 13.5 0 2.38.623 4.618 1.71 6.567L10.5 37.5l7.147-1.874A13.435 13.435 0 0 0 24 37.5c7.456 0 13.5-6.044 13.5-13.5S31.456 10.5 24 10.5zm6.54 18.966c-.27.76-1.57 1.456-2.193 1.55-.583.088-1.346.126-2.176-.138-.503-.16-1.147-.373-1.97-.73-3.47-1.498-5.733-4.992-5.906-5.223-.174-.23-1.413-1.876-1.413-3.578 0-1.703.894-2.54 1.21-2.887.317-.346.69-.433.92-.433.23 0 .46.002.663.013.213.01.498-.08.778.595.288.694.978 2.394 1.065 2.567.086.173.144.375.029.606-.115.231-.173.375-.345.576l-.52.607c-.173.172-.355.36-.153.706.202.347.898 1.48 1.926 2.397 1.321 1.179 2.436 1.545 2.782 1.718.347.173.548.144.75-.087.202-.23.865-1.01 1.096-1.356.23-.347.46-.289.78-.173.317.115 2.016.95 2.362 1.124.346.173.576.26.662.404.087.144.087.837-.183 1.597z"
      />
    </svg>
  );
}

export default function WhatsAppChatbot() {
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
    { label: "📍 3 BHK Flats in OMR / ECR", text: "Hi Property Gateway! I am looking for 3 BHK properties along OMR / ECR." },
    { label: "🚗 Book Free Cab Site Visit", text: "Hi Property Gateway! I'd like to book a complimentary door-to-door cab site visit for my family." },
    { label: "💰 Cost Sheets & Floor Plans", text: "Hi Property Gateway! Please share detailed floor plans and builder cost sheets." },
    { label: "⚖️ TNRERA Title Verification", text: "Hi Property Gateway! I need legal guidance and title verification for Chennai projects." },
  ];

  const handleLaunchWhatsApp = (text) => {
    const msg = text || customMessage || "Hi Property Gateway! I am looking for verified real estate options in Chennai.";
    const url = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleLaunchWhatsApp(customMessage);
  };

  return (
    <>
      {/* Floating Launcher (Bottom Right, elevated above mobile conversion bar) */}
      <div className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
        
        {/* Floating Attention Prompt Bubble (Dismissible) */}
        {showTooltip && !isOpen && (
          <div className="mb-3 mr-1 bg-white text-slate-800 text-xs py-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2.5 animate-bounce-subtle max-w-[260px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="leading-snug">
              Need help shortlisting Chennai homes? <strong>Chat with an advisor on WhatsApp.</strong>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Circular Official Meta WhatsApp Launcher Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative w-14 h-14 rounded-full overflow-hidden shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.7)] transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 flex items-center justify-center bg-[#25D366]"
          aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chatbot"}
        >
          {isOpen ? (
            <div className="w-full h-full bg-[#1F2C34] text-white flex items-center justify-center">
              <X className="w-6 h-6 transition-transform rotate-0 hover:rotate-90" />
            </div>
          ) : (
            <>
              <OfficialWhatsAppLogo className="w-14 h-14" />
              {/* Online Unread Notification Badge */}
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-xs">
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
          {/* Header in Official WhatsApp Teal Green (#075E54) with Verified Badge */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40 shadow-xs">
                  <OfficialWhatsAppLogo className="w-10 h-10" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-sm leading-tight">
                  <span>Property Gateway Desk</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <p className="text-[10px] text-emerald-100 font-normal mt-0.5">
                  Typically replies in &lt; 5 mins • Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
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
                Are you looking for ready apartments, sea-facing villas on ECR, or direct builder pre-launches?
              </p>
              <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 pt-0.5">
                <span>Just now</span>
                <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
              </div>
            </div>

            {/* Quick Interactive Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 pl-1">
                Frequently Requested:
              </p>
              <div className="flex flex-col gap-1.5">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLaunchWhatsApp(chip.text)}
                    className="text-left py-2 px-3 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-medium text-xs border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs flex items-center justify-between group active:scale-[0.99]"
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
              className="w-9 h-9 rounded-full bg-[#075E54] hover:bg-[#128C7E] text-white flex items-center justify-center shrink-0 transition-colors shadow-xs active:scale-95"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>

          {/* Bottom Security Note */}
          <div className="bg-slate-50 py-1.5 px-3 text-center border-t border-slate-100 text-[10px] text-slate-500">
            Official WhatsApp Channel • Verified under TNRERA
          </div>
        </div>
      )}
    </>
  );
}
