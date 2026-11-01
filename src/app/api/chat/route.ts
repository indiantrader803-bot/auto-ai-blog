import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllCatalogArticles } from "@/lib/content/articles";
import { runMultiAgentIntentPipeline, detectUserIntent, parseTripParameters } from "@/lib/agents/multiAgentIntentRouter";
import { STORE_MOCKUP_PRODUCTS } from "@/lib/pipeline/agents/mockupCatalogData";
import {
  getBookingHotelUrl,
  getAgodaHotelUrl,
  getAviasalesFlightUrl,
  getKlookUrl,
  getGetTransferUrl,
  getSailyEsimUrl,
  getEconomyBookingsUrl,
} from "@/lib/affiliate/links";

export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, userQuery, mode = "BLOG", destination, durationDays, budgetTier } = body;

    const query = userQuery || messages?.[messages.length - 1]?.content || "";
    if (!query.trim()) {
      return NextResponse.json({ error: "Message query is required." }, { status: 400 });
    }

    const explabsKey = process.env.EXPLABS_API_KEY || process.env.EXPERIENTIALLABS_API_KEY || "";
    const explabsBaseUrl = process.env.EXPLABS_BASE_URL || "https://api.experientiallabs.ai";
    const explabsModel = process.env.EXPLABS_MODEL || "claude-sonnet-4.5";
    const geminiKey = process.env.GEMINI_API_KEY || "";

    const catalog = getAllCatalogArticles();
    const catalogSummary = catalog
      .map((a) => `- [${a.title}](/blog/${a.slug}): ${a.excerpt.slice(0, 100)}... (Category: ${a.category.name})`)
      .join("\n");

    const storeProductsSummary = STORE_MOCKUP_PRODUCTS.map(
      (p) => `- **${p.title}** (${p.category}): ₹${p.priceINR} / $${p.priceUSD} (${p.discountBadge}). Features: ${p.features.join(", ")}. Shipping: ${p.shippingDetails.carrier} (${p.shippingDetails.estimatedDelivery}) to ${p.shippingDetails.supportedCountries?.join(", ") || "Global"}.`
    ).join("\n");

    const isStoreMode = mode === "STORE" || query.toLowerCase().includes("product") || query.toLowerCase().includes("buy") || query.toLowerCase().includes("shipping") || query.toLowerCase().includes("return") || query.toLowerCase().includes("order") || query.toLowerCase().includes("headphone") || query.toLowerCase().includes("keyboard") || query.toLowerCase().includes("drone") || query.toLowerCase().includes("power station");
    const isTravelMode = !isStoreMode && (mode === "TRAVEL" || query.toLowerCase().includes("travel") || query.toLowerCase().includes("hotel") || query.toLowerCase().includes("flight") || query.toLowerCase().includes("itinerary") || query.toLowerCase().includes("kerala") || query.toLowerCase().includes("ladakh") || query.toLowerCase().includes("dubai") || query.toLowerCase().includes("japan") || query.toLowerCase().includes("goa") || query.toLowerCase().includes("bali"));

    let systemPrompt = "";

    if (isStoreMode) {
      systemPrompt = `You are the "TheSmartMag E-Commerce Store AI Concierge & Shopping Assistant" — dedicated EXCLUSIVELY to helping customers explore, select, and buy verified hardware gadgets, tech essentials, AI toolkits, and dropshipping products from TheSmartMag Store (store.thesmartmag.com).

STRICT OPERATIONAL DIRECTIVES (STORE CONCIERGE):
1. 🛍️ PRODUCT CATALOG & SPECS:
   - Provide accurate specifications, real prices (both INR ₹ and USD $), discount rates, and warranty details from the official catalog below.
   - For every product recommendation, include direct action link to [Explore / Add to Cart](/store).
2. 🚚 WORLDWIDE SHIPPING & TRACKING:
   - Free worldwide tracked doorstep shipping on all orders over ₹8,000 / $99.
   - Dispatch carriers: Blue Dart, DHL Express, FedEx Global, Delhivery with real-time tracking numbers.
   - Delivery timelines: 3 to 7 business days worldwide.
3. 💳 SECURE PAYMENT & RETURN GUARANTEE:
   - Payments processed 100% securely via Razorpay (UPI, Credit/Debit Cards, NetBanking, International Cards).
   - 30-Day Hassle-Free Returns & 100% Money-Back Guarantee on verified genuine hardware.
4. 🎙️ VOICE & TONE:
   - Concise, friendly, knowledgeable, and conversion-focused. Keep sentences crisp so voice speech synthesis sounds natural.

AVAILABLE PRODUCTS IN THESMARTMAG STORE:
${storeProductsSummary}`;
    } else if (isTravelMode) {
      systemPrompt = `You are the "SmartMag Elite AI Travel Concierge & Verified Booking Architect" — dedicated SOLELY AND EXCLUSIVELY to worldwide travel planning, hotel bookings, flight logistics, curated day-by-day itineraries, verified airport transfers, authentic culinary guides, and YouTube travel video recommendations.

STRICT DIRECTIVES:
- Only discuss travel, tourism, holiday itineraries, hotel & resort bookings, flights, local food, sightseeing, and travel logistics.
- Highlight verified booking options with partner links for Agoda, Booking.com, Klook experiences, and GetTransfer airport taxis.`;
    } else {
      systemPrompt = `You are the "SmartMag Elite AI Editorial Assistant & Technology Chronicle Concierge" — an authority on frontier Artificial Intelligence, software engineering, quantitative finance, and prop trading firms.

AVAILABLE BLOG ARTICLES ON SMARTMAG:
${catalogSummary}`;
    }

    let customReply = "";
    let modelUsed = "TheSmartMag Unified Multi-Agent Engine";
    let sourceUsed = isStoreMode ? "TheSmartMag Store AI Concierge" : isTravelMode ? "SmartTravel Concierge" : "SmartMag Editorial";

    // 1. ExperientialLabs Claude
    if (explabsKey) {
      try {
        const res = await fetch(`${explabsBaseUrl}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${explabsKey}`,
          },
          body: JSON.stringify({
            model: explabsModel,
            messages: [
              { role: "system", content: systemPrompt },
              ...(messages || [{ role: "user", content: query }]),
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            customReply = reply;
            modelUsed = explabsModel;
          }
        }
      } catch (err: any) {
        console.warn("[Chat API] ExperientialLabs error:", err.message);
      }
    }

    // 2. Google Gemini Fallback
    if (!customReply && geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt,
        });

        const result = await model.generateContent(query);
        const reply = result.response.text();
        if (reply) {
          customReply = reply;
          modelUsed = "gemini-1.5-flash";
        }
      } catch (err: any) {
        console.warn("[Chat API] Gemini error:", err.message);
      }
    }

    if (!customReply) {
      if (isStoreMode) {
        customReply = `🛍️ **Welcome to TheSmartMag Store Concierge!**

We offer direct factory-verified dropshipping and digital AI assets with tracked delivery:
- 🎧 **Wireless ANC Headphones (60H Battery)**: ₹2,399 ($28.99) with 40% OFF.
- ⚡ **Portable Power Station 600W (LiFePO4)**: ₹21,999 ($269.99) for fast-charging camp/remote setups.
- ⌨️ **RGB Mechanical Keyboard**: ₹1,299 ($16.99) hot-swappable gaming keys.
- 🚁 **4K Camera Drone GPS**: ₹18,999 ($229.99) with auto-return.
- 🔌 **Universal Travel Adapter**: ₹1,099 ($14.99) with 65W GaN dual USB-C ports.

Enjoy **Free Worldwide Shipping** and **30-Day Hassle-Free Returns**. Would you like help adding any item to your cart or tracking an order?`;
      } else {
        customReply = `Welcome to TheSmartMag AI Assistant. How can I assist your research, travel, or store purchase today?`;
      }
    }

    const cleanSpeech = customReply
      .replace(/[*_#`[\]()]/g, "")
      .replace(/\n+/g, " ")
      .slice(0, 300);

    return NextResponse.json({
      reply: customReply,
      speechText: cleanSpeech,
      modelUsed,
      sourceUsed,
      mode: isStoreMode ? "STORE" : isTravelMode ? "TRAVEL" : "BLOG",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process chat query" },
      { status: 500 }
    );
  }
}
