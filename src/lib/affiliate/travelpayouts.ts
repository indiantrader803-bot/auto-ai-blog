/**
 * ✈️ Travelpayouts Centralized Affiliate Campaign Registry
 * Campaign: travelpayouts
 * Marker / Tracking ID: 573790 / 777349
 */

export interface TravelpayoutsProgram {
  id: string;
  name: string;
  category:
    | "Flights & Search"
    | "Flight Delay Compensation"
    | "eSIM & Connectivity"
    | "Tours, Passes & Guides"
    | "Car & Bike Rentals"
    | "Airport Transfers"
    | "Luggage & Travel Insurance";
  url: string;
  campaign: "travelpayouts";
  badge: string;
  description: string;
  discountBadge?: string;
  features: string[];
  ctaText: string;
  rating: number;
  reviews: string;
  iconType: "plane" | "shield" | "wifi" | "ticket" | "car" | "bike" | "taxi" | "luggage";
}

export const TRAVELPAYOUTS_PROGRAMS: TravelpayoutsProgram[] = [
  // ✈️ 1. Flights & Compensation
  {
    id: "aviasales",
    name: "Aviasales Flight Comparison",
    category: "Flights & Search",
    url: "https://aviasales.tpo.li/ZeF7BjUt",
    campaign: "travelpayouts",
    badge: "LOWEST AIRFARE GUARANTEE",
    description: "Search and compare real-time flights across 1,000+ airlines and booking agencies with 0 hidden fees.",
    discountBadge: "Save up to 35%",
    features: ["Price alert calendar", "Direct airline ticket matching", "No booking commissions", "Multi-city routes"],
    ctaText: "Search Cheap Flights",
    rating: 4.9,
    reviews: "45,000+",
    iconType: "plane",
  },
  {
    id: "airhelp",
    name: "AirHelp Flight Compensation",
    category: "Flight Delay Compensation",
    url: "https://airhelp.tpo.li/fpMMLvXF",
    campaign: "travelpayouts",
    badge: "CLAIM UP TO $650 / €600",
    description: "World's #1 flight delay and cancellation compensation expert. No win, no fee legal claim processing.",
    discountBadge: "No Win, No Fee",
    features: ["EU EC 261 & UK regulation protection", "Missed connection claims", "Cancelled flight payouts", "2.3M+ passengers helped"],
    ctaText: "Check Your Flight Payout",
    rating: 4.9,
    reviews: "150,000+",
    iconType: "shield",
  },
  {
    id: "compensair",
    name: "Compensair Flight Claim Service",
    category: "Flight Delay Compensation",
    url: "https://compensair.tpo.li/nwEzrtjW",
    campaign: "travelpayouts",
    badge: "FAST €600 CLAIM REFUND",
    description: "Get compensation for flight delays over 3 hours, cancellations, and denied boarding across all major global airlines.",
    discountBadge: "Zero Upfront Cost",
    features: ["Direct airline legal handling", "Free compensation calculator", "Covers flights from past 6 years", "Fast bank payout"],
    ctaText: "Claim Compensation Now",
    rating: 4.8,
    reviews: "28,000+",
    iconType: "shield",
  },

  // 📱 2. eSIM & Connectivity
  {
    id: "saily",
    name: "Saily Global Travel eSIM (by Nord Security)",
    category: "eSIM & Connectivity",
    url: "https://saily.tpo.li/9kXyVV0E",
    campaign: "travelpayouts",
    badge: "NORD SECURITY BACKED",
    description: "Stay connected worldwide with affordable, instant-activation eSIM data plans in over 150+ countries.",
    discountBadge: "Plans from $3.99",
    features: ["1-Minute QR instant activation", "Keep your original WhatsApp number", "Ultra high-speed 5G/4G LTE", "24/7 Live customer support"],
    ctaText: "Get Saily Travel eSIM",
    rating: 4.9,
    reviews: "60,000+",
    iconType: "wifi",
  },
  {
    id: "drimsim",
    name: "Drimsim Universal International SIM",
    category: "eSIM & Connectivity",
    url: "https://drimsim.tpo.li/UyiqPwB5",
    campaign: "travelpayouts",
    badge: "197 COUNTRIES COVERAGE",
    description: "Universal SIM & eSIM that connects directly to local cellular carriers around the globe without roaming surcharges.",
    discountBadge: "Pay-As-You-Go",
    features: ["Real-time balance tracking app", "Zero monthly subscription fees", "Physical SIM & eSIM available", "Direct local telecom rates"],
    ctaText: "Order Drimsim SIM",
    rating: 4.7,
    reviews: "18,500+",
    iconType: "wifi",
  },

  // 🎟️ 3. Tours, Passes & Experiences
  {
    id: "klook",
    name: "Klook Attractions, Passes & Adventure Tours",
    category: "Tours, Passes & Guides",
    url: "https://tp.media/r?campaign_id=137&marker=777349&p=4110&trs=573745&u=https%3A%2F%2Fklook.com",
    campaign: "travelpayouts",
    badge: "500,000+ ACTIVITIES",
    description: "Book skip-the-line attraction tickets, high-speed rail passes, day excursions, and theme parks worldwide.",
    discountBadge: "Save up to 60%",
    features: ["Instant mobile QR vouchers", "Klook reward credits back", "Verified traveller reviews", "Best price guarantee"],
    ctaText: "Book on Klook",
    rating: 4.9,
    reviews: "500,000+",
    iconType: "ticket",
  },
  {
    id: "gocity",
    name: "Go City Sightseeing & Attraction Passes",
    category: "Tours, Passes & Guides",
    url: "https://gocity.tpo.li/rDzH4JAW",
    campaign: "travelpayouts",
    badge: "ALL-INCLUSIVE CITY PASS",
    description: "Unlock 30+ top city attractions on a single digital pass. Save up to 50% compared to gate entry tickets.",
    discountBadge: "Save 50% on Gate Prices",
    features: ["All-in-one digital pass app", "Covers London, New York, Paris, Rome & more", "1 to 7 day flexible passes", "Risk-free 90-day cancellation"],
    ctaText: "Explore Go City Passes",
    rating: 4.8,
    reviews: "85,000+",
    iconType: "ticket",
  },
  {
    id: "kkday",
    name: "KKday Tours & Asia Attractions",
    category: "Tours, Passes & Guides",
    url: "https://kkday.tpo.li/xF22JbSi",
    campaign: "travelpayouts",
    badge: "ASIA & GLOBAL TOP TOURS",
    description: "Leading booking platform for Japan, Korea, Taiwan, Southeast Asia and Europe travel experiences and day tours.",
    discountBadge: "Exclusive Member Deals",
    features: ["Authentic cultural tours", "Japan Rail & express passes", "Theme park priority access", "Multilingual local guides"],
    ctaText: "Discover KKday Deals",
    rating: 4.8,
    reviews: "95,000+",
    iconType: "ticket",
  },
  {
    id: "wegotrip",
    name: "WeGoTrip Self-Guided Audio Tours",
    category: "Tours, Passes & Guides",
    url: "https://wegotrip.tpo.li/sI4B64xv",
    campaign: "travelpayouts",
    badge: "AUDIO EXCURSIONS + ENTRY",
    description: "Explore world-famous museums, castles, and historic city streets at your own pace with engaging smartphone audio guides.",
    discountBadge: "Museum Entry Included",
    features: ["Created by certified historians", "Offline GPS map navigation", "Skip long ticket lines", "Listen anytime at your own speed"],
    ctaText: "Browse Audio Tours",
    rating: 4.7,
    reviews: "12,000+",
    iconType: "ticket",
  },

  // 🚗 4. Car & Bike Rentals
  {
    id: "economybookings",
    name: "EconomyBookings Worldwide Car Rental",
    category: "Car & Bike Rentals",
    url: "https://economybookings.tpo.li/fbYsWyaE",
    campaign: "travelpayouts",
    badge: "20,000+ RENTAL LOCATIONS",
    description: "Compare all major car hire brands (Hertz, Avis, Europcar, Sixt, Enterprise) with guaranteed lowest rental rates.",
    discountBadge: "Free Cancellation",
    features: ["Zero hidden credit card fees", "Free cancellation up to 48 hours", "24/7 multi-language support", "Airport pickup options"],
    ctaText: "Rent a Car Worldwide",
    rating: 4.8,
    reviews: "110,000+",
    iconType: "car",
  },
  {
    id: "autoeurope",
    name: "Auto Europe Car Rental & Road Trips",
    category: "Car & Bike Rentals",
    url: "https://autoeurope.tpo.li/7U28ek89",
    campaign: "travelpayouts",
    badge: "60+ YEARS EXPERTISE",
    description: "Specialists in European car rentals, luxury motorhomes, and cross-border road trips across 180 countries.",
    discountBadge: "Best Price Guarantee",
    features: ["No change fees", "Comprehensive zero deductible insurance", "Luxury and sports car fleets", "24,000 international locations"],
    ctaText: "Compare Auto Europe Deals",
    rating: 4.8,
    reviews: "75,000+",
    iconType: "car",
  },
  {
    id: "qeeq",
    name: "QEEQ Global Car Rental Marketplace",
    category: "Car & Bike Rentals",
    url: "https://qeeq.tpo.li/Vlx3Gi5t",
    campaign: "travelpayouts",
    badge: "PRICE DROP PROTECTOR",
    description: "AI-driven car rental platform that automatically re-books your reservation if prices drop before your pickup date.",
    discountBadge: "Diamond Club Savings",
    features: ["Automatic price drop rebooking", "Free flight delay compensation", "Crypto & card payments", "Over 7M customers served"],
    ctaText: "Book on QEEQ",
    rating: 4.7,
    reviews: "35,000+",
    iconType: "car",
  },
  {
    id: "bikesbooking",
    name: "BikesBooking Motorcycle & Scooter Rentals",
    category: "Car & Bike Rentals",
    url: "https://bikesbooking.tpo.li/hRkGiF2p",
    campaign: "travelpayouts",
    badge: "MOTORBIKE & SCOOTER HIRE",
    description: "World's largest online reservation service for motorcycles, scooters, quads, and bicycles in over 2,000 locations.",
    discountBadge: "Best Scooter Rates",
    features: ["Instant online confirmation", "Verified local rental suppliers", "Helmets & basic insurance included", "Free cancellation"],
    ctaText: "Rent a Motorbike / Scooter",
    rating: 4.8,
    reviews: "22,000+",
    iconType: "bike",
  },

  // 🚖 5. Airport Transfers
  {
    id: "gettransfer",
    name: "GetTransfer Airport Transfers & Chauffeurs",
    category: "Airport Transfers",
    url: "https://gettransfer.tpo.li/SHZAx1VF",
    campaign: "travelpayouts",
    badge: "CUSTOM CAR & CHAUFFEUR BIDS",
    description: "Book private airport transfers, intercity rides, and luxury VIP limousines with free waiting time and nameplate meet.",
    discountBadge: "Best Price Bidding",
    features: ["Free 60 min airport waiting time", "Name-sign meet & greet in arrivals", "Economy to VIP Mercedes Benz fleets", "Fixed transparent pricing"],
    ctaText: "Book Airport Transfer",
    rating: 4.8,
    reviews: "80,000+",
    iconType: "taxi",
  },
  {
    id: "intui",
    name: "Intui.travel Individual & Shuttle Transfers",
    category: "Airport Transfers",
    url: "https://intui.tpo.li/KXD4PNCN",
    campaign: "travelpayouts",
    badge: "175 COUNTRIES & 40,000 RESORTS",
    description: "Reliable airport-to-hotel private transfers, minivans for groups, and budget shared shuttles directly to your resort doorstep.",
    discountBadge: "Door-to-Door Service",
    features: ["Child seats available", "Direct hotel lobby drop-off", "No surge pricing during delays", "English speaking drivers"],
    ctaText: "Reserve Shuttle Transfer",
    rating: 4.7,
    reviews: "42,000+",
    iconType: "taxi",
  },

  // 🛡️ 6. Luggage & Insurance
  {
    id: "radicalstorage",
    name: "Radical Storage Luggage Network",
    category: "Luggage & Travel Insurance",
    url: "https://radicalstorage.tpo.li/o2vAfWY9",
    campaign: "travelpayouts",
    badge: "5,000+ SECURE BAG LOCKERS",
    description: "Store your heavy bags safely in certified hotels, cafes, and shops near major train stations and attractions from $5/day.",
    discountBadge: "From $5 / €5 per Day",
    features: ["Up to €3,000 guarantee per bag", "No size or weight restrictions", "Instant 3-minute booking", "Available in 500+ cities globally"],
    ctaText: "Find Bag Storage Near Me",
    rating: 4.9,
    reviews: "120,000+",
    iconType: "luggage",
  },
  {
    id: "ektatraveling",
    name: "EKTA Traveling Comprehensive Insurance",
    category: "Luggage & Travel Insurance",
    url: "https://ektatraveling.tpo.li/Az2rwDBw",
    campaign: "travelpayouts",
    badge: "GLOBAL MEDICAL & TRIP COVERAGE",
    description: "International travel insurance covering medical emergencies, luggage loss, trip cancellation, and COVID treatment worldwide.",
    discountBadge: "Instant Policy Delivery",
    features: ["Covers ages 2 months to 100 years", "Meets all Schengen & visa requirements", "24/7 Multi-language assistance hotline", "Direct medical bills payment"],
    ctaText: "Get Travel Insurance Policy",
    rating: 4.8,
    reviews: "32,000+",
    iconType: "shield",
  },
];

