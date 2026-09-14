'use client';

import React from 'react';
import { DollarSign, Zap, Sparkles, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { getMonetagUrl } from '@/lib/affiliate/links';

export default function MonetagReferralBanner({
  className = '',
  title = 'Monetize 100% of Your Website Traffic with Monetag',
  subtitle = 'Join the top multi-format ad network for global publishers with high eCPMs, AI-driven Smart Direct Links, In-Page Push, and weekly payouts via PayPal, Wire & Crypto.'
}: {
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  const monetagUrl = getMonetagUrl();

  return (
    <div className={`my-8 rounded-3xl bg-gradient-to-br from-purple-950/70 via-slate-900 to-slate-950 border border-purple-500/30 p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl ${className}`}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          Verified Publisher Network
        </span>
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> High Global Fill Rates (Tier 1-3)
        </span>
      </div>

      <div className="relative z-10 max-w-3xl">
        <h3 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          {subtitle}
        </p>

        {/* Value Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200">100% Worldwide Traffic Fill</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200">Instant AI Direct Links &amp; Push</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <DollarSign className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200">Weekly Low Minimum Payouts</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fast approval • No minimum traffic thresholds</span>
          </div>
          <a
            href={monetagUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            <span>Start Monetizing With Monetag</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
