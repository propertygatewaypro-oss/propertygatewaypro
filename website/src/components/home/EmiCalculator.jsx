import React, { useState } from 'react';
import { Calculator, IndianRupee, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(7500000); // 75 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatLakhs = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  return (
    <section className="py-20 bg-[#FAF9F6] border-y border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A88548] bg-[#A88548]/10 px-3.5 py-1 rounded-full border border-[#A88548]/30 inline-block">
            Financial Planning Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181B22] tracking-tight">
            Home Loan EMI Calculator
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Estimate your monthly payments. We partner with SBI, HDFC, ICICI, and Axis Bank to secure preferential lending rates.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E2D8] shadow-xl max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Control Rail (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Loan Amount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700">Loan Principal</span>
                <span className="text-[#181B22] font-bold text-base tabular-nums">
                  {formatLakhs(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="30000000"
                step="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A88548]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹10 Lakhs</span>
                <span>₹1.5 Cr</span>
                <span>₹3 Crores</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700">Interest Rate (% p.a.)</span>
                <span className="text-[#181B22] font-bold text-base tabular-nums">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="7.5"
                max="12.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A88548]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>7.5% (Prime)</span>
                <span>9.5%</span>
                <span>12%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700">Tenure</span>
                <span className="text-[#181B22] font-bold text-base tabular-nums">
                  {tenureYears} Years
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A88548]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* EMI Calculation Result Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF9F6] text-[#181B22] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full border border-[#E7E2D8] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A88548]/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-mono">
                Monthly Estimated EMI
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#7D5D2A] tabular-nums mt-1">
                ₹{monthlyEmi.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500 ml-1">/ month</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E7E2D8] text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Principal Amount:</span>
                <span className="font-semibold text-[#181B22]">{formatLakhs(loanAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Interest:</span>
                <span className="font-semibold text-[#181B22]">{formatLakhs(totalInterest)}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-bold border-t border-[#E7E2D8] pt-2 text-sm">
                <span>Total Outflow:</span>
                <span className="text-[#7D5D2A]">{formatLakhs(totalPayment)}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(`Hello Property Gateway,\n\nI used your EMI calculator and would like assistance with bank home loan pre-approval:\n• Required Loan Amount: ${formatLakhs(loanAmount)}\n• Estimated Monthly EMI: ₹${monthlyEmi.toLocaleString('en-IN')}\n• Preferred Tenor: ${tenureYears} Years\n\nPlease connect me with your banking desk for pre-approval from partner banks (SBI, HDFC, ICICI). Thank you!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-gold-metallic text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#A88548]/30 active:scale-[0.98] transition-all"
            >
              <img src="/icons/whatsapp-icon.webp" alt="WhatsApp" className="w-4 h-4 object-contain" />
              <span>Get Bank Pre-Approval on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
