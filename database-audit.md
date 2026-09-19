# Supabase Enterprise & Database Performance Audit

**Audit Target:** Supabase PostgreSQL Database Tier via Prisma ORM  
**Issue Diagnosis:** Database memory saturation, query latency spikes, sequential scan degradation on growing tables.

---

## 1. Database Schema & Indexing Analysis

### Current Schema Index Profile (`prisma/schema.prisma`):

| Model | Row Size | Primary Key / Existing Indexes | Missing Critical Indexes | Performance Impact |
| :--- | :--- | :--- | :--- | :--- |
| **`Post`** | Large (Contains full markdown `content`, JSON FAQs, SEO metadata) | `@id`, `slug @unique` | `status`, `publishedAt`, `categoryId`, `views`, composite `[status, publishedAt]` | **CRITICAL:** Every homepage, category, and feed query triggers a full sequential table scan and in-memory sort. |
| **`Category`** | Small | `@id`, `name @unique`, `slug @unique` | None (Well-indexed on lookup keys) | Low impact. |
| **`Tag`** | Small | `@id`, `name @unique`, `slug @unique` | None | Low impact. |
| **`PostTag`** | Very Small | `@@id([postId, tagId])` | `tagId` index | **MEDIUM:** Searching posts by tag causes a sequential scan because `tagId` is the second column in the composite primary key. |
| **`AnalyticsEvent`** | High Growth Rate (Pageviews, clicks, impressions) | `@id` only | `eventType`, `slug`, `createdAt`, composite `[eventType, createdAt]` | **HIGH:** Table scans on all analytics queries; will degrade linearly with traffic. |
| **`GenerationLog`** | Medium Growth Rate | `@id` only | `status`, `createdAt`, `postId` | **MEDIUM:** Admin log queries and cleanups perform full table scans. |
| **`NewsletterSubscriber`** | Small | `@id`, `email @unique` | `status` | Low impact. |

---

## 2. Slow Query Profiling & Sequential Scan Risk

### Query 1: Homepage & Feed Article Extraction
- **Current Query:**
  ```sql
  SELECT * FROM "Post" 
  WHERE "status" = 'PUBLISHED' 
  ORDER BY "publishedAt" DESC 
  LIMIT 24;
  ```
- **Execution Plan Without Index:**
  `Seq Scan on "Post"` -> Filter: `(status = 'PUBLISHED')` -> `Sort Method: quicksort Sort Key: publishedAt DESC`
- **Root Problem:** As posts grow to hundreds or thousands of articles, sequential scans consume excessive buffer cache and disk I/O, driving PostgreSQL shared buffers and RAM to 100%.
- **Optimal Index:**
  ```sql
  CREATE INDEX idx_posts_status_publishedat ON "Post" (status, "publishedAt" DESC);
  ```

### Query 2: Category Article Filtering
- **Current Query:**
  ```sql
  SELECT * FROM "Post" 
  WHERE "categoryId" = $1 AND "status" = 'PUBLISHED' 
  ORDER BY "publishedAt" DESC;
  ```
- **Optimal Index:**
  ```sql
  CREATE INDEX idx_posts_category_status_publishedat ON "Post" ("categoryId", status, "publishedAt" DESC);
  ```

### Query 3: Tag Article Join
- **Optimal Index:**
  ```sql
  CREATE INDEX idx_posttag_tagid ON "PostTag" ("tagId");
  ```

### Query 4: Analytics Aggregation
- **Optimal Index:**
  ```sql
  CREATE INDEX idx_analytics_event_createdat ON "AnalyticsEvent" ("eventType", "createdAt" DESC);
  CREATE INDEX idx_analytics_slug ON "AnalyticsEvent" (slug);
  ```

---

## 3. Supabase Connection Pooling Architecture

### Connection Pool Protocol:
- **Direct Connection (`DIRECT_URL`):** Port `5432` — Must be reserved exclusively for schema migrations (`prisma db push`, `prisma migrate`).
- **Pooled Connection (`DATABASE_URL`):** Port `6543` — Connects via Supabase Supavisor transaction pooler.
- **Connection Parameter Tuning:**
  ```
  DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20"
  ```
  This caps maximum server connections to 10 per instance, preventing connection exhaustion and keeping database RAM consumption strictly bounded.

---

## 4. Retention & Archival Strategy

To prevent tables like `GenerationLog` and `AnalyticsEvent` from growing unboundedly:
1. **GenerationLog:** Automated 30-day retention cleanup. Records older than 30 days are purged.
2. **AnalyticsEvent:** Raw events older than 90 days are archived or summarized into daily aggregation buckets.
3. **Draft Cleanup:** Orphaned generation attempts with status `FAILED` older than 7 days are automatically removed.

---

## 5. Materialized Views Blueprint (Enterprise Acceleration)

Creating materialized views with periodic refreshes eliminates repetitive expensive joins:
1. `mv_trending_posts`: Top 10 articles by views and recent engagement, refreshed every 15 minutes.
2. `mv_category_counts`: Live published post count per category, eliminating correlated subqueries.
