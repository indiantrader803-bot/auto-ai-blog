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
import { Sparkles, TrendingUp, Compass, Flame, ArrowRight, Zap, Award, Layers, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Rich initial magazine articles for instant high-fidelity rendering
const FALLBACK_POSTS = [
  {
    id: "post_1",
    title: "Autonomous AI Agent Swarms in 2026: How Coordinated Multi-Agent Systems Are Reshaping Enterprise Automation",
    slug: "autonomous-ai-agent-swarms-2026-enterprise-automation",
    excerpt: "An architectural deep-dive into decentralized AI agent-to-agent communication protocols, dynamic task allocation, and emergent problem-solving workflows redefining production engineering.",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Neural network artificial intelligence node visualization",
    readTimeMinutes: 7,
    views: 1840,
    publishedAt: new Date(),
    category: { name: "Artificial Intelligence", slug: "artificial-intelligence" },
  },
  {
    id: "post_2",
    title: "Building High-Throughput TypeScript Microservices with Next.js 14 and Edge Compute",
    slug: "building-high-throughput-typescript-microservices",
    excerpt: "Architectural blueprints for sub-10ms global latency, distributed edge KV caching, and frictionless serverless deployment pipelines.",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Programming code on monitors",
    readTimeMinutes: 5,
    views: 1210,
    publishedAt: new Date(),
    category: { name: "Development & Engineering", slug: "development-and-engineering" },
  },
  {
    id: "post_3",
    title: "Algorithmic Market Intelligence: Deploying Generative Models for Real-Time Macro Sentiment",
    slug: "algorithmic-market-intelligence-generative-sentiment",
    excerpt: "How quantitative funds and retail traders deploy fine-tuned SLMs to parse earning calls, SEC filings, and global liquidity trends.",
    featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Financial stock market charts",
    readTimeMinutes: 6,
    views: 940,
    publishedAt: new Date(),
    category: { name: "Finance & Markets", slug: "finance-and-markets" },
  },
  {
    id: "post_4",
    title: "The Rise of Local AI: Running 70B Quantized Models on Consumer Silicon",
    slug: "the-agentic-revolution-autonomous-ai-swarms",
    excerpt: "Benchmarking Ollama, llama.cpp, and vLLM across modern desktop GPUs and Apple M4 chips for private, zero-latency inference.",
    featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Cyber security matrix code visual",
    readTimeMinutes: 8,
    views: 1560,
    publishedAt: new Date(),
    category: { name: "Technology", slug: "technology" },
  },
  {
    id: "post_5",
    title: "Claude Sonnet 4.5 vs GPT-5: Comprehensive Coding & Long-Context Architecture Benchmark",
    slug: "claude-sonnet-vs-gpt5-comprehensive-coding-benchmark",
    excerpt: "Testing frontier reasoning models across full-stack refactors, complex SQL schema migrations, and real-time multi-agent orchestration.",
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "AI artificial intelligence conceptual art",
    readTimeMinutes: 9,
    views: 2100,
    publishedAt: new Date(),
    category: { name: "Artificial Intelligence", slug: "artificial-intelligence" },
  },
  {
    id: "post_6",
    title: "Zero-Trust Cloud Infrastructure: Hardening Kubernetes Clusters for Mission-Critical Production",
    slug: "zero-trust-cloud-infrastructure-kubernetes-hardening",
    excerpt: "Step-by-step security blueprint for mTLS service meshes, eBPF network observability, and continuous vulnerability scanning.",
    featuredImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Server cloud infrastructure server room",
    readTimeMinutes: 6,
    views: 820,
    publishedAt: new Date(),
    category: { name: "Development & Engineering", slug: "development-and-engineering" },
  }
];

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
        include: { category: true },
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

  // Combine DB posts and Catalog articles, ensuring no duplicate slugs
  const seenSlugs = new Set<string>();
  const combinedPosts: any[] = [];

  for (const p of dbPosts) {
    if (!seenSlugs.has(p.slug)) {
      seenSlugs.add(p.slug);
      combinedPosts.push(p);
    }
  }

  for (const c of allCatalog) {
    if (!seenSlugs.has(c.slug)) {
      seenSlugs.add(c.slug);
      combinedPosts.push(c);
    }
  }

  // Ensure newest published articles appear at the top hero & recent sections
  const displayPosts = combinedPosts.sort((a, b) => {
    const timeA = new Date(a.publishedAt || 0).getTime();
    const timeB = new Date(b.publishedAt || 0).getTime();
    return timeB - timeA;
  });

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
        {/* Top Sponsor / Ad Banner */}
        <AdBanner slot="home-smartmag-top" className="mb-8" />

        {/* High-Converting Interactive Hubs (AI Store & Community Live Discussion) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* 1. AI Store & Toolkits Banner */}
          <Link
            href="/store"
            className="group relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/40 border border-amber-500/30 hover:border-amber-400 transition-all shadow-sm hover:shadow-lg hover:shadow-amber-500/10 flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Digital Products
                </span>
                <span className="text-[11px] font-semibold text-amber-500">Instant Download</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                AI Coding &amp; Quant Toolkits
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                Download ready-to-run multi-agent prompts, trading indicators &amp; production templates.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* 2. Community Mastermind Banner */}
          <Link
            href="/community"
            className="group relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/40 border border-indigo-500/30 hover:border-indigo-400 transition-all shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Mastermind
                </span>
                <span className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live AI Peer Reviews
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                Community Discussion Hub
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                Ask architecture questions &amp; get instant authentic critique from our Staff AI Lead.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* 1. SmartMag 1+3 Magazine Hero Grid (Always Shows Top Hot Topics) */}
        <SmartHeroGrid featured={featuredPost} subFeatured={subFeaturedPosts} />

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

        {/* 🌟 PropFlow 2026 Prop Trading Leaderboard & Live Calculator Showcase */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/30">
                  2026 Verified Prop Firm Directory
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  ★ Exclusive Partner Discount Codes Active
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
                Best Prop Trading Firms &amp; Instant Fee Savings
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Compare evaluation rules, zero time limit scaling programs, and calculate your exact 90% monthly payout with partner promo codes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <Link
                href="/tools"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Calculate Fee Savings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/best-prop-firms"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all"
              >
                <span>Full Leaderboard</span>
              </Link>
            </div>
          </div>

          {/* 3 Featured Prop Firm Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* FTM */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-indigo-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 font-mono">CODE: arnab</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">10% OFF</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif">Funded Trader Markets</h3>
                <p className="text-xs text-slate-300">Zero time limits on challenge phases, up to 90% profit split, and on-demand bi-weekly payouts.</p>
              </div>
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-700/60">
                <Link href="/reviews/funded-trader-markets" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold">Read Audit →</Link>
                <a href="https://fundedtradermarkets.com/ref/arnab" target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[11px]">Claim Deal</a>
              </div>
            </div>

            {/* Atlas Funded */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">CODE: 12275</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">20% OFF</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif">Atlas Funded</h3>
                <p className="text-xs text-slate-300">TradeLocker execution with instant pass tokens ($5 FTPs) and rapid scaling up to $300,000.</p>
              </div>
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-700/60">
                <Link href="/reviews/atlas-funded" className="text-xs text-emerald-400 hover:text-emerald-300 font-bold">Read Audit →</Link>
                <a href="https://affiliates.atlasfunded.com/Tracking/click/?affid=12275&campaign=11320&product_id=1&t_type=Register&t_lang=EN" target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[11px]">Claim Deal</a>
              </div>
            </div>

            {/* AquaFunded */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 font-mono">CODE: 6e9</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold uppercase">20% REBATE</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif">AquaFunded</h3>
                <p className="text-xs text-slate-300">1-Step rapid evaluation, fastest 14-day initial payout cycle, and 90% profit split guarantee.</p>
              </div>
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-700/60">
                <Link href="/reviews/aquafunded" className="text-xs text-cyan-400 hover:text-cyan-300 font-bold">Read Audit →</Link>
                <a href="https://www.aquafunded.com/?afmc=6e9" target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-[11px]">Claim Deal</a>
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

        {/* 5.5. Amazon Associates Curated Hardware & Developer Deals */}
        <AmazonAffiliateShowcase />

        {/* 6. Dual Category Bento Hub */}
        <DualCategoryBento category1={cat1} category2={cat2} />

        {/* 7. Video Showcase Multimedia Studio */}
        <VideoShowcase />

        {/* 8. Full-Width Newsletter Dispatch Banner */}
        <NewsletterBanner />
      </main>

      <Footer />
    </div>
  );
}
