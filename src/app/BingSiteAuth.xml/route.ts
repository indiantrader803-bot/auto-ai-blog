import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const xmlContent = `<?xml version="1.0"?>
<users>
	<user>79328ACF010CF94BBE0BA125939AA19B</user>
</users>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
