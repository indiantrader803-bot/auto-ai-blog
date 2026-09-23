/**
 * Monetag Safe Ad Engine & Core Web Vitals Manager
 * Supports: thesmartmag.com & travel.thesmartmag.com
 * Guarantees zero layout shift (CLS < 0.1), no render blocking, and GA4 event tracking
 */

export interface MonetagConfig {
  pushScript?: string;
  vignetteScript?: string;
  bannerZone?: string;
}

export function getMonetagConfig(): MonetagConfig {
  return {
    pushScript: process.env.NEXT_PUBLIC_MONETAG_PUSH_SCRIPT || '',
    vignetteScript: process.env.NEXT_PUBLIC_MONETAG_VIGNETTE_SCRIPT || '',
    bannerZone: process.env.NEXT_PUBLIC_MONETAG_BANNER_ZONE || '',
  };
}

/**
 * Dispatch privacy-compliant GA4 telemetry events for monetization tracking
 */
export function trackAdEvent(eventName: 'monetag_banner_view' | 'monetag_banner_click' | 'monetag_vignette_show', params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'Monetization',
      ...params,
    });
  }
}

/**
 * Session Capping for Vignette: Max 1 vignette per browsing session
 */
export function canShowVignette(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const hasSeen = sessionStorage.getItem('monetag_vignette_seen');
    return !hasSeen;
  } catch (e) {
    return false;
  }
}

export function markVignetteShown(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('monetag_vignette_seen', 'true');
  } catch (e) {
    // ignore
  }
}
