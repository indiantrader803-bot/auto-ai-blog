import { PrismaClient } from "@prisma/client";

const regions = [
  "aws-0-ap-southeast-1", // Singapore
  "aws-0-ap-southeast-2", // Sydney
  "aws-0-ap-northeast-1", // Tokyo
  "aws-0-ap-northeast-2", // Seoul
  "aws-0-eu-west-1", // Ireland
  "aws-0-eu-west-2", // London
  "aws-0-eu-west-3", // Paris
  "aws-0-eu-central-1", // Frankfurt
  "aws-0-us-east-1", // N. Virginia
  "aws-0-us-east-2", // Ohio
  "aws-0-us-west-1", // N. California
  "aws-0-us-west-2", // Oregon
  "aws-0-ca-central-1", // Canada
  "aws-0-sa-east-1", // Sao Paulo
  "aws-0-me-central-1", // UAE
  "aws-0-af-south-1" // Cape Town
];

async function testRegions() {
  for (const reg of regions) {
    const url = `postgresql://postgres.fwzxggorlqdjcwtyrnuw:Myjobmail%401234@${reg}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
    console.log("Checking region:", reg);
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
      await prisma.$connect();
      console.log("🎉 SUCCESS! Connected to region:", reg);
      const posts = await prisma.post.count();
      console.log("Post count in DB:", posts);
      await prisma.$disconnect();
      return reg;
    } catch (e) {
      if (!e.message.includes("tenant/user") && !e.message.includes("Can't reach database server")) {
        console.log("Response from", reg, ":", e.message.slice(0, 150));
      }
      await prisma.$disconnect().catch(() => {});
    }
  }
  console.log("None of the standard poolers matched.");
}

testRegions();
