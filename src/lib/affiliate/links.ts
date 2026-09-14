/**
 * Centralized Affiliate & Booking URL Generator
 * Allows dynamic configuration via environment variables or dashboard settings.
 */

export const AFFILIATE_CONFIG = {
  bookingComAid: process.env.BOOKING_COM_AID || process.env.NEXT_PUBLIC_BOOKING_AID || "2026803",
  agodaCid: process.env.AGODA_CID || process.env.NEXT_PUBLIC_AGODA_CID || "1894212",
  amazonAssociateTag: process.env.AMAZON_ASSOCIATE_TAG || process.env.NEXT_PUBLIC_AMAZON_TAG || "autoaiblog-21",
  travelpayoutsMarker: process.env.TRAVELPAYOUTS_MARKER || "573790",
  klook: {
    campaignId: process.env.KLOOK_CAMPAIGN_ID || "137",
    marker: process.env.KLOOK_MARKER || "777349",
    trs: process.env.KLOOK_TRS || "573790",
    promoId: "4110",
    defaultUrl: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573790&u=https%3A%2F%2Fklook.com",
  },
  propFirms: {
    ftm: {
      url: "https://fundedtradermarkets.com/ref/arnab",
      promoCode: "arnab",
      payoutSplit: "Up to 90%",
    },
    atlasFunded: {
      url: "https://affiliates.atlasfunded.com/Tracking/click/?affid=12275&campaign=11320&product_id=1&t_type=Register&t_lang=EN",
      promoCode: "12275",
      payoutSplit: "85% - 90%",
    },
    pocketOption: {
      url: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
      promoCode: "50START",
      payoutSplit: "Up to 96%",
    },
    aquaFunded: {
      url: "https://www.aquafunded.com/?afmc=6e9",
      promoCode: "6e9",
      payoutSplit: "90%",
    }
  },
  coupert: {
    url: process.env.COUPERT_AFFILIATE_URL || "https://www.coupert.com/?invite_code=EA59BA&inviter_source=web5",
    inviteCode: "EA59BA",
    bonus: "$20 Welcome Cashback + Auto Coupons",
  },
  monetag: {
    url: process.env.MONETAG_REF_URL || "https://monetag.com/?ref_id=tJVZ",
    refId: "tJVZ",
    tagZoneId: "11802110",
    swZoneId: "11802075",
    description: "High-eCPM multi-format monetization network for publishers & website owners",
  }
};

/**
 * Generate Booking.com hotel affiliate URL
 */
export function getBookingHotelUrl(destination?: string): string {
  const aid = AFFILIATE_CONFIG.bookingComAid;
  if (!destination) {
    return `https://www.booking.com/index.html?aid=${aid}`;
  }
  const cleanDest = encodeURIComponent(destination.trim().toLowerCase());
  return `https://www.booking.com/searchresults.html?ss=${cleanDest}&aid=${aid}`;
}

/**
 * Generate Agoda hotel affiliate URL
 */
export function getAgodaHotelUrl(destination?: string): string {
  const cid = AFFILIATE_CONFIG.agodaCid;
  if (!destination) {
    return `https://www.agoda.com/partners/partnersearch.aspx?cid=${cid}`;
  }
  const cleanDest = encodeURIComponent(destination.trim().toLowerCase());
  return `https://www.agoda.com/search?city=${cleanDest}&cid=${cid}`;
}

/**
 * Generate Klook Attractions, Activities & Tours Affiliate URL (Travelpayouts Campaign 137)
 */
export function getKlookUrl(destinationOrActivity?: string): string {
  const { campaignId, marker, p, trs } = {
    campaignId: AFFILIATE_CONFIG.klook.campaignId,
    marker: AFFILIATE_CONFIG.klook.marker,
    p: AFFILIATE_CONFIG.klook.promoId,
    trs: AFFILIATE_CONFIG.klook.trs,
  };

  if (!destinationOrActivity || destinationOrActivity === "all" || destinationOrActivity === "global") {
    return `https://tp.media/r?campaign_id=${campaignId}&marker=${marker}&p=${p}&trs=${trs}&u=https%3A%2F%2Fklook.com`;
  }

  const cleanQuery = encodeURIComponent(destinationOrActivity.trim());
  const targetKlook = `https://www.klook.com/search?query=${cleanQuery}`;
  return `https://tp.media/r?campaign_id=${campaignId}&marker=${marker}&p=${p}&trs=${trs}&u=${encodeURIComponent(targetKlook)}`;
}

/**
 * Generate Travelpayouts affiliate search URL
 */
export function getTravelpayoutsUrl(destination?: string): string {
  const marker = AFFILIATE_CONFIG.travelpayoutsMarker;
  const cleanDest = encodeURIComponent(destination?.trim() || "all");
  return `https://tp.media/r?marker=${marker}&trs=297491&p=4114&u=https%3A%2F%2Fwww.aviasales.com%2Fsearch%3Fdestination%3D${cleanDest}`;
}

/**
 * Generate Amazon affiliate search URL for gear/products
 */
export function getAmazonProductUrl(keyword: string, region: "in" | "com" = "in"): string {
  const tag = AFFILIATE_CONFIG.amazonAssociateTag;
  const cleanKeyword = encodeURIComponent(keyword.trim());
  const domain = region === "in" ? "amazon.in" : "amazon.com";
  return `https://www.${domain}/s?k=${cleanKeyword}&tag=${tag}`;
}

/**
 * Generate Skyscanner flight search URL
 */
export function getFlightSearchUrl(origin = "DEL", destination = "COK"): string {
  return `https://www.skyscanner.com/transport/flights/${origin.toLowerCase()}/${destination.toLowerCase()}/`;
}

/**
 * Generate Coupert cashback and coupon referral URL
 */
export function getCoupertUrl(): string {
  return AFFILIATE_CONFIG.coupert.url;
}

/**
 * Generate Monetag Publisher Referral URL
 */
export function getMonetagUrl(): string {
  return AFFILIATE_CONFIG.monetag.url;
}

