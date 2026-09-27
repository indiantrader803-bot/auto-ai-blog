import { NextResponse } from "next/server";
import { runAffiliateConversionFetcherAgent } from "@/lib/pipeline/agents/affiliateTrackerAgent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Aggregates /go gateway buy-clicks from the analyticsEvent table:
 *  - per-product click counts (top products)
 *  - per-retailer (store) click counts
 *  - per-day trend for the last 14 days
 */
async function getProductClickAnalytics() {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  try {
    const events = await prisma.analyticsEvent.findMany({
      where: {
        eventType: "AFFILIATE_CLICK",
        createdAt: { gte: since },
      },
      select: { slug: true, metadata: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 5000,
    });

    const byProduct: Record<string, number> = {};
    const byStore: Record<string, number> = {};
    const byPlacement: Record<string, number> = {};
    const byDay: Record<string, number> = {};

    for (const ev of events) {
      let meta: any = {};
      try {
        meta = ev.metadata ? (typeof ev.metadata === "string" ? JSON.parse(ev.metadata) : ev.metadata) : {};
      } catch (_) {}

      const product = ev.slug || meta.product || "unknown";
      byProduct[product] = (byProduct[product] || 0) + 1;

      if (meta.store) byStore[meta.store] = (byStore[meta.store] || 0) + 1;
      if (meta.placement) byPlacement[meta.placement] = (byPlacement[meta.placement] || 0) + 1;

      const day = new Date(ev.createdAt).toISOString().slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;
    }

    const toSorted = (obj: Record<string, number>, limit = 10) =>
      Object.entries(obj)
        .map(([name, clicks]) => ({ name, clicks }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, limit);

    // Fill last 14 days (including zero days) for a smooth sparkline
    const dailyTrend: { day: string; clicks: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      dailyTrend.push({ day: d, clicks: byDay[d] || 0 });
    }

    return {
      totalBuyClicks30d: events.length,
      topProducts: toSorted(byProduct),
      topStores: toSorted(byStore),
      topPlacements: toSorted(byPlacement, 8),
      dailyTrend,
    };
  } catch (e) {
    console.warn("product click analytics unavailable:", e);
    return {
      totalBuyClicks30d: 0,
      topProducts: [],
      topStores: [],
      topPlacements: [],
      dailyTrend: [],
    };
  }
}

export async function GET() {
  try {
    const { report, programs, recentConversions } = await runAffiliateConversionFetcherAgent();
    const productClicks = await getProductClickAnalytics();

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
      productClicks,
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
      const { report, programs, recentConversions } = await runAffiliateConversionFetcherAgent();
      const productClicks = await getProductClickAnalytics();

      return NextResponse.json({
        success: true,
        message: "Agentic Affiliate Data Fetcher successfully synced conversion data across all partner platforms!",
        report,
        programs,
        recentConversions,
        productClicks,
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
