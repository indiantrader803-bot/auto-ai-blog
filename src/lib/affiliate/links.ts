/**
 * Centralized Affiliate & Booking Deep URL Generator
 * Automatically maps user search queries, cities, dates, passenger counts,
 * and passes granular parameters to affiliate engines so users land directly
 * on exact search results instead of generic landing pages.
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
  }
};

/**
 * 🛫 Global Airport IATA Code Mapping Dictionary
 */
export const IATA_MAP: Record<string, string> = {
  // India
  delhi: "DEL",
  newdelhi: "DEL",
  mumbai: "BOM",
  bombay: "BOM",
  kolkata: "CCU",
  calcutta: "CCU",
  bangalore: "BLR",
  bengaluru: "BLR",
  chennai: "MAA",
  madras: "MAA",
  hyderabad: "HYD",
  ahmedabad: "AMD",
  pune: "PNQ",
  chandigarh: "IXC",
  jaipur: "JAI",
  lucknow: "LKO",
  kochi: "COK",
  cochin: "COK",
  goa: "GOI",
  mopa: "GOX",
  manali: "KUU",
  kullu: "KUU",
  bhuntar: "KUU",
  srinagar: "SXR",
  kashmir: "SXR",
  leh: "IXL",
  ladakh: "IXL",
  varanasi: "VNS",
  amritsar: "ATQ",
  guwahati: "GAU",
  bagdogra: "IXB",
  bhubaneswar: "BBI",
  patna: "PAT",
  indore: "IDR",
  nagpur: "NAG",
  trivandrum: "TRV",
  thiruvananthapuram: "TRV",
  calicut: "CCJ",
  kozhikode: "CCJ",
  dehradun: "DED",
  rishikesh: "DED",
  shimla: "SLV",
  dharamsala: "DHM",
  kangra: "DHM",

  // International
  dubai: "DXB",
  abudhabi: "AUH",
  sharjah: "SHJ",
  tokyo: "HND",
  narita: "NRT",
  osaka: "KIX",
  kyoto: "ITM",
  bangkok: "BKK",
  phuket: "HKT",
  bali: "DPS",
  denpasar: "DPS",
  singapore: "SIN",
  kualalumpur: "KUL",
  male: "MLE",
  maldives: "MLE",
  london: "LHR",
  gatwick: "LGW",
  newyork: "JFK",
  nyc: "JFK",
  newark: "EWR",
  sanfrancisco: "SFO",
  losangeles: "LAX",
  chicago: "ORD",
  paris: "CDG",
  zurich: "ZRH",
  geneva: "GVA",
  rome: "FCO",
  milan: "MXP",
  frankfurt: "FRA",
  munich: "MUC",
  amsterdam: "AMS",
  toronto: "YYZ",
  vancouver: "YVR",
  sydney: "SYD",
  melbourne: "MEL",
  auckland: "AKL",
  doha: "DOH",
  riyadh: "RUH",
  jeddah: "JED",
  colombo: "CMB",
  kathmandu: "KTM",
  hanoii: "HAN",
  saigon: "SGN",
  hochiminh: "SGN",
  seoul: "ICN",
  incheon: "ICN",
};

/**
 * Resolve city name or query string to a valid 3-letter IATA Airport Code
 */
export function resolveIataCode(input: string, fallback = "DEL"): string {
  if (!input) return fallback;
  const upperMatch = input.match(/\b([A-Z]{3})\b/);
  if (upperMatch && upperMatch[1]) return upperMatch[1];
  
  const clean = input.toLowerCase().replace(/[^a-z]/g, "");
  for (const [key, code] of Object.entries(IATA_MAP)) {
    if (clean.includes(key)) {
      return code;
    }
  }
  return fallback;
}

export interface HotelSearchParams {
  destination?: string;
  checkin?: string; // YYYY-MM-DD
  checkout?: string; // YYYY-MM-DD
  adults?: number;
  rooms?: number;
}

/**
 * Generate Deep Booking.com Hotel Search URL with exact destination, dates & guest count
 */
export function getBookingHotelUrl(param?: string | HotelSearchParams): string {
  const aid = AFFILIATE_CONFIG.bookingComAid;
  if (!param) {
    return `https://www.booking.com/index.html?aid=${aid}`;
  }

  if (typeof param === "string") {
    const cleanDest = encodeURIComponent(param.trim());
    return `https://www.booking.com/searchresults.html?ss=${cleanDest}&aid=${aid}`;
  }

  const { destination = "Manali", checkin, checkout, adults = 2, rooms = 1 } = param;
  const cleanDest = encodeURIComponent(destination.trim());
  let url = `https://www.booking.com/searchresults.html?ss=${cleanDest}&aid=${aid}&group_adults=${adults}&no_rooms=${rooms}`;

  if (checkin && checkout) {
    url += `&checkin=${checkin}&checkout=${checkout}`;
  }
  return url;
}

/**
 * Generate Deep Agoda Hotel Search URL with exact destination, dates & guest count
 */
export function getAgodaHotelUrl(param?: string | HotelSearchParams): string {
  const cid = AFFILIATE_CONFIG.agodaCid;
  if (!param) {
    return `https://www.agoda.com/partners/partnersearch.aspx?cid=${cid}`;
  }

  if (typeof param === "string") {
    const cleanDest = encodeURIComponent(param.trim());
    return `https://www.agoda.com/search?city=${cleanDest}&cid=${cid}`;
  }

  const { destination = "Goa", checkin, checkout, adults = 2, rooms = 1 } = param;
  const cleanDest = encodeURIComponent(destination.trim());
  let url = `https://www.agoda.com/search?city=${cleanDest}&cid=${cid}&adults=${adults}&rooms=${rooms}`;

  if (checkin && checkout) {
    url += `&checkIn=${checkin}&checkOut=${checkout}`;
  }
  return url;
}

