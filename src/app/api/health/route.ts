import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbStatus = "connected";

  try {
    // Strict 2.5s timeout: Resets Supabase's 7-day inactivity pause timer without blocking
    await Promise.race([
      prisma.$queryRaw`SELECT 1 as heartbeat`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database heartbeat timeout (2.5s)")), 2500)
      ),
    ]);
  } catch (error: any) {
    dbStatus = `degraded: ${error?.message || "connection error"}`;
  }

  return NextResponse.json(
    {
      status: "alive",
      service: "auto-ai-blog-web",
      database: {
        status: dbStatus,
        provider: "supabase-postgresql",
      },
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
