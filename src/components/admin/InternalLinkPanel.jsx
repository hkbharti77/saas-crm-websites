import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Link as LinkIcon, Plus, Copy, Check, EyeOff } from 'lucide-react';
import { analyzeInternalLinks } from '../../utils/internalLinkAnalyzer';
import { sanitizeBlogHtml } from '../../utils/sanitizeBlogHtml';

export default function InternalLinkPanel({
  currentBlogId,
  category = '',
  tags = [],
  content = '',
  onInsertLinkToDraft
}) {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPublished() {
      setLoading(true);
      try {
        const q = query(collection(db, 'blogs'));
        const snap = await getDocs(q);
        const docs = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(b => b.status === 'published');
        setPublishedBlogs(docs);
      } catch (err) {
        console.error('Failed to load published blogs for link analysis:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPublished();
  }, []);

  const recommendations = useMemo(() => {
    if (publishedBlogs.length === 0) return [];
    return analyzeInternalLinks({
      currentBlogId,
      currentCategory: category,
      currentTags: tags,
      currentContent: content,
      publishedBlogs
    });
  }, [currentBlogId, category, tags, content, publishedBlogs]);

  const activeRecs = recommendations.filter(r => !dismissed.has(r.id));

  const handleInsertLink = (rec) => {
    if (!onInsertLinkToDraft) return;

    // Validate relative internal route only
    if (!rec.targetUrl || !rec.targetUrl.startsWith('/blog/')) {
      alert('Security Violation: Only relative internal blog routes are allowed.');
      return;
    }

    const safeHtmlLink = `<p><em>Related Reading: <a href="${rec.targetUrl}">${rec.suggestedAnchorText}</a></em></p>\n`;
    const cleanHtml = sanitizeBlogHtml(safeHtmlLink);
    onInsertLinkToDraft(cleanHtml);
  };

  const handleCopyLink = (rec) => {
    const htmlToCopy = `<a href="${rec.targetUrl}">${rec.suggestedAnchorText}</a>`;
    navigator.clipboard.writeText(htmlToCopy);
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDismiss = (recId) => {
    setDismissed(prev => new Set(prev).add(recId));
  };

  return (
    <div className="internal-link-panel">
      <div className="internal-link-header">
        <div className="internal-link-title">
          <LinkIcon size={16} className="text-teal-600" />
          <h4>Internal Link Recommendations ({activeRecs.length})</h4>
        </div>
        <small className="internal-link-sub">Boost SEO authority by linking related published posts</small>
      </div>

      {loading ? (
        <div className="internal-link-loading">Analyzing library...</div>
      ) : activeRecs.length === 0 ? (
        <div className="internal-link-empty">
          No pending internal link recommendations for this article.
        </div>
      ) : (
        <div className="internal-link-list">
          {activeRecs.map(rec => (
            <div key={rec.id} className="internal-link-card">
              <div className="internal-link-card-body">
                <div className="internal-link-card-header">
                  <span className="internal-link-score">+{rec.score} relevance</span>
                  <span className="internal-link-cat">{rec.category || 'General'}</span>
                </div>
                <h5 className="internal-link-card-title">{rec.title}</h5>
                <p className="internal-link-card-reason">💡 {rec.reason}</p>
                <code className="internal-link-url">{rec.targetUrl}</code>
              </div>

              <div className="internal-link-card-actions">
                <button
                  type="button"
                  className="internal-link-btn primary"
                  onClick={() => handleInsertLink(rec)}
                  title="Insert sanitized link block into working draft"
                >
                  <Plus size={13} />
                  <span>Insert in Draft</span>
                </button>
                <button
                  type="button"
                  className="internal-link-btn secondary"
                  onClick={() => handleCopyLink(rec)}
                  title="Copy link HTML snippet"
                >
                  {copiedId === rec.id ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedId === rec.id ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  className="internal-link-btn icon-only"
                  onClick={() => handleDismiss(rec.id)}
                  title="Dismiss recommendation"
                >
                  <EyeOff size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
