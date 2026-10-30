import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVisitorGeo } from '../utils/geoDetection';
import { BACKEND_URL } from '../config/apiConfig';
import './CookieConsentBanner.css';

const COOKIE_CONSENT_KEY = 'gyanvaniai_cookie_consent';

const COOKIE_CATEGORIES = [
  {
    key: 'necessary',
    label: 'Strictly Necessary',
    description: 'Required for core website functions: session management, security, load balancing, and fraud prevention. Cannot be disabled.',
    alwaysOn: true,
    legalBasis: 'Legitimate Interest — GDPR Art.6(1)(f)',
    retention: 'Session / 24h',
    examples: [{ name: 'gyanvani_session', purpose: 'Authentication session token', duration: '24h', provider: '1st Party' }],
  },
  {
    key: 'functional',
    label: 'Functional',
    description: 'Enables enhanced features: theme preferences, language settings, form auto-fill, and media embeds.',
    alwaysOn: false,
    legalBasis: 'Consent — GDPR Art.6(1)(a) / DPDP Act 2023 §6',
    retention: '30 days',
    examples: [{ name: 'gyanvani_prefs', purpose: 'UI preferences & theme', duration: '30d', provider: '1st Party' }],
  },
  {
    key: 'analytics',
    label: 'Analytics & Performance',
    description: 'Helps us understand visitor behaviour: pages visited, time on site, error tracking, and A/B testing.',
    alwaysOn: false,
    legalBasis: 'Consent — GDPR Art.6(1)(a) / CCPA §1798.120',
    retention: '90 days',
    examples: [
      { name: '_ga', purpose: 'Google Analytics visitor ID', duration: '2yr', provider: 'Google' },
      { name: '_gid', purpose: 'GA session ID', duration: '24h', provider: 'Google' },
    ],
  },
  {
    key: 'sessionReplay',
    label: 'Session Replay & Heatmaps',
    description: 'Captures anonymised user interaction telemetry (mouse movements, clicks, scrolling) via Microsoft Clarity to identify interface friction and UX defects.',
    alwaysOn: false,
    legalBasis: 'Consent — GDPR Art.6(1)(a) & ePrivacy Art.5(3) / DPDP Act 2023 §6',
    retention: '30 days',
    examples: [
      { name: '_clck', purpose: 'Microsoft Clarity user identifier', duration: '1yr', provider: 'Microsoft' },
      { name: '_clsk', purpose: 'Microsoft Clarity session state', duration: '24h', provider: 'Microsoft' },
    ],
  },
  {
    key: 'marketing',
    label: 'Marketing & Personalisation',
    description: 'Delivers relevant ads and measures campaign performance. May share data with third-party ad networks.',
    alwaysOn: false,
    legalBasis: 'Consent — GDPR Art.6(1)(a) / DPDP Act 2023 §6',
    retention: '365 days',
    examples: [
      { name: '_fbp', purpose: 'Meta Pixel — ad targeting', duration: '90d', provider: 'Meta' },
      { name: 'fr',   purpose: 'Facebook ad tracking',     duration: '90d', provider: 'Meta' },
    ],
  },
];

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const [preferences, setPreferences] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (saved) { const p = JSON.parse(saved); if (p.preferences) return p.preferences; }
      }
    } catch {}
    return { necessary: true, functional: false, analytics: false, sessionReplay: false, marketing: false };
  });

  useEffect(() => {
    let timer;
    const isTest = typeof window !== 'undefined' && (
      window.location.search.includes('show_cookies=1') ||
      window.location.hash.includes('cookie-consent')
    );
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!saved || isTest) {
        timer = setTimeout(() => setVisible(true), isTest ? 250 : 900);
      } else {
        setShowFloating(true);
      }
    } catch { timer = setTimeout(() => setVisible(true), 900); }
    const handleOpen = () => { setVisible(true); setShowFloating(false); };
    window.addEventListener('open-cookie-banner', handleOpen);
    return () => { clearTimeout(timer); window.removeEventListener('open-cookie-banner', handleOpen); };
  }, []);

  const saveConsent = async (status, customPrefs = null) => {
    const finalPrefs = customPrefs || {
      necessary: true,
      functional: status === 'all',
      analytics: status === 'all',
      sessionReplay: status === 'all',
      marketing: status === 'all',
    };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ status, preferences: finalPrefs, timestamp: new Date().toISOString(), version: '2.0' }));
      window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: { preferences: finalPrefs, status } }));
    } catch {}
    setVisible(false); setShowPreferences(false); setShowFloating(true);

    let geo = { city: null, region: null, country: null, countryCode: null };
    try {
      if (finalPrefs.analytics || status === 'all') {
        const geoData = await getVisitorGeo();
        if (geoData) geo = { city: geoData.city || null, region: geoData.region || null, country: geoData.countryName || geoData.country || null, countryCode: geoData.country || null };
      }
    } catch {}

    const payload = {
      status,
      preferences: finalPrefs,
      channel: 'crm',
      source: 'crm_cookie_banner',
      userAgent: navigator.userAgent,
      language: navigator.language || null,
      referrer: document.referrer || null,
      pageUrl: window.location.href,
      consentVersion: '2.0',
      ...geo,
    };

    if (!BACKEND_URL) return;
    try {
      await fetch(BACKEND_URL + '/api/public/cookie-consent/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // Non-blocking error handling
    }
  };

  const handleAcceptAll = () => saveConsent('all');
  const handleEssentialOnly = () => saveConsent('essential', { necessary: true, functional: false, analytics: false, sessionReplay: false, marketing: false });
  const handleRejectAll = () => saveConsent('rejected', { necessary: true, functional: false, analytics: false, sessionReplay: false, marketing: false });
  const handleSavePrefs = () => saveConsent('custom', preferences);
  const togglePref = (key) => { if (key === 'necessary') return; setPreferences(p => ({ ...p, [key]: !p[key] })); };
  const acceptedCount = Object.values(preferences).filter(Boolean).length;

  return (
    <>
      {visible && (
        <div className="cookie-consent-banner" role="dialog" aria-modal="true" aria-label="Cookie Consent">
          <div className="cookie-consent-container">
            <div className="cookie-content-left">
              <div className="cookie-title-row">
                <span className="cookie-icon" aria-hidden="true">🍪</span>
                <h3 className="cookie-heading">We use cookies to enhance your experience</h3>
                <span className="cookie-compliance-badges">
                  <span className="cookie-law-badge">GDPR</span>
                  <span className="cookie-law-badge">DPDP 2023</span>
                  <span className="cookie-law-badge">CCPA</span>
                </span>
              </div>
              <p className="cookie-description">
                We use cookies and similar technologies for security, analytics, and personalisation.{' '}
                <Link to="/privacy" className="cookie-privacy-link">Privacy Policy</Link>
                {' · '}
                <Link to="/privacy#cookie-consent-data" className="cookie-privacy-link">Cookie Policy</Link>
              </p>
            </div>
            <div className="cookie-actions-row">
              <button type="button" className="cookie-btn cookie-btn-reject" onClick={handleRejectAll}>Reject All</button>
              <button type="button" className="cookie-btn cookie-btn-outline" onClick={handleEssentialOnly}>Essential Only</button>
              <button type="button" className="cookie-btn cookie-btn-outline cookie-btn-pref" onClick={() => setShowPreferences(true)}>
                <svg className="cookie-gear-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                Manage Preferences
              </button>
              <button type="button" className="cookie-btn cookie-btn-primary" onClick={handleAcceptAll}>Accept All</button>
            </div>
          </div>
        </div>
      )}

      {showFloating && !visible && !showPreferences && (
        <button className="cookie-floating-pill" onClick={() => { setVisible(true); setShowFloating(false); }} aria-label="Cookie Preferences" title="Manage cookie preferences">🍪</button>
      )}

      {showPreferences && (
        <div className="cookie-modal-overlay" onClick={() => setShowPreferences(false)}>
          <div className="cookie-modal-card" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="cookie-modal-header">
              <div className="cookie-title-row">
                <span className="cookie-icon">⚙️</span>
                <h3>Cookie Preferences</h3>
              </div>
              <button type="button" className="cookie-modal-close" onClick={() => setShowPreferences(false)} aria-label="Close">✕</button>
            </div>
            <div className="cookie-modal-compliance">
              <span className="cookie-compliance-label">Legal basis:</span>
              <span className="cookie-law-badge">GDPR Art.6 &amp; 7</span>
              <span className="cookie-law-badge">DPDP Act 2023 §6</span>
              <span className="cookie-law-badge">CCPA §1798.120</span>
            </div>
            <p className="cookie-modal-intro">
              Customise which cookies you allow. Withdrawal of consent applies going forward and is logged for legal compliance.
            </p>
            <div className="cookie-pref-list">
              {COOKIE_CATEGORIES.map(cat => (
                <div key={cat.key} className={cookie-pref-item}>
                  <div className="cookie-pref-main">
                    <div className="cookie-pref-text">
                      <button type="button" className="cookie-pref-expand-btn" onClick={() => setExpandedCat(expandedCat === cat.key ? null : cat.key)}>
                        <h4>{cat.label}</h4>
                        <span className="cookie-expand-chevron">{expandedCat === cat.key ? '▲' : '▼'}</span>
                      </button>
                      <p>{cat.description}</p>
                      <span className="cookie-legal-basis">{cat.legalBasis} · Retention: {cat.retention}</span>
                    </div>
                    {cat.alwaysOn ? (
                      <div className="cookie-switch-badge">Always Active</div>
                    ) : (
                      <label className="cookie-switch">
                        <input type="checkbox" checked={preferences[cat.key]} onChange={() => togglePref(cat.key)} />
                        <span className="slider" />
                      </label>
                    )}
                  </div>
                  {expandedCat === cat.key && (
                    <div className="cookie-detail-table">
                      <table><thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th><th>Provider</th></tr></thead>
                        <tbody>{cat.examples.map((ex, i) => (<tr key={i}><td><code>{ex.name}</code></td><td>{ex.purpose}</td><td>{ex.duration}</td><td>{ex.provider}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="cookie-modal-footer">
              <span className="cookie-accepted-count">{acceptedCount} of {COOKIE_CATEGORIES.length} categories enabled</span>
              <div className="cookie-footer-btns">
                <button type="button" className="cookie-btn cookie-btn-outline" onClick={handleRejectAll}>Reject All</button>
                <button type="button" className="cookie-btn cookie-btn-primary" onClick={handleSavePrefs}>Save Preferences</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
