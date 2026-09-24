import { dispatchResendEmail } from "@/lib/emailNotification";
import { prisma } from "@/lib/prisma";

export interface UserQueryPayload {
  email: string;
  name?: string;
  message: string;
  subject?: string;
  senderAddress?: "query@thesmartmag.com" | "contact@thesmartmag.com" | "support@thesmartmag.com";
  source?: string;
}

export interface SupportResolutionResult {
  success: boolean;
  resolution: string;
  senderUsed: string;
  category: string;
  emailDispatched: boolean;
  error?: string;
}

/**
 * 🧠 Knowledge Base for Autonomous Query Resolution
 */
const KNOWLEDGE_BASE = {
  vip: {
    title: "TheSmartMag VIP Membership & Unlocking",
    summary:
      "VIP members enjoy unrestricted 100% full article reading with zero paywall lock cards, downloadable institutional dossiers, high-probability TradingView Pine Script indicators, ad-free viewing, and travel discounts. Login at https://thesmartmag.com/vip/login or register at https://thesmartmag.com/vip/register.",
  },
  pineScripts: {
    title: "Proprietary TradingView Pine Scripts & Quant Indicators",
    summary:
      "All active VIP members can download algorithmic Pine Scripts directly inside the VIP Member Lounge at https://thesmartmag.com/vip. Copy the Pine Script code and paste it into TradingView's Pine Editor to plot trend reversals, volume delta, and liquidity sweeps.",
  },
  propFirms: {
    title: "Prop Firm Challenges, Discounts & Evaluations",
    summary:
      "We compare leading prop firms including FTMO, FTM (Funded Trader Markets), Blue Guardian, Atlas Funded, and AquaFunded. Exclusive verified promo code: use 'SMARTMAG20' for up to 20% off evaluation fees and enhanced profit splits. Full reviews at https://thesmartmag.com/best-prop-firms.",
  },
  passwords: {
    title: "Account Login, Password Reset & Security",
    summary:
      "To reset your password, visit https://thesmartmag.com/vip/forgot-password. If you are already logged in, you can update your password directly inside your profile settings at https://thesmartmag.com/vip/profile.",
  },
  travel: {
    title: "Luxury Travel Itineraries & Booking Vouchers",
    summary:
      "Explore curated high-end itineraries across Goa, Manali, Kerala, Dubai, Maldives, and Bali with verified booking integrations for flights, hotels, and airport transfers at https://thesmartmag.com/travel.",
  },
  sponsorship: {
    title: "Sponsorships, Press Releases & Advertising",
    summary:
      "To collaborate on sponsored thought leadership, display banners, or video features, review our media kit at https://thesmartmag.com/sponsor-video or write directly to contact@thesmartmag.com.",
  },
};

/**
 * Categorize user query intent
 */
function categorizeQuery(text: string): { category: string; matchedContext: string } {
  const lower = text.toLowerCase();

  if (lower.includes("pine") || lower.includes("indicator") || lower.includes("tradingview") || lower.includes("script") || lower.includes("algo")) {
    return { category: "PINE_SCRIPTS_AND_QUANTS", matchedContext: KNOWLEDGE_BASE.pineScripts.summary };
  }
  if (lower.includes("prop") || lower.includes("ftmo") || lower.includes("challenge") || lower.includes("discount") || lower.includes("promo") || lower.includes("code")) {
    return { category: "PROP_FIRMS_AND_DISCOUNTS", matchedContext: KNOWLEDGE_BASE.propFirms.summary };
  }
  if (lower.includes("password") || lower.includes("reset") || lower.includes("login") || lower.includes("sign in") || lower.includes("account")) {
    return { category: "ACCOUNT_AND_SECURITY", matchedContext: KNOWLEDGE_BASE.passwords.summary };
  }
  if (lower.includes("vip") || lower.includes("unlock") || lower.includes("membership") || lower.includes("subscribe") || lower.includes("paywall")) {
    return { category: "VIP_MEMBERSHIP", matchedContext: KNOWLEDGE_BASE.vip.summary };
  }
  if (lower.includes("travel") || lower.includes("hotel") || lower.includes("flight") || lower.includes("itinerary") || lower.includes("booking")) {
    return { category: "TRAVEL_AND_BOOKINGS", matchedContext: KNOWLEDGE_BASE.travel.summary };
  }
  if (lower.includes("sponsor") || lower.includes("advertise") || lower.includes("partner") || lower.includes("press") || lower.includes("media")) {
    return { category: "SPONSORSHIP_AND_PRESS", matchedContext: KNOWLEDGE_BASE.sponsorship.summary };
  }

  return { category: "GENERAL_EDITORIAL_QUERY", matchedContext: "General platform inquiries, research feedback, and article editorial correspondence." };
}

/**
 * Synthesize AI solution for the user's inquiry
 */
