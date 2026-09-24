import { NextRequest, NextResponse } from "next/server";
import { handleIncomingUserQuery } from "@/lib/agents/emailSupportAgent";

export const dynamic = "force-dynamic";

/**
 * 📥 Dedicated Inbound Email Webhook Receiver
 * Listens for incoming emails sent to query@thesmartmag.com, contact@thesmartmag.com, or support@thesmartmag.com
 * and triggers the AI Support Agent to solve the problem and dispatch an immediate response.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Standard fields across Resend Inbound / SendGrid / Cloudflare Email Workers / Postmark
    const fromField = body.from || body.sender || body.envelope?.from || "";
    const toField = body.to || body.recipient || body.envelope?.to || "query@thesmartmag.com";
    const subject = body.subject || "User Inquiry";
    const textBody = body.text || body.html || body.message || "";

    // Extract sender email
    const emailMatch = fromField.match(/<([^>]+)>/) || [null, fromField];
    const userEmail = (emailMatch[1] || fromField || "").trim().toLowerCase();

    // Extract sender name
    const nameMatch = fromField.match(/^([^<]+)</);
    const userName = nameMatch ? nameMatch[1].trim() : "Reader";

    if (!userEmail || !userEmail.includes("@")) {
      return NextResponse.json({ error: "Missing sender email" }, { status: 400 });
    }

    // Determine return address based on destination address
    let senderAddress: "query@thesmartmag.com" | "contact@thesmartmag.com" | "support@thesmartmag.com" = "query@thesmartmag.com";
    if (toField.includes("contact@thesmartmag.com")) {
      senderAddress = "contact@thesmartmag.com";
    } else if (toField.includes("support@thesmartmag.com")) {
      senderAddress = "support@thesmartmag.com";
    }

    console.info(`[INBOUND EMAIL] Query received from ${userEmail} addressed to ${toField}. Subject: "${subject}"`);

    // Run Dedicated AI Support Agent to solve the question
    const result = await handleIncomingUserQuery({
      email: userEmail,
      name: userName,
      message: textBody,
      subject,
      senderAddress,
      source: "INBOUND_EMAIL_WEBHOOK",
    });

    return NextResponse.json({
      success: true,
      ticketCategory: result.category,
      senderUsed: result.senderUsed,
      resolutionPreview: result.resolution.slice(0, 160),
    });
  } catch (error: any) {
    console.error("[INBOUND EMAIL ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "TheSmartMag Autonomous Email Query & Support Inbound Webhook",
    supportedChannels: ["query@thesmartmag.com", "contact@thesmartmag.com", "support@thesmartmag.com"],
  });
}
