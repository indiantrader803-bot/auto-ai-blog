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

/**
 * Clean complex travel destination strings (e.g., 'Dubai & Arabian Luxury Desert' -> 'Dubai')
 */
export function cleanDestinationCity(input?: string): string {
  if (!input) return "Dubai";
  
  // Remove parenthesized IATA codes or annotations like (DEL), (DXB)
  let clean = input.replace(/\s*\([A-Za-z0-9\s]+\)/g, "").trim();
  
  // Split on delimiters like &, -, |, or commas
  clean = clean.split(/&| - | \| |,/)[0].trim();
  
  // Remove common promotional suffix words
  clean = clean.replace(/\b(Trip|Tour|Holiday|Vacation|Adventure|Expedition|Experience|Getaway|Luxury|Desert|Backwaters|Mountains|Beaches|Beach|Sightseeing|Resort|Stays|Villas)\b/gi, "").trim();
  
  // Clean double spaces
  clean = clean.replace(/\s+/g, " ").trim();
  
  return clean || input.split(" ")[0] || "Dubai";
}

/**
 * Format YYYY-MM-DD date to Aviasales DDMM format (e.g., '2026-09-22' -> '2209')
 */
export function formatAviasalesDate(dateStr?: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const day = parts[2].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    return `${day}${month}`;
  }
  return "";
}

/**
 * 🏨 Agoda Verified City Slugs Dictionary
 */
export const AGODA_CITY_SLUG_MAP: Record<string, string> = {
  dubai: "dubai-ae",
  uae: "dubai-ae",
  abudhabi: "abu-dhabi-ae",
  goa: "goa-in",
  manali: "manali-in",
  kerala: "kochi-in",
  kochi: "kochi-in",
  cochin: "kochi-in",
  munnar: "munnar-in",
  alleppey: "alleppey-in",
  ladakh: "leh-in",
  leh: "leh-in",
  srinagar: "srinagar-in",
  kashmir: "srinagar-in",
  delhi: "new-delhi-and-ncr-in",
  mumbai: "mumbai-in",
  bombay: "mumbai-in",
  bangalore: "bangalore-in",
  bengaluru: "bangalore-in",
  jaipur: "jaipur-in",
  rajasthan: "jaipur-in",
  udaipur: "udaipur-in",
  varanasi: "varanasi-in",
  paris: "paris-fr",
  tokyo: "tokyo-jp",
  kyoto: "kyoto-jp",
  osaka: "osaka-jp",
  bali: "bali-id",
  denpasar: "bali-id",
  bangkok: "bangkok-th",
  phuket: "phuket-th",
  pattaya: "pattaya-th",
  singapore: "singapore-sg",
  london: "london-gb",
  zurich: "zurich-ch",
  switzerland: "zurich-ch",
  maldives: "male-city-and-airport-mv",
  male: "male-city-and-airport-mv",
  newyork: "new-york-ny-us",
  nyc: "new-york-ny-us",
  sanfrancisco: "san-francisco-ca-us",
  losangeles: "los-angeles-ca-us",
  rome: "rome-it",
  milan: "milan-it",
  amsterdam: "amsterdam-nl",
  sydney: "sydney-au",
  melbourne: "melbourne-au",
  toronto: "toronto-on-ca",
  vancouver: "vancouver-bc-ca",
  doha: "doha-qa",
  hanoi: "hanoi-vn",
  hochiminh: "ho-chi-minh-city-vn",
  seoul: "seoul-kr"
};

/**
 * 📱 Saily Global Country Destination Slugs Dictionary
 */
export const SAILY_COUNTRY_SLUG_MAP: Record<string, string> = {
  dubai: "united-arab-emirates",
  uae: "united-arab-emirates",
  abudhabi: "united-arab-emirates",
  "united arab emirates": "united-arab-emirates",
  india: "india",
  delhi: "india",
  goa: "india",
  manali: "india",
  kerala: "india",
  kochi: "india",
  munnar: "india",
  ladakh: "india",
  leh: "india",
  kashmir: "india",
  srinagar: "india",
  mumbai: "india",
  bangalore: "india",
  jaipur: "india",
  rajasthan: "india",
  japan: "japan",
  tokyo: "japan",
  kyoto: "japan",
  osaka: "japan",
  europe: "europe",
  france: "france",
  paris: "france",
  uk: "united-kingdom",
  england: "united-kingdom",
  london: "united-kingdom",
  "united kingdom": "united-kingdom",
  britain: "united-kingdom",
  indonesia: "indonesia",
  bali: "indonesia",
  ubud: "indonesia",
  thailand: "thailand",
  bangkok: "thailand",
  phuket: "thailand",
  singapore: "singapore",
  switzerland: "switzerland",
  swiss: "switzerland",
  zurich: "switzerland",
  maldives: "maldives",
  male: "maldives",
  usa: "united-states",
  "united states": "united-states",
  america: "united-states",
  newyork: "united-states",
  nyc: "united-states",
  vietnam: "vietnam",
  hanoi: "vietnam",
  turkey: "turkey",
  istanbul: "turkey",
  italy: "italy",
  rome: "italy",
  milan: "italy",
  germany: "germany",
  berlin: "germany",
  spain: "spain",
  barcelona: "spain",
  madrid: "spain",
  canada: "canada",
  toronto: "canada",
  australia: "australia",
  sydney: "australia",
  malaysia: "malaysia",
  kualalumpur: "malaysia",
  greece: "greece",
  athens: "greece",
  egypt: "egypt",
  cairo: "egypt"
};

/**
 * Resolve city / query to an Agoda verified city slug
 */
