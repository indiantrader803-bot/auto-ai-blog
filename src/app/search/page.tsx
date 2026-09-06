import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import SocialSidebar from "@/components/blog/SocialSidebar";
import { Search, ChevronRight, BookOpen } from "lucide-react";

interface Props {
  searchParams: { q?: string };
}

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || "";
  let posts: any[] = [];
  let categories: any[] = [];
  let trendingPosts: any[] = [];

  if (query.trim()) {
    try {
      const [results, cats, trending] = await Promise.all([
        prisma.post.findMany({
          where: {
            status: "PUBLISHED",
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { excerpt: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
            ],
          },
          orderBy: { publishedAt: "desc" },
          include: { category: true },
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
      posts = results || [];
      categories = cats || [];
      trendingPosts = trending || [];
    } catch (e) {
      console.warn("Search query error:", e);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-200">Search Results</span>
        </nav>

        <header className="mb-10 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Search className="w-4 h-4" /> Editorial Search Query
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white">
            Results for &quot;{query}&quot;
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            {posts.length} articles matching your criteria
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-8 space-y-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
                <BookOpen className="w-8 h-8 text-indigo-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                  No direct matches found
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try searching for broader keywords such as &quot;AI&quot;, &quot;Engineering&quot;, or explore the topic hubs.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <SocialSidebar
              trendingPosts={trendingPosts}
              recentPosts={posts}
              categories={categories}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
