import { NextRequest, NextResponse } from "next/server";
import { runBlogPipeline } from "@/lib/pipeline/orchestrator";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleCron(req);
}

export async function POST(req: NextRequest) {
  return handleCron(req);
}

async function handleCron(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET || "auto-blog-secure-key-2025";

  const isAuthorized =
    secret === expectedSecret ||
    authHeader === `Bearer ${expectedSecret}`;

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized cron trigger" }, { status: 401 });
  }

  try {
    console.log("Automated Cron Job triggered: Starting blog pipeline...");
    const result = await runBlogPipeline({
      autoPublish: true,
    });

    return NextResponse.json({
      success: result.success,
      message: "Daily automated blog post generation executed.",
      result,
    });
  } catch (error: any) {
    console.error("Cron execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
