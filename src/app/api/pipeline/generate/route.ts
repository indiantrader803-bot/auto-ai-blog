import { NextRequest, NextResponse } from "next/server";
import { runBlogPipeline } from "@/lib/pipeline/orchestrator";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { topic, niche, category, tone, targetWordCount, autoPublish, includeVideo } = body;

    const result = await runBlogPipeline({
      topic,
      niche,
      category,
      tone,
      targetWordCount: targetWordCount ? parseInt(targetWordCount) : undefined,
      autoPublish,
      includeVideo,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
