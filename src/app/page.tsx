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
import { Sparkles, TrendingUp, Compass, Flame, ArrowRight, Zap, Award, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  let allPosts: any[] = [];
  let categories: any[] = [];

  try {
    const [postsData, catsData] = await Promise.all([
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 16,
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
    allPosts = postsData || [];
    categories = catsData || [];
  } catch (err: any) {
    console.warn("Database notice:", err.message);
  }

  // Use fallback if database is newly initialized
  const displayPosts = allPosts.length > 0 ? allPosts : FALLBACK_POSTS;
  const featuredPost = displayPosts[0] || FALLBACK_POSTS[0];
  const subFeaturedPosts = displayPosts.slice(1, 4).length > 0 ? displayPosts.slice(1, 4) : FALLBACK_POSTS.slice(1, 4);
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

  if (categories.length === 0) {
    categories = [
      { id: "1", name: "Artificial Intelligence", slug: "artificial-intelligence", _count: { posts: 14 } },
      { id: "2", name: "Development & Engineering", slug: "development-and-engineering", _count: { posts: 10 } },
      { id: "3", name: "Finance & Markets", slug: "finance-and-markets", _count: { posts: 8 } },
      { id: "4", name: "Technology & Gadgets", slug: "technology", _count: { posts: 12 } },
    ];
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top Sponsor / Ad Banner */}
        <AdBanner slot="home-smartmag-top" className="mb-8" />

        {/* 1. SmartMag 1+3 Magazine Hero Grid */}
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
            <span className="text-xs text-slate-400 font-medium">Curated daily</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-indigo-600 text-white shadow-md shadow-indigo-500/20 shrink-0"
            >
              All Channels
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shrink-0 flex items-center gap-2 shadow-sm"
              >
                <span>{c.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  {c._count?.posts || 6}
                </span>
              </Link>
            ))}
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
