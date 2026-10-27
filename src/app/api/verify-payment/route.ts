import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret key not configured" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, articleSlug } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required Razorpay payment verification fields", success: false },
        { status: 400 }
      );
    }

    // Razorpay standard verification formula: HMAC-SHA256(order_id + "|" + payment_id, secret)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isMatch = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(razorpay_signature, "utf-8")
    );

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid payment signature. Verification failed.", success: false },
        { status: 400 }
      );
    }

    // Success response with confirmation token / status
    return NextResponse.json({
      success: true,
      message: "Payment signature verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      articleSlug: articleSlug || null,
      verifiedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[RAZORPAY] Verify payment error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error during verification", success: false },
      { status: 500 }
    );
  }
}
