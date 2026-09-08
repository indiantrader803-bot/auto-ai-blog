import { calculateReadingTime, generateSlug } from "../utils";

export interface AffiliateRule {
  keyword: string;
  url: string;
  label?: string;
}

export const DEFAULT_AFFILIATE_RULES: AffiliateRule[] = [
  // User's Direct Amazon Verified Shortlinks
  {
    keyword: "MacBook",
    url: "https://amzn.to/3UXVtTR",
    label: "Check Latest Apple MacBook Deals on Amazon",
  },
  {
    keyword: "laptop",
    url: "https://amzn.to/3VjFaRp",
    label: "Browse Best Developer Laptops on Amazon",
  },
  {
    keyword: "RTX 4090",
    url: "https://amzn.to/4gJpL5u",
    label: "Check RTX 4090 & Top GPUs on Amazon",
  },
  {
    keyword: "monitor",
    url: "https://amzn.to/4qX7Z1S",
    label: "Top 4K & Ultrawide Coding Monitors on Amazon",
  },
  {
    keyword: "mechanical keyboard",
    url: "https://amzn.to/3SxPMLN",
    label: "Best Developer Mechanical Keyboards on Amazon",
  },
  {
    keyword: "developer setup",
    url: "https://amzn.to/3UXVtTR",
    label: "View Top Developer Workstation Gear on Amazon",
  },

  // Auto-Generated Direct Amazon Affiliate Products (autoaiblog-21)
  {
    keyword: "iPhone",
    url: "https://www.amazon.in/s?k=apple+iphone+15+16+pro&tag=autoaiblog-21",
    label: "Check Best Apple iPhone Deals on Amazon",
  },
  {
    keyword: "iPad",
    url: "https://www.amazon.in/s?k=apple+ipad+pro+air&tag=autoaiblog-21",
    label: "Explore Apple iPad & Tablet Deals on Amazon",
  },
  {
    keyword: "headphones",
    url: "https://www.amazon.in/s?k=sony+wh1000xm5+noise+cancelling+headphones&tag=autoaiblog-21",
    label: "Top Noise-Cancelling Headphones on Amazon",
  },
  {
    keyword: "SSD",
    url: "https://www.amazon.in/s?k=samsung+990+pro+nvme+ssd&tag=autoaiblog-21",
    label: "High-Speed NVMe SSD Storage on Amazon",
  },
  {
    keyword: "smartwatch",
    url: "https://www.amazon.in/s?k=apple+watch+ultra+samsung+galaxy+watch&tag=autoaiblog-21",
    label: "Latest Smartwatches & Fitness Trackers on Amazon",
  },
  {
    keyword: "webcam",
    url: "https://www.amazon.in/s?k=4k+streaming+webcam+for+work&tag=autoaiblog-21",
    label: "Best 4K Professional Webcams on Amazon",
  },
  {
    keyword: "ergonomic chair",
    url: "https://www.amazon.in/s?k=ergonomic+office+chair+for+coding&tag=autoaiblog-21",
    label: "Top Ergonomic Workstation Chairs on Amazon",
  },
  {
    keyword: "router",
    url: "https://www.amazon.in/s?k=wifi+6e+wifi+7+high+speed+router&tag=autoaiblog-21",
    label: "High-Speed WiFi 6/7 Gaming & Dev Routers on Amazon",
  },
  {
    keyword: "desk setup",
    url: "https://www.amazon.in/s?k=height+adjustable+standing+desk&tag=autoaiblog-21",
    label: "Motorized Standing Desks & Setups on Amazon",
  },
  {
    keyword: "power bank",
    url: "https://www.amazon.in/s?k=anker+100w+fast+charging+power+bank&tag=autoaiblog-21",
    label: "High-Capacity Laptop Fast-Charging Power Banks on Amazon",
  },
  {
    keyword: "TradingView",
    url: "https://www.tradingview.com/?aff_id=autoai",
    label: "TradingView Pro Charts & Technical Screeners",
  },
  {
    keyword: "Zerodha",
    url: "https://zerodha.com/open-account?c=AUTOAI",
    label: "Zerodha (Zero Brokerage Equity & Demat)",
  },
  {
    keyword: "Angel One",
    url: "https://www.angelone.in/?ref=AUTOAI",
    label: "Angel One SmartAPI & Options Trading",
  },
  {
    keyword: "Interactive Brokers",
    url: "https://www.interactivebrokers.com/?ref=autoai",
    label: "Interactive Brokers (Institutional Global Equities)",
  },
  {
    keyword: "demat account",
    url: "https://zerodha.com/open-account?c=AUTOAI",
    label: "Open Verified Zero Brokerage Demat Account",
  },
  {
    keyword: "technical analysis",
    url: "https://www.tradingview.com/?aff_id=autoai",
    label: "Live Candlestick & Technical Indicators on TradingView",
  },
  {
    keyword: "cloud hosting",
    url: "https://www.digitalocean.com/?refcode=autoai",
    label: "DigitalOcean Cloud ($200 Free Developer Credit)",
  },
  {
    keyword: "GPU",
    url: "https://www.amazon.in/s?k=nvidia+gpu+graphics+card&tag=autoaiblog-21",
    label: "Explore High-Performance GPUs on Amazon",
  },
  {
    keyword: "Cursor",
    url: "https://cursor.com/?ref=autoai",
    label: "Cursor AI Next-Gen Code Editor",
  },
  {
    keyword: "VPN",
    url: "https://nordvpn.com/?ref=autoai",
    label: "NordVPN Threat Protection & Encryption",
  },
  {
    keyword: "AI tools",
    url: "https://notion.so/?ref=autoai",
    label: "Notion AI Collaborative Workspace",
  },
  {
    keyword: "web development",
    url: "https://vercel.com/?ref=autoai",
    label: "Vercel Edge & Serverless Platform",
  },
];

