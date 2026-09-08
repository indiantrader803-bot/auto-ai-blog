const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Testing fleet view stats before pulse...");
  const posts = await prisma.post.findMany({
    select: { id: true, title: true, slug: true, views: true, shares: true },
    take: 5
  });
  console.log("Sample current stats:", posts);
  await prisma.$disconnect();
}

main().catch(console.error);
