import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppleNavbar from "@/components/apple/AppleNavbar";
import StickyMobileBuyBar from "@/components/apple/StickyMobileBuyBar";
import ProductColorShowcase from "@/components/apple/ProductColorShowcase";
import {
  APPLE_PRODUCTS,
  TAGGED_ACCESSORIES,
  APPLE_FAQ_ITEMS,
} from "@/data/appleData";
import { goLink } from "@/lib/goLink";
import {
  Cpu,
  Camera,
  Battery,
  HardDrive,
  Star,
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Wrench,
  Package,
} from "lucide-react";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesmartmag.com";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cleanSlug = decodeURIComponent(params.slug || "");
  const product = APPLE_PRODUCTS.find((p) => p.slug === cleanSlug);

  if (!product) {
    return {
      title: "Product Not Found | TheSmartMag",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name}: Price in India, Specs, Colors & Best Deals | TheSmartMag`,
    description: `${product.tagline} Starting at ₹${product.startingPriceInr.toLocaleString(
      "en-IN"
    )}. Compare live prices and bank offers across Flipkart, Croma, Reliance Digital, Vijay Sales & Amazon India.`,
    keywords: [
      `${product.name} price in India`,
      `${product.shortName} specs`,
      `${product.shortName} colors`,
      `${product.shortName} review`,
      `buy ${product.shortName} India`,
      ...product.specs.colors.map((c) => `${product.shortName} ${c}`),
    ],
    alternates: {
      canonical: `${siteUrl}/apple/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — Specs, Colors & Best Online Price | TheSmartMag`,
      description: product.tagline,
      url: `${siteUrl}/apple/${product.slug}`,
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Launch Price, Deals & Review`,
      description: product.tagline,
      images: [product.heroImage],
    },
  };
}

