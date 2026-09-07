import { runBlogPipeline } from "../src/lib/pipeline/orchestrator.ts";

async function main() {
  console.log("🚀 Manually triggering AI Generation Pipeline to publish a brand new article today...");
  const result = await runBlogPipeline(
    {
      niche: "Artificial Intelligence, Telecom & Tech Gadgets",
      autoPublish: true,
    },
    (progress) => {
      console.log(`[${progress.percent}%] (${progress.step}): ${progress.message}`);
    }
  );

  console.log("\nPipeline Execution Result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
