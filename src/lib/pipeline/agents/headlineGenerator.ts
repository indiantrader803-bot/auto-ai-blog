/**
 * Conservative headline normalizer.
 *
 * Preserve the actual topic instead of wrapping every story in rotating
 * clickbait templates or implying tests, field experience, verified deals,
 * institutional positioning, or benchmarks the article may not contain.
 */

export interface HeadlineStyleVariant {
  style: "CURIOSITY_GAP" | "BENCHMARK_PROVING" | "INDUSTRY_SECRETS" | "DEFINITIVE_GUIDE" | "WARNING_REALITY_CHECK";
  headline: string;
  excerpt: string;
}

export function generateCatchyViralHeadline(
  rawTopic: string,
  _category: string = "Technology"
): {
  title: string;
  excerpt: string;
  angle: string;
} {
  const cleanTopic = rawTopic
    .replace(/^(Show HN|Ask HN|Tell HN):\s*/i, "")
    .replace(
      /\s*-\s*(TechCrunch|The Verge|Google Trends|Hacker News|Reuters|Economic Times|Moneycontrol|Ars Technica|WIRED|BBC News|CNN|CNBC|Bloomberg)$/i,
      ""
    )
    .trim()
    // Defensive fallback for manual callers. TopicScout rejects these inputs.
    .split(/\s*(?:;|\||\/|\+)\s*/)[0]
    .split(/\s+-\s+/)[0]
    .replace(/[\s:;,.-]+$/, "")
    .trim();

  const title = cleanTopic || "Editorial topic requires review";

  return {
    title,
    excerpt: `A focused explainer on ${title}, separating confirmed information from open questions and explaining what readers need to know.`,
    angle: `Stay focused on ${title} alone. Explain what is confirmed, cite original sources, identify uncertainty, and avoid unsupported claims or generic promotional language.`,
  };
}
