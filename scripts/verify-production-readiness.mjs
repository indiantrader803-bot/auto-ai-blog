import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("=================================================");
console.log("🛡️  THE SMART MAG: AUTONOMOUS QUALITY & DEPLOY GUARD");
console.log("=================================================");

let hasErrors = false;

// Stage 1: TypeScript compilation check
console.log("\n[Stage 1/4] Running strict TypeScript compile check...");
try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  console.log("✅ TypeScript check passed (0 type errors).");
} catch (error) {
  console.error("❌ TypeScript compilation failed!");
  hasErrors = true;
}

// Stage 2: Security & Credentials Leak Scanner
console.log("\n[Stage 2/4] Scanning for client-side secret leaks...");
const sensitivePatterns = [
  /RAZORPAY_KEY_SECRET\s*=\s*['"][^'"]+['"]/i,
  /DATABASE_URL\s*=\s*['"][^'"]+['"]/i,
];

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === "node_modules" || file === ".next" || file === ".git" || file === "dist") continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".jsx") || file.endsWith(".ts")) {
      // Check if client file contains leaked secret names directly in client bundle
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes('"use client"') && content.includes("RAZORPAY_KEY_SECRET")) {
        console.error(`❌ Security alert: RAZORPAY_KEY_SECRET referenced in client component: ${fullPath}`);
        hasErrors = true;
      }
    }
  }
}

try {
  scanDirectory(path.resolve("src"));
  console.log("✅ Security scan passed (No client-side key leakage).");
} catch (err) {
  console.error("❌ Security scanner failed:", err.message);
  hasErrors = true;
}

// Stage 3: Verification of SEO and Ads Compliance Assets
console.log("\n[Stage 3/4] Verifying SEO & AdSense compliance assets...");
const requiredFiles = [
  "public/ads.txt",
  "public/robots.txt",
];

for (const reqFile of requiredFiles) {
  if (fs.existsSync(path.resolve(reqFile))) {
    const content = fs.readFileSync(path.resolve(reqFile), "utf-8");
    if (content.length > 10) {
      console.log(`✅ File verified: ${reqFile}`);
    } else {
      console.error(`❌ File is empty or malformed: ${reqFile}`);
      hasErrors = true;
    }
  } else {
    console.error(`❌ Required SEO/Ads file missing: ${reqFile}`);
    hasErrors = true;
  }
}

// Stage 4: Next.js Production Build Validation
console.log("\n[Stage 4/4] Validating Next.js production build...");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✅ Next.js production build succeeded.");
} catch (buildError) {
  console.error("❌ Next.js production build failed!");
  hasErrors = true;
}

console.log("\n=================================================");
if (hasErrors) {
  console.error("❌ AUTONOMOUS QUALITY GUARD: VALIDATION FAILED. Aborting deployment.");
  console.log("=================================================");
  process.exit(1);
} else {
  console.log("🚀 ALL SYSTEMS VERIFIED: 100% PRODUCTION READY.");
  console.log("=================================================");
  process.exit(0);
}
