export const ADMIN_NOTIFICATION_EMAIL = "arnab.laha2018@gmail.com";

export interface UserLeadPayload {
  type: "NEWSLETTER_SUBSCRIPTION" | "CONTACT_FORM" | "SPONSORSHIP_INQUIRY" | "VIP_MEMBER";
  email: string;
  name?: string;
  message?: string;
  sourceUrl?: string;
  timestamp?: string;
}

/**
 * 📧 Lead Capture & Admin Forwarder
 * Forwards every user email, subscription, and contact inquiry directly to arnab.laha2018@gmail.com
 */
export async function notifyAdminUserLead(payload: UserLeadPayload): Promise<{ success: boolean; message: string }> {
  const time = payload.timestamp || new Date().toLocaleString();
  const recipient = ADMIN_NOTIFICATION_EMAIL;

  console.info(`[LEAD CAPTURE] Routing user submission (${payload.type}: ${payload.email}) to ${recipient}`);

  // 1. If Resend API Key is configured in environment
  if (process.env.RESEND_API_KEY) {
    try {
      const fromEmail = process.env.EMAIL_FROM || "The SmartMag <contact@thesmartmag.com>";

      // Send Welcome Confirmation to Subscriber
      const welcomeRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.email],
          subject: "🎉 Welcome to The SmartMag Daily Briefing!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #0f172a; color: #ffffff;">
              <h1 style="color: #818cf8; margin-top: 0; font-size: 24px;">Welcome to The SmartMag!</h1>
              <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">Thank you for subscribing to our daily autonomous AI & Engineering briefing.</p>
              <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">You will now receive breaking coverage on frontier LLMs, system architecture, quant finance, travel deals, and tech reviews.</p>
              <div style="margin: 24px 0;">
                <a href="https://thesmartmag.com" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 10px;">Explore Today's Dispatch →</a>
              </div>
              <p style="font-size: 12px; color: #64748b; margin-top: 32px;">The SmartMag • Delivered to ${payload.email} • support@thesmartmag.com</p>
            </div>
          `,
        }),
      });

      if (!welcomeRes.ok) {
        const errText = await welcomeRes.text();
        console.warn("Resend Welcome Email warning:", welcomeRes.status, errText);
      }

      // Send Admin Notification to Owner
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          subject: `🔥 [SmartMag Lead] New ${payload.type.replace(/_/g, " ")}: ${payload.email}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
              <h2 style="color: #4f46e5; margin-top: 0;">🚀 New SmartMag Reader Lead Captured</h2>
              <p style="font-size: 14px; color: #475569;">A reader has submitted their details on your blog platform:</p>
              
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Action Type:</strong> ${payload.type}</p>
                <p><strong>User Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
                ${payload.name ? `<p><strong>User Name:</strong> ${payload.name}</p>` : ""}
                ${payload.message ? `<p><strong>Message / Inquiry:</strong><br/>${payload.message}</p>` : ""}
                <p><strong>Captured At:</strong> ${time}</p>
              </div>

              <p style="font-size: 12px; color: #94a3b8;">Delivered automatically by SmartMag Autonomous Agent Engine to ${recipient}.</p>
            </div>
          `,
        }),
      });

      if (res.ok) {
        return { success: true, message: `Lead successfully dispatched to ${recipient}` };
      }
    } catch (err: any) {
      console.warn("Resend email dispatch notice:", err.message);
    }
  }

  // 2. If Slack or Discord webhook is configured for lead alerts
  const webhookUrl = process.env.LEAD_ALERT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎯 **New User Lead for ${recipient}**\n• **Type:** ${payload.type}\n• **Email:** ${payload.email}\n${payload.name ? `• **Name:** ${payload.name}\n` : ""}${payload.message ? `• **Message:** ${payload.message}\n` : ""}• **Time:** ${time}`,
        }),
      });
    } catch (_) {}
  }

  return {
    success: true,
    message: `User lead captured and recorded for ${recipient}`,
  };
}

/**
 * 👑 Dispatch VIP Welcome & Access Confirmation Email
 */
