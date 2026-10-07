import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const sitemapPath = path.resolve(rootDir, 'public/sitemap.xml');
const robotsPath = path.resolve(rootDir, 'public/robots.txt');
const vercelConfigPath = path.resolve(rootDir, 'vercel.json');

const CANONICAL_ORIGIN = 'https://www.gyanvaniai.com';
const OLD_DOMAINS = ['gyanvaniai.online', 'www.gyanvaniai.online', 'gyanvaniai.com'];

function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function normalizeRoute(route) {
  if (!route || route === '/') return '/';
  // Remove query and hash
  let clean = route.split('?')[0].split('#')[0];
  if (!clean.startsWith('/')) clean = '/' + clean;
  // Remove trailing slash except for root
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

function parseSitemap(xml) {
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/gis;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

function runAudit() {
  console.log('======================================================================');
  console.log('   🔍 GYAN VANIAI GOOGLE INDEXING-READINESS AUDIT VALIDATION');
  console.log(`   Canonical Origin: ${CANONICAL_ORIGIN}`);
  console.log('======================================================================\n');

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalHtmlFiles: 0,
      indexablePages: 0,
      noindexPages: 0,
      sitemapUrls: 0,
      duplicateCanonicalsCount: 0,
      brokenInternalLinksCount: 0,
      redirectChainsCount: 0,
      orphanCandidatesCount: 0,
      issuesCount: 0
    },
    indexablePages: [],
    noindexPages: [],
    canonicalUrls: {},
    duplicateCanonicals: [],
    brokenInternalLinks: [],
    redirectChains: [],
    statusErrors: [],
    sitemapInconsistencies: [],
    orphanCandidates: [],
    internalClickDepths: {},
    warnings: []
  };

  // 1. Audit Sitemap
  console.log('1️⃣ Auditing XML Sitemap...');
  if (!fs.existsSync(sitemapPath)) {
    report.sitemapInconsistencies.push({ type: 'MISSING_FILE', message: 'public/sitemap.xml does not exist' });
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const sitemapUrls = parseSitemap(sitemapContent);
    report.summary.sitemapUrls = sitemapUrls.length;
    console.log(`   Found ${sitemapUrls.length} URLs in sitemap.xml`);

    const sitemapSet = new Set();
    for (const url of sitemapUrls) {
      if (sitemapSet.has(url)) {
        report.sitemapInconsistencies.push({
          type: 'DUPLICATE_SITEMAP_URL',
          url,
          message: `Duplicate URL found in sitemap: ${url}`
        });
      }
      sitemapSet.add(url);

      if (!url.startsWith(CANONICAL_ORIGIN)) {
        report.sitemapInconsistencies.push({
          type: 'NON_CANONICAL_ORIGIN',
          url,
          message: `Sitemap URL does not start with canonical origin ${CANONICAL_ORIGIN}: ${url}`
        });
      }

      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      if (pathname.length > 1 && pathname.endsWith('/')) {
        report.sitemapInconsistencies.push({
          type: 'TRAILING_SLASH_INCONSISTENCY',
          url,
          message: `Sitemap URL contains trailing slash: ${url}`
        });
      }
    }
  }

  // 2. Audit robots.txt
  console.log('2️⃣ Auditing robots.txt...');
  if (!fs.existsSync(robotsPath)) {
    report.warnings.push({ type: 'MISSING_ROBOTS', message: 'public/robots.txt not found' });
  } else {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    if (!robotsContent.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`)) {
      report.sitemapInconsistencies.push({
        type: 'ROBOTS_MISSING_MAIN_SITEMAP',
        message: 'robots.txt does not declare canonical sitemap URL: https://www.gyanvaniai.com/sitemap.xml'
      });
    }
  }

  // 3. Audit Vercel Redirects & Redirect Chains
  console.log('3️⃣ Auditing Vercel Redirects & Loops/Chains...');
  if (fs.existsSync(vercelConfigPath)) {
    try {
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      const redirects = vercelConfig.redirects || [];
      
      // Check for path redirects before host redirects (which cause 2-hop chains)
      let foundPathRedirect = false;
      let pathRedirectRule = null;
      for (const rule of redirects) {
        if (!rule.has && rule.source) {
          foundPathRedirect = true;
          pathRedirectRule = rule;
        }
        if (foundPathRedirect && rule.has && rule.has.some(h => h.type === 'host')) {
          report.redirectChains.push({
            type: 'CHAIN_ORDER_RISK',
            rule: pathRedirectRule,
            message: `Path redirect ${pathRedirectRule.source} is evaluated before host redirect. Requests on old domains or non-canonical hosts to this path will trigger a 2-hop redirect chain.`
          });
          break;
        }
      }

      // Check destination absolute consistency
      for (const rule of redirects) {
        if (rule.destination && !rule.destination.startsWith('http') && !rule.has) {
          report.warnings.push({
            type: 'RELATIVE_REDIRECT_DESTINATION',
            source: rule.source,
            destination: rule.destination,
            message: `Redirect destination is relative (${rule.destination}); recommend absolute ${CANONICAL_ORIGIN}${rule.destination} to avoid protocol/host chains.`
          });
        }
      }
    } catch (e) {
      report.warnings.push({ type: 'VERCEL_CONFIG_PARSE_ERROR', message: e.message });
    }
  }

  // 4. Audit Pre-rendered HTML Pages in dist
  console.log('4️⃣ Auditing Pre-rendered HTML Pages & DOM...');
  const htmlFiles = getHtmlFiles(distDir);
  report.summary.totalHtmlFiles = htmlFiles.length;
  console.log(`   Found ${htmlFiles.length} HTML files in dist/`);

  const routeToFileMap = new Map();
  const pageMetadata = new Map();
  const internalGraph = new Map(); // route -> Set of target routes

  for (const filePath of htmlFiles) {
    const relative = path.relative(distDir, filePath).replace(/\\/g, '/');
    let route;
    if (relative === 'index.html') {
      route = '/';
    } else if (relative === '404.html') {
      route = '/404';
    } else if (relative.endsWith('/index.html')) {
      route = '/' + relative.replace(/\/index\.html$/, '');
    } else {
      route = '/' + relative.replace(/\.html$/, '');
    }

    routeToFileMap.set(route, filePath);
    internalGraph.set(route, new Set());

    const html = fs.readFileSync(filePath, 'utf8');

    // Title
    const titleMatches = [...html.matchAll(/<title[^>]*>(.*?)<\/title>/gis)];
    const title = titleMatches.length > 0 ? titleMatches[titleMatches.length - 1][1].trim() : null;

    // Meta Robots
    const robotsMatches = [...html.matchAll(/<meta[^>]*name=["']robots["'][^>]*content=["'](.*?)["']/gis)];
    const robotsReverseMatches = [...html.matchAll(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']robots["']/gis)];
    const allRobotsContent = [...robotsMatches.map(m => m[1]), ...robotsReverseMatches.map(m => m[1])].join(', ').toLowerCase();
    
    const isNoindex = allRobotsContent.includes('noindex');

    // Canonical
    const canonicalMatches = [...html.matchAll(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/gis)];
    const canonicalReverseMatches = [...html.matchAll(/<link[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/gis)];
    const allCanonicals = [...canonicalMatches.map(m => m[1].trim()), ...canonicalReverseMatches.map(m => m[1].trim())];

    // Check duplicate canonical tags
    const uniqueCanonicalsOnPage = Array.from(new Set(allCanonicals));
    if (uniqueCanonicalsOnPage.length > 1) {
      report.duplicateCanonicals.push({
        route,
        canonicals: uniqueCanonicalsOnPage,
        message: `Multiple conflicting canonical tags on ${route}: ${uniqueCanonicalsOnPage.join(', ')}`
      });
    }

    const primaryCanonical = uniqueCanonicalsOnPage[0] || null;

    // Description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/is);
    const description = descMatch ? descMatch[1].trim() : null;

    // Body content length inside #root
    const rootStart = html.indexOf('<div id="root">');
    const rootEnd = html.indexOf('</body>');
    const rootContent = (rootStart !== -1 && rootEnd !== -1) ? html.substring(rootStart, rootEnd) : '';
    const rootLength = rootContent.length;

    // Check H1
    const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)];

    pageMetadata.set(route, {
      route,
      filePath,
      title,
      description,
      isNoindex,
      canonical: primaryCanonical,
      allCanonicals: uniqueCanonicalsOnPage,
      rootLength,
      h1Count: h1Matches.length,
      html
    });

    if (isNoindex) {
      report.noindexPages.push({
        route,
        title,
        canonical: primaryCanonical
      });
      // 404 / noindex page having a canonical to homepage is a soft 404 risk!
      if (primaryCanonical && (primaryCanonical === `${CANONICAL_ORIGIN}/` || primaryCanonical === CANONICAL_ORIGIN) && route !== '/') {
        report.warnings.push({
          type: 'NOINDEX_CANONICAL_TO_ROOT',
          route,
          canonical: primaryCanonical,
          message: `Page ${route} has noindex but canonical points to homepage (${primaryCanonical}). This can trigger soft-404 duplicate flags.`
        });
      }
    } else {
      report.indexablePages.push({
        route,
        title,
        canonical: primaryCanonical,
        rootLength
      });

      // Indexable page must have canonical
      const expectedCanonical = CANONICAL_ORIGIN + (route === '/' ? '/' : route);
      if (!primaryCanonical) {
        report.sitemapInconsistencies.push({
          type: 'MISSING_CANONICAL',
          route,
          message: `Indexable page ${route} is missing a rel="canonical" link.`
        });
      } else if (primaryCanonical !== expectedCanonical) {
        report.sitemapInconsistencies.push({
          type: 'CANONICAL_MISMATCH',
          route,
          found: primaryCanonical,
          expected: expectedCanonical,
          message: `Canonical mismatch on ${route}: found "${primaryCanonical}", expected "${expectedCanonical}"`
        });
      }

      // Check content completeness
      if (rootLength < 300) {
        report.statusErrors.push({
          type: 'INCOMPLETE_HTML',
          route,
          rootLength,
          message: `Indexable page ${route} has very small rendered HTML content (${rootLength} chars)`
        });
      }
    }
  }

  report.summary.indexablePages = report.indexablePages.length;
  report.summary.noindexPages = report.noindexPages.length;

  // 5. Audit Internal Links & Graph
  console.log('5️⃣ Auditing Internal Links & Click Depth Graph...');
  for (const [route, meta] of pageMetadata.entries()) {
    const html = meta.html;
    // Match all <a href="...">
    const linkRegex = /<a\s+[^>]*href=["'](.*?)["']/gis;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(html)) !== null) {
      const rawHref = linkMatch[1].trim();

      // Ignore anchor only, javascript, tel, mailto, whatsapp
      if (
        !rawHref ||
        rawHref.startsWith('#') ||
        rawHref.startsWith('javascript:') ||
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') ||
        rawHref.startsWith('https://wa.me')
      ) {
        continue;
      }

      // Check if external link points to old domain or non-canonical
      if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
        for (const oldDomain of OLD_DOMAINS) {
          if (rawHref.includes(`://${oldDomain}`) && !rawHref.includes('connect.gyanvaniai.online') && !rawHref.includes('api.gyanvaniai.online')) {
            report.warnings.push({
              type: 'OUTDATED_DOMAIN_LINK',
              sourceRoute: route,
              href: rawHref,
              message: `Link on ${route} points to old domain: ${rawHref}`
            });
          }
        }
        // If external link to own domain, convert to route
        if (rawHref.startsWith(CANONICAL_ORIGIN)) {
          const pathOnly = rawHref.replace(CANONICAL_ORIGIN, '') || '/';
          const targetRoute = normalizeRoute(pathOnly);
          internalGraph.get(route).add(targetRoute);
        }
        continue;
      }

      // Relative or absolute internal link
      const targetRoute = normalizeRoute(rawHref);

      // Record in graph
      if (internalGraph.has(route)) {
        internalGraph.get(route).add(targetRoute);
      }

      // Validate target route exists in dist
      // Exclude hash anchors like /#contact or /#capabilities (they land on /)
      if (!routeToFileMap.has(targetRoute)) {
        // Special case: check if targetRoute is /admin/... and admin routes are SPA routes
        const isClientOnlyRoute = targetRoute.startsWith('/admin') || targetRoute.startsWith('/category');
        if (!isClientOnlyRoute) {
          report.brokenInternalLinks.push({
            sourceRoute: route,
            href: rawHref,
            targetRoute,
            message: `Broken internal link on ${route} -> ${rawHref} (Target route ${targetRoute} does not exist in build output)`
          });
        }
      }

      // Check for links to known redirect source
      if (rawHref.includes('/services/whatsapp-calling-agent-bots')) {
        report.warnings.push({
          type: 'LINK_TO_REDIRECT_SOURCE',
          sourceRoute: route,
          href: rawHref,
          message: `Link on ${route} points to redirect source ${rawHref} instead of canonical /services/whatsapp-calling-agent`
        });
      }
    }
  }

  // 6. BFS to Compute Internal Click Depths & Orphan Detection
  console.log('6️⃣ Calculating Click Depths & Orphan Detection from Homepage...');
  const depths = new Map();
  const queue = ['/'];
  depths.set('/', 0);

  while (queue.length > 0) {
    const current = queue.shift();
    const currentDepth = depths.get(current);
    const neighbors = internalGraph.get(current) || new Set();

    for (const neighbor of neighbors) {
      if (!depths.has(neighbor) && routeToFileMap.has(neighbor)) {
        depths.set(neighbor, currentDepth + 1);
        queue.push(neighbor);
      }
    }
  }

  // Inbound link count for each route
  const inboundCount = new Map();
  for (const route of routeToFileMap.keys()) {
    inboundCount.set(route, 0);
  }
  for (const targets of internalGraph.values()) {
    for (const target of targets) {
      if (inboundCount.has(target)) {
        inboundCount.set(target, inboundCount.get(target) + 1);
      }
    }
  }

  // Identify Orphan Candidates among indexable pages
  for (const page of report.indexablePages) {
    const route = page.route;
    const count = inboundCount.get(route) || 0;
    const depth = depths.has(route) ? depths.get(route) : -1;
    report.internalClickDepths[route] = depth;

    if (route !== '/' && (count === 0 || depth === -1)) {
      report.orphanCandidates.push({
        route,
        title: page.title,
        inboundLinks: count,
        clickDepth: depth,
        message: depth === -1
          ? `Orphan candidate: ${route} is indexable but unreachable from homepage navigation graph.`
          : `Orphan candidate: ${route} has 0 inbound internal links.`
      });
    }
  }

  // 7. Cross-reference Sitemap vs Indexable Pages
  console.log('7️⃣ Cross-referencing Sitemap with Pre-rendered Indexable Pages...');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const sitemapUrls = parseSitemap(sitemapContent);
    const sitemapRouteSet = new Set(sitemapUrls.map(u => normalizeRoute(u.replace(CANONICAL_ORIGIN, ''))));

    // Check indexable pages not in sitemap
    for (const page of report.indexablePages) {
      if (!sitemapRouteSet.has(page.route)) {
        report.sitemapInconsistencies.push({
          type: 'INDEXABLE_NOT_IN_SITEMAP',
          route: page.route,
          message: `Indexable page ${page.route} exists in build output but is missing from sitemap.xml`
        });
      }
    }

    // Check sitemap URLs that don't exist in dist or are 404
    for (const url of sitemapUrls) {
      const route = normalizeRoute(url.replace(CANONICAL_ORIGIN, ''));
      if (!routeToFileMap.has(route)) {
        report.sitemapInconsistencies.push({
          type: 'SITEMAP_URL_MISSING_IN_BUILD',
          url,
          route,
          message: `Sitemap URL ${url} is declared in sitemap.xml but has no pre-rendered HTML file in dist/`
        });
      }
    }
  }

  // Populate Summary
  report.summary.duplicateCanonicalsCount = report.duplicateCanonicals.length;
  report.summary.brokenInternalLinksCount = report.brokenInternalLinks.length;
  report.summary.redirectChainsCount = report.redirectChains.length;
  report.summary.orphanCandidatesCount = report.orphanCandidates.length;
  report.summary.issuesCount =
    report.duplicateCanonicals.length +
    report.brokenInternalLinks.length +
    report.redirectChains.length +
    report.statusErrors.length +
    report.sitemapInconsistencies.length +
    report.orphanCandidates.length;

  // Print Summary
  console.log('\n======================================================================');
  console.log('   📊 GYAN VANIAI INDEXING-READINESS AUDIT SUMMARY');
  console.log('======================================================================');
  console.log(`✅ Pre-rendered Pages Audited:    ${report.summary.totalHtmlFiles}`);
  console.log(`✅ Indexable Pages:               ${report.summary.indexablePages}`);
  console.log(`🔒 Noindex / Utility Pages:       ${report.summary.noindexPages}`);
  console.log(`🗺️ Sitemap URLs:                 ${report.summary.sitemapUrls}`);
  console.log(`⚠️  Duplicate Canonicals:          ${report.summary.duplicateCanonicalsCount}`);
  console.log(`❌ Broken Internal Links:         ${report.summary.brokenInternalLinksCount}`);
  console.log(`🔄 Redirect Chain Risks:          ${report.summary.redirectChainsCount}`);
  console.log(`🏝️  Orphan Candidates:            ${report.summary.orphanCandidatesCount}`);
  console.log(`🚨 Total Audit Issues Found:      ${report.summary.issuesCount}`);
  console.log('======================================================================\n');

  if (report.brokenInternalLinks.length > 0) {
    console.log('❌ BROKEN INTERNAL LINKS:');
    report.brokenInternalLinks.forEach(b => console.log(`   - [${b.sourceRoute}] -> ${b.href}`));
    console.log('');
  }

  if (report.duplicateCanonicals.length > 0) {
    console.log('⚠️  DUPLICATE CANONICALS:');
    report.duplicateCanonicals.forEach(d => console.log(`   - ${d.route}: ${d.canonicals.join(', ')}`));
    console.log('');
  }

  if (report.redirectChains.length > 0) {
    console.log('🔄 REDIRECT CHAINS:');
    report.redirectChains.forEach(r => console.log(`   - ${r.message}`));
    console.log('');
  }

  if (report.orphanCandidates.length > 0) {
    console.log('🏝️  ORPHAN CANDIDATES:');
    report.orphanCandidates.forEach(o => console.log(`   - ${o.route} (inbound links: ${o.inboundLinks}, depth: ${o.clickDepth})`));
    console.log('');
  }

  if (report.sitemapInconsistencies.length > 0) {
    console.log('🗺️ SITEMAP INCONSISTENCIES:');
    report.sitemapInconsistencies.forEach(s => console.log(`   - [${s.type}] ${s.message}`));
    console.log('');
  }

  // Save report to file
  const reportPath = path.resolve(rootDir, 'indexing-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`📄 Comprehensive report saved to: indexing-audit-report.json\n`);

  return report;
}

const auditResult = runAudit();
process.exit(auditResult.summary.issuesCount > 0 ? 1 : 0);
