import { GoogleGenerativeAI } from "@google/generative-ai";

export interface GenerateArticlePromptOptions {
  topic: string;
  niche?: string;
  category?: string;
  tone?: string;
  targetWordCount?: number;
  language?: string;
}

export async function generateArticleContent(options: GenerateArticlePromptOptions): Promise<{
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  faq: Array<{ question: string; answer: string }>;
  suggestedImageQuery: string;
  suggestedVideoQuery: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY || "";
  const openaiKey = process.env.OPENAI_API_KEY || "";
  const modelName = process.env.AI_MODEL_PREFERENCE || "gemini-1.5-flash";
  const targetWords = options.targetWordCount || 1600;
  const tone = options.tone || "engaging, authoritative, and deeply informative";
  const language = options.language || "English";

  const systemInstruction = `You are an elite, world-class SEO content strategist and technical writer. 
Write high-converting, deeply researched, and engaging long-form blog articles formatted in clean Markdown.
Always return ONLY a valid JSON object without any introductory or conversational markdown outside the JSON.`;

  const userPrompt = `
Generate a comprehensive, high-ranking SEO blog post about: "${options.topic}".
Niche/Context: ${options.niche || "General Technology & Modern Innovation"}
Category: ${options.category || "Technology"}
Tone: ${tone}
Language: ${language}
Target Word Count: ~${targetWords} words.

Guidelines:
1. Title: Extremely engaging, click-worthy yet authentic (not spammy clickbait), optimized for search intent.
2. Structure:
   - Compelling Hook & Introduction
   - Table of Contents friendly headings (Use ## for H2 and ### for H3)
   - Deep-dive sections with real-world examples, actionable insights, and structured bullet points
   - Comparison tables or pros/cons where relevant using Markdown tables
   - "Key Takeaways" / "TL;DR" callout box
   - Practical Future Outlook & Conclusion
3. FAQ Section: 3-5 high-value FAQs with concise, authoritative answers.
4. Search Intent & SEO: Naturally weave primary and secondary keywords.
5. Media Queries:
   - Provide a precise high-resolution photography search query for Unsplash (e.g., "futuristic neural network server room").
   - Provide a precise YouTube video search query for an explainer/tutorial (e.g., "how neural networks work tutorial 2025").

Return strictly a JSON object with this exact schema:
{
  "title": "String",
  "excerpt": "String (140-180 characters summarizing the article)",
  "content": "String (Full long-form Markdown article content including headings, bullet points, tables, and conclusion)",
  "category": "String (e.g. Artificial Intelligence, Tech, Finance, Productivity, Web Development)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoTitle": "String (Under 60 chars)",
  "seoDescription": "String (150-160 chars meta description)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "faq": [
    { "question": "String", "answer": "String" }
  ],
  "suggestedImageQuery": "String (2-4 keywords for photo search)",
  "suggestedVideoQuery": "String (query to find relevant YouTube video)"
}
`;

  // 1. If Gemini API Key is available
  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelName.includes("gemini") ? modelName : "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent([
        { text: systemInstruction },
        { text: userPrompt },
      ]);
      const rawText = result.response.text();
      return parseAiJsonResponse(rawText, options.topic);
    } catch (err: any) {
      console.warn("Gemini API call failed, falling back if possible:", err.message);
    }
  }

  // 2. If OpenAI Key is available
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
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        return parseAiJsonResponse(content, options.topic);
      }
    } catch (err: any) {
      console.warn("OpenAI API call failed:", err.message);
    }
  }

  // 3. Fallback Mock Generator if no keys are yet configured
  console.info("Notice: No GEMINI_API_KEY or OPENAI_API_KEY configured yet. Using structured high-quality fallback template.");
  return generateOfflineArticle(options.topic, options.category || "Technology");
}

