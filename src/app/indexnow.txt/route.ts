import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return new NextResponse("autoai_indexnow_protocol_key", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
