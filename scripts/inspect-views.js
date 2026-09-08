const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    select: { id: true, title: true, slug: true, views: true, publishedAt: true }
  });
  console.log('Total posts in database:', posts.length);
  const zeroViews = posts.filter(p => !p.views || p.views === 0);
  const under500 = posts.filter(p => (p.views || 0) < 500);
  console.log('Zero views count:', zeroViews.length);
  console.log('Under 500 views count:', under500.length);
  console.log('\nSample posts and their views:');
  posts.slice(0, 15).forEach(p => {
    console.log(`[views: ${(p.views || 0).toString().padStart(4, ' ')}] ${p.title.slice(0, 60)}... (${p.slug})`);
  });
  await prisma.$disconnect();
}

main().catch(console.error);
