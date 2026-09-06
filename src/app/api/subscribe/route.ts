import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyAdminUserLead } from "@/lib/emailNotification";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    await prisma.newsletterSubscriber.upsert({
      where: { email: cleanEmail },
      update: { status: "ACTIVE" },
      create: {
        email: cleanEmail,
        status: "ACTIVE",
      },
    });

    // Dispatch notification to arnab.laha2018@gmail.com
    await notifyAdminUserLead({
      type: "NEWSLETTER_SUBSCRIPTION",
      email: cleanEmail,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Thank you for subscribing! Check your inbox shortly." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
