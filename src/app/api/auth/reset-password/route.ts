import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, ensureAuthTables } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await ensureAuthTables();

    let user;
    try {
      user = await prisma.user.findFirst({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { gt: new Date() },
        },
      });
    } catch {
      await ensureAuthTables(true);
      user = await prisma.user.findFirst({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { gt: new Date() },
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "This password reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now log in with your new password.",
    });
  } catch (error: any) {
    console.error("Reset password API error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
