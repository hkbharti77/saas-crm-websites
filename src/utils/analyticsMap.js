/**
 * Analytics Event Map
 * Centralized event tracking across all user interactions
 * Used to measure funnel progression, engagement, and conversions
 */

/**
 * Event Categories
 */
export const EVENT_CATEGORIES = {
  // Navigation & Page Views
  PAGE_LOAD: 'page_load',
  PAGE_VIEW: 'page_view',
  NAVIGATE: 'navigate',
  
  // Hero Section
  HERO_CTA_CLICK: 'hero_cta_click',
  HERO_SLIDE_CHANGE: 'hero_slide_change',
  HERO_VIDEO_PLAY: 'hero_video_play',
  HERO_SCROLL: 'hero_scroll',

  // Features & Services
  FEATURE_SECTION_VIEW: 'feature_section_view',
  FEATURE_CLICK: 'feature_click',
  FEATURE_EXPAND: 'feature_expand',
  SERVICE_PAGE_VIEW: 'service_page_view',
  SERVICE_CLICK: 'service_click',
  SERVICE_LEARN_MORE: 'service_learn_more',

  // Pricing
  PRICING_SECTION_VIEW: 'pricing_section_view',
  PRICING_PLAN_VIEW: 'pricing_plan_view',
  PRICING_PLAN_HOVER: 'pricing_plan_hover',
  PRICING_PLAN_CTA_CLICK: 'pricing_plan_cta_click',
  PRICING_COMPARISON_CLICK: 'pricing_comparison_click',

  // Industries
  INDUSTRY_SECTION_VIEW: 'industry_section_view',
  INDUSTRY_SELECT: 'industry_select',
  INDUSTRY_PAGE_VIEW: 'industry_page_view',
  INDUSTRY_CTA_CLICK: 'industry_cta_click',

  // Portfolio/Case Studies
  PORTFOLIO_VIEW: 'portfolio_view',
  CASE_STUDY_CLICK: 'case_study_click',
  CASE_STUDY_VIEW: 'case_study_view',
  TESTIMONIAL_VIEW: 'testimonial_view',
  TESTIMONIAL_EXPAND: 'testimonial_expand',

  // Blog
  BLOG_PAGE_VIEW: 'blog_page_view',
  BLOG_POST_VIEW: 'blog_post_view',
  BLOG_POST_CLICK: 'blog_post_click',
  BLOG_CATEGORY_FILTER: 'blog_category_filter',
  BLOG_SEARCH: 'blog_search',
  BLOG_RELATED_ARTICLES_CLICK: 'blog_related_articles_click',
  BLOG_SHARE_CLICK: 'blog_share_click',

  // Contact & CTA
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_FIELD_FILL: 'contact_form_field_fill',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_ERROR: 'contact_form_error',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  
  DEMO_MODAL_OPEN: 'demo_modal_open',
  DEMO_MODAL_CLOSE: 'demo_modal_close',
  DEMO_MODAL_SUBMIT: 'demo_modal_submit',
  DEMO_REQUEST_CLICK: 'demo_request_click',

  // Social & Links
  WHATSAPP_CLICK: 'whatsapp_click',
  WHATSAPP_SHARE: 'whatsapp_share',
  EMAIL_CLICK: 'email_click',
  PHONE_CLICK: 'phone_click',
  SOCIAL_LINK_CLICK: 'social_link_click',
  DOWNLOAD_CLICK: 'download_click',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  LINKEDIN_PROFILE_CLICK: 'linkedin_profile_click',

  // Engagement Depth
  SCROLL_25_PERCENT: 'scroll_25_percent',
  SCROLL_50_PERCENT: 'scroll_50_percent',
  SCROLL_75_PERCENT: 'scroll_75_percent',
  SCROLL_90_PERCENT: 'scroll_90_percent',
  SCROLL_100_PERCENT: 'scroll_100_percent',
  TIME_ON_PAGE_30S: 'time_on_page_30s',
  TIME_ON_PAGE_60S: 'time_on_page_60s',
  TIME_ON_PAGE_120S: 'time_on_page_120s',

  // AI Features
  AI_CHAT_OPEN: 'ai_chat_open',
  AI_CHAT_START: 'ai_chat_start',
  AI_CHAT_MESSAGE: 'ai_chat_message',
  AI_CHAT_ERROR: 'ai_chat_error',
  AI_CHAT_COMPLETE: 'ai_chat_complete',
  AI_CHAT_CLOSE: 'ai_chat_close',
  AI_CHAT_FEEDBACK: 'ai_chat_feedback',

  // Navigation
  NAVIGATION_MENU_OPEN: 'navigation_menu_open',
  NAVIGATION_MENU_CLOSE: 'navigation_menu_close',
  MOBILE_MENU_OPEN: 'mobile_menu_open',
  MOBILE_MENU_CLOSE: 'mobile_menu_close',
  BREADCRUMB_CLICK: 'breadcrumb_click',

  // Search (if applicable)
  SEARCH_QUERY: 'search_query',
  SEARCH_RESULT_CLICK: 'search_result_click',

  // Cookie & Consent
  COOKIE_BANNER_VIEW: 'cookie_banner_view',
  COOKIE_CONSENT_ACCEPT: 'cookie_consent_accept',
  COOKIE_CONSENT_REJECT: 'cookie_consent_reject',

  // Theme
  THEME_TOGGLE: 'theme_toggle',

  // Error & Performance
  ERROR_ENCOUNTERED: 'error_encountered',
  PAGE_LOAD_TIME: 'page_load_time',
  API_CALL: 'api_call',
  API_ERROR: 'api_error',

  // Funnel Stages
  FUNNEL_LANDING: 'funnel_landing',
  FUNNEL_FEATURE_EXPLORE: 'funnel_feature_explore',
  FUNNEL_SERVICE_REVIEW: 'funnel_service_review',
  FUNNEL_PRICING_VIEW: 'funnel_pricing_view',
  FUNNEL_DEMO_REQUEST: 'funnel_demo_request',
  FUNNEL_CONTACT_INQUIRY: 'funnel_contact_inquiry',
  FUNNEL_QUALIFIED_LEAD: 'funnel_qualified_lead',
  FUNNEL_CUSTOMER: 'funnel_customer',
};

