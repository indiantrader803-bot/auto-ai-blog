import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, VIP_SESSION_COOKIE, ensureAuthTables, SUPERADMIN_EMAILS } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Ensure database tables exist
    await ensureAuthTables();

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbErr) {
      // Self-heal: retry after table creation
      await ensureAuthTables(true);
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Auto-promote designated superadmin emails if not already marked
    if (SUPERADMIN_EMAILS.includes(cleanEmail) && user.vipTier !== "SUPERADMIN") {
      try {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { vipTier: "SUPERADMIN", isVip: true },
        });
      } catch (tierErr) {
        console.warn("Could not update superadmin tier:", tierErr);
      }
    }

    // Create session
    const sessionToken = await createSession(user.id);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVip: user.isVip,
        vipTier: user.vipTier,
      },
      message: "Logged in successfully.",
    });

    response.cookies.set(VIP_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: error?.message || "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
