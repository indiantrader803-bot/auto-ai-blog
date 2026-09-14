import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ExitIntentModal from "@/components/growth/ExitIntentModal";
import FloatingSubscribeButton from "@/components/growth/FloatingSubscribeButton";
import GlobalBlogAssistant from "@/components/chat/GlobalBlogAssistant";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | SmartMag Tech Chronicle",
    default: "SmartMag Tech - Frontier AI & Engineering Chronicle",
  },
  description:
    "Autonomous editorial technology publication covering breakthroughs in artificial intelligence, engineering architecture, hardware benchmarks, and future trends.",
  keywords: [
    "SmartMag Tech",
    "AI News",
    "Artificial Intelligence",
    "Autonomous Agents",
    "Machine Learning",
    "Tech Reviews",
    "Software Engineering",
    "Cloud Architecture",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "SmartMag Tech - Frontier AI & Engineering Chronicle",
    description: "Autonomous editorial technology publication covering breakthroughs in artificial intelligence and engineering.",
    url: siteUrl,
    siteName: "SmartMag Tech Chronicle",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartMag Tech - Frontier AI & Engineering Chronicle",
    description: "Autonomous editorial technology publication covering breakthroughs in artificial intelligence and engineering.",
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
        <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                      serif: ['"Lora"', 'Georgia', 'serif'],
                      mono: ['"JetBrains Mono"', 'monospace'],
                    },
                    colors: {
                      primary: {
                        50: '#eef2ff',
                        100: '#e0e7ff',
                        200: '#c7d2fe',
                        300: '#a5b4fc',
                        400: '#818cf8',
                        500: '#6366f1',
                        600: '#4f46e5',
                        700: '#4338ca',
                        800: '#3730a3',
                        900: '#312e81',
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
        {/* Google AdSense Account Verification Meta & Ad Engine */}
        <meta name="google-adsense-account" content="ca-pub-9768860457233655" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9768860457233655"
          crossOrigin="anonymous"
        />

        {/* Global Google Translate Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                try {
                  new google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,bn,hi,es,fr,de,zh-CN,zh-TW,ja,ko,ar,pt,ru,it,nl,tr,vi,th,id,pl,mr,te,ta,gu,kn,pa,ur',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                  }, 'google_translate_element');
                } catch(e) {}
              }
            `,
          }}
        />
        {/* Travelpayouts Global Affiliate & Travel Widget Script */}
        <script
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          data-no-defer="1"
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                  var script = document.createElement("script");
                  script.async = true;
                  script.setAttribute("data-cmp-ab","2");
                  script.setAttribute("data-noptimize","1");
                  script.setAttribute("data-cfasync","false");
                  script.setAttribute("data-wpfc-render","false");
                  script.setAttribute("seraph-accel-crit","1");
                  script.setAttribute("data-no-defer","1");
                  script.src = 'https://tpembars.com/NTczNzkw.js?t=573790';
                  document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white font-sans">
        <div id="google_translate_element" style={{ display: "none" }} />
        {children}
        <ExitIntentModal />
        <FloatingSubscribeButton />
        <GlobalBlogAssistant />
      </body>
    </html>
  );
}
