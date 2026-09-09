// Self-contained, robust 24/7 background keep-alive heartbeat daemon
import https from "https";
import http from "http";

const TARGET_URLS = [
  "https://auto-ai-blog-web.onrender.com/api/health",
  "https://auto-ai-blog-web.onrender.com/",
  "https://auto-ai-blog-web.onrender.com/community",
  "https://auto-ai-blog-web.onrender.com/store"
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

// Continuous pulse every 4 minutes (Render sleeps after 15 minutes of inactivity)
const INTERVAL_MS = 4 * 60 * 1000;
setInterval(heartbeatPulse, INTERVAL_MS);

console.log("=================================================");
console.log("🚀 24/7 Render Keep-Alive Daemon Activated!");
console.log(`⏱️ Interval: Every 4 minutes (prevents sleep completely)`);
console.log("=================================================");
