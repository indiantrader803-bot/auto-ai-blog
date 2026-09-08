import { prisma } from "../prisma";
import { getAllCatalogArticles } from "../content/articles";

interface InternalLinkTarget {
  slug: string;
  title: string;
  keywords: string[];
}

const SEMANTIC_KEYWORD_MAP: Record<string, string[]> = {
  "nifty-50-sensex-record-highs-fii-dii-liquidity-breakout": [
    "Nifty 50",
    "Sensex",
    "FII inflows",
    "DII liquidity",
    "Indian stock market",
    "NSE breakout",
  ],
  "indian-stock-market-banking-defence-railway-multibaggers-2026": [
    "banking stocks",
    "defence sector",
    "railway infrastructure",
    "multibaggers",
    "Make-in-India capex",
  ],
  "us-stock-markets-sp500-nasdaq-big-tech-fed-rate-cuts": [
    "S&P 500",
    "Nasdaq 100",
    "Big Tech earnings",
    "Federal Reserve rate cuts",
    "Wall Street",
  ],
  "global-forex-trading-usd-inr-eur-usd-central-bank-hedging": [
    "USD/INR",
    "forex trading",
    "EUR/USD",
    "currency hedging",
    "RBI reserves",
  ],
  "commodity-supercycle-gold-silver-crude-oil-technical-breakouts": [
    "Brent Crude",
    "Gold prices",
    "Silver breakout",
    "commodity supercycle",
    "crude oil",
    "MCX trading",
  ],
  "autonomous-ai-agent-swarms-2026-enterprise-automation": [
    "autonomous AI",
    "agent swarms",
    "multi-agent systems",
    "enterprise automation",
  ],
  "nextjs-15-deep-dive-server-actions-partial-prerendering": [
    "Next.js 15",
    "Server Actions",
    "Partial Prerendering",
    "React Server Components",
  ],
};

export async function applySmartInternalLinks(
  content: string,
  currentSlug?: string
): Promise<string> {
  try {
    const catalog = getAllCatalogArticles();
    let dbPosts: any[] = [];

    try {
      dbPosts = await prisma.post.findMany({
        where: {
          status: "PUBLISHED",
          ...(currentSlug ? { slug: { not: currentSlug } } : {}),
        },
        select: { slug: true, title: true },
        take: 20,
      });
    } catch (_) {}

    // Combine targets
    const targets: InternalLinkTarget[] = [];

    for (const c of catalog) {
      if (currentSlug && c.slug === currentSlug) continue;
      targets.push({
        slug: c.slug,
        title: c.title,
        keywords: SEMANTIC_KEYWORD_MAP[c.slug] || [c.title.slice(0, 25)],
      });
    }

    for (const p of dbPosts) {
      if (currentSlug && p.slug === currentSlug) continue;
      if (!targets.some((t) => t.slug === p.slug)) {
        targets.push({
          slug: p.slug,
          title: p.title,
          keywords: [p.title.slice(0, 25)],
        });
      }
    }

    let processed = content;
    let linkCount = 0;

    for (const target of targets) {
      if (linkCount >= 4) break; // Max 4 high-value internal links per article

      for (const kw of target.keywords) {
        if (!kw || kw.length < 4) continue;
        const regex = new RegExp(`\\b(${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b(?![^\\[]*\\])`, "i");
        if (regex.test(processed) && !processed.includes(`/blog/${target.slug}`)) {
          processed = processed.replace(
            regex,
            `[$1](/blog/${target.slug} "${target.title}")`
          );
          linkCount++;
          break;
        }
      }
    }

    return processed;
  } catch (e) {
    console.warn("Internal linking engine fallback:", e);
    return content;
  }
}

/**
 * 💡 Generates a high-CTR in-article recommendation widget
 */
export function getTrendingStoryRecommendation(currentSlug: string): {
  title: string;
  slug: string;
  category: string;
  views: number;
} | null {
  const catalog = getAllCatalogArticles();
  const candidates = catalog.filter((c) => c.slug !== currentSlug);
  if (candidates.length === 0) return null;

  // Pick top viewed candidate
  const sorted = candidates.sort((a, b) => (b.views || 0) - (a.views || 0));
  const top = sorted[0];

  return {
    title: top.title,
    slug: top.slug,
    category: top.category.name,
    views: top.views || 4200,
  };
}
