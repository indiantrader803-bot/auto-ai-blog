'use client';

import React from 'react';
import Link from 'next/link';
import { useVip } from '@/context/VipAuthContext';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { Lock, Sparkles, ShieldCheck, Flame, ArrowRight, Crown, CheckCircle2 } from 'lucide-react';

interface ArticleContentGateProps {
  fullContent: string;
  isLatestOrExclusive?: boolean;
  articleTitle: string;
  views?: number;
}

/**
 * ArticleContentGate (SEO & AdSense Compliant + High VIP Conversion)
 * 
 * Architecture:
 * 1. For Googlebot, AdSense crawlers, and SEO:
 *    - Full 100% article content is always fully rendered in the DOM.
 *    - Guarantees zero "thin content" or "valueless inventory" flags from Google AdSense.
 *    - Solves Google Search Console "Crawled - currently not indexed" by providing complete 1,500+ word depth.
 * 
 * 2. For VIP Members:
 *    - Displays exclusive VIP Member Recognition banner at top.
 *    - Full uncensored institutional coverage unlocked.
 * 
 * 3. For Regular / Non-VIP Readers:
 *    - Shows the initial paragraphs.
 *    - Displays a high-converting VIP Membership Terminal with 1-click free registration to unlock exclusive Pine scripts, PDF dossiers & vouchers.
 *    - Followed by the complete continuation of the article so readers can finish reading without bounce rate or ad policy violations.
 */
export default function ArticleContentGate({
  fullContent,
  articleTitle,
  views = 2800,
}: ArticleContentGateProps) {
  const { isVip } = useVip();

  // If VIP user is logged in, show full article with VIP badge
  if (isVip) {
    return (
      <div className="space-y-6">
        {/* VIP Member Recognition Banner */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <span className="text-base sm:text-lg">👑</span>
            <span>VIP Unlocked: You are enjoying full uncensored institutional coverage</span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
            Active VIP Pass
          </span>
        </div>

        <MarkdownRenderer content={fullContent} />
      </div>
    );
  }

  // Split paragraphs to place the VIP Invitation Card naturally after paragraph 3
  const paragraphs = fullContent.split(/\n\s*\n/);
  const totalParagraphs = paragraphs.length;
  const breakPoint = Math.min(3, Math.max(1, Math.floor(totalParagraphs / 3)));

  const partOne = paragraphs.slice(0, breakPoint).join('\n\n');
  const partTwo = paragraphs.slice(breakPoint).join('\n\n');

  return (
    <div className="space-y-8">
      {/* Part 1: Initial Hook & Deep Analysis */}
      <MarkdownRenderer content={partOne} />

      {/* High-Conversion VIP Invitation Terminal (AdSense & SEO Safe) */}
      <div className="my-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-slate-50 to-indigo-500/5 dark:from-slate-900/95 dark:via-slate-950 dark:to-slate-950 text-slate-900 dark:text-white p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-wider shadow-xs">
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>VIP Member Intelligence Lounge</span>
            {views >= 2000 && (
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 ml-1 border-l border-amber-500/30 pl-2 text-[10px]">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" /> Trending
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-slate-900 dark:text-white leading-snug">
            Unlock Proprietary Models, Algorithms &amp; Research Dossiers
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            Get instant free access to our unreleased Pine Script indicators, 38-page semiconductor research PDFs, and secret travel flash codes.
          </p>

          {/* Value Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-w-md mx-auto pt-1 text-xs">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-200 text-[11px] font-medium">Pine Script Order-Flow Indicators</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-200 text-[11px] font-medium">Hedge Fund Macro Research PDFs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-200 text-[11px] font-medium">Secret Travel &amp; Hotel Flash Vouchers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-200 text-[11px] font-medium">100% Free Forever Membership</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/vip/register"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5"
            >
              <span>Activate Free VIP Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/vip/login"
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-300 dark:border-slate-700 text-xs flex items-center justify-center"
            >
              Sign In to Existing VIP
            </Link>
          </div>
        </div>
      </div>

      {/* Part 2: Continuation of In-Depth Article Content (100% Crawlable by Google & AdSense) */}
      {partTwo && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <MarkdownRenderer content={partTwo} />
        </div>
      )}
    </div>
  );
}
