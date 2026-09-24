import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSecureToken, ensureAuthTables } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/emailNotification";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await ensureAuthTables();

    const cleanEmail = email.toLowerCase().trim();
    let user;
    try {
      user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    } catch {
      await ensureAuthTables(true);
      user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    }

    // Always return success for security (prevent email enumeration)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If that email is registered, a password reset link has been dispatched.",
      });
    }

    const resetToken = generateSecureToken();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";
    const resetUrl = `${siteUrl}/vip/reset-password?token=${resetToken}`;

    // Send authentic email
    await sendPasswordResetEmail(cleanEmail, resetUrl);

    return NextResponse.json({
      success: true,
      message: "If that email is registered, a password reset link has been dispatched.",
    });
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request." },
      { status: 500 }
    );
  }
}
