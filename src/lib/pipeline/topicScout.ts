import Parser from "rss-parser";
import { prisma } from "../prisma";

const parser = new Parser({ timeout: 8000 });

const RSS_SOURCES = [
  // Highest-signal editorial feeds across core publication pillars:
  // Tech, AI & Engineering
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml",
  "https://arstechnica.com/feed/",
  "https://www.wired.com/feed/rss",
  "https://hnrss.org/frontpage",
  // Markets, Economy & Quant Trading
  "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
  "https://www.moneycontrol.com/rss/MCtopnews.xml",
  // Global Travel, Expeditions & Secret Destinations
  "https://www.lonelyplanet.com/news/rss",
  "https://www.cntraveler.com/feed/rss",
  // National & International Defense, Aerospace & Strategic Tech
  "https://www.defensenews.com/arc/outboundfeeds/rss/",
  "https://breakingdefense.com/feed/",
  // Raw Google Trends for hot breaking search volume
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US",
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN",
];

async function getRecentTopicSignatures(): Promise<Set<string>> {
  const signatures = new Set<string>();
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter((w: string) => w.length > 3).sort().join(" ");
  try {
    const recent = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 30,
      select: { title: true },
    });
    for (const p of recent) {
      if (p.title) signatures.add(norm(p.title));
    }
    // GenerationLog records the originally scouted topic — catch dupes even when the final title was rewritten
    const recentLogs = await prisma.generationLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      select: { topic: true },
    });
    for (const log of recentLogs) {
      if (log.topic) signatures.add(norm(log.topic));
    }
  } catch (_) {}
  return signatures;
}

function isDuplicateTopic(topic: string, recent: Set<string>): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter((w: string) => w.length > 3).sort().join(" ");
  const signature = norm(topic);
  if (!signature) return false;
  // Exact-signature match or ≥60% word overlap with a recently published article
  if (recent.has(signature)) return true;
  const words = new Set(signature.split(" "));
  for (const recentSig of Array.from(recent)) {
    const recentWords = recentSig.split(" ");
    if (recentWords.length === 0) continue;
    const overlap = recentWords.filter((w: string) => words.has(w)).length / recentWords.length;
    if (overlap >= 0.6) return true;
  }
  return false;
}

/**
 * Trend phrases that are news-of-the-moment (a name, a passing meme, a
 * one-day search spike). These decay within hours, are unrankable for a small
 * site, and historically produced junk like "The Future of Musk, the Movie".
 * We either drop them or anchor them to an evergreen angle.
 */
const EPHEMERAL_PATTERNS = [
  /^(musk|elon musk),?\s+the\s+movie/i,
  /netflix.*(series|film|movie|docuseries)/i,
  /(box office|box-office) (hit|flop)/i,
  /(trolled|roasted|viral video|leaked video|reacts to|response to|controversy)/i,
  /(death|dead|dies|passed away|obituary|hospitali[sz]ed|arrest|arrested|jail|bail)/i,
  /(live stream|live score|highlights|watch online|free stream)/i,
  /(billion|million) (net worth|salary|earnings)/i,
  /(world cup|ipl|election|match|fixture)( today| live)?$/i,
  /^[A-Z][a-z]+,? the (movie|film|series|song)$/i,
];

/** Bona-fide news nouns that make a trend phrase durable enough to rank. */
const SUBSTANTIVE_WORDS = [
  "launch", "launched", "update", "upgraded", "review", "benchmark", "announced",
  "released", "spec", "price", "pricing", "features", "how to", "guide",
  "tutorial", "open source", "api", "model", "chip", "battery", "gpu", "cpu",
  "ipo", "earnings", "regulation", "policy", "lawsuit", "ruling", "acquisition",
  "funding", "startup", "debuts", "unveiled", "windows", "android", "ios",
  "iphone", "macbook", "vision pro", "nvidia", "openai", "gemini", "claude",
  "tesla", "quantum", "robot", "satellite", "5g", "chipset", "processor",
];

