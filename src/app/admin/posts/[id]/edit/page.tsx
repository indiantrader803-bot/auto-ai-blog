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
} from "lucide-react";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

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

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.post) {
          setPost(data.post);
          setTitle(data.post.title);
          setExcerpt(data.post.excerpt);
          setContent(data.post.content);
          setStatus(data.post.status);
          setFeaturedImage(data.post.featuredImage || "");
          setSeoTitle(data.post.seoTitle || "");
          setSeoDescription(data.post.seoDescription || "");
        }
      });
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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

  if (!post) {
    return (
      <div className="p-10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Edit Article
            </h1>
            <p className="text-xs text-slate-500">Slug: /{post.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md flex items-center gap-2"
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

      {/* Editor & Preview Toggle Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "edit"
              ? "bg-indigo-600 text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Editor View
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "preview"
              ? "bg-indigo-600 text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Live Preview
        </button>
      </div>

      {activeTab === "edit" ? (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Metadata Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Article Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Publishing Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                >
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="DRAFT">DRAFT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Excerpt
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Markdown Article Content
            </label>
            <textarea
              rows={22}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      ) : (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-black mb-4">{title}</h1>
          <p className="text-lg text-slate-500 mb-8">{excerpt}</p>
          <MarkdownRenderer content={content} />
        </div>
      )}
    </div>
  );
}
