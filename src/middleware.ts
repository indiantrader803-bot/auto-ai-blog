import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname, search } = req.nextUrl;

  // 301 Permanent Redirect all *.onrender.com traffic to official https://thesmartmag.com
  if (host.includes("onrender.com") && !pathname.startsWith("/api/health")) {
    const targetUrl = new URL(`https://thesmartmag.com${pathname}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // Seamless Subdomain Routing for trade.thesmartmag.com
  if (host.startsWith("trade.")) {
    // 1. Direct access to secure Admin Portal
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    // 2. If user accesses /trade on subdomain, 301 redirect to root /
    if (pathname === "/trade") {
      return NextResponse.redirect(new URL(`/${search}`, req.url), 301);
    }

    // 3. If root '/', rewrite directly to '/trade'
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/trade${search}`, req.url));
    }

    // 4. If user accesses /best-prop-firms on trade subdomain, rewrite to /trade
    if (pathname === "/best-prop-firms") {
      return NextResponse.rewrite(new URL(`/trade${search}`, req.url));
    }

    return NextResponse.next();
  }

  // Seamless Subdomain Routing for travel.thesmartmag.com
  if (host.startsWith("travel.")) {
    // 1. Direct access to secure Admin Portal - NEVER rewrite admin to travel destination
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    // 2. If user accesses /travel on subdomain, 301 redirect to root
    if (pathname === "/travel") {
      return NextResponse.redirect(new URL(`/${search}`, req.url), 301);
    }

    // 3. If user accesses /travel/:path on subdomain, 301 redirect to /:path
    if (pathname.startsWith("/travel/")) {
      const cleanPath = pathname.replace(/^\/travel/, "");
      return NextResponse.redirect(new URL(`${cleanPath}${search}`, req.url), 301);
    }

    // 4. If root '/', rewrite directly to '/travel'
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/travel${search}`, req.url));
    }

    // 5. System, API, static files, and main publication pages should not be rewritten as destination guides
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.includes(".") ||
      pathname.startsWith("/best-prop-firms") ||
      pathname.startsWith("/trade") ||
      pathname.startsWith("/compare") ||
      pathname.startsWith("/reviews") ||
      pathname.startsWith("/blog") ||
      pathname.startsWith("/category") ||
      pathname.startsWith("/tools") ||
      pathname.startsWith("/store") ||
      pathname.startsWith("/about") ||
      pathname.startsWith("/contact") ||
      pathname.startsWith("/privacy")
    ) {
      return NextResponse.next();
    }

    // 6. If visiting destination routes directly like '/manali' or '/dubai' on travel subdomain, rewrite to '/travel/:destination'
    return NextResponse.rewrite(new URL(`/travel${pathname}${search}`, req.url));
  } else {
    // If user visits https://thesmartmag.com/trade, 301 redirect to https://trade.thesmartmag.com
    if (pathname === "/trade") {
      return NextResponse.redirect(new URL(`https://trade.thesmartmag.com${search}`), 301);
    }
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
