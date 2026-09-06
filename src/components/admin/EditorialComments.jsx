import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { MessageSquare, CheckCircle, RotateCcw, Send, User } from 'lucide-react';
import { logActivity } from '../../utils/auditLogger';

export default function EditorialComments({ blogId, versionId = null }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadComments() {
      if (!blogId) return;
      setLoading(true);
      try {
        const q = query(collection(db, 'blog_comments'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const fetched = snap.docs
          .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
          .filter(c => c.blogId === blogId);
        setComments(fetched);
      } catch (err) {
        console.error('Failed to load editorial comments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [blogId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !blogId) return;

    setSubmitting(true);
    try {
      const user = auth.currentUser;
      const commentPayload = {
        blogId,
        versionId: versionId || null,
        authorId: user?.uid || 'admin',
        authorName: user?.displayName || user?.email || 'Editorial Staff',
        comment: newComment.trim(),
        status: 'open',
        createdAt: serverTimestamp(),
        resolvedAt: null,
        resolvedBy: null
      };

      const docRef = await addDoc(collection(db, 'blog_comments'), commentPayload);
      const newCommentObj = { id: docRef.id, ...commentPayload, createdAt: { toDate: () => new Date() } };
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      logActivity(blogId, 'comment_added', { commentId: docRef.id, author: commentPayload.authorName });
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleResolve = async (commentItem) => {
    const isResolving = commentItem.status === 'open';
    const nextStatus = isResolving ? 'resolved' : 'open';
    const user = auth.currentUser;

    try {
      const docRef = doc(db, 'blog_comments', commentItem.id);
      const updates = {
        status: nextStatus,
        resolvedAt: isResolving ? serverTimestamp() : null,
        resolvedBy: isResolving ? (user?.displayName || user?.email || 'Admin') : null
      };
      await updateDoc(docRef, updates);

      setComments(prev => prev.map(c => c.id === commentItem.id ? { ...c, ...updates, resolvedAt: isResolving ? { toDate: () => new Date() } : null } : c));
      logActivity(blogId, isResolving ? 'comment_resolved' : 'review_reopened', { commentId: commentItem.id });
    } catch (err) {
      console.error('Failed to update comment status:', err);
    }
  };

  const openCount = comments.filter(c => c.status === 'open').length;

  return (
    <div className="editorial-comments-card">
      <div className="comments-header">
        <div className="comments-title">
          <MessageSquare size={16} className="text-teal-600" />
          <h4>Editorial Comments ({comments.length})</h4>
        </div>
        {openCount > 0 && (
          <span className="comments-open-badge">
            {openCount} Unresolved
          </span>
        )}
      </div>

      <form onSubmit={handleAddComment} className="comments-form">
        <textarea
          rows="2"
          placeholder="Add an editorial note or reviewer comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={submitting}
        />
        <div className="comments-form-actions">
          <button type="submit" className="comments-submit-btn" disabled={submitting || !newComment.trim()}>
            <Send size={13} />
            <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      <div className="comments-list">
        {loading ? (
          <div className="comments-loading">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="comments-empty">No editorial comments yet.</div>
        ) : (
          comments.map(c => (
            <div key={c.id} className={`comment-item ${c.status}`}>
              <div className="comment-meta">
                <div className="comment-author">
                  <User size={13} />
                  <span>{c.authorName || 'Editor'}</span>
                </div>
                <span className="comment-date">
                  {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString() : 'Just now'}
                </span>
              </div>
              <p className="comment-text">{c.comment}</p>

              <div className="comment-footer">
                <button
                  type="button"
                  className="comment-resolve-btn"
                  onClick={() => handleToggleResolve(c)}
                >
                  {c.status === 'open' ? (
                    <>
                      <CheckCircle size={13} />
                      <span>Mark Resolved</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw size={13} />
                      <span>Reopen</span>
                    </>
                  )}
                </button>
                {c.status === 'resolved' && (
                  <span className="comment-resolved-meta">
                    Resolved by {c.resolvedBy || 'Admin'}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
