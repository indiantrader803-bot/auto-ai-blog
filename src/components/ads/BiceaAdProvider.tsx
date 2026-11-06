'use client';

import React, { createContext, useContext, useEffect } from 'react';

interface BiceaAdContextType {
  isTravelZone: boolean;
  isBotOrAdmin: boolean;
  smartlinkUrl: string;
}

const BiceaAdContext = createContext<BiceaAdContextType>({
  isTravelZone: false,
  isBotOrAdmin: false,
  smartlinkUrl: '',
});

export const useBiceaAds = () => useContext(BiceaAdContext);

/**
 * Clean ad provider stub.
 * All intrusive popunder, click-redirect, and socialbar scripts (afders.org, bicea.org, arwf.org)
 * have been permanently removed from the entire website (Blog, Store, Travel).
 * Google AdSense and clean contextual banners remain as the sanctioned ad formats.
 */
export default function BiceaAdProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Actively purge any leftover rogue popunder/click-redirect scripts or elements from the DOM
    try {
      const rogueScripts = document.querySelectorAll(
        'script[src*="afders.org"], script[src*="bicea.org"], script[src*="arwf.org"], [data-ad-network="bicea"]'
      );
      rogueScripts.forEach((el) => el.remove());
    } catch (_) {}
  }, []);

  return (
    <BiceaAdContext.Provider
      value={{
        isTravelZone: false,
        isBotOrAdmin: false,
        smartlinkUrl: '',
      }}
    >
      {children}
    </BiceaAdContext.Provider>
  );
}
