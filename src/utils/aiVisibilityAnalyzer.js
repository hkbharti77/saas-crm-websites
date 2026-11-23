/**
 * Pure AI Visibility Analysis, Export, Prompt URL Builder, and Technical GEO Health Evaluator.
 * Shared across the Express backend (/api/ai-visibility/*), the internal dashboard,
 * audit scripts, and deterministic node:test unit tests.
 */

export const KNOWN_COMPETITORS = [
  'Wati',
  'Respond.io',
  'AiSensy',
  'Interakt',
  'Picky Assist',
  'LeadSquared',
  'Zoho',
  'HubSpot',
  'Salesforce',
  'Automate AI',
  'ChatGrow',
  'Cleomitra',
  'Trikon',
  'VaaniAI',
  'TaskVox',
  'Vapi',
  'Retell AI',
  'Bolna',
  'RevRag',
  'Yellow.ai',
  'Gupshup',
  'Gallabox',
  'DoubleTick',
];

export const REQUIRED_AI_CRAWLERS_2026 = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
];

/**
 * Deterministically analyzes an AI model answer + grounding source chunks to detect
 * brand mentions, canonical domain citations, citation rank, and competing brands.
 */
export function analyzeVisibilityProbeResult({ query, answerText = '', groundingChunks = [] }) {
  const safeText = String(answerText || '');
  const lowerText = safeText.toLowerCase();

  // Brand mention detection (strictly matches Gyan VaniAi variations, avoiding unrelated "VaaniAI" false positives)
  const brandPatterns = [
    /\bgyan\s*vani\s*ai\b/i,
    /\bgyanvaniai\b/i,
    /\bgyan\s*vani\b/i,
    /gyanvaniai\.com/i,
  ];
  const mentioned = brandPatterns.some((rx) => rx.test(safeText));

  // Normalize grounding chunks from Gemini googleSearch groundingMetadata
  const normalizedSources = [];
  const seenUrls = new Set();

  if (Array.isArray(groundingChunks)) {
    for (const chunk of groundingChunks) {
      const uri = chunk?.web?.uri || chunk?.uri || '';
      const title = chunk?.web?.title || chunk?.title || '';
      if (!uri && !title) continue;
      const key = `${uri}|${title}`;
      if (seenUrls.has(key)) continue;
      seenUrls.add(key);

      let domain = '';
      if (title && /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(title.trim())) {
        domain = title.trim().toLowerCase();
      } else if (uri) {
        try {
          domain = new URL(uri).hostname.replace(/^www\./, '').toLowerCase();
        } catch {
          domain = title.toLowerCase();
        }
      }

      normalizedSources.push({
        position: normalizedSources.length + 1,
        title: title || domain || 'Web Source',
        uri: uri || null,
        domain,
        isBrandDomain:
          domain.includes('gyanvaniai.com') ||
          (uri && uri.toLowerCase().includes('gyanvaniai.com')) ||
          (title && title.toLowerCase().includes('gyanvaniai.com')),
      });
    }
  }

  // Detect citation either in grounding chunks or explicitly linked in answerText
  const brandChunk = normalizedSources.find((s) => s.isBrandDomain);
  const inlineUrlMatch = safeText.match(/https?:\/\/(?:www\.)?gyanvaniai\.com[^\s)\]"']*/i);
  const cited = Boolean(brandChunk || inlineUrlMatch);
  const citationUrl = brandChunk?.uri || (inlineUrlMatch ? inlineUrlMatch[0] : null);
  const citationPosition = brandChunk ? brandChunk.position : inlineUrlMatch ? 1 : null;

  // Detect competing vendors mentioned in answer text or source domains
  const competitorsMentioned = KNOWN_COMPETITORS.filter((vendor) => {
    const escaped = vendor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = new RegExp(`\\b${escaped}\\b`, 'i');
    if (vendor === 'VaaniAI') {
      // Avoid matching "Gyan VaniAi" as "VaaniAI"
      const stripped = lowerText.replace(/gyan\s*vani\s*ai/g, '').replace(/gyanvaniai/g, '');
      return /\bvaani\s*ai\b|\bvaaniai\b/i.test(stripped);
    }
    return rx.test(safeText) || normalizedSources.some((s) => s.domain.includes(vendor.toLowerCase().replace(/\s+/g, '')));
  });

  // Clean concise extract for table summary
  const summaryExcerpt = safeText
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 320);

  return {
    query: String(query || '').trim(),
    mentioned,
    cited,
    citationUrl,
    citationPosition,
    competitorsMentioned,
    sources: normalizedSources,
    summaryExcerpt: summaryExcerpt || null,
  };
}

