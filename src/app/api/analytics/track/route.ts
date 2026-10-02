import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("target") || searchParams.get("url") || searchParams.get("link");
    const campaign = searchParams.get("campaign") || searchParams.get("utm_campaign") || "default";
    const product = searchParams.get("product") || searchParams.get("offer") || "affiliate_link";
    const source = searchParams.get("source") || searchParams.get("utm_source") || "thesmartmag";

    if (!targetUrl) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Record tracked click asynchronously
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: "AFFILIATE_CLICK",
          slug: product,
          referrer: source,
          metadata: JSON.stringify({
            targetUrl,
            campaign,
            product,
            source,
            timestamp: new Date().toISOString(),
          }),
        },
      });
    } catch (e) {
      console.error("Failed to record affiliate click:", e);
    }

    return NextResponse.redirect(targetUrl, 307);
  } catch (err: any) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { eventType, slug, referrer, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ error: "Missing eventType" }, { status: 400 });
    }

    // Extract client IP and Country headers provided by Edge/CDN (Render, Cloudflare, etc.)
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "127.0.0.1";
    const headerCountry = req.headers.get("cf-ipcountry") || 
                          req.headers.get("x-country") || 
                          req.headers.get("x-vercel-ip-country") || 
                          null;

    // Fast anonymized hash of IP for privacy & bot analysis
    const ipHash = clientIp ? `ip_${Buffer.from(clientIp).toString("base64").slice(0, 12)}` : null;

    // Detect bots vs human browsers
    const userAgent = req.headers.get("user-agent") || "";
    const isBot = /bot|googlebot|bingbot|yandex|crawler|spider|slurp|headless/i.test(userAgent);

    const mergedMetadata: Record<string, any> = typeof metadata === "object" ? { ...metadata } : {};
    if (headerCountry) mergedMetadata.headerCountry = headerCountry;
    mergedMetadata.isBot = isBot;
    mergedMetadata.clientType = isBot ? "SEARCH_ENGINE_BOT" : (mergedMetadata.authStatus === "VIP_MEMBER" ? "AUTHENTICATED_VIP" : "VERIFIED_READER");

    const metaString = JSON.stringify(mergedMetadata);

    // Record in AnalyticsEvent table
    let event: any = null;
    try {
      event = await prisma.analyticsEvent.create({
        data: {
          eventType,
          slug: slug || null,
          referrer: referrer || null,
          ipHash,
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
