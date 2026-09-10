"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateSlug } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2({ node, children, ...props }) {
            const text = String(children);
            const id = generateSlug(text);
            return (
              <h2
                id={id}
                className="scroll-mt-24 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-12 mb-4 pb-2 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-2 group"
                {...props}
              >
                <a href={`#${id}`} className="hover:text-indigo-600 transition-colors">
                  {children}
                </a>
              </h2>
            );
          },
          h3({ node, children, ...props }) {
            const text = String(children);
            const id = generateSlug(text);
            return (
              <h3
                id={id}
                className="scroll-mt-24 text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 group"
                {...props}
              >
                <a href={`#${id}`} className="hover:text-indigo-600 transition-colors">
                  {children}
                </a>
              </h3>
            );
          },
          p({ node, children, ...props }) {
            return (
              <p className="my-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300" {...props}>
                {children}
              </p>
            );
          },
          ul({ node, children, ...props }) {
            return (
              <ul className="my-4 space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300" {...props}>
                {children}
              </ul>
            );
          },
          ol({ node, children, ...props }) {
            return (
              <ol className="my-4 space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300" {...props}>
                {children}
              </ol>
            );
          },
          blockquote({ node, children, ...props }) {
            return (
              <blockquote
                className="my-6 pl-5 py-2 border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-r-xl italic text-slate-800 dark:text-slate-200"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          table({ node, children, ...props }) {
            return (
              <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <table className="w-full text-left border-collapse text-sm" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          th({ node, children, ...props }) {
            return (
              <th className="bg-slate-100 dark:bg-slate-800/80 p-3 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700">
                {children}
              </th>
            );
          },
          td({ node, children, ...props }) {
            return (
              <td className="p-3 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                {children}
              </td>
            );
          },
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <pre className="my-6 p-4 rounded-xl bg-slate-950 text-slate-100 overflow-x-auto text-sm border border-slate-800">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 text-sm font-mono font-medium" {...props}>
                {children}
              </code>
            );
          },
          a({ node, href, children, ...props }) {
            const isExternal = href?.startsWith("http");
            const isAffiliate = href && (
              href.includes("lands-po.com") ||
              href.includes("delta.exchange") ||
              href.includes("coinswitch.co") ||
              href.includes("ckcapital.co.uk") ||
              href.includes("fundedtradermarkets.com") ||
              href.includes("mffu.com") ||
              href.includes("blueguardian.com") ||
              href.includes("tradingview.com") ||
              href.includes("amazon.com")
            );

            const handleLinkClick = () => {
              if (isAffiliate) {
                try {
                  fetch("/api/analytics/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      eventType: "AFFILIATE_CLICK",
                      referrer: typeof window !== "undefined" ? window.location.pathname : null,
                      metadata: {
                        url: href,
                        label: String(children),
                        source: "inline_markdown_autolinker",
                      },
                    }),
                  }).catch(() => {});
                } catch (_) {}
              }
            };

            return (
              <a
                href={href}
                onClick={handleLinkClick}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer nofollow" : undefined}
                className={`font-semibold underline transition-colors ${
                  isAffiliate
                    ? "text-emerald-600 dark:text-emerald-400 decoration-emerald-400 hover:text-emerald-500 font-bold"
                    : "text-indigo-600 dark:text-indigo-400 decoration-indigo-400/40 hover:decoration-indigo-600"
                }`}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
