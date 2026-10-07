/**
 * Geo-Detection Utility
 * 
 * Provides client-side UX personalization (e.g. localized CTA labels, regional currency helpers)
 * without affecting SEO-critical content, crawlability, or server-rendered HTML.
 * 
 * ARCHITECTURE PRINCIPLES:
 * 1. Crawlers receive 100% stable, deterministic HTML with canonical copy and structured data.
 * 2. Geo-detection runs purely in the client browser inside non-blocking asynchronous effects.
 * 3. Never mutates SEO headings (H1/H2), canonical URLs, or JSON-LD structured data.
 * 4. Resilient multi-provider failover (ipapi.co -> freeipapi.com -> safe neutral fallback).
 * 5. Strict timeout handling (2.5s) to avoid delaying browser interactive cycles.
 * 6. Privacy by design: coarse location only (country, currency, timezone). Zero GPS coordinates stored.
 */

import React from 'react';

const GEO_CACHE_KEY = 'gyanvaniai_visitor_geo';
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Safe default targeting for SSR, search crawlers, and fallback states
export const DEFAULT_GEO = {
  country: 'US',
  countryName: 'United States',
  region: 'Global',
  city: 'Global',
  timezone: 'UTC',
  currency: 'USD',
  timestamp: 0,
};

export const DEFAULT_TARGETING = {
  country: 'Global',
  cta: 'Book a Demo',
  ctaUrl: '/pricing',
  language: 'en',
  currency: 'USD',
  email: 'contact@gyanvaniai.com',
  phone: '+91 87006 20913',
};

/**
 * Defensive cache helper: tries localStorage, falls back to sessionStorage or memory
 */
const getCachedGeo = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage?.getItem(GEO_CACHE_KEY) || window.sessionStorage?.getItem(GEO_CACHE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Date.now() - (data.timestamp || 0) < GEO_CACHE_TTL) {
        return data;
      }
    }
  } catch {
    // Storage restricted or disabled (e.g. strict private browsing mode)
  }
  return null;
};

const setCachedGeo = (data) => {
  if (typeof window === 'undefined' || !data) return;
  try {
    const serialized = JSON.stringify(data);
    window.localStorage?.setItem(GEO_CACHE_KEY, serialized);
  } catch {
    try {
      window.sessionStorage?.setItem(GEO_CACHE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable
    }
  }
};

/**
 * Fetches visitor geolocation with resilient provider failover and strict timeouts.
 * Guarantees coarse data only (no exact GPS coordinates stored).
 * 
 * @returns {Promise<typeof DEFAULT_GEO>}
 */
export const getVisitorGeo = async () => {
  // 1. SSR Guard: return default immediately in server context
  if (typeof window === 'undefined') {
    return DEFAULT_GEO;
  }

  // 2. Check cached result (24h TTL)
  const cached = getCachedGeo();
  if (cached) {
    return cached;
  }

  let geoData = null;

  // 3. Primary Provider: ipapi.co (with 2.5s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch('https://ipapi.co/json/', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.country_code && !data.error) {
        geoData = {
          country: String(data.country_code).toUpperCase(),
          countryName: data.country_name || 'Global',
          region: data.region || 'Unknown',
          city: data.city || 'Unknown',
          timezone: data.timezone || 'UTC',
          currency: data.currency || 'USD',
          timestamp: Date.now(),
        };
      }
    }
  } catch {
    // Primary provider failed, timed out, or blocked by adblock/privacy extension
  }

  // 4. Secondary Provider (Failover): freeipapi.com (with 2.5s timeout)
  if (!geoData) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch('https://freeipapi.com/api/json', {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.countryCode) {
          geoData = {
            country: String(data.countryCode).toUpperCase(),
            countryName: data.countryName || 'Global',
            region: data.regionName || 'Unknown',
            city: data.cityName || 'Unknown',
            timezone: data.timeZone || 'UTC',
            currency: data.currency || 'USD',
            timestamp: Date.now(),
          };
        }
      }
    } catch {
      // Secondary failover also failed or unavailable
    }
  }

  // 5. Final Fallback: deterministic neutral global default
  if (!geoData) {
    geoData = {
      ...DEFAULT_GEO,
      timestamp: Date.now(),
    };
  }

  // 6. Cache valid result
  setCachedGeo(geoData);

  return geoData;
};

/**
 * Gets region-specific UX targeting configuration based on country code.
 * 
 * NOTE: This is exclusively used for interactive UI micro-copy (e.g. CTA text)
 * and never rewrites canonical URLs, indexable body text, or Schema.org pricing.
 * 
 * @param {string} countryCode - 2-letter ISO country code
 * @returns {Object} Region-specific UI config
 */
