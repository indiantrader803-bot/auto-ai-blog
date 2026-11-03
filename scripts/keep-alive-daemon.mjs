// Self-contained, robust 24/7 background keep-alive heartbeat daemon
import https from "https";
import http from "http";

const TARGET_URLS = [
  "https://thesmartmag.com/api/health",
  "https://thesmartmag.com/",
  "https://store.thesmartmag.com",
  "https://travel.thesmartmag.com",
  "https://auto-ai-blog-web.onrender.com/api/health",
];

let pingCount = 0;

function pingUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { timeout: 15000 }, (res) => {
      resolve({ status: res.statusCode, url });
    });
    req.on("error", (err) => {
      resolve({ error: err.message, url });
    });
    req.on("timeout", () => {
      req.destroy();
      resolve({ timeout: true, url });
    });
  });
}

async function heartbeatPulse() {
  pingCount++;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ⚡ [24/7 Keep-Alive #${pingCount}] Sending active pulse...`);

  for (const url of TARGET_URLS) {
    try {
      const res = await pingUrl(url);
      if (res.status) {
        console.log(`  -> ${url}: HTTP ${res.status} OK`);
      } else {
        console.log(`  -> ${url}: ${res.error || "Timeout"}`);
      }
    } catch (_) {}
  }
}

// Initial ping
heartbeatPulse();

// Continuous pulse every 3 minutes (Render free tier sleeps after 15 minutes of inactivity)
const INTERVAL_MS = 3 * 60 * 1000;
setInterval(heartbeatPulse, INTERVAL_MS);

console.log("=================================================");
console.log("🚀 24/7 Render Keep-Alive Daemon Activated!");
console.log(`⏱️ Interval: Every 3 minutes (prevents sleep completely across all 3 domains)`);
console.log("=================================================");
