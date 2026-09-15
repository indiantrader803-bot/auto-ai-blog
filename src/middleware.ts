import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname, search } = req.nextUrl;

  // 301 Permanent Redirect all *.onrender.com traffic to official https://thesmartmag.com
  if (host.includes("onrender.com") && !pathname.startsWith("/api/health")) {
    const targetUrl = new URL(`https://thesmartmag.com${pathname}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // Seamless Subdomain Routing for travel.thesmartmag.com
  if (host.startsWith("travel.")) {
    // If root '/', rewrite directly to '/travel'
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/travel${search}`, req.url));
    }
    // If visiting destination routes directly like '/japan' on travel subdomain, rewrite to '/travel/japan'
    if (!pathname.startsWith("/travel") && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
      return NextResponse.rewrite(new URL(`/travel${pathname}${search}`, req.url));
    }
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
