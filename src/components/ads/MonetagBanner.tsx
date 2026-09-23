'use client';

import React, { useEffect, useRef, useState } from 'react';
import { trackAdEvent } from '@/lib/monetag';

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
  const activeZone = zoneId || process.env.NEXT_PUBLIC_MONETAG_BANNER_ZONE || '8888888';

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

  // Inject zone script once visible
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    try {
      const adBox = containerRef.current;
      // Track impression in GA4
      trackAdEvent('monetag_banner_view', { zoneId: activeZone, slotType });

      // Check if Monetag global zone loader exists
      if (typeof window !== 'undefined' && (window as any).monetag) {
        (window as any).monetag.show({ zone: activeZone, container: adBox });
        setIsLoaded(true);
      } else {
        // Fallback placeholder/safe load
        const script = document.createElement('script');
        script.dataset.cfasync = 'false';
        script.async = true;
        script.src = `//poweredby.monetag.com/zone/${activeZone}.js`;
        script.onload = () => setIsLoaded(true);
        script.onerror = () => setIsLoaded(true);
        adBox.appendChild(script);
      }
    } catch (e) {
      setIsLoaded(true);
    }
  }, [isVisible, activeZone, slotType]);

  return (
    <div
      ref={containerRef}
      className={`monetag-ad-wrapper ${className}`}
      data-ad-slot={slotType}
    >
      <div className="monetag-banner-container">
        <span className="monetag-ad-badge">SPONSORED</span>
        {!isLoaded && <div className="monetag-skeleton" />}
        <div id={`monetag-zone-${activeZone}`} className="min-w-[300px] min-h-[250px] flex items-center justify-center text-center text-xs text-slate-400" />
      </div>
    </div>
  );
}
