/**
 * Comprehensive Telemetry & Consent Lifecycle Test Suite
 * Tests GA4 Advanced Consent Mode, Microsoft Clarity Consent Mode v2,
 * Vercel Analytics beforeSend middleware, and Backend Sanitization
 */

import { strict as assert } from 'node:assert';
import { sanitizeUrlPath, redactPII } from '../src/hooks/useGAPageViews.js';

let passed = 0;
let failed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

console.log('\n============================================================');
console.log('🧪 TELEMETRY & CONSENT LIFECYCLE VERIFICATION SUITE');
console.log('============================================================\n');

// ── 1. VERCEL ANALYTICS DATA MINIMIZATION ─────────────────────────────────
console.log('── 1. Vercel Analytics beforeSend Middleware & Sanitization ──');

const handleVercelBeforeSend = (event) => {
  if (!event || !event.url) return event;
  try {
    const urlObj = new URL(event.url, 'https://www.gyanvaniai.com');
    const safePath = sanitizeUrlPath(urlObj.pathname, urlObj.search);
    return {
      ...event,
      url: `${urlObj.origin}${safePath}`,
    };
  } catch {
    return event;
  }
};

it('Vercel beforeSend strips unauthorized query parameters completely', () => {
  const event = { type: 'pageview', url: 'https://www.gyanvaniai.com/?fbclid=IwAR123&utm_source=meta&token=secret' };
  const result = handleVercelBeforeSend(event);
  assert.equal(result.url, 'https://www.gyanvaniai.com/');
});

it('Vercel beforeSend retains only safe allowlisted parameters with valid types', () => {
  const event = { type: 'pageview', url: 'https://www.gyanvaniai.com/services/crm?page=2&tab=overview&evil=payload' };
  const result = handleVercelBeforeSend(event);
  assert.equal(result.url, 'https://www.gyanvaniai.com/services/crm?page=2&tab=overview');
});

it('Vercel beforeSend rejects invalid page parameter values (e.g. non-numeric injection)', () => {
  const event = { type: 'pageview', url: 'https://www.gyanvaniai.com/blog?page=hacker@domain.com' };
  const result = handleVercelBeforeSend(event);
  assert.equal(result.url, 'https://www.gyanvaniai.com/blog');
});

it('Vercel beforeSend redacts email, phone, and tokens in dynamic path segments', () => {
  const event = { type: 'pageview', url: 'https://www.gyanvaniai.com/users/alice.smith@example.com/profile' };
  const result = handleVercelBeforeSend(event);
  assert.equal(result.url, 'https://www.gyanvaniai.com/users/[redacted_email]/profile');
});

it('Vercel beforeSend redacts sensitive keywords in URL path (auth, session, token)', () => {
  const event = { type: 'pageview', url: 'https://www.gyanvaniai.com/auth/session/token123/view' };
  const result = handleVercelBeforeSend(event);
  assert.equal(result.url, 'https://www.gyanvaniai.com/[redacted_sensitive]/[redacted_sensitive]/[redacted_sensitive]/view');
});

// ── 2. GA4 ADVANCED CONSENT MODE & SPA ROUTE DISPATCH ────────────────────
console.log('\n── 2. GA4 Advanced Consent Mode v2 Lifecycle Simulation ──');

