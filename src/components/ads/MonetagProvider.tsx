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

  return (
    <MonetagContext.Provider value={{ hasVignetteFired: !canShowVignette() }}>
      {children}
    </MonetagContext.Provider>
  );
}
