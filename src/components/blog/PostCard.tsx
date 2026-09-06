import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Sparkles, ArrowUpRight } from "lucide-react";
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

  if (featured) {
    return (
      <article className="group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden bg-slate-950">
          <img
            src={imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Featured Daily
          </span>
        </div>

        <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {post.category && (
                <Link
                  href={`/category/${post.category.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {post.category.name}
                </Link>
              )}
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTimeMinutes || 5} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {post.views || 0} views
              </span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
            >
              Read Full Article <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-indigo-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-48 overflow-hidden bg-slate-950">
          <img
            src={imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {post.category && (
            <Link
              href={`/category/${post.category.slug}`}
              className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white hover:bg-indigo-600 transition-colors"
            >
              {post.category.name}
            </Link>
          )}
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTimeMinutes || 5} min read
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/50">
        <span className="text-slate-500 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" /> {post.views || 0}
        </span>
        <Link
          href={`/blog/${post.slug}`}
          className="font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
        >
          Read <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
