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

  // Instant 200 OK BingSiteAuth.xml delivery for Bing Webmaster Tools verification
  if (pathname === "/BingSiteAuth.xml") {
    return new NextResponse('<?xml version="1.0"?>\n<users>\n\t<user>79328ACF010CF94BBE0BA125939AA19B</user>\n</users>\n', {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  // 1. Permanent 301 Canonical Redirect for www.thesmartmag.com -> https://thesmartmag.com
  if (host.startsWith("www.thesmartmag.com")) {
    const targetUrl = new URL(`https://thesmartmag.com${pathname}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 2. 301 Permanent Redirect all *.onrender.com traffic to official https://thesmartmag.com
  if (host.includes("onrender.com") && !pathname.startsWith("/api/health")) {
    const targetUrl = new URL(`https://thesmartmag.com${pathname}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 3. Consolidated Authority: Permanent 301 Redirect for travel.thesmartmag.com -> thesmartmag.com/travel/*
  if (host.startsWith("travel.")) {
    const targetPath = pathname === "/" ? "/travel" : `/travel${pathname.replace(/^\/travel/, "")}`;
    const targetUrl = new URL(`https://thesmartmag.com${targetPath}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 4. Consolidated Authority: Permanent 301 Redirect for store.thesmartmag.com -> thesmartmag.com/store/*
  if (host.startsWith("store.")) {
    const targetPath = pathname === "/" ? "/store" : `/store${pathname.replace(/^\/store/, "")}`;
    const targetUrl = new URL(`https://thesmartmag.com${targetPath}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 5. Consolidated Authority: Permanent 301 Redirect for trade.thesmartmag.com -> thesmartmag.com/trade/*
  if (host.startsWith("trade.")) {
    const targetPath = pathname === "/" ? "/trade" : `/trade${pathname.replace(/^\/trade/, "")}`;
    const targetUrl = new URL(`https://thesmartmag.com${targetPath}${search}`);
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
