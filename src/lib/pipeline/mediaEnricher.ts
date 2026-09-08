export interface MediaResult {
  featuredImage: string;
  imageAlt: string;
  imagePhotographer: string;
  imagePhotographerUrl: string;
  youtubeVideoId?: string;
  youtubeVideoTitle?: string;
}

export async function enrichMedia(
  imageQuery: string,
  videoQuery: string,
  articleTitle: string
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

  // 3. Fallback: High-quality AI Generated Image via Pollinations / Dynamic Seeded AI Canvas
  if (!imageResult.url) {
    const uniqueSeed = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    const visualStyles = [
      "cinematic lighting, photorealistic 8k octane render, editorial composition",
      "hyper-detailed digital painting, volumetric lighting, futuristic aesthetic",
      "isometric 3D architectural render, clean modern minimalism, ray tracing",
      "award-winning macro photography, ultra-detailed textures, moody bokeh",
      "modern editorial magazine visual, vibrant corporate tech illustration"
    ];
    const chosenStyle = visualStyles[Math.floor(Math.random() * visualStyles.length)];
    const sanitizedTopic = encodeURIComponent(`${imageQuery} ${articleTitle.slice(0, 40)}`);
    const prompt = `award-winning 4k wallpaper illustration of ${sanitizedTopic}, ${chosenStyle}, 16:9 aspect ratio, highly detailed`;
    imageResult.url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=675&seed=${uniqueSeed}&nologo=true`;
    imageResult.alt = `${articleTitle} - High Resolution Visual`;
    imageResult.photographer = "AI Visual Intelligence Engine";
    imageResult.photographerUrl = "https://pollinations.ai";
  }

  // 3.5. Optionally Upload to Amazon S3 CDN Bucket
  if (process.env.AWS_S3_BUCKET_NAME && imageResult.url) {
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

  // 4. Video Lookup
  let videoResult: { id?: string; title?: string } = {};

  if (youtubeKey) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
          videoQuery
        )}&type=video&key=${youtubeKey}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          videoResult = {
            id: item.id.videoId,
            title: item.snippet.title,
          };
        }
      }
    } catch (e: any) {
      console.warn("YouTube API search failed:", e.message);
    }
  }

  // If no YouTube API key, let's leave videoResult or provide fallback if applicable
  return {
    featuredImage: imageResult.url,
    imageAlt: imageResult.alt,
    imagePhotographer: imageResult.photographer,
    imagePhotographerUrl: imageResult.photographerUrl,
    youtubeVideoId: videoResult.id,
    youtubeVideoTitle: videoResult.title,
  };
}
