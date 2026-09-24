import { NextRequest, NextResponse } from "next/server";
import { notifyAdminUserLead } from "@/lib/emailNotification";
import { handleIncomingUserQuery } from "@/lib/agents/emailSupportAgent";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, subject } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name || "Reader";
    const cleanMessage = message || "General question regarding TheSmartMag";

    // 1. Run Dedicated AI Support Agent to solve the problem and auto-reply from query@thesmartmag.com or contact@thesmartmag.com
    const agentResult = await handleIncomingUserQuery({
      email: cleanEmail,
      name: cleanName,
      message: cleanMessage,
      subject: subject || "Your Inquiry to TheSmartMag",
      senderAddress: "query@thesmartmag.com",
      source: "CONTACT_PAGE",
    });

    // 2. Forward lead record to internal notification log
    await notifyAdminUserLead({
      type: "CONTACT_FORM",
      email: cleanEmail,
      name: cleanName,
      message: `Inquiry: ${cleanMessage}\n\nAI Agent Resolution (${agentResult.senderUsed}): ${agentResult.resolution.slice(0, 300)}...`,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received! Our dedicated support agent has analyzed your inquiry and dispatched a full resolution to your email.",
      ticketCategory: agentResult.category,
      senderUsed: agentResult.senderUsed,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