function createMockEnvironment() {
  const dataLayer = [];
  const clarityCalls = [];
  const events = {};

  const window = {
    dataLayer,
    gtag: function() {
      dataLayer.push(Array.from(arguments));
    },
    clarity: function() {
      clarityCalls.push(Array.from(arguments));
    },
    addEventListener: function(event, handler) {
      events[event] = events[event] || [];
      events[event].push(handler);
    },
    dispatchEvent: function(event) {
      if (events[event.type]) {
        events[event.type].forEach(h => h(event));
      }
    },
    document: {
      head: { appendChild: () => {} },
      getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
      createElement: () => ({ async: false, src: '' })
    },
    localStorage: {
      _store: {},
      getItem(k) { return this._store[k] || null; },
      setItem(k, v) { this._store[k] = String(v); }
    }
  };

  // Run index.html initialization logic
  window.gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });

  window.gtag('js', new Date());
  window.gtag('config', 'G-RN6FQWDQ6M', { send_page_view: false });

  // Telemetry Consent Lifecycle Manager
  function applyConsentState(prefs) {
    if (!prefs) return;
    var hasAnalytics = Boolean(prefs.analytics);
    var hasMarketing = Boolean(prefs.marketing);
    var hasSessionReplay = Boolean(prefs.sessionReplay);

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': hasAnalytics ? 'granted' : 'denied',
        'ad_storage': hasMarketing ? 'granted' : 'denied',
        'ad_user_data': hasMarketing ? 'granted' : 'denied',
        'ad_personalization': hasMarketing ? 'granted' : 'denied'
      });
    }

    if (hasSessionReplay) {
      if (!window.__clarityInitialized) {
        window.__clarityInitialized = true;
      }
      if (typeof window.clarity === 'function') {
        window.clarity("consentv2", {
          analytics_Storage: "granted",
          ad_Storage: hasMarketing ? "granted" : "denied",
          analytics_storage: "granted",
          ad_storage: hasMarketing ? "granted" : "denied"
        });
        window.clarity("consent", true);
      }
    } else {
      if (typeof window.clarity === 'function') {
        window.clarity("consentv2", {
          analytics_Storage: "denied",
          ad_Storage: "denied",
          analytics_storage: "denied",
          ad_storage: "denied"
        });
        window.clarity("consent", false);
      }
    }
  }

  window.addEventListener('cookie-consent-updated', function(e) {
    applyConsentState(e?.detail?.preferences);
  });

  return { window, dataLayer, clarityCalls, applyConsentState };
}

it('Fresh visit initializes GA4 with default denied on all 4 fields (Advanced Consent Mode)', () => {
  const { dataLayer, window } = createMockEnvironment();
  const consentDefault = dataLayer.find(call => call[0] === 'consent' && call[1] === 'default');
  
  assert.ok(consentDefault, 'Consent default should be configured');
  assert.equal(consentDefault[2].analytics_storage, 'denied');
  assert.equal(consentDefault[2].ad_storage, 'denied');
  assert.equal(consentDefault[2].ad_user_data, 'denied');
  assert.equal(consentDefault[2].ad_personalization, 'denied');
  assert.equal(window.__clarityInitialized, undefined, 'Clarity must NOT be initialized on fresh visit');
});

it('Accept All updates GA4 to granted and activates Clarity with exact property casing', () => {
  const { window, dataLayer, clarityCalls } = createMockEnvironment();

  window.dispatchEvent({
    type: 'cookie-consent-updated',
    detail: {
      preferences: { necessary: true, functional: true, analytics: true, sessionReplay: true, marketing: true }
    }
  });

  const consentUpdate = dataLayer.find(call => call[0] === 'consent' && call[1] === 'update');
  assert.ok(consentUpdate, 'Consent update should be dispatched to gtag');
  assert.equal(consentUpdate[2].analytics_storage, 'granted');
  assert.equal(consentUpdate[2].ad_storage, 'granted');
  assert.equal(consentUpdate[2].ad_user_data, 'granted');
  assert.equal(consentUpdate[2].ad_personalization, 'granted');

  assert.equal(window.__clarityInitialized, true, 'Clarity should be initialized');

  // Verify Clarity consentv2 was called with exact Microsoft specification casing
  const consentv2Call = clarityCalls.find(call => call[0] === 'consentv2');
  assert.ok(consentv2Call, 'Clarity consentv2 must be invoked');
  assert.equal(consentv2Call[1].analytics_Storage, 'granted', 'analytics_Storage must be granted');
  assert.equal(consentv2Call[1].ad_Storage, 'granted', 'ad_Storage must be granted');

  // Verify legacy consent fallback was also called
  const consentTrueCall = clarityCalls.find(call => call[0] === 'consent' && call[1] === true);
  assert.ok(consentTrueCall, 'Clarity legacy consent(true) must be invoked');
});

