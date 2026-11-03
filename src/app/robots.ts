import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://thesmartmag.com"
  ).replace(/\/$/, "");

  const privatePaths = [
    "/app",
    "/terminal",
    "/admin",
    "/api/",
    "/vip/",
    "/login",
    "/register",
  ];

  return {
    rules: [
      // Default rule for all bots
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      // Search engine primary crawlers
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      // AI Search & Answer bots (explicitly allow for Generative Engine citations)
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      {
        userAgent: "Claude-User",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      // AI Training bots
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/app", "/admin", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Advertising & Feed verification
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Google-Display-Ads-Bot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
  };
}
