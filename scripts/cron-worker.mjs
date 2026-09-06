import cron from "node-cron";
import { exec } from "child_process";

const schedule = process.env.CRON_SCHEDULE || "0 8 * * *";

console.log("==========================================");
console.log(`⏱️ Auto AI Blog Cron Daemon Started`);
console.log(`📅 Active Schedule: "${schedule}"`);
console.log("==========================================");

cron.schedule(schedule, () => {
  console.log(`[${new Date().toISOString()}] 🚀 Triggering Scheduled Blog Generation...`);
  exec("node scripts/generate-cli.mjs", (error, stdout, stderr) => {
    if (error) {
      console.error(`Cron Job execution error:`, error);
      return;
    }
    console.log(stdout);
  });
});
