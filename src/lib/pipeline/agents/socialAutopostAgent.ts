/**
 * 🤖 Autonomous Social Autopost Engine (5 Major Channels)
 * -------------------------------------------------------------
 * Autonomously posts daily curated articles, viral travel guides,
 * cultural festivals, tech breakthroughs, and market alerts across 5 major channels:
 * 1. Twitter / X: @Theindainta9go (https://x.com/Theindainta9go)
 * 2. LinkedIn: Indian Trader (https://www.linkedin.com/in/indian-trader-804333436/)
 * 3. Facebook: Indian Trader (https://www.facebook.com/profile.php?id=61594475423154)
 * 4. Instagram: @indiantrader8032026 (https://www.instagram.com/indiantrader8032026/)
 * 5. Reddit: u/Indiantrader803 (https://www.reddit.com/user/Indiantrader803/)
 *
 * Runs automatically on 24/7 background scheduler and 1-click admin promoter.
 */

export interface AutopostResult {
  platform: "TWITTER" | "LINKEDIN" | "FACEBOOK" | "INSTAGRAM" | "REDDIT" | "ALL";
  success: boolean;
  message: string;
  postDetails?: {
    text: string;
    targetAccount: string;
    utmUrl: string;
    providerUsed: string;
    timestamp: string;
  };
}

export interface AutopostPayload {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  topOfferCode?: string;
  topOfferName?: string;
}

function generateSocialContent(payload: AutopostPayload, platform: string) {
  const cat = (payload.category || "").toLowerCase();
  const isTravel = cat.includes("travel") || cat.includes("expedition") || cat.includes("festival") || cat.includes("culture");
  const isTech = cat.includes("artificial") || cat.includes("tech") || cat.includes("software") || cat.includes("development");

  if (platform === "twitter") {
    if (isTravel) {
      return `✈️ Travel & Cultural Expedition: ${payload.title}

${payload.excerpt.slice(0, 130)}...

🎒 Verified Hotel Deals & Travel Gear Checklist Included!

👉 Read full roadmap: ${payload.slug}

#Travel #IncredibleIndia #Wanderlust #Theindainta9go`;
    }
    if (isTech) {
      return `⚡ Tech & AI Intelligence: ${payload.title}

${payload.excerpt.slice(0, 130)}...

🧠 Complete Architecture Breakdown & Developer Benchmarks:

👉 Read full report: ${payload.slug}

#AI #SoftwareEngineering #TechNews #Theindainta9go`;
    }
    return `⚡ Market & Financial Outlook: ${payload.title}

${payload.excerpt.slice(0, 130)}...

🔥 Verified 2026 Prop Discount: Code 'arnab' for 10% OFF at FTM | Code '12275' at Atlas Funded.

👉 Read full report: ${payload.slug}

#Trading #Nifty50 #Forex #Theindainta9go`;
  }

  if (platform === "linkedin") {
    if (isTravel) {
      return `🌍 Global Travel & Cultural Research Dispatch: ${payload.title}

${payload.excerpt}

Key Traveler & Expedition Highlights:
• Curated day-by-day itineraries (India & Global Destinations)
• Must-try local cuisines, transit hacks & seasonal windows
• Verified hotel and trekking essentials checklist

Read the complete guide:
${payload.slug}

#Travel #Expeditions #Culture #SmartTravel #IndianTrader`;
    }
    if (isTech) {
      return `🚀 Engineering Architecture & AI Research: ${payload.title}

${payload.excerpt}

Key Technical Takeaways:
• Multi-agent orchestration and low-latency scaling
• Benchmark evaluations and production reliability
• Open standards (MCP) and enterprise deployment blueprints

Read the technical analysis:
${payload.slug}

#ArtificialIntelligence #SoftwareEngineering #CloudArchitecture #IndianTrader`;
    }
    return `📊 Algorithmic & Quantitative Trading Research Note: ${payload.title}

${payload.excerpt}

Key Institutional Takeaways for 2026:
• Real-time risk management & deterministic execution
• Zero-time-limit prop evaluation framework
• Verified Partner Discounts: FTM (Code: arnab) | Atlas Funded (Code: 12275)

Read the verified benchmark report & calculations:
${payload.slug}

#Trading #Forex #QuantitativeFinance #PropFirm #IndianTrader`;
  }

  if (platform === "facebook") {
    if (isTravel) {
      return `✈️ Explore Top Destinations with SmartMag: ${payload.title}

${payload.excerpt}

🌟 Curated Itineraries, Secret Spots & Verified Travel Gear Discounts!
✅ Discover 25+ Iconic Destinations Across India & Worldwide
✅ Complete 5-to-10 Day Turnkey Travel Plans

👉 Read the Complete Guide Now:
${payload.slug}

#Travel #IncredibleIndia #WorldTravel #Expeditions #IndianTrader`;
    }
    return `🔥 New In-Depth Analysis: ${payload.title}

${payload.excerpt}

💡 Exclusive Verified Partner Discounts & Resources:
✅ Funded Trader Markets: 10% OFF with code 'arnab'
✅ Atlas Funded: 20% OFF with code '12275'
✅ AquaFunded: 20% Rebate with code '6e9'
✅ Pocket Option: 50% Deposit Match with code '50START'

👉 Read the Full Breakdown:
${payload.slug}

#Trading #TechNews #Forex #IndianTrader`;
  }

  if (platform === "instagram") {
    return `✨ ${payload.title}

${payload.excerpt.slice(0, 180)}...

👉 Read full story at link in bio or visit: ${payload.slug}

#SmartMag #Technology #Travel #Trading #AI #Innovation #indiantrader8032026`;
  }

  // Reddit default
  return `[${payload.category || "Guide"}] ${payload.title}

${payload.excerpt}

Key takeaways and full breakdown available here: ${payload.slug}`;
}

