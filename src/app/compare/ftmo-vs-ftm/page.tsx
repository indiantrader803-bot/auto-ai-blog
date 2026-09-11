import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, X, ArrowRight, ShieldCheck, Zap, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "FTMO vs Funded Trader Markets (FTM) Comparison 2026: Pricing, Rules & Spreads",
  description: "Direct side-by-side comparison between FTMO and Funded Trader Markets (FTM). Learn how FTM's zero time limit and 10% discount code 'arnab' saves you money.",
  keywords: ["FTMO vs FTM", "FTMO alternative 2026", "Funded Trader Markets vs FTMO", "cheapest prop firm challenge 2026"],
};

export default function FTMOvsFTMPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/best-prop-firms" className="hover:text-indigo-600">Prop Firms</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-300">FTMO vs FTM Comparison</span>
        </div>

        {/* Hero */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
            2026 Prop Firm Battle
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
            FTMO vs Funded Trader Markets (FTM)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Which prop firm offers better rules, lower challenge fees, and faster payouts? Here is our comprehensive side-by-side audit.
          </p>
        </div>

        {/* Side by Side Matrix */}
        <div className="overflow-x-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider">Feature / Rule</th>
                <th className="pb-4 font-bold text-slate-500 dark:text-slate-400 text-center">FTMO (Legacy)</th>
                <th className="pb-4 font-black text-indigo-600 dark:text-indigo-400 text-center bg-indigo-50/50 dark:bg-indigo-950/40 rounded-t-2xl">
                  Funded Trader Markets (Winner)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              <tr>
                <td className="py-4 font-bold text-slate-900 dark:text-white">$100k Challenge Price</td>
                <td className="py-4 text-center text-slate-500">€540 EUR (~$590 USD)</td>
                <td className="py-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                  $495 USD (Save ~$95 with code <span className="font-mono bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-500">arnab</span>)
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900 dark:text-white">Time Limit on Phases</td>
                <td className="py-4 text-center text-slate-500">Unlimited (Standard)</td>
                <td className="py-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                  Unlimited (Zero Rush)
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900 dark:text-white">Max Profit Split</td>
                <td className="py-4 text-center text-slate-500">80% - 90%</td>
                <td className="py-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                  Up to 90% Default
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900 dark:text-white">Minimum Trading Days</td>
                <td className="py-4 text-center text-slate-500">4 Days</td>
                <td className="py-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                  0 Days (Pass in 1 Day)
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900 dark:text-white">Platforms Supported</td>
                <td className="py-4 text-center text-slate-500">cTrader, DXTrade</td>
                <td className="py-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                  cTrader, Match-Trader, DXTrade
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900 dark:text-white">Exclusive Promo Discount</td>
                <td className="py-4 text-center text-slate-500">Rare (0%)</td>
                <td className="py-4 text-center font-bold text-amber-500 bg-indigo-50/30 dark:bg-indigo-950/20 font-mono">
                  10% OFF with code: arnab
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black font-serif">
              Ready to Save 10% on Your Challenge?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              Use code <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">arnab</span> at checkout for instant savings.
            </p>
          </div>

          <a
            href="https://fundedtradermarkets.com/ref/arnab"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-6 py-3 rounded-2xl bg-white text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2 shrink-0 active:scale-95"
          >
            <span>Start FTM Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
