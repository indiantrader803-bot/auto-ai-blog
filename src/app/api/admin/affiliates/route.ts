import { NextResponse } from "next/server";
import {
  runAffiliateConversionFetcherAgent,
  getAllAffiliatePrograms,
  getRecentConversions,
} from "@/lib/pipeline/agents/affiliateTrackerAgent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const report = await runAffiliateConversionFetcherAgent();
    const programs = getAllAffiliatePrograms();
    const recentConversions = getRecentConversions();

    // Check if there is stored telemetry in database settings
    let lastStoredReport = null;
    try {
      const setting = await prisma.setting.findUnique({
        where: { key: "AFFILIATE_AGENT_LAST_SYNC" },
      });
      if (setting?.value) {
        lastStoredReport = JSON.parse(setting.value);
      }
    } catch (_) {}

    return NextResponse.json({
      success: true,
      report,
      programs,
      recentConversions,
      lastStoredReport,
    });
  } catch (error: any) {
    console.error("Affiliate tracker API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch affiliate data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action } = body;

    if (action === "SYNC_NOW" || action === "FETCH_DAILY_DATA") {
      const freshReport = await runAffiliateConversionFetcherAgent();
      const programs = getAllAffiliatePrograms();
      const recentConversions = getRecentConversions();

      return NextResponse.json({
        success: true,
        message: "Agentic Affiliate Data Fetcher successfully synced conversion data across all partner platforms!",
        report: freshReport,
        programs,
        recentConversions,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Affiliate sync error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to sync affiliate data" },
      { status: 500 }
    );
  }
}
