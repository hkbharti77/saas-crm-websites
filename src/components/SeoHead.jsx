import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_IMAGE = 'https://www.gyanvaniai.online/hero_dashboard.webp';
const SITE_NAME = 'Gyan VaniAi';

/**
 * Shared title / description / canonical / Open Graph / Twitter tags.
 * Page-specific JSON-LD should still be emitted by the page via Helmet.
 */
export default function SeoHead({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  twitterCard = 'summary_large_image',
  publishedTime,
  modifiedTime,
  author,
  section,
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
