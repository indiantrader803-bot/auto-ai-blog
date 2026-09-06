import { NextResponse } from "next/server";
import { GET as getRss } from "../rss.xml/route";

export const dynamic = "force-dynamic";

export async function GET() {
  return getRss();
}

