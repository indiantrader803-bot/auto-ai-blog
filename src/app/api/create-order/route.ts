import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_live_TsyPwRJG2SfIKs";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "17GRpxDPg31ZHVyCg6psMoLW";

    if (!keyId || !keySecret) {
      console.error("[RAZORPAY] Missing credentials in environment variables");
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { amount, currency = "INR", receipt = `rcpt_${Date.now()}`, notes = {} } = body;

    // Minimum amount validation: At least 50 subunits (e.g. 50 cents, 50 pence, 100 paise)
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 50) {
      return NextResponse.json(
        { error: "Amount must be at least 50 subunits" },
        { status: 400 }
      );
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(numericAmount),
      currency: currency.toUpperCase(),
      receipt: String(receipt).slice(0, 40),
      notes: {
        platform: "TheSmartMag",
        ...notes,
      },
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("[RAZORPAY] Create order error:", error);
    const status = error.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { error: error?.error?.description || error.message || "Failed to create Razorpay order" },
      { status }
    );
  }
}