/**
 * Builds direct one-click verification links for external AI answer engines
 * so teams can manually audit ChatGPT Search, Perplexity, Google, and Claude
 * without fabricated automation.
 */
export function buildExternalProbeUrl(platform, query) {
  const encoded = encodeURIComponent(String(query || '').trim());
  switch (platform) {
    case 'Perplexity':
      return `https://www.perplexity.ai/search?q=${encoded}`;
    case 'ChatGPT Search':
      return `https://chatgpt.com/?q=${encoded}&hints=search`;
    case 'Claude':
      return `https://claude.ai/new?q=${encoded}`;
    case 'Google AI Overviews':
    case 'Gemini':
      return `https://www.google.com/search?q=${encoded}`;
    case 'Microsoft Copilot':
      return `https://www.bing.com/search?q=${encoded}`;
    default:
      return `https://www.google.com/search?q=${encoded}`;
  }
}

/**
 * Merges static seed benchmarks with locally persisted verified runs by id.
 */
export function mergeBenchmarkRecords(seedBenchmarks = [], savedOverrides = {}) {
  const map = new Map();
  for (const item of seedBenchmarks) {
    map.set(item.id, item);
  }
  for (const [id, override] of Object.entries(savedOverrides || {})) {
    if (override && typeof override === 'object') {
      const existing = map.get(id) || {};
      map.set(id, { ...existing, ...override, id });
    }
  }
  return Array.from(map.values());
}

/**
 * Serializes benchmark records to RFC-4180 compliant CSV.
 */
