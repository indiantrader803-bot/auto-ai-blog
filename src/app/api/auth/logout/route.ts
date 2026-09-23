import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, VIP_SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(VIP_SESSION_COOKIE)?.value;

    if (token) {
      await destroySession(token);
    }

    const response = NextResponse.json({ success: true, message: "Logged out." });
    response.cookies.delete(VIP_SESSION_COOKIE);
    return response;
  } catch (error) {
    return NextResponse.json({ success: true });
  }
}
