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

  // Disable ALL ads entirely inside admin dashboard
  const isAdmin = pathname?.startsWith('/admin');

  // ✅ 1. Vignette when opening another article (e.g. /blog/...)
  useEffect(() => {
    if (typeof window === 'undefined' || !pathname || isAdmin) return;

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
  }, [pathname, isAdmin]);

  // Clean-up any intrusive popups/push if on admin or non-consented pages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isAdmin) {
      // Remove any previously injected monetag scripts from admin DOM
      const adElements = document.querySelectorAll('[id^="monetag-"]');
      adElements.forEach((el) => el.remove());
    }
  }, [pathname, isAdmin]);

  return (
    <MonetagContext.Provider value={{ hasVignetteFired: !canShowVignette() }}>
      {children}
    </MonetagContext.Provider>
  );
}
