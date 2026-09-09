import { NextResponse } from "next/server";
import { generateAuthenticCommunityReply } from "@/lib/pipeline/agents/communityDiscussionAgent";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      articleTitle,
      articleSlug,
      articleExcerpt,
      commentAuthor,
      commentRole,
      commentContent,
      triggerAiReply,
    } = body;

    if (!commentAuthor || !commentContent) {
      return NextResponse.json(
        { error: "Comment author and content are required." },
        { status: 400 }
      );
    }

    let aiReply = null;
    if (triggerAiReply !== false) {
      aiReply = await generateAuthenticCommunityReply({
        articleTitle: articleTitle || "Modern AI & Quant Engineering",
        articleSlug: articleSlug || "",
        articleExcerpt: articleExcerpt || "",
        commentAuthor,
        commentRole: commentRole || "Reader",
        commentContent,
      });
    }

    return NextResponse.json({
      success: true,
      userComment: {
        id: "c_" + Date.now(),
        author: commentAuthor,
        role: commentRole || "Reader",
        content: commentContent,
        date: "Just now",
      },
      aiReply: aiReply
        ? {
            id: "reply_" + Date.now(),
            author: aiReply.replyAuthor,
            role: aiReply.replyRole,
            content: aiReply.replyContent,
            date: "Just now",
            toneScore: aiReply.toneScore,
          }
        : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process comment." },
      { status: 500 }
    );
  }
}
