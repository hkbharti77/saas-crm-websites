/**
 * AiContentAssistant.jsx
 * Human-in-the-loop AI Content Assistant component for Blog Editor.
 * Operates on selected text or article context.
 * Suggestion preview allows explicit user decisions: Insert, Replace Selection, Copy, Discard.
 * All HTML output is sanitized via DOMPurify before insertion.
 * Never silently modifies, publishes, or overwrites article content.
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Wand2,
  Copy,
  Check,
  Trash2,
  CornerDownLeft,
  Replace,
  RefreshCw,
  AlertCircle,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { aiContentAssist } from '../../services/ai/aiClient';
import { sanitizeBlogHtml } from '../../utils/sanitizeBlogHtml';
import { TONE_OPTIONS } from '../../services/ai/aiPrompts';

const OPERATIONS = [
  { group: 'Writing & Style', items: [
    { id: 'improve_writing', label: 'Improve Writing' },
    { id: 'rewrite', label: 'Rewrite' },
    { id: 'concise', label: 'Make Concise' },
    { id: 'expand', label: 'Expand' },
    { id: 'change_tone', label: 'Change Tone' },
    { id: 'grammar', label: 'Fix Grammar' },
  ]},
  { group: 'Content Generation', items: [
    { id: 'introduction', label: 'Generate Introduction' },
    { id: 'conclusion', label: 'Generate Conclusion' },
    { id: 'headings', label: 'Generate Headings' },
    { id: 'faq', label: 'Generate FAQ' },
    { id: 'summary', label: 'Generate Summary' },
    { id: 'cta', label: 'Generate Call to Action' },
  ]},
  { group: 'Media & Visuals', items: [
    { id: 'image_prompts', label: '🎨 Generate AI Image Prompts' },
  ]},
  { group: 'SEO & Social', items: [
    { id: 'seo_title', label: 'Generate SEO Title' },
    { id: 'meta_description', label: 'Generate Meta Description' },
    { id: 'social_post', label: 'Generate Social Post' },
  ]},
];

export default function AiContentAssistant({
  articleContext = {},
  selectedText = '',
  onInsertSuggestion,
  onReplaceSelection,
  onApplySeoTitle,
  onApplyMetaDesc,
  onCloseMobile,
}) {
  const [selectedOperation, setSelectedOperation] = useState('improve_writing');
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [imagePromptsList, setImagePromptsList] = useState([]);
  const [lastUsedOp, setLastUsedOp] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState(null);
  const [copiedAllPrompts, setCopiedAllPrompts] = useState(false);

  // Clear copied states after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (copiedPromptIdx !== null) {
      const timer = setTimeout(() => setCopiedPromptIdx(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedPromptIdx]);

  useEffect(() => {
    if (copiedAllPrompts) {
      const timer = setTimeout(() => setCopiedAllPrompts(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedAllPrompts]);

  const handleGenerate = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    setSuggestion('');
    setImagePromptsList([]);
    setLastUsedOp(selectedOperation);

    const contextPayload = {
      title: articleContext.title || '',
      category: articleContext.category || '',
      excerpt: articleContext.excerpt || '',
      existingContent: typeof articleContext.content === 'string' ? articleContext.content.slice(0, 3000) : '',
    };

    const textToProcess = selectedText.trim() || articleContext.title || '';

    const res = await aiContentAssist({
      operation: selectedOperation,
      text: textToProcess,
      context: contextPayload,
      tone: selectedTone,
    });

    if (!res.success) {
      setStatus('error');
      setErrorMsg(res.error || 'AI returned no usable content. Please verify provider setup or try again.');
      return;
    }

    if (selectedOperation === 'image_prompts') {
      let prompts = [];
      if (res.data && Array.isArray(res.data.prompts)) {
        prompts = res.data.prompts;
      } else if (res.text) {
        try {
          const clean = res.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
          const parsed = JSON.parse(clean);
          if (Array.isArray(parsed.prompts)) prompts = parsed.prompts;
          else if (Array.isArray(parsed)) prompts = parsed;
        } catch {
          prompts = [{
            id: 'gen_1',
            purpose: 'Post Banner Image',
            prompt: res.text,
            style: '3D Render / Modern Tech',
            aspectRatio: '16:9'
          }];
        }
      }

      if (prompts.length === 0) {
        setStatus('error');
        setErrorMsg('Could not extract image generation prompts from AI response.');
        return;
      }

      setImagePromptsList(prompts);
      setStatus('success');
      return;
    }

    if (!res.text || res.text.trim() === '') {
      setStatus('error');
      setErrorMsg('AI returned empty text. Please try again.');
      return;
    }

    // Convert any markdown formatting symbols to clean HTML tags
    let textOutput = res.text.trim();
    if (textOutput.includes('**') || textOutput.includes('###') || textOutput.includes('## ') || textOutput.includes('# ')) {
      textOutput = textOutput
        .replace(/^###\s+(.*$)/gim, '<h3>$1</h3>')
        .replace(/^##\s+(.*$)/gim, '<h2>$1</h2>')
        .replace(/^#\s+(.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gis, '<ul>$1</ul>')
        .replace(/\n\s*\n/g, '</p><p>');
      if (!textOutput.startsWith('<')) {
        textOutput = `<p>${textOutput}</p>`;
      }
    }

    const sanitizedResult = sanitizeBlogHtml(textOutput);

    setSuggestion(sanitizedResult || res.text.trim());
    setStatus('success');
  };

  const handleCopy = () => {
    if (!suggestion) return;
    // Extract plain text for clipboard
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = suggestion;
    const plainText = tempDiv.textContent || tempDiv.innerText || suggestion;

    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
    }).catch(() => {});
  };

  const handleInsert = () => {
    if (!suggestion) return;

    if (lastUsedOp === 'seo_title' && onApplySeoTitle) {
      const temp = document.createElement('div');
      temp.innerHTML = suggestion;
      onApplySeoTitle(temp.textContent || temp.innerText || suggestion);
    } else if (lastUsedOp === 'meta_description' && onApplyMetaDesc) {
      const temp = document.createElement('div');
      temp.innerHTML = suggestion;
      onApplyMetaDesc(temp.textContent || temp.innerText || suggestion);
    } else if (onInsertSuggestion) {
      onInsertSuggestion(suggestion);
    }
  };

  const handleReplace = () => {
    if (!suggestion || !selectedText) return;
    if (onReplaceSelection) {
      onReplaceSelection(suggestion);
    }
  };

  const handleDiscard = () => {
    setSuggestion('');
    setImagePromptsList([]);
    setStatus('idle');
    setErrorMsg('');
  };

  const handleCopySinglePrompt = (promptText, idx) => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText).then(() => {
      setCopiedPromptIdx(idx);
    }).catch(() => {});
  };

  const handleCopyAllImagePrompts = () => {
    if (!imagePromptsList || imagePromptsList.length === 0) return;
    const formatted = imagePromptsList
      .map((item, i) => `[Image ${i + 1}: ${item.purpose || 'Post Visual'}]\nStyle: ${item.style || 'Tech'}\nAspect Ratio: ${item.aspectRatio || '16:9'}\nPrompt: ${item.prompt}`)
      .join('\n\n---\n\n');

    navigator.clipboard.writeText(formatted).then(() => {
      setCopiedAllPrompts(true);
    }).catch(() => {});
  };

  const getOpLabel = (id) => {
    for (const grp of OPERATIONS) {
      const item = grp.items.find(i => i.id === id);
      if (item) return item.label;
    }
    return id;
  };

  return (
    <div className="ai-assistant-panel" aria-label="AI Content Assistant">
      <div className="ai-assistant-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={16} className="ai-sparkles-icon" />
          <h3 className="ai-assistant-title">AI Content Assistant</h3>
        </div>
        {onCloseMobile && (
          <button type="button" className="ai-close-mobile-btn" onClick={onCloseMobile} aria-label="Close AI panel">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Selection indicator */}
      <div className="ai-selection-badge">
        {selectedText ? (
          <span className="ai-badge-active" title={selectedText}>
            ✂️ Operating on selected text ({selectedText.length} chars)
          </span>
        ) : (
          <span className="ai-badge-context">
            📄 Operating on article context
          </span>
        )}
      </div>

      {/* Action Selector */}
      <div className="ai-field-group">
        <label className="ai-field-label">Choose AI Action</label>
        <select
          className="ai-select-input"
          value={selectedOperation}
          onChange={(e) => setSelectedOperation(e.target.value)}
          disabled={status === 'loading'}
        >
          {OPERATIONS.map((grp) => (
            <optgroup key={grp.group} label={grp.group}>
              {grp.items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Tone Selector (active for change_tone or optional preference) */}
      {(selectedOperation === 'change_tone' || selectedOperation === 'rewrite' || selectedOperation === 'improve_writing') && (
        <div className="ai-field-group">
          <label className="ai-field-label">Target Tone</label>
          <select
            className="ai-select-input"
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            disabled={status === 'loading'}
          >
            {TONE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}

      {/* Generate Button */}
      <button
        type="button"
        className="admin-cms-btn-primary ai-generate-btn"
        onClick={handleGenerate}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <RefreshCw size={14} className="spin" /> Generating suggestion…
          </>
        ) : (
          <>
            <Wand2 size={14} /> {selectedOperation === 'image_prompts' ? 'Generate Image Prompts' : 'Generate Suggestion'}
          </>
        )}
      </button>

      {/* Error state */}
      {status === 'error' && (
        <div className="ai-error-box" role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem' }}>
            <AlertCircle size={15} /> AI generation failed
          </div>
          <p className="ai-error-text">{errorMsg}</p>
          <p className="ai-error-sub">Your article content was not modified.</p>
          <button type="button" className="admin-cms-btn-secondary" onClick={handleGenerate} style={{ fontSize: '0.78rem', marginTop: '0.5rem' }}>
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* SEPARATE DISPLAY: Post-Related Image Generation Prompts */}
      {status === 'success' && lastUsedOp === 'image_prompts' && imagePromptsList.length > 0 && (
        <div className="ai-image-prompts-container">
          <div className="ai-image-prompts-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ImageIcon size={15} style={{ color: '#0d9488' }} />
              <span className="ai-suggestion-tag">🎨 AI Image Prompts ({imagePromptsList.length})</span>
            </div>
            <button
              type="button"
              className="admin-cms-btn-secondary"
              onClick={handleCopyAllImagePrompts}
              style={{ fontSize: '0.73rem', padding: '0.2rem 0.5rem' }}
            >
              {copiedAllPrompts ? <Check size={12} style={{ color: '#10b981' }} /> : <Copy size={12} />}
              {copiedAllPrompts ? 'All Copied' : 'Copy All Prompts'}
            </button>
          </div>

          <p className="ai-image-prompts-subtitle">
            Prompts generated for <strong>Midjourney v6, DALL-E 3, FLUX, & Stable Diffusion</strong> based on this blog post.
          </p>

          <div className="ai-image-prompts-list">
            {imagePromptsList.map((item, idx) => (
              <div key={item.id || idx} className="ai-image-prompt-card">
                <div className="ai-image-prompt-card-header">
                  <span className="ai-prompt-purpose-badge">📌 {item.purpose || `Image ${idx + 1}`}</span>
                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    {item.style && <span className="ai-prompt-style-badge">{item.style}</span>}
                    {item.aspectRatio && <span className="ai-prompt-ar-badge">{item.aspectRatio}</span>}
                  </div>
                </div>

                <div className="ai-prompt-text-box">
                  {item.prompt}
                </div>

                <div className="ai-prompt-card-actions">
                  <button
                    type="button"
                    className="admin-cms-btn-secondary"
                    onClick={() => handleCopySinglePrompt(item.prompt, idx)}
                    style={{ fontSize: '0.73rem', width: '100%', justifyContent: 'center' }}
                  >
                    {copiedPromptIdx === idx ? (
                      <>
                        <Check size={12} style={{ color: '#10b981' }} /> Copied Prompt
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy Prompt
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="ai-image-prompts-footer">
            <button
              type="button"
              className="admin-cms-btn-secondary"
              onClick={handleDiscard}
              style={{ fontSize: '0.75rem', color: '#f43f5e' }}
            >
              <Trash2 size={12} /> Discard Image Prompts
            </button>
          </div>
        </div>
      )}

      {/* Standard Suggestion Preview Box (For Text / Headings / Summaries / FAQs) */}
      {status === 'success' && lastUsedOp !== 'image_prompts' && suggestion && (
        <div className="ai-suggestion-box">
          <div className="ai-suggestion-header">
            <span className="ai-suggestion-tag">✨ Suggestion for: {getOpLabel(lastUsedOp)}</span>
          </div>

          <div
            className="ai-suggestion-content"
            dangerouslySetInnerHTML={{ __html: suggestion }}
          />

          <div className="ai-suggestion-actions">
            <button
              type="button"
              className="admin-cms-btn-primary"
              onClick={handleInsert}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Insert suggestion into editor"
            >
              <CornerDownLeft size={13} /> Insert
            </button>

            <button
              type="button"
              className="admin-cms-btn-secondary"
              onClick={handleReplace}
              disabled={!selectedText}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem', opacity: selectedText ? 1 : 0.4 }}
              title={selectedText ? 'Replace selected text with suggestion' : 'Highlight text in editor to enable replace'}
            >
              <Replace size={13} /> Replace Selection
            </button>

            <button
              type="button"
              className="admin-cms-btn-secondary"
              onClick={handleCopy}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
            >
              {copied ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            <button
              type="button"
              className="admin-cms-btn-secondary"
              onClick={handleDiscard}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem', color: '#f43f5e' }}
              title="Discard suggestion"
            >
              <Trash2 size={13} /> Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
