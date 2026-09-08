import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await prisma.setting.deleteMany({
      where: { key: "WITHDRAWAL_HISTORY" },
    });
    return NextResponse.json({ success: true, message: "Demo withdrawal history cleared" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
