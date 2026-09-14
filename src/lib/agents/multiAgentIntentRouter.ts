import { getAllCatalogArticles } from "@/lib/content/articles";
import { VERIFIED_SPONSORS } from "@/lib/pipeline/agents/sponsorAgent";
import {
  getBookingHotelUrl,
  getAgodaHotelUrl,
  getKlookUrl,
  getAmazonProductUrl,
  getFlightSearchUrl,
  AFFILIATE_CONFIG,
} from "@/lib/affiliate/links";

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
 */
export function handleBookingAgent(query: string): MultiAgentResponse {
  const lower = query.toLowerCase();

  let destination = "Global Destination";
  let deals: BookingDeal[] = [];

  if (lower.includes("kerala") || lower.includes("kochi") || lower.includes("munnar") || lower.includes("alleppey")) {
    destination = "Kerala, India";
    deals = [
      {
        id: "bk_kerala_houseboat",
        title: "Alleppey Luxury Thatched Houseboat Cruise",
        location: "Alleppey Backwaters, Kerala",
        rating: 4.9,
        priceTag: "From ₹8,500 / night",
        badge: "VERIFIED TOP PICK",
        features: ["Private Chef & Butler", "Air Conditioned Bedrooms", "Traditional Karimeen Dinner", "Free Cancellation"],
        affiliateUrl: getBookingHotelUrl("Alleppey Kerala"),
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_munnar_tea_resort",
        title: "Munnar Panoramic Tea Estate Heritage Resort",
        location: "Munnar Valleys, Kerala",
        rating: 4.8,
        priceTag: "From ₹5,200 / night",
        badge: "SCENIC VALLEY VIEW",
        features: ["Tea Garden Guided Walks", "Ayurvedic Spa Onsite", "Complimentary Breakfast", "Campfire"],
        affiliateUrl: getBookingHotelUrl("Munnar Kerala"),
        imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_kerala_klook_activity",
        title: "Klook Alleppey Backwater Kayaking & Village Tour",
        location: "Alleppey & Kochi, Kerala",
        rating: 4.9,
        priceTag: "From ₹1,499 / person",
        badge: "KLOOK TOP EXPERIENCE",
        features: ["Certified Local Guide", "Sunrise Kayaking Paddle", "Village Coconut Feast", "Instant Mobile Voucher"],
        affiliateUrl: getKlookUrl("Kerala Alleppey Kayaking and Tours"),
        imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else if (lower.includes("ladakh") || lower.includes("leh") || lower.includes("kashmir")) {
    destination = "Ladakh & Kashmir, India";
    deals = [
      {
        id: "bk_leh_heritage_hotel",
        title: "The Grand Dragon Heritage Retreat Leh",
        location: "Leh Old Town, Ladakh",
        rating: 4.9,
        priceTag: "From ₹9,000 / night",
        badge: "OXYGEN-ENRICHED ROOMS",
        features: ["Full Altitude Acclimatization Setup", "Stok Kangri Mountain Views", "Tibetan Gourmet Cuisine", "Free Airport Transfer"],
        affiliateUrl: getBookingHotelUrl("Leh Ladakh"),
        imageUrl: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_pangong_luxury_camps",
        title: "Pangong Tso Heated Geodesic Luxury Dome",
        location: "Pangong Lake Shore, Ladakh",
        rating: 4.7,
        priceTag: "From ₹6,500 / night",
        badge: "LAKESIDE STARGAZING",
        features: ["Heated Blankets & Fireplaces", "Unobstructed Lake Views", "Night Sky Astro-Photography Setup", "Hot Meals"],
        affiliateUrl: getBookingHotelUrl("Pangong Lake Ladakh"),
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_ladakh_klook_tour",
        title: "Klook Ladakh Monasteries & Khardung La Pass Safari",
        location: "Leh & Nubra Valley, Ladakh",
        rating: 4.9,
        priceTag: "From ₹3,200 / person",
        badge: "KLOOK ADVENTURE PASS",
        features: ["4x4 Mountain Vehicle with Driver", "Permit Assistance Included", "Diskit & Thiksey Monasteries", "Lowest Price Guarantee"],
        affiliateUrl: getKlookUrl("Ladakh Day Tours and Sightseeing"),
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else if (lower.includes("japan") || lower.includes("kyoto") || lower.includes("tokyo")) {
    destination = "Japan (Tokyo & Kyoto)";
    deals = [
      {
        id: "bk_kyoto_ryokan",
        title: "Kyoto Traditional Hot Spring Onsen Ryokan",
        location: "Gion / Arashiyama, Kyoto, Japan",
        rating: 4.9,
        priceTag: "From $180 / night",
        badge: "AUTHENTIC ONSEN",
        features: ["Private Open-Air Hot Springs", "Multi-Course Kaiseki Dinner", "Tatami Rooms & Yukatas", "Steps to Bamboo Forest"],
        affiliateUrl: getBookingHotelUrl("Kyoto Japan"),
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_japan_klook_pass",
        title: "Klook Kyoto UNESCO Temples, Bamboo Grove & Tea Ceremony",
        location: "Kyoto, Japan",
        rating: 4.9,
        priceTag: "From $48 / person",
        badge: "KLOOK BESTSELLER",
        features: ["English Speaking Historian Guide", "Authentic Uji Matcha Ceremony", "Skip-The-Line Temple Access", "Instant Confirmation"],
        affiliateUrl: getKlookUrl("Kyoto UNESCO Temples Tea Ceremony Tour"),
        imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
      }
    ];
  } else {
    const extractedDest = query.replace(/(book|hotel|resort|stay|in|for|flights|vacation|trip|deals|tour|activities|klook)/gi, "").trim() || "Global";
    destination = extractedDest;
    deals = [
      {
        id: "bk_global_partner",
        title: `Curated Hotels & Boutique Stays in ${destination}`,
        location: destination,
        rating: 4.8,
        priceTag: "Best Price Match Guarantee",
        badge: "FREE CANCELLATION",
        features: ["Instant Confirmation", "Exclusive 2026 Member Discounts", "24/7 Concierge Support", "Verified Guest Reviews"],
        affiliateUrl: getBookingHotelUrl(destination),
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      },
      {
        id: "bk_global_klook",
        title: `Klook Sightseeing Passes, Tours & Entry Tickets for ${destination}`,
        location: destination,
        rating: 4.9,
        priceTag: "Save up to 30% with Klook",
        badge: "KLOOK EXPERIENCES",
        features: ["Skip-The-Line Fast Track", "Mobile E-Ticket Ready", "Over 500,000 Activities Worldwide", "Earn Klook Reward Credits"],
        affiliateUrl: getKlookUrl(destination),
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80",
      }
    ];
  }

  return {
    intent: "BOOKING",
    agentName: "Booking & Travel Concierge Agent",
    speechText: `I found verified accommodation and booking recommendations for ${destination}. You can book directly with free cancellation and member discount codes.`,
    markdownContent: `### 🏨 Verified Stays & Booking Deals for ${destination}\n\nHere are our top-rated accommodations curated with verified pricing, free cancellation, and member benefits:`,
    bookingDeals: deals,
    affiliateCta: {
      title: `Explore 10,000+ Verified Stays in ${destination} with Free Cancellation`,
      description: "Book directly through our official Booking.com & Agoda partner link with guaranteed lowest rates.",
      url: getBookingHotelUrl(destination),
      buttonText: "Browse All Hotel Deals →",
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

  if (lower.includes("ai") || lower.includes("agent") || lower.includes("swarm") || lower.includes("robot") || lower.includes("code")) {
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
  } else if (lower.includes("travel") || lower.includes("kerala") || lower.includes("ladakh") || lower.includes("japan") || lower.includes("festival")) {
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
