/**
 * ⚡ Viral Headline & Catchy Hook Generator Engine
 * -------------------------------------------------------------
 * Eliminates boring, cookie-cutter titles (e.g. "The Future of X: Key Trends...")
 * and generates high-CTR, curiosity-driven, authoritative headlines tailored
 * to the subject matter (AI, Quant Finance, Technology, Travel, Gadgets).
 */

export interface HeadlineStyleVariant {
  style: "CURIOSITY_GAP" | "BENCHMARK_PROVING" | "INDUSTRY_SECRETS" | "DEFINITIVE_GUIDE" | "WARNING_REALITY_CHECK";
  headline: string;
  excerpt: string;
}

export function generateCatchyViralHeadline(rawTopic: string, category: string = "Technology"): {
  title: string;
  excerpt: string;
  angle: string;
} {
  // 1. Sanitize raw input - strip RSS prefixes, "The Future of", and split compound strings
  let cleanTopic = rawTopic
    .replace(/^The Future of\s+/i, "")
    .replace(/:\s*Key Trends.*$/i, "")
    .replace(/:\s*Innovations & What's Next.*$/i, "")
    .replace(/^(Show HN|Ask HN|Tell HN):\s*/i, "")
    .replace(/\s*-\s*(TechCrunch|The Verge|Google Trends|Hacker News|Reuters|Economic Times|Moneycontrol|Ars Technica|WIRED|BBC News|CNN|CNBC)$/i, "")
    .replace(/[\[\(].*?[\]\)]/g, "")
    .trim();

  // If topic contains a compound separator (semicolon, pipe, slash), take only the first entity
  if (cleanTopic.includes(";")) {
    cleanTopic = cleanTopic.split(";")[0].trim();
  }
  if (cleanTopic.includes(" | ")) {
    cleanTopic = cleanTopic.split(" | ")[0].trim();
  }
  if (/\s+-\s+/.test(cleanTopic)) {
    cleanTopic = cleanTopic.split(/\s+-\s+/)[0].trim();
  }

  // If topic has trailing punctuation, clean it
  cleanTopic = cleanTopic.replace(/[:;,\.\-]+$/, "").trim();

  // If topic is already a well-formed complete editorial title (6 to 14 words), keep it natural
  const wordCount = cleanTopic.split(/\s+/).length;
  if (wordCount >= 6 && wordCount <= 14 && !/^the 2026/i.test(cleanTopic) && !/^mastering/i.test(cleanTopic)) {
    return {
      title: cleanTopic,
      excerpt: `An in-depth investigation into ${cleanTopic}: technical teardown, live benchmarks, and strategic takeaways.`,
      angle: `Comprehensive analysis focused solely on ${cleanTopic} with primary source verification and reproducible benchmarks.`,
    };
  }

  const cat = category.toLowerCase();
  const isFinance = cat.includes("market") || cat.includes("trading") || cat.includes("finance") || cat.includes("commodity") || cat.includes("forex");
  const isTravel = cat.includes("travel") || cat.includes("festival") || cat.includes("culture") || cat.includes("expedition");
  const isDev = cat.includes("dev") || cat.includes("engineering") || cat.includes("code");

  let headlineTemplates: Array<{ title: string; excerpt: string; angle: string }> = [];

  if (isFinance) {
    headlineTemplates = [
      {
        title: `The 2026 ${cleanTopic} Playbook: How Smart Capital Is Positioning Now`,
        excerpt: `Institutional desks and algorithmic traders are quietly restructuring around ${cleanTopic}. Here is the complete quantitative breakdown, key risk levels, and exact execution strategy.`,
        angle: "Quantitative market analysis with high-probability setup levels and liquidity flow breakdown.",
      },
      {
        title: `Why ${cleanTopic} Is Shaking Global Desks (And What Retail Traders Miss)`,
        excerpt: `Behind the volatility and headline numbers, ${cleanTopic} is driving structural shifts across liquidity pools. We break down the charts, order flow, and risk parameters.`,
        angle: "Insider market structure and order-book dynamics vs retail perception.",
      },
      {
        title: `The Truth About ${cleanTopic}: Risk Metrics, Capital Flows, and Big Targets`,
        excerpt: `A hard-nosed financial audit of ${cleanTopic}. Discover the macroeconomic catalysts, institutional positioning, and asymmetric trade targets for 2026.`,
        angle: "Asymmetric risk-to-reward thesis with multi-asset correlation matrices.",
      },
      {
        title: `Mastering ${cleanTopic}: The Complete Trader's Strategy & Risk Blueprint`,
        excerpt: `From entry models to capital allocation: everything you need to know about trading and profiting from ${cleanTopic} without blowing your drawdown limit.`,
        angle: "Practical risk-management framework with disciplined position sizing.",
      }
    ];
  } else if (isTravel) {
    headlineTemplates = [
      {
        title: `The Untold ${cleanTopic} Itinerary: Secret Spots, Budgets & Honest Traps to Avoid`,
        excerpt: `Skip the crowded tourist buses and overpriced traps. Here is our field-tested, step-by-step traveler's guide to experiencing ${cleanTopic} like a seasoned local.`,
        angle: "Authentic local immersive itinerary with transparent transit budgets and hidden gems.",
      },
      {
        title: `We Traveled Across ${cleanTopic}: What Nobody Warns You Before You Go`,
        excerpt: `The breathtaking views, the hidden transit hacks, and the crucial mistakes first-timers make. An unvarnished travel field dispatch on ${cleanTopic}.`,
        angle: "Real-world field notes highlighting cultural etiquette, cost breakdowns, and seasonal logistics.",
      },
      {
        title: `Ultimate ${cleanTopic} Explorer's Guide: Routes, Gear & Verified Stay Deals`,
        excerpt: `Everything you need to plan the perfect expedition through ${cleanTopic}—from verified hotel booking savings to day-by-day scenic routing.`,
        angle: "Comprehensive expedition logistics planner with verified stay and gear recommendations.",
      }
    ];
  } else if (isDev) {
    headlineTemplates = [
      {
        title: `${cleanTopic}: Architectural Teardown, Low-Latency Benchmarks & Systems Analysis`,
        excerpt: `A technical deep-dive into ${cleanTopic}: measuring compute efficiency, memory overhead, and distributed throughput under real production load.`,
        angle: "Deep engineering post-mortem with synthetic load tests, flame graphs, and code snippets.",
      },
      {
        title: `Inside ${cleanTopic}: The Engineering Guide Beyond the Documentation`,
        excerpt: `From cold starts to zero-copy queues: concrete configuration blueprints and production lessons learned from implementing ${cleanTopic}.`,
        angle: "Production configuration hardening with zero-downtime deployment patterns.",
      },
      {
        title: `The Architecture of ${cleanTopic} Explained: Systems Trade-offs & Reality`,
        excerpt: `Cutting through developer marketing: what ${cleanTopic} actually changes in compute, state management, and operational efficiency under peak concurrency.`,
        angle: "First-principles technical evaluation comparing baseline throughput vs modern runtime.",
      }
    ];
  } else {
    // Artificial Intelligence & General Tech
    headlineTemplates = [
      {
        title: `${cleanTopic}: Breakthrough Analysis & Emerging Strategic Implications`,
        excerpt: `An in-depth investigation into ${cleanTopic}: examining the frontier architecture, industry adoption curve, and competitive benchmarks setting new standards.`,
        angle: "Frontier technology investigation spotlighting architectural moats and emerging breakthroughs.",
      },
      {
        title: `What ${cleanTopic} Means for the Next Generation of AI & High-Compute Systems`,
        excerpt: `Breaking down the strategic significance of ${cleanTopic}. We examine hardware bottlenecks, inference economics, and market impacts.`,
        angle: "Frontier technology investigation spotlighting architectural moats and emerging breakthroughs.",
      },
      {
        title: `Inside ${cleanTopic}: Technical Specifications, Industry Benchmarks & Market Analysis`,
        excerpt: `Most discussions around ${cleanTopic} stop at high-level marketing slides. We analyze live performance to reveal true latency, costs, and hidden roadblocks.`,
        angle: "Unfiltered engineering stress test with reproducible P95 metrics and cost deltas.",
      },
      {
        title: `The Real-World Guide to ${cleanTopic}: Architecture, Benchmarks & Realities`,
        excerpt: `An investigative deep dive into ${cleanTopic}. Discover the core mechanics, practical implementation roadmaps, and the critical gotchas experts don't mention.`,
        angle: "Comprehensive technical review answering practical enterprise ROI and implementation hurdles.",
      },
      {
        title: `How ${cleanTopic} Actually Works (Minus the Corporate PR Deck)`,
        excerpt: `An honest, transparent engineering breakdown of ${cleanTopic}. What makes it groundbreaking, where it falls short, and how it impacts modern digital ecosystems.`,
        angle: "Candid investigative journalism unpacking real-world architectural strengths and flaws.",
      },
      {
        title: `Inside ${cleanTopic}: The Technical Architecture Redefining Modern Systems`,
        excerpt: `We deconstruct the state-of-the-art mechanisms driving ${cleanTopic}. Step-by-step architectural diagrams, runtime efficiency benchmarks, and future projections.`,
        angle: "Systems architecture deep dive featuring event pipelines, memory footprints, and scaling.",
      }
    ];
  }

  // Randomly select among templates with variety
  const randomIndex = Math.floor(Math.random() * headlineTemplates.length);
  const selected = headlineTemplates[randomIndex];

  return selected;
}
