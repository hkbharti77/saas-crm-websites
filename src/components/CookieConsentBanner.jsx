import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './CookieConsentBanner.css';

const COOKIE_CONSENT_KEY = 'gyanvaniai_cookie_consent';

// Fetch IP + geo — cached for the session so we only call the API once
let _geoCache = null;
async function getGeoInfo() {
  if (_geoCache) return _geoCache;
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('geo fetch failed');
    const data = await res.json();
    _geoCache = {
      ip:       data.ip       || null,
      city:     data.city     || null,
      region:   data.region   || null,
      country:  data.country_name || data.country || null,
      countryCode: data.country || null,
      latitude: data.latitude  || null,
      longitude: data.longitude || null,
      org:      data.org      || null,
    };
  } catch {
    _geoCache = { ip: null, city: null, region: null, country: null };
  }
  return _geoCache;
}

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!saved) {
        // Show after a short delay for smooth entrance
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(saved);
        if (parsed.preferences) {
          setPreferences(parsed.preferences);
        }
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = async (status, customPrefs = null) => {
    const finalPrefs = customPrefs || {
      necessary: true,
      functional: status === 'all',
      analytics: status === 'all',
      marketing: status === 'all',
    };

    const consentData = {
      status,
      preferences: finalPrefs,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    } catch (e) {
      console.warn('Could not save cookie consent:', e);
    }

    // Hide banner immediately — geo lookup happens in background
    setVisible(false);
    setShowPreferences(false);

    // Write analytics event to Firestore with IP + location
    try {
      const geo = await getGeoInfo();
      await addDoc(collection(db, 'cookie_consents'), {
        status,
        preferences: finalPrefs,
        userAgent: navigator.userAgent,
        language: navigator.language || null,
        referrer: document.referrer || null,
        pageUrl: window.location.href,
        ip:        geo.ip,
        city:      geo.city,
        region:    geo.region,
        country:   geo.country,
        countryCode: geo.countryCode,
        latitude:  geo.latitude,
        longitude: geo.longitude,
        isp:       geo.org,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('Could not log consent to Firestore:', e);
    }
  };

  const handleAcceptAll = () => saveConsent('all');
  const handleEssentialOnly = () => {
    saveConsent('essential', {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };
  const handleRejectAll = () => {
    saveConsent('rejected', {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent('custom', preferences);
  };

  const togglePref = (key) => {
    if (key === 'necessary') return; // Cannot disable necessary
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-consent-banner" role="dialog" aria-label="Cookie Consent Banner">
        <div className="cookie-consent-container">
          <div className="cookie-content-left">
            <div className="cookie-title-row">
              <span className="cookie-icon" aria-hidden="true">🍪</span>
              <h3 className="cookie-heading">We use cookies to enhance your experience</h3>
            </div>
            <p className="cookie-description">
              We use cookies and similar technologies to help you navigate efficiently, perform certain functions, and
              collect statistics about your use of our services.{' '}
              <Link to="/privacy" className="cookie-privacy-link">
                Learn more in our Privacy Policy
              </Link>
            </p>
          </div>

          <div className="cookie-actions-row">
            <button
              type="button"
              className="cookie-btn cookie-btn-reject"
              onClick={handleRejectAll}
            >
              Reject All
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-outline"
              onClick={handleEssentialOnly}
            >
              Essential Cookies
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-outline cookie-btn-pref"
              onClick={() => setShowPreferences(true)}
            >
              <svg className="cookie-gear-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Manage Preferences
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-primary"
              onClick={handleAcceptAll}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="cookie-modal-overlay" onClick={() => setShowPreferences(false)}>
          <div className="cookie-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="cookie-modal-header">
              <div className="cookie-title-row">
                <span className="cookie-icon">⚙️</span>
                <h3>Cookie Preferences</h3>
              </div>
              <button
                type="button"
                className="cookie-modal-close"
                onClick={() => setShowPreferences(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="cookie-modal-intro">
              Customize which cookies you want to allow. You can change these settings at any time in our Privacy Policy.
            </p>

            <div className="cookie-pref-list">
              <div className="cookie-pref-item">
                <div className="cookie-pref-text">
                  <h4>Strictly Necessary Cookies</h4>
                  <p>Essential for website navigation, security, and authentication. Always active.</p>
                </div>
                <div className="cookie-switch-badge">Always Active</div>
              </div>

              <div className="cookie-pref-item">
                <div className="cookie-pref-text">
                  <h4>Functional Cookies</h4>
                  <p>Enables enhanced functionality, theme preferences, and localized settings.</p>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => togglePref('functional')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="cookie-pref-item">
                <div className="cookie-pref-text">
                  <h4>Analytics & Performance Cookies</h4>
                  <p>Helps us understand how visitors interact with the site to improve user experience.</p>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePref('analytics')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="cookie-pref-item">
                <div className="cookie-pref-text">
                  <h4>Marketing & Personalization</h4>
                  <p>Used to deliver relevant announcements and tailored offerings.</p>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePref('marketing')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button
                type="button"
                className="cookie-btn cookie-btn-outline"
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={handleSavePreferences}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
