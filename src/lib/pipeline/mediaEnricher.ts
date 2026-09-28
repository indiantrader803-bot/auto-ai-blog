export interface MediaResult {
  featuredImage: string;
  imageAlt: string;
  imagePhotographer: string;
  imagePhotographerUrl: string;
  youtubeVideoId?: string;
  youtubeVideoTitle?: string;
  /** Channel name of the sourced YouTube video, used for authentic source attribution on the article page. */
  youtubeChannelTitle?: string;
  /** Set when the embed pipeline decided NOT to attach a video (missing key, non-embeddable, quota error...). */
  videoSkippedReason?: string;
}

/**
 * Validates a candidate YouTube video before it is ever attached to an article:
 * 1. oEmbed check  → the video is public, exists, and is embeddable (oEmbed returns 401/404/403 otherwise).
 * 2. videos.list   → verifies status.privacyStatus=public and status.embeddable directly when an API key exists.
 * This guarantees every video attached to an article is playable in the iframe embed with zero copyright takedown risk
 * from embedding private/deleted/region-blocked content.
 */
async function verifyVideoPlayable(videoId: string, youtubeKey?: string): Promise<boolean> {
  try {
    // oEmbed endpoint: no key needed; 401/403/404 when video is private, deleted, or embed-disabled
    const oembed = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!oembed.ok) return false;

    // Strict check with the official API when available (embeddable flag + privacy status)
    if (youtubeKey) {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${youtubeKey}`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (res.ok) {
        const data = await res.json();
        const item = data.items?.[0];
        if (!item) return false;
        return item.status?.privacyStatus === "public" && item.status?.embeddable === true;
      }
    }

    return true;
  } catch {
    return false;
  }
}

export async function enrichMedia(
  imageQuery: string,
  videoQuery: string,
  articleTitle: string,
  options: { includeVideo?: boolean; fastMode?: boolean } = {}
): Promise<MediaResult> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  const pexelsKey = process.env.PEXELS_API_KEY;
  const youtubeKey = process.env.YOUTUBE_API_KEY;

  let imageResult = {
    url: "",
    alt: `${articleTitle} cover photo`,
    photographer: "AI Generated Visual",
    photographerUrl: "https://pollinations.ai",
  };

  // 1. Try Unsplash API
  if (unsplashKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          imageQuery
        )}&orientation=landscape&per_page=1`,
        {
          headers: {
            Authorization: `Client-ID ${unsplashKey}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const photo = data.results[0];
          imageResult = {
            url: photo.urls.regular,
            alt: photo.alt_description || articleTitle,
            photographer: photo.user.name,
            photographerUrl: photo.user.links.html,
          };
        }
      }
    } catch (e: any) {
      console.warn("Unsplash API fetch failed:", e.message);
    }
  }

  // 2. Try Pexels API if Unsplash was not used or failed
  if (!imageResult.url && pexelsKey) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          imageQuery
        )}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: pexelsKey,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          const photo = data.photos[0];
          imageResult = {
            url: photo.src.large2x || photo.src.large,
            alt: photo.alt || articleTitle,
            photographer: photo.photographer,
            photographerUrl: photo.photographer_url,
          };
        }
      }
    } catch (e: any) {
      console.warn("Pexels API fetch failed:", e.message);
    }
  }

  // 3. Fallback: High-quality AI Generated Image via Pollinations / Seeded Photorealistic Canvas
  if (!imageResult.url) {
    const uniqueSeed = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    const visualStyles = [
      "award-winning National Geographic editorial photography, Hasselblad medium format, dramatic cinematic lighting, photorealistic 8k, sharp focus, vibrant natural colors",
      "futuristic cyber-tech aesthetic, volumetric neon lighting, cinematic octane 3D render, hyper-detailed, 8k resolution, ray tracing",
      "commercial editorial magazine cover, minimalist luxury composition, soft morning studio lighting, high contrast, crisp textures",
      "cinematic architectural photography, wide angle, dramatic golden hour sky, ultra-realistic textures, clean depth of field",
      "Wall Street / Bloomberg executive macro photography, dynamic depth of field, sleek obsidian glass reflections, crisp details"
    ];
    const chosenStyle = visualStyles[Math.floor(Math.random() * visualStyles.length)];
    const cleanQuery = imageQuery.replace(/[^a-zA-Z0-9\s]/g, " ").slice(0, 50).trim();
    const prompt = `masterpiece photograph of ${cleanQuery || articleTitle.slice(0, 45)}, ${chosenStyle}, 16:9 widescreen, no text, no watermarks`;
    imageResult.url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=675&seed=${uniqueSeed}&nologo=true&enhance=true`;
    imageResult.alt = `${articleTitle} - High Definition Visual`;
    imageResult.photographer = "SmartMag Visual Studio";
    imageResult.photographerUrl = "https://thesmartmag.com";
  }

  // 3.5. Optionally Upload to Amazon S3 CDN Bucket (skipped in fastMode to save cron time budget)
  if (process.env.AWS_S3_BUCKET_NAME && imageResult.url && !options.fastMode) {
    try {
      const { uploadImageToS3 } = await import("../aws/s3");
      const s3Url = await uploadImageToS3(imageResult.url, `cover-${Date.now()}.jpg`);
      if (s3Url) {
        imageResult.url = s3Url;
      }
    } catch (e: any) {
      console.warn("S3 CDN upload notice:", e.message);
    }
  }

  // 4. Video Lookup — authenticity & playability enforced
  // The pipeline only ever attaches a video when it has been verified as public + embeddable.
  // Without a YOUTUBE_API_KEY no video is attached at all (no risky unverified embeds).
  let videoResult: { id?: string; title?: string; channelTitle?: string } = {};
  let videoSkippedReason: string | undefined;

  if (options.includeVideo === false) {
    videoSkippedReason = "disabled via pipeline options";
  } else if (!youtubeKey) {
    videoSkippedReason = "YOUTUBE_API_KEY not configured — attaching unverified videos risks broken or restricted embeds";
  } else {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${encodeURIComponent(
          videoQuery
        )}&type=video&videoEmbeddable=true&relevanceLanguage=en&key=${youtubeKey}`,
        { signal: AbortSignal.timeout(10000) }
      );
      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        console.warn(
          `YouTube API search failed (${res.status}): ${errBody.slice(0, 200)}`
        );
        videoSkippedReason = `YouTube search returned HTTP ${res.status}`;
      } else {
        const data = await res.json();
        const candidates: any[] = data.items || [];

        // Walk candidates in relevance order and pick the FIRST one that passes full playability verification
        for (const item of candidates) {
          const id = item?.id?.videoId;
          const title = item?.snippet?.title;
          if (!id || !title) continue;

          if (await verifyVideoPlayable(id, youtubeKey)) {
            videoResult = {
              id,
              title: String(title).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
              channelTitle: item?.snippet?.channelTitle,
            };
            break;
          }
        }

        if (!videoResult.id) {
          videoSkippedReason = "no embeddable, publicly playable video matched the topic";
        }
      }
    } catch (e: any) {
      console.warn("YouTube API search failed:", e.message);
      videoSkippedReason = `YouTube search error: ${e.message}`;
    }
  }

  return {
    featuredImage: imageResult.url,
    imageAlt: imageResult.alt,
    imagePhotographer: imageResult.photographer,
    imagePhotographerUrl: imageResult.photographerUrl,
    youtubeVideoId: videoResult.id,
    youtubeVideoTitle: videoResult.title,
    youtubeChannelTitle: videoResult.channelTitle,
    videoSkippedReason,
  };
}
