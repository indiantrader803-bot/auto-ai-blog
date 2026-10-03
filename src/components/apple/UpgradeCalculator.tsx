"use client";

import { useState } from "react";
import Link from "next/link";
import { TRADE_IN_VALUATION_ESTIMATES } from "@/data/appleData";
import { Calculator, ArrowRight, ShieldCheck, Sparkles, TrendingDown, Check } from "lucide-react";

export default function UpgradeCalculator() {
  const [selectedOldPhone, setSelectedOldPhone] = useState<string>("iphone-13-pro-max");
  const [targetPhonePrice, setTargetPhonePrice] = useState<number>(159900); // default to 18 Pro Max

  const tradeData = TRADE_IN_VALUATION_ESTIMATES[selectedOldPhone] || TRADE_IN_VALUATION_ESTIMATES["iphone-13-pro-max"];

  const bankCardDiscount = 5000;
  const exchangePromotionalBonus = 6000;
  const estimatedTradeVal = tradeData.tradeInValInr;
  const totalDeductions = estimatedTradeVal + bankCardDiscount + exchangePromotionalBonus;
  const effectiveCost = Math.max(0, targetPhonePrice - totalDeductions);
  const monthlyNoCostEmi = Math.round(effectiveCost / 24);

  return (
    <section id="upgrade-calculator" className="py-20 bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5" /> Instant Trade-In Valuation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            iPhone Upgrade Calculator.
          </h2>
          <p className="mt-2 text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-light">
            Select your current smartphone to compute its real-time trade-in valuation, instant bank discount, and effective net price for the iPhone 18 series in India.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Side */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase font-mono font-bold text-slate-500 dark:text-zinc-400 mb-2">
                  1. Select Your Current Smartphone:
                </label>
                <select
                  value={selectedOldPhone}
                  onChange={(e) => setSelectedOldPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-300 dark:border-white/20 rounded-2xl px-4 py-3 text-slate-900 dark:text-white text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {Object.entries(TRADE_IN_VALUATION_ESTIMATES).map(([key, item]) => (
                    <option key={key} value={key} className="bg-white dark:bg-zinc-800 text-slate-900 dark:text-white">
                      {item.modelName} (Approx ₹{item.tradeInValInr.toLocaleString("en-IN")})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono font-bold text-slate-500 dark:text-zinc-400 mb-2">
                  2. Choose Your Target iPhone 18 Tier:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "iPhone 18 (128GB)", price: 79900 },
                    { label: "iPhone 18 Pro (128GB)", price: 134900 },
                    { label: "iPhone 18 Pro Max (256GB)", price: 159900 },
                    { label: "iPhone 17 Pro Max (Clearance)", price: 128900 },
                  ].map((p) => (
                    <button
                      key={p.price}
                      type="button"
                      onClick={() => setTargetPhonePrice(p.price)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        targetPhonePrice === p.price
                          ? "bg-slate-900 text-white font-bold border-slate-900 dark:bg-white dark:text-black dark:border-white shadow-xs"
                          : "bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-white/10"
                      }`}
                    >
                      <div>{p.label}</div>
                      <div className="font-mono mt-1 font-bold">₹{p.price.toLocaleString("en-IN")}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendation Note */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
                <span className="font-bold text-indigo-950 dark:text-white block mb-1">Our Upgrade Verdict:</span>
                {tradeData.upgradeRecommendation}
              </div>
            </div>

            {/* Computation Output Side */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-black/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-xs">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 pb-2 border-b border-slate-200 dark:border-white/10">
                Live Pricing Breakdown (India)
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-zinc-300">
                  <span>Target Device Price:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    ₹{targetPhonePrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Estimated Trade-In Value:</span>
                  <span className="font-mono font-bold">
                    - ₹{estimatedTradeVal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Exchange Promotion Bonus:</span>
                  <span className="font-mono font-bold">
                    - ₹{exchangePromotionalBonus.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Instant HDFC/ICICI Card Cashback:</span>
                  <span className="font-mono font-bold">
                    - ₹{bankCardDiscount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Net Payable Highlight */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="text-xs text-slate-500 dark:text-zinc-400 uppercase font-mono">Effective Net Price:</div>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  ₹{effectiveCost.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                  Or just <strong className="text-slate-900 dark:text-white font-mono">₹{monthlyNoCostEmi.toLocaleString("en-IN")}/month</strong> with 24-month No-Cost EMI
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col gap-2">
                <Link
                  href="/apple/deals"
                  className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md shadow-emerald-500/20"
                >
                  Lock In This Exchange Deal
                </Link>

                <div className="text-[10px] text-slate-400 dark:text-zinc-500 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Doorstep pickup with instant credit on Flipkart &amp; Croma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
