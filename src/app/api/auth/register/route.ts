import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession, VIP_SESSION_COOKIE, ensureAuthTables, SUPERADMIN_EMAILS } from "@/lib/auth";
import { sendVipWelcomeEmail } from "@/lib/emailNotification";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Ensure database tables exist
    await ensureAuthTables();

    // Check if user already exists
    let existing;
    try {
      existing = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbErr: any) {
      // Self-heal: retry after force-creating tables
      await ensureAuthTables(true);
      existing = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    }

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);
    const isSuperAdminEmail = SUPERADMIN_EMAILS.includes(cleanEmail);

    // Create user with VIP access (or SUPERADMIN if designated)
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: name ? name.trim() : null,
          passwordHash,
          isVip: true,
          vipTier: isSuperAdminEmail ? "SUPERADMIN" : "VIP_MEMBER",
          emailVerified: true,
        },
      });
    } catch (createErr: any) {
      // Self-heal: retry creation once after force table verification
      await ensureAuthTables(true);
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: name ? name.trim() : null,
          passwordHash,
          isVip: true,
          vipTier: isSuperAdminEmail ? "SUPERADMIN" : "VIP_MEMBER",
          emailVerified: true,
        },
      });
    }

    // Create session token
    const sessionToken = await createSession(user.id);

    // Dispatch welcome email asynchronously
    sendVipWelcomeEmail(cleanEmail, user.name || undefined).catch((e) =>
      console.warn("Welcome email async notice:", e)
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVip: user.isVip,
        vipTier: user.vipTier,
      },
      message: isSuperAdminEmail
        ? "Superadmin VIP Account activated successfully!"
        : "VIP Account created successfully!",
    });

    // Set HTTP-only secure cookie
    response.cookies.set(VIP_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
