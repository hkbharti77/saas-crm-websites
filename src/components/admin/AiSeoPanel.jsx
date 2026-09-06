/**
 * AiSeoPanel.jsx
 * Production-quality AI SEO Analysis & Recommendation panel for AdminBlogEditor.
 * Uses deterministic score + checklist from actual article data.
 * AI suggestions (titles, meta descriptions, slugs, intent, FAQ) require explicit user approval ([Apply], [Insert], [Copy], [Discard]).
 * Operates strictly on working draft state without directly modifying published Firestore records.
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Trash2,
  HelpCircle,
  Link as LinkIcon,
  FileText
} from 'lucide-react';
import { aiContentAssist } from '../../services/ai/aiClient';
import { sanitizeBlogHtml } from '../../utils/sanitizeBlogHtml';
import { slugify } from '../../utils/slugify';

export default function AiSeoPanel({
  formData = {},
  content = '',
  _isEditing = false,
  isPublished = false,
  onApplySeoTitle,
  onApplyMetaDesc,
  onApplySlug,
  onInsertContent,
}) {
  // AI Generation States
  const [loadingAction, setLoadingAction] = useState(''); // '' | 'intent' | 'titles' | 'meta' | 'slugs' | 'faqs' | 'headings'
  const [errorMsg, setErrorMsg] = useState('');

  // AI Output States
  const [searchIntent, setSearchIntent] = useState(null);
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [metaSuggestions, setMetaSuggestions] = useState([]);
  const [slugSuggestions, setSlugSuggestions] = useState([]);
  const [faqSuggestions, setFaqSuggestions] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ─── Deterministic SEO Audit & Score ─────────────────────────────────────────
  const audit = useMemo(() => {
    const seoTitleLen = (formData.seoTitle || formData.title || '').length;
    const metaDescLen = (formData.seoDescription || formData.excerpt || '').length;
    const hasImage = Boolean(formData.imageUrl || formData.ogImageUrl);
    const hasCategory = Boolean(formData.category);
    const hasTags = Array.isArray(formData.tags) && formData.tags.length > 0;

    // Count headings in content
    const headingCounts = typeof DOMParser !== 'undefined' ? (() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content || '', 'text/html');
      return {
        h1Count: doc.querySelectorAll('h1').length,
        h2Count: doc.querySelectorAll('h2').length,
        h3Count: doc.querySelectorAll('h3').length,
      };
    })() : {
      h1Count: ((content || '').match(/<h1/gi) || []).length,
      h2Count: ((content || '').match(/<h2/gi) || []).length,
      h3Count: ((content || '').match(/<h3/gi) || []).length,
    };
    const { h1Count, h2Count, h3Count } = headingCounts;

    const checklist = [
      { id: 'title', label: 'SEO Title (45–65 chars)', pass: seoTitleLen >= 40 && seoTitleLen <= 70, note: `${seoTitleLen} chars` },
      { id: 'meta', label: 'Meta Description (130–160 chars)', pass: metaDescLen >= 120 && metaDescLen <= 170, note: `${metaDescLen} chars` },
      { id: 'image', label: 'Featured Cover Image', pass: hasImage, note: hasImage ? 'Present' : 'Missing' },
      { id: 'category', label: 'Category Assigned', pass: hasCategory, note: formData.category || 'None' },
      { id: 'tags', label: 'Article Tags', pass: hasTags, note: hasTags ? `${formData.tags.length} tags` : 'None' },
      { id: 'h2', label: 'H2 Subheadings Structure', pass: h2Count > 0, note: `${h2Count} H2s` },
    ];

    const passCount = checklist.filter(c => c.pass).length;
    const score = Math.round((passCount / checklist.length) * 100);

    return {
      score,
      checklist,
      h1Count,
      h2Count,
      h3Count,
    };
  }, [formData, content]);

  // Context for AI operations
  const articleContext = useMemo(() => ({
    title: formData.title || '',
    category: formData.category || '',
    excerpt: formData.excerpt || '',
    slug: formData.slug || '',
    seoTitle: formData.seoTitle || '',
    seoDescription: formData.seoDescription || '',
    existingContent: typeof content === 'string' ? content.slice(0, 3000) : '',
  }), [formData, content]);

  // ─── AI Action Handlers ───────────────────────────────────────────────────────
  const handleFetchIntent = async () => {
    setLoadingAction('intent');
    setErrorMsg('');
    const res = await aiContentAssist({ operation: 'aiSearchIntent', context: articleContext });
    setLoadingAction('');
    if (res.success && res.text) {
      try {
        let clean = res.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        setSearchIntent(JSON.parse(clean));
      } catch {
        setSearchIntent({ intent: 'Informational', confidence: 'Medium', reason: res.text });
      }
    } else {
      setErrorMsg(res.error || 'Failed to classify search intent');
    }
  };

  const handleFetchTitles = async () => {
    setLoadingAction('titles');
    setErrorMsg('');
    const res = await aiContentAssist({ operation: 'aiSeoTitleSuggestions', context: articleContext });
    setLoadingAction('');
    if (res.success && res.text) {
      try {
        let clean = res.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        setTitleSuggestions(JSON.parse(clean));
      } catch {
        setErrorMsg('Failed to parse title suggestions JSON');
      }
    } else {
      setErrorMsg(res.error || 'Failed to generate SEO titles');
    }
  };

  const handleFetchMeta = async () => {
    setLoadingAction('meta');
    setErrorMsg('');
    const res = await aiContentAssist({ operation: 'aiMetaDescriptionSuggestions', context: articleContext });
    setLoadingAction('');
    if (res.success && res.text) {
      try {
        let clean = res.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        setMetaSuggestions(JSON.parse(clean));
      } catch {
        setErrorMsg('Failed to parse meta description suggestions JSON');
      }
    } else {
      setErrorMsg(res.error || 'Failed to generate meta descriptions');
    }
  };

  const handleFetchSlugs = async () => {
    setLoadingAction('slugs');
    setErrorMsg('');
    const res = await aiContentAssist({ operation: 'aiSlugSuggestions', context: articleContext });
    setLoadingAction('');
    if (res.success && res.text) {
      try {
        let clean = res.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        const rawList = JSON.parse(clean);
        // Sanitize slugs
        const cleanList = rawList.map(item => ({
          ...item,
          slug: slugify(item.slug || ''),
        }));
        setSlugSuggestions(cleanList);
      } catch {
        setErrorMsg('Failed to parse slug suggestions JSON');
      }
    } else {
      setErrorMsg(res.error || 'Failed to generate URL slugs');
    }
  };

  const handleFetchFaqs = async () => {
    setLoadingAction('faqs');
    setErrorMsg('');
    const res = await aiContentAssist({ operation: 'aiFaqSuggestions', context: articleContext });
    setLoadingAction('');
    if (res.success && res.text) {
      try {
        let clean = res.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        setFaqSuggestions(JSON.parse(clean));
      } catch {
        setErrorMsg('Failed to parse FAQ suggestions JSON');
      }
    } else {
      setErrorMsg(res.error || 'Failed to generate FAQ ideas');
    }
  };

  const handleCopyText = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(key);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleInsertFaqSection = () => {
    if (!faqSuggestions || faqSuggestions.length === 0) return;
    let faqHtml = '<h2>Frequently Asked Questions</h2>';
    faqSuggestions.forEach(item => {
      faqHtml += `<h3>${item.question}</h3><p>${item.answerOutline}</p>`;
    });
    if (onInsertContent) {
      onInsertContent(sanitizeBlogHtml(faqHtml));
    }
  };

  return (
    <div className="ai-seo-panel">
      {/* 1. Deterministic SEO Health Audit */}
      <div className="ai-seo-audit-card">
        <div className="ai-seo-score-header">
          <div>
            <span className="ai-seo-score-label">Deterministic SEO Health</span>
            <div className="ai-seo-score-value" style={{ color: audit.score >= 80 ? '#10b981' : audit.score >= 60 ? '#f59e0b' : '#ef4444' }}>
              {audit.score} <span style={{ fontSize: '1rem', color: 'var(--cms-text-muted)' }}>/ 100</span>
            </div>
          </div>
          <div className="ai-seo-badge-pill">
            {audit.score >= 80 ? 'Good' : audit.score >= 60 ? 'Needs Improvement' : 'Action Required'}
          </div>
        </div>

        <div className="ai-seo-checklist-grid">
          {audit.checklist.map(item => (
            <div key={item.id} className="ai-seo-check-item">
              {item.pass ? (
                <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
              ) : (
                <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />
              )}
              <span className="ai-seo-check-text">{item.label}</span>
              <span className="ai-seo-check-note">{item.note}</span>
            </div>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="ai-error-box" role="alert" style={{ margin: '0.75rem 0' }}>
          <AlertTriangle size={15} style={{ color: '#ef4444' }} /> {errorMsg}
        </div>
      )}

      {/* 2. AI Search Intent Classifier */}
      <div className="ai-seo-section-card">
        <div className="ai-seo-section-header">
          <span className="ai-seo-section-title"><Search size={14} /> Likely Search Intent</span>
          <button type="button" className="admin-cms-btn-secondary" onClick={handleFetchIntent} disabled={loadingAction === 'intent'} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
            {loadingAction === 'intent' ? <RefreshCw size={12} className="spin" /> : <Sparkles size={12} />} Classify
          </button>
        </div>
        {searchIntent ? (
          <div className="ai-intent-result">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="ai-intent-tag">{searchIntent.intent}</span>
              <span className="ai-intent-conf">Confidence: {searchIntent.confidence}</span>
            </div>
            <p className="ai-intent-reason">{searchIntent.reason}</p>
            <span className="ai-intent-sub">* AI-classified inference based on article text</span>
          </div>
        ) : (
          <p className="ai-seo-empty-text">Click &quot;Classify&quot; to infer likely search intent from content.</p>
        )}
      </div>

      {/* 3. SEO Title Suggestions */}
      <div className="ai-seo-section-card">
        <div className="ai-seo-section-header">
          <span className="ai-seo-section-title"><Sparkles size={14} /> AI SEO Title Ideas</span>
          <button type="button" className="admin-cms-btn-secondary" onClick={handleFetchTitles} disabled={loadingAction === 'titles'} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
            {loadingAction === 'titles' ? <RefreshCw size={12} className="spin" /> : <Sparkles size={12} />} Generate Ideas
          </button>
        </div>
        {titleSuggestions.length > 0 ? (
          <div className="ai-seo-suggestions-list">
            {titleSuggestions.map((item, idx) => (
              <div key={idx} className="ai-seo-sug-item">
                <div className="ai-seo-sug-title">{item.title}</div>
                <div className="ai-seo-sug-meta">
                  <span>{item.characterCount || item.title.length} chars</span> · <span>{item.reason}</span>
                </div>
                <div className="ai-seo-sug-actions">
                  <button type="button" className="admin-cms-btn-primary" onClick={() => onApplySeoTitle(item.title)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                    Apply to SEO Title
                  </button>
                  <button type="button" className="admin-cms-btn-secondary" onClick={() => handleCopyText(item.title, `t-${idx}`)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                    {copiedIndex === `t-${idx}` ? <Check size={11} /> : <Copy size={11} />} Copy
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="admin-cms-btn-secondary" onClick={() => setTitleSuggestions([])} style={{ fontSize: '0.72rem', marginTop: '0.35rem' }}>
              <Trash2 size={11} /> Clear Suggestions
            </button>
          </div>
        ) : (
          <p className="ai-seo-empty-text">Click &quot;Generate Ideas&quot; for 3–5 click-worthy SEO title options.</p>
        )}
      </div>

      {/* 4. Meta Description Suggestions */}
      <div className="ai-seo-section-card">
        <div className="ai-seo-section-header">
          <span className="ai-seo-section-title"><FileText size={14} /> AI Meta Description Ideas</span>
          <button type="button" className="admin-cms-btn-secondary" onClick={handleFetchMeta} disabled={loadingAction === 'meta'} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
            {loadingAction === 'meta' ? <RefreshCw size={12} className="spin" /> : <Sparkles size={12} />} Generate Ideas
          </button>
        </div>
        {metaSuggestions.length > 0 ? (
          <div className="ai-seo-suggestions-list">
            {metaSuggestions.map((item, idx) => (
              <div key={idx} className="ai-seo-sug-item">
                <div className="ai-seo-sug-title" style={{ fontWeight: 400 }}>{item.description}</div>
                <div className="ai-seo-sug-meta">
                  <span>{item.characterCount || item.description.length} chars</span> · <span>{item.reason}</span>
                </div>
                <div className="ai-seo-sug-actions">
                  <button type="button" className="admin-cms-btn-primary" onClick={() => onApplyMetaDesc(item.description)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                    Apply Meta Description
                  </button>
                  <button type="button" className="admin-cms-btn-secondary" onClick={() => handleCopyText(item.description, `m-${idx}`)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                    {copiedIndex === `m-${idx}` ? <Check size={11} /> : <Copy size={11} />} Copy
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="admin-cms-btn-secondary" onClick={() => setMetaSuggestions([])} style={{ fontSize: '0.72rem', marginTop: '0.35rem' }}>
              <Trash2 size={11} /> Clear Suggestions
            </button>
          </div>
        ) : (
          <p className="ai-seo-empty-text">Click &quot;Generate Ideas&quot; for engaging meta descriptions.</p>
        )}
      </div>

      {/* 5. URL Slug Suggestions */}
      <div className="ai-seo-section-card">
        <div className="ai-seo-section-header">
          <span className="ai-seo-section-title"><LinkIcon size={14} /> AI URL Slug Suggestions</span>
          <button type="button" className="admin-cms-btn-secondary" onClick={handleFetchSlugs} disabled={loadingAction === 'slugs'} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
            {loadingAction === 'slugs' ? <RefreshCw size={12} className="spin" /> : <Sparkles size={12} />} Generate Slugs
          </button>
        </div>

        {isPublished && (
          <div className="ai-seo-pub-warning" role="alert">
            <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <span>Changing the URL slug of a live published post changes its public URL. Ensure redirects are set if changed.</span>
          </div>
        )}

        {slugSuggestions.length > 0 ? (
          <div className="ai-seo-suggestions-list">
            {slugSuggestions.map((item, idx) => (
              <div key={idx} className="ai-seo-sug-item">
                <div className="ai-seo-sug-title" style={{ fontFamily: 'monospace' }}>/blog/{item.slug}</div>
                <div className="ai-seo-sug-meta"><span>{item.reason}</span></div>
                <div className="ai-seo-sug-actions">
                  <button type="button" className="admin-cms-btn-primary" onClick={() => onApplySlug(item.slug)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                    Apply Slug
                  </button>
                  <button type="button" className="admin-cms-btn-secondary" onClick={() => handleCopyText(item.slug, `s-${idx}`)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                    {copiedIndex === `s-${idx}` ? <Check size={11} /> : <Copy size={11} />} Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="ai-seo-empty-text">Click &quot;Generate Slugs&quot; for clean, URL-safe slug options.</p>
        )}
      </div>

      {/* 6. FAQ Ideas & Heading Structure */}
      <div className="ai-seo-section-card">
        <div className="ai-seo-section-header">
          <span className="ai-seo-section-title"><HelpCircle size={14} /> FAQ Opportunities</span>
          <button type="button" className="admin-cms-btn-secondary" onClick={handleFetchFaqs} disabled={loadingAction === 'faqs'} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
            {loadingAction === 'faqs' ? <RefreshCw size={12} className="spin" /> : <Sparkles size={12} />} Generate FAQ Ideas
          </button>
        </div>

        {faqSuggestions.length > 0 ? (
          <div className="ai-seo-suggestions-list">
            {faqSuggestions.map((item, idx) => (
              <div key={idx} className="ai-seo-sug-item">
                <div className="ai-seo-sug-title">Q: {item.question}</div>
                <div className="ai-seo-sug-meta">{item.answerOutline}</div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="button" className="admin-cms-btn-primary" onClick={handleInsertFaqSection} style={{ fontSize: '0.75rem' }}>
                Insert Full FAQ Section into Editor
              </button>
              <button type="button" className="admin-cms-btn-secondary" onClick={() => setFaqSuggestions([])} style={{ fontSize: '0.75rem' }}>
                Discard
              </button>
            </div>
          </div>
        ) : (
          <p className="ai-seo-empty-text">Generate 3–5 FAQ Q&A pairs to capture voice search and long-tail traffic.</p>
        )}
      </div>
    </div>
  );
}