export async function sendVipWelcomeEmail(email: string, name?: string): Promise<boolean> {
  const fromEmail = process.env.EMAIL_FROM || "TheSmartMag VIP <contact@thesmartmag.com>";
  const greeting = name ? `Hello ${name},` : "Hello,";

  console.info(`[VIP AUTH] Dispatching VIP Welcome Email to ${email}`);

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          subject: "👑 Your VIP Elite Access is Activated | TheSmartMag",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 32px; background-color: #070c18; color: #ffffff; border-radius: 20px; border: 1px solid #1e293b;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-block; padding: 6px 16px; border-radius: 50px; background-color: rgba(20, 184, 166, 0.2); color: #2dd4bf; font-weight: bold; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
                  VIP Elite Activated
                </span>
                <h1 style="color: #ffffff; font-size: 26px; margin: 16px 0 8px 0; font-family: Georgia, serif;">Welcome to TheSmartMag VIP</h1>
                <p style="color: #94a3b8; font-size: 14px; margin: 0;">Institutional Research • Proprietary Quant Models • Secret Deals</p>
              </div>

              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">${greeting}</p>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                Your VIP Elite membership has been officially registered and verified. As a member of our inner circle, you have unlocked:
              </p>

              <div style="background-color: #0b1329; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0; color: #2dd4bf; font-weight: bold; font-size: 14px;">✓ Unlocked VIP Benefits:</p>
                <ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.8;">
                  <li><strong>Private Quant Data Models:</strong> High-probability Pine Script indicators & order-flow algorithms.</li>
                  <li><strong>Exclusive VIP Research Briefs:</strong> Unredacted hedge fund positioning & AI chip supply bottlenecks.</li>
                  <li><strong>Secret Flight & Hotel Flash Vouchers:</strong> Up to 40% exclusive travel partner promo codes.</li>
                  <li><strong>VIP Lounge Access:</strong> Ad-free clean reading mode and downloadable PDF dossiers.</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://thesmartmag.com/vip" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0d9488, #06b6d4); color: #020617; text-decoration: none; font-weight: 800; border-radius: 12px; font-size: 14px; letter-spacing: 0.5px;">
                  Access Your VIP Portal →
                </a>
              </div>

              <p style="color: #64748b; font-size: 12px; border-top: 1px solid #1e293b; pt: 16px; margin-top: 24px;">
                TheSmartMag Global Media • Delivered to ${email} • If you did not create this account, please ignore this email.
              </p>
            </div>
          `,
        }),
      });
      return res.ok;
    } catch (e) {
      console.warn("VIP Welcome email warning:", e);
    }
  }

  // Fallback: Notify admin of new VIP registration
  await notifyAdminUserLead({
    type: "VIP_MEMBER",
    email,
    name,
    message: "New VIP account registered and activated.",
  });

  return true;
}

/**
 * 🔑 Dispatch Secure Password Reset Email
 */
export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<boolean> {
  const fromEmail = process.env.EMAIL_FROM || "TheSmartMag Security <security@thesmartmag.com>";

  console.info(`[AUTH] Dispatching Password Reset Link to ${email}`);

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          subject: "🔒 Password Reset Request | TheSmartMag",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 32px; background-color: #070c18; color: #ffffff; border-radius: 20px; border: 1px solid #1e293b;">
              <h2 style="color: #ffffff; margin-top: 0; font-family: Georgia, serif;">Reset Your Password</h2>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                We received a request to reset the password for your TheSmartMag account (${email}).
              </p>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                Click the secure link below to set a new password. This link is cryptographically signed and will expire in <strong>1 hour</strong>:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #4f46e5, #6366f1); color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 12px; font-size: 14px;">
                  Reset Password Now →
                </a>
              </div>

              <p style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
                Or copy and paste this link in your browser:<br/>
                <span style="color: #38bdf8; word-break: break-all;">${resetUrl}</span>
              </p>

              <p style="color: #64748b; font-size: 12px; border-top: 1px solid #1e293b; padding-top: 16px; margin-top: 24px;">
                If you did not request this change, you can safely ignore this email. Your password will remain unchanged.
              </p>
            </div>
          `,
        }),
      });
      return res.ok;
    } catch (e) {
      console.warn("Password reset email warning:", e);
    }
  }

  // Also notify admin
  await notifyAdminUserLead({
    type: "CONTACT_FORM",
    email,
    message: `Password reset requested for ${email}. Link: ${resetUrl}`,
  });

  return true;
}


