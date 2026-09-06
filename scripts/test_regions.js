const { PrismaClient } = require('@prisma/client');

const regions = [
  'ap-south-1',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-north-1',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-northeast-2',
  'sa-east-1',
  'ca-central-1',
  'me-central-1'
];

async function testAll() {
  for (const r of regions) {
    const url = `postgresql://postgres.fwzxggorlqdjcwtyrnuw:Myjobmail%401234@aws-0-${r}.pooler.supabase.com:5432/postgres?pgbouncer=true`;
    const prisma = new PrismaClient({
      datasources: { db: { url } },
      log: ['error']
    });
    try {
      console.log('Testing region:', r);
      await prisma.$connect();
      const count = await prisma.post.count();
      console.log('>>> SUCCESS! Connected to Supabase in region:', r);
      console.log('>>> Database Post Count:', count);
      await prisma.$disconnect();
      return url;
    } catch (err) {
      // not this region
      await prisma.$disconnect().catch(() => {});
    }
  }
  console.log('No region matched.');
}

testAll().then(url => {
  if (url) console.log('Correct DATABASE_URL is:', url);
});
