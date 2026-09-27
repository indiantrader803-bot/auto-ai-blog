/**
 * 💰 Client-safe helper: wrap any affiliate URL in the tracked /go gateway.
 *
 * Every buy button uses this so each outbound click is recorded as an
 * AFFILIATE_CLICK event in the database (visible in the admin dashboard).
 *
 * `placement` tells you WHERE the click happened (e.g. "deepdive_hero",
 * "showcase_grid", "sticky_mobile_bar", "deals_page") — great for optimizing
 * which placements convert.
 */
export function goLink(
  affiliateUrl: string,
  opts: { productId: string; store: string; placement: string }
): string {
  if (!affiliateUrl) return "#";
  const params = new URLSearchParams({
    p: opts.productId || "unknown-product",
    s: opts.store || "unknown-store",
    src: opts.placement || "site",
    u: affiliateUrl,
  });
  return `/go?${params.toString()}`;
}
