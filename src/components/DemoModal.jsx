import React, { useState, useEffect } from 'react';
import { X, ExternalLink, AlertTriangle, ShieldAlert, Clock, Database, Check } from 'lucide-react';
import './DemoModal.css';

export default function DemoModal({ isOpen, onClose }) {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLaunch = () => {
    if (!agreed) return;
    window.open('https://connect.gyanvaniai.online/', '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="demo-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="demo-modal-heading">
      <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose} aria-label="Close demo modal">
          <X size={20} />
        </button>

        <div className="demo-modal-header">
          <div className="demo-modal-icon-badge">
            <ExternalLink size={22} className="demo-icon" />
          </div>
          <div>
            <h3 className="demo-modal-title" id="demo-modal-heading">Try Gyan VaniAi Live Demo</h3>
            <span className="demo-url-badge">connect.gyanvaniai.online</span>
          </div>
        </div>

        <p className="demo-modal-subtitle">
          Experience our AI CRM, WhatsApp Automation, and Intelligent Workflow agents live in action.
        </p>

        <div className="demo-modal-body">
          <div className="demo-disclaimer-box">
            <div className="disclaimer-header">
              <AlertTriangle size={17} className="warning-icon" />
              <span>Demo Terms &amp; 7-Day Data Retention Policy</span>
            </div>

            <div className="disclaimer-items">
              <div className="disclaimer-item">
                <Clock size={16} className="item-icon" />
                <div>
                  <strong>7-Day Evaluation Period:</strong> Your demo account is provided for evaluation and testing purposes. The 7-day evaluation period begins when your demo account is created.
                </div>
              </div>

              <div className="disclaimer-item">
                <Database size={16} className="item-icon" />
                <div>
                  <strong>Automatic Data Deletion:</strong> If you do not upgrade to a paid plan before the evaluation period ends, demo data associated with your account may be permanently deleted from active systems, including your profile, test records, configurations, and other demo-generated data.
                </div>
              </div>

              <div className="disclaimer-item">
                <ShieldAlert size={16} className="item-icon" />
                <div>
                  <strong>Data Retention &amp; Backups:</strong> Data deleted under this policy may remain temporarily in system backups or security logs until their applicable retention periods expire. Certain information may be retained where required by applicable law, security requirements, dispute resolution, or other legitimate purposes.
                </div>
              </div>

              <div className="disclaimer-item">
                <AlertTriangle size={16} className="item-icon" />
                <div>
                  <strong>Data Retention &amp; Responsibility:</strong> Please export or otherwise preserve any information you wish to keep before the 7-day evaluation period ends. Except where required by applicable law, Gyan VaniAi is not responsible for data permanently deleted in accordance with this policy.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-modal-footer">
          <label className="demo-consent-checkbox" htmlFor="chk-demo-consent">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              id="chk-demo-consent"
            />
            <span className="checkbox-custom" tabIndex={0} onKeyDown={(e) => e.key === ' ' && setAgreed(!agreed)}>
              {agreed && <Check size={14} color="#ffffff" />}
            </span>
            <span className="consent-text">
              I understand and agree that my demo data may be deleted after the 7-day evaluation period unless I upgrade to a paid plan, subject to the Demo Data Retention Policy and applicable law.
            </span>
          </label>

          <div className="demo-modal-actions">
            <button
              className={`btn btn-primary demo-launch-btn ${!agreed ? 'disabled' : ''}`}
              onClick={handleLaunch}
              disabled={!agreed}
              id="btn-launch-live-demo"
            >
              <span>Launch Live Demo</span>
              <ExternalLink size={16} />
            </button>

            <a
              href="/terms#demo-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="demo-terms-link"
            >
              Read Full Legal Policy &amp; Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
