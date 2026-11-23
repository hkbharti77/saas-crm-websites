/**
 * Centralized Route Chunk Prefetch Registry
 * Deduplicates hover/focus/touch and idle-time lazy imports so route
 * navigations settle immediately without duplicate network requests.
 */

const prefetchedLoaders = new WeakSet();

const loadHome = () => import('../pages/Home');
const loadAbout = () => import('../pages/About');
const loadPricing = () => import('../pages/PricingPage');
const loadPlanDetail = () => import('../pages/PlanDetailPage');
const loadBlog = () => import('../pages/Blog');
const loadBlogPost = () => import('../pages/BlogPost');
const loadBlogSearch = () => import('../pages/BlogSearch');
const loadCategory = () => import('../pages/CategoryPage');
const loadPolicy = () => import('../pages/PolicyPage');
const loadTerms = () => import('../pages/TermsConditions');
const loadSecurity = () => import('../pages/Security');
const loadUnsubscribe = () => import('../pages/Unsubscribe');
const loadDocumentation = () => import('../pages/Documentation');
const loadWhatsAppCoexistence = () => import('../pages/WhatsAppCoexistencePage');
const loadSalesAutomation = () => import('../pages/SalesAutomationPage');
const loadAIChatbots = () => import('../pages/AIChatbotsPage');
const loadWhatsAppCallingAgent = () => import('../pages/WhatsAppCallingAgentPage');
const loadCrmDevelopment = () => import('../pages/CrmDevelopmentPage');
const loadHrmsDevelopment = () => import('../pages/HrmsDevelopmentPage');
const loadIvrSolutions = () => import('../pages/IvrSolutionsPage');
const loadLegal = () => import('../pages/LegalPage');
const loadWhatsAppCatalogCrm = () => import('../pages/WhatsAppCatalogCrmPage');
const loadWhatsAppPricingCalculator = () => import('../pages/WhatsAppPricingCalculatorPage');
const loadCrmMigrationGuide = () => import('../pages/CrmMigrationGuidePage');
const loadVoiceAiLatencyBenchmark = () => import('../pages/VoiceAiLatencyBenchmarkPage');
const loadSipArchitectureGuide = () => import('../pages/SipArchitectureGuidePage');
const loadVoiceAiInfrastructure = () => import('../pages/VoiceAiInfrastructurePage');
const loadMcpToolCallingGuide = () => import('../pages/McpToolCallingGuidePage');
const loadWhereToFindUs = () => import('../pages/WhereToFindUsPage');
const loadAeoVisibilityDashboard = () => import('../pages/AeoVisibilityDashboard');
const loadSEOLandingPage = () => import('../pages/SEOLandingPage');
const loadContactModal = () => import('../components/ContactModal');
const loadDemoModal = () => import('../components/DemoModal');

const EXACT_ROUTE_LOADERS = new Map([
  ['/', loadHome],
  ['/about', loadAbout],
  ['/pricing', loadPricing],
  ['/blog', loadBlog],
  ['/blog/search', loadBlogSearch],
  ['/privacy', loadPolicy],
  ['/terms', loadTerms],
  ['/security', loadSecurity],
  ['/unsubscribe', loadUnsubscribe],
  ['/documentation', loadDocumentation],
  ['/services/whatsapp-coexistence', loadWhatsAppCoexistence],
  ['/services/sales-automation', loadSalesAutomation],
  ['/services/ai-chatbots', loadAIChatbots],
  ['/services/whatsapp-calling-agent', loadWhatsAppCallingAgent],
  ['/services/crm-development', loadCrmDevelopment],
  ['/services/hrms-development', loadHrmsDevelopment],
  ['/services/ivr-solutions', loadIvrSolutions],
  ['/services/whatsapp-catalog-crm', loadWhatsAppCatalogCrm],
  ['/industries/legal', loadLegal],
  ['/tools/whatsapp-pricing-calculator', loadWhatsAppPricingCalculator],
  ['/guides/crm-migration', loadCrmMigrationGuide],
  ['/resources/voice-ai-latency-benchmark', loadVoiceAiLatencyBenchmark],
  ['/resources/sip-architecture', loadSipArchitectureGuide],
  ['/resources/voice-ai-infrastructure', loadVoiceAiInfrastructure],
  ['/resources/mcp-ai-agent-tool-calling', loadMcpToolCallingGuide],
  ['/resources/where-to-find-us', loadWhereToFindUs],
  ['/seo/ai-visibility', loadAeoVisibilityDashboard],
]);

