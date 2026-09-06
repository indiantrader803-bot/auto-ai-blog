const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const postCount = await prisma.post.count();
    const catCount = await prisma.category.count();
    console.log('Current DB Post count:', postCount);
    console.log('Current DB Category count:', catCount);
    const posts = await prisma.post.findMany({
      take: 10,
      select: { id: true, title: true, slug: true, status: true, category: true }
    });
    console.log('Sample posts in DB:\n', JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error('DB Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
