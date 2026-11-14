import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../prisma";

export interface CritiqueResult {
  score: number;
  feedback: string;
  improvedContent?: string;
  improvedTitle?: string;
  recommendations: string[];
}

const FAILED_CRITIQUE_SCORE = 0;

/**
 * Review a complete draft for editorial quality. A missing provider, malformed
 * response, provider error, or invalid score must fail closed: it is not approval.
 */
export async function runCriticAndSelfImprovement(
  topic: string,
  draftTitle: string,
  draftContent: string
): Promise<{
  finalTitle: string;
  finalContent: string;
  critiqueScore: number;
  critiqueNotes: string;
}> {
  const explabsKey = process.env.EXPLABS_API_KEY || process.env.EXPERIENTIALLABS_API_KEY;
  const explabsBaseUrl = process.env.EXPLABS_BASE_URL || "https://api.experientiallabs.ai";
  const apiKey = process.env.GEMINI_API_KEY;

  const reject = (reason: string) => ({
    finalTitle: draftTitle,
    finalContent: draftContent,
    critiqueScore: FAILED_CRITIQUE_SCORE,
    critiqueNotes: reason,
  });

  if (!explabsKey && !apiKey) {
    return reject("Editorial review unavailable: no critic API key configured. Saved as draft for human review.");
  }

  let pastMemory = "Prioritize reader usefulness, clear explanations, primary sources, and honest uncertainty.";
  try {
    const memorySetting = await prisma.setting.findUnique({
      where: { key: "AGENT_PERFORMANCE_MEMORY" },
    });
    if (memorySetting?.value) pastMemory = memorySetting.value;
  } catch (_) {}

  const prompt = `
You are a strict assigning editor and fact-checking reviewer for a small independent publication.
Review the article against its assigned topic. Do not reward confidence, length, SEO keywords, or polished prose in place of evidence.

Assigned topic: "${topic}"
Draft title: "${draftTitle}"
Draft Markdown:
${draftContent.slice(0, 14000)}

Historical reader preference memory (style guidance only; never treat it as evidence):
"${pastMemory}"

REVIEW REQUIREMENTS:
1. Single-topic focus: the title, introduction, body, and conclusion must address the assigned topic. Flag unrelated topic combinations and keyword stuffing.
2. Factual integrity: identify factual claims that need evidence. Preserve source URLs/citations already present; do not invent citations, quotes, dates, statistics, tests, benchmarks, field experience, interviews, or first-hand observations.
3. Evidence: distinguish verified facts from analysis, forecasts, and uncertainty. If adequate sources are absent, say so and lower the score.
4. Usefulness and originality: assess whether the article gives readers specific, actionable information beyond generic summaries.
5. Structure and readability: assess a clear introduction, useful headings, coherent progression, and a concise conclusion.
6. SEO: assess natural search intent coverage and a descriptive, accurate title. Do not recommend clickbait.
7. If you cannot verify a claim from the supplied article and its cited sources, do not present it as verified. Never fabricate details to make the article sound authoritative.

SCORING (0-100):
- factual integrity and evidence: 35
- topic focus and search-intent match: 20
- originality and reader usefulness: 20
- structure and readability: 15
- accurate, natural title and SEO: 10

A score of 88 or higher is reserved for publication-ready work with strong evidence and no material factual or topic-focus problems. Missing sources, unsupported specific claims, fabricated first-hand experience, or a material topic mismatch must prevent a passing score.

Return ONLY valid JSON:
{
  "score": number,
  "feedback": "Concise explanation including material weaknesses",
  "improvedTitle": "Accurate title; do not add unsupported claims",
  "improvedContent": "Revised full Markdown article; do not invent facts or sources",
  "recommendations": ["specific recommendation"]
}
`;

  const parseResponse = (raw: string) => {
    const clean = raw.trim().replace(/^```json\s*/, "").replace(/\s*```$/, "");
    const parsed = JSON.parse(clean) as Partial<CritiqueResult>;
    const score = Number(parsed.score);
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      throw new Error("Critic returned an invalid score.");
    }
    if (typeof parsed.improvedContent !== "string" || parsed.improvedContent.trim().length < 500) {
      throw new Error("Critic returned missing or incomplete revised content.");
    }
    const title = typeof parsed.improvedTitle === "string" && parsed.improvedTitle.trim()
      ? parsed.improvedTitle.trim()
      : draftTitle;
    const feedback = typeof parsed.feedback === "string" && parsed.feedback.trim()
      ? parsed.feedback.trim()
      : "Critic review completed without detailed feedback.";
    return {
      finalTitle: title,
      finalContent: parsed.improvedContent,
      critiqueScore: score,
      critiqueNotes: feedback,
    };
  };

  try {
    if (explabsKey) {
      try {
        const res = await fetch(`${explabsBaseUrl}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${explabsKey}`,
          },
          body: JSON.stringify({
            model: "claude-sonnet-4.5",
            messages: [
              { role: "system", content: "You are a strict evidence-led editorial reviewer. Return only valid JSON matching the requested schema." },
              { role: "user", content: prompt },
            ],
            temperature: 0.2,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const raw = data.choices?.[0]?.message?.content;
          if (typeof raw === "string" && raw.trim()) return parseResponse(raw);
        } else {
          console.warn(`[Critic] ExperientialLabs returned HTTP ${res.status}; trying Gemini fallback if configured.`);
        }
      } catch (err: any) {
        console.warn("[Critic] ExperientialLabs review failed:", err?.message || err);
      }
    }

    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });
      const res = await model.generateContent(prompt);
      return parseResponse(res.response.text());
    }

    return reject("Editorial review failed: no critic provider returned a valid review. Saved as draft for human review.");
  } catch (err: any) {
    console.warn("[Critic] Review failed closed:", err?.message || err);
    return reject("Editorial review failed or returned invalid output. Saved as draft for human review.");
  }
}

/**
 * 📈 Self-Learning Performance Optimizer Agent
 * Analyzes article view telemetry and updates the agent swarm's collective memory.
 */
export async function updateSwarmMemoryFromAnalytics() {
  try {
    const topPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { views: "desc" },
      take: 5,
      select: { title: true, views: true, category: true },
    });

    if (topPosts.length === 0) return;

    const topTitles = topPosts.map((p) => `"${p.title}" (${p.views} views)`).join(", ");
    const memory = `Top reader engagement observed on topics: ${topTitles}. Maintain authoritative technical breakdowns, deep comparisons, and actionable architectural diagrams.`;

    await prisma.setting.upsert({
      where: { key: "AGENT_PERFORMANCE_MEMORY" },
      update: { value: memory },
      create: { key: "AGENT_PERFORMANCE_MEMORY", value: memory, description: "Swarm self-improvement collective memory." },
    });
  } catch (e) {
    console.warn("Could not update swarm memory:", e);
  }
}
