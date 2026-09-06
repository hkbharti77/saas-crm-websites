/**
 * Geo-Detection Utility
 * Detects visitor location and provides region-specific messaging
 * Used for dynamic CTA customization and personalization
 */

import React from 'react';

// Cache geo data in session storage to avoid repeated API calls
const GEO_CACHE_KEY = 'visitor_geo_data';
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Fetches visitor geolocation based on IP address
 * @returns {Promise<{country: string, region: string, city: string, timezone: string, coordinates: {lat: number, lng: number}}>}
 */
export const getVisitorGeo = async () => {
  try {
    // Check cache first
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < GEO_CACHE_TTL) {
        return data;
      }
    }

    // Try multiple geo APIs for redundancy
    let geoData = null;

    try {
      // Primary: IP Geolocation API (free tier)
      const response = await fetch('https://ipapi.co/json/', {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        geoData = {
          country: data.country_code,
          region: data.region,
          city: data.city,
          timezone: data.timezone,
          coordinates: {
            lat: data.latitude,
            lng: data.longitude
          },
          currency: data.currency,
          timestamp: Date.now()
        };
      }
    } catch {
      // Fallback: Cloudflare geolocation headers
      try {
        const response = await fetch('https://api.cloudflare.com/client/v4/geo', {
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          const data = await response.json();
          geoData = {
            country: data.country,
            region: data.region || 'Unknown',
            city: data.city || 'Unknown',
            timezone: data.timezone,
            coordinates: { lat: data.latitude, lng: data.longitude },
            timestamp: Date.now()
          };
        }
      } catch {
        // Fallback to empty data
        geoData = {
          country: 'US',
          region: 'Unknown',
          city: 'Unknown',
          timezone: 'UTC',
          coordinates: { lat: 0, lng: 0 },
          timestamp: Date.now()
        };
      }
    }

    // Cache the result
    if (geoData) {
      sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geoData));
    }

    return geoData;
  } catch (error) {
    console.warn('Geo-detection failed:', error);
    // Return default (US/UTC)
    return {
      country: 'US',
      region: 'Unknown',
      city: 'Unknown',
      timezone: 'UTC',
      coordinates: { lat: 0, lng: 0 },
      timestamp: Date.now()
    };
  }
};

/**
 * Gets region-specific targeting based on country code
 * @param {string} countryCode - 2-letter country code
 * @returns {Object} Region-specific configuration
 */
