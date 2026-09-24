import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, VIP_SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function handleLogout() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(VIP_SESSION_COOKIE)?.value;

    if (token) {
      await destroySession(token);
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully." });
    response.cookies.set(VIP_SESSION_COOKIE, "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return response;
  } catch (error) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(VIP_SESSION_COOKIE, "", {
      path: "/",
      maxAge: 0,
    });
    return response;
  }
}

export async function POST() {
  return handleLogout();
}

export async function GET() {
  return handleLogout();
}