/**
 * 📊 Helper function to track Travelpayouts affiliate link clicks
 */
export async function trackTravelpayoutsClick(partnerId: string, metadata: Record<string, any> = {}) {
  try {
    const partner = TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === partnerId);
    if (!partner) return;

    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "TRAVELPAYOUTS_CLICK",
        referrer: typeof window !== "undefined" ? window.location.pathname : null,
        metadata: {
          campaign: "travelpayouts",
          partnerId: partner.id,
          partnerName: partner.name,
          category: partner.category,
          targetUrl: partner.url,
          timestamp: new Date().toISOString(),
          ...metadata,
        },
      }),
    }).catch(() => {});
  } catch (_) {}
}

/**
 * 🎯 Map natural queries to the best matching Travelpayouts program
 */
export function getBestTravelpayoutsPartner(query: string): TravelpayoutsProgram {
  const lower = query.toLowerCase();

  if (lower.includes("claim") || lower.includes("delay") || lower.includes("compensation") || lower.includes("cancelled flight") || lower.includes("refund")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "airhelp") || TRAVELPAYOUTS_PROGRAMS[1];
  }
  if (lower.includes("esim") || lower.includes("sim") || lower.includes("roaming") || lower.includes("internet") || lower.includes("data plan")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "saily") || TRAVELPAYOUTS_PROGRAMS[3];
  }
  if (lower.includes("pass") || lower.includes("sightseeing") || lower.includes("city pass")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "gocity") || TRAVELPAYOUTS_PROGRAMS[6];
  }
  if (lower.includes("car rental") || lower.includes("rent car") || lower.includes("drive") || lower.includes("road trip")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "economybookings") || TRAVELPAYOUTS_PROGRAMS[9];
  }
  if (lower.includes("bike") || lower.includes("scooter") || lower.includes("motorcycle")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "bikesbooking") || TRAVELPAYOUTS_PROGRAMS[12];
  }
  if (lower.includes("transfer") || lower.includes("taxi") || lower.includes("cab") || lower.includes("chauffeur") || lower.includes("airport ride")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "gettransfer") || TRAVELPAYOUTS_PROGRAMS[13];
  }
  if (lower.includes("bag") || lower.includes("luggage") || lower.includes("locker") || lower.includes("storage")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "radicalstorage") || TRAVELPAYOUTS_PROGRAMS[15];
  }
  if (lower.includes("insurance") || lower.includes("medical") || lower.includes("schengen visa") || lower.includes("emergency")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "ektatraveling") || TRAVELPAYOUTS_PROGRAMS[16];
  }
  if (lower.includes("audio") || lower.includes("museum") || lower.includes("excursion") || lower.includes("guide")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "wegotrip") || TRAVELPAYOUTS_PROGRAMS[8];
  }
  if (lower.includes("flight") || lower.includes("airfare") || lower.includes("ticket") || lower.includes("airline")) {
    return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "aviasales") || TRAVELPAYOUTS_PROGRAMS[0];
  }

  // Default: Klook or Aviasales
  return TRAVELPAYOUTS_PROGRAMS.find((p) => p.id === "klook") || TRAVELPAYOUTS_PROGRAMS[5];
}
