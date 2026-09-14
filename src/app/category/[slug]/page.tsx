import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import SocialSidebar from "@/components/blog/SocialSidebar";
import AdBanner from "@/components/monetization/AdBanner";
import NewsletterBanner from "@/components/monetization/NewsletterBanner";
import { ChevronRight, Sparkles, Layers, Compass } from "lucide-react";
import { getAllCatalogArticles } from "@/lib/content/articles";

import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cleanSlug = decodeURIComponent(params.slug || "");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";
  const categoryTitle = cleanSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const canonicalUrl = `${siteUrl}/category/${cleanSlug}`;

  return {
    title: `${categoryTitle} Articles & Trends`,
    description: `Explore the latest high-impact breakdowns, benchmarks, and guides in ${categoryTitle}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${categoryTitle} | SmartMag Tech Chronicle`,
      description: `Explore the latest high-impact breakdowns, benchmarks, and guides in ${categoryTitle}.`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryTitle} | SmartMag Tech Chronicle`,
      description: `Explore the latest high-impact breakdowns, benchmarks, and guides in ${categoryTitle}.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const cleanSlug = decodeURIComponent(params.slug || "");
  let category: any = null;
  let allCategories: any[] = [];
  let trendingPosts: any[] = [];

  try {
    const [catData, catsData, trendingData] = await Promise.all([
      prisma.category.findUnique({
        where: { slug: cleanSlug },
        include: {
          posts: {
            where: { status: "PUBLISHED" },
            orderBy: { publishedAt: "desc" },
            include: { category: true },
          },
        },
      }),
      prisma.category.findMany({
        include: { _count: { select: { posts: true } } },
      }),
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { views: "desc" },
        take: 5,
        include: { category: true },
      }),
    ]);
    category = catData;
    allCategories = catsData || [];
    trendingPosts = trendingData || [];
  } catch (err) {
    console.warn("Category fetch error:", err);
  }

  const allCatalog = getAllCatalogArticles();

  if (!category || !category.posts || category.posts.length === 0) {
    const formattedName = cleanSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const matchingCatalogPosts = allCatalog.filter(
      (a) =>
        a.category.slug === cleanSlug ||
        a.category.name.toLowerCase().includes(cleanSlug.replace(/-/g, " ")) ||
        cleanSlug.includes(a.category.slug)
    );

    category = {
      name: category?.name || formattedName,
      slug: cleanSlug,
      description: `Comprehensive research and technical breakdowns curated in ${category?.name || formattedName}.`,
      posts: matchingCatalogPosts.length > 0 ? matchingCatalogPosts : allCatalog.slice(0, 4),
    };
  }

  if (trendingPosts.length === 0) {
    trendingPosts = allCatalog.slice().sort((a, b) => b.views - a.views);
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb (SmartMag Style) */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] font-bold">
            {category.name}
          </span>
        </nav>

        {/* Category Hero Header (SmartMag Style) */}
        <header className="mb-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-white border border-indigo-500/20 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
                <Sparkles className="w-3.5 h-3.5" /> Topic Channel
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {category.posts?.length || 0} Published Deep Dives
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
              {category.name}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {category.description ||
                `Explore our automated research briefs, real-time code benchmarks, and architectural analyses for ${category.name}.`}
            </p>
          </div>
        </header>

        <AdBanner slot="category-top" className="mb-10" />

        {/* Main Grid: Articles + SmartMag Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Posts Grid (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {category.posts && category.posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {category.posts.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
                <Compass className="w-8 h-8 text-indigo-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                  New Articles Generating Soon
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Our autonomous agent swarm scouts and generates new articles for this category on a continuous schedule.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4">
            <SocialSidebar
              trendingPosts={trendingPosts}
              recentPosts={category.posts || []}
              categories={allCategories}
            />
          </div>
        </div>

        {/* Newsletter Box */}
        <NewsletterBanner />
      </main>

      <Footer />
    </div>
  );
}
