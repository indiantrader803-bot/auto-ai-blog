import { calculateReadingTime, generateSlug } from "../utils";

export interface AffiliateRule {
  keyword: string;
  url: string;
  label?: string;
}

export const DEFAULT_AFFILIATE_RULES: AffiliateRule[] = [
  // 🏆 1. High-Converting Prop Trading Challenge Links
  {
    keyword: "prop firm",
    url: "https://mffu.com/f/85f1f73f30",
    label: "MyFundedFutures - Up to $300k Funded Trading Accounts",
  },
  {
    keyword: "futures trading",
    url: "https://mffu.com/f/85f1f73f30",
    label: "MyFundedFutures (90% Profit Split & Fast Payouts)",
  },
  {
    keyword: "funded account",
    url: "https://mffu.com/f/85f1f73f30",
    label: "Pass Your Trading Evaluation & Get Funded on MFFU",
  },
  {
    keyword: "forex trading",
    url: "https://blueguardian.com/?afmc=2cbu",
    label: "Blue Guardian Prop Firm (Unlimited Days & Guardian Protector)",
  },
  {
    keyword: "currency trading",
    url: "https://blueguardian.com/?afmc=2cbu",
    label: "Blue Guardian $400k Forex & CFD Challenge",
  },
  {
    keyword: "technical analysis",
    url: "https://mffu.com/f/85f1f73f30",
    label: "Trade Institutional Breakouts with MFFU Funded Accounts",
  },
  {
    keyword: "breakout levels",
    url: "https://blueguardian.com/?afmc=2cbu",
    label: "Execute Live Breakout Trades on Blue Guardian",
  },

  // 📦 2. Direct Amazon Verified Shortlinks (autoaiblog-21)
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
  {
    keyword: "iPhone",
    url: "https://www.amazon.in/s?k=apple+iphone+15+16+pro&tag=autoaiblog-21",
    label: "Check Best Apple iPhone Deals on Amazon",
  },
  {
    keyword: "SSD",
    url: "https://www.amazon.in/s?k=samsung+990+pro+nvme+ssd&tag=autoaiblog-21",
    label: "High-Speed NVMe SSD Storage on Amazon",
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

  let insertedCount = 0;
  for (const rule of affiliateRules) {
    if (insertedCount >= 3) break;
    const regex = new RegExp(`\\b(${rule.keyword})\\b`, "i");
    if (regex.test(processedContent)) {
      processedContent = processedContent.replace(
        regex,
        `[$1](${rule.url} "${rule.label || rule.keyword}")`
      );
      insertedCount++;
    }
  }

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
  siteUrl: string = "https://auto-ai-blog-web.onrender.com"
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
      name: "SmartMag Tech Editorial Board",
    },
    publisher: {
      "@type": "Organization",
      name: "SmartMag Tech Chronicle",
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
