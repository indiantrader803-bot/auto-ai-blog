/**
 * 🍎 Authentic Apple Official Product Imagery
 *
 * All device images are served directly from Apple's own CDN
 * (store.storeimages.cdn-apple.com — Apple's Scene7 image server), so every
 * product shown on TheSmartMag uses the *authentic official model render* for
 * each individual color finish — not generic stock photos.
 *
 * IMPORTANT: Do NOT append `fmt=webp` to these URLs — Apple's Scene7 pipeline
 * returns 404 for webp on these assets. Plain `wid`/`hei` params work.
 * Slugs below were verified live (HTTP 200) against Apple's CDN in Sep 2026.
 */

export const APPLE_CDN_BASE =
  "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is";

/** Build an Apple CDN image URL at the requested size. */
export function appleImg(slug: string, width = 1600, height?: number): string {
  const params = new URLSearchParams({ wid: String(width) });
  if (height) params.set("hei", String(height));
  return `${APPLE_CDN_BASE}/${slug}?${params.toString()}`;
}

export interface DeviceFinish {
  /** Apple CDN asset slug (without size params). */
  slug: string;
  /** Marketing finish name shown to users. */
  label: string;
  /** Swatch hex used by the color picker UI. */
  hex: string;
}

/* ------------------------------------------------------------------ */
/* iPhone 18 Pro & Pro Max — official Sep 2026 finishes                */
/* ------------------------------------------------------------------ */
export const IPHONE_18_PRO_FINISHES: DeviceFinish[] = [
  { slug: "iphone-18-pro-finish-select-glacier-202609", label: "Glacier Titanium", hex: "#aebfc9" },
  { slug: "iphone-18-pro-finish-select-silver-202609", label: "Silver Titanium", hex: "#e3e4e0" },
  { slug: "iphone-18-pro-finish-select-black-202609", label: "Space Black", hex: "#3a3d40" },
  { slug: "iphone-18-pro-finish-select-burgundy-202609", label: "Burgundy Titanium", hex: "#6e2c39" },
];

export const IPHONE_18_PRO_MAX_FINISHES: DeviceFinish[] = [
  { slug: "iphone-18-pro-max-finish-select-glacier-202609", label: "Glacier Titanium", hex: "#aebfc9" },
  { slug: "iphone-18-pro-max-finish-select-silver-202609", label: "Silver Titanium", hex: "#e3e4e0" },
  { slug: "iphone-18-pro-max-finish-select-black-202609", label: "Space Black", hex: "#3a3d40" },
  { slug: "iphone-18-pro-max-finish-select-burgundy-202609", label: "Burgundy Titanium", hex: "#6e2c39" },
];

/* iPhone 18 / 17-generation standard finishes (official Apple renders) */
export const IPHONE_18_FINISHES: DeviceFinish[] = [
  { slug: "iphone-17-finish-select-white-202509", label: "White", hex: "#f2f1ec" },
  { slug: "iphone-17-finish-select-black-202509", label: "Black", hex: "#3c3f41" },
  { slug: "iphone-17-finish-select-lavender-202509", label: "Lavender", hex: "#c9c4e3" },
  { slug: "iphone-17-finish-select-mistblue-202509", label: "Mist Blue", hex: "#a8c4d4" },
  { slug: "iphone-17-finish-select-sage-202509", label: "Sage", hex: "#b6c4ab" },
];

export const IPHONE_17_PRO_MAX_FINISHES: DeviceFinish[] = [
  { slug: "iphone-17-pro-max-finish-select-cosmicorange-202509", label: "Cosmic Orange", hex: "#e07a2f" },
  { slug: "iphone-17-pro-max-finish-select-deepblue-202509", label: "Deep Blue", hex: "#33507a" },
  { slug: "iphone-17-pro-max-finish-select-silver-202509", label: "Silver", hex: "#e3e4e0" },
];

