'use client';

import React, { useEffect, useRef, useState } from 'react';
import { trackAdEvent } from '@/lib/monetag';
import { useVip } from '@/context/VipAuthContext';
import { ShieldCheck, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

interface MonetagBannerProps {
  zoneId?: string;
  slotType?: 'article_top' | 'article_middle' | 'article_bottom' | 'sidebar' | 'homepage';
  className?: string;
}

export default function MonetagBanner({
  zoneId,
  slotType = 'article_middle',
  className = '',
}: MonetagBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const { isVip } = useVip();

  const activeZone = zoneId || process.env.NEXT_PUBLIC_MONETAG_BANNER_ZONE || '8888888';
  const isDummyZone = activeZone === '8888888' || !activeZone;

  // VIP members get a clean reading experience with zero intrusive third-party ads
  if (isVip) {
    return null;
  }

  // IntersectionObserver: Lazy-load banner 200px before entering viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Inject zone script once visible or fallback to verified sponsor card
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    if (isDummyZone) {
      setUseFallback(true);
      setIsLoaded(true);
      return;
    }

    // Safety timeout: If script does not render ad content within 1800ms, display fallback partner
    const timer = setTimeout(() => {
      const zoneEl = document.getElementById(`monetag-zone-${activeZone}`);
      if (!zoneEl || zoneEl.children.length === 0) {
        setUseFallback(true);
        setIsLoaded(true);
      }
    }, 1800);

    try {
      const adBox = containerRef.current;
      trackAdEvent('monetag_banner_view', { zoneId: activeZone, slotType });

      if (typeof window !== 'undefined' && (window as any).monetag) {
        (window as any).monetag.show({ zone: activeZone, container: adBox });
        setIsLoaded(true);
        clearTimeout(timer);
      } else {
        const script = document.createElement('script');
        script.dataset.cfasync = 'false';
        script.async = true;
        script.src = `//poweredby.monetag.com/zone/${activeZone}.js`;
        script.onload = () => {
          setIsLoaded(true);
        };
        script.onerror = () => {
          setUseFallback(true);
          setIsLoaded(true);
          clearTimeout(timer);
        };
        adBox.appendChild(script);
      }
    } catch {
      setUseFallback(true);
      setIsLoaded(true);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [isVisible, activeZone, slotType, isDummyZone]);

  return (
    <div
      ref={containerRef}
      className={`monetag-ad-wrapper my-6 ${className}`}
      data-ad-slot={slotType}
    >
      {useFallback ? (
        /* Verified High-Converting Sponsored Partner Card (Prevents blank white box) */
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-900 p-5 sm:p-6 shadow-sm transition-all hover:border-amber-400/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                <span>Sponsored Partner • Verified Deal</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-serif tracking-tight">
                Institutional Quant Evaluation &amp; Algorithmic Capital
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Trade with up to $200,000 in funded accounts. Zero time limits, raw spreads, and an exclusive 20% reader discount with code <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">SMARTMAG20</span>.
              </p>
            </div>

            <a
              href="https://fundingpips.com"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 text-center shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Claim Sponsor Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div className="monetag-banner-container">
          <span className="monetag-ad-badge">SPONSORED</span>
          {!isLoaded && <div className="monetag-skeleton" />}
          <div id={`monetag-zone-${activeZone}`} className="min-w-[300px] min-h-[250px] flex items-center justify-center text-center text-xs text-slate-400" />
        </div>
      )}
    </div>
  );
}
