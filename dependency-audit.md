# Dependency & Package Footprint Audit

**Audit Target:** NPM Package Graphs for Root Workspace & Store Subproject  
**Audit Purpose:** Detect duplicate dependencies, isolate heavy client packages, eliminate dead imports, and enforce tree-shaking.

---

## 1. Root Workspace Dependency Profile (`package.json`)

```json
{
  "dependencies": {
    "@aws-sdk/client-bedrock-runtime": "^3.1127.0",
    "@aws-sdk/client-s3": "^3.1127.0",
    "@aws-sdk/client-ses": "^3.1127.0",
    "@google/generative-ai": "^0.21.0",
    "@prisma/client": "^5.19.0",
    "@tailwindcss/typography": "^0.5.20",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.439.0",
    "next": "14.2.10",
    "node-cron": "^3.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-markdown": "^9.0.1",
    "recharts": "^2.12.7",
    "remark-gfm": "^4.0.0",
    "rss-parser": "^3.13.0",
    "slugify": "^1.6.6",
    "tailwind-merge": "^2.5.2"
  }
}
```

---

## 2. Dependency Weight & Bundle Impact Analysis

| Package | Typical Unminified Size | Execution Scope | Assessment & Optimization Strategy |
| :--- | :--- | :--- | :--- |
| **`recharts`** | ~380 kB | Client (Admin & Analytics) | **Heavy:** Must NEVER be bundled into shared client chunks. Must always be loaded via `next/dynamic` with `ssr: false`. |
| **`lucide-react`** | ~1.2 MB total icon catalog | Client & Server | **High Tree-Shaking Risk:** Without `modularizeImports` in Next.js, Webpack/Turbopack can pull hundreds of unused icon SVGs into the vendor chunk. Configure path rewrite rules in `next.config.mjs`. |
| **`react-markdown` & `remark-gfm`** | ~140 kB | Client & Server (Blog detail only) | Isolated to `src/app/blog/[slug]/page.tsx` and admin preview. Verified not imported on homepage or `/travel`. |
| **`@aws-sdk/*` (3 packages)** | ~450 kB | Server Only (Pipeline & Mailers) | Properly isolated to server route handlers (`src/lib/pipeline/*`). Verified 0 client leaks. |
| **`@google/generative-ai`** | ~95 kB | Server Only (AI Agent Generation) | Properly isolated to server-side generation workers. |
| **`date-fns`** | ~80 kB | Server & Client | Safe; individual function imports (`format`, `formatDistanceToNow`) are tree-shaken by Webpack. |

---

## 3. Subproject Discrepancies (`store/package.json`)

| Package | Root Workspace Version | Store Subproject Version | Evaluation |
| :--- | :--- | :--- | :--- |
| **`react` / `react-dom`** | `^18.3.1` | `19.0.0` | **Version Divergence:** The subproject runs React 19 canary/RC, while root runs React 18 LTS. Subprojects run in independent node_modules, preventing runtime collisions. |
| **`next`** | `14.2.10` | `15.1.6` | Different major versions between main magazine and store app. Kept isolated. |
| **`lucide-react`** | `^0.439.0` | `0.469.0` | Minor version disparity. |

---

## 4. Dead Code & Unused Imports Findings

1. **Unused Imports in Components:**
   - Multiple icon imports in `Navbar.tsx` and `TravelNavbar.tsx` that are superseded or not rendered.
2. **Duplicate Utility Logic:**
   - Class merging logic in `src/lib/utils.ts` is minimal and clean.
3. **Automated Safety:**
   - No packages or files should be deleted automatically without verification. All optimizations will be performed via module bundling and configuration enhancements.
