import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAuthenticCommunityReply } from "@/lib/pipeline/agents/communityDiscussionAgent";

export const dynamic = "force-dynamic";

/**
 * Generate unique, article-specific seeded comments based on topic/slug
 */
function getArticleSpecificSeedComments(title: string, slug: string) {
  const lower = (title + " " + slug).toLowerCase();

  if (lower.includes("telecom") || lower.includes("airtel") || lower.includes("5g") || lower.includes("starlink")) {
    return [
      {
        id: "c_seed_tel_1",
        author: "Devendra Rao",
        avatarBg: "from-blue-500 to-indigo-600",
        date: "3 hours ago",
        role: "Telecom Infrastructure Architect",
        content: "The analysis on 5G Standalone core slicing vs Non-Standalone architecture is spot on. In Tier-2 Indian circles, backhaul microwave bandwidth is still the real hurdle for sub-10ms latency.",
      },
      {
        id: "c_seed_tel_reply",
        author: "Marcus Vance",
        avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
        date: "2 hours ago",
        role: "Staff Systems Lead & AI Editor",
        isAiResponse: true,
        replyTo: "Devendra Rao",
        content: "Spot on observation, Devendra. Microwave backhaul saturation is precisely why fiber-to-the-tower (FTTT) ratios in rural clusters need to cross 70% before gigabit edge services can scale without jitter.",
      },
      {
        id: "c_seed_tel_2",
        author: "Siddharth Menon",
        avatarBg: "from-purple-500 to-pink-600",
        date: "6 hours ago",
        role: "Network Operations Lead",
        content: "How will Starlink's satellite spectrum allocation impact OneWeb's commercial enterprise contracts in India throughout 2026?",
      },
      {
        id: "c_seed_tel_2_reply",
        author: "Marcus Vance",
        avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
        date: "4 hours ago",
        role: "Staff Systems Lead & AI Editor",
        isAiResponse: true,
        replyTo: "Siddharth Menon",
        content: "Great strategic question, Siddharth. While Starlink focuses primarily on consumer and maritime broadband, OneWeb/Airtel holds the enterprise advantage with existing fiber ground-stations. If you're designing hybrid backhaul architectures, prioritizing dual-redundant routing between LEO constellations and terrestrial SDN gateways is the optimal enterprise playbook.",
      },
    ];
  }

  if (lower.includes("nifty") || lower.includes("sensex") || lower.includes("market") || lower.includes("stock") || lower.includes("prop") || lower.includes("futures") || lower.includes("trade")) {
    return [
      {
        id: "c_seed_mkt_1",
        author: "Rohan Kapoor",
        avatarBg: "from-emerald-500 to-teal-600",
        date: "1 hour ago",
        role: "Quantitative Trader (CME / NSE)",
        content: "The breakdown of liquidity sweeps around the weekly highs is extremely accurate. Pairing this with order book volume profile gives a much clearer edge than standard RSI indicators.",
      },
      {
        id: "c_seed_mkt_reply",
        author: "Marcus Vance",
        avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
        date: "45 mins ago",
        role: "Staff Systems Lead & AI Editor",
        isAiResponse: true,
        replyTo: "Rohan Kapoor",
        content: "Glad it resonated, Rohan. Delta volume divergence near supply zones consistently invalidates false breakouts before the retail stop-losses get triggered. Great point on volume profiling!",
      },
      {
        id: "c_seed_mkt_2",
        author: "Ananya Deshmukh",
        avatarBg: "from-amber-500 to-orange-600",
        date: "4 hours ago",
        role: "Derivatives Analyst",
        content: "What maximum drawdown parameters do you recommend when backtesting this strategy across high-volatility FOMC days?",
      },
      {
        id: "c_seed_mkt_2_reply",
        author: "Marcus Vance",
        avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
        date: "3 hours ago",
        role: "Staff Systems Lead & AI Editor",
        isAiResponse: true,
        replyTo: "Ananya Deshmukh",
        content: "Crucial question for surviving high-vol events, Ananya. We cap maximum intraday trailing drawdown at 1.5% of total capital during FOMC sessions and enforce a 5-minute pre/post event execution freeze. If backtesting, always model slippage at 2.5x normal spreads—it will save your account from unexpected execution drag.",
      },
    ];
  }

  if (lower.includes("ai") || lower.includes("agent") || lower.includes("model") || lower.includes("deepseek") || lower.includes("claude") || lower.includes("swarm")) {
    return [
      {
        id: "c_seed_ai_1",
        author: "Vikram Malhotra",
        avatarBg: "from-indigo-500 to-violet-600",
        date: "2 hours ago",
        role: "MLOps Engineer",
        content: "The multi-agent consensus telemetry matches our production benchmarks. Decentralized router arbitration completely outclasses monolithic context chaining for multi-step code refactoring.",
      },
      {
        id: "c_seed_ai_reply",
        author: "Marcus Vance",
        avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
        date: "1 hour ago",
        role: "Staff Systems Lead & AI Editor",
        isAiResponse: true,
        replyTo: "Vikram Malhotra",
        content: "Spot on, Vikram. By breaking the prompt graph into sandboxed subagents with individual verification loops, we achieved a 68% reduction in hallucination errors under production loads.",
      },
      {
        id: "c_seed_ai_2",
        author: "Kavita Nair",
        avatarBg: "from-cyan-500 to-blue-600",
        date: "5 hours ago",
        role: "Full-Stack AI Developer",
        content: "Are there any open-source benchmarks comparing local Ollama function-calling latencies vs cloud API endpoints for this architecture?",
      },
      {
        id: "c_seed_ai_2_reply",
        author: "Marcus Vance",
        avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
        date: "3 hours ago",
        role: "Staff Systems Lead & AI Editor",
        isAiResponse: true,
        replyTo: "Kavita Nair",
        content: "Great question, Kavita! In our local benchmarks on Apple M4 Max (64GB) using Ollama with Qwen2.5-Coder-32B (Q4_K_M), cold function-calling latency averaged 420ms vs ~180ms on Claude 3.5 Sonnet / Gemini 1.5 Flash via cloud. However, for zero-egress data privacy and offline agent loops, local Ollama is undefeated. A great optimization trick is pinning the model in GPU memory with OLLAMA_KEEP_ALIVE=-1 to eliminate model reloading latency!",
      },
    ];
  }

  // General technology default
  return [
    {
      id: "c_seed_gen_1",
      author: "Aditya Roy",
      avatarBg: "from-blue-500 to-indigo-600",
      date: "3 hours ago",
      role: "Senior Software Architect",
      content: `Excellent comprehensive breakdown of "${title}". The practical architecture decisions and real-world benchmark tables clarify the exact tradeoffs needed for enterprise scale.`,
    },
    {
      id: "c_seed_gen_reply",
      author: "Marcus Vance",
      avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
      date: "2 hours ago",
      role: "Staff Systems Lead & AI Editor",
      isAiResponse: true,
      replyTo: "Aditya Roy",
      content: "Thank you, Aditya! The goal was to provide a pragmatic roadmap that cuts through marketing hype and focuses on reproducible benchmarks in production environments.",
    },
  ];
}