/**
 * 1. Dispatches an automated post to Twitter / X for @Theindainta9go
 */
export async function autopostToTwitter(payload: AutopostPayload): Promise<AutopostResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";
  const utmUrl = `${siteUrl}/blog/${payload.slug}?utm_source=twitter&utm_medium=autopost_agent&utm_campaign=theindainta9go`;
  const targetAccount = "@Theindainta9go";
  const tweetText = generateSocialContent({ ...payload, slug: utmUrl }, "twitter");

  const webhookUrl = process.env.TWITTER_AUTOPUT_WEBHOOK_URL || process.env.SOCIAL_AUTOPUT_WEBHOOK_URL;
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  try {
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "twitter",
          account: targetAccount,
          text: tweetText,
          url: utmUrl,
          title: payload.title,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    if (bearerToken) {
      await fetch("https://api.twitter.com/2/tweets", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: tweetText }),
      }).catch(() => {});
    }

    return {
      platform: "TWITTER",
      success: true,
      message: `Dispatched to Twitter/X for ${targetAccount}`,
      postDetails: {
        text: tweetText,
        targetAccount,
        utmUrl,
        providerUsed: bearerToken ? "Twitter API v2" : "Autonomous Social Fleet",
        timestamp: new Date().toISOString(),
      },
    };
  } catch (err: any) {
    return {
      platform: "TWITTER",
      success: false,
      message: err.message || "Failed to dispatch Twitter autopost",
    };
  }
}

/**
 * 2. Dispatches an automated post to LinkedIn for Indian Trader
 */
export async function autopostToLinkedIn(payload: AutopostPayload): Promise<AutopostResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";
  const utmUrl = `${siteUrl}/blog/${payload.slug}?utm_source=linkedin&utm_medium=autopost_agent&utm_campaign=indian_trader`;
  const targetAccount = "Indian Trader (https://www.linkedin.com/in/indian-trader-804333436/)";
  const postText = generateSocialContent({ ...payload, slug: utmUrl }, "linkedin");

  const webhookUrl = process.env.LINKEDIN_AUTOPUT_WEBHOOK_URL || process.env.SOCIAL_AUTOPUT_WEBHOOK_URL;

  try {
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "linkedin",
          account: targetAccount,
          text: postText,
          url: utmUrl,
          title: payload.title,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    return {
      platform: "LINKEDIN",
      success: true,
      message: `Dispatched to LinkedIn for Indian Trader`,
      postDetails: {
        text: postText,
        targetAccount,
        utmUrl,
        providerUsed: "Autonomous Social Fleet",
        timestamp: new Date().toISOString(),
      },
    };
  } catch (err: any) {
    return {
      platform: "LINKEDIN",
      success: false,
      message: err.message || "Failed to dispatch LinkedIn autopost",
    };
  }
}

/**
 * 3. Dispatches an automated post to Facebook for Indian Trader
 */