export default function AppleProductDeepDivePage({ params }: Props) {
  const cleanSlug = decodeURIComponent(params.slug || "");
  const product = APPLE_PRODUCTS.find((p) => p.slug === cleanSlug);

  if (!product) {
    notFound();
  }

  const bestPrice = Math.min(...product.retailers.map((r) => r.priceInr));
  const savings =
    product.originalPriceInr && product.originalPriceInr > bestPrice
      ? product.originalPriceInr - bestPrice
      : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        image: product.heroImage,
        description: product.tagline,
        brand: { "@type": "Brand", name: "Apple" },
        sku: product.id,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: bestPrice,
          highPrice: Math.max(...product.retailers.map((r) => r.priceInr)),
          offerCount: product.retailers.length,
          offers: product.retailers.map((r) => ({
            "@type": "Offer",
            price: r.priceInr,
            priceCurrency: "INR",
            itemCondition: "https://schema.org/NewCondition",
            availability: r.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            seller: { "@type": "Organization", name: r.store },
            url: r.affiliateUrl,
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          bestRating: "5",
          reviewCount: product.reviewCount,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Apple Hub", item: `${siteUrl}/apple` },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${siteUrl}/apple/${product.slug}`,
          },
        ],
      },
    ],
  };

  const specRows = [
    { icon: Cpu, label: "Chip", value: product.specs.chip, color: "text-indigo-600 dark:text-indigo-400" },
    { icon: Camera, label: "Camera", value: product.specs.camera, color: "text-amber-600 dark:text-amber-400" },
    { icon: Battery, label: "Battery", value: product.specs.battery, color: "text-emerald-600 dark:text-emerald-400" },
    { icon: HardDrive, label: "Storage", value: product.specs.storage, color: "text-sky-600 dark:text-sky-400" },
    { icon: ShieldCheck, label: "Biometrics", value: product.specs.biometrics, color: "text-rose-600 dark:text-rose-400" },
    { icon: Sparkles, label: "Connectivity", value: product.specs.connectivity, color: "text-fuchsia-600 dark:text-fuchsia-400" },
    { icon: Sparkles, label: "Apple Intelligence", value: product.specs.aiFeatures, color: "text-teal-600 dark:text-teal-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-sans pb-16 md:pb-0 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AppleNavbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
          <Link href="/apple" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Apple Hub
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/apple/${product.category === "iphone" ? "iphone-18" : product.slug}`}
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-zinc-200 font-semibold">{product.shortName}</span>
        </nav>
      </div>

      {/* Hero + Color Switcher */}
      <section className="py-10 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductColorShowcase product={product} />
        </div>
      </section>

      {/* Price Summary Strip */}
      <section className="border-b border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs uppercase font-mono text-slate-500 dark:text-zinc-400">Best Price Today</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              ₹{bestPrice.toLocaleString("en-IN")}
            </span>
            {savings > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold">
                Save ₹{savings.toLocaleString("en-IN")} vs MRP
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.retailers.slice(0, 5).map((r, i) => (
              <a
                key={i}
                href={goLink(r.affiliateUrl, {
                  productId: product.id,
                  store: r.store,
                  placement: "deepdive_price_strip",
                })}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy on {r.store}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      <section className="py-16 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight mb-8 text-slate-900 dark:text-white">
            Full Specifications — {product.name}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {specRows.map((row, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-4 shadow-2xs"
              >
                <row.icon className={`w-5 h-5 ${row.color} shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <div className="text-[11px] uppercase font-mono text-slate-500 dark:text-zinc-400 mb-1">
                    {row.label}
                  </div>
                  <div className="text-sm text-slate-800 dark:text-zinc-100 leading-relaxed">{row.value}</div>
                </div>
              </div>
            ))}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-4 shadow-2xs">
              <Package className="w-5 h-5 text-slate-500 dark:text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] uppercase font-mono text-slate-500 dark:text-zinc-400 mb-1">
                  Weight &amp; Finishes
                </div>
                <div className="text-sm text-slate-800 dark:text-zinc-100 leading-relaxed">
                  {product.specs.weight} · Available in {product.specs.colors.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pros / Cons / Verdict */}
      {(product.pros || product.cons || product.verdict) && (
        <section className="py-16 bg-slate-100/50 dark:bg-zinc-950 border-b border-slate-200/80 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {product.pros && (
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-emerald-500/30 dark:border-emerald-500/20 shadow-xs">
                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" /> What We Love
                </h3>
                <ul className="space-y-3">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.cons && (
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-rose-500/30 dark:border-rose-500/20 shadow-xs">
                <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" /> Keep In Mind
                </h3>
                <ul className="space-y-3">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
                      <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.verdict && (
              <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-indigo-500/10 dark:via-zinc-900 dark:to-black border border-slate-200/90 dark:border-white/10 shadow-md">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-500 dark:text-amber-400" /> TheSmartMag Verdict
                </h3>
                <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">{product.verdict}</p>
                <div className="mt-4 flex items-center gap-2 text-amber-500 dark:text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {product.rating} / 5 — based on {product.reviewCount.toLocaleString()} verified
                  reviews
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Retailer Comparison Table */}
      <section className="py-16 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight mb-8 text-slate-900 dark:text-white">
            Compare Live Retailer Prices &amp; Bank Offers
          </h2>
          <div className="overflow-x-auto rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-zinc-900">
                <tr className="text-left text-[11px] uppercase font-mono text-slate-500 dark:text-zinc-400">
                  <th className="px-5 py-4">Store</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4 hidden md:table-cell">Top Offer</th>
                  <th className="px-5 py-4 hidden sm:table-cell">EMI</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {product.retailers.map((r, i) => (
                  <tr key={i} className="bg-white dark:bg-zinc-900/40 hover:bg-slate-50 dark:hover:bg-zinc-900/80 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{r.store}</td>
                    <td className="px-5 py-4 font-black font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{r.priceInr.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-zinc-300 text-xs hidden md:table-cell max-w-md">
                      {r.offerText}
                    </td>
                    <td className="px-5 py-4 text-slate-500 dark:text-zinc-400 text-xs hidden sm:table-cell whitespace-nowrap">
                      {r.emiStartsAt}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={goLink(r.affiliateUrl, {
                          productId: product.id,
                          store: r.store,
                          placement: "deepdive_compare_table",
                        })}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all whitespace-nowrap shadow-xs"
                      >
                        Buy Now <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 dark:text-zinc-500">
            Prices refresh daily. TheSmartMag may earn an affiliate commission on purchases made
            through these links — at zero extra cost to you.
          </p>
        </div>
      </section>

      {/* Recommended Accessories (high-commission) */}
      <section className="py-16 bg-slate-50/50 dark:bg-zinc-950 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight mb-8 text-slate-900 dark:text-white">
            Complete Your Setup — Essential Accessories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TAGGED_ACCESSORIES.slice(0, 6).map((acc) => (
              <div
                key={acc.id}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono font-bold uppercase text-slate-900 dark:text-white">{acc.brand}</span>
                    <span className="text-[11px] truncate max-w-[160px] text-slate-500 dark:text-zinc-400">
                      {acc.compatibleWith}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {acc.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-black font-mono text-slate-900 dark:text-white">
                      ₹{acc.priceInr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs line-through text-slate-400 dark:text-zinc-500 font-mono">
                      ₹{acc.mrpInr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {acc.discountPercent}% OFF
                    </span>
                  </div>
                </div>
                <a
                  href={goLink(acc.buyUrl, {
                    productId: product.id,
                    store: acc.retailer,
                    placement: "deepdive_accessories",
                  })}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="mt-5 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Buy on {acc.retailer}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (shared schema-backed items) */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight mb-8 text-slate-900 dark:text-white">
            {product.shortName} — Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {APPLE_FAQ_ITEMS.slice(0, 5).map((faq, i) => (
              <details
                key={i}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-white/10 open:border-slate-400 dark:open:border-white/25 shadow-xs"
              >
                <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-slate-900 dark:text-white list-none">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-zinc-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/apple"
              className="px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all shadow-xs"
            >
              Back to Apple Hub
            </Link>
            <Link
              href="/apple/iphone-18-pro-max-review"
              className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-xs uppercase tracking-wider dark:hover:bg-zinc-700 transition-all"
            >
              Read Hands-On Review
            </Link>
          </div>
        </div>
      </section>

      <StickyMobileBuyBar />
    </div>
  );
}
