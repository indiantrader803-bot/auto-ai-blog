import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import AdBanner from "@/components/monetization/AdBanner";
import NewsletterBanner from "@/components/monetization/NewsletterBanner";
import { Sparkles, TrendingUp, Compass, Flame, ArrowRight, Zap, Award } from "lucide-react";

export const dynamic = "force-dynamic";

// Rich fallback articles to guarantee the homepage is always full of magazine-grade content
const FALLBACK_POSTS = [
  {
    id: "post_1",
    title: "The Agentic Revolution: How Autonomous AI Swarms Are Rewriting Software Engineering",
    slug: "the-agentic-revolution-autonomous-ai-swarms",
    excerpt: "An in-depth architectural breakdown of how multi-agent LLM systems are transitioning from passive chat assistants to proactive, self-healing developer workforces.",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Futuristic digital neural network node visualization",
    readTimeMinutes: 7,
    views: 1420,
    publishedAt: new Date(),
    category: { name: "Artificial Intelligence", slug: "artificial-intelligence" },
  },
  {
    id: "post_2",
    title: "Building High-Throughput TypeScript Microservices with Next.js 14 and Edge Workers",
    slug: "building-high-throughput-typescript-microservices",
    excerpt: "Discover modern architectural blueprints for sub-10ms global latency, edge data caching, and frictionless serverless deployment.",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Computer programming code screen setup",
    readTimeMinutes: 5,
    views: 890,
    publishedAt: new Date(),
    category: { name: "Development & Engineering", slug: "development-and-engineering" },
  },
  {
    id: "post_3",
    title: "Algorithmic Market Intelligence: Leveraging Generative Models for Real-Time Sentiment",
    slug: "algorithmic-market-intelligence-generative-sentiment",
    excerpt: "How quantitative hedge funds and modern retail investors are deploying fine-tuned SLMs to parse earning transcripts, SEC filings, and macro shifts.",
    featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Stock market financial charts and analysis",
    readTimeMinutes: 6,
    views: 640,
    publishedAt: new Date(),
    category: { name: "Finance & Markets", slug: "finance-and-markets" },
  },
  {
    id: "post_4",
    title: "The Rise of Local AI: Running 70B Quantized Models Directly on Consumer Silicon",
    slug: "the-agentic-revolution-autonomous-ai-swarms",
    excerpt: "Benchmarking Ollama, llama.cpp, and vLLM across modern GPUs and Apple M-series chips for private, zero-latency inference.",
    featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Digital cyber security matrix visual",
    readTimeMinutes: 8,
    views: 1150,
    publishedAt: new Date(),
    category: { name: "Technology", slug: "technology" },
  }
];

export default async function HomePage() {
  let featuredPost: any = null;
  let recentPosts: any[] = [];
  let categories: any[] = [];
  let trendingPosts: any[] = [];

  try {
    const results = await Promise.all([
      prisma.post.findFirst({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        include: { category: true },
      }),
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        skip: 1,
        take: 6,
        include: { category: true },
      }),
      prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
        take: 6,
      }),
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { views: "desc" },
        take: 4,
        include: { category: true },
      }),
    ]);

    featuredPost = results[0];
    recentPosts = results[1] || [];
    categories = results[2] || [];
    trendingPosts = results[3] || [];
  } catch (err: any) {
    console.warn("Database notice:", err.message);
  }

  // Use fallback if database is empty or initial
  if (!featuredPost) featuredPost = FALLBACK_POSTS[0];
  if (recentPosts.length === 0) recentPosts = FALLBACK_POSTS.slice(1);
  if (trendingPosts.length === 0) trendingPosts = FALLBACK_POSTS;
  if (categories.length === 0) {
    categories = [
      { id: "1", name: "Artificial Intelligence", slug: "artificial-intelligence", _count: { posts: 12 } },
      { id: "2", name: "Development & Engineering", slug: "development-and-engineering", _count: { posts: 8 } },
      { id: "3", name: "Finance & Markets", slug: "finance-and-markets", _count: { posts: 6 } },
      { id: "4", name: "Technology", slug: "technology", _count: { posts: 10 } },
    ];
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top Header Sponsor / Ad Banner */}
        <AdBanner slot="home-top" className="mb-8" />

        {/* Hero Featured Story */}
        <section className="mb-14">
          <PostCard post={featuredPost} featured={true} />
        </section>

        {/* Category Pills Bar */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Compass className="w-4 h-4 text-indigo-600" /> Explore Topic Hubs
            </div>
            <span className="text-xs text-slate-400 font-medium">Curated daily intelligence</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-indigo-600 text-white shadow-md shadow-indigo-500/20 shrink-0"
            >
              All Stories
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="px-5 py-2.5 rounded-2xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shrink-0 flex items-center gap-2 shadow-sm"
              >
                <span>{c.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {c._count?.posts || 4}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Main Content Layout: Posts Grid + Trending Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Recent Articles Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 font-serif">
                <Zap className="w-5 h-5 text-indigo-600" /> Latest Deep Dives
              </h2>
              <span className="text-xs font-semibold text-slate-400">
                Updated in real-time
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Trending & Sidebar Monetization Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Trending Box */}
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500 mb-6">
                <Flame className="w-4 h-4" /> Most Read This Week
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-4">
                {trendingPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group pt-4 first:pt-0 block"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-indigo-600 transition-colors font-serif">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug font-serif">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                          <span>{post.category?.name || "Tech"}</span>
                          <span>•</span>
                          <span>{post.readTimeMinutes || 5} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Ad Unit */}
            <AdBanner slot="sidebar-rect" format="rectangle" />
          </aside>
        </div>

        {/* Mid-page Newsletter Capture */}
        <NewsletterBanner />
      </main>

      <Footer />
    </div>
  );
}
