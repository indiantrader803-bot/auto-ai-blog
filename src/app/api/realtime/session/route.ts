import { NextResponse } from "next/server";
import { runMultiAgentIntentPipeline } from "@/lib/agents/multiAgentIntentRouter";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { userQuery, action } = body;

    // 1. If query is provided, execute multi-agent intent pipeline directly
    if (userQuery) {
      const result = await runMultiAgentIntentPipeline(userQuery);
      return NextResponse.json({
        success: true,
        ...result,
      });
    }

    // 2. Realtime WebRTC ephemeral session generation (OpenAI Realtime Agents integration)
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-realtime-preview-2024-12-17",
            voice: "verse",
            instructions: `You are the Voice Concierge on SmartMag Chronicle.
You greet visitors warmly and identify their intent:
1. Booking: Hotels, resorts, flights, houseboats across India and worldwide.
2. Affiliate Search & Comparison: Prop firm accounts, crypto exchanges, travel/tech gear with promo codes.
3. AI Tool & Store Search: Coding IDEs, GPU compute, AI toolkits.
4. Video Search: Tutorials with thumbnails and summaries.
5. Blog & Itineraries: Knowledge and travel itineraries.
Always provide concise, helpful spoken responses and attach verified affiliate recommendations.`,
            modalities: ["audio", "text"],
            tools: [
              {
                type: "function",
                name: "searchBookings",
                description: "Search hotels, resorts, and flights across India and global destinations",
                parameters: {
                  type: "object",
                  properties: {
                    destination: { type: "string" },
                    category: { type: "string" },
                  },
                  required: ["destination"],
                },
              },
              {
                type: "function",
                name: "compareAffiliateOffers",
                description: "Compare prop firms, trading tools, and travel gear offers with discount codes",
                parameters: {
                  type: "object",
                  properties: {
                    niche: { type: "string" },
                  },
                },
              },
              {
                type: "function",
                name: "searchVideos",
                description: "Search video workshops and tutorials with summaries and related articles",
                parameters: {
                  type: "object",
                  properties: {
                    query: { type: "string" },
                  },
                  required: ["query"],
                },
              },
            ],
          }),
        });

        if (response.ok) {
          const sessionData = await response.json();
          return NextResponse.json({
            success: true,
            provider: "OpenAI Realtime WebRTC",
            client_secret: sessionData.client_secret,
            session: sessionData,
          });
        }
      } catch (err: any) {
        console.warn("OpenAI Realtime session notice, falling back to Native Neural Voice Engine:", err.message);
      }
    }

    // 3. High-Fidelity Native Voice Engine fallback
    return NextResponse.json({
      success: true,
      provider: "Native Neural Voice Engine",
      message: "Ready for continuous real-time voice speech recognition and audio streaming.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
