const https = require("node:https");

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.log("RESEND_API_KEY missing");
  process.exit(1);
}

const data = JSON.stringify({
  from: "SmartMag Leads <onboarding@resend.dev>",
  to: ["arnab.laha2018@gmail.com"],
  subject: "SmartMag System Verification - Email Notifications Active",
  html: `<div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
    <h2 style="color:#4f46e5;margin-top:0">SmartMag Email System Verified</h2>
    <p style="color:#475569">Your Resend API key is working correctly.</p>
  </div>`,
});

const req = https.request(
  {
    hostname: "api.resend.com",
    path: "/emails",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Length": Buffer.byteLength(data),
    },
  },
  (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => console.log("Status:", res.statusCode, body));
  }
);

req.on("error", (e) => console.error("Request error:", e.message));
req.write(data);
req.end();
