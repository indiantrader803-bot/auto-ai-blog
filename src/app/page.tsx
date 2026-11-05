import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import SmartHeroGrid from "@/components/blog/SmartHeroGrid";
import TrendingBar from "@/components/blog/TrendingBar";
import ReviewSection from "@/components/blog/ReviewSection";
import DualCategoryBento from "@/components/blog/DualCategoryBento";
import VideoShowcase from "@/components/blog/VideoShowcase";
import SocialSidebar from "@/components/blog/SocialSidebar";
import AdBanner from "@/components/monetization/AdBanner";
import NewsletterBanner from "@/components/monetization/NewsletterBanner";
import AmazonAffiliateShowcase from "@/components/monetization/AmazonAffiliateShowcase";
import MonetagBanner from "@/components/ads/MonetagBanner";
import { Sparkles, TrendingUp, Compass, Flame, ArrowRight, Zap, Award, Layers, MessageSquare } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "TheSmartMag | AI, Technology, Finance & Markets",
  description:
    "TheSmartMag covers artificial intelligence, technology, finance, markets and emerging trends with practical guides, analysis, news and insights.",
  alternates: {
    canonical: "https://thesmartmag.com",
  },
};

import { getAllCatalogArticles } from "@/lib/content/articles";

export default async function HomePage() {
  let dbPosts: any[] = [];
  let categories: any[] = [];

  try {
    const [postsData, catsData] = await Promise.all([
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 24,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          imageAlt: true,
          readTimeMinutes: true,
          views: true,
          publishedAt: true,
          category: {
            select: {
              name: true,
              slug: true,
              color: true,
            },
          },
        },
      }),
      prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
        take: 8,
      }),
    ]);
    dbPosts = postsData || [];
    categories = catsData || [];
  } catch (err: any) {
    console.warn("Database notice:", err.message);
  }

  const allCatalog = getAllCatalogArticles();

  // Combine DB posts and Catalog articles, ensuring no duplicate slugs.
  // DB posts are prioritized first: genuine published articles always appear before catalog items.
  const seenSlugs = new Set<string>();
  const dbList: any[] = [];
  const catalogList: any[] = [];

  for (const p of dbPosts) {
    if (!seenSlugs.has(p.slug)) {
      seenSlugs.add(p.slug);
      dbList.push(p);
    }
  }

  for (const c of allCatalog) {
    if (!seenSlugs.has(c.slug)) {
      seenSlugs.add(c.slug);
      catalogList.push(c);
    }
  }

  // Sort DB posts by publishedAt desc, and catalog fallback posts by publishedAt desc
  const sortedDb = dbList.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
  const sortedCatalog = catalogList.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());

  // Genuine database posts always lead, followed by backfilled catalog posts
  const displayPosts = [...sortedDb, ...sortedCatalog];

  const featuredPost = displayPosts[0];
  const subFeaturedPosts = displayPosts.slice(1, 4);
  const trendingPosts = displayPosts.slice().sort((a, b) => (b.views || 0) - (a.views || 0));
  const recentPosts = displayPosts.slice(4);

  const aiCategoryPosts = displayPosts.filter(
    (p) => p.category?.slug === "artificial-intelligence" || p.category?.name?.includes("AI")
  );
  const devCategoryPosts = displayPosts.filter(
    (p) => p.category?.slug === "development-and-engineering" || p.category?.name?.includes("Engineering")
  );

  const cat1 = {
    name: "Artificial Intelligence & LLMs",
    slug: "artificial-intelligence",
    posts: aiCategoryPosts.length > 0 ? aiCategoryPosts : displayPosts.slice(0, 4),
  };

  const cat2 = {
    name: "Software & Cloud Engineering",
    slug: "development-and-engineering",
    posts: devCategoryPosts.length > 0 ? devCategoryPosts : displayPosts.slice(2, 6),
  };

  const hotNavCategories = [
    { name: "🇮🇳 Indian Markets", slug: "indian-markets", isHot: true },
    { name: "🇺🇸 US Markets", slug: "us-markets", isHot: true },
    { name: "Forex (USD/INR)", slug: "forex-and-currencies", isHot: true },
    { name: "Commodities", slug: "commodities", isHot: true },
    { name: "AI & Tech", slug: "artificial-intelligence", isHot: true },
    { name: "Software Eng", slug: "development-and-engineering", isHot: false },
    { name: "Telecom & 5G", slug: "telecom-and-connectivity", isHot: false },
  ];

  const editorialChannels = [
    { id: "1", name: "🇮🇳 Indian Markets", slug: "indian-markets", count: displayPosts.filter(p => p.category?.slug === "indian-markets").length || 6 },
    { id: "2", name: "🇺🇸 US Markets", slug: "us-markets", count: displayPosts.filter(p => p.category?.slug === "us-markets").length || 5 },
    { id: "3", name: "Forex (USD/INR)", slug: "forex-and-currencies", count: displayPosts.filter(p => p.category?.slug === "forex-and-currencies").length || 4 },
    { id: "4", name: "Commodities (Gold/Crude)", slug: "commodities", count: displayPosts.filter(p => p.category?.slug === "commodities").length || 5 },
    { id: "5", name: "Artificial Intelligence", slug: "artificial-intelligence", count: displayPosts.filter(p => p.category?.slug === "artificial-intelligence").length || 18 },
    { id: "6", name: "Software & Cloud", slug: "development-and-engineering", count: displayPosts.filter(p => p.category?.slug === "development-and-engineering").length || 14 },
    { id: "7", name: "Telecom & 5G", slug: "telecom-and-connectivity", count: displayPosts.filter(p => p.category?.slug === "telecom-and-connectivity").length || 12 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar
        hotTopicPost={{
          title: featuredPost?.title || "Nifty 50 & Sensex Technical Outlook: FII Inflows & Key Breakout Levels",
          slug: featuredPost?.slug || "nifty-50-sensex-record-highs-fii-dii-liquidity-breakout",
        }}
        trendingCategories={hotNavCategories}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Semantic Homepage H1 */}
        <h1 className="sr-only">TheSmartMag — AI, Technology, Finance &amp; Markets</h1>

        {/* Top Sponsor / Ad Banner */}
        <AdBanner slot="home-smartmag-top" className="mb-8" />

        {/* 1. SmartMag 1+3 Magazine Hero Grid (Always Shows Top Hot Topics) */}
        <SmartHeroGrid featured={featuredPost} subFeatured={subFeaturedPosts} />

        {/* 🌟 Monetag Responsive Banner below Featured Section */}
        <div className="my-8">
          <MonetagBanner zoneId="11880195" slotType="homepage" className="w-full" />
        </div>

        {/* 2. Trending Headlines Bar */}
        <TrendingBar posts={trendingPosts} />

        {/* 3. Category Filter Hubs Navigation */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Explore Editorial Channels</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Curated 24/7 by Autonomous AI Swarm</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-indigo-600 text-white shadow-md shadow-indigo-500/20 shrink-0"
            >
              All Channels
            </Link>
            {editorialChannels.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shrink-0 flex items-center gap-2 shadow-sm"
              >
                <span>{c.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  {c.count}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 🌟 Curated AI Engines, Travel & Tech Ecosystems */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/20 pb-6 relative z-10">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Featured Tech &amp; AI Intelligence
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight">
                Curated AI Engines, Travel &amp; Tech Guides
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore our benchmarks, hardware reviews, open-weight deployment blueprints, and personalized travel guides.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <Link
                href="/best-ai-tools"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Explore AI Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/travel"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all"
              >
                <span>Travel Hub</span>
              </Link>
            </div>
          </div>

          {/* 3 Featured Tech Hub Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Best AI Tools */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-indigo-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 font-mono">2026 RANKINGS</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold uppercase">BENCHMARK</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif">Best AI Tools Guide</h3>
                <p className="text-xs text-slate-300">Claude 3.7 Sonnet, OpenAI o3, Cursor IDE, v0, and local 70B parameter open-weight workflows tested.</p>
              </div>
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-700/60">
                <Link href="/best-ai-tools" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold">Read Guide →</Link>
                <Link href="/best-ai-tools" className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px]">View All</Link>
              </div>
            </div>

            {/* Travel Guide */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 font-mono">CURATED ITINERARIES</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-bold uppercase">TRAVEL</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif">Global Travel &amp; AI Trip Planner</h3>
                <p className="text-xs text-slate-300">Personalized day-by-day travel itineraries, flight tracking, and verified destination guides.</p>
              </div>
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-700/60">
                <Link href="/travel" className="text-xs text-sky-400 hover:text-sky-300 font-bold">Explore Hub →</Link>
                <Link href="/travel" className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px]">Plan Trip</Link>
              </div>
            </div>

            {/* Store & Gadgets */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">ELECTRONICS &amp; TECH</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">STORE</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif">SmartMag Tech Store</h3>
                <p className="text-xs text-slate-300">Custom mechanical keyboards, MagSafe accessories, wireless charging docks, and tech essentials.</p>
              </div>
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-700/60">
                <Link href="/store" className="text-xs text-emerald-400 hover:text-emerald-300 font-bold">Shop Store →</Link>
                <Link href="/store" className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]">Explore</Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Main Two-Column Layout: Latest Deep Dives + SmartMag Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
                    Latest Editorial Deep Dives
                  </h2>
                  <p className="text-xs text-slate-400">Fresh journalism and technical walkthroughs</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(recentPosts.length > 0 ? recentPosts : displayPosts).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* SmartMag Sidebar (4 Cols) */}
          <div className="lg:col-span-4">
            <SocialSidebar
              trendingPosts={trendingPosts}
              recentPosts={displayPosts}
              categories={categories}
            />
          </div>
        </div>

        {/* 5. Tech Reviews & Lab Benchmarks Section */}
        <ReviewSection posts={displayPosts} />

        {/* Safe Non-Intrusive Mid-Feed Monetag Ad */}
        <MonetagBanner slotType="homepage" className="my-10" />

        {/* 5.5. Amazon Associates Curated Hardware & Developer Deals */}
        <AmazonAffiliateShowcase />

        {/* 6. Dual Category Bento Hub */}
        <DualCategoryBento category1={cat1} category2={cat2} />

        {/* 7. Video Showcase Multimedia Studio */}
        <VideoShowcase />

        {/* 7.5. AI Digital Products & Developer Toolkit Spotlight */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SmartMag Digital Store</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif">
              Enterprise Prompt Packs, Next.js Boilerplates &amp; AI Agents
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Turnkey autonomous pipelines, multi-agent frameworks, and high-converting marketing prompt libraries with instant digital delivery.
            </p>
          </div>

          <Link
            href="/store"
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all shrink-0"
          >
            <span>Explore Digital Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* 8. Full-Width Newsletter Dispatch Banner */}
        <NewsletterBanner />
      </main>

      <Footer />
    </div>
  );
}
