import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  generateHreflangTags, 
  getGeoTargeting, 
  getSocialMeta,
  generateBreadcrumbs
} from '../utils/seoHelpers';
import { 
  organizationSchema, 
  websiteSchema, 
  breadcrumbSchema 
} from '../utils/schemas';

/**
 * SEOHead Component
 * Centralized SEO meta tags, structured data, and hreflang implementation
 * 
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} canonical - Canonical URL
 * @param {string} image - OG image URL
 * @param {Object} schema - Additional JSON-LD schema (optional)
 * @param {string} type - og:type (default: website)
 * @param {Array} keywords - Keywords array
 * @param {boolean} noindex - Set to true to prevent indexing
 */
export default function SEOHead({
  title = 'Enterprise AI, CRM & Automation Solutions | Gyan VaniAi',
  description = 'Gyan VaniAi builds AI software, CRM, WhatsApp automation, chatbots and custom business solutions to automate operations, generate leads and scale growth.',
  canonical = 'https://www.gyanvaniai.online/',
  image = 'https://www.gyanvaniai.online/hero_dashboard.webp',
  schema = null,
  type = 'website',
  keywords = [],
  noindex = false,
  publishDate = null,
  modifiedDate = null,
  author = 'Gyan VaniAi'
}) {
  const currentPath = canonical.replace('https://www.gyanvaniai.online', '');
  const hreflangs = generateHreflangTags(currentPath);
  const geoMeta = getGeoTargeting();
  const socialMeta = getSocialMeta(title, description, image, canonical);
  const breadcrumbs = currentPath !== '/' ? generateBreadcrumbs(currentPath) : null;

  // Handle keywords that could be string, array, or other types
  let keywordString = 'AI Agency, Enterprise AI, WhatsApp Automation, CRM Development, AI Chatbots, Sales Automation';
  if (typeof keywords === 'string' && keywords.length > 0) {
    keywordString = keywords;
  } else if (Array.isArray(keywords) && keywords.length > 0) {
    keywordString = keywords.join(', ');
  }

  // Combine organization and website schemas with any additional schema
  const schemas = [organizationSchema, websiteSchema];
  if (breadcrumbs) {
    schemas.push(breadcrumbSchema(breadcrumbs));
  }
  if (schema) {
    schemas.push(schema);
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordString} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noindex 
          ? 'noindex, nofollow' 
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        } 
      />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Geographic Targeting */}
      <meta name="geo.region" content={geoMeta['geo.region']} />
      <meta name="geo.placename" content={geoMeta['geo.placename']} />
      <meta name="geo.position" content={geoMeta['geo.position']} />
      <meta name="ICBM" content={geoMeta.ICBM} />

      {/* Distribution & Coverage */}
      <meta name="distribution" content="Global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="rating" content="General" />

      {/* Article-specific meta */}
      {publishDate && <meta property="article:published_time" content={publishDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      {author && <meta property="article:author" content={author} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={socialMeta['og:site_name']} />
      <meta property="og:title" content={socialMeta['og:title']} />
      <meta property="og:description" content={socialMeta['og:description']} />
      <meta property="og:image" content={socialMeta['og:image']} />
      <meta property="og:image:width" content={socialMeta['og:image:width']} />
      <meta property="og:image:height" content={socialMeta['og:image:height']} />
      <meta property="og:image:alt" content={socialMeta['og:image:alt']} />
      <meta property="og:locale" content={socialMeta['og:locale']} />

      {/* Open Graph Alternate Locales */}
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_AE" />
      <meta property="og:locale:alternate" content="en_CA" />
      <meta property="og:locale:alternate" content="en_IN" />
      <meta property="og:locale:alternate" content="en_SG" />
      <meta property="og:locale:alternate" content="en_AU" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta property="og:locale:alternate" content="ar_SA" />
      <meta property="og:locale:alternate" content="zh_CN" />
      <meta property="og:locale:alternate" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content={socialMeta['twitter:card']} />
      <meta name="twitter:url" content={socialMeta['twitter:url']} />
      <meta name="twitter:title" content={socialMeta['twitter:title']} />
      <meta name="twitter:description" content={socialMeta['twitter:description']} />
      <meta name="twitter:image" content={socialMeta['twitter:image']} />
      {socialMeta['twitter:site'] && <meta name="twitter:site" content={socialMeta['twitter:site']} />}
      {socialMeta['twitter:creator'] && <meta name="twitter:creator" content={socialMeta['twitter:creator']} />}

      {/* Hreflang Tags for International SEO */}
      {hreflangs.map((tag, index) => (
        <link 
          key={index}
          rel={tag.rel}
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}

      {/* x-default for international */}
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemas, null, 0)}
      </script>

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Helmet>
  );
}
