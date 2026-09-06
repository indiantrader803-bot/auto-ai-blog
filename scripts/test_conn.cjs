const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function test() {
  try {
    await p.$connect();
    const count = await p.post.count();
    console.log('SUCCESS! Post count:', count);
  } catch (e) {
    console.log('FAILED:', e.message.slice(0, 200));
  } finally {
    await p.$disconnect();
  }
}

test();
