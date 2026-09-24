import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbStatus = "connected";
  let activePosts = 0;
  let userCount = 0;

  try {
    // ⚡ Active keep-alive query against Supabase PostgreSQL
    // Resets Supabase's 7-day inactivity pause timer on every heartbeat
    const [_, posts, users] = await Promise.all([
      prisma.$queryRaw`SELECT NOW() as heartbeat`,
      prisma.post.count().catch(() => 0),
      prisma.user.count().catch(() => 0),
    ]);
    activePosts = posts;
    userCount = users;
  } catch (error: any) {
    dbStatus = `degraded: ${error?.message || "connection error"}`;
  }

  return NextResponse.json(
    {
      status: "alive",
      service: "auto-ai-blog-web",
      database: {
        status: dbStatus,
        activePosts,
        userCount,
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
