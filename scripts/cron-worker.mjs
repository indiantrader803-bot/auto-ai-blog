import cron from "node-cron";
import { exec } from "child_process";

console.log("==========================================");
console.log("⚡ Auto AI Blog 24/7 Server-Side Cron Daemon");
console.log("==========================================");

const DOMAINS = [
  "https://thesmartmag.com",
  "https://store.thesmartmag.com",
  "https://travel.thesmartmag.com",
  "https://auto-ai-blog-web.onrender.com",
];

// Schedule 1: Every 3 minutes - Keep-alive & Health pulse across all 3 sites to prevent sleep
cron.schedule("*/3 * * * *", () => {
  for (const d of DOMAINS) {
    fetch(`${d}/api/health`, { cache: "no-store" }).catch(() => {});
  }
});

// Schedule 2: Every 15 minutes - Traffic booster, ad studio campaigns & SEO pings
cron.schedule("*/15 * * * *", () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";
  const secret = process.env.CRON_SECRET || "auto-blog-secure-key-2025";
  fetch(`${siteUrl}/api/cron?secret=${secret}`, { method: "POST" }).catch(() => {});
});

// Schedule 3: Every hour - PropFlow Sales & Monetization Swarm
cron.schedule("0 * * * *", () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";
  fetch(`${siteUrl}/api/propflow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "TRIGGER_DAILY_CYCLE" }),
  }).catch(() => {});
});

// Schedule 4: Every 4 hours - Scheduled AI Article Generation CLI
cron.schedule("0 */4 * * *", () => {
  console.log(`[${new Date().toISOString()}] Triggering Scheduled Blog Generation CLI...`);
  exec("node scripts/generate-cli.mjs", (error, stdout) => {
    if (error) {
      console.error("CLI execution note:", error.message);
      return;
    }
    console.log(stdout);
  });
});

console.log("🚀 24/7 Multi-tier Cron Schedules Active (3m keep-alive, 15m ads/seo, 1h propflow, 4h articles).");