/**
 * Funnel Stages for conversion tracking
 */
export const FUNNEL_STAGES = {
  LANDING: 'landing',
  FEATURE_EXPLORE: 'feature_explore',
  SERVICE_REVIEW: 'service_review',
  PRICING_VIEW: 'pricing_view',
  DEMO_REQUEST: 'demo_request',
  CONTACT_INQUIRY: 'contact_inquiry',
  QUALIFIED_LEAD: 'qualified_lead',
  CUSTOMER: 'customer'
};

/**
 * Default event properties
 */
export const getDefaultEventProperties = () => {
  return {
    url: typeof window !== 'undefined' ? window.location.href : '',
    pathname: typeof window !== 'undefined' ? window.location.pathname : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
  };
};

/**
 * Event property schemas - defines expected properties for each event
 */
export const EVENT_SCHEMAS = {
  [EVENT_CATEGORIES.HERO_CTA_CLICK]: {
    source: 'string', // hero, footer, sidebar, etc.
    slideNumber: 'number',
    buttonText: 'string'
  },
  [EVENT_CATEGORIES.FEATURE_CLICK]: {
    featureName: 'string',
    featureIndex: 'number',
    section: 'string'
  },
  [EVENT_CATEGORIES.SERVICE_CLICK]: {
    serviceName: 'string',
    serviceUrl: 'string',
    source: 'string'
  },
  [EVENT_CATEGORIES.PRICING_PLAN_CTA_CLICK]: {
    planName: 'string',
    planPrice: 'number',
    billingCycle: 'string'
  },
  [EVENT_CATEGORIES.BLOG_POST_CLICK]: {
    postId: 'string',
    postTitle: 'string',
    category: 'string',
    source: 'string'
  },
  [EVENT_CATEGORIES.CONTACT_FORM_SUBMIT]: {
    formType: 'string', // contact, demo, newsletter
    email: 'string',
    company: 'string',
    source: 'string'
  },
  [EVENT_CATEGORIES.DEMO_MODAL_SUBMIT]: {
    email: 'string',
    company: 'string',
    phone: 'string',
    message: 'string'
  },
  [EVENT_CATEGORIES.WHATSAPP_CLICK]: {
    source: 'string',
    context: 'string'
  },
  [EVENT_CATEGORIES.SOCIAL_LINK_CLICK]: {
    platform: 'string', // linkedin, twitter, facebook, etc.
    source: 'string'
  },
  [EVENT_CATEGORIES.AI_CHAT_MESSAGE]: {
    sessionId: 'string',
    messageLength: 'number',
    messageType: 'string', // user, assistant
    sourcesCount: 'number'
  },
  [EVENT_CATEGORIES.FUNNEL_LANDING]: {
    utmSource: 'string',
    utmMedium: 'string',
    utmCampaign: 'string',
    referrer: 'string'
  }
};

/**
 * Scroll depth tracking config
 */
export const SCROLL_DEPTHS = [25, 50, 75, 90, 100];

/**
 * Time tracking config (in seconds)
 */
export const TIME_THRESHOLDS = [30, 60, 120];

/**
 * Helper to get scroll event name
 */
export const getScrollEventName = (percentage) => {
  switch (percentage) {
    case 25:
      return EVENT_CATEGORIES.SCROLL_25_PERCENT;
    case 50:
      return EVENT_CATEGORIES.SCROLL_50_PERCENT;
    case 75:
      return EVENT_CATEGORIES.SCROLL_75_PERCENT;
    case 90:
      return EVENT_CATEGORIES.SCROLL_90_PERCENT;
    case 100:
      return EVENT_CATEGORIES.SCROLL_100_PERCENT;
    default:
      return null;
  }
};

/**
 * Helper to get time-on-page event name
 */
export const getTimeEventName = (seconds) => {
  if (seconds >= 120) return EVENT_CATEGORIES.TIME_ON_PAGE_120S;
  if (seconds >= 60) return EVENT_CATEGORIES.TIME_ON_PAGE_60S;
  if (seconds >= 30) return EVENT_CATEGORIES.TIME_ON_PAGE_30S;
  return null;
};

/**
 * Conversion event definitions (high-value interactions)
 */
export const CONVERSION_EVENTS = [
  EVENT_CATEGORIES.CONTACT_FORM_SUCCESS,
  EVENT_CATEGORIES.DEMO_MODAL_SUBMIT,
  EVENT_CATEGORIES.FUNNEL_QUALIFIED_LEAD,
  EVENT_CATEGORIES.FUNNEL_CUSTOMER
];

/**
 * High-engagement indicators (shows user is interested)
 */
export const ENGAGEMENT_INDICATORS = [
  EVENT_CATEGORIES.SCROLL_75_PERCENT,
  EVENT_CATEGORIES.TIME_ON_PAGE_120S,
  EVENT_CATEGORIES.AI_CHAT_START,
  EVENT_CATEGORIES.BLOG_POST_VIEW,
  EVENT_CATEGORIES.CASE_STUDY_VIEW
];

export default {
  EVENT_CATEGORIES,
  FUNNEL_STAGES,
  CONVERSION_EVENTS,
  ENGAGEMENT_INDICATORS,
  getDefaultEventProperties,
  getScrollEventName,
  getTimeEventName
};
