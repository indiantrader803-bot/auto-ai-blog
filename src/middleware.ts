import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname, search } = req.nextUrl;

  // Instant 200 OK ads.txt delivery for Google AdSense verification across all subdomains & root
  if (pathname === "/ads.txt") {
    return new NextResponse("google.com, pub-9768860457233655, DIRECT, f08c47fec0942fa0\n", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  // 1. Permanent 301 Canonical Redirect for www.thesmartmag.com -> https://thesmartmag.com (Fixes GSC duplicate/redirect issues)
  if (host.startsWith("www.thesmartmag.com")) {
    const targetUrl = new URL(`https://thesmartmag.com${pathname}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 2. 301 Permanent Redirect all *.onrender.com traffic to official https://thesmartmag.com
  if (host.includes("onrender.com") && !pathname.startsWith("/api/health")) {
    const targetUrl = new URL(`https://thesmartmag.com${pathname}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 3. Subdomain Routing for trade.thesmartmag.com (if accessed directly via subdomain)
  if (host.startsWith("trade.")) {
    // Direct access to secure Admin Portal
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    if (pathname === "/trade") {
      return NextResponse.redirect(new URL(`/${search}`, req.url), 301);
    }

    if (pathname === "/" || pathname === "/best-prop-firms") {
      return NextResponse.rewrite(new URL(`/trade${search}`, req.url));
    }

    return NextResponse.next();
  }

  // 4. Subdomain Routing for travel.thesmartmag.com (if accessed directly via subdomain)
  if (host.startsWith("travel.")) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    if (pathname === "/travel") {
      return NextResponse.redirect(new URL(`/${search}`, req.url), 301);
    }

    if (pathname.startsWith("/travel/")) {
      const cleanPath = pathname.replace(/^\/travel/, "");
      return NextResponse.redirect(new URL(`${cleanPath}${search}`, req.url), 301);
    }

    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/travel${search}`, req.url));
    }

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

    return NextResponse.rewrite(new URL(`/travel${pathname}${search}`, req.url));
  }

  // 5. On the primary domain (thesmartmag.com):
  // NEVER 301-redirect /trade, /travel, or /apple to subdomains!
  // Serving them directly on https://thesmartmag.com returns HTTP 200 OK directly to Googlebot and eliminates all GSC "Page with redirect" errors!

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
