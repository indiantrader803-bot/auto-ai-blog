import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllCatalogArticles } from "@/lib/content/articles";
import { runMultiAgentIntentPipeline, detectUserIntent } from "@/lib/agents/multiAgentIntentRouter";

export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, userQuery, destination, durationDays, budgetTier } = body;

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

    const systemPrompt = `You are the "SmartMag Elite AI Concierge & Autonomous Research Engine" — an expert travel architect, financial market analyst, and software systems engineer.

MISSION & BEHAVIOR DIRECTIVES:
1. 🧠 DEEP USER UNDERSTANDING & MULTI-SOURCE ANALYSIS:
   - First, analyze the user's question to extract: intent, location/domain, duration, budget class, travel persona (solo, family, couple, backpacker, luxury), technical complexity, or trading asset class.
   - Synthesize knowledge across multiple domains: destination geography, climate & best seasons, altitude/medical permits, local transit/train booking windows, authentic culinary specialties, stay options (budget/mid/luxury), verified booking deals, and travel gear essentials.
2. ✈️ EXHAUSTIVE, DETAILED TRAVEL ITINERARIES (NEVER BRIEF OR SHALLOW):
   - Whenever asked for a travel plan or itinerary (for ANY destination in India or around the world), provide a rich, comprehensive, day-by-day blueprint.
   - For EACH day, include:
     - 🌅 Morning (activities, monuments, golden hour photo spots)
     - ☀️ Afternoon (cultural landmarks, authentic local lunch spots with dish names)
     - 🌆 Evening / Night (sunsets, night markets, dinners, cultural shows)
     - 🏨 Recommended Stays (Budget: homestays, Mid: boutique resorts, Luxury: heritage villas/houseboats)
     - 🍽️ Must-Try Food & Restaurants (signature dishes & local street food secrets)
     - 🚗 Transit Hacks & Route Timings
   - Include a clear Itemized Estimated Budget table (Backpacker / Comfort / Luxury) in both ₹ INR and $ USD.
   - Embed affiliate partner links with custom tags (Booking.com hotel search, Amazon Associate travel gear with tag autoaiblog-21).
3. 📈 QUANTITATIVE TRADING, AI & EDITORIAL INSIGHTS:
   - For prop trading, AI, finance, and software queries, provide deep, structured explanations with key metrics, rule comparisons (e.g. FTM code 'arnab', Atlas Funded code '12275', Pocket Option code '50START'), step-by-step algorithms, and clickable links to blog articles.
4. 📝 FORMATTING RULES:
   - Use clean Markdown with headers (###, ####), bullet points, bold text for key landmarks, and comparison tables.
   - Never cut answers short; be exhaustive, structured, highly articulate, and immediately actionable.

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
- 🏨 [Book Top-Rated Kerala Heritage Resorts & Houseboats on Booking.com](https://www.booking.com/city/in/kochi.html?aid=2026803) *(Free Cancellation & Best Price Match)*
- 🎒 [Mountaintop Waterproof 55L/65L Travel Rucksack on Amazon](https://www.amazon.in/s?k=travel+backpack+trekking+rucksack+50L+60L&tag=autoaiblog-21)
- 📸 [GoPro HERO12 4K Waterproof Action Camera for Backwaters](https://www.amazon.in/s?k=gopro+hero+action+camera+4k&tag=autoaiblog-21)
- 🔌 [Universal All-in-One Fast Travel Adapter with USB-C](https://www.amazon.in/s?k=universal+travel+adapter+all+in+one+fast+charging&tag=autoaiblog-21)

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
- 🏨 [Book Leh Heritage Hotels & Pangong Luxury Camps on Booking.com](https://www.booking.com/city/in/leh.html?aid=2026803)
- 🧥 [High-Altitude Thermal Windproof Down Jackets on Amazon](https://www.amazon.in/s?k=high+altitude+cold+weather+thermal+jacket+ladakh&tag=autoaiblog-21)
- 🥾 [Waterproof High-Ankle Hiking & Trekking Boots on Amazon](https://www.amazon.in/s?k=waterproof+trekking+shoes+hiking+boots+men+women&tag=autoaiblog-21)
- 🔋 [20,000mAh 65W Fast-Charging Power Bank for Cold Weather](https://www.amazon.in/s?k=power+bank+20000mah+65w+fast+charging&tag=autoaiblog-21)

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

### 🎒 Verified Japan Bookings & Travel Essentials:
- 🏨 [Book Tokyo & Kyoto Ryokans on Booking.com](https://www.booking.com/country/jp.html?aid=2026803) *(Free Cancellation)*
- 🔌 [Universal All-in-One Fast Travel Adapter with USB-C](https://www.amazon.in/s?k=universal+travel+adapter+all+in+one+fast+charging&tag=autoaiblog-21)
- 🔋 [20,000mAh Ultra-Compact Power Bank](https://www.amazon.in/s?k=power+bank+20000mah+65w+fast+charging&tag=autoaiblog-21)

📖 *Read more:* [World's Most Mesmerizing Cultural Festivals & Traditions](/blog/worlds-most-mesmerizing-cultural-festivals-traditions-guide)`;
  }

  // 4. Universal Exhaustive Itinerary Generator for Any Global Destination
  if (lower.includes("itinerary") || lower.includes("plan a trip") || lower.includes("days trip") || lower.includes("tour plan") || lower.includes("travel guide") || lower.includes("visit") || lower.includes("how to travel")) {
    const dest = query.replace(/(itinerary|plan|trip|for|days|budget|give|me|create|generate|a|the|travel|guide|how|to)/gi, "").trim() || "Your Chosen Destination";
    const destTitle = dest.charAt(0).toUpperCase() + dest.slice(1);

    return `### 🗺️ Comprehensive Master Travel Itinerary: ${destTitle}

Here is an exhaustive, multi-source curated travel blueprint for **${destTitle}** featuring balanced pacing, signature culinary trails, transit hacks, and verified accommodation options:

---

#### 📍 Day 1: Arrival, Neighborhood Orientation & Welcome Feast
- **🌅 Morning**: Check into central accommodations. Get oriented with local transit cards (e.g. metro / regional passes) and activate an international eSIM.
- **☀️ Afternoon**: Walk the historical quarter or city center to see key heritage plazas and architectural landmarks.
- **🌆 Evening**: Enjoy a welcome dinner at a renowned local bistro or food market tasting authentic regional specialties.
- **🏨 Stay**: City Center Boutique Hotel / Heritage Guesthouse.

#### 📍 Day 2: Iconic Landmarks & Cultural Immersion
- **🌅 Morning**: Visit top landmark monuments early to avoid queues during morning golden hour.
- **☀️ Afternoon**: Explore art museums, artisanal markets, or traditional craft workshops.
- **🌆 Evening**: Stroll through historic river promenades or viewpoints followed by an authentic dinner.
- **🏨 Stay**: ${destTitle}.

#### 📍 Day 3: Nature, Vistas & Outdoor Expeditions
- **🌅 Morning**: Take a scenic day excursion to nearby mountains, national parks, lakes, or coastal cliffs.
- **☀️ Afternoon**: Outdoor lunch featuring fresh local produce and guided nature walks.
- **🌆 Evening**: Sunset photography viewpoint with tea/coffee and relaxation.
- **🏨 Stay**: ${destTitle}.

#### 📍 Day 4: Offbeat Hidden Gems & Culinary Deep-Dive
- **🌅 Morning**: Discover secret neighborhood lanes, quiet temples/churches, and local morning bakeries.
- **☀️ Afternoon**: Take a hands-on local cooking masterclass or food tasting trail.
- **🌆 Evening**: Live cultural music, theater, or night market exploration.
- **🏨 Stay**: ${destTitle}.

#### 📍 Day 5: Scenic Panoramas, Souvenirs & Seamless Departure
- **🌅 Morning**: Panoramic lookout point for farewell morning photos and souvenir shopping.
- **☀️ Afternoon**: Final signature lunch, check-out, and transit transfer to the airport/station.

---

### 💡 Multi-Source Planning Pro-Tips for ${destTitle}:
1. **Best Season**: Aim for shoulder season (spring or autumn) to balance optimal weather with lower accommodation pricing.
2. **Transit**: Download offline maps on [Maps.me](https://maps.me) or Google Maps before departure.
3. **Currency & Payments**: Use zero-forex credit cards and carry moderate local cash for street stalls.

---

### 🎒 Verified Bookings & Essentials for ${destTitle}:
- 🏨 [Book Top-Rated Hotels & Stays in ${destTitle} on Booking.com](https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}&aid=2026803) *(Free Cancellation)*
- 🎒 [Browse Verified Waterproof Travel Backpacks on Amazon](https://www.amazon.in/s?k=travel+backpack+trekking+rucksack+50L+60L&tag=autoaiblog-21)
- ✈️ [Check Flight Deals on Skyscanner](https://www.skyscanner.com)

💬 *Tell me your exact travel dates, travel style (solo, couple, family), or budget, and I will customize this itinerary down to hourly schedules!*`;
  }

  // 5. Default Comprehensive AI Knowledge Guide
  return `### 👋 Welcome to the SmartMag Editorial & Knowledge Engine

I am your 24/7 autonomous intelligence concierge. I synthesize knowledge across **travel destinations worldwide, quantitative trading & prop firms, artificial intelligence engineering, and global cultural festivals**.

Here are some popular deep topics you can explore:
- 🌴 *"Generate a 5-day luxury itinerary for Kerala backwaters and Munnar tea hills"*
- 🏔️ *"Create a 7-day high-altitude solo travel guide for Ladakh & Kashmir"*
- 🎌 *"7-day classic Japan Golden Route covering Tokyo, Hakone, and Kyoto"*
- 📊 *"Compare top prop trading firms like Funded Trader Markets, Atlas Funded, and Pocket Option"*
- 🤖 *"Explain Autonomous Multi-Agent Swarms with LangGraph and MCP architectures"*
- 📈 *"How do quant hedge funds leverage SLMs and NLP for financial sentiment analysis?"*

What would you like to explore today?`;
}
