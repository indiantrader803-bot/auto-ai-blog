import Link from "next/link";
import { Clock, Eye, Sparkles, TrendingUp, Bookmark, Star } from "lucide-react";

interface SmartHeroGridProps {
  featured: any;
  subFeatured: any[];
}

export default function SmartHeroGrid({ featured, subFeatured }: SmartHeroGridProps) {
  if (!featured) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-14">
      {/* Main Large Hero Card (8 Cols) */}
      <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group min-h-[460px] sm:min-h-[540px] flex flex-col justify-end p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl bg-slate-900">
        {featured.featuredImage && (
          <img
            src={featured.featuredImage}
            alt={featured.imageAlt || featured.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.82] dark:brightness-[0.72]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <Link
            href={`/category/${featured.category?.slug || "technology"}`}
            className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
          >
            {featured.category?.name || "Featured Story"}
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 font-bold text-xs flex items-center gap-1 border border-slate-700/50">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> Editor&apos;s Pick
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-3.5 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-serif tracking-tight drop-shadow-md">
            <Link
              href={`/blog/${featured.slug}`}
              className="hover:text-indigo-200 transition-colors"
            >
              {featured.title}
            </Link>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed font-sans max-w-2xl text-slate-300">
            {featured.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[11px] font-bold border border-white/20">
                SC
              </div>
              <span className="text-white font-semibold">Editorial Team</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{featured.readTimeMinutes || 6} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Stacked Sub-Featured Cards (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {subFeatured.slice(0, 3).map((post, idx) => (
          <div
            key={post.id || idx}
            className="relative rounded-3xl overflow-hidden group p-5 flex flex-col justify-end min-h-[160px] sm:min-h-[170px] border border-slate-200/80 dark:border-slate-800 shadow-md bg-slate-900 flex-1"
          >
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.78] dark:brightness-[0.68]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

            <div className="relative z-10 space-y-2">
              <Link
                href={`/category/${post.category?.slug || "tech"}`}
                className="inline-block px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider hover:bg-indigo-600 transition-colors"
              >
                {post.category?.name || "Tech Trends"}
              </Link>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug font-serif">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-indigo-300 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                <span>{post.readTimeMinutes || 5} min read</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
