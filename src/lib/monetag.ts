/**
 * Monetag scripts and tracking have been completely disabled and removed.
 */
export const MONETAG_CONFIG = {
  enabled: false,
};

export function trackAdEvent(_eventName: string, _params?: Record<string, any>) {
  // Disabled
}

export function canShowVignette(): boolean {
  return false;
}

export function markVignetteShown(): void {
  // Disabled
}