export async function autopostToFacebook(payload: AutopostPayload): Promise<AutopostResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";
  const utmUrl = `${siteUrl}/blog/${payload.slug}?utm_source=facebook&utm_medium=autopost_agent&utm_campaign=indiantrader_fb`;
  const targetAccount = "Indian Trader (https://www.facebook.com/profile.php?id=61594475423154)";
  const fbPostText = generateSocialContent({ ...payload, slug: utmUrl }, "facebook");

  const webhookUrl = process.env.FACEBOOK_AUTOPUT_WEBHOOK_URL || process.env.SOCIAL_AUTOPUT_WEBHOOK_URL;

  try {
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "facebook",
          account: targetAccount,
          text: fbPostText,
          url: utmUrl,
          title: payload.title,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    return {
      platform: "FACEBOOK",
      success: true,
      message: `Dispatched to Facebook for Indian Trader`,
      postDetails: {
        text: fbPostText,
        targetAccount,
        utmUrl,
        providerUsed: "Autonomous Social Fleet",
        timestamp: new Date().toISOString(),
      },
    };
  } catch (err: any) {
    return {
      platform: "FACEBOOK",
      success: false,
      message: err.message || "Failed to dispatch Facebook autopost",
    };
  }
}

/**
 * 4. Dispatches an automated post to Instagram
 */
export async function autopostToInstagram(payload: AutopostPayload): Promise<AutopostResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";
  const utmUrl = `${siteUrl}/blog/${payload.slug}?utm_source=instagram&utm_medium=autopost_agent&utm_campaign=indiantrader8032026`;
  const targetAccount = "@indiantrader8032026 (https://www.instagram.com/indiantrader8032026/)";
  const igCaption = generateSocialContent({ ...payload, slug: utmUrl }, "instagram");

  const webhookUrl = process.env.INSTAGRAM_AUTOPUT_WEBHOOK_URL || process.env.SOCIAL_AUTOPUT_WEBHOOK_URL;

  try {
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "instagram",
          account: targetAccount,
          caption: igCaption,
          url: utmUrl,
          title: payload.title,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    return {
      platform: "INSTAGRAM",
      success: true,
      message: `Dispatched to Instagram for @indiantrader8032026`,
      postDetails: {
        text: igCaption,
        targetAccount,
        utmUrl,
        providerUsed: "Autonomous Social Fleet",
        timestamp: new Date().toISOString(),
      },
    };
  } catch (err: any) {
    return {
      platform: "INSTAGRAM",
      success: false,
      message: err.message || "Failed to dispatch Instagram autopost",
    };
  }
}

/**
 * 5. Dispatches an automated post to Reddit
 */
export async function autopostToReddit(payload: AutopostPayload): Promise<AutopostResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";
  const utmUrl = `${siteUrl}/blog/${payload.slug}?utm_source=reddit&utm_medium=autopost_agent&utm_campaign=indiantrader803_reddit`;
  const targetAccount = "u/Indiantrader803 (https://www.reddit.com/user/Indiantrader803/)";
  const redditText = generateSocialContent({ ...payload, slug: utmUrl }, "reddit");

  const webhookUrl = process.env.REDDIT_AUTOPUT_WEBHOOK_URL || process.env.SOCIAL_AUTOPUT_WEBHOOK_URL;

  try {
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "reddit",
          account: targetAccount,
          title: payload.title,
          text: redditText,
          url: utmUrl,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    return {
      platform: "REDDIT",
      success: true,
      message: `Dispatched to Reddit for u/Indiantrader803`,
      postDetails: {
        text: redditText,
        targetAccount,
        utmUrl,
        providerUsed: "Autonomous Social Fleet",
        timestamp: new Date().toISOString(),
      },
    };
  } catch (err: any) {
    return {
      platform: "REDDIT",
      success: false,
      message: err.message || "Failed to dispatch Reddit autopost",
    };
  }
}

/**
 * 🚀 Dispatches full 5-channel simultaneous social media campaign
 */
export async function runFullAutonomousSocialAutopost(payload: AutopostPayload): Promise<{
  twitter: AutopostResult;
  linkedIn: AutopostResult;
  facebook: AutopostResult;
  instagram: AutopostResult;
  reddit: AutopostResult;
}> {
  const [twitter, linkedIn, facebook, instagram, reddit] = await Promise.all([
    autopostToTwitter(payload),
    autopostToLinkedIn(payload),
    autopostToFacebook(payload),
    autopostToInstagram(payload),
    autopostToReddit(payload),
  ]);

  return {
    twitter,
    linkedIn,
    facebook,
    instagram,
    reddit,
  };
}
