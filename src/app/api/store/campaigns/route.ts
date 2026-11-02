import { NextResponse } from "next/server";
import { AUTONOMOUS_ACTIVE_CAMPAIGNS, runAutonomousAdStudioOptimization } from "@/lib/pipeline/agents/adStudioAgent";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domainFilter = searchParams.get("domain");

    let campaigns = AUTONOMOUS_ACTIVE_CAMPAIGNS;
    if (domainFilter) {
      campaigns = campaigns.filter((c) => c.domain.toLowerCase().includes(domainFilter.toLowerCase()));
    }

    const totalImpressions = campaigns.reduce((acc, c) => acc + c.metrics.impressions, 0);
    const totalClicks = campaigns.reduce((acc, c) => acc + c.metrics.clicks, 0);
    const totalConversions = campaigns.reduce((acc, c) => acc + c.metrics.conversions, 0);

    return NextResponse.json({
      success: true,
      campaigns,
      summary: {
        activeCampaigns: campaigns.length,
        totalImpressions,
        totalClicks,
        totalConversions,
        averageCTR: `${((totalClicks / (totalImpressions || 1)) * 100).toFixed(2)}%`,
        targetCountries: ["India", "USA", "UK", "Canada", "Australia", "UAE", "Germany"],
        monitoredBy: "AI Ad Studio Swarm (Nalarin + Adport + OpenAds AI)",
        status: "RUNNING_24_7",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const report = await runAutonomousAdStudioOptimization();
    return NextResponse.json({
      success: true,
      message: "Autonomous Ad Campaign Swarm re-optimized successfully",
      report,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
