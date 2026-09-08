import Link from "next/link";
import { Clock, Eye, ArrowUpRight, Sparkles, User, Flame, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: string | null;
    imageAlt?: string | null;
    readTimeMinutes?: number;
    views?: number;
    publishedAt?: Date | string | null;
    category?: {
      name: string;
      slug: string;
      color?: string;
    } | null;
  };
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const imageUrl =
    post.featuredImage ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80";

  const rawViews = post.views || 2400;
  const formattedViews = rawViews >= 1000
    ? `${(rawViews / 1000).toFixed(1)}k`
    : `${rawViews}`;

  const isTrending = rawViews >= 2800;

  if (featured) {
    return (
      <article className="group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Cover Photo Area */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[380px] overflow-hidden bg-slate-950">
          <img
            src={imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
          
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Featured Cover Story
            </span>
            {isTrending && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-lg flex items-center gap-1 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 fill-current" /> High Velocity
              </span>
            )}
          </div>
        </div>

        {/* Story Details */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {post.category && (
                <Link
                  href={`/category/${post.category.slug}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
                >
                  {post.category.name}
                </Link>
              )}
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-[1.2] font-serif">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          </div>

          {/* Card Footer */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Editorial Team
                </span>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTimeMinutes || 6} min read
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold">
                    <Flame className="w-3 h-3 fill-current" /> {formattedViews} readers
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 shadow-md transition-all group-hover:gap-2"
            >
              Read Story <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-indigo-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Thumbnail */}
        <div className="relative h-52 overflow-hidden bg-slate-950">
          <img
            src={imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {post.category && (
              <Link
                href={`/category/${post.category.slug}`}
                className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white hover:bg-indigo-600 transition-colors"
              >
                {post.category.name}
              </Link>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/85 backdrop-blur-md text-amber-300 flex items-center gap-1 border border-slate-700/50 shadow-sm">
              <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{formattedViews}</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTimeMinutes || 5} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="w-3 h-3" /> {formattedViews} reads
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug font-serif">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/60">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-500" /> Editorial Verified
        </span>

        <Link
          href={`/blog/${post.slug}`}
          className="font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 hover:text-indigo-500"
        >
          Read Article <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
