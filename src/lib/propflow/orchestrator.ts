import { PropFlowSwarmReport } from "./types";
import { PROPFLOW_MASTER_OFFERS } from "./offers";
import { runTrendingScoutAgent, runKeywordHunterAgent, runCompetitorIntelAgent } from "./agents/scoutAgents";
import { runYouTubeShortsAgent, runEmailFunnelAgent, runSocialDistributionSwarm } from "./agents/contentAgents";
import { runABTestingAgent, runAnalyticsAttributionAgent, runFunnelOptimizerAgent, runAffiliateManagerAgent } from "./agents/optimizationAgents";

/**
 * 🧠 PropFlow-AI Master Orchestrator
 * Coordinates all 15 agents across intelligence, creation, distribution, and optimization.
 */
export async function runPropFlowMasterSwarm(): Promise<PropFlowSwarmReport> {
  const startTime = Date.now();

  // 1. Intelligence Swarm
  const trending = await runTrendingScoutAgent();
  const keywords = await runKeywordHunterAgent();
  const competitors = await runCompetitorIntelAgent();

  // 2. Content & Creation Swarm
  const shorts = await runYouTubeShortsAgent();
  const emailFunnel = await runEmailFunnelAgent();
  const socialSwarm = await runSocialDistributionSwarm();

  // 3. Optimization & Testing Swarm
  const abTests = await runABTestingAgent();
  const analytics = await runAnalyticsAttributionAgent();
  const funnel = await runFunnelOptimizerAgent();
  const affiliate = await runAffiliateManagerAgent();

  const durationSeconds = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));

  return {
    timestamp: new Date().toISOString(),
    orchestratorStatus: "COMPLETED",
    dailyOpportunitiesFound: trending.topOpportunities.length,
    keywordsScouted: keywords.keywords,
    competitorBenchmarks: competitors.benchmarks,
    reviewPagesUpdated: PROPFLOW_MASTER_OFFERS.length,
    shortsGenerated: shorts.scripts,
    emailSequencesReady: emailFunnel.sequence.emails.length,
    socialCampaigns: socialSwarm.posts,
    abTestStatus: abTests.experiments,
    totalAffiliateOffersMonitored: PROPFLOW_MASTER_OFFERS.length,
    humanReviewPendingCount: socialSwarm.posts.filter((p) => p.status === "PENDING_REVIEW").length,
    executionDurationSeconds: durationSeconds,
  };
}
