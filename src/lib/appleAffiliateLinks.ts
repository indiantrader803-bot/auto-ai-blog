/**
 * 💰 Central Apple-hub affiliate link builder — THE MONEY LINKS.
 *
 * Every outbound buy button on the Apple hub must go through these helpers so
 * the site owner earns commission on every purchase. Configure once via env:
 *
 *  - AMAZON_ASSOCIATE_TAG / NEXT_PUBLIC_AMAZON_TAG → Amazon Associates tag
 *    (default "autoaiblog-21", already wired into lib/affiliate/links.ts)
 *  - FLIPKART_AFFILIATE_ID / NEXT_PUBLIC_FLIPKART_AFFILIATE_ID → Flipkart
 *    affiliate id (appended as &affid= on Flipkart URLs)
 *  - CUELINKS_CAMPAIGN_ID / NEXT_PUBLIC_CUELINKS_CAMPAIGN_ID → Cuelinks
 *    campaign id. When set, Croma / Reliance Digital / Vijay Sales / Flipkart
 *    links are wrapped in the Cuelinks link-redirect gateway (Cuelinks
 *    monetises all of these stores under one campaign).
 *
 * NOTE: prefer the NEXT_PUBLIC_ variants when configuring — these helpers run
 * in both server and client bundles (client components import product data),
 * and non-public env vars are stripped from the client bundle. Using
 * NEXT_PUBLIC_ guarantees the affiliate tags survive client-side hydration.
 *
 * If a network id is not configured the raw retailer URL is returned, so the
 * site never ships dead links.
 */

export const APPLE_AFFILIATE_IDS = {
  amazonTag:
    process.env.NEXT_PUBLIC_AMAZON_TAG ||
    process.env.AMAZON_ASSOCIATE_TAG ||
    "autoaiblog-21",
  flipkartAffId:
    process.env.NEXT_PUBLIC_FLIPKART_AFFILIATE_ID ||
    process.env.FLIPKART_AFFILIATE_ID ||
    "",
  cuelinksCampaignId:
    process.env.NEXT_PUBLIC_CUELINKS_CAMPAIGN_ID ||
    process.env.CUELINKS_CAMPAIGN_ID ||
    "",
};

export type AppleRetailerName =
  | "Amazon"
  | "Flipkart"
  | "Croma"
  | "Reliance Digital"
  | "Vijay Sales"
  | "Apple Store"
  | string;

function addUtm(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "thesmartmag");
    u.searchParams.set("utm_medium", "affiliate");
    u.searchParams.set("utm_campaign", "apple-hub");
    return u.toString();
  } catch {
    return url;
  }
}

/** Wrap a retailer URL in the Cuelinks redirect gateway (if configured). */
function wrapCuelinks(url: string): string {
  const cid = APPLE_AFFILIATE_IDS.cuelinksCampaignId;
  if (!cid) return url;
  return `https://linksredirect.com/?cid=${encodeURIComponent(
    cid
  )}&source=linkkit&url=${encodeURIComponent(url)}`;
}

/**
 * Tag a single retailer URL with the correct affiliate identifiers.
 * Safe to call on already-tagged URLs (idempotent for the `tag` param).
 */
export function tagAffiliateUrl(
  url: string,
  store: AppleRetailerName
): string {
  if (!url) return url;

  try {
    const u = new URL(url);

    if (store === "Amazon" || /amazon\./i.test(u.hostname)) {
      u.searchParams.set("tag", APPLE_AFFILIATE_IDS.amazonTag);
      u.searchParams.set("linkCode", "ogi");
      u.searchParams.set("th", "1");
      return addUtm(u.toString());
    }

    if (store === "Flipkart" || /flipkart\./i.test(u.hostname)) {
      if (APPLE_AFFILIATE_IDS.flipkartAffId) {
        u.searchParams.set("affid", APPLE_AFFILIATE_IDS.flipkartAffId);
      }
      const tagged = u.toString();
      // Flipkart pays via affiliate networks — route through Cuelinks when set.
      return addUtm(wrapCuelinks(tagged));
    }

    // Croma / Reliance Digital / Vijay Sales: monetised via Cuelinks.
    if (
      store === "Croma" ||
      store === "Reliance Digital" ||
      store === "Vijay Sales"
    ) {
      return addUtm(wrapCuelinks(url));
    }

    return addUtm(url);
  } catch {
    return url;
  }
}

interface TaggableRetailer {
  store: string;
  affiliateUrl: string;
}

/** Map an array of retailer offers through the affiliate tagger. */
export function tagRetailerList<T extends TaggableRetailer>(
  retailers: T[]
): T[] {
  return retailers.map((r) => ({
    ...r,
    affiliateUrl: tagAffiliateUrl(r.affiliateUrl, r.store),
  }));
}
