export const ADMIN_NOTIFICATION_EMAIL = "arnab.laha2018@gmail.com";

// Official email sender identities
export const OFFICIAL_SENDERS = {
  support: "TheSmartMag Support <support@thesmartmag.com>",
  query: "TheSmartMag AI Query Desk <query@thesmartmag.com>",
  contact: "TheSmartMag Contact Team <contact@thesmartmag.com>",
  vip: "TheSmartMag VIP Inner Circle <support@thesmartmag.com>",
};

export interface UserLeadPayload {
  type: "NEWSLETTER_SUBSCRIPTION" | "CONTACT_FORM" | "SPONSORSHIP_INQUIRY" | "VIP_MEMBER";
  email: string;
  name?: string;
  message?: string;
  sourceUrl?: string;
  timestamp?: string;
}

/**
 * 📨 Resilient Email Dispatcher via Resend
 * Supports official senders (support@, query@, contact@).
 * Falls back to onboarding@resend.dev if custom domain DNS is pending verification.
 */
export async function dispatchResendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}): Promise<{ ok: boolean; status?: number; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const primaryFrom = params.from || process.env.EMAIL_FROM || OFFICIAL_SENDERS.support;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: primaryFrom,
        to: Array.isArray(params.to) ? params.to : [params.to],
        subject: params.subject,
        html: params.html,
      }),
    });

    if (res.ok) {
      return { ok: true, status: res.status };
    }

    const errText = await res.text();
    // If custom domain is unverified (403), fallback to onboarding@resend.dev
    if (res.status === 403 && (errText.includes("not verified") || errText.includes("validation_error"))) {
      const fallbackFrom = "TheSmartMag <onboarding@resend.dev>";
      console.info(`[RESEND NOTICE] Retrying dispatch with ${fallbackFrom}`);
      const retryRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fallbackFrom,
          to: Array.isArray(params.to) ? params.to : [params.to],
          subject: params.subject,
          html: params.html,
        }),
      });

      if (retryRes.ok) {
        return { ok: true, status: retryRes.status };
      }
      const retryErr = await retryRes.text();
      return { ok: false, status: retryRes.status, error: retryErr };
    }

    return { ok: false, status: res.status, error: errText };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

/**
 * 📧 Lead Capture & Admin Forwarder
 * Forwards every user email, subscription, and contact inquiry directly to internal admin
 * Note: Admin email is strictly private and NEVER leaked or returned to users.
 */
