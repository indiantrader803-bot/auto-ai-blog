import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      status: "alive",
      service: "auto-ai-blog-web",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
