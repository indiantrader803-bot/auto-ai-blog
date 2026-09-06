export interface PipelineOptions {
  topic?: string;
  niche?: string;
  category?: string;
  tone?: "informative" | "conversational" | "authoritative" | "engaging" | "analytical";
  targetWordCount?: number;
  language?: string;
  includeVideo?: boolean;
  includeImages?: boolean;
  autoPublish?: boolean;
  affiliateKeywords?: Array<{ keyword: string; url: string; label?: string }>;
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  imageAlt?: string;
  imagePhotographer?: string;
  imagePhotographerUrl?: string;
  youtubeVideoId?: string;
  youtubeVideoTitle?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  faq: Array<{ question: string; answer: string }>;
  readTimeMinutes: number;
}

export type PipelineStep =
  | "SCOUTING"
  | "WRITING"
  | "MEDIA"
  | "VIDEO"
  | "SEO"
  | "AFFILIATES"
  | "PUBLISHING"
  | "COMPLETED"
  | "FAILED";

export interface PipelineProgress {
  step: PipelineStep;
  message: string;
  percent: number;
  data?: any;
}
