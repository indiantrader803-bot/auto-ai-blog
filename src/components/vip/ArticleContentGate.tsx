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
  // Free open access for all standard informational articles:
  // Maximizes Googlebot crawlability, indexation score, dwell time, and reader trust.
  return (
    <div className="space-y-6">
      <MarkdownRenderer content={fullContent} />
    </div>
  );
}
