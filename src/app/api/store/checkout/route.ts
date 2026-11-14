import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productId,
      productTitle,
      items,
      buyerEmail,
      buyerName,
      buyerPhone,
      currency = "INR",
      amount,
      shippingAddress,
      isPhysical = true,
      paymentMethod = "RAZORPAY",
    } = body;

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TsyPwRJG2SfIKs";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "17GRpxDPg31ZHVyCg6psMoLW";

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay credentials not configured", success: false }, { status: 500 });
    }

    const calcAmount = Number(amount) || 999;
    // Razorpay requires amounts in smallest currency subunits (Paise for INR, Cents for USD)
    const amountInSubunits = Math.round(calcAmount * 100);

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receiptId = `rcpt_${Date.now().toString().slice(-8)}`;

    const rzpOrder = await instance.orders.create({
      amount: amountInSubunits,
      currency: currency.toUpperCase(),
      receipt: receiptId,
      notes: {
        platform: "TheSmartMag Store",
        buyerName: buyerName || "Customer",
        buyerEmail: buyerEmail || "",
        buyerPhone: buyerPhone || "",
        shippingAddress: shippingAddress ? String(shippingAddress).slice(0, 100) : "",
        productTitle: productTitle ? String(productTitle).slice(0, 80) : "Store Order",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId,
    });
  } catch (error: any) {
    console.error("[STORE CHECKOUT POST ERROR]:", error);
    return NextResponse.json(
      { error: error?.error?.description || error.message || "Failed to initialize checkout", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { orderId, paymentId, signature, status, buyerEmail, shippingAddress, productTitle, priceINR } = body;

    // Log the successful payment event in the database for sales reporting
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: "DIGITAL_PRODUCT_SALE",
          slug: orderId || paymentId,
          metadata: JSON.stringify({
            orderId,
            paymentId,
            buyerEmail,
            shippingAddress,
            productTitle: productTitle || "TheSmartMag Verified Gadget",
            priceINR: Number(priceINR) || 1499,
            status: status || "PAID",
            paidAt: new Date().toISOString(),
          }),
        },
      });
    } catch (dbErr) {
      console.warn("[STORE CHECKOUT PUT DB WARNING]:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Order recorded successfully",
      paymentId,
      orderId,
    });
  } catch (error: any) {
    console.error("[STORE CHECKOUT PUT ERROR]:", error);
    return NextResponse.json({ success: true, message: "Order processed" });
  }
}
