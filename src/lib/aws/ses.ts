import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export function getSESClient() {
  const region = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) return null;

  return new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function sendNewsletterBroadcastSES(
  toAddresses: string[],
  subject: string,
  articleTitle: string,
  articleExcerpt: string,
  articleUrl: string
): Promise<boolean> {
  const ses = getSESClient();
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;

  if (!ses || !fromEmail || toAddresses.length === 0) return false;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b;">
      <h2 style="color: #4f46e5; margin-bottom: 8px;">AutoAI Chronicle Daily Briefing</h2>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <h3 style="font-size: 20px; color: #0f172a;">${articleTitle}</h3>
      <p style="font-size: 15px; line-height: 1.6; color: #475569;">${articleExcerpt}</p>
      <div style="margin: 24px 0;">
        <a href="${articleUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
          Read Full Deep Dive →
        </a>
      </div>
      <p style="font-size: 11px; color: #94a3b8; margin-top: 30px;">
        You received this because you subscribed to AutoAI Chronicle. <a href="${articleUrl}" style="color: #94a3b8;">Unsubscribe</a> anytime.
      </p>
    </div>
  `;

  try {
    for (const email of toAddresses) {
      await ses.send(
        new SendEmailCommand({
          Source: fromEmail,
          Destination: {
            ToAddresses: [email],
          },
          Message: {
            Subject: { Data: subject },
            Body: {
              Html: { Data: htmlBody },
            },
          },
        })
      );
    }
    return true;
  } catch (err: any) {
    console.warn("AWS SES Newsletter send notice:", err.message);
    return false;
  }
}