export interface ScoutedTopic {
  topic: string;
  source: string;
  suggestedCategory: string;
  /** High-signal editorial angle that steers the writer agent & headline. */
  angle?: string;
  /** Rejected-phrase logging so operators can tune the gate. */
  rejected?: string;
}

/** Strip site suffixes & HN prefixes from feed titles. */
function cleanRssTitle(raw: string): string {
  let title = raw.replace(
    /\s*-\s*(TechCrunch|The Verge|Google Trends|Hacker News|Reuters|Economic Times|Moneycontrol|Ars Technica|WIRED)$/i,
    ""
  );
  title = title.replace(/^(Show HN|Ask HN|Tell HN):\s*/i, "");
  return title.trim();
}

/**
 * Editorial quality gate: is this phrase a durable topic a small publication
 * can realistically rank for? News-feed titles pass; raw one-day search
 * queries ("PNOE's new face mask wants to...") are rejected or reshaped.
 */
export function passesTopicQualityGate(phrase: string): boolean {
  if (!phrase || phrase.trim().length < 18 || phrase.length > 140) return false;

  // Must look like a story: contain a verb-ish noun phrase, not all-caps shouting.
  const words = phrase.split(/\s+/);
  if (words.length < 4 || words.length > 22) return false;

  if (EPHEMERAL_PATTERNS.some((re) => re.test(phrase))) return false;

  const lower = phrase.toLowerCase();
  const hasSubstance = SUBSTANTIVE_WORDS.some((w) => lower.includes(w));
  const looksLikeStory = /\b(how|why|what|new|next|first|inside|the)\b/i.test(phrase);
  return hasSubstance || looksLikeStory;
}

/**
 * Convert a raw trending search query into an evergreen, rankable topic by
 * anchoring it to a durable editorial angle instead of the news-of-the-hour.
 */
export function reshapeEphemeralTrend(rawPhrase: string): string | null {
  const clean = cleanRssTitle(rawPhrase);
  if (!clean) return null;

  // Extract a plausible product/technology/entity anchor from the phrase.
  const anchorMatch = clean.match(
    /\b(iphone|ipad|macbook|vision pro|airpods|pixel|galaxy|windows|android|chatgpt|openai|gemini|claude|nvidia|rtx|tesla|bitcoin|ethereum|gpt-\d|llm|ai model|robot|drone|ev|electric (car|scooter)|smartwatch|smart tv|laptop|router|ssd|gpu)\b/i
  );

  if (!anchorMatch) return null;
  const anchor = anchorMatch[1].replace(/\s+/g, " ");

  const ANGLES = [
    `${anchor}: What Actually Changed and Who Benefits`,
    `${anchor} Buyer's Guide: Specs, Prices & Real-World Trade-offs`,
    `How ${anchor} Fits Into Your Setup: Honest Field Notes`,
    `${anchor} vs the Competition: Benchmarks That Matter`,
  ];
  return ANGLES[Math.floor(Math.random() * ANGLES.length)];
}

/**
 * Rotate a high-value evergreen angle for a given niche anchor so the site
 * keeps publishing evergreen, monetizable content even when RSS is down.
 */
