import { NextResponse } from "next/server";
import { STORE_MOCKUP_PRODUCTS } from "@/lib/pipeline/agents/mockupCatalogData";
import { VIRAL_DROPSHIP_CATALOG } from "@/lib/pipeline/agents/dropshipHunterAgent";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id.toLowerCase();
    
    // Check in primary catalog
    let product = STORE_MOCKUP_PRODUCTS.find(
      (p) => String(p.id).toLowerCase() === id
    );

    // Check in viral dropship catalog
    if (!product) {
      const dropshipItem = VIRAL_DROPSHIP_CATALOG.find(
        (p) => String(p.id).toLowerCase() === id
      );
      if (dropshipItem) {
        product = {
          id: dropshipItem.id,
          title: dropshipItem.title,
          tagline: dropshipItem.tagline,
          priceINR: dropshipItem.priceINR,
          originalPriceINR: dropshipItem.originalPriceINR,
          priceUSD: dropshipItem.priceUSD,
          originalPriceUSD: dropshipItem.originalPriceUSD,
          discountBadge: `${Math.round(((dropshipItem.originalPriceINR - dropshipItem.priceINR) / dropshipItem.originalPriceINR) * 100)}% OFF`,
          badge: dropshipItem.badge || "HOT DROPSHIP",
          category: dropshipItem.category as any || "Smart Gadgets",
          isPhysical: dropshipItem.isPhysical !== false,
          stock: dropshipItem.stock || 45,
          inStock: true,
          rating: dropshipItem.rating || 4.8,
          reviewsCount: dropshipItem.reviewsCount || 320,
          image: dropshipItem.image,
          galleryImages: dropshipItem.galleryImages || [dropshipItem.image],
          colors: dropshipItem.colors || [{ name: "Standard", colorHex: "#6366f1" }],
          shippingDetails: dropshipItem.shippingDetails || {
            origin: "Direct Global Logistics Express",
            estimatedDelivery: "3 - 6 Business Days",
            shippingCost: "FREE Tracked Courier",
            carrier: "Blue Dart / Delhivery / DHL",
            supportedCountries: ["India", "USA", "UK", "Canada", "Australia", "UAE"],
          },
          features: dropshipItem.features || [],
          supplier: dropshipItem.supplier || "AliExpress Pro Verified",
          supplierOrigin: dropshipItem.supplierOrigin || "Verified Supply Hub",
          availability: "IN_STOCK_DROPSHIP",
          complianceVerified: true,
        };
      }
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
