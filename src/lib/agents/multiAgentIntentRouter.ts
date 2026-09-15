import { getAllCatalogArticles } from "@/lib/content/articles";
import { VERIFIED_SPONSORS } from "@/lib/pipeline/agents/sponsorAgent";
import {
  getBookingHotelUrl,
  getAgodaHotelUrl,
  getKlookUrl,
  getAmazonProductUrl,
  getAviasalesFlightUrl,
  getGetTransferUrl,
  getSailyEsimUrl,
  getEconomyBookingsUrl,
  getAirHelpUrl,
  resolveIataCode,
  AFFILIATE_CONFIG,
} from "@/lib/affiliate/links";
import {
  TRAVELPAYOUTS_PROGRAMS,
  getBestTravelpayoutsPartner,
} from "@/lib/affiliate/travelpayouts";

/**
 * 🧭 Smart Natural Language Trip Parameter Parser
 * Extracts destination, departure city, passenger count, and travel dates from user prompts
 */
export function parseTripParameters(query: string) {
  const lower = query.toLowerCase();

  // 1. Passenger Count
  let adults = 2;
  const paxMatch = lower.match(/(\d+)\s*(adults?|travelers?|travellers?|persons?|people|pax|guests?)/i);
  if (paxMatch && paxMatch[1]) {
    adults = Math.max(1, parseInt(paxMatch[1], 10));
  } else if (lower.includes("solo") || lower.includes("single") || lower.includes("myself") || lower.includes("1 person") || lower.includes("1 pax")) {
    adults = 1;
  } else if (lower.includes("family") || lower.includes("group") || lower.includes("friends")) {
    adults = 4;
  }

  // 2. Origin / Departure City
  let origin = "Delhi";
  const originMatch = lower.match(/(?:from|departing from|leaving from|origin(?:ating)? from)\s+([a-zA-Z\s]+?)(?=\s+(?:to|for|in|on|with|next|this|during|\d|$))/i);
  if (originMatch && originMatch[1]) {
    const rawOrigin = originMatch[1].trim();
    if (rawOrigin.length > 2) {
      origin = rawOrigin;
    }
  } else if (lower.includes("from mumbai")) {
    origin = "Mumbai";
  } else if (lower.includes("from kolkata") || lower.includes("from calcutta")) {
    origin = "Kolkata";
  } else if (lower.includes("from bangalore") || lower.includes("from bengaluru")) {
    origin = "Bangalore";
  } else if (lower.includes("from chennai") || lower.includes("from madras")) {
    origin = "Chennai";
  } else if (lower.includes("from hyderabad")) {
    origin = "Hyderabad";
  }

  // 3. Destination City
  let destination = "Goa";
  if (lower.includes("kerala") || lower.includes("kochi") || lower.includes("munnar") || lower.includes("alleppey") || lower.includes("wayanad")) {
    destination = "Kerala";
  } else if (lower.includes("ladakh") || lower.includes("leh") || lower.includes("kashmir") || lower.includes("srinagar") || lower.includes("gulmarg")) {
    destination = "Ladakh";
  } else if (lower.includes("japan") || lower.includes("tokyo") || lower.includes("kyoto") || lower.includes("osaka")) {
    destination = "Japan";
  } else if (lower.includes("goa") || lower.includes("panaji") || lower.includes("calangute") || lower.includes("baga")) {
    destination = "Goa";
  } else if (lower.includes("dubai") || lower.includes("uae") || lower.includes("abu dhabi")) {
    destination = "Dubai";
  } else if (lower.includes("bali") || lower.includes("indonesia") || lower.includes("ubud") || lower.includes("seminyak")) {
    destination = "Bali";
  } else if (lower.includes("switzerland") || lower.includes("swiss") || lower.includes("zermatt") || lower.includes("interlaken") || lower.includes("zurich")) {
    destination = "Switzerland";
  } else if (lower.includes("maldives") || lower.includes("male")) {
    destination = "Maldives";
  } else if (lower.includes("thailand") || lower.includes("bangkok") || lower.includes("phuket") || lower.includes("pattaya")) {
    destination = "Thailand";
  } else if (lower.includes("singapore")) {
    destination = "Singapore";
  } else if (lower.includes("paris") || lower.includes("france")) {
    destination = "Paris";
  } else if (lower.includes("london") || lower.includes("uk") || lower.includes("england")) {
    destination = "London";
  } else if (lower.includes("manali") || lower.includes("himachal") || lower.includes("shimla") || lower.includes("dharamsala")) {
    destination = "Manali";
  } else if (lower.includes("jaipur") || lower.includes("rajasthan") || lower.includes("udaipur") || lower.includes("jodhpur")) {
    destination = "Rajasthan";
  } else if (lower.includes("vietnam") || lower.includes("hanoi") || lower.includes("da nang")) {
    destination = "Vietnam";
  } else {
    // Attempt regex extraction
    const destMatch = lower.match(/(?:to|in|for|explore|visit|plan|book)\s+([a-zA-Z\s]+?)(?=\s+(?:from|on|for|with|next|this|flight|hotel|tour|trip|\d|$))/i);
    if (destMatch && destMatch[1]) {
      const candidate = destMatch[1].trim();
      if (candidate.length > 2 && !["a", "the", "me", "our", "my", "best", "cheap", "luxury", "any", "this"].includes(candidate.toLowerCase())) {
        destination = candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
    }
  }

  // 4. Default Departure & Return Dates (14 days from now, 7-day duration)
  const now = new Date();
  const departObj = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const returnObj = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
  const departDate = departObj.toISOString().split("T")[0];
  const returnDate = returnObj.toISOString().split("T")[0];

  return { destination, origin, adults, departDate, returnDate };
}

export type AgentIntent =
  | "BOOKING"
  | "AFFILIATE_SEARCH"
  | "AI_TOOL_SEARCH"
  | "VIDEO_SEARCH"
  | "BLOG_SEARCH"
  | "GENERAL_KNOWLEDGE";

export interface BookingDeal {
  id: string;
  title: string;
  location: string;
  rating: number;
  priceTag: string;
  badge: string;
  features: string[];
  affiliateUrl: string;
  imageUrl: string;
}

export interface AffiliateComparisonOffer {
  id: string;
  name: string;
  niche: string;
  badge: string;
  payoutSplit: string;
  startingPrice: string;
  discountCode: string;
  affiliateUrl: string;
  isBestMatch?: boolean;
  features: string[];
}

export interface VideoSearchResult {
  id: string;
  title: string;
  videoId: string;
  channel: string;
  duration: string;
  thumbnailUrl: string;
  summary: string;
  relatedBlogSlug?: string;
  relatedBlogTitle?: string;
  affiliateCta?: {
    text: string;
    url: string;
  };
}

export interface MultiAgentResponse {
  intent: AgentIntent;
  agentName: string;
  speechText: string;
  markdownContent: string;
  bookingDeals?: BookingDeal[];
  comparisonOffers?: AffiliateComparisonOffer[];
  videoResults?: VideoSearchResult[];
  affiliateCta?: {
    title: string;
    description: string;
    url: string;
    buttonText: string;
    promoCode?: string;
  };
  recommendedBlogSlugs?: Array<{ title: string; slug: string }>;
}

/**
 * 🎯 Intent Detection Agent
 * Analyzes natural language / speech transcripts and classifies user intent
 */
export function detectUserIntent(query: string): AgentIntent {
  const lower = query.toLowerCase();

  // 1. Video Search Intent
  if (
    lower.includes("video") ||
    lower.includes("watch") ||
    lower.includes("youtube") ||
    lower.includes("tutorial") ||
    lower.includes("workshop") ||
    lower.includes("visual guide") ||
    lower.includes("show me a video")
  ) {
    return "VIDEO_SEARCH";
  }

  // 2. Booking Intent
  if (
    lower.includes("book") ||
    lower.includes("hotel") ||
    lower.includes("resort") ||
    lower.includes("stay") ||
    lower.includes("flight") ||
    lower.includes("houseboat") ||
    lower.includes("homestay") ||
    lower.includes("tickets") ||
    lower.includes("train pass") ||
    lower.includes("room") ||
    lower.includes("hostel") ||
    lower.includes("accommodation")
  ) {
    return "BOOKING";
  }

  // 3. Affiliate & Offer Comparison Intent
  if (
    lower.includes("compare") ||
    lower.includes("discount") ||
    lower.includes("coupon") ||
    lower.includes("promo code") ||
    lower.includes("best deal") ||
    lower.includes("prop firm") ||
    lower.includes("funded account") ||
    lower.includes("ftm") ||
    lower.includes("atlas funded") ||
    lower.includes("aquafunded") ||
    lower.includes("pocket option") ||
    lower.includes("coinswitch") ||
    lower.includes("backpack") ||
    lower.includes("trekking gear") ||
    lower.includes("gopro") ||
    lower.includes("macbook") ||
    lower.includes("laptop") ||
    lower.includes("cheapest")
  ) {
    return "AFFILIATE_SEARCH";
  }

  // 4. AI Tool & Store Search Intent
  if (
    lower.includes("ai tool") ||
    lower.includes("prompt") ||
    lower.includes("store") ||
    lower.includes("cursor") ||
    lower.includes("claude") ||
    lower.includes("chatgpt") ||
    lower.includes("gpu") ||
    lower.includes("toolkit") ||
    lower.includes("digital product") ||
    lower.includes("script")
  ) {
    return "AI_TOOL_SEARCH";
  }

  // 5. Itinerary & Blog Search Intent
  if (
    lower.includes("itinerary") ||
    lower.includes("plan a trip") ||
    lower.includes("days trip") ||
    lower.includes("travel guide") ||
    lower.includes("what to see") ||
    lower.includes("kerala") ||
    lower.includes("ladakh") ||
    lower.includes("japan") ||
    lower.includes("switzerland") ||
    lower.includes("festival") ||
    lower.includes("article") ||
    lower.includes("blog")
  ) {
    return "BLOG_SEARCH";
  }

  return "GENERAL_KNOWLEDGE";
}

/**
 * 🏨 Sub-Agent 1: Booking Agent
 * Automatically parses user destinations, dates, and pax to build deep search links
 */
export function handleBookingAgent(query: string): MultiAgentResponse {
  const lower = query.toLowerCase();
  const trip = parseTripParameters(query);
  const { destination, origin, adults, departDate, returnDate } = trip;
  const rooms = Math.max(1, Math.ceil(adults / 2));

  let deals: BookingDeal[] = [];

  if (lower.includes("esim") || lower.includes("sim card") || lower.includes("roaming") || lower.includes("international data") || lower.includes("saily") || lower.includes("drimsim")) {
    deals = [
      {
        id: "tp_saily_esim",
        title: `Saily 5G Travel eSIM for ${destination} (Nord Security)`,
        location: `${destination} & 150+ Countries`,
        rating: 4.9,
        priceTag: "Plans from $3.99",
        badge: "NORD SECURITY BACKED",
        features: ["1-Minute QR Activation", "Keep Original WhatsApp Number", "Ultra Fast 5G/4G Speeds", "24/7 Live Support"],
        affiliateUrl: getSailyEsimUrl(destination),
        imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "tp_drimsim",
        title: "Drimsim Universal Physical SIM & eSIM",
        location: "197 Countries Coverage",
        rating: 4.7,
        priceTag: "Pay-As-You-Go Rates",
        badge: "ZERO ROAMING SURCHARGE",
        features: ["Direct Local Telecom Prices", "Real-time Mobile Balance App", "No Expiration on Unused Funds", "Free Incoming SMS"],
        affiliateUrl: "https://drimsim.tpo.li/UyiqPwB5",
        imageUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else if (lower.includes("claim") || lower.includes("delay") || lower.includes("compensation") || lower.includes("airhelp") || lower.includes("compensair") || lower.includes("cancelled flight") || lower.includes("refund")) {
    deals = [
      {
        id: "tp_airhelp",
        title: `AirHelp Flight Delay Compensation (${origin} to ${destination})`,
        location: "Global Airlines & Flights",
        rating: 4.9,
        priceTag: "Up to €600 / $650 per Passenger",
        badge: "NO WIN NO FEE",
        features: ["Covers Delays over 3 Hours", "Cancelled Flight Payouts", "Missed Connections", "2.3M+ Passengers Paid"],
        affiliateUrl: getAirHelpUrl({ departure: origin, arrival: destination }),
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "tp_compensair",
        title: "Compensair Airline Compensation Claim Service",
        location: "All Major International Airlines",
        rating: 4.8,
        priceTag: "Fast Bank Wire Settlement",
        badge: "ZERO RISK CLAIM",
        features: ["Free Payout Calculator", "Covers Flights Past 6 Years", "Direct Legal Team Handling", "No Upfront Costs"],
        affiliateUrl: "https://compensair.tpo.li/nwEzrtjW",
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else if (lower.includes("car rental") || lower.includes("rent car") || lower.includes("car hire") || lower.includes("road trip") || lower.includes("drive")) {
    deals = [
      {
        id: "tp_economybookings",
        title: `EconomyBookings Car Rental in ${destination}`,
        location: `${destination} Airport & Downtown`,
        rating: 4.8,
        priceTag: "Best Price Match Guarantee",
        badge: "FREE CANCELLATION",
        features: ["All Major Brands (Hertz, Avis, Sixt)", "Zero Credit Card Fees", "Airport & Downtown Pickup", "24/7 Multilingual Support"],
        affiliateUrl: getEconomyBookingsUrl({ location: destination, pickDate: departDate, dropDate: returnDate }),
        imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "tp_autoeurope",
        title: `Auto Europe Self-Drive in ${destination}`,
        location: `${destination} & 24,000 Global Hubs`,
        rating: 4.8,
        priceTag: "No Change Fees Guarantee",
        badge: "60+ YEARS EXPERIENCE",
        features: ["Zero Deductible Insurance Options", "Motorhomes & Luxury Fleets", "Cross-Border Driving Permits", "Instant Confirmation"],
        affiliateUrl: "https://autoeurope.tpo.li/7U28ek89",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else if (lower.includes("transfer") || lower.includes("cab") || lower.includes("taxi") || lower.includes("chauffeur") || lower.includes("airport ride")) {
    deals = [
      {
        id: "tp_gettransfer",
        title: `GetTransfer Private Airport Transfer (${destination})`,
        location: `${destination} Airport to Hotel`,
        rating: 4.8,
        priceTag: `Custom Driver Bids for ${adults} Pax`,
        badge: "FREE 60 MIN WAITING TIME",
        features: ["Nameplate Airport Meet & Greet", "Mercedes Benz VIP to Economy", "No Surge Pricing Delays", "Fixed Guaranteed Price"],
        affiliateUrl: getGetTransferUrl({ from: `${destination} Airport`, to: `${destination} City Center`, date: departDate, passengers: adults }),
        imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else if (lower.includes("flight") || lower.includes("plane") || lower.includes("airfare") || lower.includes("aviasales")) {
    deals = [
      {
        id: "tp_aviasales",
        title: `Aviasales Flights: ${origin} → ${destination} (${adults} Travelers)`,
        location: `${origin} (${resolveIataCode(origin)}) to ${destination} (${resolveIataCode(destination)})`,
        rating: 4.9,
        priceTag: "Lowest Fare Comparison",
        badge: "1,000+ AIRLINES COMPARED",
        features: ["Exact Route & Date Filter Pre-filled", "Zero Hidden Booking Fees", "Multi-City & Direct Options", "Price Drop Notifications"],
        affiliateUrl: getAviasalesFlightUrl({ origin, destination, departDate, returnDate, adults, isRoundTrip: true }),
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_destination_hotel",
        title: `Booking.com Verified Stays in ${destination}`,
        location: destination,
        rating: 4.8,
        priceTag: `Best Match for ${adults} Guests (${rooms} Room)`,
        badge: "FREE CANCELLATION",
        features: ["Pre-filled Check-in & Check-out Dates", "Genius Member Loyalty Discounts", "24/7 Multilingual Support", "Zero Booking Fee"],
        affiliateUrl: getBookingHotelUrl({ destination, checkin: departDate, checkout: returnDate, adults, rooms }),
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else {
    // Comprehensive Multi-Product Trip Basket for the destination
    deals = [
      {
        id: "tp_aviasales_dest",
        title: `Round-Trip Flights: ${origin} → ${destination}`,
        location: `${origin} (${resolveIataCode(origin)}) to ${destination} (${resolveIataCode(destination)})`,
        rating: 4.9,
        priceTag: `Exact Route for ${adults} Travelers`,
        badge: "LOWEST AIRFARE",
        features: ["1,000+ Airlines Compared", "Direct Price-Drop Alerts", "Depart: " + departDate, "Return: " + returnDate],
        affiliateUrl: getAviasalesFlightUrl({ origin, destination, departDate, returnDate, adults, isRoundTrip: true }),
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_hotels_dest",
        title: `Top-Rated Hotels & Resorts in ${destination}`,
        location: destination,
        rating: 4.8,
        priceTag: `Search ${adults} Guests / ${rooms} Room`,
        badge: "FREE CANCELLATION",
        features: ["Exact Dates Filtered", "Verified Guest Reviews", "Genius Member Discounts", "Pay At Hotel Options"],
        affiliateUrl: getBookingHotelUrl({ destination, checkin: departDate, checkout: returnDate, adults, rooms }),
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "ag_hotels_dest",
        title: `Agoda Express VIP Deals in ${destination}`,
        location: destination,
        rating: 4.8,
        priceTag: "Up to 60% Special Discount",
        badge: "AGODA VIP PRICE",
        features: ["Instant Room Confirmation", "Lowest Price Match Guarantee", "Bundle Flight + Hotel Savings", "Earn Agoda Cash Rewards"],
        affiliateUrl: getAgodaHotelUrl({ destination, checkin: departDate, checkout: returnDate, adults, rooms }),
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "kl_passes_dest",
        title: `Klook Sightseeing Passes & Attractions in ${destination}`,
        location: destination,
        rating: 4.9,
        priceTag: "Skip-The-Line E-Tickets",
        badge: "KLOOK TOP EXPERIENCES",
        features: ["Instant Mobile Voucher", "Over 500,000 Verified Tours", "Certified Local Guides", "Earn Klook Reward Credits"],
        affiliateUrl: getKlookUrl({ destination, query: `${destination} tours activities passes tickets` }),
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "gt_transfer_dest",
        title: `GetTransfer Guaranteed Airport Taxi (${destination})`,
        location: `${destination} Airport to Hotel`,
        rating: 4.8,
        priceTag: `Custom Chauffeur Bids (${adults} Pax)`,
        badge: "FREE 60-MIN WAIT",
        features: ["Nameplate Meet & Greet", "Fixed Fare (No Surge)", "Sedan, SUV & Minivan Fleets", "Child Seats Available"],
        affiliateUrl: getGetTransferUrl({ from: `${destination} Airport`, to: `${destination} City Center`, date: departDate, passengers: adults }),
        imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "sy_esim_dest",
        title: `Saily 5G High-Speed Travel eSIM for ${destination}`,
        location: `${destination} (by Nord Security)`,
        rating: 4.9,
        priceTag: "From $3.99 Instant Data",
        badge: "INSTANT QR SETUP",
        features: ["Keep WhatsApp Number", "No Physical SIM Swap", "High-Speed 5G Coverage", "24/7 Support"],
        affiliateUrl: getSailyEsimUrl(destination),
        imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&auto=format&fit=crop&q=80",
      }
    ];
  }

  return {
    intent: "BOOKING",
    agentName: "Booking & Travel Concierge Agent",
    speechText: `I synthesized verified trip search results for ${destination} departing from ${origin} for ${adults} traveler${adults > 1 ? "s" : ""}. Every link is pre-filled with your dates and guest details so you land on the exact search results.`,
    markdownContent: `### 🏨 Verified Trip Search Results for ${destination}\n\n**Trip Summary**: Departing from **${origin}** • **${adults} Traveler${adults > 1 ? "s" : ""}** • Dates: **${departDate}** to **${returnDate}**\n\nHere are the top flight, hotel, airport transfer, and activity recommendations with exact search parameters pre-filled:`,
    bookingDeals: deals,
    affiliateCta: {
      title: `View Pre-filtered Stays in ${destination} (${adults} Guests, ${departDate} - ${returnDate})`,
      description: "Opens Booking.com with your exact destination, check-in/out dates, and guest count pre-selected.",
      url: getBookingHotelUrl({ destination, checkin: departDate, checkout: returnDate, adults, rooms }),
      buttonText: `Browse ${destination} Hotel Results →`,
      promoCode: "TRAVEL2026",
    },
    recommendedBlogSlugs: [
      { title: "The Definitive Global Travel & India Discovery Guide", slug: "definitive-global-travel-and-india-discovery-destinations-guide" },
      { title: "The Ultimate Solo Traveller's Guide", slug: "ultimate-solo-travellers-guide-hidden-wonders-expeditions" },
    ],
  };
}

/**
 * 💰 Sub-Agent 2: Affiliate Search & Offer Comparison Agent
 */
export function handleAffiliateComparisonAgent(query: string): MultiAgentResponse {
  const lower = query.toLowerCase();

  let niche = "Trading & Financial Capital";
  let offers: AffiliateComparisonOffer[] = [];

  if (lower.includes("tour") || lower.includes("activity") || lower.includes("attraction") || lower.includes("klook") || lower.includes("ticket") || lower.includes("pass") || lower.includes("experience") || lower.includes("sightseeing")) {
    niche = "Global Travel Attractions & Experiences";
    offers = [
      {
        id: "aff_klook_experiences",
        name: "Klook Attractions, Passes & Adventure Tours",
        niche: "Travel Experiences & Entry Tickets",
        badge: "EXCLUSIVE TRAVEL DISCOUNT",
        payoutSplit: "Instant Mobile E-Ticket Confirmation",
        startingPrice: "Deals from ₹499 / $10",
        discountCode: "KLOOK2026",
        affiliateUrl: getKlookUrl(),
        isBestMatch: true,
        features: ["Skip-The-Line Attraction Tickets", "Over 500,000 Activities Worldwide", "Earn & Redeem Klook Reward Credits", "Free Cancellation on Select Bookings"],
      },
      {
        id: "aff_booking_stays",
        name: "Booking.com Global Hotel & Resort Network",
        niche: "Hotel & Luxury Stays",
        badge: "VERIFIED LOWEST RATES",
        payoutSplit: "Free Cancellation on 90% Stays",
        startingPrice: "From ₹1,200 / $25 / night",
        discountCode: "TRAVEL2026",
        affiliateUrl: getBookingHotelUrl(),
        isBestMatch: false,
        features: ["Over 28 Million Reported Listings", "Instant Confirmation with No Prepayment", "Genius Member Loyalty Discounts", "24/7 Global Guest Service"],
      },
      {
        id: "aff_agoda_stays",
        name: "Agoda Express Stays & Flight Bundles",
        niche: "Asia & Global Hotels",
        badge: "AGODA VIP SAVINGS",
        payoutSplit: "Cashback & Reward Points",
        startingPrice: "Special App-Only Pricing",
        discountCode: "AGODA5",
        affiliateUrl: getAgodaHotelUrl(),
        isBestMatch: false,
        features: ["Unbeatable Asia & Global Rates", "Bundle & Save (Hotel + Flight)", "Verified Real Guest Reviews", "Price Match Guarantee"],
      }
    ];
  } else if (lower.includes("backpack") || lower.includes("trekking") || lower.includes("boots") || lower.includes("gopro") || lower.includes("camera") || lower.includes("travel gear")) {
    niche = "Travel & Expedition Gear";
    offers = [
      {
        id: "aff_amazon_backpack",
        name: "Mountaintop 55L/65L Waterproof Trekking Rucksack",
        niche: "Trekking Gear",
        badge: "AMAZON'S CHOICE",
        payoutSplit: "Prime 1-Day Delivery",
        startingPrice: "₹2,899 / $45",
        discountCode: "PRIMEGEAR",
        affiliateUrl: "https://www.amazon.in/s?k=travel+backpack+trekking+rucksack+50L+60L&tag=autoaiblog-21",
        isBestMatch: true,
        features: ["Rain Cover Included", "Ergonomic Lumbar Support", "Hydration Bladder Sleeve", "YKK Zippers"],
      },
      {
        id: "aff_gopro_camera",
        name: "GoPro HERO12 4K Waterproof Action Camera",
        niche: "Travel Photography",
        badge: "TOP ACTION CAM",
        payoutSplit: "Official Amazon Associate",
        startingPrice: "₹34,990 / $399",
        discountCode: "AUTOAIBLOG21",
        affiliateUrl: "https://www.amazon.in/s?k=gopro+hero+action+camera+4k&tag=autoaiblog-21",
        isBestMatch: false,
        features: ["HyperSmooth 6.0 Stabilization", "Waterproof to 33ft", "HDR Video & Audio", "Enduro Battery"],
      },
      {
        id: "aff_hiking_boots",
        name: "Quechua / Columbia Waterproof High-Ankle Hiking Boots",
        niche: "Footwear",
        badge: "ALL-TERRAIN",
        payoutSplit: "Verified Partner",
        startingPrice: "₹4,499 / $65",
        discountCode: "EXPEDITION2026",
        affiliateUrl: "https://www.amazon.in/s?k=waterproof+trekking+shoes+hiking+boots+men+women&tag=autoaiblog-21",
        isBestMatch: false,
        features: ["CrossContact Rubber Sole", "Waterproof Breathable Membrane", "Toe Guard Shield", "Snow Traction"],
      }
    ];
  } else {
    // Prop Firm & Trading Offers Comparison
    niche = "Prop Trading Firms & Terminals";
    offers = [
      {
        id: "aff_ftm",
        name: "Funded Trader Markets (FTM)",
        niche: "Prop Trading Firm",
        badge: "OVERALL BEST MATCH",
        payoutSplit: "Up to 90% Profit Split",
        startingPrice: "Scale to $200,000",
        discountCode: "arnab",
        affiliateUrl: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-voice",
        isBestMatch: true,
        features: ["Zero Time Limits on Challenges", "On-Demand Bi-Weekly Payouts", "Rise, Crypto & Wire Withdrawals", "Raw Spreads"],
      },
      {
        id: "aff_atlas",
        name: "Atlas Funded",
        niche: "Fast Scaling Prop Firm",
        badge: "20% EXCLUSIVE DISCOUNT",
        payoutSplit: "85% - 90% Profit Split",
        startingPrice: "Scale to $300,000",
        discountCode: "12275",
        affiliateUrl: "https://affiliates.atlasfunded.com/Tracking/click/?affid=12275&campaign=11320&product_id=1&t_type=Register&t_lang=EN",
        isBestMatch: false,
        features: ["TradeLocker & MT5 Supported", "Instant Pass Token Options", "Fast Evaluation Speed", "Daily Drawdown Shield"],
      },
      {
        id: "aff_pocketoption",
        name: "Pocket Option Quick Trading",
        niche: "Binary & Fast Execution",
        badge: "50% DEPOSIT BONUS",
        payoutSplit: "Up to 96% Fast Payout",
        startingPrice: "$10 Minimum Deposit",
        discountCode: "50START",
        affiliateUrl: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
        isBestMatch: false,
        features: ["Free Built-in Trading Signals", "Social Copy Trading Engine", "$10,000 Free Demo Practice", "Instant UPI & Crypto Payouts"],
      },
      {
        id: "aff_aquafunded",
        name: "AquaFunded",
        niche: "1-Step Evaluation",
        badge: "RAPID PAYOUTS",
        payoutSplit: "90% Profit Split",
        startingPrice: "Scale to $200,000",
        discountCode: "6e9",
        affiliateUrl: "https://www.aquafunded.com/?afmc=6e9",
        isBestMatch: false,
        features: ["1-Step Evaluation Model", "14-Day Initial Payout Window", "Lowest Commission Fees", "News Trading Allowed"],
      }
    ];
  }

  const bestMatch = offers.find((o) => o.isBestMatch) || offers[0];

  return {
    intent: "AFFILIATE_SEARCH",
    agentName: "Affiliate Offer & Comparison Agent",
    speechText: `I compared the top ${niche} offers for you. The best match is ${bestMatch.name} with ${bestMatch.payoutSplit}. You can claim an exclusive discount with promo code ${bestMatch.discountCode}.`,
    markdownContent: `### 📊 Verified Offer Comparison: ${niche}\n\nHere is our side-by-side breakdown comparing profit splits, challenge rules, and exclusive promo codes:`,
    comparisonOffers: offers,
    affiliateCta: {
      title: `Claim Best Deal on ${bestMatch.name}`,
      description: `Save with exclusive promo code **${bestMatch.discountCode}** and access premium evaluation features.`,
      url: bestMatch.affiliateUrl,
      buttonText: `Get Started with ${bestMatch.name} →`,
      promoCode: bestMatch.discountCode,
    },
    recommendedBlogSlugs: [
      { title: "Nifty 50 & Sensex Technical Outlook: Breakout Levels", slug: "nifty-50-sensex-record-highs-fii-dii-liquidity-breakout" },
      { title: "Autonomous AI Agent Swarms in 2026", slug: "the-agentic-revolution-autonomous-ai-swarms" },
    ],
  };
}

/**
 * 🎥 Sub-Agent 3: Video Search Agent
 */
export function handleVideoSearchAgent(query: string): MultiAgentResponse {
  const lower = query.toLowerCase();

  let videoResults: VideoSearchResult[] = [];

  if (lower.includes("ai") || lower.includes("agent") || lower.includes("swarm") || lower.includes("robot") || lower.includes("code") || lower.includes("software")) {
    videoResults = [
      {
        id: "vid_ai_swarms",
        title: "Autonomous AI Agent Swarms: Multi-Agent Systems Explained (LangGraph, AutoGen & MCP)",
        videoId: "sal78ACtGTc",
        channel: "AI Engineering Labs",
        duration: "18:42",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        summary: "A complete step-by-step masterclass demonstrating how multi-agent swarms decompose complex engineering goals, automate testing, and self-heal production codebases.",
        relatedBlogSlug: "the-agentic-revolution-autonomous-ai-swarms",
        relatedBlogTitle: "The Agentic Revolution: How Autonomous AI Swarms Are Rewriting Software Engineering",
        affiliateCta: {
          text: "Try Cursor AI Pro Editor (Promo: DEV2026)",
          url: "https://amzn.to/3VjFaRp",
        }
      },
      {
        id: "vid_ai_influencers",
        title: "How AI Influencers & Digital Avatars Are Built: Diffusion & Lip-Sync Pipelines",
        videoId: "dQw4w9WgXcQ",
        channel: "Creator Economy Deep Dive",
        duration: "14:15",
        thumbnailUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        summary: "Deep dive into diffusion pipelines, voice cloning, automated social posting, and brand monetization architectures for synthetic creators.",
        relatedBlogSlug: "ai-influencers-synthetic-media-creator-economy-2026",
        relatedBlogTitle: "AI Influencers & Synthetic Media: How Digital Avatars Generate Millions",
        affiliateCta: {
          text: "Deploy Cloud GPUs on HyperCompute",
          url: "https://amzn.to/4gJpL5u",
        }
      }
    ];
  } else if (lower.includes("japan") || lower.includes("tokyo") || lower.includes("kyoto")) {
    videoResults = [
      {
        id: "vid_travel_japan",
        title: "Japan 4K Travel Guide: Tokyo, Mt. Fuji & Kyoto 7-Day Golden Route",
        videoId: "C3E32qJ0hE8",
        channel: "Global Wanderlust 4K",
        duration: "26:40",
        thumbnailUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80",
        summary: "Complete 4K visual guide to navigating the Shinkansen bullet train, Gion geisha districts, Shibuya Crossing, and authentic Uji tea ceremonies.",
        relatedBlogSlug: "definitive-global-travel-and-india-discovery-destinations-guide",
        relatedBlogTitle: "The Definitive Global Travel & India Discovery Guide: 25 Iconic Destinations",
        affiliateCta: {
          text: "Book Kyoto Traditional Ryokans on Booking.com",
          url: "https://www.booking.com/city/jp/kyoto.html?aid=2026803",
        }
      }
    ];
  } else if (lower.includes("dubai") || lower.includes("uae")) {
    videoResults = [
      {
        id: "vid_travel_dubai",
        title: "Dubai 4K Ultra HD Ultimate City & Desert Safari Guide",
        videoId: "T3lS2L1qM4M",
        channel: "Arabian Horizons",
        duration: "21:15",
        thumbnailUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80",
        summary: "Full visual itinerary exploring Burj Khalifa observation decks, luxury yacht cruises in Dubai Marina, and Red Dune desert safaris with dune bashing.",
        relatedBlogSlug: "definitive-global-travel-and-india-discovery-destinations-guide",
        relatedBlogTitle: "The Definitive Global Travel & India Discovery Guide: 25 Iconic Destinations",
        affiliateCta: {
          text: "Book Dubai Desert Safari & Burj Khalifa Fast-Track on Klook",
          url: "https://klook.tp.st/u59M3x",
        }
      }
    ];
  } else if (lower.includes("bali") || lower.includes("indonesia")) {
    videoResults = [
      {
        id: "vid_travel_bali",
        title: "Bali Complete Travel Guide: Ubud, Uluwatu & Nusa Penida Island Tour",
        videoId: "W6h8cQ_1YpI",
        channel: "Island Escapes",
        duration: "24:50",
        thumbnailUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
        summary: "Experience the magic of Tegallalang rice terraces, cliffside sunset fire dance at Uluwatu, and Kelingking beach speedboat day-trips in Nusa Penida.",
        relatedBlogSlug: "ultimate-solo-travellers-guide-hidden-wonders-expeditions",
        relatedBlogTitle: "The Ultimate Solo Traveller's Guide: Exploring Hidden Wonders & Remote Expeditions",
        affiliateCta: {
          text: "Book Bali Private Pool Villas on Agoda",
          url: "https://agoda.tp.st/a927gV",
        }
      }
    ];
  } else if (lower.includes("switzerland") || lower.includes("swiss") || lower.includes("alps")) {
    videoResults = [
      {
        id: "vid_travel_swiss",
        title: "Switzerland by Scenic Train: Glacier Express, Zermatt & Jungfraujoch 4K",
        videoId: "linlz7-Pnvw",
        channel: "Alpine Journeys",
        duration: "31:20",
        thumbnailUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&auto=format&fit=crop&q=80",
        summary: "Epic high-alpine railway expedition across panoramic Swiss mountain passes, Matterhorn viewpoints, and Lauterbrunnen 72-waterfall valley.",
        relatedBlogSlug: "definitive-global-travel-and-india-discovery-destinations-guide",
        relatedBlogTitle: "The Definitive Global Travel & India Discovery Guide: 25 Iconic Destinations",
        affiliateCta: {
          text: "Book Swiss Travel Pass & Mountain Trains with Free Cancellation",
          url: "https://www.booking.com/index.html?aid=2026803",
        }
      }
    ];
  } else if (lower.includes("goa")) {
    videoResults = [
      {
        id: "vid_travel_goa",
        title: "Goa Complete 4K Travel Guide: North vs South Goa, Water Sports & Heritage",
        videoId: "w4Tj2a_t9_E",
        channel: "Coastal Chronicles",
        duration: "19:40",
        thumbnailUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80",
        summary: "Visual guide detailing Old Goa Portuguese churches, Palolem beach kayaking, Dudhsagar waterfall trek, and beach shack seafood dining.",
        relatedBlogSlug: "definitive-global-travel-and-india-discovery-destinations-guide",
        relatedBlogTitle: "The Definitive Global Travel & India Discovery Guide: 25 Iconic Destinations",
        affiliateCta: {
          text: "Book Beachfront Resorts in Goa on Booking.com",
          url: "https://www.booking.com/city/in/goa.html?aid=2026803",
        }
      }
    ];
  } else if (lower.includes("travel") || lower.includes("kerala") || lower.includes("ladakh") || lower.includes("kashmir") || lower.includes("festival")) {
    videoResults = [
      {
        id: "vid_travel_kerala",
        title: "Kerala Backwaters & Munnar Tea Hills Complete 4K Travel Guide & Route",
        videoId: "L_LUpnjgPso",
        channel: "Expedition Planet",
        duration: "22:10",
        thumbnailUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=80",
        summary: "Visual guide covering Fort Kochi heritage, Munnar tea estates, Eravikulam National Park, and overnight houseboat stays in Alleppey.",
        relatedBlogSlug: "definitive-global-travel-and-india-discovery-destinations-guide",
        relatedBlogTitle: "The Definitive Global Travel & India Discovery Guide: 25 Iconic Destinations",
        affiliateCta: {
          text: "Book Kerala Houseboats with Free Cancellation",
          url: "https://www.booking.com/city/in/kochi.html?aid=2026803",
        }
      },
      {
        id: "vid_travel_ladakh",
        title: "Ladakh High-Altitude Road Trip: Khardung La, Nubra Valley & Pangong Lake",
        videoId: "fJ9rUzIMcZQ",
        channel: "Himalayan Explorers",
        duration: "28:35",
        thumbnailUrl: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=600&auto=format&fit=crop&q=80",
        summary: "Comprehensive trans-Himalayan documentary detailing altitude acclimatization, motorcycle routes, monastery festivals, and lakeside camping.",
        relatedBlogSlug: "ultimate-solo-travellers-guide-hidden-wonders-expeditions",
        relatedBlogTitle: "The Ultimate Solo Traveller's Guide: Exploring Hidden Wonders & Remote Expeditions",
        affiliateCta: {
          text: "High-Altitude Thermal Windproof Gear on Amazon",
          url: "https://www.amazon.in/s?k=high+altitude+cold+weather+thermal+jacket+ladakh&tag=autoaiblog-21",
        }
      }
    ];
  } else {
    videoResults = [
      {
        id: "vid_trading_prop",
        title: "How to Pass a $200k Funded Prop Challenge: Risk Rules, Breakouts & Psychology",
        videoId: "3JZ_D3ELwOQ",
        channel: "Quant Trader Chronicle",
        duration: "19:50",
        thumbnailUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
        summary: "Step-by-step institutional risk architecture: position sizing, maximum daily loss protection, and taking high-probability breakout setups.",
        relatedBlogSlug: "nifty-50-sensex-record-highs-fii-dii-liquidity-breakout",
        relatedBlogTitle: "Nifty 50 & Sensex Technical Outlook: FII Inflows & Breakout Levels",
        affiliateCta: {
          text: "Claim 10% Discount on Funded Trader Markets (Code: arnab)",
          url: "https://fundedtradermarkets.com/ref/arnab",
        }
      }
    ];
  }

  return {
    intent: "VIDEO_SEARCH",
    agentName: "Video Workshop & Media Agent",
    speechText: `I found high-quality video tutorials and workshops for your query. You can watch them right here along with detailed summaries and related articles.`,
    markdownContent: `### 🎥 Video Search Results & Workshops\n\nHere are curated video tutorials matching your request with full summaries and related blog articles:`,
    videoResults,
    affiliateCta: {
      title: "Feature Your Video on SmartMag",
      description: "Reach 100,000+ targeted monthly traders, engineers, and travelers.",
      url: "/sponsor-video",
      buttonText: "Feature Your Video →",
    },
    recommendedBlogSlugs: videoResults.filter(v => v.relatedBlogSlug).map(v => ({
      title: v.relatedBlogTitle || v.title,
      slug: v.relatedBlogSlug!,
    })),
  };
}

/**
 * 🤖 Sub-Agent 4: AI Tool & Store Search Agent
 */
export function handleAiToolSearchAgent(query: string): MultiAgentResponse {
  return {
    intent: "AI_TOOL_SEARCH",
    agentName: "AI Tool & Digital Product Agent",
    speechText: `I found top-rated AI developer tools, cloud GPU clusters, and production-ready prompt toolkits from our AI Store.`,
    markdownContent: `### 🤖 AI Developer Tools & Digital Toolkits\n\nExplore our curated collection of verified AI tools and production templates:`,
    comparisonOffers: [
      {
        id: "tool_cursor",
        name: "Cursor AI Pro Code Editor",
        niche: "AI-Powered IDE",
        badge: "TOP DEVELOPER CHOICE",
        payoutSplit: "Claude 3.5 Sonnet Native",
        startingPrice: "Free / $20 mo",
        discountCode: "DEV2026",
        affiliateUrl: "https://amzn.to/3VjFaRp",
        isBestMatch: true,
        features: ["Full-codebase semantic indexing", "Multi-file automated refactoring", "Terminal auto-debugging", "Zero latency"],
      },
      {
        id: "tool_hypercompute",
        name: "HyperCompute Cloud GPUs",
        niche: "Serverless Cloud GPU",
        badge: "$100 FREE CREDITS",
        payoutSplit: "80% Cost Savings vs AWS",
        startingPrice: "$0.79 / GPU hr",
        discountCode: "SMARTMAG2026",
        affiliateUrl: "https://amzn.to/4gJpL5u",
        isBestMatch: false,
        features: ["On-Demand H100 & RTX 4090", "Instant PyTorch / vLLM launch", "Zero idle charges", "Global low-ping datacenters"],
      },
      {
        id: "tool_store_prompts",
        name: "Autonomous Multi-Agent Swarm Prompt Pack",
        niche: "SmartMag Digital Product",
        badge: "INSTANT DOWNLOAD",
        payoutSplit: "100% Verified Production Pack",
        startingPrice: "₹2,499 / $29",
        discountCode: "SWARM2026",
        affiliateUrl: "/store",
        isBestMatch: false,
        features: ["25+ Ready-to-run LangGraph workflows", "Trading signal bots", "SEO article generators", "Lifetime updates"],
      }
    ],
    affiliateCta: {
      title: "Explore the SmartMag AI Store",
      description: "Download verified quant toolkits, trading indicators, and multi-agent scripts.",
      url: "/store",
      buttonText: "Visit AI Store →",
      promoCode: "SWARM2026",
    },
    recommendedBlogSlugs: [
      { title: "The Agentic Revolution: How Autonomous AI Swarms Are Rewriting Software Engineering", slug: "the-agentic-revolution-autonomous-ai-swarms" },
      { title: "The Future of AI Robots: When will they be in our homes", slug: "the-future-of-ai-robots-when-will-they-be-in-our-homes-key-trends-innovations-and-whats-next-6576" },
    ],
  };
}

/**
 * 🗺️ Sub-Agent 5: Blog & Itinerary Search Agent
 */
export function handleBlogAndItineraryAgent(query: string): MultiAgentResponse {
  const catalog = getAllCatalogArticles();
  const lower = query.toLowerCase();

  // Find best matching catalog articles
  const matched = catalog.filter((a) => {
    const text = `${a.title} ${a.excerpt} ${a.category.name}`.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 3);
    return words.some(w => text.includes(w));
  });

  const selectedArticles = matched.length > 0 ? matched.slice(0, 3) : catalog.slice(0, 3);

  let speechText = `Here is what I found across our publication and travel destination guides.`;
  let markdown = `### 📚 Curated Editorial & Travel Guides\n\n`;

  if (lower.includes("itinerary") || lower.includes("kerala") || lower.includes("ladakh") || lower.includes("japan")) {
    speechText = `I have curated day-by-day travel itineraries and local secret recommendations for your destination.`;
  }

  for (const article of selectedArticles) {
    markdown += `#### 📖 [${article.title}](/blog/${article.slug})\n- **Category**: ${article.category.name} • **Read Time**: ${article.readTimeMinutes} mins\n- **Summary**: ${article.excerpt}\n\n`;
  }

  return {
    intent: "BLOG_SEARCH",
    agentName: "Editorial & Itinerary Knowledge Agent",
    speechText,
    markdownContent: markdown,
    affiliateCta: {
      title: "Book Verified Hotels & Travel Gear for Your Trip",
      description: "Get up to 40% off hotels with Booking.com partner rates and verified Amazon travel essentials.",
      url: "https://www.booking.com/index.html?aid=2026803",
      buttonText: "Browse Travel Deals →",
      promoCode: "TRAVEL2026",
    },
    recommendedBlogSlugs: selectedArticles.map((a) => ({
      title: a.title,
      slug: a.slug,
    })),
  };
}

/**
 * 🚀 Master Multi-Agent Pipeline Runner
 */
export async function runMultiAgentIntentPipeline(query: string): Promise<MultiAgentResponse> {
  const intent = detectUserIntent(query);

  switch (intent) {
    case "BOOKING":
      return handleBookingAgent(query);
    case "AFFILIATE_SEARCH":
      return handleAffiliateComparisonAgent(query);
    case "VIDEO_SEARCH":
      return handleVideoSearchAgent(query);
    case "AI_TOOL_SEARCH":
      return handleAiToolSearchAgent(query);
    case "BLOG_SEARCH":
    case "GENERAL_KNOWLEDGE":
    default:
      return handleBlogAndItineraryAgent(query);
  }
}
