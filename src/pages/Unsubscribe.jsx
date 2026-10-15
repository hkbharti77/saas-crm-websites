import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, MailX, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { API_BASE_URL } from '../config/apiConfig';

const REASONS = [
  { id: 'too_frequent', label: 'Emails are too frequent' },
  { id: 'not_relevant', label: 'Content is no longer relevant to my workflow' },
  { id: 'never_signed_up', label: 'I never signed up for this newsletter' },
  { id: 'different_address', label: 'I am switching to a different email address' },
  { id: 'other', label: 'Other' },
];

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const initialEmail = searchParams.get('email') || '';

  const [emailInput, setEmailInput] = useState(initialEmail);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [selectedReason, setSelectedReason] = useState('too_frequent');
  const [customReason, setCustomReason] = useState('');

  const [loadingVerify, setLoadingVerify] = useState(Boolean(token || initialEmail));
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [alreadyUnsubscribed, setAlreadyUnsubscribed] = useState(false);

  const cmsApiBase = API_BASE_URL;

  // Safe read-only token inspection on mount (will NEVER unsubscribe visitor)
  useEffect(() => {
    if (!token && !initialEmail) return;

    async function verifyToken() {
      setLoadingVerify(true);
      try {
        const query = token
          ? `token=${encodeURIComponent(token)}`
          : `email=${encodeURIComponent(initialEmail)}`;
        const res = await fetch(`${cmsApiBase}/api/public/newsletter/unsubscribe/verify?${query}`);
        const data = await res.json();

        if (res.ok && data.valid) {
          setMaskedEmail(data.maskedEmail);
          if (data.alreadyUnsubscribed) {
            setAlreadyUnsubscribed(true);
          }
        } else {
          setErrorMessage(data.error || 'Invalid or expired unsubscribe link.');
        }
      } catch (err) {
        console.warn('Verification network notice:', err);
      } finally {
        setLoadingVerify(false);
      }
    }

    verifyToken();
  }, [token, initialEmail, cmsApiBase]);

  // Handle explicit POST unsubscription
  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    const targetEmail = initialEmail || emailInput;

    if (!token && !targetEmail) {
      setErrorMessage('Please provide your email address to unsubscribe.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const reasonPayload = selectedReason === 'other' && customReason.trim()
      ? `other: ${customReason.trim().slice(0, 150)}`
      : selectedReason;

    try {
      const res = await fetch(`${cmsApiBase}/api/public/newsletter/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token || undefined,
          email: targetEmail || undefined,
          reason: reasonPayload,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.error || 'Failed to complete unsubscribe request.');
      }
    } catch (err) {
      console.error('Unsubscribe action error:', err);
      setErrorMessage('Network connection error. Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
  };

  // One-click resubscribe in case clicked by mistake
  const handleResubscribe = async () => {
    const targetEmail = initialEmail || emailInput;
    if (!targetEmail) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${cmsApiBase}/api/public/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          source: 'unsubscribe_page_undo',
        }),
      });

      if (res.ok) {
        setIsSuccess(false);
        setAlreadyUnsubscribed(false);
        setMaskedEmail(targetEmail);
      }
    } catch {
      // Non-fatal
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="unsubscribe-page" style={{ minHeight: '80vh', padding: '6rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SeoHead
        title="Unsubscribe from Newsletter | GyanVaniAi"
        description="Manage your GyanVaniAi email subscription preferences."
        canonical="https://www.gyanvaniai.com/unsubscribe"
      />

      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          background: 'var(--bg-card, rgba(15, 23, 42, 0.85))',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)',
              color: isSuccess ? '#10b981' : '#ef4444',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            {isSuccess ? <CheckCircle2 size={30} /> : <MailX size={30} />}
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
            {isSuccess ? 'Unsubscribed Successfully' : 'Newsletter Preferences'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            {isSuccess
              ? 'Your email preferences have been updated. You will no longer receive blog updates or marketing newsletters.'
              : 'We respect your inbox and privacy. You can opt out at any time with complete legal compliance (CAN-SPAM, GDPR, DPDP Act 2023).'}
          </p>
        </div>

        {/* Loading Verification */}
        {loadingVerify ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
            Verifying subscription token...
          </div>
        ) : isSuccess ? (
          /* Success Screen */
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#10b981',
                borderRadius: '8px',
                padding: '0.85rem',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
              }}
            >
              ✓ Opt-out confirmed for <strong>{maskedEmail || emailInput || 'your email'}</strong>.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(initialEmail || emailInput) && (
                <button
                  type="button"
                  onClick={handleResubscribe}
                  disabled={submitting}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  Unsubscribed by mistake? <strong>Click here to resubscribe</strong>
                </button>
              )}
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                }}
              >
                <ArrowLeft size={16} /> Return to GyanVaniAi Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Unsubscribe Form */
          <form onSubmit={handleUnsubscribe}>
            {errorMessage && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#ef4444',
                  borderRadius: '8px',
                  padding: '0.75rem 0.9rem',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {alreadyUnsubscribed && (
              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: '#38bdf8',
                  borderRadius: '8px',
                  padding: '0.75rem 0.9rem',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                }}
              >
                ℹ️ You are already marked as unsubscribed in our system. Submitting below will re-confirm your opt-out.
              </div>
            )}

            {/* Email Field if not tokenized */}
            {!maskedEmail && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Your Work Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@company.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.925rem',
                  }}
                />
              </div>
            )}

            {maskedEmail && (
              <div style={{ marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Target account: <strong style={{ color: 'var(--text-primary)' }}>{maskedEmail}</strong>
              </div>
            )}

            {/* Quick Reason Survey */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Reason for unsubscribing (Optional):
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {REASONS.map((r) => (
                  <label
                    key={r.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '0.35rem 0',
                    }}
                  >
                    <input
                      type="radio"
                      name="unsubscribe_reason"
                      value={r.id}
                      checked={selectedReason === r.id}
                      onChange={() => setSelectedReason(r.id)}
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>

              {selectedReason === 'other' && (
                <input
                  type="text"
                  placeholder="Please specify (optional)"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  maxLength={150}
                  style={{
                    width: '100%',
                    marginTop: '0.5rem',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                  }}
                />
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '8px',
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              {submitting ? 'Processing Opt-out...' : 'Confirm Unsubscribe'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
              CAN-SPAM, GDPR Art. 17 &amp; DPDP Act 2023 compliant 1-click opt-out
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
