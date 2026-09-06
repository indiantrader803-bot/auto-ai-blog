"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle, User, ShieldCheck } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatarBg: string;
  date: string;
  content: string;
  role?: string;
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
    id: "c2",
    author: "Elena Rostova",
    avatarBg: "from-purple-500 to-pink-600",
    date: "5 hours ago",
    role: "Staff Architect",
    content:
      "Phenomenal editorial breakdown. Would love to see a follow-up piece examining cold-start telemetry when scaling to 100+ concurrent swarm agents.",
  },
];

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newComment: Comment = {
      id: "c_" + Date.now(),
      author: name.trim(),
      avatarBg: "from-emerald-500 to-teal-600",
      date: "Just now",
      role: role.trim() || "Reader",
      content: content.trim(),
    };

    setComments((prev) => [newComment, ...prev]);
    setName("");
    setRole("");
    setContent("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="my-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              Community Discussion ({comments.length})
            </h3>
            <p className="text-xs text-slate-400">Join the engineering conversation</p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-5 sm:p-6 border border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
          Leave a Technical Comment
        </h4>

        {submitted && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Comment published successfully!</span>
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
          placeholder="Share your perspective, critique, or implementation experience..."
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Markdown supported. Be constructive.</span>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
          >
            <span>Post Comment</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
        {comments.map((comment) => (
          <div key={comment.id} className="pt-4 first:pt-0 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${comment.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}>
              {comment.author.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-serif">
                  {comment.author}
                </span>
                {comment.role && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {comment.role}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 ml-auto">
                  {comment.date}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
