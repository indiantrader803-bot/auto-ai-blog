import Link from "next/link";
import { TrendingUp, Flame, ArrowUpRight } from "lucide-react";

interface TrendingBarProps {
  posts: any[];
}

export default function TrendingBar({ posts }: TrendingBarProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-500">
          <Flame className="w-4 h-4 fill-rose-500" />
          <span>Trending Headlines Today</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Ranked by reader engagement</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.slice(0, 4).map((post, idx) => (
          <Link
            key={post.id || idx}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black font-serif text-sm flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
              0{idx + 1}
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {post.category?.name || "Intelligence"}
              </span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug font-serif mt-0.5">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                <span>{post.readTimeMinutes || 5} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
