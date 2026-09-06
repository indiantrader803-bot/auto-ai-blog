import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import AdBanner from "@/components/monetization/AdBanner";
import NewsletterBanner from "@/components/monetization/NewsletterBanner";
import { Sparkles, TrendingUp, Compass, Flame } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredPost, recentPosts, categories, trendingPosts] = await Promise.all([
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top Header Ad Placement */}
        <AdBanner slot="home-top" className="mb-8" />

        {/* Hero Section */}
        {featuredPost ? (
          <section className="mb-14">
            <PostCard post={featuredPost} featured={true} />
          </section>
        ) : (
          <div className="text-center py-20 bg-slate-100 dark:bg-slate-900 rounded-3xl mb-12 p-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-600 mx-auto flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Autonomous Engine Standing By
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              Your AI blog pipeline is ready to generate daily articles. Trigger your first post from the Admin Portal.
            </p>
            <Link
              href="/admin/generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md hover:bg-indigo-500 transition-all"
            >
              <Sparkles className="w-4 h-4" /> Open AI Generator Studio
            </Link>
          </div>
        )}

        {/* Category Pills Bar */}
        {categories.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              <Compass className="w-4 h-4 text-indigo-600" /> Explore Topics
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              <Link
                href="/"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm shrink-0"
              >
                All Stories
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {c.name}
                  <span className="text-[10px] opacity-60">({c._count.posts})</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Main Content Layout: Posts Grid + Trending Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Recent Articles Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" /> Latest AI Deep Dives
              </h2>
            </div>

            {recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="p-8 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-center text-sm text-slate-500">
                More articles will appear here automatically on daily schedule.
              </div>
            )}
          </div>

          {/* Trending & Sidebar Monetization Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Trending Box */}
            {trendingPosts.length > 0 && (
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500 mb-4">
                  <Flame className="w-4 h-4" /> Trending Reads
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-4">
                  {trendingPosts.map((post, idx) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group pt-4 first:pt-0 block"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-indigo-600 transition-colors">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 mt-1 block">
                            {post.views} views • {post.category?.name || "Tech"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
