import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "@/styles/ads.css";
import ExitIntentModal from "@/components/growth/ExitIntentModal";
import FloatingSubscribeButton from "@/components/growth/FloatingSubscribeButton";
import GlobalBlogAssistant from "@/components/chat/GlobalBlogAssistant";
import GoogleTranslateProvider from "@/components/layout/GoogleTranslateProvider";
import MonetagProvider from "@/components/ads/MonetagProvider";
import { TravelCurrencyProvider } from "@/context/TravelCurrencyContext";
import { VipAuthProvider } from "@/context/VipAuthContext";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | TheSmartMag",
    default: "TheSmartMag | AI Tech Innovations, Quant Trading, Prop Firms & Luxury Travel",
  },
  description:
    "TheSmartMag is a premier digital publication and AI-powered intelligence platform delivering in-depth insights on artificial intelligence, algorithmic trading, prop firm comparisons & promo codes, software engineering, and verified worldwide luxury travel itineraries & booking deals.",
  keywords: [
    "TheSmartMag",
    "SmartMag Tech",
    "SmartMag Travel",
    "Artificial Intelligence News",
    "AI Agents and LLMs",
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
    "Airport Transfers",
    "Agoda Booking Discounts",
    "Software Engineering Trends",
    "Machine Learning Tutorials",
  ],
  authors: [{ name: "TheSmartMag Editorial Team", url: siteUrl }],
  creator: "TheSmartMag",
  publisher: "TheSmartMag Media Network",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "es": "/?lang=es",
      "hi": "/?lang=hi",
      "fr": "/?lang=fr",
      "de": "/?lang=de",
      "ja": "/?lang=ja",
      "zh": "/?lang=zh-CN",
      "ar": "/?lang=ar",
      "pt": "/?lang=pt",
      "ru": "/?lang=ru",
      "it": "/?lang=it",
      "bn": "/?lang=bn",
      "id": "/?lang=id",
      "ko": "/?lang=ko",
      "tr": "/?lang=tr",
      "vi": "/?lang=vi",
      "th": "/?lang=th",
      "nl": "/?lang=nl",
      "pl": "/?lang=pl",
      "mr": "/?lang=mr",
      "ta": "/?lang=ta",
      "te": "/?lang=te",
      "gu": "/?lang=gu",
      "ur": "/?lang=ur",
      "x-default": "/",
    },
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "TheSmartMag | AI Tech Innovations, Quant Trading, Prop Firms & Luxury Travel",
    description:
      "Premier digital publication & AI intelligence hub featuring artificial intelligence breakthroughs, prop trading firm reviews & promo codes, algorithmic finance, and verified luxury travel itineraries.",
    url: siteUrl,
    siteName: "TheSmartMag",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "TheSmartMag - Frontier AI, Quant Trading & Luxury Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheSmartMag | AI Tech Innovations, Quant Trading, Prop Firms & Luxury Travel",
    description:
      "Premier digital publication & AI intelligence hub featuring artificial intelligence breakthroughs, prop trading firm reviews & promo codes, algorithmic finance, and verified luxury travel itineraries.",
    creator: "@thesmartmag",
    site: "@thesmartmag",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
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
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="-PKXYTi8BG4RF03is2wZFBpFZD949436znZp5h9agKI" />
        <meta name="google-site-verification" content="4rMlrKZ5JALf5abCB0z2hxmP7sqgeFEoQVzhWosm3b0" />
        <meta name="google-site-verification" content="googlea87b1dee8479f0e4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Google AdSense Account Verification Meta & Ad Engine */}
        <meta name="google-adsense-account" content="ca-pub-9768860457233655" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9768860457233655"
          crossOrigin="anonymous"
        />

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
                    "TheSmartMag is a premier digital publication and AI-powered intelligence platform delivering in-depth insights on artificial intelligence, algorithmic trading, prop firm comparisons & promo codes, software engineering, and verified worldwide luxury travel itineraries & booking deals.",
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
            <MonetagProvider>
              {children}
              <ExitIntentModal />
              <FloatingSubscribeButton />
              <GlobalBlogAssistant />
            </MonetagProvider>
          </VipAuthProvider>
        </TravelCurrencyProvider>
      </body>
    </html>
  );
}
