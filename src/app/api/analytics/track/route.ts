import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { eventType, slug, referrer, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ error: "Missing eventType" }, { status: 400 });
    }

    const metaString = typeof metadata === "object" ? JSON.stringify(metadata) : metadata || null;

    // Record in AnalyticsEvent table
    let event: any = null;
    try {
      event = await prisma.analyticsEvent.create({
        data: {
          eventType,
          slug: slug || null,
          referrer: referrer || null,
          metadata: metaString,
        },
      });
    } catch (_) {}

    // Post table counters
    if (slug) {
      try {
        if (eventType === "PAGE_VIEW") {
          await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
          }).catch(() => {});
        } else if (eventType === "SOCIAL_SHARE" || eventType === "SHARE") {
          await prisma.post.update({
            where: { slug },
            data: { shares: { increment: 1 } },
          }).catch(() => {});
        }
      } catch (_) {}
    }

    return NextResponse.json({
      success: true,
      eventRecorded: !!event,
      eventType,
      slug,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Tracking error" }, { status: 500 });
  }
}
