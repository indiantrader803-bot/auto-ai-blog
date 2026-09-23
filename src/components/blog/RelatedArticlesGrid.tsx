"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface RelatedPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string | null;
  readTimeMinutes?: number | null;
  publishedAt?: Date | string | null;
  category?: {
    name: string;
    slug: string;
    color?: string | null;
  } | null;
}

interface RelatedArticlesGridProps {
  posts: RelatedPostItem[];
  currentCategoryName?: string;
}

export default function RelatedArticlesGrid({
  posts,
  currentCategoryName,
}: RelatedArticlesGridProps) {
  if (!posts || posts.length === 0) return null;

  const fallbackImages = [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <section className="my-16 pt-10 border-t border-slate-200 dark:border-slate-800/80">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-serif">
          Related Articles
        </h3>
        <Link
          href={`/category/${currentCategoryName ? currentCategoryName.toLowerCase().replace(/\s+/g, "-") : "technology"}`}
          className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors inline-flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((item, idx) => {
          const imgUrl = item.featuredImage || fallbackImages[idx % fallbackImages.length];
          const catName = item.category?.name || "INSIGHTS";

          return (
            <Link
              key={item.id || item.slug}
              href={`/blog/${item.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white/60 dark:bg-[#0b1329]/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-teal-500/40 dark:hover:border-teal-500/40 shadow-sm hover:shadow-md transition-all p-3"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 mb-3">
                <Image
                  src={imgUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Pill Overlay */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-600/90 text-white backdrop-blur-sm shadow-sm">
                    {catName}
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 font-serif group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                  {item.title}
                </h4>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{formatDate(item.publishedAt || new Date())}</span>
                  <span>•</span>
                  <span>{item.readTimeMinutes || 6} min read</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
