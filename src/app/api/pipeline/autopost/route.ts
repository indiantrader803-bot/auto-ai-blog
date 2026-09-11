import { NextRequest, NextResponse } from "next/server";
import { runFullAutonomousSocialAutopost } from "@/lib/pipeline/agents/socialAutopostAgent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleAutopost(req);
}

export async function POST(req: NextRequest) {
  return handleAutopost(req);
}

async function handleAutopost(req: NextRequest) {
  try {
    // 1. Fetch latest active post from DB or fallback
    let latestPost = {
      title: "Funded Trader Markets vs FTMO (2026): Payout Speed, Spreads & Evaluation Rules Tested",
      slug: "funded-trader-markets-vs-ftmo-review-2026",
      excerpt: "Comprehensive 2026 prop firm comparison: 0 time limits, 90% profit split, and fee calculations with discount code 'arnab'.",
      category: "Finance & Quant Markets",
    };

    try {
      const dbPost = await prisma.post.findFirst({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
      });
      if (dbPost) {
        latestPost = {
          title: dbPost.title,
          slug: dbPost.slug,
          excerpt: dbPost.excerpt || dbPost.title,
          category: "Prop Trading & AI",
        };
      }
    } catch (_) {}

    // 2. Dispatch to Twitter (@Theindainta9go) and LinkedIn (Indian Trader)
    const result = await runFullAutonomousSocialAutopost({
      title: latestPost.title,
      slug: latestPost.slug,
      excerpt: latestPost.excerpt,
      category: latestPost.category,
      topOfferCode: "arnab",
      topOfferName: "Funded Trader Markets",
    });

    return NextResponse.json({
      success: true,
      message: "Autonomous Daily Autoposting dispatched successfully to Twitter & LinkedIn.",
      results: result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
