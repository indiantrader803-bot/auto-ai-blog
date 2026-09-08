import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          in: [
            "BANK_HOLDER_NAME",
            "BANK_NAME",
            "BANK_ACCOUNT_NO",
            "BANK_IFSC",
            "BANK_SWIFT",
            "BANK_UPI_ID",
            "PAYOUT_MIN_THRESHOLD",
            "RAZORPAY_KEY_ID",
            "STRIPE_KEY",
            "WITHDRAWAL_HISTORY",
          ],
        },
      },
    });

    const config: Record<string, string> = {};
    settings.forEach((s) => {
      config[s.key] = s.value;
    });

    const maskedAcc = config["BANK_ACCOUNT_NO"]
      ? "••••••••" + config["BANK_ACCOUNT_NO"].slice(-4)
      : "";

    let history = [];
    try {
      if (config["WITHDRAWAL_HISTORY"]) {
        history = JSON.parse(config["WITHDRAWAL_HISTORY"]);
      }
    } catch {}

    return NextResponse.json({
      bankHolderName: config["BANK_HOLDER_NAME"] || "",
      bankName: config["BANK_NAME"] || "",
      bankAccountNo: maskedAcc,
      bankAccountNoRaw: config["BANK_ACCOUNT_NO"] || "",
      bankIfsc: config["BANK_IFSC"] || "",
      bankSwift: config["BANK_SWIFT"] || "",
      bankUpiId: config["BANK_UPI_ID"] || "",
      payoutMinThreshold: config["PAYOUT_MIN_THRESHOLD"] || "100.00",
      razorpayKeyId: config["RAZORPAY_KEY_ID"] || "",
      stripeKey: config["STRIPE_KEY"] || "",
      withdrawalHistory: history,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch payout settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      bankHolderName,
      bankName,
      bankAccountNo,
      bankIfsc,
      bankSwift,
      bankUpiId,
      payoutMinThreshold,
      razorpayKeyId,
      stripeKey,
      action,
      withdrawAmount,
    } = body;

    const updates: { key: string; value: string; description: string }[] = [];

    if (bankHolderName !== undefined) updates.push({ key: "BANK_HOLDER_NAME", value: String(bankHolderName), description: "Bank Account Holder Full Name" });
    if (bankName !== undefined) updates.push({ key: "BANK_NAME", value: String(bankName), description: "Bank Name" });
    if (bankAccountNo !== undefined && bankAccountNo !== "") updates.push({ key: "BANK_ACCOUNT_NO", value: String(bankAccountNo), description: "Bank Account Number" });
    if (bankIfsc !== undefined) updates.push({ key: "BANK_IFSC", value: String(bankIfsc).toUpperCase(), description: "Bank IFSC Code" });
    if (bankSwift !== undefined) updates.push({ key: "BANK_SWIFT", value: String(bankSwift).toUpperCase(), description: "Bank SWIFT/BIC Code" });
    if (bankUpiId !== undefined) updates.push({ key: "BANK_UPI_ID", value: String(bankUpiId).trim(), description: "Instant UPI ID" });
    if (payoutMinThreshold !== undefined) updates.push({ key: "PAYOUT_MIN_THRESHOLD", value: String(payoutMinThreshold), description: "Minimum Payout Threshold USD" });
    if (razorpayKeyId !== undefined) updates.push({ key: "RAZORPAY_KEY_ID", value: String(razorpayKeyId).trim(), description: "Razorpay Key ID for Reader Payments" });
    if (stripeKey !== undefined) updates.push({ key: "STRIPE_KEY", value: String(stripeKey).trim(), description: "Stripe Publishable Key" });

    for (const item of updates) {
      await prisma.setting.upsert({
        where: { key: item.key },
        update: { value: item.value, description: item.description },
        create: item,
      });
    }

    if (action === "REQUEST_WITHDRAWAL" && withdrawAmount) {
      const existingHistoryRecord = await prisma.setting.findUnique({ where: { key: "WITHDRAWAL_HISTORY" } });
      let currentHistory: any[] = [];
      try {
        if (existingHistoryRecord?.value) {
          currentHistory = JSON.parse(existingHistoryRecord.value);
        }
      } catch {}

      const amt = parseFloat(withdrawAmount) || 0;
      const inrStr = (amt * 86.5).toLocaleString("en-IN", { maximumFractionDigits: 2 });
      
      const newTx = {
        id: "TXN_" + Date.now().toString(36).toUpperCase(),
        amount: amt.toFixed(2),
        currency: "USD",
        inrEstimate: `₹${inrStr}`,
        status: "PROCESSING",
        destination: bankAccountNo
          ? `Bank A/C ••••${String(bankAccountNo).slice(-4)} (${bankName || "Linked Bank"})`
          : (bankUpiId || "Primary Bank Wire"),
        ifsc: bankIfsc || "SWIFT-WIRE",
        requestedAt: new Date().toISOString(),
        estimatedSettlement: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };

      const updatedHistory = [newTx, ...currentHistory];

      await prisma.setting.upsert({
        where: { key: "WITHDRAWAL_HISTORY" },
        update: { value: JSON.stringify(updatedHistory) },
        create: {
          key: "WITHDRAWAL_HISTORY",
          value: JSON.stringify(updatedHistory),
          description: "Settlement and Bank Withdrawal History Logs",
        },
      });

      return NextResponse.json({ success: true, transaction: newTx });
    }

    return NextResponse.json({ success: true, message: "Bank & Payout settings updated successfully" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to process bank settings update" }, { status: 500 });
  }
}
