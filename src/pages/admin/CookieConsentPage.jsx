import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { auth } from '../../firebase';
import { ShieldCheck, ExternalLink, RotateCcw, CheckCircle2 } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import CookieConsentAnalytics from './CookieConsentAnalytics';
import '../../components/admin/AdminCMS.css';

export default function CookieConsentPage() {
  const navigate = useNavigate();
  const [resetMessage, setResetMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleResetLocalCookie = () => {
    try {
      localStorage.removeItem('gyanvaniai_cookie_consent');
      setResetMessage('Local cookie decision reset! Opening live homepage to test banner...');
      setTimeout(() => {
        window.open('/?show_cookies=1', '_blank');
        setResetMessage(null);
      }, 900);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="admin-cms-page">
      <Helmet>
        <title>Cookie Consent Analytics & Audit Logs | GyanVaniAi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminHeader />

      {resetMessage && (
        <div className="admin-cms-toast success" style={{ zIndex: 1100 }}>
          <CheckCircle2 size={16} />
          <span>{resetMessage}</span>
        </div>
      )}

      <main className="admin-cms-dashboard-container">
        {/* Dashboard Hero */}
        <div className="admin-dashboard-hero">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <ShieldCheck size={24} style={{ color: 'var(--primary-color)' }} />
              <h1 className="admin-dashboard-title" style={{ margin: 0 }}>Cookie Consent & DPDP Audit</h1>
            </div>
            <p className="admin-dashboard-subtitle">
              Real-time audit log of visitor consent choices (Accept All, Reject All, Essential Only, Custom Preferences) for legal compliance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleResetLocalCookie}
              className="admin-cms-btn-secondary"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              title="Reset local storage and open banner for testing"
            >
              <RotateCcw size={15} />
              <span>Test / Trigger Banner</span>
            </button>
            <a
              href="/?show_cookies=1"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-cms-btn-primary"
            >
              <span>Live Website Preview</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Analytics & Audit Trail Component */}
        <CookieConsentAnalytics />
      </main>
    </div>
  );
}
