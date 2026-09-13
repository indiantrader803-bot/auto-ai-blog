"use client";

import { useState } from "react";
import { Tag, Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

interface InstantSavingsChipProps {
  category?: string;
}

export default function InstantSavingsChip({ category = "Trading" }: InstantSavingsChipProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <aside aria-label="Exclusive Trader Discounts" className="my-8 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-md">
          <Tag className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Verified Partner Rebates
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">Save up to 20% on Challenge Fees</span>
          </div>
          <h4 className="text-sm font-bold text-white mt-0.5 font-serif">
            Exclusive Prop Firm Discounts &amp; Free Passes
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {/* Atlas Funded */}
        <button
          onClick={() => copyCode("12275")}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-teal-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Click to copy Atlas Funded 20% promo code"
        >
          {copied === "12275" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Tag className="w-3 h-3 text-teal-400" />}
          <span>12275 (20% OFF)</span>
        </button>

        {/* FTM */}
        <button
          onClick={() => copyCode("arnab")}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Click to copy Funded Trader Markets 10% promo code"
        >
          {copied === "arnab" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Tag className="w-3 h-3 text-amber-400" />}
          <span>arnab (10% OFF)</span>
        </button>

        <a
          href="/best-prop-firms"
          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 shrink-0"
        >
          <span>All Deals</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
}
