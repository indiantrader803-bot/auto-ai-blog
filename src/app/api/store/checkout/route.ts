import { NextResponse } from "next/server";
import { isShopifyConfigured, shopifyClient, CREATE_CART_MUTATION } from "@/lib/shopify/client";

export async function POST(req: Request) {
  try {
    const { items, paymentMethod, customer } = await req.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // If Shopify is configured and customer opts for Shopify Native Checkout
    if (isShopifyConfigured && shopifyClient && paymentMethod === "shopify") {
      const lines = items
        .filter((item: any) => item.variantId)
        .map((item: any) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity || 1,
        }));

      if (lines.length > 0) {
        const response = await shopifyClient.request(CREATE_CART_MUTATION, {
          variables: { lines },
        });

        const checkoutUrl = response?.data?.cartCreate?.cart?.checkoutUrl;
        if (checkoutUrl) {
          return NextResponse.json({
            success: true,
            checkoutUrl,
            mode: "shopify_hosted",
          });
        }
      }
    }

    // Default: Razorpay Live checkout (Active in .env: rzp_live_TsyPwRJG2SfIKs)
    return NextResponse.json({
      success: true,
      mode: "razorpay_direct",
      message: "Ready for direct Razorpay order creation",
    });
  } catch (error: any) {
    console.error("Store Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Failed to initialize checkout" }, { status: 500 });
  }
}
