import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname, search } = req.nextUrl;

  // 301 Permanent Redirect all *.onrender.com traffic to official https://thesmartmag.com
  if (host.includes("onrender.com") && !pathname.startsWith("/api/health")) {
    const targetUrl = new URL(`https://thesmartmag.com${pathname}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static assets)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
