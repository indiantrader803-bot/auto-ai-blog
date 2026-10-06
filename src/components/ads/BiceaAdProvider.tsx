'use client';

import React, { useEffect, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

interface BiceaAdContextType {
  isTravelZone: boolean;
  isBotOrAdmin: boolean;
  smartlinkUrl: string;
}

const BiceaAdContext = createContext<BiceaAdContextType>({
  isTravelZone: false,
  isBotOrAdmin: false,
  smartlinkUrl: 'https://arwf.org/4/4d6a9b34f2e412f3a9f9cf6f6de470d6',
});

export const useBiceaAds = () => useContext(BiceaAdContext);

/**
 * Bicea & Adsterra network scripts & ad provider.
 * Automatically switches between:
 * - Main website (thesmartmag.com)
 * - Travel website (/travel or travel.thesmartmag.com)
 * Completely excludes search engine bots/crawlers and admin dashboard (/admin) for SEO safety.
 */
export default function BiceaAdProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. Identify Admin & Bot / Crawler status
  const isAdmin = pathname?.startsWith('/admin');

  // Detect Travel section via pathname or window hostname
  const isTravel = Boolean(
    pathname?.startsWith('/travel') ||
    (typeof window !== 'undefined' && window.location.hostname.startsWith('travel.'))
  );

  const smartlinkUrl = isTravel
    ? 'https://arwf.org/4/acd6acc0fcab49c1836945b9616a4f6b'
    : 'https://arwf.org/4/4d6a9b34f2e412f3a9f9cf6f6de470d6';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Never execute intrusive scripts on Admin route
    if (isAdmin) {
      // Remove any previously injected bicea/adsterra scripts from admin DOM
      const existing = document.querySelectorAll('[data-ad-network="bicea"]');
      existing.forEach((el) => el.remove());
      return;
    }

    // Never inject intrusive scripts for search engine crawlers, Googlebot, etc.
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|mediapartners-google|lighthouse|inspectiontool/i.test(
      navigator.userAgent || ''
    );
    if (isBot) return;

    // Helper to inject script once
    const injectScript = (id: string, src: string, async: boolean = true) => {
      if (document.getElementById(id)) return;
      try {
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = async;
        script.dataset.adNetwork = 'bicea';
        document.body.appendChild(script);
      } catch (err) {
        console.warn(`[BiceaAdProvider] Failed to inject ${id}:`, err);
      }
    };

    if (isTravel) {
      // Travel website ad scripts:
      // Popunder
      injectScript('bicea-travel-popunder', 'https://afders.org/1/1410c00c8145665ea2fafeaae176bbf0');
      // SocialBar
      injectScript('bicea-travel-socialbar', 'https://bicea.org/14/588720f5c6838af13269ef2995ea371c');
    } else {
      // Main website ad scripts:
      // Popunder
      injectScript('bicea-main-popunder', 'https://afders.org/1/f78be5f1da5bdfce4253f0365da8b9af');
      // SocialBar
      injectScript('bicea-main-socialbar', 'https://bicea.org/14/25173f9225af4120f67fe4dd9bd3718a');
    }
  }, [pathname, isAdmin, isTravel]);

  return (
    <BiceaAdContext.Provider
      value={{
        isTravelZone: isTravel,
        isBotOrAdmin: Boolean(isAdmin),
        smartlinkUrl,
      }}
    >
      {children}
    </BiceaAdContext.Provider>
  );
}
