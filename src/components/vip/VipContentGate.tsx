'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface VipContentGateProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
  teaserContent?: React.ReactNode;
  initialIsVip?: boolean;
}

export default function VipContentGate({
  children,
  fallbackTitle = 'VIP Exclusive Data & Dossier Locked',
  fallbackDescription = 'This proprietary analysis, data sheet, or model portfolio is reserved exclusively for SmartMag VIP Members.',
  teaserContent,
  initialIsVip = false,
}: VipContentGateProps) {
  const [isVip, setIsVip] = useState<boolean | null>(initialIsVip ? true : null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user?.isVip) {
            setIsVip(true);
            return;
          }
        }
        setIsVip(false);
      } catch (e) {
        setIsVip(false);
      }
    }
    checkAuth();
  }, []);

  if (isVip === null) {
    return (
      <div className="my-8 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 animate-pulse flex items-center justify-center text-slate-500 text-sm">
        Verifying VIP Access...
      </div>
    );
  }

  if (isVip) {
    return (
      <div className="my-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
          👑 VIP Pass Unlocked
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {teaserContent && (
        <div className="relative mb-6 opacity-40 select-none pointer-events-none filter blur-[1.5px]">
          {teaserContent}
        </div>
      )}

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 text-2xl mb-4 border border-amber-500/30 shadow-inner">
          👑
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {fallbackTitle}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {fallbackDescription}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/vip/register"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all text-sm shadow-lg shadow-amber-500/20"
          >
            Claim Free VIP Membership
          </Link>
          <Link
            href="/vip/login"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 text-sm"
          >
            VIP Member Sign In
          </Link>
        </div>
        
        <p className="text-[11px] text-slate-500 mt-4">
          Instant activation • Authentic email verification • Free for our top readers
        </p>
      </div>
    </div>
  );
}
