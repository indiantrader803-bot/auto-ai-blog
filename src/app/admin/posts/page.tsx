"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Plus,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = `/api/posts?status=${statusFilter}${search ? `&search=${encodeURIComponent(search)}` : ""}&limit=50`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (e) {
      console.error("Failed to load posts", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert("Failed to delete post");
    }
  };

  const handleTogglePublish = async (post: any) => {
    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, status: newStatus }),
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p))
      );
    } catch (e) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> Articles Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse, edit Markdown copy, toggle publishing status, or generate new content.
          </p>
        </div>

        <Link
          href="/admin/generator"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Generate New Post
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchPosts()}
            placeholder="Search articles by title..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2.5 sm:py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts Only</option>
          </select>

          <button
            onClick={fetchPosts}
            className="p-2.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* 1. MOBILE CARDS VIEW (< md) */}
      <div className="block md:hidden space-y-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold text-[10px] inline-block">
                    {post.category?.name || "Uncategorized"}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleTogglePublish(post)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 transition-colors ${
                    post.status === "PUBLISHED"
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {post.status}
                </button>
              </div>

              {post.excerpt && (
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" /> {post.views} views
                </span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="py-2 px-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-center flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </Link>

                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="py-2 px-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-center flex items-center justify-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </Link>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="py-2 px-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            {loading ? "Loading articles..." : "No articles found matching filters."}
          </div>
        )}
      </div>

      {/* 2. DESKTOP & TABLET POSTS TABLE (>= md) */}
      <div className="hidden md:block rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="p-4">Title & Excerpt</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Views</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-4 max-w-sm">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm">
                        {post.title}
                      </div>
                      <div className="text-slate-500 line-clamp-1 mt-0.5 text-[11px]">
                        {post.excerpt}
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                        {post.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200"
                            : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-200"
                        }`}
                      >
                        {post.status}
                      </button>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {post.views}
                      </span>
                    </td>

                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(post.publishedAt)}
                    </td>

                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 inline-flex rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="View Public Post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 inline-flex rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 inline-flex rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500">
                    {loading ? "Loading articles..." : "No articles found matching filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
