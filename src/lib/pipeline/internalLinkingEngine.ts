import { prisma } from "../prisma";

export async function applySmartInternalLinks(
  content: string,
  currentPostId?: string
): Promise<string> {
  try {
    const existingPosts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        ...(currentPostId ? { id: { not: currentPostId } } : {}),
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
      take: 20,
    });

    if (existingPosts.length === 0) return content;

    let processed = content;
    let linkCount = 0;

    for (const post of existingPosts) {
      if (linkCount >= 3) break; // Max 3 internal links per article for clean SEO

      // Extract core keywords from post title (minimum 4 chars)
      const words = post.title
        .split(" ")
        .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
        .filter((w) => w.length >= 5);

      if (words.length === 0) continue;

      // Match first occurrence of keyword not already inside markdown links
      for (const word of words.slice(0, 2)) {
        const regex = new RegExp(`\\b(${word})\\b(?![^\\[]*\\])`, "i");
        if (regex.test(processed) && !processed.includes(`/blog/${post.slug}`)) {
          processed = processed.replace(
            regex,
            `[$1](/blog/${post.slug} "${post.title}")`
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
