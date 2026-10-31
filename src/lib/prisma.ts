import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Tune connection limits & timeouts for PostgreSQL/Supabase to prevent P2024 pool exhaustion & statement timeouts
function getOptimizedDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  
  // Only inject if parameters are missing
  let updated = url;
  const sep = updated.includes("?") ? "&" : "?";
  if (!updated.includes("connection_limit=")) {
    updated += `${sep}connection_limit=10`;
  }
  const nextSep = updated.includes("?") ? "&" : "?";
  if (!updated.includes("pool_timeout=")) {
    updated += `${nextSep}pool_timeout=25`;
  }
  return updated;
}

const dbUrl = getOptimizedDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: dbUrl
      ? {
          db: {
            url: dbUrl,
          },
        }
      : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

// Unconditional singleton retention to prevent duplicate connection pools & V8 memory leaks
globalForPrisma.prisma = prisma;

// Graceful container shutdown cleanup
if (typeof process !== "undefined") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
}