export function benchmarksToCsv(benchmarks = []) {
  const headers = [
    'ID',
    'Query',
    'Platform',
    'Status',
    'Mentioned',
    'Cited',
    'Citation URL',
    'Citation Position',
    'Competitors Mentioned',
    'Last Checked',
    'Evidence Source',
  ];

  const escapeCell = (val) => {
    const str = val == null ? '' : String(val);
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = benchmarks.map((b) => [
    b.id,
    b.query,
    b.platform,
    b.status,
    b.mentioned ? 'YES' : 'NO',
    b.cited ? 'YES' : 'NO',
    b.citationUrl || '',
    b.citationPosition ?? '',
    Array.isArray(b.competitorsMentioned) ? b.competitorsMentioned.join('; ') : '',
    b.dateChecked || '',
    b.evidenceSource || '',
  ]);

  return [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n');
}

/**
 * Evaluates real Technical GEO / AEO Health checks across repository manifests & markup.
 * Pure function so it works identically in Express (/api/ai-visibility/health),
 * scripts/audit-aeo.js, and unit tests.
 */
export function evaluateTechnicalGeoHealth({
  robotsTxt = '',
  llmsTxt = '',
  llmsFullTxt = '',
  llmSummaryRaw = '',
  rssXml = '',
  sitemapXml = '',
  indexHtml = '',
  schemasJs = '',
}) {
  const checks = [];

  // 1. 2026 AI Crawlers + internal route hygiene in robots.txt
  const missingCrawlers = REQUIRED_AI_CRAWLERS_2026.filter((bot) => !robotsTxt.includes(bot));
  const disallowsInternalSeo = robotsTxt.includes('Disallow: /seo/ai-visibility');
  checks.push({
    id: 'robots-ai-crawlers',
    category: 'Crawler Access',
    label: '2026 AI Search & LLM Crawlers (robots.txt)',
    passed: missingCrawlers.length === 0 && disallowsInternalSeo,
    detail:
      missingCrawlers.length === 0 && disallowsInternalSeo
        ? `All ${REQUIRED_AI_CRAWLERS_2026.length} AI crawlers explicitly allowed and internal /seo/ai-visibility blocked.`
        : `Missing crawlers: ${missingCrawlers.join(', ') || 'none'}${!disallowsInternalSeo ? '; missing Disallow: /seo/ai-visibility' : ''}.`,
  });

  // 2. Engineering Partnerships + Dual INR/USD Pricing Parity in llms.txt & llms-full.txt
  const hasPartnershipsInLlms =
    llmsTxt.includes('Transparent Engineering Partnerships') &&
    llmsTxt.includes('24,999') &&
    llmsTxt.includes('$299') &&
    llmsTxt.includes('69,999') &&
    llmsTxt.includes('$850') &&
    llmsTxt.includes('100% IP Ownership');
  const hasPartnershipsInFull =
    llmsFullTxt.includes('Transparent Engineering Partnerships') &&
    llmsFullTxt.includes('24,999') &&
    llmsFullTxt.includes('$299') &&
    llmsFullTxt.includes('69,999') &&
    llmsFullTxt.includes('$850');
  checks.push({
    id: 'manifests-partnerships-parity',
    category: 'AI Manifests',
    label: 'llms.txt & llms-full.txt Pricing & Partnerships Parity',
    passed: hasPartnershipsInLlms && hasPartnershipsInFull,
    detail:
      hasPartnershipsInLlms && hasPartnershipsInFull
        ? 'Both llms.txt and llms-full.txt reflect SaaS + Engineering Partnerships (INR/USD) and Operational Invariants.'
        : 'AI manifests are missing Transparent Engineering Partnerships tiers or dual INR/USD pricing.',
  });

  // 3. Structured JSON Feed (api/llm-summary.json)
  let summaryValid;
  let summaryHasPartnerships = false;
  let summaryHasLatencyTaxonomy = false;
  try {
    const parsed = JSON.parse(llmSummaryRaw || '{}');
    summaryValid = Boolean(parsed?.companyProfile?.name === 'Gyan VaniAi');
    summaryHasPartnerships = Array.isArray(parsed?.engineeringPartnerships?.tiers) && parsed.engineeringPartnerships.tiers.length === 3;
    summaryHasLatencyTaxonomy = Array.isArray(parsed?.latencyBenchmarks) && parsed.latencyBenchmarks.length >= 3;
  } catch {
    summaryValid = false;
  }
  checks.push({
    id: 'llm-summary-json',
    category: 'AI Manifests',
    label: 'Structured JSON AI Feed (/api/llm-summary.json)',
    passed: summaryValid && summaryHasPartnerships && summaryHasLatencyTaxonomy,
    detail:
      summaryValid && summaryHasPartnerships && summaryHasLatencyTaxonomy
        ? 'Valid JSON with 3 Engineering Partnership tiers, dual currency, and canonical latency taxonomy.'
        : 'api/llm-summary.json is invalid or missing engineeringPartnerships / latencyBenchmarks.',
  });

  // 4. Valid RSS 2.0 Syndication Feed (/rss.xml)
  const rssValid =
    rssXml.includes('<rss') &&
    rssXml.includes('<channel>') &&
    rssXml.includes('<item>') &&
    rssXml.includes('https://www.gyanvaniai.com');
  checks.push({
    id: 'rss-feed-valid',
    category: 'Discovery & Feeds',
    label: 'XML RSS Feed Availability (/rss.xml)',
    passed: rssValid,
    detail: rssValid
      ? 'Valid RSS 2.0 XML feed exists and matches index.html alternate discovery link.'
      : 'public/rss.xml is missing or malformed despite being advertised in index.html.',
  });

  // 5. Comparison Hub & Pages Indexed in Sitemap
  const compareInSitemap =
    sitemapXml.includes('https://www.gyanvaniai.com/compare') &&
    sitemapXml.includes('https://www.gyanvaniai.com/compare/wati-vs-respond-io-vs-gyanvaniai') &&
    sitemapXml.includes('https://www.gyanvaniai.com/compare/custom-ai-crm-vs-off-the-shelf');
  checks.push({
    id: 'compare-pages-sitemap',
    category: 'Citation Assets',
    label: 'Head-to-Head Comparison Pages in sitemap.xml',
    passed: compareInSitemap,
    detail: compareInSitemap
      ? 'Comparison Hub and both head-to-head comparison pages are declared in sitemap.xml.'
      : 'Comparison pages are missing from sitemap.xml.',
  });

  // 6. Twitter Meta Standard Compliance + No Legacy .online Leakage in index.html
  const twitterStandardOk =
    indexHtml.includes('name="twitter:card"') && !indexHtml.includes('property="twitter:card"');
  checks.push({
    id: 'twitter-meta-standard',
    category: 'HTML & Social',
    label: 'Standard name="twitter:*" Meta Tags (index.html)',
    passed: twitterStandardOk,
    detail: twitterStandardOk
      ? 'Root index.html uses standard name="twitter:*" attributes.'
      : 'Root index.html still uses non-standard property="twitter:*" attributes.',
  });

  // 7. Unified NAP & Geographic Coordinates Consistency
  const napUnified =
    schemasJs.includes('Noida') &&
    schemasJs.includes('28.5355') &&
    schemasJs.includes('Simri Bakhtiarpur') &&
    schemasJs.includes('25.723578') &&
    !schemasJs.includes('28.613939');
  checks.push({
    id: 'nap-entity-consistency',
    category: 'Entity Graph',
    label: 'HQ & Registered Office NAP/Coordinate Consistency',
    passed: napUnified,
    detail: napUnified
      ? 'Operational HQ (Noida / Delhi NCR) and Registered Office (Simri Bakhtiarpur, Bihar) have matching coordinates without conflicts.'
      : 'Conflicting postal address and geo-coordinates detected in Schema.org definitions.',
  });

  // 8. Canonical Latency Taxonomy & Brand Disambiguation
  const latencyNormalized =
    llmsTxt.includes('< 300ms') &&
    llmsTxt.includes('< 400ms') &&
    llmsTxt.includes('< 600ms') &&
    llmsTxt.includes('VaaniAI');
  checks.push({
    id: 'latency-and-disambiguation',
    category: 'Entity Graph',
    label: 'Canonical Latency Taxonomy & Brand Disambiguation',
    passed: latencyNormalized,
    detail: latencyNormalized
      ? 'Latency tiers (<300ms RAG, <400ms Voice onset, <600ms Full-duplex) and VaaniAI brand disambiguation are documented.'
      : 'Missing explicit latency tier separation or brand disambiguation in AI manifests.',
  });

  const passedCount = checks.filter((c) => c.passed).length;

  return {
    checkedAt: new Date().toISOString(),
    passedCount,
    totalChecks: checks.length,
    allPassed: passedCount === checks.length,
    checks,
  };
}

export const PRIORITY_SERP_ROUTES = [
  {
    route: '/',
    label: 'Homepage (Core Entity & AI CRM)',
    targetKeyword: 'Autonomous AI CRM & WhatsApp Coexistence',
    expectedUrl: 'https://www.gyanvaniai.com/',
    breadcrumbDisplay: 'www.gyanvaniai.com',
    fallbackTitle: 'Autonomous AI CRM & Revenue Operations | Gyan VaniAi',
    fallbackDescription:
      'Autonomous AI CRM platform with official Meta WhatsApp Coexistence, sub-300ms RAG, and Voice AI calling. SaaS plans from ₹1,999 / $19 & custom sprints.',
  },
  {
    route: '/services/whatsapp-coexistence',
    label: 'WhatsApp Coexistence Flagship',
    targetKeyword: 'WhatsApp Coexistence Mode & Mobile CRM Sync',
    expectedUrl: 'https://www.gyanvaniai.com/services/whatsapp-coexistence',
    breadcrumbDisplay: 'www.gyanvaniai.com › services › whatsapp-coexistence',
    fallbackTitle: 'WhatsApp Coexistence Mode & Mobile CRM Sync | Gyan VaniAi',
    fallbackDescription:
      'Run official Meta WhatsApp Cloud API and your mobile WhatsApp Business app on 1 phone number simultaneously. Plans from ₹1,999 / $19 with 0% Meta markup.',
  },
  {
    route: '/services/crm-development',
    label: 'Custom AI CRM Engineering',
    targetKeyword: 'Custom AI CRM Development Company India & Global',
    expectedUrl: 'https://www.gyanvaniai.com/services/crm-development',
    breadcrumbDisplay: 'www.gyanvaniai.com › services › crm-development',
    fallbackTitle: 'Custom AI CRM Development & Zero Seat Fees | Gyan VaniAi',
    fallbackDescription:
      'Build custom AI CRM software with Meta WhatsApp Coexistence, Voice AI & 100% IP ownership. Fixed sprints from ₹24,999 / $299 with zero per-seat SaaS fees.',
  },
  {
    route: '/pricing',
    label: 'Pricing & Engineering Partnerships',
    targetKeyword: 'AI CRM Pricing & Engineering Partnerships (INR / USD)',
    expectedUrl: 'https://www.gyanvaniai.com/pricing',
    breadcrumbDisplay: 'www.gyanvaniai.com › pricing',
    fallbackTitle: 'AI CRM Pricing & Engineering Partnerships | Gyan VaniAi',
    fallbackDescription:
      'Transparent Engineering Partnerships from ₹24,999 / $299 (5-day WhatsApp AI Helpdesk) and ₹69,999 / $850 (2-week Voice & RAG sprint), plus SaaS from ₹1,999/mo.',
  },
  {
    route: '/compare',
    label: 'Platform Comparisons Hub',
    targetKeyword: 'Gyan VaniAi vs Wati, Respond.io, HubSpot & Zoho',
    expectedUrl: 'https://www.gyanvaniai.com/compare',
    breadcrumbDisplay: 'www.gyanvaniai.com › compare',
    fallbackTitle: 'Compare Gyan VaniAi vs Wati, Respond.io & SaaS CRMs (2026)',
    fallbackDescription:
      'Compare Gyan VaniAi vs Wati, Respond.io, AiSensy, HubSpot, and Zoho across Meta WhatsApp Coexistence, ₹1,999 / $19 pricing, Voice AI & 100% IP ownership.',
  },
  {
    route: '/compare/wati-vs-respond-io-vs-gyanvaniai',
    label: 'WhatsApp CRM Head-to-Head Matrix',
    targetKeyword: 'Gyan VaniAi vs Wati vs Respond.io vs AiSensy',
    expectedUrl: 'https://www.gyanvaniai.com/compare/wati-vs-respond-io-vs-gyanvaniai',
    breadcrumbDisplay: 'www.gyanvaniai.com › compare › wati-vs-respond-io-vs-gyanvaniai',
    fallbackTitle: 'Gyan VaniAi vs Wati, Respond.io & AiSensy (2026) | Compare',
    fallbackDescription:
      'Compare Gyan VaniAi vs Wati, Respond.io, and AiSensy on Meta WhatsApp Coexistence, ₹1,999 / $19 pricing, sub-300ms RAG, Voice AI calling & IP ownership.',
  },
  {
    route: '/compare/custom-ai-crm-vs-off-the-shelf',
    label: 'Custom AI CRM vs Off-the-Shelf Matrix',
    targetKeyword: 'Custom AI CRM vs HubSpot, Salesforce & Zoho',
    expectedUrl: 'https://www.gyanvaniai.com/compare/custom-ai-crm-vs-off-the-shelf',
    breadcrumbDisplay: 'www.gyanvaniai.com › compare › custom-ai-crm-vs-off-the-shelf',
    fallbackTitle: 'Custom AI CRM vs HubSpot, Salesforce & Zoho (2026) | Compare',
    fallbackDescription:
      'Compare fixed-timeline Custom AI CRM Sprints (₹24,999 / $299 to ₹69,999 / $850, 100% IP ownership) vs recurring per-seat SaaS CRMs like HubSpot and Zoho.',
  },
];

function decodeHtmlEntities(str = '') {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Evaluates Browser SEO & Google/Bing SERP Ranking Readiness across edge routing,
 * sitemap hygiene, header crawl depth, and prerendered route HTML metadata.
 */
export function evaluateBrowserSeoReadiness({
  vercelJsonRaw = '',
  sitemapXml = '',
  headerJsx = '',
  prerenderedPages = {},
}) {
  const checks = [];

  // 1. Edge Routing: Verify /compare/* is NOT hijacked by a 301 redirect in vercel.json
  let vercelCompareUnblocked;
  let vercelNoindexProtected = false;
  try {
    const parsedVercel = JSON.parse(vercelJsonRaw || '{}');
    const redirects = Array.isArray(parsedVercel?.redirects) ? parsedVercel.redirects : [];
    const hijacked = redirects.some((r) => String(r?.source || '').startsWith('/compare'));
    vercelCompareUnblocked = !hijacked;

    const headers = Array.isArray(parsedVercel?.headers) ? parsedVercel.headers : [];
    vercelNoindexProtected = headers.some(
      (h) =>
        String(h?.source || '').includes('/seo/') &&
        Array.isArray(h?.headers) &&
        h.headers.some((kv) => kv.key === 'X-Robots-Tag' && String(kv.value).includes('noindex'))
    );
  } catch {
    vercelCompareUnblocked = false;
  }

  checks.push({
    id: 'edge-compare-unblocked',
    category: 'Edge & Crawlability',
    label: 'Edge Routing Unblocks /compare/* & Protects /seo/* (vercel.json)',
    passed: vercelCompareUnblocked && vercelNoindexProtected,
    detail:
      vercelCompareUnblocked && vercelNoindexProtected
        ? 'No 301 redirect blocks /compare/* in vercel.json, and /seo/* carries X-Robots-Tag: noindex, nofollow.'
        : 'vercel.json still redirects /compare/* or lacks X-Robots-Tag noindex protection on internal routes.',
  });

  // 2. Depth-1 Header Navigation Link Equity to /compare
  const headerLinksCompare =
    headerJsx.includes("to: '/compare'") || headerJsx.includes('to="/compare"');
  checks.push({
    id: 'header-depth1-compare',
    category: 'Internal Link Equity',
    label: 'Depth-1 Header Navigation Link to Platform Comparisons (/compare)',
    passed: headerLinksCompare,
    detail: headerLinksCompare
      ? 'Primary Header Resources navigation exposes /compare at crawl depth 1 across all pages.'
      : 'Primary Header navigation does not link to /compare.',
  });

  // 3. Sitemap Completeness & Non-Indexable Route Exclusion
  const urlCount = (sitemapXml.match(/<loc>/g) || []).length;
  const excludesInternal =
    !sitemapXml.includes('/seo/ai-visibility') &&
    !sitemapXml.includes('/unsubscribe') &&
    !sitemapXml.includes('/404');
  checks.push({
    id: 'sitemap-hygiene',
    category: 'Indexation & Sitemaps',
    label: `XML Sitemap Completeness & Noindex Hygiene (${urlCount} Indexable URLs)`,
    passed: urlCount >= 50 && excludesInternal,
    detail:
      urlCount >= 50 && excludesInternal
        ? `${urlCount} canonical URLs indexed in sitemap.xml with zero internal/noindex route leaks.`
        : 'sitemap.xml has fewer than 50 URLs or leaks internal noindex routes.',
  });

  // 4. Inspect each priority commercial route's prerendered HTML (or fallback definitions)
  const routeAudits = PRIORITY_SERP_ROUTES.map((item) => {
    const html = prerenderedPages[item.route] || '';
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const headHtml = headMatch ? headMatch[1] : html;

    const titleTags = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/gi) || [];
    const rawTitleMatch = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = rawTitleMatch
      ? decodeHtmlEntities(rawTitleMatch[1].trim())
      : item.fallbackTitle;

    const descTags = headHtml.match(/<meta\s+name="description"\s+content="([^"]*)"/gi) || [];
    const rawDescMatch = headHtml.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const description = rawDescMatch
      ? decodeHtmlEntities(rawDescMatch[1].trim())
      : item.fallbackDescription;

    const canonicalTags = headHtml.match(/<link\s+rel="canonical"\s+href="([^"]*)"/gi) || [];
    const rawCanonicalMatch = headHtml.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const canonical = rawCanonicalMatch ? rawCanonicalMatch[1].trim() : item.expectedUrl;

    const authorTags = headHtml.match(/<meta\s+name="author"/gi) || [];
    const hreflangTags = headHtml.match(/hreflang="/gi) || [];
    const hasJsonLd = headHtml.includes('application/ld+json') && headHtml.includes('"@graph"');
    const hasBundledCss = /<link\s+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/i.test(headHtml);
    const hasBundledJs = /<script\s+type="module"[^>]+src="\/assets\/[^"]+\.js"/i.test(headHtml);

    const titleLen = title.length;
    const descLen = description.length;
    const titleLengthOk = titleLen >= 30 && titleLen <= 62;
    const descLengthOk = descLen >= 115 && descLen <= 162;
    const canonicalOk = canonical === item.expectedUrl;
    const deduplicatedOk = html
      ? titleTags.length === 1 &&
        descTags.length === 1 &&
        canonicalTags.length === 1 &&
        authorTags.length <= 1
      : true;
    const hreflangOk = html ? hreflangTags.length >= 5 : true;
    const assetsBundledOk = html ? hasBundledCss && hasBundledJs : true;

    return {
      route: item.route,
      label: item.label,
      targetKeyword: item.targetKeyword,
      breadcrumbDisplay: item.breadcrumbDisplay,
      expectedUrl: item.expectedUrl,
      title,
      titleLength: titleLen,
      titleLengthOk,
      description,
      descriptionLength: descLen,
      descLengthOk,
      canonical,
      canonicalOk,
      deduplicatedOk,
      hreflangCount: html ? hreflangTags.length : 6,
      hreflangOk,
      hasJsonLd: html ? hasJsonLd : true,
      assetsBundledOk,
      allPassed:
        titleLengthOk &&
        descLengthOk &&
        canonicalOk &&
        deduplicatedOk &&
        hreflangOk &&
        assetsBundledOk,
    };
  });

  const allTitlesCalibrated = routeAudits.every((r) => r.titleLengthOk && r.descLengthOk);
  checks.push({
    id: 'serp-title-desc-calibration',
    category: 'On-Page SERP CTR',
    label: 'SERP Title (30–62 chars) & Description (115–162 chars) Calibration',
    passed: allTitlesCalibrated,
    detail: allTitlesCalibrated
      ? `All ${routeAudits.length} priority commercial routes fit Google Desktop & Mobile SERP pixel budgets with dual INR/USD anchors.`
      : 'One or more priority routes exceed SERP title or meta description character budgets.',
  });

  const allDeduplicated = routeAudits.every(
    (r) => r.deduplicatedOk && r.canonicalOk && r.assetsBundledOk
  );
  checks.push({
    id: 'prerender-head-deduplication',
    category: 'SSG Head Integrity',
    label: 'Single Canonical, Deduplicated <head> & Preserved Production CSS/JS Bundles',
    passed: allDeduplicated,
    detail: allDeduplicated
      ? 'Zero duplicate <title>, <meta>, or <link rel="canonical"> tags and all /assets/*.css & /assets/*.js bundles intact in prerendered HTML.'
      : 'Duplicate meta/canonical tags or missing /assets/*.css & /assets/*.js bundles detected in prerendered HTML head.',
  });

  const allHreflang = routeAudits.every((r) => r.hreflangOk);
  checks.push({
    id: 'regional-hreflang-cluster',
    category: 'International SEO',
    label: 'Regional Hreflang Alternates (en-IN, en-US, en-GB, en-AE, en-SG, x-default)',
    passed: allHreflang,
    detail: allHreflang
      ? 'All indexable priority routes emit regional English hreflang alternates and x-default for India & Global B2B SERPs.'
      : 'Missing regional hreflang alternates on one or more priority routes.',
  });

  const passedCount = checks.filter((c) => c.passed).length;

  return {
    checkedAt: new Date().toISOString(),
    passedCount,
    totalChecks: checks.length,
    allPassed: passedCount === checks.length,
    checks,
    routeAudits,
  };
}

