import { NextResponse } from "next/server";
import { getAutonomousStoreCatalog } from "@/lib/pipeline/agents/storeProductAgent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const storeState = getAutonomousStoreCatalog();
    return NextResponse.json({ success: true, ...storeState });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
