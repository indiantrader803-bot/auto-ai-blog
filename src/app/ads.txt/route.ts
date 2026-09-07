import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = "google.com, pub-9768860457233655, DIRECT, f08c47fec0942fa0\n";
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
