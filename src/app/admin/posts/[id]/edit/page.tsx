"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Eye,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Loader2,
  Video,
  Image as ImageIcon,
  Sliders,
  Type,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Table,
  Code,
  ShieldCheck,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import ArticleVideoPlayer from "@/components/blog/ArticleVideoPlayer";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("PUBLISHED");
  const [featuredImage, setFeaturedImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [youtubeVideoTitle, setYoutubeVideoTitle] = useState("");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "split" | "preview">("split");

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.post) {
          setPost(data.post);
          setTitle(data.post.title || "");
          setExcerpt(data.post.excerpt || "");
          setContent(data.post.content || "");
          setStatus(data.post.status || "PUBLISHED");
          setFeaturedImage(data.post.featuredImage || "");
          setSeoTitle(data.post.seoTitle || "");
          setSeoDescription(data.post.seoDescription || "");
          setYoutubeVideoId(data.post.youtubeVideoId || "");
          setYoutubeVideoTitle(data.post.youtubeVideoTitle || "");
        }
      });
  }, [params.id]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          status,
          featuredImage,
          seoTitle,
          seoDescription,
          youtubeVideoId: youtubeVideoId.trim() || null,
          youtubeVideoTitle: youtubeVideoTitle.trim() || null,
        }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      alert("Error saving post");
    } finally {
      setSaving(false);
    }
  };

  // Helper to insert markdown tokens at cursor
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("post-markdown-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      prefix +
      (selectedText || "text") +
      suffix +
      content.substring(end);
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText ? selectedText.length : 4));
    }, 50);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTimeEst = Math.max(1, Math.ceil(wordCount / 220));

  if (!post) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-xs text-slate-500 font-mono">Loading article intelligence...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif">
                SmartMag Pro Studio Editor
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Live AST Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Slug: /blog/{post.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live
          </Link>

          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : savedSuccess ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {savedSuccess ? "Saved Successfully!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Editor View Mode Tabs & Live Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "edit"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Editor Only
          </button>
          <button
            onClick={() => setActiveTab("split")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "split"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Split View (Side-by-Side)
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "preview"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Live Reader Preview
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>Words: <strong className="text-slate-900 dark:text-slate-200">{wordCount}</strong></span>
          <span>•</span>
          <span>Read Time: <strong className="text-slate-900 dark:text-slate-200">~{readTimeEst} min</strong></span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> AdSense &amp; SEO Ready
          </span>
        </div>
      </div>

      {/* Main Metadata & Media Configuration Panel */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
            Article Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-serif"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Publishing Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="PUBLISHED">PUBLISHED (Live on Web)</option>
              <option value="DRAFT">DRAFT (Hidden)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Featured Hero Image URL
            </label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Video Embed & Copyright-Free Controls */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500">
              <Video className="w-4 h-4" /> YouTube Video Workshop (Creative Commons &amp; Fair Use)
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Plays in YouTube Privacy-Enhanced Mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                YouTube Video ID (11 characters)
              </label>
              <input
                type="text"
                value={youtubeVideoId}
                onChange={(e) => setYoutubeVideoId(e.target.value)}
                placeholder="e.g. sal78ACtGTc or leave blank to remove"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Video Title / Caption
              </label>
              <input
                type="text"
                value={youtubeVideoTitle}
                onChange={(e) => setYoutubeVideoTitle(e.target.value)}
                placeholder="e.g. Autonomous AI Agent Swarms: Technical Walkthrough"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
            Executive Summary / Excerpt
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white leading-relaxed"
          />
        </div>
      </div>

      {/* Editor Toolbar & Main Writing Area */}
      <div className="space-y-3">
        {/* Markdown Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
          <button
            type="button"
            onClick={() => insertMarkdown("## ", "\n")}
            className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1"
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" /> H2
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("### ", "\n")}
            className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1"
            title="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" /> H3
          </button>
          <span className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
          <button
            type="button"
            onClick={() => insertMarkdown("**", "**")}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("*", "*")}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <span className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
          <button
            type="button"
            onClick={() => insertMarkdown("\n* ", "\n")}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("\n> ", "\n")}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertMarkdown(
                "\n| Metric | Specification | Benchmark |\n| :--- | :--- | :--- |\n| Speed | Sub-millisecond | 99.4% |\n| Cost | $0.002 / run | Lowest |\n\n"
              )
            }
            className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1"
            title="Insert Table"
          >
            <Table className="w-3.5 h-3.5" /> Table
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("\n```ts\n", "\n```\n")}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Layout Mode */}
        {activeTab === "split" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
            {/* Left: Code Editor */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col bg-slate-950">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Markdown Raw Input</span>
                <span>UTF-8 • GFM</span>
              </div>
              <textarea
                id="post-markdown-editor"
                rows={28}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full p-5 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y selection:bg-indigo-600"
                placeholder="Write or edit article markdown here..."
              />
            </div>

            {/* Right: Live AST Render */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 bg-white dark:bg-[#070c18] overflow-y-auto max-h-[750px]">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Live Preview
                </span>
                <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white mt-1">
                  {title || "Untitled Article"}
                </h1>
                {excerpt && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {excerpt}
                  </p>
                )}
              </div>

              {youtubeVideoId && (
                <div className="mb-6">
                  <ArticleVideoPlayer
                    videoId={youtubeVideoId}
                    videoTitle={youtubeVideoTitle}
                  />
                </div>
              )}

              <MarkdownRenderer content={content} />
            </div>
          </div>
        )}

        {activeTab === "edit" && (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-950">
            <textarea
              id="post-markdown-editor"
              rows={28}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-5 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y selection:bg-indigo-600"
              placeholder="Write or edit article markdown here..."
            />
          </div>
        )}

        {activeTab === "preview" && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#070c18] border border-slate-200 dark:border-slate-800 max-w-4xl mx-auto shadow-xl">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-600 text-white">
                Live Reader Mode
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
                {title || "Untitled Article"}
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {excerpt}
              </p>
            </div>

            {youtubeVideoId && (
              <div className="mb-8">
                <ArticleVideoPlayer
                  videoId={youtubeVideoId}
                  videoTitle={youtubeVideoTitle}
                />
              </div>
            )}

            <MarkdownRenderer content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
