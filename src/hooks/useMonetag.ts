'use client';

import { useEffect, useState } from 'react';
import { canShowVignette, markVignetteShown, trackAdEvent } from '@/lib/monetag';

export function useMonetag() {
  const [isVignetteReady, setIsVignetteReady] = useState(false);

  useEffect(() => {
    // Only arm vignette on client after initial render & user interaction
    if (typeof window === 'undefined') return;

    if (canShowVignette()) {
      setIsVignetteReady(true);
    }
  }, []);

  const triggerVignette = () => {
    if (isVignetteReady && canShowVignette()) {
      markVignetteShown();
      setIsVignetteReady(false);
      trackAdEvent('monetag_vignette_show');
    }
  };

  return {
    isVignetteReady,
    triggerVignette,
  };
}
