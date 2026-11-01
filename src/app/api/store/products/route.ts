import { NextResponse } from "next/server";
import { STORE_MOCKUP_PRODUCTS } from "@/lib/pipeline/agents/mockupCatalogData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      activeCouponCode: "GLOBAL30",
      discountPercentage: 30,
      bannerHeadline: "🔥 Grand Opening: Free Tracked Worldwide Doorstep Express Shipping + 30% OFF using code GLOBAL30",
      expiresInHours: 2,
      products: STORE_MOCKUP_PRODUCTS,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
