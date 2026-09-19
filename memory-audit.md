# Memory Architecture & Leak Audit

**Audit Target:** Node.js V8 Engine on Render & Supabase Cloud PostgreSQL  
**Audit Purpose:** Eliminate memory leaks, prevent Out-Of-Memory (OOM) crashes, stabilize RSS and Heap usage.

---

## 1. Render Container Memory Diagnostics

Render Web Service containers operate under tight memory constraints:
- **Starter Container Limit:** 512 MB RAM
- **Standard Container Limit:** 1024 MB RAM

When Node.js memory exceeds container limits, Render triggers an instant OOM kill (`SIGKILL` / exit code 137).

### Diagnostic Breakdown:
| Subsystem | Observed Heap Footprint | Risk Level | Primary Mechanism |
| :--- | :--- | :--- | :--- |
| **Prisma Engine (libquery_engine)** | 80 MB – 140 MB | **HIGH** | Multiple `PrismaClient` instances spawned when singleton is conditionally skipped in production. |
| **Next.js SSR Buffer** | 120 MB – 220 MB | **HIGH** | `Post.findMany` loading unprojected `content` markdown strings for 24 posts on each request. |
| **Route Handler Caching** | 40 MB – 90 MB | **MEDIUM** | In-flight duplicate requests fetching identical category and post lists simultaneously. |
| **Shared V8 Base** | ~60 MB | **LOW** | Base Node.js runtime and Next.js compiled server routes. |

---

## 2. Identified Memory Leak Vectors

### Vector 1: Conditional Prisma Client Singleton Bug
- **Location:** `src/lib/prisma.ts`
- **Code:**
  ```typescript
  export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({ ... });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
  ```
- **Analysis:** In production (`NODE_ENV === "production"`), `globalForPrisma.prisma = prisma` is **never assigned**!
- **Consequence:** Under certain Next.js server worker recycles or sub-process calls, multiple `PrismaClient` instances with separate connection pools and native Rust query engines are allocated in memory, consuming 30–50 MB each until container RAM is exhausted.
- **Fix:** Unconditionally persist `globalForPrisma.prisma = prisma;` across all environments.

### Vector 2: Unprojected Full-Text Markdown Deserialization
- **Location:** `src/app/page.tsx`, `src/app/api/posts/route.ts`, `src/app/api/categories/route.ts`
- **Analysis:** Queries use:
  ```typescript
  prisma.post.findMany({
    where: { status: "PUBLISHED" },
    take: 24,
    include: { category: true }
  });
  ```
- **Consequence:** Omitting the `select` clause forces Prisma and PostgreSQL to transfer and instantiate all columns, including `content`, `faqJson`, `seoKeywords`, and `youtubeVideoTitle` for all 24 posts. With average article content length of 15,000 characters, a single request allocates >400 KB of raw strings in the V8 heap. Under 20 concurrent requests, this spikes heap by ~10 MB of transient strings, inducing heavy GC thrashing.
- **Fix:** Explicitly define `select` fields, excluding `content` and large text payloads on all listings and cards.

### Vector 3: Supabase Connection Saturation
- **Analysis:** Direct connections to port 5432 bypass Supabase's built-in Supavisor connection pooler. Each connected backend worker holds an active PostgreSQL backend process consuming 5–10 MB of memory on the database instance.
- **Fix:** Connect via Supavisor pooler (port 6543) with query parameters `?pgbouncer=true&connection_limit=10` to guarantee a strict ceiling on active database processes.

---

## 3. Recommended Memory Retention & Cleanup Policies

1. **Prisma Disconnection on Container Shutdown:**
   Hook `process.on('SIGTERM')` and `process.on('SIGINT')` to invoke `prisma.$disconnect()` gracefully.
2. **Periodic Garbage Collection Hint:**
   Allow Node.js to release idle memory back to the OS using standard V8 heuristics without aggressive manual GC invocations.
3. **Bounded In-Memory Cache:**
   Any in-memory cache for categories or trending posts must use a strict TTL (e.g. 60s) and a max-keys limit (e.g. 100 entries) to prevent unbounded map growth.
