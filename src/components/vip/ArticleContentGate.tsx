'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useVip } from '@/context/VipAuthContext';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import RazorpayArticlePaywall from '@/components/monetization/RazorpayArticlePaywall';
import { Lock, Sparkles, ShieldCheck, Flame, ArrowRight, Crown, CheckCircle2 } from 'lucide-react';

interface ArticleContentGateProps {
  fullContent: string;
  isLatestOrExclusive?: boolean;
  articleTitle: string;
  views?: number;
  initialIsVip?: boolean;
  slug?: string;
}

export default function ArticleContentGate({
  fullContent,
  articleTitle,
  views = 2800,
  initialIsVip = false,
  slug = '',
}: ArticleContentGateProps) {
  const { isVip, user } = useVip();
  const [hasPaidAccess, setHasPaidAccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const isAllAccess = localStorage.getItem('vip_all_access_paid') === 'true';
        const unlockedList = JSON.parse(localStorage.getItem('unlocked_articles') || '[]');
        if (isAllAccess || (slug && unlockedList.includes(slug))) {
          setHasPaidAccess(true);
        }
      } catch (_) {}
    }
  }, [slug]);

  const unlocked = isVip || initialIsVip || Boolean(user?.isVip) || hasPaidAccess;

  // If user has unlocked (via VIP or Razorpay purchase), show full article
  if (unlocked) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-indigo-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 shadow-sm">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <span className="text-base sm:text-lg">👑</span>
            <span>Premium Access Unlocked: You have full access to this technical analysis</span>
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
            Unlocked
          </span>
        </div>

        <MarkdownRenderer content={fullContent} />
      </div>
    );
  }

  // Split paragraphs to give free preview (3 paragraphs), then the Razorpay Paywall
  const paragraphs = fullContent.split(/\n\s*\n/);
  const totalParagraphs = paragraphs.length;
  const breakPoint = Math.min(3, Math.max(1, Math.floor(totalParagraphs / 3)));

  const partOne = paragraphs.slice(0, breakPoint).join('\n\n');

  return (
    <div className="space-y-8">
      {/* Free Preview Hook (Top Paragraphs) */}
      <MarkdownRenderer content={partOne} />

      {/* 💳 Razorpay Standard Web Checkout Paywall Modal */}
      <RazorpayArticlePaywall
        articleTitle={articleTitle}
        articleSlug={slug}
        onPaymentSuccess={() => {
          setHasPaidAccess(true);
        }}
      />
    </div>
  );
}