/**
 * GET: Fetch comments for a specific article slug or all comments for the community page
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const all = searchParams.get("all") === "true";

    if (slug) {
      // Find stored comments for this specific article slug
      const settingKey = `COMMENTS_SLUG_${slug}`;
      const existing = await prisma.setting.findUnique({
        where: { key: settingKey },
      }).catch(() => null);

      if (existing?.value) {
        try {
          const parsed = JSON.parse(existing.value);
          return NextResponse.json({ comments: parsed, isStored: true });
        } catch (_) {}
      }

      // Try fetching article details to generate tailored contextual comments
      const post = await prisma.post.findUnique({
        where: { slug },
        select: { title: true, slug: true },
      }).catch(() => null);

      const title = post?.title || slug.replace(/-/g, " ");
      const seedComments = getArticleSpecificSeedComments(title, slug);
      return NextResponse.json({ comments: seedComments, isStored: false });
    }

    if (all) {
      // Aggregate community hub discussions across recent articles
      const posts = await prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { views: "desc" },
        take: 12,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          views: true,
          publishedAt: true,
          category: { select: { name: true, color: true } },
        },
      }).catch(() => []);

      const discussions = await Promise.all(
        posts.map(async (post) => {
          const settingKey = `COMMENTS_SLUG_${post.slug}`;
          const existing = await prisma.setting.findUnique({
            where: { key: settingKey },
          }).catch(() => null);

          let postComments = [];
          if (existing?.value) {
            try {
              postComments = JSON.parse(existing.value);
            } catch (_) {}
          }

          if (postComments.length === 0) {
            postComments = getArticleSpecificSeedComments(post.title, post.slug);
          }

          return {
            post,
            commentsCount: postComments.length,
            recentComments: postComments.slice(0, 3),
          };
        })
      );

      return NextResponse.json({ discussions });
    }

    return NextResponse.json({ error: "Provide a slug or set all=true" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST: Add comment to a specific article, trigger AI reply, and persist in DB
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      articleTitle,
      articleSlug,
      articleExcerpt,
      commentAuthor,
      commentRole,
      commentContent,
      triggerAiReply,
    } = body;

    if (!commentAuthor || !commentContent) {
      return NextResponse.json(
        { error: "Comment author and content are required." },
        { status: 400 }
      );
    }

    const cleanSlug = (articleSlug || "general").trim();
    const settingKey = `COMMENTS_SLUG_${cleanSlug}`;

    // Load existing stored comments or initialize with tailored seeds
    let existingComments: any[] = [];
    const existing = await prisma.setting.findUnique({
      where: { key: settingKey },
    }).catch(() => null);

    if (existing?.value) {
      try {
        existingComments = JSON.parse(existing.value);
      } catch (_) {}
    } else {
      existingComments = getArticleSpecificSeedComments(articleTitle || cleanSlug, cleanSlug);
    }

    const userCommentId = "c_" + Date.now();
    const newUserComment = {
      id: userCommentId,
      author: commentAuthor.trim(),
      avatarBg: "from-amber-500 to-orange-600",
      date: "Just now",
      role: commentRole?.trim() || "Reader & Contributor",
      content: commentContent.trim(),
    };

    let aiReplyObj = null;
    if (triggerAiReply !== false) {
      const aiReply = await generateAuthenticCommunityReply({
        articleTitle: articleTitle || cleanSlug.replace(/-/g, " "),
        articleSlug: cleanSlug,
        articleExcerpt: articleExcerpt || "",
        commentAuthor,
        commentRole: commentRole || "Reader",
        commentContent,
      });

      if (aiReply) {
        aiReplyObj = {
          id: "reply_" + Date.now(),
          author: aiReply.replyAuthor,
          avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
          role: aiReply.replyRole,
          content: aiReply.replyContent,
          date: "Just now",
          isAiResponse: true,
          replyTo: commentAuthor,
          toneScore: aiReply.toneScore,
        };
      }
    }

    // Insert user comment and AI reply at the top of comments list
    const updatedComments = [
      newUserComment,
      ...(aiReplyObj ? [aiReplyObj] : []),
      ...existingComments,
    ];

    // Persist to database
    await prisma.setting.upsert({
      where: { key: settingKey },
      create: {
        key: settingKey,
        value: JSON.stringify(updatedComments),
        description: `Community comments for article ${cleanSlug}`,
      },
      update: {
        value: JSON.stringify(updatedComments),
      },
    }).catch((e) => console.warn("Could not save comment to db:", e.message));

    // Also record an analytics event for community engagement
    await prisma.analyticsEvent.create({
      data: {
        eventType: "COMMUNITY_COMMENT",
        slug: cleanSlug,
        metadata: JSON.stringify({
          author: commentAuthor,
          role: commentRole,
          snippet: commentContent.slice(0, 100),
          hasAiReply: !!aiReplyObj,
        }),
      },
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      userComment: newUserComment,
      aiReply: aiReplyObj,
      allComments: updatedComments,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process comment." },
      { status: 500 }
    );
  }
}
