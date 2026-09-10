import Link from "next/link";
import { Cpu, Code2, ArrowRight } from "lucide-react";
import ArticleImage from "./ArticleImage";

interface DualCategoryBentoProps {
  category1: {
    name: string;
    slug: string;
    posts: any[];
  };
  category2: {
    name: string;
    slug: string;
    posts: any[];
  };
}

export default function DualCategoryBento({ category1, category2 }: DualCategoryBentoProps) {
  const renderCategoryBlock = (
    cat: { name: string; slug: string; posts: any[] },
    icon: React.ReactNode,
    accentColor: string
  ) => {
    if (!cat.posts || cat.posts.length === 0) return null;
    const heroPost = cat.posts[0];
    const subPosts = cat.posts.slice(1, 4);

    return (
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${accentColor}`}>
              {icon}
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white font-serif uppercase tracking-wider">
              {cat.name}
            </h3>
          </div>
          <Link
            href={`/category/${cat.slug}`}
            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Hero Card */}
        {heroPost && (
          <div className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900">
            <ArticleImage
              src={heroPost.featuredImage}
              alt={heroPost.imageAlt || heroPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
              <h4 className="text-sm sm:text-base font-bold text-white font-serif leading-snug line-clamp-2">
                <Link href={`/blog/${heroPost.slug}`} className="hover:text-indigo-200 transition-colors">
                  {heroPost.title}
                </Link>
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-2 font-medium">
                <span>{heroPost.readTimeMinutes || 5} min read</span>
              </div>
            </div>
          </div>
        )}

        {/* Sub Posts List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 space-y-3">
          {subPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group pt-3 first:pt-0 flex items-start gap-3.5 block"
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200/50 dark:border-slate-700/50 group-hover:scale-105 transition-transform"
                />
              )}
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug font-serif">
                  {post.title}
                </h5>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {post.readTimeMinutes || 4} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
      {renderCategoryBlock(
        category1,
        <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        "bg-indigo-50 dark:bg-indigo-950/60"
      )}
      {renderCategoryBlock(
        category2,
        <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
        "bg-purple-50 dark:bg-purple-950/60"
      )}
    </section>
  );
}
