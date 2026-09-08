import { NextRequest, NextResponse } from "next/server";
import { runFullAutonomousMaintenanceSwarm } from "@/lib/pipeline/maintenance/adminSwarm";

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
    authHeader === `Bearer ${expectedSecret}` ||
    process.env.NODE_ENV === "development";

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized cron trigger" }, { status: 401 });
  }

  try {
    console.log("24/7 Autonomous Traffic, Promotion & Monetization Swarm Triggered...");
    const result = await runFullAutonomousMaintenanceSwarm({
      triggerNewPostGeneration: false, // Priority: Traffic, Indexing, Viral Promotion, and Revenue Optimization!
    });

    return NextResponse.json({
      success: result.success,
      message: "24/7 Autonomous Admin Swarm Maintenance & Content Cycle executed.",
      durationSeconds: result.durationSeconds,
      reports: result.fleetReports,
    });
  } catch (error: any) {
    console.error("Cron swarm execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

