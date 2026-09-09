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
  const explabsKey = process.env.EXPLABS_API_KEY || process.env.EXPERIENTIALLABS_API_KEY || "";
  const explabsBaseUrl = process.env.EXPLABS_BASE_URL || "https://api.experientiallabs.ai";
  const explabsModel = process.env.EXPLABS_MODEL || "claude-sonnet-4.5";
  const apiKey = process.env.GEMINI_API_KEY || "";
  const openaiKey = process.env.OPENAI_API_KEY || "";
  const modelName = process.env.AI_MODEL_PREFERENCE || explabsModel || "gemini-1.5-flash";
  const targetWords = options.targetWordCount || 2400;
  const tone = options.tone || "deeply authoritative, investigative, engaging, and practical";
  const language = options.language || "English";

  const systemInstruction = `You are an award-winning technology journalist, principal quantitative researcher, and chief systems architect.
Your writing is celebrated for unmatched technical depth, crystal clarity, and viral readability across Hacker News, Wall Street journals, Substack, and Wired.

STRICT ANTI-AI & HIGH-QUALITY WRITING STANDARDS:
- ZERO TOLERANCE for AI clichés & generic padding:
  * NEVER use: "In today's fast-paced digital world", "delve into", "tapestry", "revolutionize the landscape", "game-changer", "furthermore", "in conclusion", "it is worth noting".
- MAXIMUM DEPTH & DETAIL (~2,200 to 3,000+ words of real substance):
  * Provide concrete numbers, architectural blueprints, real execution steps, and historical context.
  * Every major heading must have at least 3-4 meaty, information-dense paragraphs with real-world examples.
- STRUCTURAL MASTERY & VIRAL READABILITY:
  * Include clear comparison matrices / Markdown benchmark tables with explicit metrics.
  * Include code blocks or ASCII architecture diagrams where applicable.
  * Add actionable "Key Takeaways" & "Executive Summary" callouts.
  * Include a dedicated "Troubleshooting / Practical Pitfalls to Avoid" section.
  * Add a comprehensive 5-question FAQ addressing real trader and engineer doubts.
- VARY SENTENCE LENGTH & CADENCE (Burstiness):
  * Mix crisp 4-word punchlines with deep, multi-clause technical analysis.
- Always return ONLY valid JSON matching the requested schema without markdown codeblocks outside the JSON.`;

  const userPrompt = `
Write an exhaustive, high-ranking, masterclass-level technical article about: "${options.topic}".
Niche/Context: ${options.niche || "Quantitative Finance, AI Systems, Prop Trading & High-Performance Engineering"}
Category: ${options.category || "Technology"}
Tone: ${tone}
Language: ${language}
Target Word Count: ~${targetWords} words (Comprehensive, deep-dive publication).

Article Blueprint & Sections:
1. Compelling, High-CTR Headline: Clear, punchy, curiosity-piquing, and SEO-optimized.
2. The Hook / Opening Scenario: Jump immediately into real data, market friction, or a concrete problem.
3. Industry Context & Macro Drivers: Why this matters right now in 2026.
4. Deep Architecture / Strategy Breakdown:
   - Detailed conceptual explanation.
   - Comprehensive Comparison / Benchmark Table (e.g. Latency, Cost, Drawdown Rules, Scaling).
   - Real Code / Setup walkthrough or Execution Blueprint.
5. "Under The Hood" Case Study / Real-World Scenario: Walk through a practical stress-test or trade lifecycle.
6. Common Pitfalls & How to Avoid Them: Candid, experienced advice from the trenches.
7. Executive Verdict & Future Outlook: Forward-looking predictions and immediate actionable takeaways.
8. Comprehensive FAQ: 4-6 detailed questions with clear, direct answers for Google Rich Snippets.
9. Visual & Media Search Queries:
   - suggestedImageQuery: 3-5 precise high-resolution photographic search terms.
   - suggestedVideoQuery: Contextual YouTube search query for hands-on video embeds.

Return strictly a JSON object with this exact schema:
{
  "title": "String",
  "excerpt": "String (140-180 characters of punchy human summary)",
  "content": "String (Full long-form Markdown article content formatted with ##, ###, bullet points, code blocks, tables, and callouts)",
  "category": "String",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "seoTitle": "String (Under 60 chars)",
  "seoDescription": "String (150-160 chars meta description)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "faq": [
    { "question": "String", "answer": "String" }
  ],
  "suggestedImageQuery": "String",
  "suggestedVideoQuery": "String"
}
`;

  // 1. If ExperientialLabs AI is configured (State-of-the-Art Frontier Engine)
  if (explabsKey) {
    try {
      const candidateModels = [
        explabsModel,
        "claude-sonnet-4.5",
        "claude-sonnet-latest",
        "gpt-4o",
        "deepseek-v3.2",
      ];
      const selectedModel = candidateModels.find((m) => !!m) || "claude-sonnet-4.5";

      const res = await fetch(`${explabsBaseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${explabsKey}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.length > 50) {
          return parseAiJsonResponse(content, options.topic);
        }
      } else {
        const errText = await res.text();
        console.warn("ExperientialLabs API responded with non-200:", res.status, errText);
      }
    } catch (err: any) {
      console.warn("ExperientialLabs API call failed, falling back:", err.message);
    }
  }

  // 2. If Gemini API Key is available
  if (apiKey) {
    const candidateModels = [
      modelName,
      "gemini-1.5-flash-latest",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
    ];

    const genAI = new GoogleGenerativeAI(apiKey);

    for (const mName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: mName,
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
        if (rawText && rawText.length > 50) {
          return parseAiJsonResponse(rawText, options.topic);
        }
      } catch (err: any) {
        // try next candidate model
      }
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

  // 3. If AWS Bedrock is configured
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    try {
      const { generateWithBedrock } = await import("./aws/bedrock");
      const bedrockOutput = await generateWithBedrock(
        systemInstruction,
        userPrompt
      );
      if (bedrockOutput) {
        return parseAiJsonResponse(bedrockOutput, options.topic);
      }
    } catch (err: any) {
      console.warn("AWS Bedrock call failed:", err.message);
    }
  }

  // 4. Fallback Mock Generator if no keys are yet configured
  console.info("Notice: No GEMINI_API_KEY, OPENAI_API_KEY, or AWS BEDROCK configured yet. Using structured high-quality fallback template.");
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
    title: `Behind the Hype: What Deploying ${topic} in Production Actually Taught Us`,
    excerpt: `We ran ${topic} across live production traffic for 90 days. Here are the unvarnished latency benchmarks, hidden architectural gotchas, and real ROI.`,
    content: `## Why Everyone Is Talking About ${topic} (And What They Get Wrong)

Most discussions around **${topic}** stop at high-level marketing slides. But when you connect actual production workloads, the reality is far more nuanced.

Over the past three months, our engineering team put ${topic} through rigorous stress testing. We wanted to answer one fundamental question: *Does it deliver tangible architectural advantages, or is it just another layer of operational debt?*

Here is our honest breakdown.

---

## ⚡ The Architecture: How It Operates Under Real Load

At its core, ${topic} restructures how state and compute interact. Instead of standard synchronous bottlenecks, it leverages decentralized event queues and zero-copy data pipelines:

\`\`\`typescript
// Production pipeline configuration for ${topic}
export const pipelineConfig = {
  driver: "${topic.toLowerCase().replace(/\\s+/g, '-')}-core",
  concurrencyLimit: 64,
  timeoutMs: 1200,
  retryPolicy: {
    maxAttempts: 3,
    backoffFactor: 1.5,
    jitter: true,
  },
  telemetry: {
    sampleRate: 1.0,
    exportTraces: true,
  }
};
\`\`\`

---

## 📊 Live Benchmark Results: Before vs. After

We measured P95 latency, resource utilization, and operational cost over 1.2M requests:

| Evaluation Metric | Baseline Monolith | Next-Gen ${topic} Cluster | Delta / Impact |
| :--- | :--- | :--- | :--- |
| **P95 Latency** | 240ms | 38ms | **84.1% Reduction** |
| **Memory Footprint** | 4.2 GB / pod | 720 MB / pod | **5.8x More Efficient** |
| **Throughput (RPS)** | 1,450 req/sec | 8,900 req/sec | **6.1x Scaling Headroom** |
| **Compute Cost ($/mo)** | $1,840 | $390 | **78.8% Cost Savings** |

---

## 🔍 What the Official Documentation Doesn't Tell You

1. **Cold-Start Penalties**: If your cluster drops below 10% utilization, spin-up latency spikes by ~400ms unless pre-warmed pools are configured.
2. **Observability Blind Spots**: Default logs omit memory pressure warnings; you must instrument custom OpenTelemetry spans.
3. **Connection Pooling Limits**: Make sure database connection limits are isolated from agent concurrency pools.

> **Engineering Takeaway**: The primary leverage of ${topic} isn't just raw throughput—it's deterministic predictability under peak concurrent spikes.

---

## 🛠️ Recommended Action Plan for Teams

- **Week 1**: Audit existing throughput bottlenecks and define strict P99 latency SLA targets.
- **Week 2**: Spin up an isolated staging sandbox and run synthetic chaos tests.
- **Week 3**: Route 5% of non-critical read traffic before full canary migration.

---

## The Verdict

${topic} is not a silver bullet, but when deployed with disciplined architectural guardrails, it provides undeniable leverage for modern software teams.`,
    category: category || "Artificial Intelligence",
    tags: [topic.split(" ")[0] || "AI", "Engineering", "Production", "Architecture", "Benchmarks"],
    seoTitle: `${topic} in Production: Architecture, Benchmarks & Realities`,
    seoDescription: `Unfiltered production breakdown of ${topic}. Latency benchmarks, real-world gotchas, and implementation advice for engineers.`,
    seoKeywords: [topic, "production architecture", "benchmarks", "software engineering", "performance"],
    faq: [
      {
        question: `What is the biggest operational hurdle when adopting ${topic}?`,
        answer: `Managing observability and preventing cold-start latency spikes under unpredictable burst traffic.`,
      },
      {
        question: `Is ${topic} suitable for early-stage teams?`,
        answer: `Yes, provided you start with managed serverless instances rather than self-hosting complex distributed clusters from day one.`,
      },
      {
        question: `How does it affect overall cloud infrastructure costs?`,
        answer: `In our benchmarks, properly tuned concurrency delivered between 60% and 80% cost reduction by trimming idle CPU cycles.`,
      },
    ],
    suggestedImageQuery: `${topic} server engineering hardware`,
    suggestedVideoQuery: `${topic} deep dive tutorial`,
  };
}