function parseAiJsonResponse(rawText: string, fallbackTopic: string) {
  try {
    let clean = rawText.trim();
    if (clean.startsWith("```json")) {
      clean = clean.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (clean.startsWith("```")) {
      clean = clean.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    const parsed = JSON.parse(clean);
    return {
      title: parsed.title || `Mastering ${fallbackTopic}: The Comprehensive Guide`,
      excerpt: parsed.excerpt || `A deep dive analysis and actionable breakdown of ${fallbackTopic}.`,
      content: parsed.content || `## Introduction\n\nExploring ${fallbackTopic} and its impact...`,
      category: parsed.category || "Technology",
      tags: Array.isArray(parsed.tags) ? parsed.tags : ["AI", "Tech", "Innovation"],
      seoTitle: parsed.seoTitle || parsed.title || fallbackTopic,
      seoDescription: parsed.seoDescription || parsed.excerpt || `Complete guide to ${fallbackTopic}`,
      seoKeywords: Array.isArray(parsed.seoKeywords) ? parsed.seoKeywords : [fallbackTopic, "guide", "technology"],
      faq: Array.isArray(parsed.faq) ? parsed.faq : [],
      suggestedImageQuery: parsed.suggestedImageQuery || fallbackTopic,
      suggestedVideoQuery: parsed.suggestedVideoQuery || `${fallbackTopic} tutorial`,
    };
  } catch (e) {
    console.error("Failed to parse AI JSON response, raw text was:", rawText);
    return generateOfflineArticle(fallbackTopic, "Technology");
  }
}

function generateOfflineArticle(topic: string, category: string) {
  return {
    title: `The Future of ${topic}: Key Trends, Innovations & What's Next`,
    excerpt: `Discover the monumental shifts happening in ${topic}, key architecture breakdowns, practical real-world strategies, and what experts predict next.`,
    content: `## Introduction: The Rapid Rise of ${topic}

In today's fast-moving digital frontier, **${topic}** has emerged as one of the most critical topics shaping workflows, enterprise architecture, and consumer products. Whether you are an industry practitioner, developer, or enthusiast, grasping the underlying principles of ${topic} is no longer optional—it is a superpower.

---

## 🚀 Key Advantages & Breakthroughs

Why is ${topic} dominating discussions across the tech landscape? Here are the fundamental catalysts:

1. **Unmatched Efficiency**: Drastically cuts down repetitive manual cycles through intelligent workflows.
2. **Predictive Capability**: Enables teams to forecast trends, preempt bottlenecks, and deliver higher value.
3. **Seamless Scalability**: Modern cloud-native infrastructure allows instant horizontal scaling with zero downtime.

> **Key Insight**: The real differentiation in ${topic} comes not from adopting tools, but from orchestrating them into a cohesive, automated flywheel.

---

## 📊 Comparison: Traditional Methods vs. Next-Gen ${topic}

| Feature | Legacy Approach | Next-Gen ${topic} Framework |
| :--- | :--- | :--- |
| **Execution Speed** | Days / Weeks | Real-time / Sub-second |
| **Operational Overhead** | High Manual Effort | Automated Cloud Pipeline |
| **Error Rate** | 12% - 18% | < 0.5% with AI Guardrails |
| **Cost Efficiency** | Fixed High CapEx | Elastic Pay-as-you-grow |

---

## 🛠️ Step-by-Step Implementation Strategy

Implementing modern solutions around ${topic} requires a structured roadmap:

### Phase 1: Assessment & Objective Setting
Define your primary KPIs and audit existing bottlenecks before integrating automated pipelines.

### Phase 2: Pipeline Integration & Tooling
Connect robust APIs, webhooks, and observability monitors to ensure transparent real-time telemetry.

### Phase 3: Iteration & Continuous Optimization
Refine prompts, benchmark latency, and fine-tune output quality based on verified user engagement metrics.

---

## 💡 Summary & Final Thoughts

As we look toward the next horizon, **${topic}** will continue to evolve at an exponential pace. Organizations and creators who master these tools today will lead tomorrow's digital economy.

Stay curious, experiment continuously, and harness the full potential of automated intelligence.`,
    category: category || "Artificial Intelligence",
    tags: [topic.split(" ")[0] || "AI", "Technology", "Innovation", "Automation", "Future"],
    seoTitle: `${topic}: Complete 2025 Guide & Key Insights`,
    seoDescription: `Comprehensive analysis and ultimate guide to ${topic}. Learn the core benefits, implementation roadmap, and future outlook.`,
    seoKeywords: [topic, "technology guide", "future trends", "automation", "AI innovations"],
    faq: [
      {
        question: `What makes ${topic} so important today?`,
        answer: `${topic} fundamentally changes how workflows are designed, enabling unprecedented speed, cost efficiency, and accuracy.`,
      },
      {
        question: `How can beginners get started with ${topic}?`,
        answer: `Begin by understanding the core principles, experimenting with hands-on tools, and following structured tutorials.`,
      },
      {
        question: `What are the common pitfalls to avoid?`,
        answer: `Avoid adopting tools without a clear operational goal and ensure proper data privacy and validation guardrails are in place.`,
      },
    ],
    suggestedImageQuery: `${topic} technology abstract`,
    suggestedVideoQuery: `${topic} explained in 5 minutes`,
  };
}
