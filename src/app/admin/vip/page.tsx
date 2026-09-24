"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Crown,
  Search,
  ShieldCheck,
  User,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Edit3,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

interface VipUser {
  id: string;
  email: string;
  name: string | null;
  isVip: boolean;
  vipTier: string;
  emailVerified: boolean;
  createdAt: string;
  _count: { sessions: number };
}

const TIER_COLORS: Record<string, string> = {
  VIP_MEMBER: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700",
  VIP_ELITE: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700",
  SUPERADMIN: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
};

export default function AdminVipPage() {
  const [users, setUsers] = useState<VipUser[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [tierDist, setTierDist] = useState<{ tier: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (query) params.set("q", query);
      if (tierFilter) params.set("tier", tierFilter);
      const res = await fetch(`/api/admin/vip/users?${params}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setTierDist(data.tierDistribution || []);
      }
    } catch {
      showToast("error", "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [page, query, tierFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleVip = async (user: VipUser) => {
    setUpdatingId(user.id);
    try {
      const res = await fetch("/api/admin/vip/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, isVip: !user.isVip }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isVip: !u.isVip } : u)));
        showToast("success", `${user.email} VIP status updated.`);
      } else {
        showToast("error", data.error || "Update failed.");
      }
    } catch {
      showToast("error", "Update failed. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const updateTier = async (user: VipUser, newTier: string) => {
    setUpdatingId(user.id);
    try {
      const res = await fetch("/api/admin/vip/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, vipTier: newTier }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, vipTier: newTier } : u)));
        showToast("success", `${user.email} promoted to ${newTier}.`);
      } else {
        showToast("error", data.error || "Tier update failed.");
      }
    } catch {
      showToast("error", "Tier update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (user: VipUser) => {
    if (!confirm(`Are you sure you want to permanently delete ${user.email}?`)) return;
    setDeletingId(user.id);
    try {
      const res = await fetch(`/api/admin/vip/users?userId=${user.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        showToast("success", `${user.email} deleted.`);
      } else {
        showToast("error", data.error || "Delete failed.");
      }
    } catch {
      showToast("error", "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold shadow-2xl border transition-all ${
            toast.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700"
              : "bg-rose-50 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-700"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Crown className="w-7 h-7 text-amber-500" />
            VIP Member Control Center
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Superadmin management for all VIP users — promote, revoke, and manage accounts.</p>
        </div>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Members</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{total}</p>
        </div>
        {tierDist.map((t) => (
          <div key={t.tier} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.tier.replace(/_/g, " ")}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{t.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all"
          />
        </div>
        <select
          value={tierFilter}
          onChange={(e) => { setTierFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-400/50"
        >
          <option value="">All Tiers</option>
          <option value="VIP_MEMBER">VIP Member</option>
          <option value="VIP_ELITE">VIP Elite</option>
          <option value="SUPERADMIN">Superadmin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Tier</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">VIP Status</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Joined</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-950 divide-y divide-slate-100 dark:divide-slate-900">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-teal-500" />
                    Loading members...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No members found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-[10px] shrink-0">
                          {(user.name || user.email)[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{user.name || "—"}</p>
                          <p className="text-slate-500 dark:text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={user.vipTier}
                        disabled={updatingId === user.id}
                        onChange={(e) => updateTier(user, e.target.value)}
                        className={`px-2 py-1 rounded-lg border text-[11px] font-bold cursor-pointer transition-all disabled:opacity-50 ${TIER_COLORS[user.vipTier] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"}`}
                      >
                        <option value="VIP_MEMBER">VIP Member</option>
                        <option value="VIP_ELITE">VIP Elite</option>
                        <option value="SUPERADMIN">Superadmin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleVip(user)}
                        disabled={updatingId === user.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-[11px] border transition-all cursor-pointer disabled:opacity-50 ${
                          user.isVip
                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400"
                        }`}
                      >
                        {user.isVip ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {user.isVip ? "Active VIP" : "Revoked"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteUser(user)}
                        disabled={deletingId === user.id}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all disabled:opacity-50 cursor-pointer"
                        title={`Delete ${user.email}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing page {page} of {totalPages} ({total} total members)
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2">{page}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
