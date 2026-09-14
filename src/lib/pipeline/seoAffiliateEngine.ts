import { calculateReadingTime, generateSlug } from "../utils";

export interface AffiliateRule {
  keyword: string;
  url: string;
  label?: string;
}

export const DEFAULT_AFFILIATE_RULES: AffiliateRule[] = [
  // ⚡ Pocket Option Official High-Converting Smart-Links (50% Deposit Bonus: 50START)
  {
    keyword: "Pocket Option",
    url: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option Trading - Claim 50% Deposit Bonus (Code: 50START)",
  },
  {
    keyword: "binary options",
    url: "https://v4.lands-po.com/en/land/001-QT-03?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option Quick Trading Terminal (Up to 96% Payout, Code: 50START)",
  },
  {
    keyword: "quick trading",
    url: "https://v4.lands-po.com/en/land/001-QT-05?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option High Payout Trading Platform (Code: 50START)",
  },
  {
    keyword: "trading signals",
    url: "https://v4.lands-po.com/en/land/009-QT-01?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Free Built-In Trading Signals & Copy Trading on Pocket Option",
  },
  {
    keyword: "options trading",
    url: "https://v4.lands-po.com/en/land/009-QT-07?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option Pro Trader Suite (50% Deposit Bonus: 50START)",
  },
  {
    keyword: "copy trading",
    url: "https://v4.lands-po.com/en/land/009-QT-09?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option Social Copy Trading Terminal (Code: 50START)",
  },
  {
    keyword: "social trading",
    url: "https://v4.lands-po.com/en/land/009-QT-10?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Follow Top 1% Ranked Master Traders on Pocket Option",
  },
  {
    keyword: "trading strategies",
    url: "https://v4.lands-po.com/en/land/009-QT-11?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "High Probability Technical Indicators & Strategies on Pocket Option",
  },
  {
    keyword: "algo trading",
    url: "https://v4.lands-po.com/en/land/009-QT-12?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option Algorithmic Fast Execution Engine",
  },
  {
    keyword: "demo trading",
    url: "https://v4.lands-po.com/en/land/009-QT-14?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Practice with $10,000 Free Refillable Pocket Option Demo Account",
  },
  {
    keyword: "forex signals",
    url: "https://v4.lands-po.com/en/land/009-QT-15?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Automated Currency & Forex Signals with Pocket Option (Code: 50START)",
  },
  {
    keyword: "chart patterns",
    url: "https://v4.lands-po.com/en/land/009-QT-17?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Trade Candlestick Breakouts with Pocket Option High Yields",
  },
  {
    keyword: "trading bot",
    url: "https://v4.lands-po.com/en/land/009-QT-19?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option Automated Bot & Express Orders (Code: 50START)",
  },
  {
    keyword: "deposit bonus",
    url: "https://v4.lands-po.com/en/land/009-QT-21?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Claim Instant 50% Trading Balance Match with Promo Code 50START",
  },
  {
    keyword: "crypto signals",
    url: "https://v4.lands-po.com/en/land/009-QT-22?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Live Crypto & Altcoin Trading Signals on Pocket Option",
  },
  {
    keyword: "mobile trading",
    url: "https://v4.lands-po.com/en/land/009-QT-28?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Pocket Option Mobile Trading App for iOS & Android (Code: 50START)",
  },
  {
    keyword: "scalping strategy",
    url: "https://v4.lands-po.com/en/land/009-QT-29?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Execute High-Speed 5s-60s Scalping Trades on Pocket Option",
  },
  {
    keyword: "trading tournament",
    url: "https://v4.lands-po.com/en/land/011-QT-04?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Join Pocket Option Daily Free & Cash Prize Trading Tournaments",
  },
  {
    keyword: "vip trading",
    url: "https://v4.lands-po.com/en/land/012-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Unlock VIP Account Status & Higher Payout Percentages on Pocket Option",
  },
  {
    keyword: "risk free trade",
    url: "https://v4.lands-po.com/en/land/014-QT-03?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Claim Risk-Free Trading Gems & Cashback on Pocket Option (50START)",
  },
  {
    keyword: "fast payouts",
    url: "https://v4.lands-po.com/en/land/018-QT-01?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
    label: "Zero Fee Instant Crypto, UPI & Bank Card Payouts with Pocket Option",
  },
  // 🏆 1. High-Converting Prop Trading & Crypto Exchange Links
  {
    keyword: "Delta Exchange",
    url: "https://www.delta.exchange/?code=YXQSZA",
    label: "Delta Exchange - Trade Crypto Derivatives & Options (Code: YXQSZA)",
  },
  {
    keyword: "crypto options",
    url: "https://www.delta.exchange/?code=YXQSZA",
    label: "Delta Exchange BTC & ETH Options (Up to 100x Leverage, Code: YXQSZA)",
  },
  {
    keyword: "crypto futures",
    url: "https://www.delta.exchange/?code=YXQSZA",
    label: "Delta Exchange Perpetual Futures with Low Fees (Code: YXQSZA)",
  },
  {
    keyword: "CoinSwitch",
    url: "https://coinswitch.co/pro/signup?code=NLfEITW",
    label: "CoinSwitch Pro - Multi-Exchange Trading Terminal (Code: NLfEITW)",
  },
  {
    keyword: "CoinSwitch Pro",
    url: "https://coinswitch.co/pro/signup?code=NLfEITW",
    label: "CoinSwitch Pro Trading Terminal (Lowest Fees & Instant INR Deposit, Code: NLfEITW)",
  },
  {
    keyword: "crypto trading",
    url: "https://coinswitch.co/pro/signup?code=lUNNbKE",
    label: "Trade 100+ Crypto Pairs on CoinSwitch Pro (Code: lUNNbKE)",
  },
  {
    keyword: "bitcoin",
    url: "https://www.delta.exchange/?code=YXQSZA",
    label: "Trade Bitcoin & Altcoins on Delta Exchange (Code: YXQSZA)",
  },
  {
    keyword: "AquaFunded",
    url: "https://www.aquafunded.com/?afmc=6e9",
    label: "AquaFunded Prop Firm - Scale to $200k with Fast Payouts (Code: 6e9)",
  },
  {
    keyword: "Aqua Funded",
    url: "https://www.aquafunded.com/?afmc=6e9",
    label: "AquaFunded Evaluation Challenge (Up to 90% Profit Split, Code: 6e9)",
  },
  {
    keyword: "aquafunded",
    url: "https://www.aquafunded.com/?afmc=6e9",
    label: "AquaFunded Official Challenge Portal (Code: 6e9)",
  },
  {
    keyword: "Atlas Funded",
    url: "https://affiliates.atlasfunded.com/Tracking/click/?affid=12275&campaign=11320&product_id=1&t_type=Register&t_lang=EN",
    label: "Atlas Funded - Trade $200k Funded Challenge (20% Discount Auto-Applied)",
  },
  {
    keyword: "AtlasFunded",
    url: "https://affiliates.atlasfunded.com/Tracking/click/?affid=12275&campaign=11320&product_id=1&t_type=Register&t_lang=EN",
    label: "Atlas Funded Prop Trading Evaluation (Rapid Scaling & Fast Payouts)",
  },
  {
    keyword: "atlas funded",
    url: "https://affiliates.atlasfunded.com/Tracking/click/?affid=12275&campaign=11320&product_id=1&t_type=Register&t_lang=EN",
    label: "Atlas Funded Challenge Registration Portal",
  },
  {
    keyword: "Fundex Prop",
    url: "https://prop.fundex.gg/rc/GGG34QEO",
    label: "Fundex Prop $100k-$200k Funded Trading Challenge (Code: GGG34QEO)",
  },
  {
    keyword: "Fundex",
    url: "https://prop.fundex.gg/rc/GGG34QEO",
    label: "Fundex Prop Trading - Scale to $200k with Fast Payouts (Code: GGG34QEO)",
  },
  {
    keyword: "CK Capital",
    url: "https://app.ckcapital.co.uk/signup/ALPROP/",
    label: "CK Capital Funded Prop Trading (Code: ALPROP)",
  },
  {
    keyword: "prop firm",
    url: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
    label: "Funded Trader Markets - Trade Up to $200k Capital with Rapid Scaling",
  },
  {
    keyword: "Funded Trader Markets",
    url: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
    label: "Funded Trader Markets (Instant Evaluation & Scaling)",
  },
  {
    keyword: "capital scaling",
    url: "https://app.ckcapital.co.uk/signup/ALPROP/",
    label: "CK Capital Institutional Capital Program (Code: ALPROP)",
  },
  {
    keyword: "futures trading",
    url: "https://mffu.com/f/85f1f73f30",
    label: "MyFundedFutures (90% Profit Split & Fast Payouts)",
  },
  {
    keyword: "funded account",
    url: "https://app.ckcapital.co.uk/signup/ALPROP/",
    label: "CK Capital $200k Funded Trading Challenge (Code: ALPROP)",
  },
  {
    keyword: "forex trading",
    url: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
    label: "Funded Trader Markets Forex & CFD Funded Challenges",
  },
  {
    keyword: "currency trading",
    url: "https://app.ckcapital.co.uk/signup/ALPROP/",
    label: "CK Capital FX & Derivatives Capital Program",
  },
  {
    keyword: "risk management",
    url: "https://app.ckcapital.co.uk/signup/ALPROP/",
    label: "CK Capital Advanced Trader Risk Architecture",
  },
  {
    keyword: "technical analysis",
    url: "https://fundedtradermarkets.com/ref/arnab?campaign=smartmag-blog",
    label: "Trade Technical Setups with Funded Trader Markets Capital",
  },
  {
    keyword: "breakout levels",
    url: "https://app.ckcapital.co.uk/signup/ALPROP/",
    label: "Execute Live Breakouts with CK Capital Funding (Code: ALPROP)",
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

  // ✈️ 3. Travel, Expeditions & Destination Affiliate Deals (Amazon tag: autoaiblog-21)
  {
    keyword: "travel backpack",
    url: "https://www.amazon.in/s?k=travel+backpack+trekking+rucksack+50L+60L&tag=autoaiblog-21",
    label: "Top-Rated Trekking & Travel Backpacks on Amazon (Tag: autoaiblog-21)",
  },
  {
    keyword: "trekking gear",
    url: "https://www.amazon.in/s?k=trekking+gear+hiking+poles+waterproof+jacket&tag=autoaiblog-21",
    label: "Check Complete Trekking & Camping Gear on Amazon",
  },
  {
    keyword: "hiking boots",
    url: "https://www.amazon.in/s?k=waterproof+trekking+shoes+hiking+boots+men+women&tag=autoaiblog-21",
    label: "Best All-Terrain Hiking & Trekking Boots on Amazon",
  },
  {
    keyword: "GoPro",
    url: "https://www.amazon.in/s?k=gopro+hero+action+camera+4k&tag=autoaiblog-21",
    label: "GoPro & Action Cameras for Travel Photography on Amazon",
  },
  {
    keyword: "action camera",
    url: "https://www.amazon.in/s?k=action+camera+waterproof+4k+gopro+dji&tag=autoaiblog-21",
    label: "Top 4K Waterproof Action Cameras on Amazon",
  },
  {
    keyword: "travel luggage",
    url: "https://www.amazon.in/s?k=samsonite+american+tourister+trolley+luggage+set&tag=autoaiblog-21",
    label: "Browse Premium Travel Luggage & Suitcases on Amazon",
  },
  {
    keyword: "travel adapter",
    url: "https://www.amazon.in/s?k=universal+travel+adapter+all+in+one+fast+charging&tag=autoaiblog-21",
    label: "Universal All-in-One Worldwide Travel Adapter on Amazon",
  },
  {
    keyword: "power bank",
    url: "https://www.amazon.in/s?k=power+bank+20000mah+65w+fast+charging&tag=autoaiblog-21",
    label: "High-Capacity 20,000mAh Fast Charging Power Banks on Amazon",
  },
  {
    keyword: "noise cancelling headphones",
    url: "https://www.amazon.in/s?k=sony+wh-1000xm5+bose+noise+cancelling+headphones&tag=autoaiblog-21",
    label: "Top Flight & Travel Noise-Cancelling Headphones on Amazon",
  },
  {
    keyword: "travel insurance",
    url: "https://www.booking.com/index.html?aid=2026803",
    label: "Compare Comprehensive Worldwide Travel & Medical Insurance",
  },
  {
    keyword: "hotel booking",
    url: "https://www.booking.com/index.html?aid=2026803",
    label: "Book Top-Rated Hotels & Luxury Resorts with Free Cancellation",
  },
  {
    keyword: "flight booking",
    url: "https://www.skyscanner.com",
    label: "Find Lowest Airfare & Flight Deals Across 1000+ Airlines",
  },
  {
    keyword: "Kerala",
    url: "https://www.booking.com/city/in/kochi.html?aid=2026803",
    label: "Explore Top Heritage Resorts & Alleppey Houseboat Stays in Kerala",
  },
  {
    keyword: "Ladakh",
    url: "https://www.amazon.in/s?k=high+altitude+cold+weather+thermal+jacket+ladakh&tag=autoaiblog-21",
    label: "Best Ladakh High-Altitude Winter Gear & Thermal Layers on Amazon",
  },
  {
    keyword: "Kashmir",
    url: "https://www.booking.com/city/in/srinagar.html?aid=2026803",
    label: "Book Traditional Dal Lake Houseboats & Gulmarg Resorts in Kashmir",
  },
  {
    keyword: "Goa",
    url: "https://www.booking.com/region/in/goa.html?aid=2026803",
    label: "Top Beachfront Resorts & Boutique Villas in North & South Goa",
  },
  {
    keyword: "Rajasthan",
    url: "https://www.booking.com/region/in/rajasthan.html?aid=2026803",
    label: "Book Royal Heritage Palace Hotels in Jaipur, Udaipur & Jodhpur",
  },
  {
    keyword: "Japan",
    url: "https://www.booking.com/country/jp.html?aid=2026803",
    label: "Browse Best Ryokans & City Hotels in Tokyo, Kyoto & Osaka",
  },
  {
    keyword: "Switzerland",
    url: "https://www.booking.com/country/ch.html?aid=2026803",
    label: "Book Swiss Alps Alpine Chalets & Scenic Panoramic Train Passes",
  },
  {
    keyword: "Iceland",
    url: "https://www.booking.com/country/is.html?aid=2026803",
    label: "Top Northern Lights Hotels & Golden Circle Tour Stays in Iceland",
  },
  {
    keyword: "Bali",
    url: "https://www.booking.com/region/id/bali.html?aid=2026803",
    label: "Explore Private Jungle Pool Villas in Ubud & Beach Clubs in Seminyak",
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
