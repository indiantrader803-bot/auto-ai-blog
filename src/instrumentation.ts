export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("🚀 [Auto AI Blog] Server boot: Initializing Autonomous 24/7 Traffic & Swarm Engine...");

    // Auto-run after 20 seconds of server startup
    setTimeout(async () => {
      try {
        const { runAutonomousFleetTrafficBooster } = await import("@/lib/pipeline/agents/trafficBoosterAgent");
        console.log("⚡ [Autonomous Boot Pulse] Executing initial multi-post traffic boost...");
        await runAutonomousFleetTrafficBooster();
      } catch (err: any) {
        console.warn("Autonomous boot pulse note:", err.message);
      }
    }, 20000);

    // Auto-run recurring background interval every 25 minutes (100% autonomous 24/7)
    setInterval(async () => {
      try {
        const { runAutonomousFleetTrafficBooster } = await import("@/lib/pipeline/agents/trafficBoosterAgent");
        console.log("⏱️ [Autonomous 25-Min Interval] Running fleet traffic and view generation across all posts...");
        await runAutonomousFleetTrafficBooster();
      } catch (err: any) {
        console.warn("Autonomous 25-min interval note:", err.message);
      }
    }, 25 * 60 * 1000);
  }
}
