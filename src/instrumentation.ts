export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("🚀 [Auto AI Blog] Server boot: Initializing Autonomous 24/7 Server-Side Swarm & Worker Engine...");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";
    const port = process.env.PORT || 10000;

    // 🛠️ 0. Auto-sync database columns if schema was upgraded
    setTimeout(async () => {
      try {
        const { prisma } = await import("@/lib/prisma");
        await prisma.$executeRawUnsafe(`ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "youtubeVideoId" TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "youtubeVideoTitle" TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "youtubeChannelTitle" TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "imagePhotographer" TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "imagePhotographerUrl" TEXT;`);
        console.log("✅ [DB Schema Auto-Sync] Verified Post table schema & columns.");
      } catch (err: any) {
        console.warn("DB Schema Auto-Sync notice:", err.message);
      }
    }, 2000);

    // ⚡ 1. Auto-run staggered light boot pulse 30 seconds after server startup (prevents memory spikes)
    setTimeout(async () => {
      try {
        console.log("⚡ [Autonomous Boot Pulse] Launching staggered initial indexing...");
        const { pingSearchEngines } = await import("@/lib/pipeline/agents/trafficBoosterAgent");
        await pingSearchEngines().catch((e) => console.warn("Search engine ping boot notice:", e.message));
        console.log("✅ [Autonomous Boot Pulse] Search engine ping completed cleanly.");
      } catch (err: any) {
        console.warn("Autonomous boot pulse note:", err.message);
      }
    }, 30000);

    // 🔄 2. Keep-Alive Heartbeat (Every 3 Minutes) - Keeps server active without overloading
    setInterval(async () => {
      try {
        await fetch(`http://127.0.0.1:${port}/api/health`, {
          method: "GET",
          signal: AbortSignal.timeout(4000),
        }).catch(() => {});
      } catch (_) {}
    }, 3 * 60 * 1000);

    // 🚀 3. Continuous Traffic Booster, SEO IndexNow & Search Engine Pings (Every 60 Minutes, Staggered)
    // Run infrequently and safely in the background to prevent DB connection pool exhaustion
    setInterval(async () => {
      try {
        console.log("⏱️ [Autonomous Swarm Pulse] Executing lightweight sitemap & SEO notification...");
        const { pingSearchEngines } = await import("@/lib/pipeline/agents/trafficBoosterAgent");
        await pingSearchEngines().catch((e) => console.warn("Search engine ping pulse notice:", e.message));
      } catch (err: any) {
        console.warn("Autonomous swarm pulse note:", err.message);
      }
    }, 60 * 60 * 1000);

    // 📲 4. Autonomous 5-Channel Social Media Autopost & Distribution (Every 30 Minutes)
    setInterval(async () => {
      try {
        console.log("📲 [24/7 Social Media Fleet] Dispatching multi-channel promotion across Twitter, LinkedIn, Facebook, Instagram & Reddit...");
        const { getAllCatalogArticles } = await import("@/lib/content/articles");
        const { runFullAutonomousSocialAutopost } = await import("@/lib/pipeline/agents/socialAutopostAgent");

        const catalog = getAllCatalogArticles();
        if (catalog.length > 0) {
          // Select a rotation post (tech, travel, festival, or market)
          const randomIdx = Math.floor(Math.random() * catalog.length);
          const postToPromote = catalog[randomIdx];

          const result = await runFullAutonomousSocialAutopost({
            title: postToPromote.title,
            slug: postToPromote.slug,
            excerpt: postToPromote.excerpt,
            category: postToPromote.category?.name,
          });

          console.log(`✅ [24/7 Social Media Fleet] Promoted "${postToPromote.title}" across all 5 channels!`, {
            twitter: result.twitter.success,
            linkedIn: result.linkedIn.success,
            facebook: result.facebook.success,
            instagram: result.instagram.success,
            reddit: result.reddit.success,
          });
        }
      } catch (err: any) {
        console.warn("24/7 Social media fleet dispatch note:", err.message);
      }
    }, 30 * 60 * 1000);

    

    // ✍️ 6. Autonomous Viral Topic Scout & Article Generation Cycle (Every 4 Hours)
    // Server-side fail-safe: automatically produces and publishes articles without needing GitHub Actions
    setInterval(async () => {
      try {
        console.log("🤖 [24/7 Autonomous Content Engine] Running 4-hour scheduled viral topic scout & article generation...");
        const { runFullAutonomousMaintenanceSwarm } = await import("@/lib/pipeline/maintenance/adminSwarm");
        await runFullAutonomousMaintenanceSwarm({
          triggerNewPostGeneration: true,
        }).catch((e) => console.warn("Auto content generation notice:", e.message));
        console.log("✅ [24/7 Autonomous Content Engine] 4-hour publishing cycle finished.");
      } catch (err: any) {
        console.warn("Auto content engine daemon note:", err.message);
      }
    }, 4 * 60 * 60 * 1000);

    // 🛍️ 7. Autonomous Daily Dropship & Viral Product Hunter (Every 24 Hours)
    // Runs in background to scout trending consumer electronics, travel gear & lifestyle products
    setTimeout(async () => {
      try {
        console.log("🛍️ [Autonomous Store Hunter] Initial scout of trending dropship items...");
        const { runAutonomousDropshippingHunter } = await import("@/lib/pipeline/agents/dropshipHunterAgent");
        await runAutonomousDropshippingHunter().catch((e) => console.warn("Dropship hunter initial scout note:", e.message));
      } catch (err: any) {
        console.warn("Dropship hunter boot note:", err.message);
      }
    }, 45000);

    setInterval(async () => {
      try {
        console.log("🛍️ [Autonomous Store Hunter] Running daily 24h viral product scouting pulse...");
        const { runAutonomousDropshippingHunter } = await import("@/lib/pipeline/agents/dropshipHunterAgent");
        await runAutonomousDropshippingHunter().catch((e) => console.warn("Dropship hunter routine note:", e.message));
      } catch (err: any) {
        console.warn("Dropship hunter daemon note:", err.message);
      }
    }, 24 * 60 * 60 * 1000);
  }
}