export function getEvergreenTopicForNiche(niche?: string): string {
  const DIVERSE_ANCHORS = [
    "Autonomous AI Agent Swarms & Tool Calling",
    "National & Global Air Defence Shield Architectures (S-400, Kusha, Iron Dome)",
    "Hypersonic Missile Interceptors & Space-Agnostic Radar Systems",
    "Nifty 50 Breakout Setups & FII Liquidity Flow",
    "US Semiconductor Stocks & AI Hardware Supercycle",
    "Hidden Luxury Travel Expeditions in Southeast Asia",
    "Prop Firm Evaluation Rules & Payout Risk Management",
    "Distributed Microservices with Next.js & Rust",
    "Apple M4 Ultra Silicon vs High-End GPUs",
    "Gold & Commodity Supercycles in High Inflation",
    "Secret European Train Routes & Budget Hacks",
    "Zero-Trust Kubernetes Security & eBPF Networks",
    "Algorithmic Day Trading Desks & Python Backtesting",
    "Solo Remote Work Expeditions in Latin America",
  ];

  const anchor = (niche || "").trim()
    ? niche!.trim()
    : DIVERSE_ANCHORS[Math.floor(Math.random() * DIVERSE_ANCHORS.length)];

  const TEMPLATES = [
    `The 2026 ${anchor} Playbook: Crucial Insights & Practical Realities`,
    `Mastering ${anchor}: The Complete Guide for Modern Practitioners`,
    `What Industry Experts Won't Tell You About ${anchor}`,
    `Tested Field Notes: Practical Lessons from ${anchor}`,
    `Why ${anchor} Is Shaking the Industry (And How to Position Now)`,
    `The Real-World Architecture of ${anchor}: Benchmarks & Deep Analysis`,
  ];
  return TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
}

function categorizeTopic(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("defence") || lower.includes("defense") || lower.includes("missile") || lower.includes("radar") || lower.includes("air defence") || lower.includes("air defense") || lower.includes("s-400") || lower.includes("patriot") || lower.includes("iron dome") || lower.includes("kusha") || lower.includes("hypersonic") || lower.includes("military") || lower.includes("interceptor")) {
    return "Air Defence & Strategic Tech";
  }
  if (lower.includes("travel") || lower.includes("traveller") || lower.includes("backpack") || lower.includes("trek") || lower.includes("nomad") || lower.includes("expedition") || lower.includes("tourism") || lower.includes("itinerary") || lower.includes("destination") || lower.includes("hiking") || lower.includes("flight")) {
    return "Travel & Expeditions";
  }
  if (lower.includes("festival") || lower.includes("diwali") || lower.includes("holi") || lower.includes("carnival") || lower.includes("tradition") || lower.includes("celebration") || lower.includes("culture")) {
    return "Festivals & Culture";
  }
  if (lower.includes("nifty") || lower.includes("sensex") || lower.includes("bse") || lower.includes("nse") || lower.includes("rupee") || lower.includes("sebi") || lower.includes("fii") || lower.includes("dii")) {
    return "Indian Markets";
  }
  if (lower.includes("forex") || lower.includes("usd") || lower.includes("eur") || lower.includes("gbp") || lower.includes("currency")) {
    return "Forex & Currencies";
  }
  if (lower.includes("gold") || lower.includes("silver") || lower.includes("crude") || lower.includes("oil") || lower.includes("commodity") || lower.includes("metal") || lower.includes("natural gas")) {
    return "Commodities";
  }
  if (lower.includes("s&p") || lower.includes("nasdaq") || lower.includes("dow") || lower.includes("wall street") || lower.includes("fed") || lower.includes("nyse")) {
    return "US Markets";
  }
  if (lower.includes("ai") || lower.includes("gpt") || lower.includes("llm") || lower.includes("model") || lower.includes("neural") || lower.includes("agent") || lower.includes("claude") || lower.includes("openai") || lower.includes("gemini")) {
    return "Artificial Intelligence";
  }
  if (lower.includes("code") || lower.includes("javascript") || lower.includes("python") || lower.includes("react") || lower.includes("dev") || lower.includes("rust") || lower.includes("kubernetes")) {
    return "Development & Engineering";
  }
  if (lower.includes("iphone") || lower.includes("apple") || lower.includes("macbook") || lower.includes("ipad") || lower.includes("vision pro") || lower.includes("gadget") || lower.includes("hardware") || lower.includes("foldable") || lower.includes("samsung") || lower.includes("pixel") || lower.includes("galaxy")) {
    return "Technology & Gadgets";
  }
  if (lower.includes("crypto") || lower.includes("bitcoin") || lower.includes("ethereum") || lower.includes("blockchain") || lower.includes("token")) {
    return "Finance & Markets";
  }
  return "Technology & Gadgets";
}