export function resolveAgodaCitySlug(input?: string): string | null {
  if (!input) return "dubai-ae";
  const clean = input.toLowerCase().replace(/[^a-z]/g, "");
  for (const [key, slug] of Object.entries(AGODA_CITY_SLUG_MAP)) {
    if (clean.includes(key)) {
      return slug;
    }
  }
  return null;
}

/**
 * Resolve destination query to a Saily country slug
 */
export function resolveSailyCountrySlug(input?: string): string | null {
  if (!input) return "united-arab-emirates";
  const clean = input.toLowerCase().replace(/[^a-z]/g, "");
  for (const [key, slug] of Object.entries(SAILY_COUNTRY_SLUG_MAP)) {
    if (clean.includes(key)) {
      return slug;
    }
  }
  return null;
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
    const cleanCity = cleanDestinationCity(param);
    return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(cleanCity)}&aid=${aid}`;
  }

  const { destination = "Dubai", checkin, checkout, adults = 2, rooms = 1 } = param;
  const cleanCity = cleanDestinationCity(destination);
  let url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(cleanCity)}&aid=${aid}&group_adults=${adults}&no_rooms=${rooms}`;

  if (checkin && checkout) {
    url += `&checkin=${checkin}&checkout=${checkout}`;
  }
  return url;
}

/**
 * Generate Deep Agoda Hotel Search URL with exact destination, dates & guest count
 * Uses direct city landing pages for verified destinations, or falls back to partner search.
 */
export function getAgodaHotelUrl(param?: string | HotelSearchParams): string {
  const cid = AFFILIATE_CONFIG.agodaCid;
  const dest = typeof param === "string" ? param : param?.destination || "Dubai";
  const citySlug = resolveAgodaCitySlug(dest);

  if (citySlug) {
    let url = `https://www.agoda.com/en-gb/city/${citySlug}.html?cid=${cid}`;
    if (typeof param === "object") {
      const { checkin, checkout, adults = 2, rooms = 1 } = param;
      url += `&adults=${adults}&rooms=${rooms}`;
      if (checkin && checkout) {
        url += `&checkIn=${checkin}&checkOut=${checkout}`;
      }
    }
    return url;
  }

  const cleanCity = cleanDestinationCity(dest);
  return `https://www.agoda.com/partners/partnersearch.aspx?cid=${cid}&city=${encodeURIComponent(cleanCity)}`;
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
 * Uses official Aviasales direct deep search route format:
 * https://www.aviasales.com/search/{ORIGIN_IATA}{DEPART_DDMM}{DEST_IATA}{RETURN_DDMM}{ADULTS}?marker={MARKER}
 */
export function getAviasalesFlightUrl(param?: string | FlightSearchParams): string {
  const marker = AFFILIATE_CONFIG.travelpayoutsMarker;
  
  if (!param) {
    return `https://www.aviasales.com/?marker=${marker}`;
  }

  if (typeof param === "string") {
    const destIata = resolveIataCode(param, "DXB");
    return `https://www.aviasales.com/search/DEL${destIata}2?marker=${marker}`;
  }

  const { origin = "DEL", destination = "DXB", departDate, returnDate, adults = 2, isRoundTrip = true } = param;
  const originIata = resolveIataCode(origin, "DEL");
  const destIata = resolveIataCode(destination, "DXB");

  const departDDMM = formatAviasalesDate(departDate);
  const returnDDMM = isRoundTrip && returnDate ? formatAviasalesDate(returnDate) : "";

  // Build exact Aviasales deep search slug
  let searchSlug = `${originIata}${departDDMM}${destIata}${returnDDMM}${adults}`;
  if (!departDDMM) {
    searchSlug = `${originIata}${destIata}${adults}`;
  }

  return `https://www.aviasales.com/search/${searchSlug}?marker=${marker}`;
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
    searchQuery = cleanDestinationCity(param) + " attractions tickets";
  } else if (param) {
    const city = cleanDestinationCity(param.destination);
    searchQuery = `${city} ${param.activity || param.query || "attractions activities"}`.trim();
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
  const marker = AFFILIATE_CONFIG.travelpayoutsMarker;
  return `https://gettransfer.com/en?partner_id=${marker}`;
}

/**
 * Generate Intui.travel Airport Transfer & VIP Chauffeur URL
 */
export function getIntuiTransferUrl(param?: string | TransferSearchParams): string {
  return `https://intui.tpo.li/7TDYgynw`;
}

/**
 * Generate KKday Attractions, Day Tours & Theme Park Passes URL
 */
export function getKkdayUrl(param?: string): string {
  return `https://kkday.tpo.li/VtERguRB`;
}

/**
 * Generate Saily 5G Global eSIM Deep Destination URL
 * Links directly to Saily with affiliate tracking attached via Travelpayouts verified CDN gateway.
 */
export function getSailyEsimUrl(countryOrRegion = "global"): string {
  return `https://saily.tpo.li/9kXyVV0E`;
}

export const getAiraloEsimUrl = getSailyEsimUrl;

/**
 * Generate Drimsim Universal Data & Voice SIM/eSIM URL
 */
export function getDrimsimUrl(): string {
  return `https://drimsim.tpo.li/UyiqPwB5`;
}

/**
 * Generate AirHelp €600 Flight Delay Claim URL
 */
export function getAirHelpUrl(options?: { departure?: string; arrival?: string; airline?: string }): string {
  const marker = AFFILIATE_CONFIG.travelpayoutsMarker;
  return `https://www.airhelp.com/en-int/?a_aid=Travelpayouts&data1=${marker}`;
}

/**
 * Generate EconomyBookings Worldwide Car Rental URL
 */
export function getEconomyBookingsUrl(options?: { location?: string; pickDate?: string; dropDate?: string }): string {
  return `https://economybookings.tpo.li/fbYsWyaE`;
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