const IDLE_PREFETCH_LOADERS = [
  loadAbout,
  loadPricing,
  loadBlog,
  loadBlogPost,
  loadPolicy,
  loadTerms,
  loadSecurity,
  loadDocumentation,
  loadWhatsAppCoexistence,
  loadSalesAutomation,
  loadAIChatbots,
  loadWhatsAppCallingAgent,
  loadCrmDevelopment,
  loadHrmsDevelopment,
  loadIvrSolutions,
  loadLegal,
  loadWhatsAppCatalogCrm,
  loadWhatsAppPricingCalculator,
  loadCrmMigrationGuide,
  loadVoiceAiLatencyBenchmark,
  loadSipArchitectureGuide,
  loadVoiceAiInfrastructure,
  loadMcpToolCallingGuide,
  loadWhereToFindUs,
  loadSEOLandingPage,
  loadPlanDetail,
  loadBlogSearch,
  loadCategory,
  loadContactModal,
  loadDemoModal,
];

function normalizeRoutePath(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return '';
  const withoutHash = rawPath.split('#')[0].split('?')[0].trim();
  if (!withoutHash || withoutHash === '/') return '/';
  return withoutHash.replace(/\/+$/, '');
}

export function resolveRouteLoader(rawPath) {
  const cleanPath = normalizeRoutePath(rawPath);
  if (!cleanPath) return null;

  const exact = EXACT_ROUTE_LOADERS.get(cleanPath);
  if (exact) return exact;

  if (cleanPath.startsWith('/blog/')) return loadBlogPost;
  if (cleanPath.startsWith('/category/')) return loadCategory;
  if (cleanPath.startsWith('/pricing/')) return loadPlanDetail;
  if (cleanPath.startsWith('/services/') || cleanPath.startsWith('/industries/')) {
    return loadSEOLandingPage;
  }

  return null;
}

/**
 * Prefetch the lazy bundle for a given route path (deduplicated).
 * Safe to wire directly into onMouseEnter, onFocus, and onTouchStart.
 */
export function prefetchRoute(rawPath) {
  const loader = resolveRouteLoader(rawPath);
  if (!loader || prefetchedLoaders.has(loader)) {
    return false;
  }
  prefetchedLoaders.add(loader);
  try {
    const result = loader();
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        prefetchedLoaders.delete(loader);
      });
    }
  } catch {
    prefetchedLoaders.delete(loader);
  }
  return true;
}

/**
 * Prefetch all lazy route chunks during browser idle time after first paint.
 */
export function prefetchAllIdleRoutes() {
  if (typeof window === 'undefined') return;
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 250));
  IDLE_PREFETCH_LOADERS.forEach((loader, index) => {
    if (prefetchedLoaders.has(loader)) return;
    schedule(
      () => {
        if (prefetchedLoaders.has(loader)) return;
        prefetchedLoaders.add(loader);
        loader().catch(() => {
          prefetchedLoaders.delete(loader);
        });
      },
      { timeout: 4000 + index * 250 }
    );
  });
}

export function prefetchModal(name) {
  const loader = name === 'demo' ? loadDemoModal : loadContactModal;
  if (prefetchedLoaders.has(loader)) return false;
  prefetchedLoaders.add(loader);
  loader().catch(() => {
    prefetchedLoaders.delete(loader);
  });
  return true;
}
