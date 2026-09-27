import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAllCatalogArticles } from "@/lib/content/articles";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ChevronRight, Newspaper, Flame } from "lucide-react";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  title: "Blog: AI, Tech, Trading & Travel Deep-Dives | TheSmartMag",
  description:
    "Browse all TheSmartMag articles: artificial intelligence breakthroughs, algorithmic trading & prop firm analysis, software engineering, and luxury travel guides.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  robots: { index: true, follow: true },
};

interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string | null;
  publishedAt: Date | string | null;
  readTimeMinutes?: number;
  views?: number;
  category?: { name: string; slug: string } | null;
}

export default async function BlogIndexPage() {
  let posts: PostCard[] = [];

  try {
    const dbPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 48,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        readTimeMinutes: true,
        views: true,
        category: { select: { name: true, slug: true } },
      },
    });
    posts = dbPosts;
  } catch (e) {
    console.warn("Blog index DB fetch notice:", e);
  }

  if (posts.length === 0) {
    // Fallback to bundled catalog so the page is never empty
    posts = getAllCatalogArticles()
      .slice(0, 24)
      .map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        featuredImage: a.featuredImage,
        publishedAt: a.publishedAt,
        readTimeMinutes: a.readTimeMinutes,
        category: null,
      }));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TheSmartMag Blog",
    url: `${siteUrl}/blog`,
    description:
      "Deep-dive articles on AI, trading, engineering and travel from TheSmartMag.",
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: new Date(p.publishedAt || new Date()).toISOString(),
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#070c18] text-slate-900 dark:text-slate-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 dark:text-slate-300">Blog</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/10 text-teal-700 dark:text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Newspaper className="w-3.5 h-3.5" /> All Articles
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight">
            TheSmartMag Blog
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl">
            Deep-dive reports on artificial intelligence, algorithmic trading,
            software engineering and verified travel — researched and
            fact-checked by our editorial desk.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-teal-500/50 hover:shadow-lg transition-all bg-white dark:bg-[#0b1329]"
            >
              <div className="aspect-[16/9] bg-slate-950 relative overflow-hidden">
                {post.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-indigo-500/20">
                    <Newspaper className="w-8 h-8 text-teal-500/60" />
                  </div>
                )}
              </div>
              <div className="p-5 space-y-2">
                {post.category?.name && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-600 text-white">
                    {post.category.name}
                  </span>
                )}
                <h2 className="font-bold leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTimeMinutes || 6} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Flame className="w-8 h-8 mx-auto mb-3 text-slate-300" />
            <p>Articles are being published right now — check back shortly.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