export const getRegionTargeting = (countryCode) => {
  const regionMap = {
    // North America
    'US': {
      country: 'United States',
      cta: 'Start Free Trial',
      ctaUrl: '/signup?region=us',
      language: 'en-US',
      currency: 'USD',
      pricing: [99, 299, 999],
      timezone: 'America/New_York',
      email: 'sales-us@gyanvaniai.online',
      phone: '+1-844-XXX-XXXX',
      supportHours: '9 AM - 6 PM EST'
    },
    'CA': {
      country: 'Canada',
      cta: 'Get Started Today',
      ctaUrl: '/signup?region=ca',
      language: 'en-CA',
      currency: 'CAD',
      pricing: [129, 389, 1299],
      timezone: 'America/Toronto',
      email: 'sales-ca@gyanvaniai.online',
      phone: '+1-647-XXX-XXXX',
      supportHours: '9 AM - 6 PM EST'
    },

    // Europe
    'GB': {
      country: 'United Kingdom',
      cta: 'Book a Demo',
      ctaUrl: '/signup?region=gb',
      language: 'en-GB',
      currency: 'GBP',
      pricing: [79, 239, 799],
      timezone: 'Europe/London',
      email: 'sales-gb@gyanvaniai.online',
      phone: '+44-20-XXXX-XXXX',
      supportHours: '9 AM - 6 PM GMT'
    },
    'DE': {
      country: 'Germany',
      cta: 'Demo vereinbaren',
      ctaUrl: '/signup?region=de',
      language: 'de-DE',
      currency: 'EUR',
      pricing: [89, 269, 899],
      timezone: 'Europe/Berlin',
      email: 'sales-de@gyanvaniai.online',
      phone: '+49-30-XXX-XXXX',
      supportHours: '9 AM - 6 PM CET'
    },
    'FR': {
      country: 'France',
      cta: 'Réserver une démo',
      ctaUrl: '/signup?region=fr',
      language: 'fr-FR',
      currency: 'EUR',
      pricing: [89, 269, 899],
      timezone: 'Europe/Paris',
      email: 'sales-fr@gyanvaniai.online',
      phone: '+33-1-XXXX-XXXX',
      supportHours: '9 AM - 6 PM CET'
    },

    // Middle East
    'AE': {
      country: 'United Arab Emirates',
      cta: 'اطلب عرض توضيحي',
      ctaUrl: '/signup?region=ae',
      language: 'en-AE',
      currency: 'AED',
      pricing: [365, 1095, 3650],
      timezone: 'Asia/Dubai',
      email: 'sales-ae@gyanvaniai.online',
      phone: '+971-4-XXXX-XXXX',
      supportHours: '8 AM - 5 PM GST'
    },
    'SA': {
      country: 'Saudi Arabia',
      cta: 'طلب عرض توضيحي',
      ctaUrl: '/signup?region=sa',
      language: 'ar-SA',
      currency: 'SAR',
      pricing: [375, 1125, 3750],
      timezone: 'Asia/Riyadh',
      email: 'sales-sa@gyanvaniai.online',
      phone: '+966-11-XXX-XXXX',
      supportHours: '8 AM - 5 PM AST'
    },

    // Asia
    'IN': {
      country: 'India',
      cta: 'मुफ्त परामर्श प्राप्त करें',
      ctaUrl: '/signup?region=in',
      language: 'en-IN',
      currency: 'INR',
      pricing: [8000, 24000, 80000],
      timezone: 'Asia/Kolkata',
      email: 'sales-in@gyanvaniai.online',
      phone: '+91-11-XXXX-XXXX',
      supportHours: '10 AM - 7 PM IST',
      discount: '20%'
    },
    'CN': {
      country: 'China',
      cta: '预约演示',
      ctaUrl: '/signup?region=cn',
      language: 'zh-CN',
      currency: 'CNY',
      pricing: [690, 2070, 6900],
      timezone: 'Asia/Shanghai',
      email: 'sales-cn@gyanvaniai.online',
      phone: '+86-10-XXXX-XXXX',
      supportHours: '9 AM - 6 PM CST'
    },
    'JP': {
      country: 'Japan',
      cta: 'デモを予約',
      ctaUrl: '/signup?region=jp',
      language: 'ja-JP',
      currency: 'JPY',
      pricing: [11000, 33000, 110000],
      timezone: 'Asia/Tokyo',
      email: 'sales-jp@gyanvaniai.online',
      phone: '+81-3-XXXX-XXXX',
      supportHours: '9 AM - 6 PM JST'
    },
    'SG': {
      country: 'Singapore',
      cta: 'Book a Demo',
      ctaUrl: '/signup?region=sg',
      language: 'en-SG',
      currency: 'SGD',
      pricing: [135, 405, 1350],
      timezone: 'Asia/Singapore',
      email: 'sales-sg@gyanvaniai.online',
      phone: '+65-XXXX-XXXX',
      supportHours: '9 AM - 6 PM SGT'
    },

    // Oceania
    'AU': {
      country: 'Australia',
      cta: 'Start Free Trial',
      ctaUrl: '/signup?region=au',
      language: 'en-AU',
      currency: 'AUD',
      pricing: [155, 465, 1550],
      timezone: 'Australia/Sydney',
      email: 'sales-au@gyanvaniai.online',
      phone: '+61-2-XXXX-XXXX',
      supportHours: '9 AM - 6 PM AEDT'
    },

    // South America
    'BR': {
      country: 'Brazil',
      cta: 'Agende uma Demo',
      ctaUrl: '/signup?region=br',
      language: 'pt-BR',
      currency: 'BRL',
      pricing: [520, 1560, 5200],
      timezone: 'America/Sao_Paulo',
      email: 'sales-br@gyanvaniai.online',
      phone: '+55-11-XXXX-XXXX',
      supportHours: '9 AM - 6 PM BRT'
    }
  };

  // Return region-specific config or default to US
  return regionMap[countryCode?.toUpperCase()] || regionMap['US'];
};

/**
 * Hook to use geo-detection in components
 * @returns {{geo: Object, targeting: Object, loading: boolean}}
 */
export const useGeoTargeting = () => {
  const [geo, setGeo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchGeo = async () => {
      const geoData = await getVisitorGeo();
      setGeo(geoData);
      setLoading(false);
    };
    fetchGeo();
  }, []);

  const targeting = geo ? getRegionTargeting(geo.country) : getRegionTargeting('US');

  return { geo, targeting, loading };
};

/**
 * Gets pricing in visitor's local currency
 * @param {string} countryCode
 * @returns {Array<number>} Pricing in local currency
 */
export const getPricingByCountry = (countryCode) => {
  const targeting = getRegionTargeting(countryCode);
  return targeting.pricing || [99, 299, 999];
};

/**
 * Gets currency code for country
 * @param {string} countryCode
 * @returns {string} 3-letter currency code
 */
export const getCurrencyByCountry = (countryCode) => {
  const targeting = getRegionTargeting(countryCode);
  return targeting.currency || 'USD';
};

export default {
  getVisitorGeo,
  getRegionTargeting,
  getPricingByCountry,
  getCurrencyByCountry,
  useGeoTargeting
};
