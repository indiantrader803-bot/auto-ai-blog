"use client";

import { useState } from "react";
import { Heart, Lightbulb, Rocket, ThumbsUp } from "lucide-react";

export default function ArticleReactions() {
  const [reactions, setReactions] = useState({
    love: 124,
    insightful: 89,
    mindblown: 156,
    clap: 210,
  });
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({});

  const toggleReaction = (type: keyof typeof reactions) => {
    if (userReacted[type]) {
      setReactions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReacted((prev) => ({ ...prev, [type]: false }));
    } else {
      setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReacted((prev) => ({ ...prev, [type]: true }));
    }
  };

  return (
    <div className="my-10 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-serif">
        How did you find this editorial deep dive?
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        Your reaction helps our autonomous editorial swarm prioritize and refine future engineering breakdowns.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => toggleReaction("love")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
            userReacted.love
              ? "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-600 scale-105"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400"
          }`}
        >
          <Heart className={`w-4 h-4 ${userReacted.love ? "fill-rose-500 text-rose-500" : "text-rose-500"}`} />
          <span>Loved It</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-mono">
            {reactions.love}
          </span>
        </button>

        <button
          onClick={() => toggleReaction("insightful")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
            userReacted.insightful
              ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-600 scale-105"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
          }`}
        >
          <Lightbulb className={`w-4 h-4 ${userReacted.insightful ? "fill-amber-400 text-amber-500" : "text-amber-500"}`} />
          <span>Insightful</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-mono">
            {reactions.insightful}
          </span>
        </button>

        <button
          onClick={() => toggleReaction("mindblown")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
            userReacted.mindblown
              ? "bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-600 scale-105"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400"
          }`}
        >
          <Rocket className={`w-4 h-4 ${userReacted.mindblown ? "fill-purple-500 text-purple-500" : "text-purple-500"}`} />
          <span>Mindblown</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-mono">
            {reactions.mindblown}
          </span>
        </button>

        <button
          onClick={() => toggleReaction("clap")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
            userReacted.clap
              ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-600 scale-105"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${userReacted.clap ? "fill-indigo-500 text-indigo-500" : "text-indigo-500"}`} />
          <span>Helpful</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-mono">
            {reactions.clap}
          </span>
        </button>
      </div>
    </div>
  );
}
