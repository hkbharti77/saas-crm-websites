import React from 'react';
import { Globe } from 'lucide-react';

export default function GoogleSearchPreview({ title, description, slug }) {
  const displayTitle = title || 'Untitled Article';
  const displayDesc = description || 'No description provided. Add an excerpt or SEO description to optimize click-through rate from search engines.';
  const displaySlug = slug || 'article-slug';

  return (
    <div className="seo-preview-card google-preview">
      <div className="seo-preview-header">
        <span className="seo-preview-label">Google Search Result Preview</span>
      </div>
      <div className="google-preview-body">
        <div className="google-preview-url-row">
          <div className="google-preview-favicon">
            <Globe size={13} />
          </div>
          <div className="google-preview-url-crumbs">
            <span className="google-preview-site">GyanVaniAi</span>
            <span className="google-preview-sep">›</span>
            <span className="google-preview-path">blog › {displaySlug}</span>
          </div>
        </div>
        <h4 className="google-preview-title">
          {displayTitle} | GyanVaniAi
        </h4>
        <p className="google-preview-snippet">
          {displayDesc}
        </p>
      </div>
    </div>
  );
}
