"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, X, Youtube, Radio, ExternalLink } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  youtubeVideoId: string;
  channelTitle?: string;
  category: string;
  thumbnailUrl: string; // always the authentic YouTube thumbnail
}

// Hand-verified public videos from authoritative channels (public + embeddable on YouTube).
// Thumbnails load from YouTube's own CDN (img.youtube.com) — never third-party mirrors.
const AUTHENTIC_VIDEOS: Array<{
  youtubeVideoId: string;
  title: string;
  channelTitle: string;
  category: string;
}> = [
  {
    youtubeVideoId: "sal78ACtGTc",
    title: "What's next for AI agentic workflows ft. Andrew Ng of AI Fund",
    channelTitle: "AI Fund",
    category: "AI Architecture",
  },
  {
    youtubeVideoId: "w7ejDZ8SWv8",
    title: "React JS Crash Course",
    channelTitle: "Traversy Media",
    category: "Cloud Engineering",
  },
  {
    youtubeVideoId: "V_xro1bcAuA",
    title: "PyTorch for Deep Learning & Machine Learning – Full Course",
    channelTitle: "freeCodeCamp.org",
    category: "Hardware",
  },
];

function buildShowcaseItems(): VideoItem[] {
  return AUTHENTIC_VIDEOS.map((v) => ({
    id: `studio-${v.youtubeVideoId}`,
    title: v.title,
    youtubeVideoId: v.youtubeVideoId,
    channelTitle: v.channelTitle,
    category: v.category,
    thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeVideoId}/hqdefault.jpg`,
  }));
}

export default function VideoShowcase() {
  const [videos] = useState<VideoItem[]>(buildShowcaseItems);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

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
                <Radio className="w-3 h-3 text-rose-400 animate-pulse" /> HD
              </span>
            </div>
            <p className="text-xs text-slate-400">Curated technical workshops, architecture teardowns, and masterclasses</p>
          </div>
        </div>

        <Link
          href="/sponsor-video"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Youtube className="w-3.5 h-3.5" />
          <span>Promote Your Video</span>
        </Link>
      </div>

      {/* Video Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Thumbnail + Play Button — authentic YouTube thumbnail from img.youtube.com */}
            <div className="relative aspect-video overflow-hidden bg-slate-800">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-rose-600 transition-all duration-300">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-indigo-600/90 text-[10px] font-bold uppercase tracking-wider text-white">
                {video.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 font-serif leading-snug">
                {video.title}
              </h4>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] text-slate-400 truncate">
                  {video.channelTitle ? `Video by ${video.channelTitle}` : "Click to watch"}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-600 transition-colors"
                  aria-label={`Watch "${video.title}" on YouTube (authentic source)`}
                  title="Watch on YouTube (authentic source)"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <p className="text-[11px] text-slate-300 truncate">
                Source: {activeVideo.channelTitle || "YouTube"} ·{" "}
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white pointer-events-auto"
                >
                  Watch on YouTube
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
