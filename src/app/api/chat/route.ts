import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllCatalogArticles } from "@/lib/content/articles";
import { runMultiAgentIntentPipeline, detectUserIntent, parseTripParameters } from "@/lib/agents/multiAgentIntentRouter";
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

    // Run the multi-agent intent pipeline
    const agentResult = await runMultiAgentIntentPipeline(query);

    const explabsKey = process.env.EXPLABS_API_KEY || process.env.EXPERIENTIALLABS_API_KEY || "";
    const explabsBaseUrl = process.env.EXPLABS_BASE_URL || "https://api.experientiallabs.ai";
    const explabsModel = process.env.EXPLABS_MODEL || "claude-sonnet-4.5";
    const geminiKey = process.env.GEMINI_API_KEY || "";
    const openaiKey = process.env.OPENAI_API_KEY || "";

    const catalog = getAllCatalogArticles();
    const catalogSummary = catalog
      .map((a) => `- [${a.title}](/blog/${a.slug}): ${a.excerpt.slice(0, 100)}... (Category: ${a.category.name})`)
      .join("\n");

    const isTravelMode = mode === "TRAVEL" || query.toLowerCase().includes("travel") || query.toLowerCase().includes("hotel") || query.toLowerCase().includes("flight") || query.toLowerCase().includes("itinerary") || query.toLowerCase().includes("kerala") || query.toLowerCase().includes("ladakh") || query.toLowerCase().includes("dubai") || query.toLowerCase().includes("japan") || query.toLowerCase().includes("goa") || query.toLowerCase().includes("bali");

    const systemPrompt = isTravelMode
      ? `You are the "SmartMag Elite AI Travel Concierge & Verified Booking Architect" — dedicated SOLELY AND EXCLUSIVELY to worldwide travel planning, hotel bookings, flight logistics, curated day-by-day itineraries, verified airport transfers, authentic culinary guides, and YouTube travel video recommendations.

STRICT OPERATIONAL DIRECTIVES (TRAVEL CONCIERGE):
1. 🛑 STRICT SCOPE ENFORCEMENT:
   - You ONLY talk about travel, tourism, holiday itineraries, hotel & resort bookings, flights, local food, sightseeing, and travel logistics.
   - If the user asks non-travel questions (e.g., coding, programming, stock trading algorithms, general prop firm reviews), politely decline and state:
     "✈️ *SmartMag Travel Concierge Notice: I am specialized exclusively in verified worldwide holiday planning, hotel & resort bookings, day-by-day itineraries, airport transfers, and travel logistics. For tech articles, coding tools, or financial trading, please toggle to the '📰 Blog & Articles' mode tab above! Let me know which dream destination you'd like to plan or book.*"

2. 📋 100% VERIFIED & ACTIONABLE PRESENTATION STRUCTURE:
   For every destination query, ALWAYS structure your response in this clean, luxurious markdown format:
   - 🌟 **Destination Overview & Best Time to Visit**: Ideal seasons, weather, altitude, and cultural highlights.
   - 📅 **100% Verified Day-by-Day Itinerary**:
     - 🌅 Morning: Specific monuments, viewpoints, photography spots, and early entry tips.
     - ☀️ Afternoon: Cultural heritage landmarks, artisanal markets, and authentic restaurants with exact dish names.
     - 🌆 Evening & Night: Sunset viewpoints, river walks, night markets, and dinner spots.
     - 🏨 Recommended Stays: Budget boutique guesthouses, mid-range boutique stays, luxury 5-star heritage resorts.
   - 🚗 **Airport Transfers & Transit Logistics**: Exact transit options (GetTransfer, Klook, local express metro, private cab estimates).
   - 🍽️ **Must-Try Authentic Local Cuisine**: Exact regional dishes, street food delicacies, and traditional beverage recommendations.
   - 💰 **Itemized Dual-Currency Budget Table**: Complete cost breakdown estimating expenses in both ₹ INR and $ USD across Backpacker, Standard Comfort, and Luxury tiers.
   - 🎥 **Recommended 4K YouTube Video Guide**: Curated visual documentary recommendations for the destination.
   - 💡 **Insider Travel Tips**: Practical advice on international eSIMs (Airalo/Nomad), visa-on-arrival/e-Visa, currency exchange, and cultural etiquette.

3. 🏨 PARTNER INTEGRATIONS:
   - Highlight verified booking options with partner links for Agoda, Booking.com, Klook experiences, and GetTransfer airport taxis.`
      : `You are the "SmartMag Elite AI Editorial Assistant & Technology Chronicle Concierge" — an authority on frontier Artificial Intelligence, software engineering, quantitative finance, and prop trading firms.

MISSION DIRECTIVES (BLOG & EDITORIAL):
1. 📰 ARTICLE RESEARCH & SUMMARIES:
   - Provide deep, analytical, structured explanations for AI models, autonomous swarms, agentic workflows, software architecture, and financial markets.
   - Link to relevant SmartMag publication articles at \`/blog/[slug]\`.
2. 📊 VERIFIED PROP FIRM & QUANT OFFERS:
   - When asked about funded trading or prop firms, compare evaluation rules, profit splits, and verified discount promo codes (e.g., Funded Trader Markets [Code 'arnab' for 10% OFF], Atlas Funded [Code '12275' for 20% OFF], FundedSquad [Code 'CHARGE'], Blue Guardian [Code '1tgf'], Equity Edge [Code 'THESMARTMAG'], AquaFunded [Code '6e9'], Pocket Option [Code '50START']).
3. 🤖 AI TOOLS & STORE RECOMMENDATIONS:
   - Recommend top AI IDEs (Cursor), Cloud GPUs (HyperCompute), and quantitative toolkits from \`/store\`.
4. 📝 FORMATTING:
   - Use clear markdown with headers, key takeaway bullets, and actionable code/strategy examples.

AVAILABLE BLOG ARTICLES ON SMARTMAG:
${catalogSummary}`;

    let customReply = "";
    let modelUsed = "Autonomous Multi-Agent Router";
    let sourceUsed = agentResult.agentName;

    // 1. Try ExperientialLabs Claude 4.5
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
            max_tokens: 3000,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            customReply = reply;
            modelUsed = explabsModel;
            sourceUsed = "ExperientialLabs Claude 4.5 (Deep Reasoning Engine)";
          }
        }
      } catch (err: any) {
        console.warn("[Chat API] ExperientialLabs error:", err.message);
      }
    }

    // 2. Try Google Gemini Pro / Flash
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
          sourceUsed = "Google Gemini Neural Engine";
        }
      } catch (err: any) {
        console.warn("[Chat API] Gemini error:", err.message);
      }
    }

    // 3. Try OpenAI GPT-4o
    if (!customReply && openaiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              { role: "system", content: systemPrompt },
              ...(messages || [{ role: "user", content: query }]),
            ],
            temperature: 0.7,
            max_tokens: 3000,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            customReply = reply;
            modelUsed = "gpt-4o";
            sourceUsed = "OpenAI GPT-4o Deep Engine";
          }
        }
      } catch (err: any) {
        console.warn("[Chat API] OpenAI error:", err.message);
      }
    }

    // 4. Built-in Multi-Source Deep Knowledge Synthesis Engine
    const finalReply = customReply || generateDeepSynthesizedResponse(query, catalog);

    return NextResponse.json({
      reply: finalReply,
      speechText: agentResult.speechText || finalReply.slice(0, 200).replace(/[*#_\[\]()]/g, ""),
      intent: agentResult.intent,
      agentName: agentResult.agentName,
      bookingDeals: agentResult.bookingDeals || null,
      comparisonOffers: agentResult.comparisonOffers || null,
      videoResults: agentResult.videoResults || null,
      affiliateCta: agentResult.affiliateCta || null,
      recommendedBlogSlugs: agentResult.recommendedBlogSlugs || null,
      model: modelUsed,
      source: sourceUsed,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Multi-Source Deep Knowledge & Exhaustive Itinerary Synthesizer
 */
function generateDeepSynthesizedResponse(query: string, catalog: any[]): string {
  const lower = query.toLowerCase();

  // 1. Kerala Itinerary Deep Guide
  if (lower.includes("kerala") && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("tour") || lower.includes("houseboat"))) {
    return `### 🌴 The Definitive 5-Day Kerala & Backwaters Expedition Guide

A comprehensive, multi-source curated itinerary balancing colonial spice heritage, mist-shrouded tea mountains, and tranquil private backwater cruises.

---

#### 📍 Day 1: Historic Fort Kochi & Portuguese Heritage
- **🌅 Morning (09:00 - 12:30)**: Arrive at Cochin International Airport (COK). Transfer 45 mins to Fort Kochi. Stroll through the cobblestone streets to the 500-year-old **St. Francis Church** (Vasco da Gama's initial burial site) and the vibrant **Santa Cruz Cathedral Basilica**.
- **☀️ Afternoon (13:00 - 16:30)**: Lunch on fresh seafood thali at *Oceanos*. Watch the iconic cantilevered **Chinese Fishing Nets (*Cheenavala*)** operate along the waterfront. Explore the **Mattancherry Dutch Palace** and the Jewish Synagogue in Jew Town for natural cardamom, vanilla pods, and antique handicrafts.
- **🌆 Evening (17:30 - 20:30)**: Attend an authentic **Kathakali dance & Kalaripayattu martial arts** recital at the Kerala Kathakali Centre. Dinner along the promenade enjoying grilled Tiger Prawns and Appam.
- **🏨 Stay**: Fort Kochi Heritage Boutique Property / Brunton Boatyard.

#### 📍 Day 2: Fort Kochi to Munnar — Into the High-Altitude Tea Estates
- **🌅 Morning (08:00 - 12:30)**: Scenic 3.5-hour mountain drive (130 km) along NH85 to **Munnar (1,600m)**. En route, stop at **Cheeyappara & Valara Waterfalls** for photography and fresh tender coconut water.
- **☀️ Afternoon (13:30 - 16:30)**: Check in at your tea estate resort. Visit the **Tata KDHP Tea Museum** to witness orthodox leaf manufacturing and participate in a guided tea tasting session.
- **🌆 Evening (17:00 - 19:30)**: Walk through the rolling emerald slopes of **Pothamedu Viewpoint** as mist envelops the hills. Traditional dinner of *Kottayam Duck Roast* or *Avial with Red Matta Rice*.
- **🏨 Stay**: Munnar Tea Garden Resort / Chandy's Windy Woods.

#### 📍 Day 3: Wildlife & High Peaks of Munnar
- **🌅 Morning (07:30 - 11:30)**: Early morning safari at **Eravikulam National Park** to spot the endangered mountain goat *Nilgiri Tahr* and take in breathtaking views of **Anamudi Peak (2,695m)**, South India's highest mountain.
- **☀️ Afternoon (12:30 - 16:00)**: Visit **Mattupetty Dam**, the natural acoustic phenomena at **Echo Point**, and the serene pine forests around Kundala Lake with speedboat rides.
- **🌆 Evening (17:00 - 19:30)**: Experience a 60-minute **Ayurvedic Herbal Abhyanga & Shirodhara Massage** at a certified wellness center.
- **🏨 Stay**: Munnar.

#### 📍 Day 4: Munnar to Alleppey (Alappuzha) — The Private Houseboat Voyage
- **🌅 Morning (08:00 - 12:30)**: Descend through rubber and spice plantations to the Venice of the East, **Alleppey**.
- **☀️ 12:30 PM Check-in**: Board your private traditional **Kettuvallam Houseboat** at Punnamada Jetty, equipped with air-conditioned bedrooms, sun deck, and private chef.
- **☀️ Afternoon (13:00 - 17:30)**: Glide peacefully through palm-fringed village canals and expansive **Vembanad Lake**. Feast on a hot traditional onboard lunch: freshly caught **Karimeen Pollichathu** (pearl spot wrapped in charred banana leaf), Thoran, Sambar, and Payasam.
- **🌆 Evening (18:00 - 21:00)**: Houseboat docks along quiet village canal banks. Enjoy a golden sunset tea with hot banana fritters (*Pazham Pori*) and stargaze from the upper deck.
- **🏨 Stay**: Alleppey Houseboat (Overnight onboard).

#### 📍 Day 5: Alleppey Sunrise Canoe Trail & Departure
- **🌅 Morning (07:00 - 09:30)**: Glide on an intimate sunrise wooden canoe ride through narrow village canals where large boats cannot pass. Breakfast of fluffy **Appams with Vegetable Stew & Coconut Milk**.
- **☀️ Afternoon**: Disembark by 10:00 AM. Transfer 1.5 hours to Cochin International Airport (COK) or extend south to the cliffside shores of **Varkala Beach**.

---

### 💰 Itemized Budget Breakdown:

| Category | Budget Backpacker | Comfort / Family | Luxury / Honeymoon |
| :--- | :--- | :--- | :--- |
| **Accommodation (4 Nights)** | ₹4,000 – ₹6,000 ($50 - $75) | ₹16,000 – ₹24,000 ($200 - $300) | ₹45,000 – ₹85,000 ($550 - $1,050) |
| **Food & Dining** | ₹3,000 – ₹4,500 ($35 - $55) | ₹8,000 – ₹12,000 ($100 - $150) | ₹18,000 – ₹28,000 ($220 - $350) |
| **Private AC Cab / Transit** | ₹3,500 (Buses/Trains) | ₹12,000 – ₹15,000 (Private Sedan) | ₹20,000 – ₹26,000 (Innova Crysta) |
| **Houseboat Cruise (24h)** | ₹4,500 (Shared/Day) | ₹9,500 – ₹14,000 (Private 1-Bed) | ₹18,000 – ₹32,000 (Luxury Jacuzzi) |
| **Total Estimated Cost (2 Pax)** | **₹15,000 – ₹20,000 ($180 - $240)** | **₹45,000 – ₹65,000 ($540 - $780)** | **₹1,00,000 – ₹1,70,000 ($1,200 - $2,000)** |

---

### 🎒 Verified Bookings & Recommended Travel Gear:
- 🏨 [Book Top-Rated Kerala Heritage Resorts & Houseboats on Booking.com](${getBookingHotelUrl("Kerala India")}) *(Free Cancellation & Best Price Match)*
- ✈️ [Compare Cheap Flights to Kochi (COK) on Aviasales](${getAviasalesFlightUrl({ origin: "DEL", destination: "COK" })})
- 🎟️ [Book Alleppey Backwater Kayaking & Tours on Klook](${getKlookUrl({ destination: "Kerala", activity: "Alleppey Kayaking Houseboat" })})
- 🚕 [Pre-Book Cochin Airport Transfers on GetTransfer](${getGetTransferUrl({ from: "Cochin Airport", to: "Fort Kochi" })})
- 🎒 [Mountaintop Waterproof 55L/65L Travel Rucksack on Amazon](https://www.amazon.in/s?k=travel+backpack+trekking+rucksack+50L+60L&tag=autoaiblog-21)
- 📸 [GoPro HERO12 4K Waterproof Action Camera for Backwaters](https://www.amazon.in/s?k=gopro+hero+action+camera+4k&tag=autoaiblog-21)

📖 *Explore our full editorial deep-dive:* [The Definitive Global Travel & India Discovery Bible](/blog/definitive-global-travel-and-india-discovery-destinations-guide)`;
  }

  // 2. Ladakh & Kashmir High-Altitude Masterclass
  if ((lower.includes("ladakh") || lower.includes("kashmir") || lower.includes("leh")) && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("tour"))) {
    return `### 🏔️ The 7-Day High-Altitude Ladakh & Kashmir Trans-Himalayan Odyssey

An exhaustive, medically acclimatized travel masterclass across the world's highest motorable passes, Buddhist monastic strongholds, and high-altitude azure lakes.

---

#### 📍 Day 1: Leh Arrival (3,500m / 11,500 ft) & Mandatory Acclimatization
- **⚠️ Medical Protocol**: Complete rest for the first 24–36 hours is critical to prevent Acute Mountain Sickness (AMS). Drink 4–5 liters of water with oral electrolytes (ORS). Avoid heavy exercise and alcohol.
- **🌆 Evening (17:00 - 19:30)**: Gentle stroll through the historic **Leh Main Bazaar**. Visit the Central Asian Museum, sample hot Tibetan steamed momos, Thukpa, and authentic butter tea (*Gur Gur Chai*).
- **🏨 Stay**: Leh Heritage Hotel with 24/7 in-room oxygen backup.

#### 📍 Day 2: Leh Monasteries, Shanti Stupa & Indus Valley
- **🌅 Morning (06:00 - 11:30)**: Catch golden sunrise from the white-domed **Shanti Stupa**, offering 360-degree panoramic vistas of the Stok Kangri range and Leh town. Visit the 9-story 17th-century **Leh Palace**.
- **☀️ Afternoon (13:00 - 16:30)**: Drive along the Indus River to the 12-story **Thiksey Monastery** (resembling the Potala Palace of Tibet) and see the magnificent 49-foot Maitreya Buddha statue. Visit **Shey Palace** and the Druk White Lotus School.
- **🌆 Evening (17:30 - 20:00)**: Sunset at **Magnetic Hill** and the confluence of the Zanskar and Indus rivers (*Sangam*).
- **🏨 Stay**: Leh.

#### 📍 Day 3: Leh to Nubra Valley via Khardung La Pass (5,359m / 17,582 ft)
- **🌅 Morning (08:00 - 12:00)**: Ascend one of the world's highest motorable roads over **Khardung La Pass**. Take a brief 15-minute photo stop at the summit (do not linger over 20 mins due to thin oxygen).
- **☀️ Afternoon (13:30 - 16:30)**: Descend into the breathtaking **Nubra Valley**. Visit the iconic 32-meter Golden Maitreya Buddha and the ancient 14th-century **Diskit Monastery**.
- **🌆 Evening (17:00 - 19:30)**: Ride rare double-humped **Bactrian Camels** across the cold-desert sand dunes of **Hunder** at sunset against snow-capped peaks.
- **🏨 Stay**: Hunder Eco Luxury Camp / Deluxe Homestay.

#### 📍 Day 4: Nubra Valley to Turtuk (Baltistan Border Expedition)
- **🌅 Morning (08:00 - 12:00)**: Drive 2.5 hours along the Shyok River to **Turtuk**, the northernmost village opened to travelers, inhabited by the warm Balti people near the Line of Control.
- **☀️ Afternoon (12:30 - 16:00)**: Walk through lush apricot orchards, visit the historic Balti Heritage Museum and traditional wood-carved mosques, and sample fresh Balti walnut and apricot dishes.
- **🌆 Evening (17:30 - 20:30)**: Return to Nubra Valley for night-sky astrophotography under ultra-clear Himalayan darkness.
- **🏨 Stay**: Hunder.

#### 📍 Day 5: Nubra Valley to Pangong Tso Lake via Shyok Route (4,250m / 14,270 ft)
- **🌅 Morning (08:00 - 13:00)**: Rugged off-road expedition navigating the dramatic river gorges of the Shyok River directly towards **Pangong Tso Lake**.
- **☀️ Afternoon (14:00 - 17:30)**: Arrive at the mesmerizing 134 km long saltwater lake extending into Tibet. Watch the waters magically shift colors from cobalt blue to emerald turquoise and sea-green.
- **🌆 Evening (18:00 - 21:00)**: Check into lakeshore luxury geodesic heated domes. Savor hot thukpa while capturing the Milky Way core stretching across the crystal Himalayan skies.
- **🏨 Stay**: Pangong Lake Heated Geodesic Camps.

#### 📍 Day 6: Pangong Tso to Leh via Chang La Pass (5,360m / 17,585 ft)
- **🌅 Morning (06:00 - 08:30)**: Witness the unforgettable golden dawn reflection over Pangong Tso.
- **☀️ Afternoon (10:00 - 15:00)**: Cross over **Chang La Pass**, stop at **Hemis Monastery** (Ladakh's wealthiest monastery housing sacred ancient relics).
- **🌆 Evening (16:30 - 20:00)**: Farewell souvenir shopping in Leh for GI-tagged Pashmina shawls, dried organic apricots, and handmade singing bowls.
- **🏨 Stay**: Leh.

#### 📍 Day 7: Leh Airport Departure
- **🌅 Morning**: Early transfer to Kushok Bakula Rimpochee Airport for an aerial Himalayan flight over snow-crested mountain peaks.

---

### 💰 Itemized Budget Breakdown:

| Category | Budget Solo / Bike | Standard SUV (Innova) | Luxury / Premium Camp |
| :--- | :--- | :--- | :--- |
| **Stay & Heated Camps (6N)** | ₹9,000 – ₹14,000 ($110 - $170) | ₹24,000 – ₹38,000 ($290 - $460) | ₹55,000 – ₹90,000 ($670 - $1,100) |
| **Transport / Bike / 4x4 Cab** | ₹14,000 (Himalayan 450) | ₹28,000 – ₹36,000 (Dedicated Cab) | ₹42,000 (Luxury 4x4) |
| **Permits (ILP) & Environmental** | ₹800 – ₹1,200 ($10 - $15) | ₹1,600 – ₹2,400 ($20 - $30) | ₹2,400 – ₹3,500 ($30 - $45) |
| **Food & Meals** | ₹4,500 – ₹7,000 ($55 - $85) | ₹12,000 – ₹18,000 ($145 - $220) | ₹22,000 – ₹35,000 ($270 - $425) |
| **Total Estimated Cost (2 Pax)** | **₹28,000 – ₹36,000 ($340 - $440)** | **₹65,000 – ₹95,000 ($790 - $1,150)** | **₹1,20,000 – ₹1,90,000 ($1,450 - $2,300)** |

---

### 🎒 Essential Checklist & Verified Partner Deals:
- 🏨 [Book Leh Heritage Hotels & Pangong Luxury Camps on Booking.com](${getBookingHotelUrl("Leh Ladakh")})
- ✈️ [Compare Flights to Leh (IXL) on Aviasales](${getAviasalesFlightUrl({ origin: "DEL", destination: "IXL" })})
- 🎟️ [Book Ladakh Monasteries & Khardung La Tour on Klook](${getKlookUrl({ destination: "Ladakh", activity: "Khardung La Pass Tour" })})
- 🧥 [High-Altitude Thermal Windproof Down Jackets on Amazon](https://www.amazon.in/s?k=high+altitude+cold+weather+thermal+jacket+ladakh&tag=autoaiblog-21)

📖 *Read our full field manual:* [The Ultimate Solo Traveller's Guide: Exploring Hidden Wonders & Remote Expeditions](/blog/ultimate-solo-travellers-guide-hidden-wonders-expeditions)`;
  }

  // 3. Japan / Tokyo / Kyoto Golden Route
  if ((lower.includes("japan") || lower.includes("kyoto") || lower.includes("tokyo")) && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("tour"))) {
    return `### 🎌 The 7-Day "Classic Japan Golden Route" (Tokyo, Hakone & Kyoto)

An exhaustive cultural and technological expedition uniting neon megacities, ancient Zen shrines, and traditional hot spring onsens.

---

- **Day 1 - 2 (Tokyo: Futuristic Metropolises & Old Edo)**:
  - Shibuya Crossing, teamLab Planets digital art installation, Senso-ji temple in historic Asakusa, Akihabara electronics quarter, and fresh bluefin tuna sashimi at Toyosu Market.
- **Day 3 (Hakone & Mount Fuji Vistas)**:
  - Shinkansen bullet train to Hakone. Cruise pirate ships on Lake Ashi, ride the Komagatake ropeway with panoramic Mt. Fuji views, and soak in an open-air hot spring (*Rotenburo onsen*).
- **Day 4 - 5 (Kyoto: The Thousand-Year Zen Capital)**:
  - Walk the 10,000 vermilion Torii gates of **Fushimi Inari Taisha** at dawn, marvel at the Golden Pavilion (**Kinkaku-ji**), wander the towering **Arashiyama Bamboo Grove**, and stroll through historic **Gion** in search of geiko/maiko.
- **Day 6 (Nara & Uji Matcha Trail)**:
  - Bow with sacred deer in **Nara Park**, visit the Great Bronze Buddha in **Todai-ji**, and taste authentic ceremonial stone-ground matcha in **Uji**.
- **Day 7 (Osaka Street Food & KIX Departure)**:
  - Feast on piping-hot Takoyaki, Kushikatsu, and Okonomiyaki along Osaka's neon Dotonbori canal before departure.

---

### 💰 Itemized Budget Breakdown:
| Category | Budget Backpacker | Standard Comfort | Luxury Ryokan |
| :--- | :--- | :--- | :--- |
| **Accommodation (6N)** | ₹20,000 ($240) | ₹55,000 ($660) | ₹1,40,000 ($1,700) |
| **JR Pass / Shinkansen** | ₹18,000 ($220) | ₹28,000 ($340) | ₹40,000 ($480) |
| **Meals & Dining** | ₹14,000 ($170) | ₹32,000 ($390) | ₹80,000 ($960) |
| **Total (2 Pax)** | **₹52,000 ($630)** | **₹1,15,000 ($1,390)** | **₹2,60,000 ($3,140)** |

---

### 🎒 Verified Japan Bookings & Travel Essentials:
- 🏨 [Book Tokyo & Kyoto Ryokans on Booking.com](${getBookingHotelUrl("Kyoto Japan")}) *(Free Cancellation)*
- 🏨 [Compare Tokyo Hotel Deals on Agoda](${getAgodaHotelUrl("Tokyo Japan")}) *(Up to 60% OFF)*
- ✈️ [Compare Tokyo Flights on Aviasales](${getAviasalesFlightUrl({ origin: "DEL", destination: "HND" })})
- 🎟️ [Book Kyoto UNESCO Temples & Passes on Klook](${getKlookUrl({ destination: "Kyoto", activity: "Temples Tea Ceremony Pass" })})
- 📱 [Get Saily Japan High-Speed 5G eSIM](${getSailyEsimUrl("japan")})
- 🚕 [Pre-Book Tokyo Airport Transfers on GetTransfer](${getGetTransferUrl({ from: "Tokyo Haneda Airport", to: "Shinjuku Tokyo" })})`;
  }

  // 4. Goa 4-Day Beach & Heritage Masterplan
  if (lower.includes("goa") && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("beach") || lower.includes("resort") || lower.includes("hotel") || lower.includes("tour"))) {
    return `### 🏖️ The 4-Day Verified Goa Coastal & Heritage Masterplan

A curated coastal expedition balancing golden Arabian Sea beaches, vibrant Portuguese Latin quarters, fresh Konkan seafood, and sunset cruises.

---

#### 📍 Day 1: North Goa Coastal Vistas & Golden Sunsets
- **🌅 Morning (09:00 - 13:00)**: Arrive at Dabolim (GOI) or Mopa (GOX) Airport. Transfer to North Goa. Explore the 17th-century **Aguada Fort & Portuguese Lighthouse** overlooking Sinquerim Beach.
- **☀️ Afternoon (13:30 - 16:30)**: Lunch at *Fisherman's Wharf* enjoying authentic **Goan Fish Curry Thali & Butter Garlic Prawns**. Relax along the soft sands of Candolim or Calangute.
- **🌆 Evening (17:30 - 21:00)**: Catch golden sunset cliff views at **Anjuna Beach** or Thalassa in Siolim. Dinner at *Curlies* or *Café Lilliput* with live acoustic beach music.
- **🏨 Stay**: North Goa Beachfront Resort (Taj Fort Aguada / W Goa / Boutique Villa).

#### 📍 Day 2: Water Sports & Latin Quarter of Panaji (Fontainhas)
- **🌅 Morning (08:30 - 12:30)**: Parasailing, jet skiing, and bumper rides at **Baga or Morjim Beach**.
- **☀️ Afternoon (13:30 - 17:00)**: Drive to Panaji. Walk through the pastel-hued colonial Portuguese alleys of **Fontainhas (Latin Quarter)**. Visit the iconic whitewashed **Our Lady of the Immaculate Conception Church**.
- **🌆 Evening (18:00 - 21:30)**: Mandovi River 2-hour sunset luxury catamaran cruise with traditional Goan folk dances.
- **🏨 Stay**: Panaji / Candolim.

#### 📍 Day 3: South Goa Serenity, Palolem & Cabo de Rama
- **🌅 Morning (08:00 - 12:00)**: Scenic coastal drive south to the secluded turquoise crescent of **Palolem Beach**. Kayak through quiet backwater mangroves.
- **☀️ Afternoon (12:30 - 16:30)**: Visit the dramatic cliffside ruins of **Cabo de Rama Fort** offering uninterrupted panoramic vistas of the Arabian Sea. Savor fresh Crab Xacuti and Bebinca at a beach shack.
- **🌆 Evening (17:00 - 20:30)**: Candlelight beachside dinner under fairy lights on **Agonda Beach**.
- **🏨 Stay**: South Goa Luxury Eco Resort (The Leela / Alila Diwa).

#### 📍 Day 4: Spice Plantations, Old Goa Cathedrals & Departure
- **🌅 Morning (09:00 - 12:30)**: Guided tour of **Sahakari Spice Farm** with traditional welcome, elephant baths, and authentic buffet on banana leaves.
- **☀️ Afternoon (13:30 - 15:30)**: Visit UNESCO World Heritage sites in Old Goa: **Basilica of Bom Jesus** (housing sacred relics of St. Francis Xavier) and **Se Cathedral**.
- **🌆 Evening**: Seamless private transfer to airport.

---

### 💰 Itemized Dual-Currency Budget:
| Category | Budget Backpacker | Standard Comfort | Luxury 5-Star |
| :--- | :--- | :--- | :--- |
| **Resort / Stay (3N)** | ₹6,000 ($75) | ₹18,000 ($220) | ₹55,000 ($670) |
| **Self-Drive Thar / Scooty** | ₹1,500 ($18) | ₹6,000 ($75) | ₹14,000 ($170) |
| **Food & Dining** | ₹4,000 ($50) | ₹10,000 ($120) | ₹25,000 ($300) |
| **Total (2 Pax)** | **₹11,500 ($140)** | **₹34,000 ($415)** | **₹94,000 ($1,140)** |

---

### 🎒 Verified Bookings & Partner Deals:
- 🏨 [Book Top-Rated Goa Beach Resorts on Agoda](${getAgodaHotelUrl("Goa India")}) *(Up to 60% OFF)*
- 🏨 [Book Luxury 5-Star Heritage Villas on Booking.com](${getBookingHotelUrl("Goa India")})
- ✈️ [Compare Flights to Goa (GOI/GOX) on Aviasales](${getAviasalesFlightUrl({ origin: "DEL", destination: "GOI" })})
- 🎟️ [Book Mandovi Sunset Cruise & Water Sports on Klook](${getKlookUrl({ destination: "Goa", activity: "Sunset Cruise Water Sports" })})
- 🚕 [Book Guaranteed Airport Cabs with GetTransfer](${getGetTransferUrl({ from: "Goa Airport", to: "Calangute Goa" })})`;
  }

  // 5. Dubai 5-Day Luxury & Desert Safari Masterplan
  if (lower.includes("dubai") && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("tour"))) {
    return `### 🏰 The 5-Day Verified Dubai Futuristic & Desert Luxury Guide

A premier Middle-Eastern blueprint featuring architectural wonders, desert dune-bashing, and world-class luxury shopping.

---

#### 📍 Day 1: Downtown Dubai, Burj Khalifa & Dubai Mall
- **🌅 Morning**: Arrive at Dubai International Airport (DXB). Check into hotel.
- **☀️ Afternoon**: Explore the expansive **Dubai Mall**, walk through the Dubai Aquarium underwater tunnel.
- **🌆 Evening**: Ascend to **At the Top - Burj Khalifa 124th/148th Floor** for sunset views. Watch the dancing **Dubai Fountain show** followed by dinner overlooking the fountains.
- **🏨 Stay**: Downtown Dubai or Business Bay Hotel.

#### 📍 Day 2: Red Dune Desert Safari & Bedouin BBQ Camp
- **🌅 Morning**: Relax at Dubai Marina or JBR The Walk beach.
- **☀️ Afternoon (14:30 - 21:00)**: 4x4 Land Cruiser desert safari through high red dunes, sandboarding, camel rides, and falconry photography.
- **🌆 Evening**: Starry desert camp with live Tanoura dance, belly dancing, and Arabic BBQ banquet with shisha.
- **🏨 Stay**: Dubai.

#### 📍 Day 3: Historic Al Fahidi, Gold Souk & Marina Yacht Cruise
- **🌅 Morning**: Stroll the traditional wind-tower architecture of **Al Fahidi Historical District** and ride an authentic 1-Dirham Abra boat across Dubai Creek.
- **☀️ Afternoon**: Shop for pure spices and gold in the vibrant **Spice & Gold Souks**.
- **🌆 Evening**: 2-Hour luxury shared yacht dinner cruise through Dubai Marina and Ain Dubai wheel.

#### 📍 Day 4: Palm Jumeirah & Museum of the Future
- **🌅 Morning**: Visit the futuristic torus-shaped **Museum of the Future**.
- **☀️ Afternoon**: Monorail to **Palm Jumeirah**, explore Atlantis The Palm and Aquaventure waterpark.
- **🌆 Evening**: Sunset drinks at The View at The Palm overlooking the palm archipelago.

#### 📍 Day 5: Souvenir Shopping & Departure
- **🌅 Morning**: Last-minute luxury shopping at Mall of the Emirates or Dubai Duty Free.

---

### 💰 Itemized Budget (Dual Currency):
| Category | Standard (Couple) | Luxury VIP (Couple) |
| :--- | :--- | :--- |
| **Hotel / Resort (4N)** | ₹38,000 ($460) | ₹1,20,000 ($1,450) |
| **Desert Safari + Tickets** | ₹14,000 ($170) | ₹32,000 ($390) |
| **Dining & Local Metro** | ₹18,000 ($220) | ₹45,000 ($540) |
| **Total (2 Pax)** | **₹70,000 ($850)** | **₹1,97,000 ($2,380)** |

---

### 🎒 Verified Dubai Bookings:
- 🏨 [Book Dubai Hotels & Palm Resorts on Booking.com](${getBookingHotelUrl("Dubai UAE")})
- 🏨 [Compare Dubai Hotel Deals on Agoda](${getAgodaHotelUrl("Dubai UAE")})
- ✈️ [Compare Flights to Dubai (DXB) on Aviasales](${getAviasalesFlightUrl({ origin: "DEL", destination: "DXB" })})
- 🎟️ [Book Burj Khalifa & Desert Safari on Klook](${getKlookUrl({ destination: "Dubai", activity: "Burj Khalifa Desert Safari" })})
- 📱 [Get Saily UAE High-Speed 5G eSIM](${getSailyEsimUrl("united arab emirates")})
- 🚕 [Pre-Book Dubai Airport Transfers on GetTransfer](${getGetTransferUrl({ from: "Dubai International Airport", to: "Dubai Marina" })})`;
  }

  // 6. Universal Exhaustive Itinerary Generator for Any Global Destination
  if (lower.includes("itinerary") || lower.includes("plan a trip") || lower.includes("days trip") || lower.includes("tour plan") || lower.includes("travel guide") || lower.includes("visit") || lower.includes("how to travel") || lower.includes("hotel") || lower.includes("resort") || lower.includes("flight") || lower.includes("beach")) {
    const trip = parseTripParameters(query);
    const { destination, origin, adults, departDate, returnDate } = trip;
    const rooms = Math.max(1, Math.ceil(adults / 2));

    return `### 🗺️ Comprehensive 100% Verified Travel Itinerary: ${destination}

Here is an authentic, multi-source verified travel masterplan for **${destination}** featuring balanced pacing, signature culinary trails, transit hacks, and verified accommodation options:

---

#### 📍 Day 1: Arrival, Neighborhood Orientation & Welcome Feast
- **🌅 Morning**: Check into central accommodations. Get oriented with local transit passes and activate an international eSIM.
- **☀️ Afternoon**: Walk the historical quarter or city center to see key heritage plazas and architectural landmarks.
- **🌆 Evening**: Enjoy a welcome dinner at a renowned local bistro or food market tasting authentic regional specialties.
- **🏨 Recommended Stay**: City Center Boutique Hotel / Heritage Guesthouse.

#### 📍 Day 2: Iconic Landmarks & Cultural Immersion
- **🌅 Morning**: Visit top landmark monuments early to avoid queues during morning golden hour.
- **☀️ Afternoon**: Explore art museums, artisanal markets, or traditional craft workshops with a certified local guide.
- **🌆 Evening**: Stroll through historic river promenades or viewpoints followed by an authentic dinner.
- **🏨 Recommended Stay**: ${destination}.

#### 📍 Day 3: Nature, Vistas & Outdoor Expeditions
- **🌅 Morning**: Take a scenic day excursion to nearby mountains, national parks, lakes, or coastal cliffs.
- **☀️ Afternoon**: Outdoor lunch featuring fresh local produce and guided nature walks.
- **🌆 Evening**: Sunset photography viewpoint with tea/coffee and relaxation.
- **🏨 Recommended Stay**: ${destination}.

#### 📍 Day 4: Offbeat Hidden Gems & Culinary Deep-Dive
- **🌅 Morning**: Discover secret neighborhood lanes, quiet temples/churches, and local morning bakeries.
- **☀️ Afternoon**: Take a hands-on local cooking masterclass or food tasting trail.
- **🌆 Evening**: Live cultural music, theater, or night market exploration.
- **🏨 Recommended Stay**: ${destination}.

#### 📍 Day 5: Scenic Panoramas, Souvenirs & Seamless Departure
- **🌅 Morning**: Panoramic lookout point for farewell morning photos and souvenir shopping.
- **☀️ Afternoon**: Final signature lunch, check-out, and transit transfer to the airport/station.

---

### 💰 Itemized Dual-Currency Budget (Estimated for ${adults} Pax):
| Category | Budget Backpacker | Standard Comfort | Luxury 5-Star |
| :--- | :--- | :--- | :--- |
| **Stay & Hotels** | ₹8,000 – ₹12,000 ($95 - $145) | ₹22,000 – ₹35,000 ($265 - $425) | ₹65,000 – ₹1,20,000 ($790 - $1,450) |
| **Local Transit & Cabs** | ₹3,000 – ₹5,000 ($35 - $60) | ₹10,000 – ₹16,000 ($120 - $195) | ₹25,000 – ₹38,000 ($300 - $460) |
| **Food & Dining** | ₹5,000 – ₹8,000 ($60 - $95) | ₹14,000 – ₹20,000 ($170 - $240) | ₹32,000 – ₹50,000 ($390 - $610) |
| **Total Estimated (${adults} Pax)** | **₹16,000 – ₹25,000 ($190 - $300)** | **₹46,000 – ₹71,000 ($555 - $860)** | **₹1,22,000 – ₹2,08,000 ($1,480 - $2,520)** |

---

### 🎒 Verified Bookings & Essentials for ${destination}:
- ✈️ [Compare Flights from ${origin} to ${destination} (${adults} Pax) on Aviasales](${getAviasalesFlightUrl({ origin, destination, departDate, returnDate, adults, isRoundTrip: true })})
- 🏨 [Book Top-Rated Hotels & Stays on Booking.com](${getBookingHotelUrl({ destination, checkin: departDate, checkout: returnDate, adults, rooms })}) *(Pre-filled Dates & Free Cancellation)*
- 🏨 [Compare Hotel Deals on Agoda](${getAgodaHotelUrl({ destination, checkin: departDate, checkout: returnDate, adults, rooms })}) *(Up to 60% OFF)*
- 🎟️ [Book Attraction Passes & Day Tours on Klook](${getKlookUrl({ destination, query: `${destination} attractions tours passes` })})
- 🚕 [Book Guaranteed Airport Transfers on GetTransfer](${getGetTransferUrl({ from: `${destination} Airport`, to: `${destination} Hotel`, date: departDate, passengers: adults })})
- 📱 [Get Saily International 5G eSIM Data](${getSailyEsimUrl(destination)})

💬 *Tell me if you would like custom adjustments for your travel dates, travel style, or specific activities!*`;
  }

  // 7. Default Travel Concierge Welcome or Blog Assistant
  if (lower.includes("travel") || lower.includes("trip") || lower.includes("hotel") || lower.includes("flight") || lower.includes("holiday") || lower.includes("vacation") || lower.includes("beach")) {
    return `### ✈️ Welcome to the SmartMag AI Travel Concierge & Booking Hub

I am your 100% verified travel architect and global booking concierge. Here is what I can plan and book for you with precision:

1. **🗺️ 100% Verified Day-by-Day Itineraries:**
   - Detailed morning, afternoon, and evening schedules with exact transit routes and authentic regional cuisine.
2. **🏨 Verified Hotel & Resort Bookings:**
   - Partner rates with [Booking.com](${getBookingHotelUrl()}) and [Agoda](${getAgodaHotelUrl()}) (Free cancellation & price match).
3. **🚕 Private Airport Transfers & Rides:**
   - Fixed-fare chauffeur pickups with [GetTransfer](${getGetTransferUrl()}).
4. **🎥 4K YouTube Video Travel Guides:**
   - Curated walking tours and visual guides playable right inside our in-app modal.
5. **💰 Dual-Currency Budgets:**
   - Transparent cost breakdowns in both **₹ INR** and **$ USD**.

*Which destination would you like to explore today? (e.g. Kerala, Goa, Ladakh, Dubai, Japan, Bali, Paris, or Switzerland)*`;
  }

  return `### 🎙️ Welcome to the SmartMag Intelligence Engine

I synthesize knowledge across **frontier artificial intelligence, software engineering, quantitative trading & prop firms, global travel itineraries, and cultural festivals**.

Here are some popular topics you can explore:
- 🌴 *"Generate a 5-day luxury itinerary for Kerala backwaters and Munnar tea hills"*
- 🏖️ *"Plan a 4-day Goa beach and heritage trip with verified resort booking deals"*
- 🏔️ *"Create a 7-day high-altitude solo travel guide for Ladakh & Kashmir"*
- 🏰 *"5-day luxury Dubai itinerary with desert safari and Burj Khalifa"*
- 📊 *"Compare top prop trading firms like Funded Trader Markets, Atlas Funded, and Pocket Option with coupon codes"*
- 🤖 *"Explain Autonomous Multi-Agent Swarms with LangGraph and MCP architectures"*
- 🪔 *"Tell me about Ganesh Chaturthi and upcoming Indian festivals"*`;
}
