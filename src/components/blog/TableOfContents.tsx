"use client";

import { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";
import { generateSlug } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract H2 and H3 from markdown content
    const headingLines = content.split("\n").filter((line) => line.startsWith("##"));
    const items: TocItem[] = headingLines.map((line) => {
      const isH3 = line.startsWith("###");
      const text = line.replace(/^#{2,3}\s*/, "").replace(/[#*`_]/g, "").trim();
      const id = generateSlug(text);
      return {
        id,
        text,
        level: isH3 ? 3 : 2,
      };
    });

    setHeadings(items);

    // Setup IntersectionObserver for active heading highlight
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -60% 0%" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
        <List className="w-4 h-4 text-indigo-600" />
        Table of Contents
      </div>

      <nav className="space-y-2 text-sm">
        {headings.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={idx}
              href={`#${item.id}`}
              className={`block transition-all duration-200 line-clamp-1 ${
                item.level === 3 ? "pl-4 text-xs" : "pl-1 text-sm font-medium"
              } ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 font-bold translate-x-1"
                  : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
