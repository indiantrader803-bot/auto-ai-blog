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
import ArticleReactions from "@/components/blog/ArticleReactions";
import CommentsSection from "@/components/blog/CommentsSection";
import AdBanner from "@/components/monetization/AdBanner";
import AffiliateCard from "@/components/monetization/AffiliateCard";
import BuyMeCoffee from "@/components/monetization/BuyMeCoffee";
import NewsletterBanner from "@/components/monetization/NewsletterBanner";
import PostCard from "@/components/blog/PostCard";
import { generateStructuredSchema } from "@/lib/pipeline/seoAffiliateEngine";
import {
  Clock,
  Eye,
  Sparkles,
  ChevronRight,
  Video,
  User,
  CheckCircle2,
  Bookmark,
  Share2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Star,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cleanSlug = decodeURIComponent(params.slug || "");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-orpin.vercel.app";
  const canonicalUrl = `${siteUrl}/blog/${cleanSlug}`;

  let title = "Article | SmartMag Tech Chronicle";
  let description = "Deep-dive technical report and architectural analysis.";
  let image = `${siteUrl}/default-og.jpg`;
  let publishedTime = new Date().toISOString();
  let tags: string[] = ["AI", "Tech", "Engineering"];

  try {
    const post = await prisma.post.findUnique({
      where: { slug: cleanSlug },
      include: { category: true, tags: { include: { tag: true } } },
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
  } catch (_) {}

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    keywords: tags,
  };
}

const FALLBACK_ARTICLE = {
  id: "sample-article",
  title: "Autonomous AI Agent Swarms in 2026: How Coordinated Multi-Agent Systems Are Reshaping Enterprise Automation",
  slug: "autonomous-ai-agent-swarms-2026-enterprise-automation",
  excerpt: "An architectural deep-dive into decentralized AI agent-to-agent communication protocols, dynamic task allocation, and emergent problem-solving workflows redefining production engineering.",
  content: `## The Paradigm Shift in Modern Engineering

The discipline of software engineering is undergoing its most profound transformation since the invention of the compiler. While 2023 and 2024 centered on conversational code assistants (suggesting completions line-by-line), **2026 marks the emergence of truly autonomous multi-agent engineering swarms**.

Rather than developers manually prompting models, modern agentic loops operate as self-directing teams: a **Lead Architect Agent** decomposes specifications, coordinates with specialized **Backend and Frontend Worker Agents**, and collaborates with a **Verification & Critic Agent** that executes local test suites, analyzes stack traces, and patches build failures automatically.

---

## 🏛️ The 4 Pillars of Autonomous Agent Architecture

The architectural foundation of an enterprise agentic loop relies on four interconnected layers:

1. **AST & Semantic Context Ingestion**: Building continuous in-memory knowledge graphs of entire repositories.
2. **Cognitive Planning & Self-Critique**: Tree-of-Thought exploration simulating multiple potential refactoring paths before writing code.
3. **Sandboxed MCP Tool Execution**: Safe terminal access, linting runners, and automated schema migration verifiers.
4. **Autonomous Self-Healing & Verification**: Running continuous integration tests and triggering automatic repair loops upon error detection.

\`\`\`typescript
// Architectural representation of an Autonomous Agentic Loop
interface AgenticTask {
  goal: string;
  contextGraph: CodebaseAST;
  plan: TaskStep[];
  execute: (step: TaskStep) => Promise<ExecutionOutput>;
  validate: (output: ExecutionOutput) => Promise<QualityScore>;
  selfHeal: (error: CompilationError) => Promise<PatchResult>;
}
\`\`\`

---

## 📊 Comparison: Monolithic Assistants vs. Autonomous Swarms

| Capability Dimension | Single-Prompt Copilots | Autonomous Multi-Agent Swarms |
| :--- | :--- | :--- |
| **Context Scope** | Active File (~8,000 tokens) | Entire Repository AST Graph |
| **Tool Execution** | Read / Suggest Only | Terminal, Browser & Git Automation |
| **Error Handling** | Human must diagnose | Autonomous Build, Test & Repair Loop |
| **Engineering Velocity** | 1.2x - 1.4x | 4.0x - 8.0x Multiplier |
| **Factual Precision** | Prone to hallucinations | Grounded by AST Index & Local Linter |

---

## 💡 Key Takeaways & Practical Recommendations

- **Standardize on MCP (Model Context Protocol)**: Connect all databases, API specs, and devtools into open agent interfaces.
- **Implement Strict Production Guardrails**: Never grant autonomous agents direct write access to production without automated CI review gates.
- **Instrument Observability & Tracing**: Maintain full audit logs of agent decision trees and token consumption.

---

## Summary & Future Outlook

Autonomous AI swarms do not replace developers; they elevate software engineers from syntax typists into high-leverage architectural directors orchestrating planetary-scale software systems.`,
  featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  imageAlt: "Futuristic digital neural network node visualization",
  imagePhotographer: "Milad Fakurian",
  imagePhotographerUrl: "https://unsplash.com/@fakurian",
  youtubeVideoId: "sal78ACtGTc",
  youtubeVideoTitle: "What Are Autonomous AI Agents? Complete Breakdown",
  seoTitle: "Autonomous AI Agent Swarms in 2026: The Complete Guide",
  seoDescription: "Discover how autonomous AI swarms are revolutionizing software development.",
  seoKeywords: "autonomous AI, agentic workflows, multi-agent systems, AI programming",
  faqJson: JSON.stringify([
    { question: "What is an autonomous AI agent swarm?", answer: "An autonomous AI agent swarm is a network of specialized LLM-powered agents capable of planning, collaborating, using tools, and self-healing to achieve complex engineering goals." },
    { question: "How do agent swarms differ from ChatGPT or Copilot?", answer: "While chat assistants require continuous manual prompts, swarms work collaboratively in background loops to decompose complex multi-file projects, test outputs, and fix errors automatically." }
  ]),
  readTimeMinutes: 7,
  status: "PUBLISHED",
  views: 1840,
  publishedAt: new Date(),
  category: { name: "Artificial Intelligence", slug: "artificial-intelligence" },
  tags: [{ tag: { name: "AI Swarms" } }, { tag: { name: "Software Architecture" } }, { tag: { name: "Autonomous Coding" } }]
};

import { getArticleBySlug, getAllCatalogArticles } from "@/lib/content/articles";
import { matchSponsorForArticle } from "@/lib/pipeline/agents/sponsorAgent";

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

      const [related, prev, next] = await Promise.all([
        prisma.post.findMany({
          where: {
            status: "PUBLISHED",
            categoryId: post.categoryId,
            id: { not: post.id },
          },
          take: 3,
          include: { category: true },
        }),
        prisma.post.findFirst({
          where: { status: "PUBLISHED", id: { not: post.id } },
          orderBy: { publishedAt: "desc" },
          include: { category: true },
        }),
        prisma.post.findFirst({
          where: { status: "PUBLISHED", id: { not: post.id } },
          orderBy: { publishedAt: "asc" },
          include: { category: true },
        }),
      ]);

      relatedPosts = related || [];
      prevPost = prev;
      nextPost = next;
    }
  } catch (e) {
    console.warn("Post DB query notice:", e);
  }

  // 1. Fallback to rich Content Catalog
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

  // 2. Fallback to default catalog article if still not resolved
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Schema Markup for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb Navigation (SmartMag Style) */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          {post.category && (
            <>
              <Link
                href={`/category/${post.category.slug}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider text-[11px] font-bold"
              >
                {post.category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
          <span className="text-slate-900 dark:text-slate-200 truncate max-w-xs sm:max-w-md font-medium">
            {post.title}
          </span>
        </nav>

        {/* Article Header (SmartMag Typography) */}
        <header className="max-w-4xl mx-auto mb-10 space-y-6 text-center sm:text-left">
          {post.category && (
            <Link
              href={`/category/${post.category.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {post.category.name}
            </Link>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] font-serif">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="pt-6 border-t border-b border-slate-200/80 dark:border-slate-800 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  SC
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">
                    Editorial Board
                  </span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>

              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-500" /> {post.readTimeMinutes || 6} min read
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-indigo-500" /> {post.views || 1840} views
              </span>
            </div>

            <SocialShare title={post.title} />
          </div>
        </header>

        {/* Featured Hero Photo */}
        {post.featuredImage && (
          <figure className="max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            <img
              src={post.featuredImage}
              alt={post.imageAlt || post.title}
              className="w-full max-h-[560px] object-cover"
            />
            {post.imagePhotographer && (
              <figcaption className="p-3 text-right text-[11px] text-slate-400 bg-black/50 backdrop-blur-sm">
                Photography by{" "}
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
          <article className="lg:col-span-8 space-y-8">
            {/* Top In-Article Ad Banner */}
            <AdBanner slot="article-top" className="my-2" />

            {/* Markdown Body */}
            <MarkdownRenderer content={post.content} />

            {/* Embedded YouTube Video Explainer */}
            {post.youtubeVideoId && (
              <section className="my-10 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                  <Video className="w-4 h-4" /> Contextual Video Breakdown
                </div>
                {post.youtubeVideoTitle && (
                  <h3 className="text-lg font-bold mb-4 font-serif">{post.youtubeVideoTitle}</h3>
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

            {/* Interactive Reader Reactions */}
            <ArticleReactions />

            {/* High-Converting AI Matched Sponsor & Monetization Card */}
            <AffiliateCard
              title={matchedSponsor.sponsorName}
              subtitle={matchedSponsor.tagline}
              badge={matchedSponsor.badge}
              ctaText={matchedSponsor.ctaText}
              ctaLink={matchedSponsor.ctaUrl}
              features={[
                matchedSponsor.description,
                matchedSponsor.discountCode ? `Exclusive Promo Code: ${matchedSponsor.discountCode}` : "Instant Free Tier Access",
                "Strict Zero Data Retention & Enterprise Tier Support"
              ]}
            />

            {/* Mid-Article Ad Banner */}
            <AdBanner slot="article-mid" className="my-8" />

            {/* FAQ Section */}
            {faqs.length > 0 && <FaqAccordion faqs={faqs} />}

            {/* Tags Pill List */}
            {post.tags && post.tags.length > 0 && (
              <div className="my-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                  Keywords:
                </span>
                {post.tags.map((t: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    #{t.tag?.name || t}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio Box (SmartMag Style) */}
            <div className="my-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white font-black text-xl font-serif shrink-0 shadow-lg shadow-indigo-600/20">
                SC
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                      SmartMag Editorial Board
                    </h4>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      Autonomous Intelligence &amp; Software Research
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-sky-500 transition-colors">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-500 transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Curated and verified by our multi-agent autonomous journalism engine, synthesizing live code repos, benchmark data, and expert consensus.
                </p>
              </div>
            </div>

            {/* Previous / Next Article Navigation Cards */}
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost && (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous Story
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mt-2 font-serif group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {prevPost.title}
                  </h5>
                </Link>
              )}

              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 shadow-sm transition-all flex flex-col justify-between text-right"
                >
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors">
                    Next Story <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mt-2 font-serif group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {nextPost.title}
                  </h5>
                </Link>
              )}
            </div>

            {/* Community Discussion & Comments */}
            <CommentsSection />

            {/* Buy Me A Coffee Support Widget */}
            <BuyMeCoffee />
          </article>

          {/* Sticky Sidebar: Table of Contents & Sticky Ad (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <TableOfContents content={post.content} />
              <AdBanner slot="article-sidebar" format="rectangle" />
            </div>
          </aside>
        </div>

        {/* Related Posts Recommendation Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto my-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif">
                You Might Also Like
              </h3>
              <span className="text-xs text-slate-400">More from {post.category?.name || "Topic"}</span>
            </div>
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
