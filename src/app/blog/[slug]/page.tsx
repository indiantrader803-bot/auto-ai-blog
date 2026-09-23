import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import FaqAccordion from "@/components/blog/FaqAccordion";
import ArticleAudioPlayer from "@/components/blog/ArticleAudioPlayer";
import CommentsSection from "@/components/blog/CommentsSection";
import AdBanner from "@/components/monetization/AdBanner";
import AffiliateCard from "@/components/monetization/AffiliateCard";
import ArticleImage from "@/components/blog/ArticleImage";
import ArticleTracker from "@/components/blog/ArticleTracker";
import FloatingShareDock from "@/components/blog/FloatingShareDock";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import NextStoryFlyout from "@/components/blog/NextStoryFlyout";
import FloatingDealStickyBar from "@/components/growth/FloatingDealStickyBar";
import FactCheckedBadge from "@/components/blog/FactCheckedBadge";
import InstantSavingsChip from "@/components/blog/InstantSavingsChip";
import ArticleSidebarWidgets from "@/components/blog/ArticleSidebarWidgets";
import AiQuickSummary from "@/components/blog/AiQuickSummary";
import ArticleHeroActions from "@/components/blog/ArticleHeroActions";
import RelatedArticlesGrid from "@/components/blog/RelatedArticlesGrid";
import KeyInsightBox from "@/components/blog/KeyInsightBox";
import { getArticleBySlug, getAllCatalogArticles } from "@/lib/content/articles";
import { matchSponsorForArticle } from "@/lib/pipeline/agents/sponsorAgent";
import { generateStructuredSchema } from "@/lib/pipeline/seoAffiliateEngine";
import {
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  Video,
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cleanSlug = decodeURIComponent(params.slug || "");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";
  const canonicalUrl = `${siteUrl}/blog/${cleanSlug}`;

  let title = "Article | TheSmartMag";
  let description = "Deep-dive technical report and architectural analysis.";
  let image = `${siteUrl}/default-og.jpg`;
  let publishedTime = new Date().toISOString();
  let tags: string[] = ["AI", "Tech", "Engineering"];

  try {
    const post = await prisma.post.findUnique({
      where: { slug: cleanSlug },
      select: {
        title: true,
        seoTitle: true,
        excerpt: true,
        seoDescription: true,
        featuredImage: true,
        publishedAt: true,
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (post) {
      title = post.seoTitle || post.title;
      description = post.seoDescription || post.excerpt;
      image = post.featuredImage || image;
      publishedTime = (post.publishedAt || new Date()).toISOString();
      tags = post.tags.map((t) => t.tag.name);
    } else {
      const catalog = getArticleBySlug(cleanSlug);
      if (catalog) {
        title = catalog.seoTitle || catalog.title;
        description = catalog.seoDescription || catalog.excerpt;
        image = catalog.featuredImage || image;
        publishedTime = new Date(catalog.publishedAt).toISOString();
        tags = catalog.tags;
      }
    }
  } catch (e) {
    console.warn("Metadata fetch error:", e);
  }

  return {
    title: `${title} | TheSmartMag`,
    description,
    keywords: tags.join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "TheSmartMag",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
      publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@TheSmartMag",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const cleanSlug = decodeURIComponent(params.slug || "");
  let post: any = null;
  let relatedPosts: any[] = [];
  let prevPost: any = null;
  let nextPost: any = null;

  try {
    post = await prisma.post.findUnique({
      where: { slug: cleanSlug },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (post) {
      await prisma.post.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      }).catch(() => {});

      const postProjection = {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        imageAlt: true,
        readTimeMinutes: true,
        views: true,
        publishedAt: true,
        category: {
          select: {
            name: true,
            slug: true,
            color: true,
          },
        },
      };

      const [related, prev, next] = await Promise.all([
        prisma.post.findMany({
          where: {
            status: "PUBLISHED",
            categoryId: post.categoryId,
            id: { not: post.id },
          },
          take: 3,
          select: postProjection,
        }),
        prisma.post.findFirst({
          where: { status: "PUBLISHED", id: { not: post.id } },
          orderBy: { publishedAt: "desc" },
          select: postProjection,
        }),
        prisma.post.findFirst({
          where: { status: "PUBLISHED", id: { not: post.id } },
          orderBy: { publishedAt: "asc" },
          select: postProjection,
        }),
      ]);

      relatedPosts = related || [];
      prevPost = prev;
      nextPost = next;
    }
  } catch (e) {
    console.warn("Post DB query notice:", e);
  }

  // Fallback to content catalog
  if (!post) {
    const catalogItem = getArticleBySlug(cleanSlug);
    if (catalogItem) {
      post = {
        ...catalogItem,
        publishedAt: new Date(catalogItem.publishedAt),
        tags: catalogItem.tags.map((t) => ({ tag: { name: t } })),
        faqJson: JSON.stringify(catalogItem.faqs),
      };
    }
  }

  // Fallback to first catalog article if not found
  if (!post) {
    const fallback = getAllCatalogArticles()[0];
    post = {
      ...fallback,
      slug: cleanSlug,
      title: cleanSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      publishedAt: new Date(),
      tags: fallback.tags.map((t) => ({ tag: { name: t } })),
      faqJson: JSON.stringify(fallback.faqs),
    };
  }

  const allCatalog = getAllCatalogArticles();
  if (relatedPosts.length === 0) {
    relatedPosts = allCatalog.filter((a) => a.slug !== post.slug).slice(0, 3);
  }
  if (!prevPost && allCatalog.length > 1) {
    prevPost = allCatalog.find((a) => a.slug !== post.slug);
  }
  if (!nextPost && allCatalog.length > 2) {
    nextPost = allCatalog.slice().reverse().find((a) => a.slug !== post.slug);
  }

  const matchedSponsor = matchSponsorForArticle(
    post.title,
    post.category?.name || "Technology",
    Array.isArray(post.tags) ? post.tags.map((t: any) => t.tag?.name || t) : []
  );

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

  const heroImageSrc =
    post.featuredImage ||
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#070c18] text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Schema Markup for Googlebot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      {/* Reading Progress & Telemetry */}
      <ReadingProgressBar />
      <ArticleTracker slug={post.slug} title={post.title} />
      <FloatingShareDock title={post.title} slug={post.slug} />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6 overflow-hidden">
          <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/blog" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors shrink-0">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          {post.category && (
            <>
              <Link
                href={`/category/${post.category.slug}`}
                className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors uppercase tracking-wider text-[11px] font-semibold shrink-0"
              >
                {post.category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </>
          )}
          <span className="text-slate-700 dark:text-slate-300 truncate font-normal">
            {post.title}
          </span>
        </nav>

        {/* 🌟 Split 2-Column Hero Header (Matching Mockup) */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Category, Title, Excerpt, Metadata & Actions */}
          <div className="lg:col-span-7 space-y-4">
            {post.category && (
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-600 dark:bg-teal-500 text-white shadow-sm">
                  {post.category.name}
                </span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.16] font-serif">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Meta Row & Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>{formatDate(post.publishedAt)}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>{post.readTimeMinutes || 6} min read</span>
                </span>
              </div>

              {/* Action Buttons: Bookmark, Copy, Share */}
              <ArticleHeroActions title={post.title} slug={post.slug} />
            </div>
          </div>

          {/* Right Column: Hero Graphic / Featured Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800/80 aspect-[16/11] bg-slate-950">
              <ArticleImage
                src={heroImageSrc}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </header>

        {/* 📐 Main Grid Layout: Left Sticky Sidebar (4 cols) + Right Content (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sticky Sidebar (Matching Mockup) */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <ArticleSidebarWidgets
                content={post.content || ""}
                categorySlug={post.category?.slug}
              />
              <AdBanner slot="article-sidebar" format="rectangle" />
            </div>
          </aside>

          {/* Right Main Article Body (Matching Mockup) */}
          <article className="lg:col-span-8 order-1 lg:order-2 space-y-8 min-w-0">
            {/* 1. AI Quick Summary Box with Audio & Translate buttons */}
            <AiQuickSummary
              title={post.title}
              excerpt={post.excerpt}
              category={post.category?.name}
            />

            {/* Embedded Audio Player */}
            <div id="article-audio-player">
              <ArticleAudioPlayer title={post.title} content={post.content} />
            </div>

            {/* Top In-Article Ad Slot */}
            <AdBanner slot="article-top" className="my-2" />

            {/* Fact-Checked Quality Seal */}
            <FactCheckedBadge category={post.category?.name} authorName="SmartMag Editorial Board" />

            {/* 2. Main Markdown Article Content */}
            <div id="article-body">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* 3. Key Insight Highlight Callout */}
            <KeyInsightBox
              title="Key Insight"
              insight={`${post.title} represents a structural shift in modern execution paradigms. Strategic success hinges on timing, regulatory resilience, and foundational adoption.`}
            />

            {/* Contextual Savings & Promo Chip */}
            <InstantSavingsChip category={post.category?.name} />

            {/* Embedded Video (if present) */}
            {post.youtubeVideoId && (
              <section className="my-8 p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                    <Video className="w-4 h-4" /> Featured Video Workshop
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/30">
                    Verified
                  </span>
                </div>
                {post.youtubeVideoTitle && (
                  <h3 className="text-base font-bold mb-3 font-serif text-white">{post.youtubeVideoTitle}</h3>
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

            {/* Matched Sponsor / Affiliate Card */}
            <AffiliateCard
              title={matchedSponsor.sponsorName}
              subtitle={matchedSponsor.tagline}
              badge={matchedSponsor.badge}
              ctaText={matchedSponsor.ctaText}
              ctaLink={matchedSponsor.ctaUrl}
              slug={post.slug}
              features={[
                matchedSponsor.description,
                matchedSponsor.discountCode ? `Exclusive Promo Code: ${matchedSponsor.discountCode}` : "Instant Free Tier Access",
                "Strict Zero Data Retention & Enterprise Tier Support",
              ]}
            />

            {/* Mid-Article Ad Slot */}
            <AdBanner slot="article-mid" className="my-8" />

            {/* 4. Frequently Asked Questions Accordion */}
            <FaqAccordion faqs={faqs} topicTitle={post.title} />

            {/* 5. Article Tags Row */}
            {post.tags && post.tags.length > 0 && (
              <div className="my-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
                  Tags:
                </span>
                {post.tags.map((t: any, idx: number) => {
                  const tagName = t.tag?.name || t;
                  return (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {tagName}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Editorial Team Card */}
            <div className="my-8 p-6 rounded-2xl bg-slate-50 dark:bg-[#0b1329]/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-600 flex items-center justify-center text-white font-black text-lg font-serif shrink-0 shadow-md shadow-teal-500/20">
                SC
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                    SmartMag Editorial Newsroom
                  </h4>
                  <span className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Researched and fact-checked by our multidisciplinary engineering desk.
                </p>
              </div>
            </div>

            {/* Community Comments */}
            <CommentsSection
              articleTitle={post.title}
              articleSlug={cleanSlug}
              articleExcerpt={post.excerpt}
            />
          </article>
        </div>

        {/* 6. Related Articles Section (Matching Mockup 3-Card Grid) */}
        <RelatedArticlesGrid
          posts={relatedPosts}
          currentCategoryName={post.category?.name}
        />
      </main>

      {/* Flyout & Bottom Stickies */}
      <NextStoryFlyout nextPost={nextPost || relatedPosts[0] || null} />
      <FloatingDealStickyBar
        categorySlug={post?.category?.slug}
        articleTitle={post?.title}
      />

      <Footer />
    </div>
  );
}
