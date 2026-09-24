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
  const vignetteScriptUrl = process.env.NEXT_PUBLIC_MONETAG_VIGNETTE_SCRIPT;

  // Track route changes for vignette capping
  useEffect(() => {
    // Only fire vignette after navigating away from landing page
    if (typeof window !== 'undefined' && pathname && pathname !== '/') {
      if (canShowVignette() && vignetteScriptUrl) {
        markVignetteShown();
        trackAdEvent('monetag_vignette_show', { page: pathname });
      }
    }
  }, [pathname, vignetteScriptUrl]);

  // Safely inject all 4 Monetag ad network zones post-hydration (zero hydration errors, 24/7 uptime)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadScript = (id: string, setup: (script: HTMLScriptElement) => void) => {
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

    // 1. Monetag Vignette - Zone 11802121
    loadScript('monetag-vignette-11802121', (s) => {
      s.dataset.zone = '11802121';
      s.src = 'https://n6wxm.com/vignette.min.js';
      s.async = true;
    });

    // 2. Monetag MultiTag / In-Page Push - Zone 285853
    loadScript('monetag-multitag-285853', (s) => {
      s.src = 'https://quge5.com/88/tag.min.js';
      s.dataset.zone = '285853';
      s.async = true;
      s.setAttribute('data-cfasync', 'false');
    });

    // 3. Monetag Smart Tag - Zone 11880194
    loadScript('monetag-smarttag-11880194', (s) => {
      s.src = 'https://5gvci.com/act/files/tag.min.js?z=11880194';
      s.async = true;
      s.setAttribute('data-cfasync', 'false');
    });

    // 4. Monetag Popunder / Direct Tag - Zone 11880195
    loadScript('monetag-popunder-11880195', (s) => {
      s.dataset.zone = '11880195';
      s.src = 'https://nap5k.com/tag.min.js';
      s.async = true;
    });
  }, []);

  return (
    <MonetagContext.Provider value={{ hasVignetteFired: !canShowVignette() }}>
      {children}
    </MonetagContext.Provider>
  );
}
