import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import AdBanner from "@/components/monetization/AdBanner";
import { ChevronRight, Sparkles } from "lucide-react";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: Props) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        include: { category: true },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-200">{category.name}</span>
        </nav>

        {/* Category Header */}
        <header className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white border border-indigo-500/20">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Topic Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-black">{category.name}</h1>
            <p className="text-sm text-indigo-200/80 leading-relaxed">
              {category.description ||
                `Explore automated daily research, deep dives, and expert tutorials curated in ${category.name}.`}
            </p>
          </div>
        </header>

        <AdBanner slot="category-top" className="mb-8" />

        {/* Posts Grid */}
        {category.posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-slate-500">
            No published articles in this category yet. New articles will generate automatically.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
