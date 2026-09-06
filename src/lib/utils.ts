import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SEO_STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with",
  "by", "about", "against", "between", "into", "through", "during", "before",
  "after", "above", "below", "from", "up", "down", "is", "are", "was", "were",
  "be", "been", "being", "have", "has", "had", "do", "does", "did", "of", "off"
]);

export function generateSlug(text: string): string {
  if (!text) return "post-" + Date.now().toString().slice(-4);

  // 1. Clean and normalize
  const clean = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim();

  // 2. Filter out stop words if string is long to keep URL keyword-dense
  const words = clean.split(/\s+/).filter(Boolean);
  let filteredWords = words;
  if (words.length > 5) {
    const withoutStopWords = words.filter((w) => !SEO_STOP_WORDS.has(w));
    if (withoutStopWords.length >= 3) {
      filteredWords = withoutStopWords;
    }
  }

  // 3. Take max 6-8 core keyword words (under 65 chars)
  let result = filteredWords.slice(0, 7).join("-");
  if (result.length > 60) {
    result = result.slice(0, 60).replace(/-[^-]*$/, "");
  }

  return slugify(result || text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function generateSeoSlug(text: string): string {
  return generateSlug(text);
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 220;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "Recently";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || "";
  return text.slice(0, maxLength).trim() + "...";
}
