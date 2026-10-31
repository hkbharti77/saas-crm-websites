import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * AiAnswerSummaryBlock
 * Converts structured technical facts and Q&A into invisible Schema.org JSON-LD
 * for AI citation, search engine crawlers, and LLMs without rendering any visible UI.
 */
export default function AiAnswerSummaryBlock({ items = [], title = "Quick Facts & AI Reference Guide" }) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'name': title,
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': `${item.answer}${item.bullets && item.bullets.length > 0 ? ' ' + item.bullets.join('. ') : ''}`
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
