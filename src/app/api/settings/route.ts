import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    // Merge with process.env defaults
    const combined = {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "••••••••" + process.env.GEMINI_API_KEY.slice(-4) : "",
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? "••••••••" + process.env.OPENAI_API_KEY.slice(-4) : "",
      UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY ? "••••••••" : "",
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY ? "••••••••" : "",
      NEXT_PUBLIC_ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
      NEXT_PUBLIC_BUY_ME_A_COFFEE_USERNAME: process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_USERNAME || "",
      DEFAULT_NICHE: settingsMap["DEFAULT_NICHE"] || process.env.DEFAULT_NICHE || "Artificial Intelligence & Modern Tech",
      AUTO_PUBLISH_DEFAULT: settingsMap["AUTO_PUBLISH_DEFAULT"] || process.env.AUTO_PUBLISH_DEFAULT || "true",
      POST_LANGUAGE: settingsMap["POST_LANGUAGE"] || process.env.POST_LANGUAGE || "English",
      TARGET_WORD_COUNT: settingsMap["TARGET_WORD_COUNT"] || process.env.TARGET_WORD_COUNT || "1600",
      CRON_SCHEDULE: settingsMap["CRON_SCHEDULE"] || "0 8 * * *",
    };

    return NextResponse.json({ settings: combined });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