async function synthesizeResolution(userName: string, queryMessage: string, category: string, context: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || "";

  if (apiKey) {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are the dedicated Senior Intelligence & Support Agent at TheSmartMag (https://thesmartmag.com).
A reader named "${userName}" has contacted support with this question:
"${queryMessage}"

Knowledge Base Context:
${context}

Platform Facts:
- Main platform: https://thesmartmag.com
- VIP Lounge & Pine Scripts: https://thesmartmag.com/vip
- Password Reset: https://thesmartmag.com/vip/forgot-password
- Profile & Change Password: https://thesmartmag.com/vip/profile
- Prop Firm Directory: https://thesmartmag.com/best-prop-firms (Promo Code: SMARTMAG20)
- Luxury Travel: https://thesmartmag.com/travel
- Official Contact Channels: query@thesmartmag.com, contact@thesmartmag.com, support@thesmartmag.com
- NEVER mention any personal Gmail addresses or backend credentials.

Write a warm, authoritative, crystal-clear, and immediately actionable response.
Solve the reader's question directly with numbered steps, direct links, and helpful guidance.
Keep the tone professional, welcoming, and elite. Do not include meta text or Markdown JSON blocks; write the direct email body response.
`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text && text.trim().length > 50) {
        return text.trim();
      }
    } catch (e: any) {
      console.warn("[SUPPORT AGENT] Gemini generation note:", e.message);
    }
  }

  // High-Quality Rule-Based Solution Fallback
  return `Thank you for reaching out to TheSmartMag Intelligence Desk.

Here is the solution to your inquiry regarding ${category.replace(/_/g, " ").toLowerCase()}:

${context}

Key Next Steps:
1. To access VIP resources, TradingView Pine Scripts, or full unredacted articles, visit your portal at https://thesmartmag.com/vip.
2. If you are updating your account credentials, you can manage your settings securely at https://thesmartmag.com/vip/profile.
3. For verified prop firm challenge evaluations, use exclusive promo code 'SMARTMAG20' at https://thesmartmag.com/best-prop-firms.

If you require any further assistance or customized guidance, you can reply directly to this email at query@thesmartmag.com or contact our team at contact@thesmartmag.com. Our autonomous support desk is active 24/7.`;
}

/**
 * 🎨 Dynamic Adaptive Dark / Light Mode HTML Email Template Generator
 */
export function renderAdaptiveSupportEmailHtml(params: {
  userName: string;
  userEmail: string;
  originalQuery: string;
  solutionText: string;
  ticketId: string;
  senderAddress: string;
}): string {
  const { userName, userEmail, originalQuery, solutionText, ticketId, senderAddress } = params;

  // Convert plain text newlines into formatted paragraphs
  const formattedSolution = solutionText
    .split("\n\n")
    .map((p) => `<p style="margin: 0 0 14px 0; line-height: 1.65;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>TheSmartMag Support Resolution #${ticketId}</title>
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body {
      margin: 0;
      padding: 24px 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    .email-wrapper {
      max-width: 620px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      overflow: hidden;
      padding: 36px 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .brand-badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 50px;
      background-color: #e0f2fe;
      color: #0284c7;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .brand-title {
      color: #0f172a;
      font-size: 24px;
      margin: 14px 0 6px 0;
      font-family: Georgia, serif;
      font-weight: 800;
    }
    .brand-subhead {
      color: #64748b;
      font-size: 13.5px;
      margin: 0 0 24px 0;
    }
    .query-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 24px;
    }
    .query-label {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin: 0 0 6px 0;
    }
    .query-content {
      font-size: 14px;
      color: #334155;
      font-style: italic;
      margin: 0;
      line-height: 1.5;
    }
    .solution-card {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 28px;
      color: #14532d;
      font-size: 14.5px;
    }
    .solution-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #15803d;
      margin-bottom: 14px;
    }
    .cta-container {
      text-align: center;
      margin: 30px 0 20px 0;
    }
    .cta-btn {
      display: inline-block;
      padding: 13px 30px;
      background: linear-gradient(135deg, #0d9488, #06b6d4);
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 800;
      border-radius: 12px;
      font-size: 13.5px;
      letter-spacing: 0.5px;
    }
    .footer-divider {
      border-top: 1px solid #e2e8f0;
      padding-top: 22px;
      margin-top: 28px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      line-height: 1.6;
    }

    /* 🌙 Dynamic Dark Mode Support for Modern Email Clients */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #030712 !important;
        color: #f8fafc !important;
      }
      .email-wrapper {
        background-color: #070c18 !important;
        border-color: #1e293b !important;
        box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6) !important;
      }
      .brand-badge {
        background-color: rgba(20, 184, 166, 0.18) !important;
        color: #2dd4bf !important;
      }
      .brand-title {
        color: #ffffff !important;
      }
      .brand-subhead {
        color: #94a3b8 !important;
      }
      .query-card {
        background-color: #0b1329 !important;
        border-color: #1e293b !important;
      }
      .query-label {
        color: #94a3b8 !important;
      }
      .query-content {
        color: #cbd5e1 !important;
      }
      .solution-card {
        background-color: #07231c !important;
        border-color: #065f46 !important;
        color: #d1fae5 !important;
      }
      .solution-header {
        color: #34d399 !important;
      }
      .footer-divider {
        border-color: #1e293b !important;
        color: #64748b !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    
    <!-- Top Identity Badge -->
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="brand-badge">
        ✓ Official Intelligence Resolution • Ticket #${ticketId}
      </span>
      <h1 class="brand-title">TheSmartMag Autonomous Support Desk</h1>
      <p class="brand-subhead">24/7 Algorithmic & Editorial Query Resolution System</p>
    </div>

    <!-- Personal Greeting -->
    <p style="font-size: 15px; margin: 0 0 16px 0; line-height: 1.5;">
      Hello <strong>${userName}</strong>,
    </p>
    <p style="font-size: 14px; color: #64748b; margin: 0 0 20px 0; line-height: 1.6;">
      Thank you for contacting TheSmartMag. Our autonomous inquiry resolution agent has processed your message and prepared the following comprehensive answer:
    </p>

    <!-- User Inquiry Card -->
    <div class="query-card">
      <div class="query-label">Your Submitted Question:</div>
      <p class="query-content">"${originalQuery}"</p>
    </div>

    <!-- Agent Solution Card -->
    <div class="solution-card">
      <div class="solution-header">
        ★ Resolution & Answer:
      </div>
      <div>
        ${formattedSolution}
      </div>
    </div>

    <!-- Direct CTA -->
    <div class="cta-container">
      <a href="https://thesmartmag.com/vip" class="cta-btn">
        Open TheSmartMag VIP Portal →
      </a>
    </div>

    <!-- Footer -->
    <div class="footer-divider">
      <p style="margin: 0 0 6px 0;">
        Delivered to <strong>${userEmail}</strong> • Sent from <strong>${senderAddress}</strong>
      </p>
      <p style="margin: 0 0 10px 0;">
        <a href="https://thesmartmag.com" style="color: #0d9488; text-decoration: underline;">TheSmartMag.com</a> • 
        <a href="https://thesmartmag.com/contact" style="color: #0d9488; text-decoration: underline;">Contact Desk</a> • 
        <a href="https://thesmartmag.com/vip/profile" style="color: #0d9488; text-decoration: underline;">Account Settings</a>
      </p>
      <p style="margin: 0; font-size: 11px; color: #94a3b8;">
        © ${new Date().getFullYear()} The SmartMag Global Media. Official email channels: query@thesmartmag.com, contact@thesmartmag.com, support@thesmartmag.com.
      </p>
    </div>

  </div>
</body>
</html>
`;
}

/**
 * 🚀 Main Entry Point: Dedicated Email Support Agent
 */
export async function handleIncomingUserQuery(payload: UserQueryPayload): Promise<SupportResolutionResult> {
  const cleanEmail = payload.email.toLowerCase().trim();
  const userName = payload.name?.trim() || "Reader";
  const userMessage = payload.message.trim();
  const ticketId = `SM-${Date.now().toString(36).toUpperCase()}`;

  console.info(`[SUPPORT AGENT] Processing incoming inquiry from ${cleanEmail} (Ticket: ${ticketId})`);

  // 1. Analyze and classify intent
  const { category, matchedContext } = categorizeQuery(userMessage);

  // 2. Synthesize complete solution
  const solution = await synthesizeResolution(userName, userMessage, category, matchedContext);

  // 3. Determine official sender
  // User specified: "agent should use query@thesmartmag.com to reply the user emails and any user can content with contact@thesmartmag.com email id also and agents also use contact@thesmartmag.com emalils"
  const senderAddress = payload.senderAddress || (category === "SPONSORSHIP_AND_PRESS" ? "contact@thesmartmag.com" : "query@thesmartmag.com");
  const senderName = senderAddress === "contact@thesmartmag.com" ? "TheSmartMag Contact Team" : "TheSmartMag AI Query Desk";
  const from = `${senderName} <${senderAddress}>`;

  // 4. Render Adaptive Dark / Light Mode Email
  const html = renderAdaptiveSupportEmailHtml({
    userName,
    userEmail: cleanEmail,
    originalQuery: userMessage,
    solutionText: solution,
    ticketId,
    senderAddress,
  });

  // 5. Dispatch email reply to user
  const emailResult = await dispatchResendEmail({
    to: cleanEmail,
    from,
    subject: `[Solved #${ticketId}] Re: ${payload.subject || "Your Question to TheSmartMag"}`,
    html,
  });

  return {
    success: true,
    resolution: solution,
    senderUsed: senderAddress,
    category,
    emailDispatched: emailResult.ok,
    error: emailResult.error,
  };
}
