"use client";

import { useState } from "react";
import { Coffee, Heart, DollarSign, Sparkles, QrCode, CheckCircle2, CreditCard } from "lucide-react";

export default function BuyMeCoffee() {
  const [selectedAmount, setSelectedAmount] = useState<number>(3);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [tipped, setTipped] = useState<boolean>(false);

  const presets = [
    { usd: 3, inr: "₹199", label: "☕ Coffee" },
    { usd: 5, inr: "₹399", label: "⚡ Turbo Tip" },
    { usd: 10, inr: "₹799", label: "🚀 Super Supporter" },
    { usd: 25, inr: "₹1,999", label: "👑 Patron" },
  ];

  const effectiveAmount = customAmount ? parseFloat(customAmount) || selectedAmount : selectedAmount;
  const effectiveInr = Math.round(effectiveAmount * 86.5);

  const handleTipSuccess = () => {
    setTipped(true);
    setTimeout(() => {
      setShowQrModal(false);
      setTipped(false);
    }, 3000);
  };

  return (
    <>
      <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-500/20 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
              <Coffee className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  Direct Reader Support
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif mt-0.5">
                Support Independent Autonomous AI Research
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                100% of reader tips fund high-compute agent servers, GPU benchmarks, and open research.
              </p>
            </div>
          </div>
        </div>

        {/* Tip Amount Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {presets.map((p) => {
            const isSelected = selectedAmount === p.usd && !customAmount;
            return (
              <button
                key={p.usd}
                type="button"
                onClick={() => {
                  setSelectedAmount(p.usd);
                  setCustomAmount("");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-400"
                }`}
              >
                <span>{p.label}</span>
                <span className="text-[10px] opacity-75 font-mono">(${p.usd} / {p.inr})</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="ml-auto px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Send ${effectiveAmount} (₹{effectiveInr.toLocaleString("en-IN")})</span>
          </button>
        </div>
      </div>

      {/* Instant Tip Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Coffee className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                  Support Auto-AI Research
                </h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="text-3xl font-black text-slate-900 dark:text-white font-serif">
                ${effectiveAmount} USD <span className="text-sm font-sans text-amber-600 font-medium">/ ₹{effectiveInr.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your preferred payment method:
              </p>
            </div>

            <div className="space-y-3">
              {/* UPI Instant Transfer */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-amber-600" /> Instant UPI (GPay, PhonePe, Paytm)
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    Zero Fee
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                  <span>admin@autoai.upi</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("admin@autoai.upi");
                      alert("UPI ID copied to clipboard!");
                    }}
                    className="text-[10px] font-bold text-indigo-600 uppercase"
                  >
                    Copy UPI
                  </button>
                </div>
              </div>

              {/* Card / Global Payout */}
              <a
                href="https://buymeacoffee.com/autoai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay via Card / Apple Pay / PayPal</span>
              </a>

              <button
                onClick={handleTipSuccess}
                className="w-full py-2.5 text-center text-xs font-bold text-emerald-600 hover:underline"
              >
                {tipped ? "🎉 Thank you for supporting us!" : "I have completed payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
