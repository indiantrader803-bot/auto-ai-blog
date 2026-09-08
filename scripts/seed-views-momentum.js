const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function getDeterministicNumber(seedStr, min, max) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const normalized = Math.abs(hash) / 2147483647;
  return Math.floor(min + normalized * (max - min));
}

async function main() {
  console.log('⚡ Starting View & Engagement Momentum Seeder for all database articles...');
  
  const posts = await prisma.post.findMany({
    include: { category: true }
  });
  
  console.log(`Found ${posts.length} articles in database.`);
  let updatedCount = 0;

  for (const post of posts) {
    const currentViews = post.views || 0;
    const currentShares = post.shares || 0;

    // If views are low (< 800) or shares are 0, seed realistic numbers
    if (currentViews < 800 || currentShares < 10) {
      const catSlug = post.category?.slug || 'tech';
      
      // Category multiplier for high-demand topics
      let minViews = 1250;
      let maxViews = 3800;

      if (['artificial-intelligence', 'indian-markets', 'us-markets', 'finance-and-markets', 'telecom-and-connectivity'].includes(catSlug)) {
        minViews = 1850;
        maxViews = 4920;
      } else if (['development-and-engineering', 'technology'].includes(catSlug)) {
        minViews = 1450;
        maxViews = 4200;
      }

      // Calculate view count deterministically based on slug + title so it stays consistent
      const seededViews = getDeterministicNumber(post.slug + post.title, minViews, maxViews);
      // Realistic shares: ~2% - 4.5% of views
      const sharePercentage = getDeterministicNumber(post.title, 20, 45) / 1000;
      const seededShares = Math.max(12, Math.floor(seededViews * sharePercentage));

      // Calculate read time from content length if needed
      const wordCount = post.content ? post.content.split(/\s+/).length : 800;
      const calculatedReadTime = Math.max(4, Math.ceil(wordCount / 220));

      await prisma.post.update({
        where: { id: post.id },
        data: {
          views: currentViews < 800 ? seededViews : currentViews,
          shares: currentShares < 10 ? seededShares : currentShares,
          readTimeMinutes: (!post.readTimeMinutes || post.readTimeMinutes < 2) ? calculatedReadTime : post.readTimeMinutes,
        }
      });

      console.log(`✔ [Updated] ${post.title.slice(0, 45)}... -> Views: ${seededViews} (was ${currentViews}), Shares: ${seededShares}, ReadTime: ${calculatedReadTime}m`);
      updatedCount++;
    }
  }

  console.log(`\n🎉 Successfully upgraded ${updatedCount} articles with authentic reader momentum!`);
  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Error seeding momentum:', err);
  process.exit(1);
});
