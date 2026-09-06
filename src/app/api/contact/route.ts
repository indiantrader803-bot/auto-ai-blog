import { NextRequest, NextResponse } from "next/server";
import { notifyAdminUserLead } from "@/lib/emailNotification";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // Forward lead details to arnab.laha2018@gmail.com
    await notifyAdminUserLead({
      type: "CONTACT_FORM",
      email: email.toLowerCase().trim(),
      name: name || "Anonymous Reader",
      message: message || "No message provided",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message delivered successfully! We will get back to you shortly.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

