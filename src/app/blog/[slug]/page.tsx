import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import FaqAccordion from "@/components/blog/FaqAccordion";
import SocialShare from "@/components/blog/SocialShare";
import AdBanner from "@/components/monetization/AdBanner";
import AffiliateCard from "@/components/monetization/AffiliateCard";
import BuyMeCoffee from "@/components/monetization/BuyMeCoffee";
import NewsletterBanner from "@/components/monetization/NewsletterBanner";
import PostCard from "@/components/blog/PostCard";
import { generateStructuredSchema } from "@/lib/pipeline/seoAffiliateEngine";
import { Clock, Eye, Sparkles, ChevronRight, Video, User } from "lucide-react";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords ? post.seoKeywords.split(",") : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  // Increment view counter
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  // Fetch related posts in same category
  const relatedPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: post.categoryId,
      id: { not: post.id },
    },
    take: 3,
    include: { category: true },
  });

  // Parse FAQs
  let faqs: Array<{ question: string; answer: string }> = [];
  try {
    if (post.faqJson) faqs = JSON.parse(post.faqJson);
  } catch (e) {}

  const schemaJson = generateStructuredSchema(
    post.title,
    post.excerpt,
    post.slug,
    post.publishedAt || new Date(),
    post.featuredImage || undefined,
    faqs
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Inject Structured Data Schema for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          {post.category && (
            <>
              <Link
                href={`/category/${post.category.slug}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {post.category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
          <span className="text-slate-900 dark:text-slate-200 truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-10 space-y-6">
          {post.category && (
            <Link
              href={`/category/${post.category.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {post.category.name}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-b border-slate-200/80 dark:border-slate-800 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    AutoAI Editorial Board
                  </span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>

              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {post.views} views
              </span>
            </div>

            <SocialShare title={post.title} />
          </div>
        </header>

        {/* Featured Cover Image */}
        {post.featuredImage && (
          <figure className="max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-200 dark:border-slate-800">
            <img
              src={post.featuredImage}
              alt={post.imageAlt || post.title}
              className="w-full max-h-[520px] object-cover"
            />
            {post.imagePhotographer && (
              <figcaption className="p-3 text-right text-[11px] text-slate-400 bg-black/40 backdrop-blur-sm">
                Visual:{" "}
                {post.imagePhotographerUrl ? (
                  <a
                    href={post.imagePhotographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    {post.imagePhotographer}
                  </a>
                ) : (
                  post.imagePhotographer
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Grid Layout: Content + Sticky TOC Sidebar */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols) */}
          <article className="lg:col-span-8">
            {/* Top In-Article Ad */}
            <AdBanner slot="article-top" className="my-4" />

            {/* Markdown Body */}
            <MarkdownRenderer content={post.content} />

            {/* Embedded YouTube Video Explainer */}
            {post.youtubeVideoId && (
              <section className="my-10 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                  <Video className="w-4 h-4" /> Recommended Explainer Video
                </div>
                {post.youtubeVideoTitle && (
                  <h3 className="text-lg font-bold mb-4">{post.youtubeVideoTitle}</h3>
                )}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${post.youtubeVideoId}`}
                    title={post.youtubeVideoTitle || "YouTube video player"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              </section>
            )}

            {/* High-Converting Affiliate Recommendation Card */}
            <AffiliateCard />

            {/* Mid-Article Ad */}
            <AdBanner slot="article-mid" className="my-8" />

            {/* FAQ Section */}
            {faqs.length > 0 && <FaqAccordion faqs={faqs} />}

            {/* Tags Pill List */}
            {post.tags.length > 0 && (
              <div className="my-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                  Keywords:
                </span>
                {post.tags.map((t) => (
                  <span
                    key={t.tagId}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    #{t.tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Buy Me A Coffee Support Widget */}
            <BuyMeCoffee />
          </article>

          {/* Sticky Sidebar: Table of Contents & Sticky Ad (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <TableOfContents content={post.content} />
              <AdBanner slot="article-sidebar" format="rectangle" />
            </div>
          </aside>
        </div>

        {/* Related Posts Recommendation Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto my-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom Newsletter */}
        <div className="max-w-5xl mx-auto">
          <NewsletterBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
