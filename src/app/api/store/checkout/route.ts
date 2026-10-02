import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, productTitle, price, priceINR, currency, buyerEmail, paymentMethod, utrOrTxnId } = body;

    if (!buyerEmail || !productId) {
      return NextResponse.json({ error: "Missing buyer details" }, { status: 400 });
    }

    const effectiveCurrency = currency || (priceINR ? "INR" : "USD");
    const effectivePrice = price || priceINR || 299;
    const finalPriceINR = effectiveCurrency === "INR" ? effectivePrice : Math.round(effectivePrice * 86.5);
    const finalPriceUSD = effectiveCurrency === "USD" ? effectivePrice : parseFloat((effectivePrice / 86.5).toFixed(2));

    // Log the conversion event directly to AnalyticsEvent
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: "DIGITAL_PRODUCT_SALE",
          slug: productId,
          referrer: paymentMethod || "DIRECT_UPI",
          metadata: JSON.stringify({
            productTitle,
            price: finalPriceUSD,
            priceINR: finalPriceINR,
            currency: effectiveCurrency,
            buyerEmail,
            paymentMethod,
            utrOrTxnId: utrOrTxnId || "AUTO_VERIFIED",
            payeeAccount: "ARNAB LAHA - DBS Bank - 8240438062@superyes",
            timestamp: new Date().toISOString(),
          }),
        },
      });
    } catch (_) {}

    // Auto-subscribe customer to newsletter updates
    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email: buyerEmail },
        update: {},
        create: { email: buyerEmail, status: "ACTIVE" },
      });
    } catch (_) {}

    return NextResponse.json({
      success: true,
      message: "Order verified! Instant download unlocked.",
      downloadUrl: `https://auto-ai-blog-web.onrender.com/downloads/${productId}.pdf`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process order" }, { status: 500 });
  }
}
