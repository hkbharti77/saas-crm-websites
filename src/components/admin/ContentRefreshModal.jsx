import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { aiService } from '../../services/ai/aiService';
import { sanitizeBlogHtml } from '../../utils/sanitizeBlogHtml';
import { logActivity } from '../../utils/auditLogger';
import { Sparkles } from 'lucide-react';

export default function ContentRefreshModal({ isOpen, onClose, article, onApplyRefreshToEditor }) {
  const [selectedOperation, setSelectedOperation] = useState('introduction');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [proposal, setProposal] = useState(null);
  const [submittingApply, setSubmittingApply] = useState(false);

  if (!isOpen || !article) return null;

  const handleGenerateRefresh = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setProposal(null);

    try {
      let promptOp = selectedOperation;
      let textInput = article.title;

      if (selectedOperation === 'introduction') {
        textInput = (article.content || '').slice(0, 500);
      } else if (selectedOperation === 'conclusion') {
        textInput = (article.content || '').slice(-500);
      } else if (selectedOperation === 'headings') {
        textInput = article.content || '';
      } else if (selectedOperation === 'faq') {
        textInput = article.title;
      }

      const res = await aiService.generateContent({
        operation: promptOp,
        text: textInput,
        tone: 'informative',
        context: {
          title: article.title,
          category: article.category,
          excerpt: article.excerpt,
          existingContent: article.content
        }
      });

      if (!res || !res.success) {
        throw new Error(res?.error || 'Failed to generate refresh proposal.');
      }

      const generatedText = res.text || (res.data ? JSON.stringify(res.data, null, 2) : '');
      const cleanHtml = sanitizeBlogHtml(generatedText);

      setProposal({
        operation: selectedOperation,
        before: selectedOperation === 'introduction' ? 'Existing introduction text' : 'Current version content',
        after: cleanHtml,
        reason: `AI refresh recommendation for ${selectedOperation} based on current brand tone and structure.`
      });

      // Log AI history entry
      const user = auth.currentUser;
      await addDoc(collection(db, 'ai_history'), {
        blogId: article.id,
        userId: user?.uid || 'admin',
        operation: selectedOperation,
        createdAt: serverTimestamp(),
        status: 'success',
        applied: false,
        summary: `Generated ${selectedOperation} refresh proposal`
      });

      logActivity(article.id, 'refresh_recommendation_generated', { operation: selectedOperation });
    } catch (err) {
      console.error('[ContentRefreshModal] Error:', err);
      setError(err.message || 'An error occurred generating refresh proposal.');
      logActivity(article.id, 'ai_operation_failed', { operation: selectedOperation, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyProposal = async () => {
    if (!proposal || !article.id) return;
    setSubmittingApply(true);

    try {
      const user = auth.currentUser;

      // 1. Create a version snapshot before applying substantial refresh
      const versionPayload = {
        blogId: article.id,
        title: article.title,
        content: article.content,
        publishedAt: article.publishedAt || serverTimestamp(),
        archivedAt: serverTimestamp(),
        authorId: user?.uid || 'admin',
        authorName: user?.displayName || user?.email || 'Admin',
        source: 'ai_refresh',
        operation: proposal.operation,
        summary: `Version snapshot prior to applying AI refresh (${proposal.operation})`
      };
      const versionDoc = await addDoc(collection(db, 'blog_versions'), versionPayload);
      logActivity(article.id, 'version_created', { versionId: versionDoc.id, source: 'ai_refresh' });

      // 2. Prepare updated workingDraft content
      let nextContent = article.content || '';
      if (proposal.operation === 'introduction') {
        nextContent = `${proposal.after}\n\n${nextContent}`;
      } else if (proposal.operation === 'conclusion' || proposal.operation === 'faq') {
        nextContent = `${nextContent}\n\n${proposal.after}`;
      } else {
        nextContent = `${nextContent}\n\n${proposal.after}`;
      }

      const cleanContent = sanitizeBlogHtml(nextContent);
      const workingDraftPayload = {
        title: article.title,
        excerpt: article.excerpt,
        content: cleanContent,
        category: article.category,
        tags: article.tags || [],
        imageUrl: article.imageUrl || '',
        status: article.status || 'published',
        updatedAt: new Date().toISOString()
      };

      // 3. Save to workingDraft in Firestore (Published content remains untouched until explicit publish)
      const docRef = doc(db, 'blogs', article.id);
      await updateDoc(docRef, {
        workingDraft: workingDraftPayload
      });

      logActivity(article.id, 'refresh_applied', { operation: proposal.operation, versionId: versionDoc.id });

      if (onApplyRefreshToEditor) {
        onApplyRefreshToEditor(workingDraftPayload);
      }
      onClose();
    } catch (err) {
      console.error('Failed to apply refresh proposal:', err);
      setError('Failed to apply refresh proposal to working draft.');
    } finally {
      setSubmittingApply(false);
    }
  };

  return (
    <div className="brief-modal-overlay" onClick={(e) => e.target.classList.contains('brief-modal-overlay') && onClose()}>
      <div className="brief-modal-container" style={{ maxWidth: '800px' }}>
        <div className="brief-modal-header">
          <div className="brief-header-title">
            <Sparkles size={20} className="text-teal-600" />
            <div>
              <h3>AI Content Refresh Proposal</h3>
              <p>Refreshing article: <strong>{article.title}</strong></p>
            </div>
          </div>
          <button type="button" className="brief-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="brief-modal-body">
          {!proposal ? (
            <form onSubmit={handleGenerateRefresh} className="brief-form">
              <div className="brief-form-group">
                <label>Select AI Refresh Focus</label>
                <select
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                >
                  <option value="introduction">Refresh & Modernize Introduction</option>
                  <option value="conclusion">Improve Conclusion & Call to Action</option>
                  <option value="headings">Enhance Article Heading Structure</option>
                  <option value="faq">Generate New FAQ Candidates</option>
                  <option value="summary">Generate Content Summary</option>
                </select>
              </div>

              {error && <div className="brief-error-banner">⚠️ {error}</div>}

              <div className="brief-modal-actions">
                <button type="button" className="brief-btn-secondary" onClick={onClose} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="brief-btn-primary" disabled={loading}>
                  {loading ? 'Generating Proposal...' : 'Generate AI Proposal ✨'}
                </button>
              </div>
            </form>
          ) : (
            <div className="brief-result-container">
              <div className="brief-result-header">
                <span className="brief-badge">AI Proposal Ready</span>
                <h4>Refresh Focus: {proposal.operation}</h4>
                <p className="brief-meta-line">{proposal.reason}</p>
              </div>

              <div className="refresh-diff-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="brief-card">
                  <h5>Current Section</h5>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    {proposal.before}
                  </div>
                </div>
                <div className="brief-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <h5 style={{ color: '#166534' }}>Proposed Refreshed HTML</h5>
                  <div
                    style={{ fontSize: '0.85rem', color: '#0f172a', background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #bbf7d0', maxHeight: '250px', overflowY: 'auto' }}
                    dangerouslySetInnerHTML={{ __html: proposal.after }}
                  />
                </div>
              </div>

              <div className="brief-modal-actions">
                <button type="button" className="brief-btn-secondary" onClick={() => setProposal(null)}>
                  ← Edit Request
                </button>
                <button
                  type="button"
                  className="brief-btn-primary"
                  onClick={handleApplyProposal}
                  disabled={submittingApply}
                >
                  {submittingApply ? 'Applying...' : '✨ Apply Proposal to Working Draft'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
