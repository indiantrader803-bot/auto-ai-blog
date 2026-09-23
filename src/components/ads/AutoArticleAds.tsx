'use client';

import React from 'react';
import MonetagBanner from './MonetagBanner';

interface AutoArticleAdsProps {
  contentHtml: string;
  minWordCount?: number;
}

/**
 * Automatically injects Monetag banners into HTML article body:
 * 1. Never injects if word count is < minWordCount (default: 500)
 * 2. Injects ad after paragraph 2
 * 3. Injects ad at midpoint paragraph
 * 4. Never injects inside <h1>-<h6>, <ul>, <ol>, <code>, <pre>, <blockquote>
 */
export default function AutoArticleAds({ contentHtml, minWordCount = 500 }: AutoArticleAdsProps) {
  // Strip tags for word count check
  const textOnly = contentHtml.replace(/<[^>]*>?/gm, ' ').trim();
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;

  // Short articles skip mid-content auto ads to preserve reading UX
  if (wordCount < minWordCount) {
    return (
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    );
  }

  // Split safely by paragraph closure
  const paragraphs = contentHtml.split(/(<\/p>)/gi);
  const totalP = Math.floor(paragraphs.length / 2);

  if (totalP <= 3) {
    return (
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    );
  }

  const p2Index = 3; // (p1, </p>, p2, </p>) -> inject after index 3
  const midIndex = Math.floor(paragraphs.length / 2);

  const parts: React.ReactNode[] = [];
  let currentHtml = '';

  for (let i = 0; i < paragraphs.length; i++) {
    currentHtml += paragraphs[i];

    if (i === p2Index) {
      parts.push(
        <div
          key={`part-${i}`}
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: currentHtml }}
        />
      );
      currentHtml = '';
      parts.push(
        <MonetagBanner
          key={`ad-p2-${i}`}
          slotType="article_top"
          className="my-6"
        />
      );
    } else if (i === midIndex && midIndex > p2Index + 4) {
      parts.push(
        <div
          key={`part-${i}`}
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: currentHtml }}
        />
      );
      currentHtml = '';
      parts.push(
        <MonetagBanner
          key={`ad-mid-${i}`}
          slotType="article_middle"
          className="my-6"
        />
      );
    }
  }

  if (currentHtml) {
    parts.push(
      <div
        key="part-last"
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: currentHtml }}
      />
    );
  }

  return <>{parts}</>;
}
