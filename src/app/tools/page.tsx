"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calculator, DollarSign, Sparkles, Tag, ArrowRight, CheckCircle2 } from "lucide-react";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";

export default function PropToolsPage() {
  const [accountSize, setAccountSize] = useState<number>(100000);
  const [targetFirm, setTargetFirm] = useState<string>("funded-trader-markets");
  const [monthlyProfitTarget, setMonthlyProfitTarget] = useState<number>(8); // 8%

  const selectedOffer = PROPFLOW_MASTER_OFFERS.find((o) => o.slug === targetFirm) || PROPFLOW_MASTER_OFFERS[0];

  // Base Challenge Fee Estimations
  const baseFees: Record<number, number> = {
    10000: 95,
    25000: 175,
    50000: 295,
    100000: 495,
    200000: 950,
  };

  const rawFee = baseFees[accountSize] || 495;
  const discountPercent = targetFirm === "atlas-funded" || targetFirm === "aquafunded" ? 20 : 10;
  const discountAmount = Math.round((rawFee * discountPercent) / 100);
  const finalFee = rawFee - discountAmount;

  const grossProfitUSD = Math.round((accountSize * monthlyProfitTarget) / 100);
  const traderProfitUSD = Math.round((grossProfitUSD * 0.90)); // 90% split

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
            PropFlow-AI Interactive Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Prop Challenge Fee &amp; Payout Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Calculate your exact challenge fee discount with verified partner promo codes and estimate your 90% monthly payout.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Account Funding Size
              </label>
              <select
                value={accountSize}
                onChange={(e) => setAccountSize(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={10000}>$10,000 Challenge</option>
                <option value={25000}>$25,000 Challenge</option>
                <option value={50000}>$50,000 Challenge</option>
                <option value={100000}>$100,000 Challenge (Most Popular)</option>
                <option value={200000}>$200,000 Challenge</option>
              </select>
            </div>

            {/* Target Firm Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Partner Prop Firm
              </label>
              <select
                value={targetFirm}
                onChange={(e) => setTargetFirm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="funded-trader-markets">Funded Trader Markets (Code: arnab)</option>
                <option value="atlas-funded">Atlas Funded (Code: 12275 - 20% OFF)</option>
                <option value="aquafunded">AquaFunded (Code: 6e9 - 20% Rebate)</option>
              </select>
            </div>
          </div>

          {/* Monthly Target Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Estimated Monthly Profit Return:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">{`${monthlyProfitTarget}% ($${grossProfitUSD.toLocaleString()} Gross)`}</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              step={1}
              value={monthlyProfitTarget}
              onChange={(e) => setMonthlyProfitTarget(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Result Output Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Original Challenge Fee</span>
                <span className="text-xl font-bold line-through text-slate-500 font-mono">{`$${rawFee}`}</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">Instant Coupon Savings</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{`-$${discountAmount} (${discountPercent}%)`}</span>
              </div>
              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30">
                <span className="text-[10px] text-indigo-400 uppercase font-bold block">Final Price with Code</span>
                <span className="text-2xl font-black text-white font-mono">{`$${finalFee}`}</span>
              </div>
            </div>

            {/* Estimated Monthly Trader Payout */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block">Estimated 90% Monthly Trader Payout</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{`+$${traderProfitUSD.toLocaleString()} USD / Month`}</span>
              </div>

              <a
                href={selectedOffer.targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <span>Apply Code '{selectedOffer.promoCode}' &amp; Start Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
