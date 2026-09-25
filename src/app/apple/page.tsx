import type { Metadata } from "next";
import Script from "next/script";
import AppleNavbar from "@/components/apple/AppleNavbar";
import AppleHero from "@/components/apple/AppleHero";
import IphoneShowcase from "@/components/apple/IphoneShowcase";
import ComparisonEngine from "@/components/apple/ComparisonEngine";
import EcosystemExplorer from "@/components/apple/EcosystemExplorer";
import AppleDeals from "@/components/apple/AppleDeals";
import HighCommissionAccessories from "@/components/apple/HighCommissionAccessories";
import DeviceFinderQuiz from "@/components/apple/DeviceFinderQuiz";
import UpgradeCalculator from "@/components/apple/UpgradeCalculator";
import AiAppleAssistant from "@/components/apple/AiAppleAssistant";
import AppleFaqSection from "@/components/apple/AppleFaqSection";
import StickyMobileBuyBar from "@/components/apple/StickyMobileBuyBar";
import { APPLE_FAQ_ITEMS, APPLE_PRODUCTS } from "@/data/appleData";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

export const metadata: Metadata = {
  title: "Apple Hub 2026: iPhone 18, MacBook, Watch, Deals & Comparisons | TheSmartMag",
  description:
    "The official TheSmartMag Apple Hub 2026. Compare iPhone 18 Pro Max vs iPhone 17 Pro Max, discover verified daily deals across Flipkart, Croma, Reliance Digital & Amazon, calculate trade-in values, and get AI buying recommendations.",
  keywords: [
    "Apple Hub 2026",
    "iPhone 18 Pro Max price India",
    "iPhone 18 launch date",
    "iPhone 18 vs iPhone 17 Pro Max",
    "Best Apple deals India",
    "Croma iPhone 18 offers",
    "Flipkart iPhone discount",
    "MacBook Pro M5",
    "Apple Watch Ultra 3",
    "AirPods Pro 3",
    "A20 Pro TSMC 2nm",
    "Apple trade in calculator",
  ],
  alternates: {
    canonical: `${siteUrl}/apple`,
  },
  openGraph: {
    title: "Apple Hub 2026 | iPhone 18, MacBook, Watch, Deals & Spec Comparisons",
    description:
      "Explore the 2026 Apple lineup. Side-by-side spec comparison engine, verified retailer bank offers across India, high-utility MagSafe accessories, and trade-in valuation calculator.",
    url: `${siteUrl}/apple`,
    siteName: "TheSmartMag Apple Hub",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "TheSmartMag Apple Hub 2026 - iPhone 18 Pro Max",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Hub 2026: iPhone 18 & Official Lineup | TheSmartMag",
    description: "Compare iPhone 18 models, track live price drops, and get verified retail discounts in India.",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=80"],
  },
};

export default function AppleHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/apple#webpage`,
        url: `${siteUrl}/apple`,
        name: "Apple Hub 2026: iPhone 18, MacBook, Watch, Deals & Comparisons",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "TheSmartMag",
          url: siteUrl,
        },
        description:
          "Permanent Apple intelligence hub featuring iPhone 18 launch specs, side-by-side comparison engine, live price tracker across Indian retailers, and trade-in calculators.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Apple Hub 2026",
            item: `${siteUrl}/apple`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: APPLE_FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        name: "Top Apple Devices 2026",
        itemListElement: APPLE_PRODUCTS.slice(0, 5).map((p, idx) => ({
          "@type": "Product",
          position: idx + 1,
          name: p.name,
          image: p.heroImage,
          description: p.tagline,
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: p.startingPriceInr,
            highPrice: p.originalPriceInr || p.startingPriceInr,
            offerCount: p.retailers.length,
            offers: p.retailers.map((r) => ({
              "@type": "Offer",
              price: r.priceInr,
              priceCurrency: "INR",
              seller: {
                "@type": "Organization",
                name: r.store,
              },
              availability: "https://schema.org/InStock",
              url: r.affiliateUrl,
            })),
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: p.rating,
            reviewCount: p.reviewCount,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans pb-16 md:pb-0">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dedicated Apple Sub-Navigation Bar */}
      <AppleNavbar />

      {/* Hero Section */}
      <AppleHero />

      {/* Flagship iPhone 18 Showcase */}
      <IphoneShowcase />

      {/* Interactive Model A vs Model B Comparison Engine */}
      <ComparisonEngine />

      {/* Full Ecosystem Explorer (MacBook, iPad, Watch, AirPods, Accessories) */}
      <EcosystemExplorer />

      {/* Daily Updated Deals & Price Drops */}
      <AppleDeals />

      {/* High-Commission Essential Accessories (MagSafe, Cases, Power Banks) */}
      <HighCommissionAccessories />

      {/* Device Finder Algorithmic Quiz */}
      <DeviceFinderQuiz />

      {/* Trade-In Upgrade Valuation Calculator */}
      <UpgradeCalculator />

      {/* AI Apple Intelligence Assistant */}
      <AiAppleAssistant />

      {/* Rich Snippet FAQ Accordion */}
      <AppleFaqSection />

      {/* Mobile Sticky Quick Buy Bar */}
      <StickyMobileBuyBar />
    </div>
  );
}
