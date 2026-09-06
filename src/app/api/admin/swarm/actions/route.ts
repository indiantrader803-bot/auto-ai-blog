import { NextResponse } from "next/server";
import {
  runFullAutonomousMaintenanceSwarm,
  auditAndMaintainContent,
  optimizeMonetizationAndSponsors,
  autoSyndicateRecentPosts,
  runSystemHealthSentinel,
} from "@/lib/pipeline/maintenance/adminSwarm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let lastRun = null;
    try {
      const setting = await prisma.setting.findUnique({
        where: { key: "AUTONOMOUS_SWARM_LAST_RUN" },
      });
      if (setting?.value) lastRun = setting.value;
    } catch (_) {}

    return NextResponse.json({
      status: "ACTIVE",
      lastRunTime: lastRun || new Date().toISOString(),
      agentsCount: 8,
      autopilotEnabled: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, webhookUrl, triggerNewPostGeneration } = body;

    switch (action) {
      case "RUN_FULL_SWARM": {
        const result = await runFullAutonomousMaintenanceSwarm({
          triggerNewPostGeneration: !!triggerNewPostGeneration,
          webhookUrl,
        });
        return NextResponse.json(result);
      }

      case "AUDIT_CONTENT": {
        const report = await auditAndMaintainContent();
        return NextResponse.json({ success: true, report });
      }

      case "OPTIMIZE_REVENUE": {
        const report = await optimizeMonetizationAndSponsors();
        return NextResponse.json({ success: true, report });
      }

      case "AUTO_SYNDICATE": {
        const report = await autoSyndicateRecentPosts(webhookUrl);
        return NextResponse.json({ success: true, report });
      }

      case "SYSTEM_SENTINEL": {
        const report = await runSystemHealthSentinel();
        return NextResponse.json({ success: true, report });
      }

      default: {
        return NextResponse.json(
          { error: "Unknown maintenance action requested." },
          { status: 400 }
        );
      }
    }
  } catch (error: any) {
    console.error("Swarm Action API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to execute swarm action" },
      { status: 500 }
    );
  }
}

