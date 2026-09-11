import { NextRequest, NextResponse } from "next/server";
import { runPropFlowMasterSwarm } from "@/lib/propflow/orchestrator";
import { PROPFLOW_MASTER_OFFERS } from "@/lib/propflow/offers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const report = await runPropFlowMasterSwarm();
    return NextResponse.json({
      success: true,
      report,
      offers: PROPFLOW_MASTER_OFFERS,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "RUN_SWARM" || action === "TRIGGER_DAILY_CYCLE") {
      const report = await runPropFlowMasterSwarm();
      return NextResponse.json({
        success: true,
        message: "PropFlow-AI 15-Agent Swarm Cycle Executed Successfully.",
        report,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
