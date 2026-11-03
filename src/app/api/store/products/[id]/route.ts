import { NextResponse } from "next/server";
import { STORE_MOCKUP_PRODUCTS } from "@/lib/pipeline/agents/mockupCatalogData";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const product = STORE_MOCKUP_PRODUCTS.find(
      (p) => String(p.id).toLowerCase() === String(id).toLowerCase()
    );

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
