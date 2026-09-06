import React, { useState } from 'react';
import { auth } from '../../firebase';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, Send, XCircle, RotateCcw } from 'lucide-react';
import { logActivity } from '../../utils/auditLogger';

export default function EditorialReviewPanel({
  reviewData = {},
  isDirty = false,
  currentVersionId = null,
  onSubmitForReview,
  onUpdateReviewStatus,
}) {
  const {
    reviewStatus = 'none',
    submittedAt = null,
    submittedBy = null,
    reviewedBy = null,
    approvedVersionId = null,
    changesRequestedReason = ''
  } = reviewData;

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reasonInput, setReasonInput] = useState('');
  const [submittingAction, setSubmittingAction] = useState(false);

  // Stale approval detection: Approved version ID exists but differs from current version ID or content is dirty
  const isApproved = reviewStatus === 'approved';
  const isStaleApproval = isApproved && (
    (approvedVersionId && currentVersionId && approvedVersionId !== currentVersionId) || isDirty
  );

  const getStatusBadge = () => {
    if (isStaleApproval) {
      return (
        <span className="review-status-badge stale">
          <AlertTriangle size={13} />
          <span>Stale Approval (Edited)</span>
        </span>
      );
    }
    switch (reviewStatus) {
      case 'in_review':
        return (
          <span className="review-status-badge in-review">
            <Clock size={13} />
            <span>In Review</span>
          </span>
        );
      case 'changes_requested':
        return (
          <span className="review-status-badge changes-requested">
            <AlertTriangle size={13} />
            <span>Changes Requested</span>
          </span>
        );
      case 'approved':
        return (
          <span className="review-status-badge approved">
            <CheckCircle2 size={13} />
            <span>Approved</span>
          </span>
        );
      default:
        return (
          <span className="review-status-badge none">
            <ShieldCheck size={13} />
            <span>Not Reviewed</span>
          </span>
        );
    }
  };

  const handleActionClick = async (actionType) => {
    const user = auth.currentUser;
    const userInfo = {
      uid: user?.uid || 'admin',
      email: user?.email || 'admin@gyanvaniai.online',
      name: user?.displayName || user?.email || 'Editorial Staff'
    };

    setSubmittingAction(true);
    try {
      if (actionType === 'submit') {
        if (onSubmitForReview) await onSubmitForReview();
      } else if (actionType === 'approve') {
        if (onUpdateReviewStatus) {
          await onUpdateReviewStatus({
            reviewStatus: 'approved',
            reviewedAt: new Date().toISOString(),
            reviewedBy: userInfo,
            approvedVersionId: currentVersionId || 'v1',
            changesRequestedReason: ''
          });
          logActivity(reviewData.blogId || '', 'review_approved', { reviewer: userInfo.name, versionId: currentVersionId });
        }
      } else if (actionType === 'request_changes') {
        setShowReasonModal(true);
      } else if (actionType === 'return_to_draft') {
        if (onUpdateReviewStatus) {
          await onUpdateReviewStatus({
            reviewStatus: 'none',
            changesRequestedReason: ''
          });
          logActivity(reviewData.blogId || '', 'review_reopened', { user: userInfo.name });
        }
      }
    } catch (err) {
      console.error('[EditorialReviewPanel] Action error:', err);
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleConfirmChangesRequested = async (e) => {
    e.preventDefault();
    if (!reasonInput.trim()) return;

    const user = auth.currentUser;
    const userInfo = {
      uid: user?.uid || 'admin',
      email: user?.email || 'admin@gyanvaniai.online',
      name: user?.displayName || user?.email || 'Editorial Staff'
    };

    setSubmittingAction(true);
    try {
      if (onUpdateReviewStatus) {
        await onUpdateReviewStatus({
          reviewStatus: 'changes_requested',
          reviewedAt: new Date().toISOString(),
          reviewedBy: userInfo,
          changesRequestedReason: reasonInput.trim()
        });
        logActivity(reviewData.blogId || '', 'changes_requested', { reviewer: userInfo.name, reason: reasonInput.trim() });
      }
      setShowReasonModal(false);
      setReasonInput('');
    } catch (err) {
      console.error('Failed to request changes:', err);
    } finally {
      setSubmittingAction(false);
    }
  };

  return (
    <div className="editorial-review-panel">
      <div className="review-panel-header">
        <div className="review-header-title">
          <ShieldCheck size={16} className="text-teal-600" />
          <h4>Editorial Review Workflow</h4>
        </div>
        {getStatusBadge()}
      </div>

      {isStaleApproval && (
        <div className="review-banner warning">
          <AlertTriangle size={14} style={{ flexShrink: 0 }} />
          <span>
            <strong>Changes made after approval.</strong> This article was modified after approval version ({approvedVersionId}). Please submit for re-review before publishing.
          </span>
        </div>
      )}

      {reviewStatus === 'changes_requested' && changesRequestedReason && (
        <div className="review-banner danger">
          <XCircle size={14} style={{ flexShrink: 0 }} />
          <div>
            <strong>Changes Requested by Reviewer:</strong>
            <p className="changes-reason-text">"{changesRequestedReason}"</p>
          </div>
        </div>
      )}

      <div className="review-details-grid">
        <div className="review-detail-item">
          <small>Submitted By</small>
          <span>{submittedBy?.name || submittedBy?.email || 'N/A'}</span>
        </div>
        <div className="review-detail-item">
          <small>Submitted On</small>
          <span>{submittedAt ? new Date(submittedAt).toLocaleDateString() : 'Not submitted'}</span>
        </div>
        <div className="review-detail-item">
          <small>Last Reviewer</small>
          <span>{reviewedBy?.name || reviewedBy?.email || 'N/A'}</span>
        </div>
        <div className="review-detail-item">
          <small>Approved Version</small>
          <span>{approvedVersionId || 'None'}</span>
        </div>
      </div>

      <div className="review-actions-toolbar">
        {reviewStatus !== 'in_review' && reviewStatus !== 'approved' && (
          <button
            type="button"
            className="review-btn primary"
            onClick={() => handleActionClick('submit')}
            disabled={submittingAction}
          >
            <Send size={13} />
            <span>Submit for Review</span>
          </button>
        )}

        {reviewStatus === 'in_review' && (
          <>
            <button
              type="button"
              className="review-btn success"
              onClick={() => handleActionClick('approve')}
              disabled={submittingAction}
            >
              <CheckCircle2 size={13} />
              <span>Approve Article</span>
            </button>

            <button
              type="button"
              className="review-btn danger"
              onClick={() => handleActionClick('request_changes')}
              disabled={submittingAction}
            >
              <XCircle size={13} />
              <span>Request Changes</span>
            </button>
          </>
        )}

        {(reviewStatus === 'approved' || reviewStatus === 'changes_requested') && (
          <button
            type="button"
            className="review-btn secondary"
            onClick={() => handleActionClick('return_to_draft')}
            disabled={submittingAction}
          >
            <RotateCcw size={13} />
            <span>Return to Draft</span>
          </button>
        )}
      </div>

      {showReasonModal && (
        <div className="brief-modal-overlay">
          <div className="brief-modal-container" style={{ maxWidth: '500px' }}>
            <div className="brief-modal-header">
              <div className="brief-header-title">
                <XCircle size={20} className="text-red-500" />
                <h3>Request Editorial Changes</h3>
              </div>
              <button type="button" className="brief-modal-close" onClick={() => setShowReasonModal(false)}>×</button>
            </div>
            <form onSubmit={handleConfirmChangesRequested} className="brief-modal-body">
              <div className="brief-form-group">
                <label>Reason for Requesting Changes <span className="req">*</span></label>
                <textarea
                  rows="4"
                  placeholder="Explain what needs revision (e.g. update section 2 statistics, fix tone in conclusion)..."
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  required
                />
              </div>
              <div className="brief-modal-actions">
                <button type="button" className="brief-btn-secondary" onClick={() => setShowReasonModal(false)}>Cancel</button>
                <button type="submit" className="brief-btn-primary" disabled={!reasonInput.trim() || submittingAction}>
                  Confirm & Request Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
