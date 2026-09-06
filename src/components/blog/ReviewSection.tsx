import Link from "next/link";
import { Star, Award, CheckCircle, ArrowRight, Zap, ShieldCheck } from "lucide-react";

interface ReviewSectionProps {
  posts: any[];
}

export default function ReviewSection({ posts }: ReviewSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              Tech Reviews &amp; Lab Benchmarks
            </h2>
            <p className="text-xs text-slate-400">Independent evaluations and rigorous real-world testing</p>
          </div>
        </div>
        <Link
          href="/category/technology"
          className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          View All Reviews <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post, idx) => {
          const score = (9.2 + idx * 0.2).toFixed(1);
          return (
            <div
              key={post.id || idx}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Score badge overlay */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-2xl bg-slate-950/90 backdrop-blur-md text-amber-400 font-black text-xs flex items-center gap-1 border border-amber-500/30 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{score} / 10</span>
                </div>
                <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider">
                  VERIFIED REVIEW
                </div>
              </div>

              <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-serif leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Editor&apos;s Choice</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1 transition-colors text-xs"
                  >
                    Read Breakdown →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
