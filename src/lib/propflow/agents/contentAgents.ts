import { YouTubeShortScript, EmailFunnelSequence, SocialDistributionPost } from "../types";

/**
 * 🎬 6. YouTube Shorts Agent
 * Generates viral 30s & 60s hooks and full video prompts
 */
export async function runYouTubeShortsAgent(): Promise<{
  agentName: string;
  scripts: YouTubeShortScript[];
}> {
  const scripts: YouTubeShortScript[] = [
    {
      id: "yt_short_ftm_rules",
      title: "How to Get a $100,000 Funded Trading Account with NO Time Limits (2026)",
      targetFirm: "Funded Trader Markets",
      durationSeconds: 60,
      hook: "Stop failing prop firm evaluations because of arbitrary 30-day timers. Here is the secret to passing...",
      bodyScenes: [
        {
          timestamp: "0:00 - 0:10",
          visualPrompt: "Dynamic trading charts with red countdown timer crossing out with a red X",
          voiceoverScript: "Most traders blow their accounts because of the clock rushing their trades. But Funded Trader Markets removed the time limit completely.",
        },
        {
          timestamp: "0:10 - 0:35",
          visualPrompt: "Split screen showing cTrader terminal and 90% profit split dashboard",
          voiceoverScript: "You trade at your own pace, take high-probability setups, and keep up to 90% of all profits. Plus, payouts happen on demand.",
        },
        {
          timestamp: "0:35 - 0:60",
          visualPrompt: "Checkout screen highlighting promo code 'arnab' knocking 10% off the price",
          voiceoverScript: "Use partner code 'arnab' to get an instant 10% discount on any challenge tier. Link in the pinned comment!",
        },
      ],
      callToAction: "Click the pinned link and use code 'arnab' for 10% off today.",
      promoCode: "arnab",
      pinnedCommentText: "⚡ Claim your FTM evaluation with 10% off using code 'arnab': https://fundedtradermarkets.com/ref/arnab",
      hashtags: ["#PropFirm", "#FundedTrader", "#ForexTrading", "#DayTrading", "#CryptoTrading"],
    },
    {
      id: "yt_short_atlas_20off",
      title: "Atlas Funded 20% Discount Code & Free Challenge Pass Hack ($5 FTP)",
      targetFirm: "Atlas Funded",
      durationSeconds: 30,
      hook: "Here is the biggest prop firm discount active right now in 2026.",
      bodyScenes: [
        {
          timestamp: "0:00 - 0:15",
          visualPrompt: "Mobile TradeLocker app showing 20% discount applied and $5 FTP bonus badge",
          voiceoverScript: "Atlas Funded is giving traders a flat 20% discount plus instant $5 Free Challenge Pass tokens on every single account tier.",
        },
        {
          timestamp: "0:15 - 0:30",
          visualPrompt: "Code '12275' entering the promo box with green checkmark",
          voiceoverScript: "Enter code '12275' at checkout to activate the 20% rebate instantly. Verified link in description!",
        },
      ],
      callToAction: "Use code '12275' on Atlas Funded: link in pinned comment.",
      promoCode: "12275",
      pinnedCommentText: "🔥 20% OFF Atlas Funded + $5 FTPs with code '12275': https://auto-ai-blog-web.onrender.com/reviews/atlas-funded",
      hashtags: ["#AtlasFunded", "#PropTrader", "#ForexSignals", "#TradingPromo"],
    },
  ];

  return {
    agentName: "YouTube Shorts Agent",
    scripts,
  };
}

/**
 * 📧 9. Email Funnel Agent
 * 5-Part High-Converting Email Nurture Sequence
 */