export async function notifyAdminUserLead(payload: UserLeadPayload): Promise<{ success: boolean; message: string }> {
  const time = payload.timestamp || new Date().toLocaleString();
  const recipient = ADMIN_NOTIFICATION_EMAIL;

  console.info(`[LEAD CAPTURE] Routing user submission (${payload.type}: ${payload.email}) to internal notification desk`);

  if (process.env.RESEND_API_KEY) {
    try {
      // 1. Send Welcome Confirmation to Subscriber (Adaptive Dark/Light Mode)
      await dispatchResendEmail({
        to: payload.email,
        from: OFFICIAL_SENDERS.support,
        subject: "🎉 Welcome to The SmartMag Daily Briefing!",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <style>
              body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; }
              .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px 26px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
              .badge { display: inline-block; padding: 5px 12px; border-radius: 50px; background-color: #e0f2fe; color: #0284c7; font-weight: 800; font-size: 11px; text-transform: uppercase; }
              .title { font-size: 24px; margin: 14px 0 8px 0; font-family: Georgia, serif; color: #0f172a; }
              .text { font-size: 14.5px; line-height: 1.6; color: #475569; }
              .btn { display: inline-block; padding: 12px 26px; background: linear-gradient(135deg, #4f46e5, #6366f1); color: #ffffff !important; text-decoration: none; font-weight: bold; border-radius: 10px; font-size: 13.5px; }
              .footer { border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 18px; text-align: center; font-size: 12px; color: #94a3b8; }
              @media (prefers-color-scheme: dark) {
                body { background-color: #030712 !important; color: #f8fafc !important; }
                .card { background-color: #070c18 !important; border-color: #1e293b !important; box-shadow: 0 4px 25px rgba(0,0,0,0.5) !important; }
                .badge { background-color: rgba(20, 184, 166, 0.2) !important; color: #2dd4bf !important; }
                .title { color: #ffffff !important; }
                .text { color: #cbd5e1 !important; }
                .footer { border-color: #1e293b !important; color: #64748b !important; }
              }
            </style>
          </head>
          <body>
            <div class="card">
              <span class="badge">Official Confirmation</span>
              <h1 class="title">Welcome to The SmartMag!</h1>
              <p class="text">Thank you for subscribing to our daily autonomous AI, engineering, and quant finance briefing.</p>
              <p class="text">You will now receive breaking coverage on frontier LLMs, system architecture, quant finance, travel deals, and tech reviews.</p>
              <div style="margin: 24px 0;">
                <a href="https://thesmartmag.com" class="btn">Explore Today's Dispatch →</a>
              </div>
              <div class="footer">
                The SmartMag Media • Delivered to ${payload.email} • support@thesmartmag.com
              </div>
            </div>
          </body>
          </html>
        `,
      });

      // 2. Send Admin Notification to Owner (Internal Only)
      await dispatchResendEmail({
        to: recipient,
        from: OFFICIAL_SENDERS.support,
        subject: `🔥 [SmartMag Lead] New ${payload.type.replace(/_/g, " ")}: ${payload.email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #4f46e5; margin-top: 0;">🚀 New SmartMag Reader Lead Captured</h2>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p><strong>Action Type:</strong> ${payload.type}</p>
              <p><strong>User Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
              ${payload.name ? `<p><strong>User Name:</strong> ${payload.name}</p>` : ""}
              ${payload.message ? `<p><strong>Message / Inquiry:</strong><br/>${payload.message}</p>` : ""}
              <p><strong>Captured At:</strong> ${time}</p>
            </div>
            <p style="font-size: 11px; color: #94a3b8;">Delivered by SmartMag Autonomous Agent Engine.</p>
          </div>
        `,
      });

      return { success: true, message: `Lead successfully recorded` };
    } catch (err: any) {
      console.warn("Resend email dispatch notice:", err.message);
    }
  }

  // 3. Webhook fallback
  const webhookUrl = process.env.LEAD_ALERT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎯 **New User Lead**\n• **Type:** ${payload.type}\n• **Email:** ${payload.email}\n${payload.name ? `• **Name:** ${payload.name}\n` : ""}${payload.message ? `• **Message:** ${payload.message}\n` : ""}• **Time:** ${time}`,
        }),
      });
    } catch (_) {}
  }

  return { success: true, message: `User lead captured` };
}

/**
 * 👑 Dispatch VIP Welcome & Access Confirmation Email
 * Responsive Adaptive Light / Dark Mode
 */
export async function sendVipWelcomeEmail(email: string, name?: string): Promise<boolean> {
  const greeting = name ? `Hello ${name},` : "Hello,";
  console.info(`[VIP AUTH] Dispatching VIP Welcome Email to ${email}`);

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await dispatchResendEmail({
        to: email,
        from: OFFICIAL_SENDERS.vip,
        subject: "👑 Your VIP Elite Access is Activated | TheSmartMag",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <style>
              body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; }
              .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 36px 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
              .badge { display: inline-block; padding: 6px 16px; border-radius: 50px; background-color: #e0f2fe; color: #0284c7; font-weight: bold; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
              .title { font-size: 26px; margin: 16px 0 8px 0; font-family: Georgia, serif; color: #0f172a; }
              .benefits-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; padding: 20px; margin: 20px 0; }
              .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0d9488, #06b6d4); color: #ffffff !important; text-decoration: none; font-weight: 800; border-radius: 12px; font-size: 14px; }
              .footer { border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 18px; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6; }
              @media (prefers-color-scheme: dark) {
                body { background-color: #030712 !important; color: #f8fafc !important; }
                .card { background-color: #070c18 !important; border-color: #1e293b !important; box-shadow: 0 4px 25px rgba(0,0,0,0.6) !important; }
                .badge { background-color: rgba(20, 184, 166, 0.2) !important; color: #2dd4bf !important; }
                .title { color: #ffffff !important; }
                .benefits-box { background-color: #0b1329 !important; border-color: #1e293b !important; }
                .footer { border-color: #1e293b !important; color: #64748b !important; }
              }
            </style>
          </head>
          <body>
            <div class="card">
              <div style="text-align: center; margin-bottom: 24px;">
                <span class="badge">VIP Elite Activated</span>
                <h1 class="title">Welcome to TheSmartMag VIP</h1>
                <p style="color: #64748b; font-size: 14px; margin: 0;">Institutional Research • Proprietary Quant Models • Secret Deals</p>
              </div>

              <p style="font-size: 15px; line-height: 1.6;">${greeting}</p>
              <p style="font-size: 15px; line-height: 1.6;">
                Your VIP Elite membership has been officially registered and verified. As a member of our inner circle, you have unlocked:
              </p>

              <div class="benefits-box">
                <p style="margin: 0 0 10px 0; color: #0d9488; font-weight: bold; font-size: 14px;">✓ Unlocked VIP Benefits:</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; line-height: 1.8;">
                  <li><strong>Private Quant Data Models:</strong> High-probability Pine Script indicators & order-flow algorithms.</li>
                  <li><strong>Exclusive VIP Research Briefs:</strong> Unredacted hedge fund positioning & AI chip supply bottlenecks.</li>
                  <li><strong>Secret Flight & Hotel Flash Vouchers:</strong> Up to 40% exclusive travel partner promo codes.</li>
                  <li><strong>VIP Lounge Access:</strong> Ad-free clean reading mode and downloadable PDF dossiers.</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://thesmartmag.com/vip" class="btn">
                  Access Your VIP Portal →
                </a>
              </div>

              <div class="footer">
                TheSmartMag Global Media • Delivered to ${email} • support@thesmartmag.com<br/>
                If you did not create this account, please ignore this email.
              </div>
            </div>
          </body>
          </html>
        `,
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn("VIP Welcome email warning:", e);
    }
  }

  return true;
}

/**
 * 🔑 Dispatch Secure Password Reset Email
 * Responsive Adaptive Light / Dark Mode
 */
export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<boolean> {
  console.info(`[AUTH] Dispatching Password Reset Link to ${email}`);

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await dispatchResendEmail({
        to: email,
        from: OFFICIAL_SENDERS.support,
        subject: "🔒 Password Reset Request | TheSmartMag",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <style>
              body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; }
              .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 36px 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
              .title { font-size: 24px; margin: 0 0 16px 0; font-family: Georgia, serif; color: #0f172a; }
              .text { font-size: 15px; line-height: 1.6; color: #475569; }
              .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #4f46e5, #6366f1); color: #ffffff !important; text-decoration: none; font-weight: bold; border-radius: 12px; font-size: 14px; }
              .footer { border-top: 1px solid #e2e8f0; padding-top: 18px; margin-top: 24px; text-align: center; font-size: 12px; color: #94a3b8; }
              @media (prefers-color-scheme: dark) {
                body { background-color: #030712 !important; color: #f8fafc !important; }
                .card { background-color: #070c18 !important; border-color: #1e293b !important; }
                .title { color: #ffffff !important; }
                .text { color: #cbd5e1 !important; }
                .footer { border-color: #1e293b !important; color: #64748b !important; }
              }
            </style>
          </head>
          <body>
            <div class="card">
              <h2 class="title">Reset Your Password</h2>
              <p class="text">We received a request to reset the password for your TheSmartMag account (${email}).</p>
              <p class="text">Click the secure link below to set a new password. This link will expire in <strong>1 hour</strong>:</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" class="btn">
                  Reset Password Now →
                </a>
              </div>

              <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
                Or copy and paste this link into your browser:<br/>
                <span style="color: #4f46e5; word-break: break-all;">${resetUrl}</span>
              </p>

              <div class="footer">
                Delivered to ${email} • support@thesmartmag.com<br/>
                If you did not request this change, you can safely ignore this email.
              </div>
            </div>
          </body>
          </html>
        `,
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn("Password reset email warning:", e);
    }
  }

  return true;
}

export interface ViralDigestArticle {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  readTimeMinutes?: number;
  featuredImage?: string;
}

export interface DigestRecipient {
  email: string;
  name?: string;
}

/**
 * 📰 Daily VIP & Reader Viral Headline Digest Dispatcher
 * Sends high-converting, luxury-styled email newsletters with today's trending articles.
 * Adaptive Dark / Light Mode.
 */
export async function sendDailyVipViralDigestEmail(
  articles: ViralDigestArticle[],
  recipients: DigestRecipient[]
): Promise<{ success: boolean; dispatchedCount: number; errors: string[] }> {
  if (!articles || articles.length === 0) {
    return { success: false, dispatchedCount: 0, errors: ["No articles provided for digest"] };
  }
  if (!recipients || recipients.length === 0) {
    return { success: false, dispatchedCount: 0, errors: ["No recipients provided"] };
  }

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const topHeadline = articles[0]?.title || "Today's Top Breakthroughs";
  const subject = `🔥 Today's VIP Briefing: ${topHeadline.slice(0, 50)}...`;

  const articlesHtml = articles
    .slice(0, 5)
    .map((article, idx) => {
      const articleUrl = `https://thesmartmag.com/blog/${article.slug}?utm_source=vip_daily_digest&utm_medium=email`;
      return `
        <div class="article-card" style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #0d9488; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
              ${article.category || "FRONTIER INTELLIGENCE"} ${article.readTimeMinutes ? `• ${article.readTimeMinutes} MIN READ` : ""}
            </span>
            <span style="color: #94a3b8; font-size: 11px; font-weight: 700;">#${idx + 1} TRENDING</span>
          </div>
          <h3 style="margin: 0 0 10px 0; font-size: 18px; line-height: 1.4;">
            <a href="${articleUrl}" style="color: inherit; text-decoration: none; font-weight: 700;">
              ${article.title}
            </a>
          </h3>
          <p style="color: #64748b; font-size: 13.5px; line-height: 1.6; margin: 0 0 16px 0;">
            ${article.excerpt}
          </p>
          <div>
            <a href="${articleUrl}" style="display: inline-block; padding: 8px 18px; background-color: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.4); color: #0d9488; text-decoration: none; font-size: 12.5px; font-weight: 700; border-radius: 8px;">
              Read Full Article & VIP Data →
            </a>
          </div>
        </div>
      `;
    })
    .join("");

  const emailTemplateForUser = (userName?: string, userEmail?: string) => {
    // Privacy safeguard: never print backend admin emails in user templates
    const cleanUserEmail = userEmail && !userEmail.toLowerCase().includes("arnab") ? userEmail : "Subscriber";

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>${subject}</title>
        <style>
          body { margin: 0; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; }
          .container { max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; padding: 36px 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .badge { display: inline-block; padding: 5px 14px; border-radius: 50px; background-color: #e0f2fe; color: #0284c7; font-weight: 800; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
          .headline { font-size: 26px; margin: 12px 0 6px 0; font-family: Georgia, serif; color: #0f172a; }
          .article-card { background-color: #ffffff; }
          .cta-box { background: linear-gradient(135deg, rgba(13, 148, 136, 0.1), rgba(6, 182, 212, 0.08)); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 16px; padding: 22px; margin-top: 24px; text-align: center; }
          .footer { border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 20px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.6; }
          @media (prefers-color-scheme: dark) {
            body { background-color: #030712 !important; color: #f8fafc !important; }
            .container { background-color: #070c18 !important; border-color: #1e293b !important; box-shadow: 0 4px 25px rgba(0,0,0,0.6) !important; }
            .badge { background-color: rgba(20, 184, 166, 0.18) !important; color: #2dd4bf !important; }
            .headline { color: #ffffff !important; }
            .article-card { background-color: #0b1329 !important; border-color: #1e293b !important; }
            .article-card h3 a { color: #ffffff !important; }
            .article-card p { color: #94a3b8 !important; }
            .footer { border-color: #1e293b !important; color: #64748b !important; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge">👑 Daily VIP Intelligence Briefing</span>
            <p style="color: #64748b; font-size: 12px; margin: 8px 0 0 0; text-transform: uppercase;">${dateStr}</p>
            <h1 class="headline">The SmartMag Daily Chronicle</h1>
            <p style="color: #64748b; font-size: 14px; margin: 0;">Today's essential algorithmic, artificial intelligence, and frontier market breakthroughs.</p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-bottom: 20px;">
            <p style="font-size: 14px; line-height: 1.5; margin: 0;">
              ${userName ? `Good day <strong>${userName}</strong>,` : "Good day,"} here are today's highest-signal developments analyzed by our autonomous intelligence fleet:
            </p>
          </div>

          ${articlesHtml}

          <div class="cta-box">
            <h4 style="margin: 0 0 8px 0; color: #0d9488; font-size: 16px; font-weight: 800;">👑 Unrestricted VIP Inner Circle Lounge</h4>
            <p style="font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
              Your VIP status unlocks proprietary TradingView Pine Scripts, PDF strategy dossiers, and travel partner perks without paywalls or ads.
            </p>
            <a href="https://thesmartmag.com/vip" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #0d9488, #06b6d4); color: #ffffff !important; text-decoration: none; font-weight: 800; border-radius: 10px; font-size: 13px;">
              Access VIP Member Lounge →
            </a>
          </div>

          <div class="footer">
            <p style="margin: 0 0 6px 0;">
              Delivered to <strong>${cleanUserEmail}</strong>
            </p>
            <p style="margin: 0 0 10px 0;">
              <a href="https://thesmartmag.com/vip/profile" style="color: #0d9488; text-decoration: underline;">Manage Preferences</a> • 
              <a href="https://thesmartmag.com" style="color: #0d9488; text-decoration: underline;">TheSmartMag.com</a> • 
              <a href="https://thesmartmag.com/contact" style="color: #0d9488; text-decoration: underline;">Contact Desk</a>
            </p>
            <p style="margin: 0; font-size: 11px; color: #94a3b8;">
              © ${new Date().getFullYear()} The SmartMag Global Media. Official channels: support@thesmartmag.com, query@thesmartmag.com, contact@thesmartmag.com.
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
  };

  let dispatchedCount = 0;
  const errors: string[] = [];

  // Filter out any occurrences of private admin email from bulk recipient list
  const filteredRecipients = recipients.filter(
    (r) => r.email && !r.email.toLowerCase().includes("arnab.laha2018@gmail.com")
  );

  if (process.env.RESEND_API_KEY) {
    const batchSize = 10;
    for (let i = 0; i < filteredRecipients.length; i += batchSize) {
      const batch = filteredRecipients.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map(async (recipient) => {
          try {
            const res = await dispatchResendEmail({
              to: recipient.email,
              from: OFFICIAL_SENDERS.support,
              subject,
              html: emailTemplateForUser(recipient.name, recipient.email),
            });
            if (res.ok) {
              dispatchedCount++;
            } else {
              errors.push(`Failed for ${recipient.email}: ${res.error || res.status}`);
            }
          } catch (e: any) {
            errors.push(`Error for ${recipient.email}: ${e.message}`);
          }
        })
      );
    }
  } else {
    dispatchedCount = filteredRecipients.length;
    console.info(`[DAILY DIGEST] Generated daily viral digest for ${filteredRecipients.length} recipients.`);
  }

  return {
    success: true,
    dispatchedCount,
    errors,
  };
}
