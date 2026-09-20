import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://thesmartmag.com"
  ).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "Pinterestbot",
        allow: "/",
      },
      {
        userAgent: "TelegramBot",
        allow: "/",
      },
      {
        userAgent: "WhatsApp",
        allow: "/",
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      "https://trade.thesmartmag.com/sitemap.xml",
      "https://travel.thesmartmag.com/sitemap.xml",
    ],
  };
}