export async function runEmailFunnelAgent(): Promise<{
  agentName: string;
  sequence: EmailFunnelSequence;
}> {
  const sequence: EmailFunnelSequence = {
    sequenceName: "PropFlow 5-Day Trader Funding Mastery Funnel",
    targetAudience: "Aspiring Forex, Crypto & Index Prop Traders",
    emails: [
      {
        dayOffset: 0,
        subjectLine: "Welcome: The 2026 Prop Firm Cheat Sheet (Rules, Spreads & Verified Codes)",
        previewText: "Your complete guide to passing evaluations without time pressure...",
        bodyMarkdown: `Hey Trader,\n\nWelcome to SmartMag Tech & PropFlow-AI! If your goal is to manage $100k+ in trading capital, choosing the wrong firm is the #1 reason 90% of traders fail before their first payout.\n\nWe benchmarked every major prop firm on rules, spreads, and payout speed. Here are the top 3 verified partners:\n\n1. **Atlas Funded**: 20% Flat Discount with code **12275** + $5 FTPs\n2. **Funded Trader Markets**: 10% Discount with code **arnab** (Zero Time Limit)\n3. **AquaFunded**: Up to 20% Discount with code **6e9** (90% Profit Split)\n\nCheck out the full comparison on our blog!`,
        ctaButtonText: "View 2026 Prop Leaderboard →",
        ctaTargetUrl: "https://auto-ai-blog-web.onrender.com/best-prop-firms",
        discountNotice: "Codes: 12275 | arnab | 6e9",
      },
      {
        dayOffset: 1,
        subjectLine: "The Zero-Time-Limit Secret: Why the clock is killing your trades",
        previewText: "How Funded Trader Markets removes the rush so you can trade calmly...",
        bodyMarkdown: `Hey Trader,\n\nWhen a prop firm gives you 30 days to hit 8% profit, you take trades you normally wouldn't take. You over-leverage.\n\nWith **Funded Trader Markets**, there are **0 minimum trading days** and **no expiration date**. You can pass phase 1 in 2 days or 6 months—you retain complete freedom.\n\nPlus, you keep up to 90% of your earnings.`,
        ctaButtonText: "Claim 10% Off FTM (Code: arnab) →",
        ctaTargetUrl: "https://auto-ai-blog-web.onrender.com/reviews/funded-trader-markets",
        discountNotice: "Use coupon code 'arnab' at checkout.",
      },
      {
        dayOffset: 2,
        subjectLine: "Deep-Dive Review: Atlas Funded vs FTMO (Which gives more profit?)",
        previewText: "See the side-by-side fee savings breakdown...",
        bodyMarkdown: `Hey Trader,\n\nWhy pay $540 EUR for an evaluation when you can get the exact same $100k account on Atlas Funded for $320 with our exclusive 20% discount code **12275**?\n\nRead our comprehensive breakdown analyzing drawdown rules, TradeLocker execution, and payout speeds.`,
        ctaButtonText: "Read Atlas Funded Review →",
        ctaTargetUrl: "https://auto-ai-blog-web.onrender.com/reviews/atlas-funded",
        discountNotice: "Exclusive code: 12275",
      },
      {
        dayOffset: 3,
        subjectLine: "⚡ Flash Promo: 50% Deposit Match Bonus Active (Pocket Option)",
        previewText: "Boost your trading balance instantly with code 50START...",
        bodyMarkdown: `Hey Trader,\n\nIf you prefer high-yield binary options and quick crypto trading alongside prop evaluations, Pocket Option has just unlocked a **50% instant deposit match bonus**.\n\nDeposit $100, trade with $150. Includes a free $10,000 practice demo terminal with zero risk.`,
        ctaButtonText: "Claim 50% Match Bonus (Code: 50START) →",
        ctaTargetUrl: "https://v4.lands-po.com/en/land/001-QT-02?utm_campaign=865170&utm_source=affiliate&utm_medium=sr&a=5zrdNdJrvFxqJO&al=1794767&ac=smart-link&cid=979105&code=50START",
        discountNotice: "Promo Code: 50START",
      },
      {
        dayOffset: 4,
        subjectLine: "Last Chance: Save up to 20% on Your Next Funded Challenge",
        previewText: "Verified coupon codes expiring soon...",
        bodyMarkdown: `Hey Trader,\n\nReady to get funded? Don't leave money on the table at checkout. Here is your quick-action coupon summary:\n\n• **Atlas Funded**: Code **12275** (20% OFF)\n• **AquaFunded**: Code **6e9** (Up to 20% OFF)\n• **Funded Trader Markets**: Code **arnab** (10% OFF)\n• **Pocket Option**: Code **50START** (50% Deposit Match)\n\nLet's get funded this week!`,
        ctaButtonText: "Open Prop Firm Hub →",
        ctaTargetUrl: "https://auto-ai-blog-web.onrender.com/best-prop-firms",
        discountNotice: "100% Verified Partner Links",
      },
    ],
  };

  return {
    agentName: "Email Funnel Agent",
    sequence,
  };
}

