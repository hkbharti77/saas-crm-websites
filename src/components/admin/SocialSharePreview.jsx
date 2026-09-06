import React from 'react';
import { Share2 } from 'lucide-react';

const FALLBACK_OG_IMAGE = 'https://www.gyanvaniai.online/hero_dashboard.webp';

export default function SocialSharePreview({ title, description, imageUrl }) {
  const displayTitle = title || 'Untitled Article';
  const displayDesc = description || 'Read insightful strategies on WhatsApp CRM, multi-agent AI, and enterprise automation on GyanVaniAi.';
  const displayImage = imageUrl || FALLBACK_OG_IMAGE;

  return (
    <div className="seo-preview-card social-preview">
      <div className="seo-preview-header">
        <span className="seo-preview-label">
          <Share2 size={13} style={{ marginRight: '4px' }} />
          Social Share / Open Graph Preview
        </span>
      </div>
      <div className="social-preview-body">
        <div className="social-preview-image-container">
          <img
            src={displayImage}
            alt="Social card preview"
            className="social-preview-img"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_OG_IMAGE;
            }}
          />
        </div>
        <div className="social-preview-meta">
          <span className="social-preview-domain">GYANVANIAI.ONLINE</span>
          <h4 className="social-preview-title">{displayTitle}</h4>
          <p className="social-preview-desc">{displayDesc}</p>
        </div>
      </div>
    </div>
  );
}
