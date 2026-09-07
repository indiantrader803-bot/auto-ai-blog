import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return new NextResponse("google-site-verification: google6c34157fb7579448.html\n", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
