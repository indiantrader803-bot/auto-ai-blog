import { NextResponse } from "next/server";
import { executeRevenueOptimizationSwarm } from "@/lib/pipeline/agents/revenueOptimizationSwarm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const report = await executeRevenueOptimizationSwarm();
    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const report = await executeRevenueOptimizationSwarm();
    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
