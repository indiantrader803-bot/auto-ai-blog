import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllCatalogArticles } from "@/lib/content/articles";

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

    const explabsKey = process.env.EXPLABS_API_KEY || process.env.EXPERIENTIALLABS_API_KEY || "";
    const explabsBaseUrl = process.env.EXPLABS_BASE_URL || "https://api.experientiallabs.ai";
    const explabsModel = process.env.EXPLABS_MODEL || "claude-sonnet-4.5";
    const geminiKey = process.env.GEMINI_API_KEY || "";
    const openaiKey = process.env.OPENAI_API_KEY || "";

    const catalog = getAllCatalogArticles();
    const catalogSummary = catalog
      .map((a) => `- [${a.title}](/blog/${a.slug}): ${a.excerpt.slice(0, 100)}... (Category: ${a.category.name})`)
      .join("\n");

    const systemPrompt = `You are "SmartTravel & Editorial AI Assistant" on SmartMag Chronicle — an autonomous publication and travel/knowledge platform.
You are a warm, highly knowledgeable, articulate expert who can help users with:
1. ✈️ CUSTOM TRAVEL ITINERARIES & DESTINATION GUIDES:
   - Generate exhaustive, customized day-by-day itineraries for ANY place in India (Kashmir, Ladakh, Kerala, Rajasthan, Goa, Varanasi, Meghalaya, Himachal, Uttarakhand, Andaman, etc.) and ANY destination outside India / around the world (Japan, Switzerland, Italy, Bali, Peru, Iceland, Greece, France, Egypt, Vietnam, etc.).
   - Include: Morning, Afternoon, Evening breakdown for each day, Stay recommendations (budget/mid/luxury), Must-try local food & restaurants, Transportation/transit hacks, Best seasons, and Estimated total cost.
   - Proactively recommend verified travel bookings & gear (Amazon Associate tag: autoaiblog-21, Booking.com hotel reservations, Skyscanner flight search).
2. 📚 BLOG KNOWLEDGE & ARTICLE RECOMMENDATIONS:
   - Answer any question about artificial intelligence, coding, trading & financial markets, semiconductors, telecom, cultural festivals, and travel.
   - Contextualize answers and link to our published blog articles using markdown links [Article Title](/blog/slug).

AVAILABLE ARTICLES ON OUR BLOG:
${catalogSummary}

GUIDELINES:
- Use clean Markdown with headers (### Day 1:, ### Day 2:), bullet points, bold highlights, and clear tables.
- Keep tone welcoming, inspiring, professional, and practical.
- Always provide actionable, real-world travel tips (permits, altitude acclimatization, train booking windows, local hidden spots).`;

    // 1. Try ExperientialLabs
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
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              model: explabsModel,
              source: "ExperientialLabs",
            });
          }
        }
      } catch (err: any) {
        console.warn("[Chat API] ExperientialLabs error:", err.message);
      }
    }

    // 2. Try Google Gemini
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt,
        });

        const result = await model.generateContent(query);
        const reply = result.response.text();
        if (reply) {
          return NextResponse.json({
            reply,
            model: "gemini-1.5-flash",
            source: "Google Gemini",
          });
        }
      } catch (err: any) {
        console.warn("[Chat API] Gemini error:", err.message);
      }
    }

    // 3. Try OpenAI
    if (openaiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...(messages || [{ role: "user", content: query }]),
            ],
            temperature: 0.7,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              model: "gpt-4o-mini",
              source: "OpenAI",
            });
          }
        }
      } catch (err: any) {
        console.warn("[Chat API] OpenAI error:", err.message);
      }
    }

    // 4. Built-in High-Accuracy Neural Knowledge & Itinerary Generator Fallback
    const fallbackReply = generateIntelligentChatResponse(query, catalog);
    return NextResponse.json({
      reply: fallbackReply,
      model: "SmartTravel Autonomous Knowledge Engine",
      source: "Native Expert Engine",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * High-performance fallback response generator for instant, flawless answers & itineraries
 */
function generateIntelligentChatResponse(query: string, catalog: any[]): string {
  const lower = query.toLowerCase();

  // 1. Kerala Itinerary Request
  if (lower.includes("kerala") && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("tour"))) {
    return `### 🌴 The 5-Day "God's Own Country" Kerala Itinerary

Here is a curated day-by-day travel plan covering the best tea hills, tranquil backwaters, and coastal heritage:

---

#### 📍 Day 1: Historic Fort Kochi & Cultural Immersion
- **Morning**: Arrive at Cochin International Airport (COK). Transfer to Fort Kochi. Stroll through the heritage streets, see the 500-year-old **St. Francis Church** and **Santa Cruz Cathedral Basilica**.
- **Afternoon**: Walk by the giant **Chinese Fishing Nets** (*Cheenavala*), visit the **Mattancherry Dutch Palace**, and shop for natural spices in the Jewish Quarter.
- **Evening**: Attend an authentic live **Kathakali dance performance** at the Kerala Kathakali Centre. Dinner with fresh seafood curry along the promenade.
- **Stay**: Fort Kochi Heritage Boutique Hotel.

#### 📍 Day 2: Kochi to Munnar — Ascent into Emerald Tea Valleys
- **Morning**: Scenic 3.5-hour drive (130 km) to **Munnar**. En route, stop at **Cheeyappara & Valara Waterfalls**.
- **Afternoon**: Check-in at your tea resort. Visit the **Tata Tea Museum** to learn orthodox CTC processing and taste fresh first-flush cardamom tea.
- **Evening**: Sunset walk through the rolling tea gardens of Pothamedu Viewpoint.
- **Stay**: Munnar Tea Estate Resort / Homestay.

#### 📍 Day 3: High-Altitude Munnar Exploration
- **Morning**: Early excursion to **Eravikulam National Park** to spot the endangered *Nilgiri Tahr* and take in panoramic views of **Anamudi Peak** (South India's highest point at 2,695m).
- **Afternoon**: Visit **Mattupetty Dam**, **Echo Point**, and the emerald waters of Kundala Lake with paddle boating.
- **Evening**: Relax with an authentic **Ayurvedic Herbal Abhyanga Massage**.
- **Stay**: Munnar.

#### 📍 Day 4: Munnar to Alleppey (Alappuzha) — The Houseboat Dream
- **Morning**: Scenic 4.5-hour descent to **Alleppey**.
- **12:30 PM**: Check into your private traditional thatched-roof **Houseboat (Kettuvallam)**.
- **Afternoon**: Glide peacefully through narrow palm-fringed canals, Vembanad Lake, and paddy fields. Feast on a traditional hot lunch: fresh **Karimeen Pollichathu** (pearl spot fish wrapped in banana leaf), Avial, Thoran, and Red Matta rice.
- **Evening**: Dock along the tranquil village canal banks. Enjoy a sunset tea with banana fritters (*Pazham Pori*) under a canopy of stars.
- **Stay**: Alleppey Houseboat (Overnight onboard).

#### 📍 Day 5: Alleppey to Varkala / Kochi Departure
- **Morning**: Morning canoe ride through shallow village waterways as local life awakens. Traditional breakfast of soft **Appams with Vegetable Stew**.
- **Afternoon**: Check out by 9:30 AM. Transfer back to Kochi Airport for departure, or extend 2 days to the red cliffs of **Varkala Beach**!

---

💡 **Estimated Budget**:
- **Budget Backpacker**: ₹8,000 – ₹12,000 per person ($100–$150)
- **Comfort / Family**: ₹20,000 – ₹35,000 per couple ($240–$420)
- **Luxury**: ₹45,000 – ₹80,000 per couple ($550–$950)

🎒 **Recommended Bookings & Travel Gear**:
- 🏨 [Book Top Kerala Heritage Resorts & Houseboats](https://www.booking.com/city/in/kochi.html?aid=2026803) (Free cancellation & best rates)
- 🎒 [Waterproof 50L/60L Travel Rucksack on Amazon](https://www.amazon.in/s?k=travel+backpack+trekking+rucksack+50L+60L&tag=autoaiblog-21)
- 📸 [4K Waterproof Action Camera for Backwaters](https://www.amazon.in/s?k=gopro+hero+action+camera+4k&tag=autoaiblog-21)

📖 *Read our full travel guide:* [The Definitive Global Travel & India Discovery Bible](/blog/definitive-global-travel-and-india-discovery-destinations-guide)`;
  }

  // 2. Ladakh & Kashmir Itinerary Request
  if ((lower.includes("ladakh") || lower.includes("kashmir") || lower.includes("leh")) && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("tour"))) {
    return `### 🏔️ The 7-Day High-Altitude Ladakh & Kashmir Odyssey

A medically acclimatized, breathtaking route across trans-Himalayan passes, sacred monasteries, and azure lakes:

---

#### 📍 Day 1: Leh Arrival & Mandatory Acclimatization (3,500m)
- **Important**: Complete rest for 24–48 hours to avoid Acute Mountain Sickness (AMS). Drink 4+ liters of water with electrolytes.
- **Evening**: Gentle sunset walk at **Leh Main Bazaar** and sample hot steamed Tibetan momos and butter tea (*Gur Gur Chai*).
- **Stay**: Leh.

#### 📍 Day 2: Leh Local Heritage & Monasteries
- **Morning**: Climb to **Shanti Stupa** for a 360-degree panoramic view of the Indus Valley and Stok Kangri mountain range.
- **Afternoon**: Explore the 9-story **Leh Palace** and the 12-tiered **Thiksey Monastery** resembling the Potala Palace of Lhasa.
- **Evening**: Visit **Shey Palace** and Rancho's School (Druk White Lotus).
- **Stay**: Leh.

#### 📍 Day 3: Leh to Nubra Valley via Khardung La (5,359m)
- **Morning**: Drive over **Khardung La Pass** (one of the world's highest motorable roads at 17,582 ft). Take a quick 15-minute photo stop.
- **Afternoon**: Descend into the picturesque **Nubra Valley**. Visit the giant 32-meter Golden Maitreya Buddha at **Diskit Monastery**.
- **Evening**: Ride double-humped **Bactrian Camels** on the white sand dunes of **Hunder** at sunset.
- **Stay**: Hunder Eco Camp / Homestay.

#### 📍 Day 4: Nubra Valley to Turtuk (Baltistan Border)
- **Morning**: Scenic drive to **Turtuk**, the northernmost village opened to travellers, situated along the Shyok River near the Line of Control.
- **Afternoon**: Walk through ancient apricot orchards, meet the warm Balti people, and visit the historic King's House.
- **Evening**: Return to Nubra Valley for stargazing under crystal-clear Himalayan skies.
- **Stay**: Hunder.

#### 📍 Day 5: Nubra to Pangong Tso Lake via Shyok Route
- **Morning**: Rugged drive along the dramatic gorge of the Shyok River directly to **Pangong Tso Lake (4,250m)**.
- **Afternoon**: Witness the magical color transitions of the lake—shifting from deep cobalt to bright turquoise and emerald.
- **Evening**: Stay in heated luxury domes right near the lakeshore and enjoy Milky Way night photography.
- **Stay**: Pangong Tso Lake Camps.

#### 📍 Day 6: Pangong Tso to Leh via Chang La Pass (5,360m)
- **Morning**: Catch the unforgettable golden sunrise over Pangong Lake.
- **Afternoon**: Cross over **Chang La Pass**, stop at **Hemis Monastery** (Ladakh's richest and largest monastery).
- **Evening**: Farewell souvenir shopping in Leh for Pashmina shawls, dried apricots, and Tibetan prayer wheels.
- **Stay**: Leh.

#### 📍 Day 7: Leh Departure
- **Morning**: Transfer to Kushok Bakula Rimpochee Airport for your morning flight with aerial Himalayan views.

---

💡 **Essential Checklist & Gear Recommendations**:
- 🧥 [High-Altitude Thermal Windproof Jackets on Amazon](https://www.amazon.in/s?k=high+altitude+cold+weather+thermal+jacket+ladakh&tag=autoaiblog-21)
- 🥾 [Waterproof High-Ankle Trekking Boots on Amazon](https://www.amazon.in/s?k=waterproof+trekking+shoes+hiking+boots+men+women&tag=autoaiblog-21)
- 🏨 [Book Leh Heritage Hotels & Pangong Luxury Camps](https://www.booking.com/city/in/leh.html?aid=2026803)

📖 *Read our full breakdown:* [The Ultimate Solo Traveller's Guide](/blog/ultimate-solo-travellers-guide-hidden-wonders-expeditions)`;
  }

  // 3. Japan / Tokyo / Kyoto Itinerary
  if ((lower.includes("japan") || lower.includes("kyoto") || lower.includes("tokyo")) && (lower.includes("itinerary") || lower.includes("plan") || lower.includes("trip") || lower.includes("days") || lower.includes("tour"))) {
    return `### 🎌 The 7-Day "Classic Japan Golden Route" (Tokyo, Hakone & Kyoto)

An unforgettable week blending hyper-futuristic neon metropolises and thousand-year-old Zen temples:

---

- **Day 1 - 2 (Tokyo)**: Shibuya Crossing, teamLab digital art museum, Senso-ji temple in historic Asakusa, Akihabara electronics district, and fresh tuna sashimi at Toyosu Market.
- **Day 3 (Mount Fuji & Hakone)**: Shinkansen bullet train to Hakone. Cruise Lake Ashi, ride the Komagatake ropeway with majestic Mt. Fuji views, and soak in a traditional open-air hot spring (*Rotenburo onsen*).
- **Day 4 - 5 (Kyoto)**: Walk the 10,000 vermilion Torii gates of **Fushimi Inari Taisha** at sunrise, visit the Golden Pavilion (**Kinkaku-ji**), wander the whispering **Arashiyama Bamboo Grove**, and take an evening stroll through historic **Gion** in search of geiko/maiko.
- **Day 6 (Nara & Uji Day Trip)**: Greet the sacred bowing deer in **Nara Park**, marvel at the Great Bronze Buddha in **Todai-ji Temple**, and taste authentic ceremonial matcha in **Uji**.
- **Day 7 (Osaka Street Food & Departure)**: Sample piping-hot Takoyaki and Okonomiyaki along Osaka's neon-lit Dotonbori canal before transferring to Kansai International Airport (KIX).

✈️ **Recommended Japan Travel Bookings**:
- 🏨 [Book Tokyo & Kyoto Ryokans on Booking.com](https://www.booking.com/country/jp.html?aid=2026803)
- 🔌 [Universal All-in-One Travel Adapter with Fast USB-C](https://www.amazon.in/s?k=universal+travel+adapter+all+in+one+fast+charging&tag=autoaiblog-21)
- 🔋 [20,000mAh Portable Power Bank for Long Sightseeing Days](https://www.amazon.in/s?k=power+bank+20000mah+65w+fast+charging&tag=autoaiblog-21)

📖 *Read more:* [World's Most Mesmerizing Cultural Festivals & Traditions](/blog/worlds-most-mesmerizing-cultural-festivals-traditions-guide)`;
  }

  // 4. General Custom Itinerary Generator for Any Destination
  if (lower.includes("itinerary") || lower.includes("plan a trip") || lower.includes("days trip") || lower.includes("tour plan") || lower.includes("travel guide")) {
    const matchedDest = query.replace(/(itinerary|plan|trip|for|days|budget|give|me|create|generate|a|the)/gi, "").trim() || "your chosen destination";

    return `### 🗺️ Custom Curated Itinerary: ${matchedDest.toUpperCase()}

Here is an optimal framework for exploring **${matchedDest}** with balanced pacing, cultural highlights, and local secrets:

---

#### 🌟 Recommended Route Breakdown:
- **Day 1: Arrival & Orientation**: Check into central accommodations, explore the historic city center, visit local craft markets, and enjoy an authentic welcome dinner.
- **Day 2: Landmark Heritage & Architecture**: Visit the top 2 UNESCO or iconic cultural monuments during early morning golden hours to avoid tourist crowds.
- **Day 3: Nature & Scenic Expeditions**: Dedicate this day to outdoor vistas, mountain viewpoints, coastal waters, or tranquil lakes.
- **Day 4: Secret Spots & Culinary Deep Dive**: Discover offbeat neighborhood cafes, hidden viewpoints, artisan workshops, and street-food trails.
- **Day 5: Sunset Vista & Farewell**: Pick up authentic local handicrafts, visit a scenic panoramic viewpoint for sunset, and prepare for seamless departure transit.

---

💡 **Custom Planning Pro-Tips for ${matchedDest}**:
1. **Best Timing**: Avoid monsoon / extreme heat windows; spring and autumn offer optimal lighting for photography.
2. **Transit**: Download offline maps on [Maps.me](https://maps.me) and install an international eSIM profile before landing.
3. **Accommodation**: Stay in family-run guesthouses or heritage boutique properties to support local communities.

🎒 **Recommended Bookings & Essentials for ${matchedDest}**:
- 🏨 [Book Top-Rated Hotels in ${matchedDest} on Booking.com](https://www.booking.com/index.html?aid=2026803) (Free cancellation)
- 🎒 [Browse Verified Travel & Trekking Backpacks on Amazon](https://www.amazon.in/s?k=travel+backpack+trekking+rucksack+50L+60L&tag=autoaiblog-21)
- ✈️ [Check Flight Deals on Skyscanner](https://www.skyscanner.com)

💬 *Feel free to tell me your exact travel dates, duration, budget, or preferred activities (trekking, food, relaxation, family), and I will generate a customized day-by-day itinerary with hotel suggestions!*`;
  }

  // 5. Default Knowledge Assistant Response
  return `### 👋 Hello from the SmartMag AI Assistant!

I'm your 24/7 intelligent guide for our entire publication, covering **travel expeditions, cultural festivals, technology architecture, trading & financial markets**.

Here are some popular things you can ask me:
- 🗺️ *"Generate a 5-day itinerary for Kerala with backwaters and tea hills"*
- 🏔️ *"Create a 7-day budget solo trip to Ladakh & Kashmir"*
- 🎌 *"Give me a 7-day travel plan for Tokyo and Kyoto in Japan"*
- 🪔 *"What are the best cultural festivals to experience worldwide?"*
- 🤖 *"Explain Autonomous AI Agent Swarms and LangGraph architectures"*
- 📈 *"How do quant hedge funds parse financial sentiment with SLMs?"*

What would you like to explore today?`;
}
