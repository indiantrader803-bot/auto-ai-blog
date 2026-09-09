"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  MessageSquare,
  Sparkles,
  Bot,
  ArrowRight,
  TrendingUp,
  Eye,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle,
  CornerDownRight,
  Users,
} from "lucide-react";

export default function CommunityHubPage() {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);

  // Modal / Inline comment form
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiReplying, setAiReplying] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/comments?all=true");
      const data = await res.json();
      if (data.discussions && Array.isArray(data.discussions)) {
        setDiscussions(data.discussions);
        if (!selectedDiscussion && data.discussions.length > 0) {
          setSelectedDiscussion(data.discussions[0]);
        }
      }
    } catch (_) {
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || submitting || !selectedDiscussion) return;

    const userCommentId = "c_" + Date.now();
    const newUserComment = {
      id: userCommentId,
      author: name.trim(),
      avatarBg: "from-amber-500 to-orange-600",
      date: "Just now",
      role: role.trim() || "Reader & Contributor",
      content: content.trim(),
    };

    const targetSlug = selectedDiscussion.post?.slug;
    const authorName = name.trim();
    const authorRole = role.trim();
    const commentBody = content.trim();

    // Optimistically update
    setSelectedDiscussion((prev: any) => ({
      ...prev,
      commentsCount: (prev?.commentsCount || 0) + 1,
      recentComments: [newUserComment, ...(prev?.recentComments || [])],
    }));

    setName("");
    setRole("");
    setContent("");
    setSubmitted(true);
    setSubmitting(true);
    setAiReplying(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleTitle: selectedDiscussion.post?.title || "Modern Engineering & Finance",
          articleSlug: targetSlug,
          articleExcerpt: selectedDiscussion.post?.excerpt || "",
          commentAuthor: authorName,
          commentRole: authorRole,
          commentContent: commentBody,
          triggerAiReply: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.aiReply) {
        setTimeout(() => {
          const aiComment = {
            id: data.aiReply.id,
            author: data.aiReply.author || "Marcus Vance",
            avatarBg: "from-emerald-500 via-teal-600 to-indigo-600",
            date: "Just now",
            role: data.aiReply.role || "Staff Systems Lead & AI Editor",
            isAiResponse: true,
            replyTo: authorName,
            content: data.aiReply.content,
          };
          setSelectedDiscussion((prev: any) => ({
            ...prev,
            commentsCount: (prev?.commentsCount || 0) + 1,
            recentComments: [newUserComment, aiComment, ...(prev?.recentComments || []).filter((c: any) => c.id !== userCommentId)],
          }));
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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Header Hero */}
        <header className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Users className="w-3.5 h-3.5" /> Peer Review &amp; Mastermind
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
                Community Discussion Hub
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Engage in dedicated technical discussions across every published story. Our Staff Systems Lead (<span className="text-emerald-500 font-bold">Marcus Vance</span>) auto-replies with authentic peer reviews and live architecture critiques.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>AI Discussion Agent: Online</span>
              </span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Loading active discussion threads...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: List of Article Discussions (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Active Article Threads ({discussions.length})</span>
                <span className="text-[10px] text-indigo-500">Live Updates</span>
              </h2>

              <div className="space-y-2.5 max-h-[780px] overflow-y-auto pr-1 scrollbar-thin">
                {discussions.map((item, idx) => {
                  const isSelected = selectedDiscussion?.post?.slug === item.post?.slug;
                  return (
                    <button
                      key={item.post?.id || idx}
                      onClick={() => setSelectedDiscussion(item)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500"
                          : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            {item.post?.category?.name || "Technology"}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-indigo-500" />
                            {item.commentsCount} comments
                          </span>
                        </div>
                        <h3 className="text-sm font-bold font-serif line-clamp-2 text-slate-900 dark:text-white">
                          {item.post?.title}
                        </h3>
                      </div>

                      {item.recentComments?.[0] && (
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                          <span className="font-bold text-slate-700 dark:text-slate-300">{item.recentComments[0].author}:</span> {item.recentComments[0].content}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed Discussion Panel (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {selectedDiscussion ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  {/* Active Thread Banner */}
                  <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        Active Article Thread
                      </span>
                      <Link
                        href={`/blog/${selectedDiscussion.post?.slug}`}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {selectedDiscussion.post?.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {selectedDiscussion.post?.excerpt}
                    </p>
                  </div>

                  {/* Comment Input Form */}
                  <form onSubmit={handlePostComment} className="space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 p-4 sm:p-5 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        Join This Discussion
                      </h4>
                      <span className="text-[10px] text-emerald-500 font-semibold">
                        Instant Staff AI Peer Reply
                      </span>
                    </div>

                    {submitted && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>Comment submitted! Formulating AI review...</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name (e.g. Rahul Sharma)*"
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Your Role (e.g. Quant Trader / Engineer)"
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <textarea
                      required
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your critique, questions on the architecture, or benchmark observations..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs resize-none"
                    />

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        Replies formulated by Marcus Vance (Staff Systems Lead)
                      </span>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Posting...</span>
                          </>
                        ) : (
                          <>
                            <span>Post</span>
                            <Send className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Typing Indicator */}
                  {aiReplying && (
                    <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2.5 text-xs text-indigo-400 animate-pulse">
                      <Bot className="w-4 h-4 text-indigo-400 animate-bounce" />
                      <span className="font-semibold">
                        Marcus Vance (Staff Systems Lead) is typing an authentic peer response...
                      </span>
                    </div>
                  )}

                  {/* Thread Comments Feed */}
                  <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                    {(selectedDiscussion.recentComments || []).map((comment: any) => {
                      const isReply = comment.isAiResponse;
                      return (
                        <div
                          key={comment.id}
                          className={`pt-4 first:pt-0 flex items-start gap-3.5 ${
                            isReply
                              ? "ml-4 sm:ml-6 pl-3 border-l-2 border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5 rounded-2xl"
                              : ""
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${comment.avatarBg || "from-indigo-500 to-purple-600"} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}
                          >
                            {isReply ? <Bot className="w-4 h-4 text-white" /> : (comment.author || "User").slice(0, 2).toUpperCase()}
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
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                  Select an article thread from the left to view detailed discussions.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