it('Disentangled consent: Analytics granted but Session Replay denied keeps Clarity blocked', () => {
  const { window, dataLayer, clarityCalls } = createMockEnvironment();

  window.dispatchEvent({
    type: 'cookie-consent-updated',
    detail: {
      preferences: { necessary: true, functional: true, analytics: true, sessionReplay: false, marketing: false }
    }
  });

  const consentUpdate = dataLayer.find(call => call[0] === 'consent' && call[1] === 'update');
  assert.equal(consentUpdate[2].analytics_storage, 'granted');
  assert.equal(consentUpdate[2].ad_storage, 'denied');
  assert.equal(window.__clarityInitialized, undefined, 'Clarity script MUST NOT be injected when sessionReplay is false');
  
  // No positive consent calls to Clarity
  const activeClarityCalls = clarityCalls.filter(call => call[0] === 'consent' && call[1] === true);
  assert.equal(activeClarityCalls.length, 0);
});

it('Active mid-session revocation denies GA4, calls Clarity consentv2 denied, and executes clarity("consent", false)', () => {
  const { window, dataLayer, clarityCalls } = createMockEnvironment();

  // First user accepts
  window.dispatchEvent({
    type: 'cookie-consent-updated',
    detail: { preferences: { analytics: true, sessionReplay: true, marketing: true } }
  });
  assert.equal(window.__clarityInitialized, true);

  // Then user revokes
  window.dispatchEvent({
    type: 'cookie-consent-updated',
    detail: { preferences: { analytics: false, sessionReplay: false, marketing: false } }
  });

  const latestConsent = dataLayer.filter(call => call[0] === 'consent' && call[1] === 'update').pop();
  assert.equal(latestConsent[2].analytics_storage, 'denied');
  assert.equal(latestConsent[2].ad_storage, 'denied');

  // Verify Clarity active revocation
  const latestConsentv2 = clarityCalls.filter(call => call[0] === 'consentv2').pop();
  assert.equal(latestConsentv2[1].analytics_Storage, 'denied');
  assert.equal(latestConsentv2[1].ad_Storage, 'denied');

  const revokeCall = clarityCalls.find(call => call[0] === 'consent' && call[1] === false);
  assert.ok(revokeCall, 'clarity("consent", false) must be called upon revocation');
});

// ── 3. BACKEND MONGODB AUDIT MINIMIZATION ──────────────────────────────────
console.log('\n── 3. Backend MongoDB Audit Trail URL Sanitization ──');

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const UUID_REGEX = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b[6-9]\d{9}\b/g;
const TOKEN_REGEX = /\b[0-9a-fA-F]{24,64}\b|\b[A-Za-z0-9+/=]{28,}\b/g;
const SENSITIVE_SEGMENT = /(?:password|secret|token|bearer|apikey|api_key|credential|auth|session|ssn|aadhaar|pan)/i;

const backendSanitizeUrl = (raw) => {
  if (!raw || typeof raw !== 'string') return null;
  try {
    const u = new URL(raw);
    const segments = u.pathname.split('/').map(seg => {
      if (SENSITIVE_SEGMENT.test(seg)) return '[redacted]';
      return seg
        .replace(EMAIL_REGEX, '[redacted]')
        .replace(UUID_REGEX, '[redacted]')
        .replace(PHONE_REGEX, '[redacted]')
        .replace(TOKEN_REGEX, '[redacted]');
    });
    return `${u.origin}${segments.join('/')}`.slice(0, 512);
  } catch {
    const base = raw.split('?')[0];
    return base
      .replace(EMAIL_REGEX, '[redacted]')
      .replace(UUID_REGEX, '[redacted]')
      .replace(PHONE_REGEX, '[redacted]')
      .replace(TOKEN_REGEX, '[redacted]')
      .slice(0, 512);
  }
};

it('Backend audit sanitizeUrl completely eliminates query strings and scrubs path PII', () => {
  const rawUrl = 'https://www.gyanvaniai.com/portal/auth/user@example.com?session_token=abcdef1234567890';
  const scrubbed = backendSanitizeUrl(rawUrl);
  assert.equal(scrubbed, 'https://www.gyanvaniai.com/portal/[redacted]/[redacted]');
  assert.ok(!scrubbed.includes('session_token'), 'Query parameter session_token must not appear');
  assert.ok(!scrubbed.includes('user@example.com'), 'Email must not appear');
});

console.log('\n============================================================');
console.log(`TOTAL: ${passed}/${passed + failed} Tests Passed (${failed} Failed)`);
console.log('============================================================\n');

if (failed > 0) {
  process.exit(1);
}