export const getRegionTargeting = (countryCode) => {
  const code = (countryCode || 'US').toUpperCase();

  const regionMap = {
    // North America
    US: {
      country: 'United States',
      cta: 'Start Free Trial',
      ctaUrl: '/pricing',
      language: 'en-US',
      currency: 'USD',
      pricing: [19, 49, 99],
      timezone: 'America/New_York',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
    CA: {
      country: 'Canada',
      cta: 'Get Started Today',
      ctaUrl: '/pricing',
      language: 'en-CA',
      currency: 'CAD',
      pricing: [25, 65, 135],
      timezone: 'America/Toronto',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },

    // Europe
    GB: {
      country: 'United Kingdom',
      cta: 'Book a Demo',
      ctaUrl: '/pricing',
      language: 'en-GB',
      currency: 'GBP',
      pricing: [15, 39, 79],
      timezone: 'Europe/London',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
    DE: {
      country: 'Germany',
      cta: 'Book a Demo',
      ctaUrl: '/pricing',
      language: 'de-DE',
      currency: 'EUR',
      pricing: [18, 45, 90],
      timezone: 'Europe/Berlin',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
    FR: {
      country: 'France',
      cta: 'Book a Demo',
      ctaUrl: '/pricing',
      language: 'fr-FR',
      currency: 'EUR',
      pricing: [18, 45, 90],
      timezone: 'Europe/Paris',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
    NL: {
      country: 'Netherlands',
      cta: 'Book a Demo',
      ctaUrl: '/pricing',
      language: 'en-NL',
      currency: 'EUR',
      pricing: [18, 45, 90],
      timezone: 'Europe/Amsterdam',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },

    // Middle East
    AE: {
      country: 'United Arab Emirates',
      cta: 'Book a Demo',
      ctaUrl: '/pricing',
      language: 'en-AE',
      currency: 'AED',
      pricing: [70, 180, 365],
      timezone: 'Asia/Dubai',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
    SA: {
      country: 'Saudi Arabia',
      cta: 'Book a Demo',
      ctaUrl: '/pricing',
      language: 'ar-SA',
      currency: 'SAR',
      pricing: [72, 185, 375],
      timezone: 'Asia/Riyadh',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },

    // Asia-Pacific
    IN: {
      country: 'India',
      cta: 'Book a Free Demo',
      ctaUrl: '/pricing',
      language: 'en-IN',
      currency: 'INR',
      pricing: [1999, 4999, 9999],
      timezone: 'Asia/Kolkata',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
    SG: {
      country: 'Singapore',
      cta: 'Book a Demo',
      ctaUrl: '/pricing',
      language: 'en-SG',
      currency: 'SGD',
      pricing: [26, 68, 135],
      timezone: 'Asia/Singapore',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
    AU: {
      country: 'Australia',
      cta: 'Start Free Trial',
      ctaUrl: '/pricing',
      language: 'en-AU',
      currency: 'AUD',
      pricing: [29, 75, 150],
      timezone: 'Australia/Sydney',
      email: 'contact@gyanvaniai.com',
      phone: '+91 87006 20913',
    },
  };

  return regionMap[code] || regionMap['US'];
};

/**
 * Non-blocking React Hook for client-side UX personalization.
 * Initializes with neutral default targeting to match SSR HTML immediately,
 * then seamlessly updates if client geolocation resolves.
 * 
 * @returns {{ geo: Object, targeting: Object, loading: boolean }}
 */
export const useGeoTargeting = () => {
  const [geo, setGeo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    const resolveGeo = async () => {
      try {
        const geoData = await getVisitorGeo();
        if (isMounted) {
          setGeo(geoData);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setGeo(DEFAULT_GEO);
          setLoading(false);
        }
      }
    };

    // Use requestIdleCallback if supported to avoid contending with first paint
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(() => resolveGeo(), { timeout: 1500 });
      return () => {
        isMounted = false;
        window.cancelIdleCallback?.(handle);
      };
    } else {
      resolveGeo();
      return () => {
        isMounted = false;
      };
    }
  }, []);

  const targeting = geo ? getRegionTargeting(geo.country) : DEFAULT_TARGETING;

  return { geo, targeting, loading };
};

/**
 * Gets pricing in visitor's local currency for interactive preview
 * @param {string} countryCode
 * @returns {Array<number>}
 */
export const getPricingByCountry = (countryCode) => {
  const targeting = getRegionTargeting(countryCode);
  return targeting.pricing || [19, 49, 99];
};

/**
 * Gets currency code for country
 * @param {string} countryCode
 * @returns {string}
 */
export const getCurrencyByCountry = (countryCode) => {
  const targeting = getRegionTargeting(countryCode);
  return targeting.currency || 'USD';
};

export default {
  DEFAULT_GEO,
  DEFAULT_TARGETING,
  getVisitorGeo,
  getRegionTargeting,
  getPricingByCountry,
  getCurrencyByCountry,
  useGeoTargeting,
};
