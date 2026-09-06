import React, { useState } from 'react';
import { Tag as TagIcon, X, Plus } from 'lucide-react';
import { normalizeTag } from '../../utils/seoValidator';

const POPULAR_SUGGESTIONS = [
  'WhatsApp CRM',
  'AI Automation',
  'Sales Growth',
  'Customer Support',
  'RAG Pipelines',
  'Voice AI',
  'Lead Management',
  'Engineering'
];

export default function TagsInput({ tags = [], tagLabels = [], onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (textToAdd) => {
    const raw = textToAdd || inputValue;
    const normalized = normalizeTag(raw);
    if (!normalized) return;

    // Check if tag slug already exists
    if (tags.includes(normalized.slug)) {
      setInputValue('');
      return;
    }

    const nextTags = [...tags, normalized.slug];
    const nextLabels = [...tagLabels, normalized.label];

    onChange(nextTags, nextLabels);
    setInputValue('');
  };

  const handleRemoveTag = (slugToRemove) => {
    const index = tags.indexOf(slugToRemove);
    if (index === -1) return;

    const nextTags = tags.filter((_, i) => i !== index);
    const nextLabels = tagLabels.filter((_, i) => i !== index);

    onChange(nextTags, nextLabels);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="tags-input-widget">
      {/* Existing Tags Pills */}
      <div className="tags-pills-container">
        {tags.length === 0 ? (
          <span className="tags-empty-hint">No tags attached. Add tags to improve discoverability.</span>
        ) : (
          tags.map((slug, idx) => {
            const label = tagLabels[idx] || slug;
            return (
              <span key={slug} className="tag-pill">
                <TagIcon size={12} className="tag-pill-icon" />
                <span className="tag-pill-label">{label}</span>
                <button
                  type="button"
                  className="tag-pill-remove"
                  onClick={() => handleRemoveTag(slug)}
                  title={`Remove ${label}`}
                  aria-label={`Remove tag ${label}`}
                >
                  <X size={12} />
                </button>
              </span>
            );
          })
        )}
      </div>

      {/* Input Field */}
      <div className="tags-add-row">
        <input
          type="text"
          className="admin-panel-input tag-input-field"
          placeholder="Add a tag (e.g. AI Automation)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="admin-cms-btn-secondary tag-add-btn"
          onClick={() => handleAddTag()}
          disabled={!inputValue.trim()}
          title="Add tag"
        >
          <Plus size={14} />
          <span>Add</span>
        </button>
      </div>

      {/* Suggestions */}
      <div className="tags-suggestions-row">
        <span className="tags-suggestions-label">Suggestions:</span>
        <div className="tags-suggestions-pills">
          {POPULAR_SUGGESTIONS.map((sug) => {
            const normalized = normalizeTag(sug);
            const isAlreadyAdded = normalized && tags.includes(normalized.slug);
            if (isAlreadyAdded) return null;
            return (
              <button
                key={sug}
                type="button"
                className="tag-suggestion-chip"
                onClick={() => handleAddTag(sug)}
              >
                + {sug}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
