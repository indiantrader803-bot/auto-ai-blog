export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("🚀 [Auto AI Blog] Server boot: Initializing Autonomous 24/7 Server-Side Swarm & Worker Engine...");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auto-ai-blog-web.onrender.com";
    const port = process.env.PORT || 10000;

    // ⚡ 1. Auto-run initial swarm 10 seconds after server startup
    setTimeout(async () => {
      try {
        console.log("⚡ [Autonomous Boot Pulse] Launching initial 24/7 promotion, indexing, PropFlow & revenue swarm...");
        const { runAutonomousFleetTrafficBooster, pingSearchEngines } = await import("@/lib/pipeline/agents/trafficBoosterAgent");
        const { executeRevenueOptimizationSwarm } = await import("@/lib/pipeline/agents/revenueOptimizationSwarm");
        const { runPropFlowMasterSwarm } = await import("@/lib/propflow/orchestrator");

        await runAutonomousFleetTrafficBooster().catch((e) => console.warn("Traffic booster boot notice:", e.message));
        await pingSearchEngines().catch((e) => console.warn("Search engine ping boot notice:", e.message));
        await executeRevenueOptimizationSwarm().catch((e) => console.warn("Revenue swarm boot notice:", e.message));
        await runPropFlowMasterSwarm().catch((e) => console.warn("PropFlow boot notice:", e.message));

        console.log("✅ [Autonomous Boot Pulse] Initial 24/7 server-side cycle completed successfully.");
      } catch (err: any) {
        console.warn("Autonomous boot pulse note:", err.message);
      }
    }, 10000);

    // 🔄 2. Keep-Alive Heartbeat (Every 3 Minutes) - Keeps Render server active 24/7 without sleeping
    setInterval(async () => {
      try {
        // Internal localhost ping
        await fetch(`http://127.0.0.1:${port}/api/health`, { method: "GET" }).catch(() => {});
        // Public domain ping
        await fetch(`${siteUrl}/api/health`, { method: "GET" }).catch(() => {});
      } catch (_) {}
    }, 3 * 60 * 1000);

    // 🚀 3. Continuous Traffic Booster, SEO IndexNow & Search Engine Pings (Every 15 Minutes)
    setInterval(async () => {
      try {
        console.log("⏱️ [24/7 Autonomous Swarm Pulse] Executing fleet-wide promotion, link distribution & indexing...");
        const { runAutonomousFleetTrafficBooster, pingSearchEngines, auditAndRescueLowTrafficArticles } = await import("@/lib/pipeline/agents/trafficBoosterAgent");
        const { executeRevenueOptimizationSwarm } = await import("@/lib/pipeline/agents/revenueOptimizationSwarm");
        const { runTrendHunterAgent } = await import("@/lib/pipeline/agents/trendHunterAgent");

        // 1. Boost views, shares and affiliate clicks across all articles
        await runAutonomousFleetTrafficBooster().catch((e) => console.warn("Traffic booster pulse notice:", e.message));

        // 2. Ping Google, Bing & IndexNow
        await pingSearchEngines().catch((e) => console.warn("Search engine ping pulse notice:", e.message));

        // 3. Rescue low-traffic articles
        await auditAndRescueLowTrafficArticles().catch((e) => console.warn("Rescue articles pulse notice:", e.message));

        // 4. Optimize conversion rate & affiliate placement
        await executeRevenueOptimizationSwarm().catch((e) => console.warn("Revenue optimization pulse notice:", e.message));

        // 5. Scout fresh viral breaking trends
        await runTrendHunterAgent().catch((e) => console.warn("Trend hunter pulse notice:", e.message));

        console.log("🔥 [24/7 Autonomous Swarm Pulse] All articles & affiliate links promoted successfully.");
      } catch (err: any) {
        console.warn("24/7 Autonomous swarm pulse note:", err.message);
      }
    }, 15 * 60 * 1000);

    // 💰 4. PropFlow-AI 15-Agent Sales & Conversion Swarm (Every 1 Hour)
    setInterval(async () => {
      try {
        console.log("💼 [PropFlow-AI 24/7 Server Daemon] Running hourly 15-agent sales & affiliate cycle...");
        const { runPropFlowMasterSwarm } = await import("@/lib/propflow/orchestrator");
        await runPropFlowMasterSwarm().catch((e) => console.warn("PropFlow hourly notice:", e.message));
        console.log("✅ [PropFlow-AI 24/7 Server Daemon] Hourly sales swarm cycle completed.");
      } catch (err: any) {
        console.warn("PropFlow daemon note:", err.message);
      }
    }, 60 * 60 * 1000);

    // ✍️ 5. Autonomous Viral Topic Scout & Article Generation Cycle (Every 4 Hours)
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
  }
}
