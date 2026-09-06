/**
 * SEO Helper Functions
 * International targeting, hreflang tags, and meta optimization
 */

export const generateHreflangTags = (currentPath) => {
  const baseUrl = 'https://www.gyanvaniai.online';
  
  // Target markets with languages
  const hreflangs = [
    { lang: 'en', region: '', label: 'English (Global)' },
    { lang: 'en', region: 'US', label: 'English (United States)' },
    { lang: 'en', region: 'GB', label: 'English (United Kingdom)' },
    { lang: 'en', region: 'IN', label: 'English (India)' },
    { lang: 'en', region: 'AE', label: 'English (UAE)' },
    { lang: 'en', region: 'SG', label: 'English (Singapore)' },
    { lang: 'en', region: 'AU', label: 'English (Australia)' },
    { lang: 'en', region: 'CA', label: 'English (Canada)' },
    { lang: 'zh', region: 'CN', label: 'Chinese (Simplified)' },
    { lang: 'ar', region: 'SA', label: 'Arabic (Saudi Arabia)' },
    { lang: 'ar', region: 'AE', label: 'Arabic (UAE)' },
    { lang: 'de', region: 'DE', label: 'German' },
    { lang: 'fr', region: 'FR', label: 'French' },
    { lang: 'es', region: 'ES', label: 'Spanish' },
    { lang: 'pt', region: 'BR', label: 'Portuguese (Brazil)' },
    { lang: 'ru', region: 'RU', label: 'Russian' },
    { lang: 'ja', region: 'JP', label: 'Japanese' },
    { lang: 'ko', region: 'KR', label: 'Korean' },
  ];

  return hreflangs.map(({ lang, region }) => {
    const hreflang = region ? `${lang}-${region}` : lang;
    return {
      rel: 'alternate',
      hreflang,
      href: `${baseUrl}${currentPath}`
    };
  });
};

export const getGeoTargeting = () => {
  return {
    'geo.region': 'Global',
    'geo.placename': 'Worldwide',
    'geo.position': '28.6139;77.2090', // Delhi, India as primary
    'ICBM': '28.6139, 77.2090'
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
    default: 'AI Agency, Software Development, Business Automation, Digital Transformation, Custom Software'
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
    'twitter:url': url,
    'twitter:site': '@gyanvaniai',
    'twitter:creator': '@gyanvaniai'
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
    { name: 'Home', url: 'https://www.gyanvaniai.online/' }
  ];
  
  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name,
      url: `https://www.gyanvaniai.online${currentPath}`
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
