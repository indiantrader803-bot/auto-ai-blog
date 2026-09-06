"use client";

import { useState } from "react";
import { Play, X, Youtube, Radio } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  youtubeVideoId: string;
  category: string;
  duration?: string;
  thumbnailUrl?: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Building Autonomous Agent Swarms with Claude Sonnet 4.5 & LangGraph",
    youtubeVideoId: "sal78ACtGTc",
    category: "AI Architecture",
    duration: "18:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "v2",
    title: "Sub-10ms Global API Pipelines: Edge Computing Deep Dive 2026",
    youtubeVideoId: "w7ejDZ8SWv8",
    category: "Cloud Engineering",
    duration: "14:20",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "v3",
    title: "Hardware Benchmarks: Running 70B LLMs on Consumer GPUs",
    youtubeVideoId: "V_xro1bcAuA",
    category: "Hardware",
    duration: "22:10",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="mb-14 rounded-3xl bg-slate-950 p-6 sm:p-10 border border-slate-800 text-white relative overflow-hidden shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/30 flex items-center justify-center">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-white">
                Tech Chronicle Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 border border-rose-500/30">
                <Radio className="w-3 h-3 text-rose-400 animate-pulse" /> HD 4K
              </span>
            </div>
            <p className="text-xs text-slate-400">Curated technical workshops, architecture teardowns, and masterclasses</p>
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEFAULT_VIDEOS.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video.youtubeVideoId)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Thumbnail + Play Button */}
            <div className="relative aspect-video overflow-hidden bg-slate-800">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-rose-600 transition-all duration-300">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-white font-bold">
                {video.duration}
              </span>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-indigo-600/90 text-[10px] font-bold uppercase tracking-wider text-white">
                {video.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 font-serif leading-snug">
                {video.title}
              </h4>
              <p className="text-[11px] text-slate-400">Click to watch technical breakdown</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