export function enrichSeoAndAffiliates(
  rawContent: string,
  title: string,
  category: string,
  tags: string[],
  faq: Array<{ question: string; answer: string }>,
  customAffiliates?: AffiliateRule[]
): {
  processedContent: string;
  slug: string;
  readTimeMinutes: number;
  faqJson: string;
  seoKeywords: string[];
} {
  const slug = generateSlug(title);
  const readTimeMinutes = calculateReadingTime(rawContent);
  const faqJson = JSON.stringify(faq);

  const affiliateRules = [
    ...(customAffiliates || []),
    ...DEFAULT_AFFILIATE_RULES,
  ];

  let processedContent = rawContent;

  // Insert contextual affiliate callout badge if relevant keywords match
  let insertedCount = 0;
  for (const rule of affiliateRules) {
    if (insertedCount >= 2) break; // Keep articles natural, max 2 affiliate links
    const regex = new RegExp(`\\b(${rule.keyword})\\b`, "i");
    if (regex.test(processedContent)) {
      // Replace only first match
      processedContent = processedContent.replace(
        regex,
        `[$1](${rule.url} "${rule.label || rule.keyword}")`
      );
      insertedCount++;
    }
  }

  // Ensure unique SEO keywords
  const seoKeywords = Array.from(
    new Set([category.toLowerCase(), ...tags.map((t) => t.toLowerCase())])
  );

  return {
    processedContent,
    slug,
    readTimeMinutes,
    faqJson,
    seoKeywords,
  };
}

export function generateStructuredSchema(
  title: string,
  excerpt: string,
  slug: string,
  publishedAt: Date | string,
  featuredImage?: string,
  faq?: Array<{ question: string; answer: string }>,
  siteUrl: string = "http://localhost:3000"
) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    image: featuredImage || `${siteUrl}/default-og.jpg`,
    datePublished: new Date(publishedAt).toISOString(),
    dateModified: new Date(publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: "AutoAI Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "AutoAI Chronicle",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
  };

  if (!faq || faq.length === 0) {
    return JSON.stringify(articleSchema);
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return JSON.stringify([articleSchema, faqSchema]);
}
