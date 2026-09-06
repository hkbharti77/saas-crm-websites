import React, { useState } from 'react';
import { aiService } from '../../services/ai/aiService';
import { sanitizeBlogHtml } from '../../utils/sanitizeBlogHtml';

export default function ContentBriefModal({ isOpen, onClose, onUseBriefInEditor, defaultCategory = '' }) {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [contentType, setContentType] = useState('how-to');
  const [tone, setTone] = useState('informative');
  const [category, setCategory] = useState(defaultCategory);
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brief, setBrief] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please provide a target topic or title for the brief.');
      return;
    }

    setLoading(true);
    setError('');
    setBrief(null);
    setCopied(false);

    try {
      const res = await aiService.generateContent({
        operation: 'aiContentBrief',
        text: topic,
        tone: tone,
        context: {
          targetAudience: audience || 'General SaaS & Business Readers',
          contentType,
          category: category || 'General',
          customNotes: notes
        }
      });

      if (!res || !res.success) {
        throw new Error(res?.error || 'Failed to generate content brief.');
      }

      setBrief(res.data);
    } catch (err) {
      console.error('[ContentBriefModal] Generation error:', err);
      setError(err.message || 'An error occurred while generating the content brief.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!brief) return;
    const textToCopy = `
CONTENT BRIEF: ${brief.title || topic}
Target Audience: ${brief.targetAudience || audience}
Primary Keywords: ${(brief.primaryKeywords || []).join(', ')}
Secondary Keywords: ${(brief.secondaryKeywords || []).join(', ')}
Search Intent: ${brief.searchIntent || 'N/A'}
Estimated Word Count: ${brief.estimatedWordCount || '1000-1500 words'}

RECOMMENDED STRUCTURE:
${(brief.outline || []).map(section => `
### ${section.heading}
- Core Points: ${(section.keyPoints || []).join('; ')}
- Target Word Count: ${section.estimatedWords || 'N/A'}
- Search Intent / Goal: ${section.intent || 'N/A'}
`).join('')}

KEY QUESTIONS TO ANSWER:
${(brief.keyQuestions || []).map(q => `- ${q}`).join('\n')}

COMPETITOR ANGLE / DIFFERENTIATION:
${brief.differentiator || 'N/A'}

CTA RECOMMENDATION:
${brief.ctaRecommendation || 'N/A'}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleApplyToEditor = () => {
    if (!brief || !onUseBriefInEditor) return;

    if (!window.confirm('Applying this brief will update your title, meta description, and draft outline in the editor. Unsaved local changes may be updated. Proceed?')) {
      return;
    }

    // Convert outline into clean, elegant HTML template for editor content
    let htmlContent = '';
    
    if (Array.isArray(brief.outline) && brief.outline.length > 0) {
      brief.outline.forEach(section => {
        const headingTag = (section.heading || '').toLowerCase().startsWith('h3') ? 'h3' : 'h2';
        const cleanTitle = (section.heading || '').replace(/^h[23]:\s*/i, '');
        if (cleanTitle) {
          htmlContent += `<${headingTag}>${cleanTitle}</${headingTag}>\n`;
        }
        if (Array.isArray(section.keyPoints) && section.keyPoints.length > 0) {
          htmlContent += `<ul>\n${section.keyPoints.map(pt => `  <li>${pt}</li>`).join('\n')}\n</ul>\n`;
        }
      });
    }

    if (Array.isArray(brief.keyQuestions) && brief.keyQuestions.length > 0) {
      htmlContent += `<h2>Frequently Asked Questions</h2>\n`;
      brief.keyQuestions.forEach(q => {
        htmlContent += `<p><strong>${q}</strong></p>\n`;
      });
    }

    const cleanHtml = sanitizeBlogHtml(htmlContent);

    onUseBriefInEditor({
      title: brief.suggestedTitle || brief.title || topic,
      metaDescription: brief.suggestedMetaDescription || '',
      tags: [...(brief.primaryKeywords || []), ...(brief.secondaryKeywords || [])].join(', '),
      content: cleanHtml,
      briefData: brief
    });

    onClose();
  };

  return (
    <div className="brief-modal-overlay" onClick={(e) => e.target.classList.contains('brief-modal-overlay') && onClose()}>
      <div className="brief-modal-container">
        <div className="brief-modal-header">
          <div className="brief-header-title">
            <span className="brief-icon">📋</span>
            <div>
              <h3>AI SEO Content Brief Generator</h3>
              <p>Plan comprehensive, search-optimized articles before drafting</p>
            </div>
          </div>
          <button type="button" className="brief-modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        <div className="brief-modal-body">
          {!brief ? (
            <form onSubmit={handleGenerate} className="brief-form">
              <div className="brief-form-group">
                <label htmlFor="brief-topic">Topic or Target Headline <span className="req">*</span></label>
                <input
                  id="brief-topic"
                  type="text"
                  placeholder="e.g., How to Automated Sales CRM Pipelines in 2026"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="brief-form-row">
                <div className="brief-form-group">
                  <label htmlFor="brief-audience">Target Audience</label>
                  <input
                    id="brief-audience"
                    type="text"
                    placeholder="e.g., B2B Sales Leaders & CRM Admin"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>

                <div className="brief-form-group">
                  <label htmlFor="brief-type">Content Format</label>
                  <select id="brief-type" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                    <option value="how-to">How-To Guide</option>
                    <option value="listicle">Listicle / Roundup</option>
                    <option value="comparison">Comparison / vs Guide</option>
                    <option value="ultimate-guide">Ultimate Guide</option>
                    <option value="thought-leadership">Thought Leadership</option>
                    <option value="case-study">Case Study / Analysis</option>
                  </select>
                </div>
              </div>

              <div className="brief-form-row">
                <div className="brief-form-group">
                  <label htmlFor="brief-tone">Brand Tone</label>
                  <select id="brief-tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option value="informative">Informative & Authoritative</option>
                    <option value="conversational">Conversational & Engaging</option>
                    <option value="professional">Professional & Technical</option>
                    <option value="persuasive">Persuasive & Product-Focused</option>
                  </select>
                </div>

                <div className="brief-form-group">
                  <label htmlFor="brief-cat">Category Context</label>
                  <input
                    id="brief-cat"
                    type="text"
                    placeholder="e.g., CRM Automation"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="brief-form-group">
                <label htmlFor="brief-notes">Custom Notes / Unique Angles</label>
                <textarea
                  id="brief-notes"
                  rows="2"
                  placeholder="Mention specific product features, competitors to highlight, or custom requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {error && <div className="brief-error-banner">⚠️ {error}</div>}

              <div className="brief-modal-actions">
                <button type="button" className="brief-btn-secondary" onClick={onClose} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="brief-btn-primary" disabled={loading || !topic.trim()}>
                  {loading ? 'Generating Brief with AI...' : 'Generate Content Brief ✨'}
                </button>
              </div>
            </form>
          ) : (
            <div className="brief-result-container">
              <div className="brief-result-header">
                <span className="brief-badge">AI Brief Ready</span>
                <h4>{brief.suggestedTitle || brief.title || topic}</h4>
                <p className="brief-meta-line">
                  <span><strong>Format:</strong> {contentType}</span> • 
                  <span><strong>Target Word Count:</strong> {brief.estimatedWordCount || '1200 - 1800 words'}</span> • 
                  <span><strong>Search Intent:</strong> {brief.searchIntent || 'Informational'}</span>
                </p>
              </div>

              <div className="brief-result-sections">
                <div className="brief-card">
                  <h5>Topic Terms & Semantic Focus</h5>
                  <div className="brief-kw-group">
                    <div>
                      <small>Primary Topic Terms</small>
                      <div className="brief-tags">
                        {(brief.primaryKeywords || []).map((kw, i) => (
                          <span key={i} className="brief-tag primary">{kw}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <small>Secondary Concepts</small>
                      <div className="brief-tags">
                        {(brief.secondaryKeywords || []).map((kw, i) => (
                          <span key={i} className="brief-tag secondary">{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="brief-card">
                  <h5>Recommended Content Structure</h5>
                  <div className="brief-outline-list">
                    {(brief.outline || []).map((sec, idx) => (
                      <div key={idx} className="brief-outline-item">
                        <div className="brief-outline-title">
                          <strong className="brief-heading">{sec.heading}</strong>
                          {sec.estimatedWords && <span className="brief-word-count">~{sec.estimatedWords} words</span>}
                        </div>
                        {Array.isArray(sec.keyPoints) && (
                          <ul className="brief-outline-pts">
                            {sec.keyPoints.map((pt, pIdx) => <li key={pIdx}>{pt}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {Array.isArray(brief.keyQuestions) && brief.keyQuestions.length > 0 && (
                  <div className="brief-card">
                    <h5>Questions to Answer (FAQ Candidates)</h5>
                    <ul className="brief-q-list">
                      {brief.keyQuestions.map((q, i) => <li key={i}>❓ {q}</li>)}
                    </ul>
                  </div>
                )}

                {brief.differentiator && (
                  <div className="brief-card differentiator">
                    <h5>Suggested Differentiation Angle (Topic-based)</h5>
                    <p>{brief.differentiator}</p>
                  </div>
                )}
              </div>

              <div className="brief-modal-actions brief-result-actions">
                <button type="button" className="brief-btn-secondary" onClick={() => setBrief(null)}>
                  ← Edit Prompt
                </button>
                <button type="button" className="brief-btn-secondary" onClick={handleCopyText}>
                  {copied ? '✓ Copied to Clipboard' : '📋 Copy Brief Text'}
                </button>
                <button type="button" className="brief-btn-primary" onClick={handleApplyToEditor}>
                  ✨ Apply Brief to Editor Draft
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
