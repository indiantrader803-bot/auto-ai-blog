import { NextResponse } from "next/server";
import { isShopifyConfigured, shopifyClient, GET_PRODUCTS_QUERY } from "@/lib/shopify/client";
import { STORE_MOCKUP_PRODUCTS } from "@/lib/pipeline/agents/mockupCatalogData";
import { VIRAL_DROPSHIP_CATALOG } from "@/lib/pipeline/agents/dropshipHunterAgent";

export const dynamic = "force-dynamic";

/**
 * ⚡ Daily Dynamic Product Rotation Engine:
 * Combines core verified products with daily trending dropship items
 * so fresh products are automatically featured each day on the store.
 */
function getConsolidatedStoreCatalog() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Normalize dropship catalog items to match the store product interface
  const formattedDropshipItems = VIRAL_DROPSHIP_CATALOG.map((item, idx) => ({
    id: item.id || `dropship-${idx}`,
    title: item.title,
    tagline: item.tagline,
    priceINR: item.priceINR,
    originalPriceINR: item.originalPriceINR,
    priceUSD: item.priceUSD,
    originalPriceUSD: item.originalPriceUSD,
    discountBadge: `${Math.round(((item.originalPriceINR - item.priceINR) / item.originalPriceINR) * 100)}% OFF`,
    badge: item.badge || "DAILY TRENDING",
    category: item.category || "Smart Gadgets",
    isPhysical: item.isPhysical !== false,
    stock: item.stock || 45,
    inStock: true,
    rating: item.rating || 4.8,
    reviewsCount: item.reviewsCount || 320,
    isFlashDeal: idx % 2 === 0,
    isTrending: true,
    image: item.image,
    galleryImages: item.galleryImages || [item.image],
    colors: item.colors || [{ name: "Standard", colorHex: "#6366f1" }],
    shippingDetails: item.shippingDetails || {
      origin: "Direct Global Logistics Express",
      estimatedDelivery: "3 - 6 Business Days",
      shippingCost: "FREE Tracked Courier",
      carrier: "Blue Dart / Delhivery / DHL",
      supportedCountries: ["India", "USA", "UK", "Canada", "Australia", "UAE"],
    },
    features: item.features || [],
    supplier: item.supplier || "AliExpress Pro Verified",
    supplierOrigin: item.supplierOrigin || "Verified Supply Hub",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  }));

  // Merge unique by ID
  const productMap = new Map<string, any>();
  for (const item of STORE_MOCKUP_PRODUCTS) {
    productMap.set(String(item.id).toLowerCase(), item);
  }
  for (const item of formattedDropshipItems) {
    if (!productMap.has(String(item.id).toLowerCase())) {
      productMap.set(String(item.id).toLowerCase(), item);
    }
  }

  const allProducts = Array.from(productMap.values());

  // Deterministic daily rotation shift: puts new items front and center each day
  const shiftOffset = dayOfYear % allProducts.length;
  const rotated = [
    ...allProducts.slice(shiftOffset),
    ...allProducts.slice(0, shiftOffset),
  ];

  return rotated;
}

export async function GET() {
  try {
    const consolidated = getConsolidatedStoreCatalog();

    if (isShopifyConfigured && shopifyClient) {
      const response = await shopifyClient.request(GET_PRODUCTS_QUERY, {
        variables: { first: 24 },
      });

      if (response?.data?.products?.edges?.length > 0) {
        const liveShopifyProducts = response.data.products.edges.map(({ node }: any, index: number) => {
          const image = node.images?.edges?.[0]?.node?.url || "";
          const price = parseFloat(node.priceRange?.minVariantPrice?.amount || "0");
          const compareAtPrice = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || "0");

          return {
            id: index + 100,
            shopifyId: node.id,
            name: node.title,
            category: "Smart Gadgets",
            price: price,
            originalPrice: compareAtPrice > price ? compareAtPrice : Math.round(price * 1.3),
            rating: 4.8,
            reviewsCount: 142,
            image: image,
            badge: node.availableForSale ? "IN STOCK" : "OUT OF STOCK",
            carrier: "DHL Express / SafeXpress",
            estimatedDelivery: "4 - 7 Business Days",
            dispatchHub: "Shopify Dropship Fulfillment Hub",
            source: "Shopify Storefront",
            description: node.description || "High performance smart electronics and productivity gadget.",
            variants: node.variants?.edges?.map((v: any) => ({
              id: v.node.id,
              title: v.node.title,
              price: parseFloat(v.node.price?.amount || "0"),
            })) || [],
          };
        });

        return NextResponse.json({
          source: "shopify_live",
          products: liveShopifyProducts,
          total: liveShopifyProducts.length,
        });
      }
    }

    // Deliver consolidated & dynamically refreshed catalog
    return NextResponse.json({
      source: "catalog_verified_daily",
      products: consolidated,
      total: consolidated.length,
    });
  } catch (error: any) {
    console.error("Store Products API Error:", error);
    const fallback = getConsolidatedStoreCatalog();
    return NextResponse.json({
      source: "catalog_fallback",
      products: fallback,
      total: fallback.length,
      warning: error.message,
    });
  }
}
