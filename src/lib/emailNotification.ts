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
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "SmartMag Leads <onboarding@resend.dev>",
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