export interface FlightSearchParams {
  origin?: string;
  destination?: string;
  departDate?: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  adults?: number;
  isRoundTrip?: boolean;
}

/**
 * Generate Deep Aviasales / Travelpayouts Flight Search URL with exact Origin, Destination, Dates & Adults
 */
export function getAviasalesFlightUrl(param?: string | FlightSearchParams): string {
  const marker = AFFILIATE_CONFIG.travelpayoutsMarker;
  
  if (!param) {
    return `https://aviasales.tpo.li/ZeF7BjUt?marker=${marker}`;
  }

  if (typeof param === "string") {
    const destIata = resolveIataCode(param, "GOI");
    return `https://aviasales.tpo.li/ZeF7BjUt?marker=${marker}&destination=${destIata}&adults=2`;
  }

  const { origin = "DEL", destination = "GOI", departDate, returnDate, adults = 2, isRoundTrip = true } = param;
  const originIata = resolveIataCode(origin, "DEL");
  const destIata = resolveIataCode(destination, "GOI");

  let url = `https://aviasales.tpo.li/ZeF7BjUt?marker=${marker}&origin=${originIata}&destination=${destIata}&adults=${adults}`;
  if (departDate) url += `&depart_date=${departDate}`;
  if (isRoundTrip && returnDate) url += `&return_date=${returnDate}`;

  return url;
}

export interface KlookSearchParams {
  destination?: string;
  query?: string;
  activity?: string;
}

/**
 * Generate Klook Attractions, Activities & Passes Deep Affiliate Search URL
 */
export function getKlookUrl(param?: string | KlookSearchParams): string {
  const { campaignId, marker, p, trs } = {
    campaignId: AFFILIATE_CONFIG.klook.campaignId,
    marker: AFFILIATE_CONFIG.klook.marker,
    p: AFFILIATE_CONFIG.klook.promoId,
    trs: AFFILIATE_CONFIG.klook.trs,
  };

  let searchQuery = "attractions passes tickets";
  if (typeof param === "string") {
    searchQuery = param.trim();
  } else if (param) {
    searchQuery = `${param.destination || ""} ${param.activity || param.query || "attractions activities"}`.trim();
  }

  const targetKlook = `https://www.klook.com/search?query=${encodeURIComponent(searchQuery)}`;
  return `https://tp.media/r?campaign_id=${campaignId}&marker=${marker}&p=${p}&trs=${trs}&u=${encodeURIComponent(targetKlook)}`;
}

export interface TransferSearchParams {
  from?: string;
  to?: string;
  date?: string;
  passengers?: number;
}

/**
 * Generate Deep GetTransfer Airport Taxi & Chauffeur URL
 */
export function getGetTransferUrl(param?: string | TransferSearchParams): string {
  if (!param) return `https://gettransfer.tpo.li/yE0Wk8xK`;
  
  if (typeof param === "string") {
    return `https://gettransfer.tpo.li/yE0Wk8xK?from=${encodeURIComponent(param)}`;
  }

  const { from = "Airport", to = "Hotel", date, passengers = 2 } = param;
  let url = `https://gettransfer.tpo.li/yE0Wk8xK?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&pax=${passengers}`;
  if (date) url += `&date=${date}`;
  return url;
}

/**
 * Generate Saily 5G Global eSIM Deep Destination URL
 */
export function getSailyEsimUrl(countryOrRegion = "global"): string {
  const clean = encodeURIComponent(countryOrRegion.trim().toLowerCase());
  return `https://saily.tpo.li/9kXyVV0E?country=${clean}`;
}

/**
 * Generate AirHelp €600 Flight Delay Claim URL
 */
export function getAirHelpUrl(options?: { departure?: string; arrival?: string; airline?: string }): string {
  if (!options) return `https://airhelp.tpo.li/fpMMLvXF`;
  const dep = resolveIataCode(options.departure || "DEL");
  const arr = resolveIataCode(options.arrival || "LHR");
  return `https://airhelp.tpo.li/fpMMLvXF?departure=${dep}&arrival=${arr}`;
}

/**
 * Generate EconomyBookings Worldwide Car Rental URL
 */
export function getEconomyBookingsUrl(options?: { location?: string; pickDate?: string; dropDate?: string }): string {
  if (!options) return `https://economybookings.tpo.li/fbYsWyaE`;
  const loc = encodeURIComponent(options.location || "Airport");
  let url = `https://economybookings.tpo.li/fbYsWyaE?pick_up=${loc}`;
  if (options.pickDate) url += `&pick_date=${options.pickDate}`;
  if (options.dropDate) url += `&drop_date=${options.dropDate}`;
  return url;
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
 * Generate Coupert cashback and coupon referral URL
 */
export function getCoupertUrl(): string {
  return AFFILIATE_CONFIG.coupert.url;
}

/**
 * Generate Monetag publisher referral link
 */
export function getMonetagUrl(): string {
  return process.env.NEXT_PUBLIC_MONETAG_REFERRAL_URL || process.env.MONETAG_REFERRAL_URL || "https://monetag.com/?ref_id=e703";
}


