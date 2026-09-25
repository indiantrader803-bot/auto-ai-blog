'use client';

import React, { useEffect, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { canShowVignette, markVignetteShown, trackAdEvent } from '@/lib/monetag';

interface MonetagContextType {
  hasVignetteFired: boolean;
}

const MonetagContext = createContext<MonetagContextType>({ hasVignetteFired: false });

export const useMonetagContext = () => useContext(MonetagContext);

export default function MonetagProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper to safely inject scripts once
  const loadScript = (id: string, setup: (script: HTMLScriptElement) => void) => {
    if (typeof window === 'undefined') return;
    if (document.getElementById(id)) return;
    try {
      const script = document.createElement('script');
      script.id = id;
      setup(script);
      document.body.appendChild(script);
    } catch (err) {
      console.warn(`[Monetag] Failed to inject ad script ${id}:`, err);
    }
  };

  // ✅ 1. Vignette when opening another article (e.g. /blog/...)
  useEffect(() => {
    if (typeof window === 'undefined' || !pathname) return;

    // Trigger when user opens an article or navigates across articles
    const isArticlePage = pathname.startsWith('/blog/') || pathname.startsWith('/article/') || pathname.startsWith('/reviews/');
    if (isArticlePage) {
      trackAdEvent('monetag_vignette_show', { page: pathname });
      markVignetteShown();

      // Trigger / refresh Monetag Vignette - Zone 11802121
      loadScript('monetag-vignette-11802121', (s) => {
        s.dataset.zone = '11802121';
        s.src = 'https://n6wxm.com/vignette.min.js';
        s.async = true;
      });

      // If already loaded in document, trigger show method if available
      try {
        if ((window as any).monetag && typeof (window as any).monetag.show === 'function') {
          (window as any).monetag.show({ zone: '11802121' });
        }
      } catch (_) {}
    }
  }, [pathname]);

  // ✅ 2. In-Page Push (after 8–10 seconds recommended delay)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 8-10 seconds timing (9000ms optimal average for highest engagement without bounce)
    const pushTimer = setTimeout(() => {
      // Zone 285853 (In-Page Push / MultiTag)
      loadScript('monetag-multitag-285853', (s) => {
        s.src = 'https://quge5.com/88/tag.min.js';
        s.dataset.zone = '285853';
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
      });

      // Zone 11880194 (Smart Tag)
      loadScript('monetag-smarttag-11880194', (s) => {
        s.src = 'https://5gvci.com/act/files/tag.min.js?z=11880194';
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
      });
    }, 9000); // 8-10 seconds

    // Baseline Popunder / Direct Tag - Zone 11880195
    const baselineTimer = setTimeout(() => {
      loadScript('monetag-popunder-11880195', (s) => {
        s.dataset.zone = '11880195';
        s.src = 'https://nap5k.com/tag.min.js';
        s.async = true;
      });
    }, 4000);

    return () => {
      clearTimeout(pushTimer);
      clearTimeout(baselineTimer);
    };
  }, []);

  return (
    <MonetagContext.Provider value={{ hasVignetteFired: !canShowVignette() }}>
      {children}
    </MonetagContext.Provider>
  );
}
