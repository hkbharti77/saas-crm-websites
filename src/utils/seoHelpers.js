/**
 * SEO Helper Functions
 * International targeting, hreflang tags, and meta optimization
 */

export const generateHreflangTags = () => {
  // Return empty array as website is single-locale English; hreflang is only added when distinct localized URLs exist.
  return [];
};

/**
 * Geographic meta tags (geo.region, geo.placename, geo.position, ICBM) are obsolete
 * 2000s Dublin Core / GeoURL tags. Google and Bing explicitly ignore them for web
 * ranking and geotargeting. Omitting them avoids fake local-storefront signals for a
 * global B2B SaaS platform. Legitimate international targeting is established via
 * Schema.org Organization areaServed and HTML language declarations.
 */
export const getGeoTargeting = () => {
  return {
    'geo.region': '',
    'geo.placename': '',
    'geo.position': '',
    'ICBM': ''
  };
};

export const getLanguageAlternates = () => {
  return [
    'en_US',
    'en_GB',
    'en_IN',
    'en_AE',
    'en_SG',
    'en_AU',
    'en_CA',
    'zh_CN',
    'ar_SA',
    'de_DE',
    'fr_FR',
    'es_ES',
    'pt_BR',
    'ru_RU',
    'ja_JP',
    'ko_KR'
  ];
};

export const getTargetMarkets = () => {
  return 'USA, Canada, United Kingdom, Germany, France, Italy, Spain, Netherlands, Switzerland, Sweden, Poland, UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Egypt, South Africa, Nigeria, Kenya, Morocco, Ghana, India, China, Japan, South Korea, Singapore, Malaysia, Indonesia, Vietnam, Philippines, Australia, Brazil, Mexico, Russia, Worldwide';
};

// Rich snippets meta tags
export const getBusinessHours = () => ({
  monday: '09:00-18:00',
  tuesday: '09:00-18:00',
  wednesday: '09:00-18:00',
  thursday: '09:00-18:00',
  friday: '09:00-18:00',
  saturday: 'Closed',
  sunday: 'Closed'
});

// Optimize meta description for CTR
export const generateMetaDescription = (serviceName, benefits = []) => {
  const benefitText = benefits.length > 0 
    ? benefits.slice(0, 2).join(', ')
    : 'automation, lead management, and growth';
    
  return `${serviceName} by Gyan VaniAi: ${benefitText}. Free consultation, 30-day delivery, 90-day warranty. Book a demo now!`;
};

// Generate optimized titles
export const generateTitle = (pageName, modifier = '') => {
  const suffix = 'Gyan VaniAi';
  const maxLength = 60;
  
  let title = modifier 
    ? `${pageName} ${modifier} | ${suffix}`
    : `${pageName} | ${suffix}`;
    
  if (title.length > maxLength) {
    title = `${pageName} | ${suffix}`;
  }
  
  return title;
};

// Keywords for different pages
export const getKeywords = (category) => {
  const keywordMap = {
    whatsapp: 'WhatsApp Business API, WhatsApp Coexistence, WhatsApp Automation, WhatsApp CRM, Meta Tech Provider, WhatsApp Marketing, Bulk WhatsApp Messages',
    crm: 'AI CRM, Customer Relationship Management, Lead Management, Sales Automation, CRM Software, Custom CRM Development, Cloud CRM',
    ai: 'AI Development, Artificial Intelligence, Machine Learning, AI Chatbots, AI Agents, RAG Pipelines, OpenAI, LangChain',
    voice: 'Voice AI, Calling Bots, IVR System, Phone AI Agent, Voice Assistant, Speech Recognition, Natural Language Processing',
    automation: 'Sales Automation, Marketing Automation, Business Process Automation, Workflow Automation, Lead Nurturing',
    enterprise: 'Enterprise Software, HRMS, ERP, Custom Software Development, SaaS Development, B2B Software',
    default: 'Gyan Vani, Gyanvani, Gyan Vani AI, Gyanvani AI, GyanVani, AI Agency, Software Development, Business Automation, Digital Transformation, Custom Software'
  };
  
  return keywordMap[category] || keywordMap.default;
};

// Social sharing optimization
export const getSocialMeta = (title, description, image, url) => {
  return {
    // Open Graph
    'og:type': 'website',
    'og:site_name': 'Gyan VaniAi',
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': title,
    'og:url': url,
    'og:locale': 'en_US',
    
    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:url': url
  };
};

// JSON-LD helper for rendering
export const renderJsonLd = (schema) => {
  return {
    __html: JSON.stringify(schema, null, 0)
  };
};

// Breadcrumb generation
export const generateBreadcrumbs = (path) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.gyanvaniai.com/' }
  ];
  
  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    let segmentUrl = `https://www.gyanvaniai.com${currentPath}`;
    if (segment === 'services' || segment === 'industries') {
      segmentUrl = 'https://www.gyanvaniai.com/';
    }
    
    breadcrumbs.push({
      name,
      url: segmentUrl
    });
  });
  
  return breadcrumbs;
};

// Core Web Vitals optimization hints
export const getResourceHints = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
    { rel: 'preconnect', href: 'https://res.cloudinary.com' },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    { rel: 'dns-prefetch', href: 'https://www.clarity.ms' }
  ];
};

// Mobile app meta tags
export const getMobileAppMeta = () => {
  return {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Gyan VaniAi',
    'format-detection': 'telephone=no'
  };
};
