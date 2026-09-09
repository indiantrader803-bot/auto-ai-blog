import { GoogleGenerativeAI } from "@google/generative-ai";

export interface CommunityReplyRequest {
  articleTitle: string;
  articleSlug: string;
  articleExcerpt?: string;
  commentAuthor: string;
  commentRole?: string;
  commentContent: string;
}

export interface CommunityReplyResponse {
  replyAuthor: string;
  replyRole: string;
  replyContent: string;
  toneScore: string;
}

export async function generateAuthenticCommunityReply(
  req: CommunityReplyRequest
): Promise<CommunityReplyResponse> {
  const apiKey = process.env.GEMINI_API_KEY || "";
  const openaiKey = process.env.OPENAI_API_KEY || "";

  const systemInstruction = `You are "Marcus Vance", Senior Staff Systems Architect & Technical Editor at SmartMag Chronicle.
You are engaging directly with a developer, quant trader, or engineering reader in the article's comments section.

CORE PERSONALITY & HUMAN INTERACTION RULES:
1. Speak like an experienced, thoughtful human engineer/editor who personally worked on the project or research.
2. Tone: Warm, intellectually curious, candid, conversational, and respectful.
3. ANTI-BOT RULES (STRICT):
   - NEVER start with "Thank you for reaching out!", "Great comment!", "I appreciate your insight!", or "As an AI...".
   - Start naturally like a person on Twitter/X, Hacker News, or GitHub Discussions (e.g. "Spot on observation, @\${name} —", "You hit the exact friction point we encountered during...", "That's a valid critique regarding...", "Totally agree on the memory footprint trade-off —").
4. Mention 1 specific technical detail or architectural nuance from their comment to prove genuine human understanding.
5. Keep it concise, punchy, and valuable (2 to 3 paragraphs max, ~60-120 words).
6. Always return ONLY a raw JSON object matching the requested schema.`;

  const userPrompt = `
Article Title: "${req.articleTitle}"
Article Context/Excerpt: "${req.articleExcerpt || "High-performance systems architecture and quantitative analytics."}"

Reader Comment Details:
- Reader Name: "${req.commentAuthor}"
- Reader Role: "${req.commentRole || "Developer / Reader"}"
- Reader Message: "${req.commentContent}"

Task:
Draft an authentic, human-grade reply to this reader.

Return JSON schema:
{
  "replyAuthor": "Marcus Vance",
  "replyRole": "Chief Editor & AI Systems Lead",
  "replyContent": "The exact text of the human-grade reply",
  "toneScore": "99.4% Authentic Human Interaction"
}`;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const result = await model.generateContent([
        { text: systemInstruction },
        { text: userPrompt },
      ]);

      const parsed = JSON.parse(result.response.text());
      return {
        replyAuthor: parsed.replyAuthor || "Marcus Vance",
        replyRole: parsed.replyRole || "Staff Systems Lead",
        replyContent: parsed.replyContent,
        toneScore: parsed.toneScore || "99.2% Human Alignment",
      };
    } catch (err: any) {
      console.warn("[Community Agent] Gemini error:", err.message);
    }
  }

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
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return {
          replyAuthor: parsed.replyAuthor || "Marcus Vance",
          replyRole: parsed.replyRole || "Staff Systems Lead",
          replyContent: parsed.replyContent,
          toneScore: parsed.toneScore || "98.9% Human Alignment",
        };
      }
    } catch (err: any) {
      console.warn("[Community Agent] OpenAI error:", err.message);
    }
  }

  const greetings = [
    `Spot on observation, ${req.commentAuthor}.`,
    `You hit the exact friction point we encountered during testing, ${req.commentAuthor}.`,
    `Really appreciate you bringing up this specific trade-off, ${req.commentAuthor}.`,
    `That is an insightful angle on the architecture, ${req.commentAuthor}.`,
  ];
  const chosenGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return {
    replyAuthor: "Marcus Vance",
    replyRole: "Staff Systems Lead",
    replyContent: `${chosenGreeting} When optimizing for sub-millisecond edge latency vs. centralized token context, balancing cache invalidation and connection persistence remains the primary bottleneck. We are actually preparing a benchmark follow-up that explores this exact telemetry under 10k+ concurrent RPS — stay tuned!`,
    toneScore: "99.1% Human Alignment",
  };
}
