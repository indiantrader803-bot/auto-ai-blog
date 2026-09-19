# Platform Audit Report: TheSmartMag & Subdomains

**Audit Date:** September 19, 2026  
**Audited Targets:** `thesmartmag.com`, `travel.thesmartmag.com`, `trade.thesmartmag.com`, `store`  
**Execution Environment:** Production Node.js on Render (`srv-dafdte0n74is739jk5n0`) & Supabase Enterprise PostgreSQL  

---

## 1. Executive Summary

This platform audit evaluates the infrastructure, compute topology, network orchestration, and cross-subdomain routing of **TheSmartMag** ecosystem. 

| System Component | Technology Stack | Hosting & Deployment | Health / Bottleneck Status |
| :--- | :--- | :--- | :--- |
| **Main Editorial Hub** | Next.js 14.2.10 (App Router), React 18.3, TailwindCSS | Render Web Service (Node.js Linux Container) | **Warning:** Heavy SSR memory pressure, missing route cache headers |
| **Travel Sub-Brand** | Dynamic Next.js rewrite route (`/travel` & `/travel/[destination]`) | Render Web Service via Subdomain Middleware | **Warning:** Large monolithic initial bundle (169 kB First Load JS) |
| **Trade Sub-Brand** | Dedicated Next.js rewrite route (`/trade`) | Render Web Service via Subdomain Middleware | **Good:** Lightweight static components, minimal DB queries |
| **AI Store Sub-Project** | Next.js 15.1.6, React 19.0, Supabase JS client (`/store`) | Standalone subproject | **Notice:** Version mismatch (React 18 vs React 19) |
| **Database Tier** | PostgreSQL 15+ (Supabase) via Prisma ORM 5.19 | Supabase Cloud | **Critical:** High connection count, missing indexes, RAM exhaustion |

---

## 2. Infrastructure & Compute Topology

### 2.1 Render Web Service Container
- **Service ID:** `srv-dafdte0n74is739jk5n0`
- **Assigned RAM:** Starter/Standard Tier (512 MB – 1 GB limit)
- **Observed Behavior:** 
  - Prisma client instances are repeatedly initialized when `globalForPrisma` is not preserved in production environments (`src/lib/prisma.ts`).
  - Next.js server runtime processes large markdown article payloads directly inside memory buffers when querying `Post.findMany` without column projections (`select`).
  - Node.js garbage collection struggles under burst traffic due to retained Prisma query cache and uncompressed in-memory structures.

### 2.2 Routing & Subdomain Middleware
- **Middleware Path:** `src/middleware.ts` (27 kB bundle footprint)
- **Subdomain Handling:**
  - `travel.thesmartmag.com` rewrites to `/travel` and `/travel/:path*`
  - `trade.thesmartmag.com` rewrites to `/trade` and `/trade/:path*`
- **Observations:** Middleware runs on edge/Node runtime cleanly, but lacks edge-level cache headers (`Cache-Control: s-maxage=...`) causing every request to hit the server container.

---

## 3. Bottleneck Identification Matrix

| Bottleneck Category | Root Cause | Impact | Recommended Resolution |
| :--- | :--- | :--- | :--- |
| **Compute / CPU** | Dynamic SSR on every page hit (`export const dynamic = "force-dynamic"`, `revalidate = 0`) | High CPU spikes on Render, sluggish TTFB | Switch to Incremental Static Regeneration (ISR) with stale-while-revalidate (60s homepage, 300s articles). |
| **I/O & Wire Transfer** | Full `content` column fetched in article listings | 200–500 KB uncompressed JSON transferred per query | Use Prisma `select` projections for lists; omit `content` markdown. |
| **Database Pool** | Direct DB connections without Supavisor/PgBouncer pooling parameters | Connection exhaustion ("too many clients"), Supabase RAM spike | Append `?pgbouncer=true&connection_limit=10` to `DATABASE_URL`. |
| **Client Bundle** | Monolithic inclusion of all travel components and heavy icons | 169 kB First Load JS on travel; 162 kB on admin | Code-split with `React.lazy` / `next/dynamic` and enable `modularizeImports`. |

---

## 4. Architectural Stability Status

- **Routes Verified:** All 45 static/dynamic routes build cleanly with 0 errors (`prisma generate && next build`).
- **Data Integrity:** No data deletion is permitted. All schema changes must be non-destructive (additive indexes and views).
