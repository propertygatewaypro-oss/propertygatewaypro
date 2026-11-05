import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCheck, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../utils/constants';

// Authentic WhatsApp SVG Icon
function WhatsAppIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.434 5.177L2 22l4.975-1.399C8.423 21.498 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.63 0-3.151-.488-4.432-1.328l-.317-.207-2.964.833.823-2.906-.226-.339C3.968 14.938 3.5 13.518 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
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
      {/* Floating Container (Fixed Bottom Right, elevated above mobile bar) */}
      <div className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
        
        {/* Floating Attention Prompt Bubble (Dismissible) */}
        {showTooltip && !isOpen && (
          <div className="mb-3 mr-1 bg-white text-slate-800 text-xs py-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2.5 animate-bounce-subtle max-w-[260px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="leading-snug">
              Need help shortlisting Chennai homes? <strong>Chat with our advisor on WhatsApp.</strong>
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

        {/* Circular Authentic WhatsApp Launcher Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chatbot"}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-0 hover:rotate-90" />
          ) : (
            <>
              <WhatsAppIcon className="w-8 h-8 fill-current" />
              {/* Online Notification Badge */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-xs">
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
          {/* Header in Official WhatsApp Green with Verified Badge */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center font-bold text-white text-sm">
                  PG
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
                Are you looking for ready homes, sea-facing villas on ECR, or direct developer pre-launches?
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