/** Pick a strong angle that gives the writer a sharp editorial spine. */
function pickAngle(topic: string): string {
  const ANGLES = [
    "Open with a real-world scenario a reader recognizes, then explain what changed and who wins/loses.",
    "Frame as a buyer's decision: concrete specs, prices, trade-offs, and a clear recommendation.",
    "Field-notes angle: what practitioners actually do, what broke, what they'd do differently.",
    "Counter-intuitive take: what everyone gets wrong about this topic, backed by numbers.",
  ];
  // Deterministic-ish rotation by topic length so prompts vary run to run.
  const idx = topic.length % ANGLES.length;
  return ANGLES[idx];
}

/**
 * 🎯 Smart topic scout with an editorial quality gate.
 *
 * Strategy (smartest-first):
 *   1. Reputable news RSS (TechCrunch, The Verge, Ars, HN…) — titles are real
 *      stories, gated for substance & deduplicated against recent articles.
 *   2. Google Trends — only passes if the phrase survives the gate, otherwise
 *      reshaped into an evergreen angle around a recognizable product anchor.
 *   3. Curated evergreen catalog — always publishable, monetizable topics.
 */
export async function scoutTrendingTopic(customNiche?: string): Promise<ScoutedTopic> {
  const recentSignatures = await getRecentTopicSignatures();
  const collected: ScoutedTopic[] = [];
  const rejected: string[] = [];

  for (const feedUrl of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const isRawTrends = feedUrl.includes("trends.google.com");

      for (const item of (feed.items || []).slice(0, 12)) {
        const raw = cleanRssTitle(item.title || "");
        if (!raw) continue;

        let topic: string;
        if (isRawTrends && !passesTopicQualityGate(raw)) {
          const reshaped = reshapeEphemeralTrend(raw);
          if (!reshaped) {
            rejected.push(raw);
            continue;
          }
          topic = reshaped;
        } else {
          topic = raw;
        }

        if (isDuplicateTopic(topic, recentSignatures)) {
          console.log(`[TopicScout] Skipping duplicate topic: "${topic.slice(0, 60)}"`);
          continue;
        }

        collected.push({
          topic,
          source: feed.title || feedUrl,
          suggestedCategory: categorizeTopic(topic),
          angle: pickAngle(topic),
        });
      }
    } catch (e: any) {
      console.warn(`[TopicScout] Could not fetch RSS ${feedUrl}: ${e.message}`);
    }
  }

  if (collected.length > 0) {
    const pick = collected[Math.floor(Math.random() * collected.length)];
    if (rejected.length > 0) {
      console.log(`[TopicScout] Rejected ${rejected.length} ephemeral trend phrases, e.g. "${rejected[0]}"`);
    }
    return pick;
  }

  // Fallback 1: niche-anchored evergreen
  if (customNiche && customNiche.trim().length > 0) {
    return {
      topic: getEvergreenTopicForNiche(customNiche),
      source: "Curated Evergreen (Niche)",
      suggestedCategory: categorizeTopic(customNiche),
      angle: pickAngle(customNiche),
    };
  }

  // Fallback 2: general evergreen catalog (deduplicated against recent posts)
  let evergreen = getEvergreenTopicForNiche();
  for (let i = 0; i < 6 && isDuplicateTopic(evergreen, recentSignatures); i++) {
    evergreen = getEvergreenTopicForNiche();
  }
  return {
    topic: evergreen,
    source: "Curated Evergreen Pool",
    suggestedCategory: categorizeTopic(evergreen),
    angle: pickAngle(evergreen),
  };
}

/**
 * Build a compact list of recently published titles to inject into the writer
 * prompt so the AI never repeats a headline pattern it already used.
 */
export async function getRecentArticleTitles(limit = 15): Promise<string[]> {
  try {
    const { prisma } = await import("../prisma");
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: limit,
      select: { title: true },
    });
    return posts.map((p) => p.title);
  } catch {
    return [];
  }
}
