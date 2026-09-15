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
    // If user accesses /travel on subdomain, 301 redirect to root
    if (pathname === "/travel") {
      return NextResponse.redirect(new URL(`/${search}`, req.url), 301);
    }
    // If user accesses /travel/:path on subdomain, 301 redirect to /:path
    if (pathname.startsWith("/travel/")) {
      const cleanPath = pathname.replace(/^\/travel/, "");
      return NextResponse.redirect(new URL(`${cleanPath}${search}`, req.url), 301);
    }
    // If root '/', rewrite directly to '/travel'
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/travel${search}`, req.url));
    }
    // If visiting destination routes directly like '/manali' on travel subdomain, rewrite to '/travel/manali'
    if (!pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
      return NextResponse.rewrite(new URL(`/travel${pathname}${search}`, req.url));
    }
  } else {
    // If user visits https://thesmartmag.com/travel, 301 redirect to https://travel.thesmartmag.com
    if (pathname === "/travel") {
      return NextResponse.redirect(new URL(`https://travel.thesmartmag.com${search}`), 301);
    }
    // If user visits https://thesmartmag.com/travel/:dest, 301 redirect to https://travel.thesmartmag.com/:dest
    if (pathname.startsWith("/travel/")) {
      const cleanPath = pathname.replace(/^\/travel/, "");
      return NextResponse.redirect(new URL(`https://travel.thesmartmag.com${cleanPath}${search}`), 301);
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