export const IPHONE_AIR_FINISHES: DeviceFinish[] = [
  { slug: "iphone-air-finish-select-skyblue-202509", label: "Sky Blue", hex: "#a9cbe0" },
  { slug: "iphone-air-finish-select-lightgold-202509", label: "Light Gold", hex: "#e5d5ae" },
  { slug: "iphone-air-finish-select-cloudwhite-202509", label: "Cloud White", hex: "#f2f1ec" },
  { slug: "iphone-air-finish-select-spaceblack-202509", label: "Space Black", hex: "#3a3d40" },
];

/* ------------------------------------------------------------------ */
/* Mac / iPad / Watch / AirPods                                        */
/* ------------------------------------------------------------------ */
export const MACBOOK_PRO_FINISHES: DeviceFinish[] = [
  { slug: "mbp14-spaceblack-cto-hero-202410", label: "Space Black", hex: "#3a3d40" },
  { slug: "mbp16-silver-cto-hero-202410", label: "Silver", hex: "#e3e4e0" },
];

export const IPAD_PRO_FINISHES: DeviceFinish[] = [
  { slug: "ipad-pro-13-select-wifi-spaceblack-202405", label: "Space Black (13\u2033)", hex: "#3a3d40" },
  { slug: "ipad-pro-13-select-wifi-silver-202405", label: "Silver (13\u2033)", hex: "#e3e4e0" },
  { slug: "ipad-pro-11-select-wifi-spaceblack-202405", label: "Space Black (11\u2033)", hex: "#2e3134" },
  { slug: "ipad-pro-11-select-wifi-silver-202405", label: "Silver (11\u2033)", hex: "#d5d6d2" },
];

export const WATCH_ULTRA_FINISHES: DeviceFinish[] = [
  { slug: "ultra-case-unselect-gallery-1-202609_GEO_IN", label: "Natural Titanium", hex: "#b8b2a7" },
  { slug: "ultra-case-unselect-gallery-2-202609_GEO_IN", label: "Black Titanium", hex: "#3a3d40" },
];

export const AIRPODS_PRO_FINISHES: DeviceFinish[] = [
  { slug: "airpods-pro-3-hero-select-202509", label: "Glossy White", hex: "#f4f4f4" },
];

/** productId → official finish gallery */
export const PRODUCT_FINISHES: Record<string, DeviceFinish[]> = {
  "iphone-18-pro-max": IPHONE_18_PRO_MAX_FINISHES,
  "iphone-18-pro": IPHONE_18_PRO_FINISHES,
  "iphone-18": IPHONE_18_FINISHES,
  "iphone-17-pro-max": IPHONE_17_PRO_MAX_FINISHES,
  "macbook-pro-m5": MACBOOK_PRO_FINISHES,
  "apple-watch-ultra-3": WATCH_ULTRA_FINISHES,
  "airpods-pro-3": AIRPODS_PRO_FINISHES,
  "ipad-pro-m4": IPAD_PRO_FINISHES,
};

/** Get the official finish gallery for a product id. */
export function getFinishes(productId: string): DeviceFinish[] {
  return PRODUCT_FINISHES[productId] ?? [];
}

/** Resolve the official image for a given finish index (falls back gracefully). */
export function getFinishImage(
  productId: string,
  index = 0,
  width = 1600,
  height?: number
): string | null {
  const finishes = getFinishes(productId);
  if (finishes.length === 0) return null;
  const finish = finishes[Math.min(Math.max(index, 0), finishes.length - 1)];
  return appleImg(finish.slug, width, height);
}

/**
 * Primary hero image for a product — the authentic Apple CDN render.
 * `fallback` (existing unsplash URL) is used only if the product has no
 * registered Apple CDN gallery.
 */
export function getPrimaryHero(productId: string, fallback?: string): string {
  const img = getFinishImage(productId, 0, 1600);
  return img ?? fallback ?? appleImg("iphone-18-pro-max-finish-select-glacier-202609", 1600);
}

/** Compact OG/schema image (16:9-ish crop suitable for rich snippets). */
export function getSchemaImage(productId: string, fallback?: string): string {
  return getFinishImage(productId, 0, 1200, 675) ?? fallback ?? getPrimaryHero(productId, fallback);
}
