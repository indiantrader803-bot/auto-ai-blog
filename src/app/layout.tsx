import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "@/styles/ads.css";
import ExitIntentModal from "@/components/growth/ExitIntentModal";
import FloatingSubscribeButton from "@/components/growth/FloatingSubscribeButton";
import GlobalBlogAssistant from "@/components/chat/GlobalBlogAssistant";
import GoogleTranslateProvider from "@/components/layout/GoogleTranslateProvider";
import MonetagProvider from "@/components/ads/MonetagProvider";
import BiceaAdProvider from "@/components/ads/BiceaAdProvider";
import { TravelCurrencyProvider } from "@/context/TravelCurrencyContext";
import { VipAuthProvider } from "@/context/VipAuthContext";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | TheSmartMag",
    default: "TheSmartMag | AI, Technology, Finance & Markets",
  },
  description:
    "TheSmartMag covers artificial intelligence, technology, finance, markets and emerging trends with practical guides, analysis, news and insights.",
  keywords: [
    "TheSmartMag",
    "thesmartmag",
    "thesmartmag.com",
    "smartmag",
    "smart mag",
    "the smart mag",
    "smartmag website",
    "ded dimag",
    "deddimag",
    "SmartMag Tech",
    "SmartMag Magazine",
    "SmartMag Travel",
    "travel site",
    "best travel website",
    "AI travel planner",
    "cheap flights travel deals",
    "Air Defence Systems",
    "National Air Defence",
    "International Air Defence News",
    "S-400 Triumf",
    "Iron Dome",
    "Kusha Long-Range SAM",
    "Patriot PAC-3 Missile System",
    "Hypersonic Missile Interceptors",
    "Artificial Intelligence News",
    "AI Agents and LLMs",
    "Tech Magazine",
    "Prop Trading Firm Reviews",
    "Best Prop Firms 2026",
    "FTMO vs FTM",
    "Funded Trader Markets Discount Code",
    "Atlas Funded Promo Code",
    "Blue Guardian Affiliate Code",
    "FundedSquad Promo Code",
    "Equity Edge Promo Code",
    "AquaFunded Discount",
    "Algorithmic Trading Strategies",
    "Quantitative Finance",
    "Luxury Travel Itineraries",
    "Verified Hotel Booking Deals",
    "Software Engineering Trends",
    "Machine Learning Tutorials",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png" },
    ],
    shortcut: "/favicon.ico",
  },
  authors: [{ name: "TheSmartMag Editorial Team", url: siteUrl }],
  creator: "TheSmartMag",
  publisher: "TheSmartMag Media Network",
  category: "technology",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "TheSmartMag | AI, Technology, Finance & Markets",
    description:
      "TheSmartMag covers artificial intelligence, technology, finance, markets and emerging trends with practical guides, analysis, news and insights.",
    url: siteUrl,
    siteName: "TheSmartMag",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "TheSmartMag - Official Brand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheSmartMag | AI, Technology, Finance & Markets",
    description:
      "TheSmartMag covers artificial intelligence, technology, finance, markets and emerging trends with practical guides, analysis, news and insights.",
    creator: "@Theindainta9go",
    site: "@Theindainta9go",
    images: [
      "/logo.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "-PKXYTi8BG4RF03is2wZFBpFZD949436znZp5h9agKI",
      "4rMlrKZ5JALf5abCB0z2hxmP7sqgeFEoQVzhWosm3b0",
      "googlea87b1dee8479f0e4",
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Instant Theme Initializer: prevents any dark flash when in light mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        <meta name="google-site-verification" content="-PKXYTi8BG4RF03is2wZFBpFZD949436znZp5h9agKI" />
        <meta name="google-site-verification" content="4rMlrKZ5JALf5abCB0z2hxmP7sqgeFEoQVzhWosm3b0" />
        <meta name="google-site-verification" content="googlea87b1dee8479f0e4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Google AdSense Account Verification Meta & Official Ad Engine Script */}
        <meta name="google-adsense-account" content="ca-pub-9768860457233655" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9768860457233655"
          crossOrigin="anonymous"
        />

        {/* ======================================================== */}
        {/* 🚀 Monetag Official Publisher Verification Meta */}
        {/* ======================================================== */}
        <meta name="monetag" content="11802121,285853,11880194,11880195" />

        {/* JSON-LD Schema.org SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "TheSmartMag",
                  description:
                    "TheSmartMag covers artificial intelligence, technology, finance, markets and emerging trends with practical guides, analysis, news and insights.",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                  inLanguage: "en-US",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebApplication",
                  "@id": `${siteUrl}/#assistant`,
                  name: "SmartMag AI Voice Assistant",
                  applicationCategory: "UtilitiesApplication",
                  operatingSystem: "Web",
                  description:
                    "Voice-enabled AI assistant that summarizes SmartMag articles, compares verified prop trading offers, plans trips, and answers research questions in real time.",
                  url: siteUrl,
                  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                },
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "TheSmartMag",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/icon-512.png`,
                  },
                  sameAs: [
                    "https://twitter.com/thesmartmag",
                    "https://github.com/indiantrader803-bot/auto-ai-blog",
                  ],
                },
              ],
            }),
          }}
        />

        {/* Travelpayouts Global Affiliate & Travel Widget Script */}
        <script
          // @ts-ignore
          nowprocket=""
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          seraph-accel-crit="1"
          data-no-defer="1"
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                  var script = document.createElement("script");
                  script.async = 1;
                  script.setAttribute("data-cmp-ab","2");
                  script.src = 'https://tpembars.com/NTczNzkw.js?t=573790';
                  document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white font-sans">
        <GoogleTranslateProvider />
        <TravelCurrencyProvider>
          <VipAuthProvider>
            <BiceaAdProvider>
              <MonetagProvider>
                {children}
                <ExitIntentModal />
                <FloatingSubscribeButton />
                <GlobalBlogAssistant />
              </MonetagProvider>
            </BiceaAdProvider>
          </VipAuthProvider>
        </TravelCurrencyProvider>
      </body>
    </html>
  );
}
