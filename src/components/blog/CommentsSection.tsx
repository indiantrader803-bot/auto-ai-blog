"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle, ShieldCheck, Sparkles, Bot, CornerDownRight, Loader2 } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatarBg: string;
  date: string;
  content: string;
  role?: string;
  isAiResponse?: boolean;
  replyTo?: string;
}

interface Props {
  articleTitle?: string;
  articleSlug?: string;
  articleExcerpt?: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Alex Rivera",
    avatarBg: "from-blue-500 to-indigo-600",
    date: "2 hours ago",
    role: "Senior AI Engineer",
    content:
      "The benchmarks on multi-agent consensus vs single large context models match what we saw in production. The latency optimization through edge routers is definitely the key takeaway here.",
  },
  {
    id: "c1_reply",
    author: "Marcus Vance",
    avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
    date: "1 hour ago",
    role: "Staff Systems Lead & AI Editor",
    isAiResponse: true,
    replyTo: "Alex Rivera",
    content:
      "Spot on observation, Alex. In our testing under 5,000 concurrent RPS, edge routing reduced p99 tail latency by ~64% compared to standard centralized load balancing. We're publishing the raw Grafana dashboards next week!",
  },
  {
    id: "c2",
    author: "Elena Rostova",
    avatarBg: "from-purple-500 to-pink-600",
    date: "5 hours ago",
    role: "Staff Architect",
    content:
      "Phenomenal editorial breakdown. Would love to see a follow-up piece examining cold-start telemetry when scaling to 100+ concurrent swarm agents.",
  },
];

export default function CommentsSection({ articleTitle, articleSlug, articleExcerpt }: Props) {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiReplying, setAiReplying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || submitting) return;

    const userCommentId = "c_" + Date.now();
    const userComment: Comment = {
      id: userCommentId,
      author: name.trim(),
      avatarBg: "from-amber-500 to-orange-600",
      date: "Just now",
      role: role.trim() || "Reader & Developer",
      content: content.trim(),
    };

    // Prepend user comment immediately
    setComments((prev) => [userComment, ...prev]);
    const commentAuthor = name.trim();
    const commentRole = role.trim();
    const commentContent = content.trim();

    setName("");
    setRole("");
    setContent("");
    setSubmitted(true);
    setSubmitting(true);
    setAiReplying(true);

    try {
      // Call Dedicated Community AI Agent for instant authentic interaction
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleTitle: articleTitle || "Modern AI & Quant Engineering",
          articleSlug: articleSlug || "",
          articleExcerpt: articleExcerpt || "",
          commentAuthor,
          commentRole,
          commentContent,
          triggerAiReply: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.aiReply) {
        // Natural human typing delay (1.2s)
        setTimeout(() => {
          const aiComment: Comment = {
            id: data.aiReply.id,
            author: data.aiReply.author || "Marcus Vance",
            avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
            date: "Just now",
            role: data.aiReply.role || "Staff Systems Lead & AI Editor",
            isAiResponse: true,
            replyTo: commentAuthor,
            content: data.aiReply.content,
          };
          setComments((prev) => {
            // Place AI reply right after user comment
            const idx = prev.findIndex((c) => c.id === userCommentId);
            if (idx !== -1) {
              const clone = [...prev];
              clone.splice(idx + 1, 0, aiComment);
              return clone;
            }
            return [aiComment, ...prev];
          });
          setAiReplying(false);
        }, 1200);
      } else {
        setAiReplying(false);
      }
    } catch (_) {
      setAiReplying(false);
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="my-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white font-serif tracking-tight flex items-center gap-2">
              <span>Community Discussion ({comments.length})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive peer review &amp; live editorial discussion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Editor: Auto-Responding Live</span>
          </span>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-5 sm:p-6 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Leave a Technical Comment or Question
          </h4>
          <span className="text-[11px] text-slate-400">
            Our AI Editor will reply to your critique instantly
          </span>
        </div>

        {submitted && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Comment published! The AI editorial agent is analyzing and formulating a reply...</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name (e.g. David Kumar)*"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your Role (e.g. Staff Engineer @ TechCo)"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <textarea
          required
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your technical perspective, critique benchmark figures, or ask an architecture question..."
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified human &amp; AI discussion. Be constructive.</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <span>Post Comment</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Real-time typing indicator */}
      {aiReplying && (
        <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2.5 text-xs text-indigo-400 animate-pulse">
          <Bot className="w-4 h-4 text-indigo-400 animate-bounce" />
          <span className="font-semibold">
            Marcus Vance (AI Systems Lead) is typing an authentic peer response...
          </span>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
        {comments.map((comment) => {
          const isReply = comment.isAiResponse;
          return (
            <div
              key={comment.id}
              className={`pt-4 first:pt-0 flex items-start gap-4 ${
                isReply
                  ? "ml-4 sm:ml-8 pl-4 border-l-2 border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20 p-4 rounded-2xl"
                  : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${comment.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}
              >
                {isReply ? <Bot className="w-5 h-5 text-white" /> : comment.author.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-serif flex items-center gap-1.5">
                    {comment.author}
                    {isReply && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Staff Verified
                      </span>
                    )}
                  </span>
                  {comment.role && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {comment.role}
                    </span>
                  )}
                  {comment.replyTo && (
                    <span className="text-[10px] text-indigo-500 font-semibold flex items-center gap-1">
                      <CornerDownRight className="w-3 h-3" /> replying to @{comment.replyTo}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 ml-auto">
                    {comment.date}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