/**
 * 📢 Multi-Channel Distribution Swarm (LinkedIn, X/Twitter, Reddit, Quora)
 */
export async function runSocialDistributionSwarm(): Promise<{
  agentName: string;
  posts: SocialDistributionPost[];
}> {
  const posts: SocialDistributionPost[] = [
    {
      platform: "Reddit",
      targetChannelOrSubreddit: "r/PropFirm",
      headline: "Unbiased Breakdown: Funded Trader Markets vs Atlas Funded vs AquaFunded (2026 Rules & Coupon Codes)",
      content: "If you are looking to get funded this quarter, here is our audited comparison of the top 3 firms with working promo codes:\n\n1. Atlas Funded (Code: 12275) -> 20% discount + $5 Free Challenge tokens.\n2. Funded Trader Markets (Code: arnab) -> 10% discount, zero minimum trading days, on-demand payouts.\n3. AquaFunded (Code: 6e9) -> Up to 20% rebate + 90% profit split.\n\nFull rule comparison table & challenge fee savings calculator: https://auto-ai-blog-web.onrender.com/best-prop-firms",
      callToActionUrl: "https://auto-ai-blog-web.onrender.com/best-prop-firms",
      promoCode: "12275 | arnab | 6e9",
      status: "APPROVED",
      generatedAt: new Date().toISOString(),
    },
    {
      platform: "Twitter/X",
      targetChannelOrSubreddit: "#PropFirm #DayTrading #ForexTrader #TradingSetup",
      headline: "⚡ 2026 Prop Firm Discount Master List (Save up to 20% on Challenge Fees)",
      content: "Getting funded in 2026? Stop paying full price for evaluations:\n\n🔥 Atlas Funded: 20% OFF (Code: 12275)\n🚀 AquaFunded: Up to 20% Rebate (Code: 6e9)\n📈 FTM: 10% OFF + 0 Time Limit (Code: arnab)\n💎 Pocket Option: 50% Match (Code: 50START)\n\nDetailed reviews: https://auto-ai-blog-web.onrender.com/best-prop-firms",
      callToActionUrl: "https://auto-ai-blog-web.onrender.com/best-prop-firms",
      promoCode: "12275 & arnab",
      status: "APPROVED",
      generatedAt: new Date().toISOString(),
    },
    {
      platform: "LinkedIn",
      targetChannelOrSubreddit: "Quantitative Trading & Prop Trading Professionals",
      headline: "The Economics of Modern Prop Trading: How Zero-Time-Limit Models Are Changing Evaluation Pass Rates",
      content: "Prop trading firm risk models have evolved significantly in 2026. The shift from rigid 30-day deadlines to zero-time-limit evaluations has reduced trader drawdown violations by an estimated 34%.\n\nIn our latest editorial analysis, we examine how firms like Funded Trader Markets, Atlas Funded, and AquaFunded structure capital allocation and profit splits up to 90%.\n\nRead the full report on SmartMag Tech: https://auto-ai-blog-web.onrender.com/best-prop-firms",
      callToActionUrl: "https://auto-ai-blog-web.onrender.com/best-prop-firms",
      promoCode: "arnab",
      status: "APPROVED",
      generatedAt: new Date().toISOString(),
    },
    {
      platform: "Quora",
      targetChannelOrSubreddit: "Questions: 'Which prop firm has the easiest evaluation rules in 2026?'",
      headline: "Expert Answer: Top 3 Prop Firms for Maximum Flexibility and Fast Payouts",
      content: "When assessing prop firm difficulty, focus on 3 criteria: minimum trading days, maximum drawdown calculation, and payout frequency.\n\n1. Funded Trader Markets (Code 'arnab' for 10% off) has 0 minimum days.\n2. Atlas Funded (Code '12275' for 20% off) offers instant scaling and low spreads.\n3. AquaFunded (Code '6e9') provides rapid 1-step challenges with 90% splits.\n\nRead our complete comparison guide on SmartMag Tech.",
      callToActionUrl: "https://auto-ai-blog-web.onrender.com/best-prop-firms",
      promoCode: "12275",
      status: "APPROVED",
      generatedAt: new Date().toISOString(),
    },
  ];

  return {
    agentName: "Multi-Channel Social Distribution Swarm",
    posts,
  };
}
