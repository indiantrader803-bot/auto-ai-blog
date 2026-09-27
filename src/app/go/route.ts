import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * 💰 Tracked affiliate redirect gateway — `/go`
 *
 * Usage:
 *   /go?p=<productId>&s=<Store Name>&u=<encoded affiliate url>&src=<placement>
 *
 * Every buy button on the site routes through this endpoint so each outbound
 * click is recorded as an AFFILIATE_CLICK in the analyticsEvent table, then the
 * visitor is 302-redirected to the tagged retailer URL. This is what powers the
 * affiliate click analytics in the admin dashboard.
 *
 * Example:
 *   /go?p=iphone-18-pro-max&s=Flipkart&u=https%3A%2F%2Fwww.flipkart.com...&src=deepdive_hero
 *
 * If the URL param is missing/invalid the visitor is bounced home (never 500).
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const targetUrl = searchParams.get("u");
  const productId = searchParams.get("p") || "unknown-product";
  const store = searchParams.get("s") || "unknown-store";
  const source = searchParams.get("src") || "site";
  const campaign = searchParams.get("campaign") || "apple-hub";

  if (!targetUrl) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  // Only allow http(s) outbound targets — block javascript:, data:, etc.
  let safeTarget: URL;
  try {
    safeTarget = new URL(targetUrl);
    if (!/^https?:$/.test(safeTarget.protocol)) throw new Error("bad protocol");
  } catch {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  try {
    await prisma.analyticsEvent.create({
      data: {
        eventType: "AFFILIATE_CLICK",
        slug: productId,
        referrer: req.headers.get("referer") || null,
        metadata: JSON.stringify({
          targetUrl: safeTarget.toString(),
          store,
          product: productId,
          placement: source,
          campaign,
          source: "go-gateway",
          timestamp: new Date().toISOString(),
        }),
      },
    });
  } catch (e) {
    // Never block the visitor because logging failed
    console.error("[go] failed to record affiliate click:", e);
  }

  return NextResponse.redirect(safeTarget.toString(), 302);
}
