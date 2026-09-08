"use client";

import { useEffect, useState } from "react";
import { Activity, RefreshCw, CheckCircle2, AlertCircle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function PipelineLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pipeline/logs");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> Pipeline Execution Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time execution history of automated background jobs and AI runs.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 flex items-center justify-center gap-2 text-xs font-bold w-full sm:w-auto cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* 1. MOBILE LOGS CARDS (< md) */}
      <div className="block md:hidden space-y-3">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex-1">
                  {log.topic}
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${
                    log.status === "SUCCESS"
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                      : log.status === "FAILED"
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                      : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {log.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Stage: <strong className="text-slate-700 dark:text-slate-300">{log.currentStep}</strong></span>
                <span>{log.durationSeconds ? `${log.durationSeconds.toFixed(1)}s` : "-"}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{formatDate(log.createdAt)}</span>
                {log.post ? (
                  <Link
                    href={`/blog/${log.post.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400"
                  >
                    View Article <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : log.error ? (
                  <span className="text-rose-500 text-[10px]" title={log.error}>
                    Error occurred
                  </span>
                ) : (
                  <span className="text-slate-400 text-[10px]">Processing</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            No execution logs recorded yet.
          </div>
        )}
      </div>

      {/* 2. DESKTOP LOGS TABLE (>= md) */}
      <div className="hidden md:block rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Target Topic</th>
                <th className="p-4">Status</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Duration</th>
                <th className="p-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200 max-w-xs truncate">
                      {log.topic}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          log.status === "SUCCESS"
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                            : log.status === "FAILED"
                            ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                            : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {log.currentStep}
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {log.durationSeconds ? `${log.durationSeconds.toFixed(1)}s` : "-"}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      {log.post ? (
                        <Link
                          href={`/blog/${log.post.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:underline"
                        >
                          View Article <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      ) : log.error ? (
                        <span className="text-rose-500 text-[11px]" title={log.error}>
                          Error: {log.error.slice(0, 24)}...
                        </span>
                      ) : (
                        <span className="text-slate-400">Processing</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500">
                    No execution logs recorded yet.
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
