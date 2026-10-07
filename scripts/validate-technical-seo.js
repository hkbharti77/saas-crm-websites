/**
 * Deep Technical SEO Validation Suite: Canonical, Hreflang, and Schema.org
 * Validates pre-rendered HTML in dist/ against Google Search Central guidelines.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const CANONICAL_ORIGIN = 'https://www.gyanvaniai.com';

const report = {
  timestamp: new Date().toISOString(),
  canonicalOrigin: CANONICAL_ORIGIN,
  summary: {
    totalPagesAudited: 0,
    indexablePagesCount: 0,
    nonIndexablePagesCount: 0,
    canonicalIssuesCount: 0,
    hreflangIssuesCount: 0,
    schemaIssuesCount: 0,
    duplicateSchemasCount: 0,
    totalErrorsCount: 0
  },
  canonicalAudit: {
    valid: [],
    issues: []
  },
  hreflangAudit: {
    status: 'PASS',
    declaredAlternates: [],
    issues: []
  },
  schemaAudit: {
    detectedTypesSummary: {},
    issues: [],
    detailsByRoute: {}
  }
};

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== 'assets') {
        getAllHtmlFiles(fullPath, fileList);
      }
    } else if (item.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function filePathToRoute(filePath) {
  const relative = path.relative(distDir, filePath).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) {
    return '/' + relative.replace('/index.html', '');
  }
  return '/' + relative.replace('.html', '');
}

function extractMetaRobots(html) {
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  return robotsMatch ? robotsMatch[1].toLowerCase() : '';
}

function extractCanonical(html) {
  const matches = [];
  const regex = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function extractHreflangs(html) {
  const hreflangs = [];
  const regex = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    hreflangs.push({ lang: match[1], href: match[2] });
  }
  // Alternate ordering: href before hreflang
  const regex2 = /<link[^>]*href=["']([^"']*)["'][^>]*hreflang=["']([^"']*)["'][^>]*>/gi;
  while ((match = regex2.exec(html)) !== null) {
    if (!hreflangs.some(h => h.href === match[1] && h.lang === match[2])) {
      hreflangs.push({ lang: match[2], href: match[1] });
    }
  }
  return hreflangs;
}

function extractJsonLdScripts(html) {
  const scripts = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      scripts.push(parsed);
    } catch (err) {
      scripts.push({ __parseError: err.message, raw: match[1].slice(0, 200) });
    }
  }
  return scripts;
}

console.log('======================================================================');
console.log('   🔍 DEEP TECHNICAL SEO AUDIT: CANONICAL, HREFLANG & SCHEMA.ORG');
console.log('   Canonical Origin: ' + CANONICAL_ORIGIN);
console.log('======================================================================\n');

const htmlFiles = getAllHtmlFiles(distDir);
report.summary.totalPagesAudited = htmlFiles.length;
console.log(`Auditing ${htmlFiles.length} pre-rendered HTML files in dist/...\n`);

const known404OrRedirectRoutes = new Set([
  '/404',
  '/services/whatsapp-calling-agent-bots',
  '/admin/login',
  '/admin/dashboard',
  '/admin/create'
]);

// 1. CANONICAL AUDIT
console.log('1️⃣ Auditing Canonical URLs...');
for (const file of htmlFiles) {
  const route = filePathToRoute(file);
  const html = fs.readFileSync(file, 'utf8');
  const robots = extractMetaRobots(html);
  const isNoindex = robots.includes('noindex');
  const canonicals = extractCanonical(html);

  if (isNoindex) {
    report.summary.nonIndexablePagesCount++;
    if (canonicals.length > 0) {
      report.canonicalAudit.issues.push({
        route,
        issue: 'Non-indexable page emits a canonical link tag',
        canonicals
      });
      report.summary.canonicalIssuesCount++;
    }
  } else {
    report.summary.indexablePagesCount++;
    // Requirement 1: Exactly one canonical URL
    if (canonicals.length === 0) {
      report.canonicalAudit.issues.push({
        route,
        issue: 'Indexable page is missing a canonical link tag'
      });
      report.summary.canonicalIssuesCount++;
    } else if (canonicals.length > 1) {
      report.canonicalAudit.issues.push({
        route,
        issue: 'Multiple canonical tags found on page',
        canonicals
      });
      report.summary.canonicalIssuesCount++;
    } else {
      const canonical = canonicals[0];
      // Requirement 2: Must use HTTPS
      if (!canonical.startsWith('https://')) {
        report.canonicalAudit.issues.push({
          route,
          issue: 'Canonical does not use HTTPS',
          canonical
        });
        report.summary.canonicalIssuesCount++;
      }
      // Requirement 3: Must use www.gyanvaniai.com
      if (!canonical.startsWith(CANONICAL_ORIGIN)) {
        report.canonicalAudit.issues.push({
          route,
          issue: `Canonical origin does not match preferred host ${CANONICAL_ORIGIN}`,
          canonical
        });
        report.summary.canonicalIssuesCount++;
      }
      // Requirement 4: Must represent actual preferred URL
      const expectedCanonical = route === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${route}`;
      if (canonical !== expectedCanonical) {
        report.canonicalAudit.issues.push({
          route,
          issue: `Canonical mismatch: expected ${expectedCanonical}, found ${canonical}`,
          canonical,
          expectedCanonical
        });
        report.summary.canonicalIssuesCount++;
      }
      // Requirement 6: Detect canonical pointing to redirects, 404s, or non-indexable
      const canonicalPath = canonical.replace(CANONICAL_ORIGIN, '') || '/';
      if (known404OrRedirectRoutes.has(canonicalPath)) {
        report.canonicalAudit.issues.push({
          route,
          issue: `Canonical points to redirect or non-indexable utility route: ${canonicalPath}`,
          canonical
        });
        report.summary.canonicalIssuesCount++;
      }

      report.canonicalAudit.valid.push({ route, canonical });
    }
  }
}

// 2. HREFLANG AUDIT
console.log('2️⃣ Auditing Hreflang Tags...');
for (const file of htmlFiles) {
  const route = filePathToRoute(file);
  const html = fs.readFileSync(file, 'utf8');
  const hreflangs = extractHreflangs(html);

  if (hreflangs.length > 0) {
    report.hreflangAudit.declaredAlternates.push({ route, hreflangs });
    // Check if declared alternates point to real files
    for (const alt of hreflangs) {
      if (alt.href.startsWith(CANONICAL_ORIGIN)) {
        const altPath = alt.href.replace(CANONICAL_ORIGIN, '') || '/';
        const targetHtml = altPath === '/' ? path.join(distDir, 'index.html') : path.join(distDir, altPath, 'index.html');
        if (!fs.existsSync(targetHtml)) {
          report.hreflangAudit.issues.push({
            route,
            issue: `Alternate URL does not exist: ${alt.href}`,
            lang: alt.lang
          });
          report.summary.hreflangIssuesCount++;
        }
      }
      // Validate language code
      if (!/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/.test(alt.lang) && alt.lang !== 'x-default') {
        report.hreflangAudit.issues.push({
          route,
          issue: `Invalid language-region code: ${alt.lang}`,
          href: alt.href
        });
        report.summary.hreflangIssuesCount++;
      }
    }
  }
}

// Check lang attribute on html tag & obsolete GEO tags
for (const file of htmlFiles) {
  const route = filePathToRoute(file);
  const html = fs.readFileSync(file, 'utf8');
  const langMatch = html.match(/<html[^>]*lang=["']([^"']*)["'][^>]*>/i);
  if (!langMatch || !langMatch[1]) {
    report.hreflangAudit.issues.push({
      route,
      issue: 'HTML tag missing lang attribute'
    });
    report.summary.hreflangIssuesCount++;
  }

  // Detect obsolete/fake geo coordinate meta tags
  if (/<meta\s+name=["'](geo\.position|ICBM)["']/i.test(html)) {
    report.canonicalAudit.issues.push({
      route,
      issue: 'Obsolete/fake geo coordinates meta tag detected (geo.position or ICBM)',
    });
    report.summary.canonicalIssuesCount++;
  }

  // Verify stable crawler HTML for homepage CTA (proves no client-side geolocation dependency)
  if (route === '/' && !html.includes('Book a Demo')) {
    report.canonicalAudit.issues.push({
      route,
      issue: 'Crawler HTML missing stable canonical CTA "Book a Demo" - potential client-side geolocation dependency',
    });
    report.summary.canonicalIssuesCount++;
  }
}

// 3. SCHEMA.ORG AUDIT
console.log('3️⃣ Auditing Schema.org Structured Data...');

for (const file of htmlFiles) {
  const route = filePathToRoute(file);
  const html = fs.readFileSync(file, 'utf8');
  const parsedJsonLds = extractJsonLdScripts(html);

  const flatSchemas = [];
  for (const block of parsedJsonLds) {
    if (block.__parseError) {
      report.schemaAudit.issues.push({
        route,
        issue: 'Malformed JSON-LD script tag',
        error: block.__parseError,
        raw: block.raw
      });
      report.summary.schemaIssuesCount++;
      continue;
    }
    if (Array.isArray(block)) {
      flatSchemas.push(...block);
    } else {
      flatSchemas.push(block);
    }
  }

  // Count types on this page
  const typeCounts = {};
  for (const schema of flatSchemas) {
    const rawType = schema['@type'];
    const types = Array.isArray(rawType) ? rawType : [rawType];
    for (const t of types) {
      if (!t) continue;
      typeCounts[t] = (typeCounts[t] || 0) + 1;
      report.schemaAudit.detectedTypesSummary[t] = (report.schemaAudit.detectedTypesSummary[t] || 0) + 1;
    }
  }

  // Detect duplicate BreadcrumbLists
  if ((typeCounts['BreadcrumbList'] || 0) > 1) {
    report.schemaAudit.issues.push({
      route,
      issue: `Duplicate BreadcrumbList schemas detected on page: ${typeCounts['BreadcrumbList']} instances`,
      type: 'BreadcrumbList'
    });
    report.summary.duplicateSchemasCount++;
    report.summary.schemaIssuesCount++;
  }

  // Detect duplicate FAQPages
  if ((typeCounts['FAQPage'] || 0) > 1) {
    report.schemaAudit.issues.push({
      route,
      issue: `Duplicate FAQPage schemas detected on page: ${typeCounts['FAQPage']} instances`,
      type: 'FAQPage'
    });
    report.summary.duplicateSchemasCount++;
    report.summary.schemaIssuesCount++;
  }

  // Deep validation per schema instance
  for (const schema of flatSchemas) {
    const rawType = schema['@type'];
    const types = Array.isArray(rawType) ? rawType : [rawType];

    // Check Context
    if (schema['@context'] !== 'https://schema.org' && schema['@context'] !== 'http://schema.org') {
      report.schemaAudit.issues.push({
        route,
        issue: `Invalid schema @context: expected https://schema.org, found ${schema['@context']}`,
        schemaType: rawType
      });
      report.summary.schemaIssuesCount++;
    }

    // Validate BreadcrumbList
    if (types.includes('BreadcrumbList')) {
      if (!Array.isArray(schema.itemListElement) || schema.itemListElement.length === 0) {
        report.schemaAudit.issues.push({
          route,
          issue: 'BreadcrumbList missing itemListElement array'
        });
        report.summary.schemaIssuesCount++;
      } else {
        for (let idx = 0; idx < schema.itemListElement.length; idx++) {
          const item = schema.itemListElement[idx];
          if (!item.name) {
            report.schemaAudit.issues.push({
              route,
              issue: `BreadcrumbList item at position ${idx + 1} missing name`
            });
            report.summary.schemaIssuesCount++;
          }
          if (item.item && typeof item.item === 'string') {
            if (item.item.includes('#')) {
              report.schemaAudit.issues.push({
                route,
                issue: `BreadcrumbList item at position ${idx + 1} contains hash fragment URL: ${item.item}`,
                itemUrl: item.item
              });
              report.summary.schemaIssuesCount++;
            }
          }
        }
      }
    }

    // Validate FAQPage
    if (types.includes('FAQPage')) {
      if (!Array.isArray(schema.mainEntity) || schema.mainEntity.length === 0) {
        report.schemaAudit.issues.push({
          route,
          issue: 'FAQPage missing mainEntity array'
        });
        report.summary.schemaIssuesCount++;
      } else {
        for (const q of schema.mainEntity) {
          if (!q.name) {
            report.schemaAudit.issues.push({
              route,
              issue: 'FAQ Question missing name (question text)'
            });
            report.summary.schemaIssuesCount++;
          }
          if (!q.acceptedAnswer || !q.acceptedAnswer.text) {
            report.schemaAudit.issues.push({
              route,
              issue: `FAQ Question "${q.name}" missing acceptedAnswer.text`
            });
            report.summary.schemaIssuesCount++;
          }
        }
      }
    }

    // Validate Organization
    if (types.includes('Organization')) {
      if (!schema.name) {
        report.schemaAudit.issues.push({ route, issue: 'Organization missing name' });
        report.summary.schemaIssuesCount++;
      }
      if (!schema.url) {
        report.schemaAudit.issues.push({ route, issue: 'Organization missing url' });
        report.summary.schemaIssuesCount++;
      }
      // Check for fake local-business signals
      if (types.includes('LocalBusiness') || types.includes('ProfessionalService')) {
        report.schemaAudit.issues.push({
          route,
          issue: 'Fake local-business signal detected: Organization should not claim LocalBusiness/ProfessionalService without a physical storefront',
        });
        report.summary.schemaIssuesCount++;
      }
      // Check legitimate international targeting
      if (!schema.areaServed || !Array.isArray(schema.areaServed) || schema.areaServed.length === 0) {
        report.schemaAudit.issues.push({
          route,
          issue: 'Organization missing areaServed international targeting array',
        });
        report.summary.schemaIssuesCount++;
      }
      // Check social profiles in sameAs
      if (Array.isArray(schema.sameAs)) {
        for (const social of schema.sameAs) {
          if (social.includes('twitter.com') || social.includes('x.com')) {
            report.schemaAudit.issues.push({
              route,
              issue: `Unverified/placeholder social profile in Organization sameAs: ${social}`,
              social
            });
            report.summary.schemaIssuesCount++;
          }
        }
      }
      // Check serviceArea for Null Island (0,0)
      if (schema.serviceArea && schema.serviceArea.geoMidpoint) {
        const lat = String(schema.serviceArea.geoMidpoint.latitude);
        const lon = String(schema.serviceArea.geoMidpoint.longitude);
        if (lat === '0' && lon === '0') {
          report.schemaAudit.issues.push({
            route,
            issue: 'Contradictory/placeholder Null Island coordinates (0,0) in serviceArea'
          });
          report.summary.schemaIssuesCount++;
        }
      }
    }

    // Validate WebSite & SearchAction
    if (types.includes('WebSite')) {
      if (!schema.name || !schema.url) {
        report.schemaAudit.issues.push({ route, issue: 'WebSite missing name or url' });
        report.summary.schemaIssuesCount++;
      }
      if (schema.potentialAction) {
        const action = schema.potentialAction;
        if (action['@type'] === 'SearchAction') {
          const template = action.target?.urlTemplate || (typeof action.target === 'string' ? action.target : '');
          if (!template) {
            report.schemaAudit.issues.push({ route, issue: 'SearchAction missing urlTemplate' });
            report.summary.schemaIssuesCount++;
          } else if (template.includes('/blog?search=')) {
            report.schemaAudit.issues.push({
              route,
              issue: `SearchAction urlTemplate points to unhandled query param (/blog?search= instead of /blog/search?q=): ${template}`
            });
            report.summary.schemaIssuesCount++;
          }
        }
      }
    }

    // Validate Service
    if (types.includes('Service')) {
      if (!schema.name) {
        report.schemaAudit.issues.push({ route, issue: 'Service schema missing name' });
        report.summary.schemaIssuesCount++;
      }
      if (!schema.provider) {
        report.schemaAudit.issues.push({ route, issue: 'Service schema missing provider' });
        report.summary.schemaIssuesCount++;
      }
    }

    // Validate Article / BlogPosting / TechArticle
    if (types.includes('Article') || types.includes('BlogPosting') || types.includes('TechArticle')) {
      if (!schema.headline) {
        report.schemaAudit.issues.push({ route, issue: `${types.join(',')} missing headline` });
        report.summary.schemaIssuesCount++;
      }
      if (!schema.image) {
        report.schemaAudit.issues.push({ route, issue: `${types.join(',')} missing image` });
        report.summary.schemaIssuesCount++;
      }
      if (!schema.author) {
        report.schemaAudit.issues.push({ route, issue: `${types.join(',')} missing author` });
        report.summary.schemaIssuesCount++;
      }
      if (!schema.publisher) {
        report.schemaAudit.issues.push({ route, issue: `${types.join(',')} missing publisher` });
        report.summary.schemaIssuesCount++;
      }
      if (!schema.datePublished) {
        report.schemaAudit.issues.push({ route, issue: `${types.join(',')} missing datePublished` });
        report.summary.schemaIssuesCount++;
      }
    }

    // Validate Product / Offers
    if (types.includes('Product')) {
      if (!schema.name) {
        report.schemaAudit.issues.push({ route, issue: 'Product schema missing name' });
        report.summary.schemaIssuesCount++;
      }
      if (!schema.offers) {
        report.schemaAudit.issues.push({ route, issue: 'Product schema missing offers' });
        report.summary.schemaIssuesCount++;
      } else {
        const offers = schema.offers.offers || (Array.isArray(schema.offers) ? schema.offers : [schema.offers]);
        for (const off of offers) {
          if (off.priceCurrency && off.priceCurrency !== 'INR') {
            report.schemaAudit.issues.push({
              route,
              issue: `Misleading pricing currency in structured data: ${off.priceCurrency} (must match canonical INR baseline)`,
            });
            report.summary.schemaIssuesCount++;
          }
        }
      }
    }
  }

  report.schemaAudit.detailsByRoute[route] = {
    totalSchemas: flatSchemas.length,
    types: typeCounts
  };
}

report.summary.totalErrorsCount = 
  report.summary.canonicalIssuesCount +
  report.summary.hreflangIssuesCount +
  report.summary.schemaIssuesCount;

console.log('======================================================================');
console.log('   📊 TECHNICAL SEO VALIDATION SUMMARY');
console.log('======================================================================');
console.log(`✅ Total HTML Pages Audited:      ${report.summary.totalPagesAudited}`);
console.log(`✅ Indexable Pages:               ${report.summary.indexablePagesCount}`);
console.log(`🔒 Non-indexable / Error Pages:   ${report.summary.nonIndexablePagesCount}`);
console.log(`🔗 Canonical Issues Found:        ${report.summary.canonicalIssuesCount}`);
console.log(`🌐 Hreflang Issues Found:         ${report.summary.hreflangIssuesCount}`);
console.log(`📜 Schema.org Issues Found:       ${report.summary.schemaIssuesCount}`);
console.log(`⚠️  Duplicate Schemas Found:       ${report.summary.duplicateSchemasCount}`);
console.log(`🚨 Total Errors:                  ${report.summary.totalErrorsCount}`);
console.log('======================================================================\n');

console.log('Detected Schema Types Distribution:');
for (const [type, count] of Object.entries(report.schemaAudit.detectedTypesSummary).sort((a,b) => b[1] - a[1])) {
  console.log(`  - ${type.padEnd(28)} : ${count}`);
}

const outputPath = path.resolve(rootDir, 'technical-seo-audit-report.json');
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`\n📄 Detailed audit report written to: ${path.basename(outputPath)}\n`);

if (report.summary.totalErrorsCount > 0) {
  console.error(`❌ Validation failed with ${report.summary.totalErrorsCount} issue(s):`);
  const allIssues = [
    ...report.canonicalAudit.issues,
    ...report.hreflangAudit.issues,
    ...report.schemaAudit.issues
  ];
  for (const issue of allIssues.slice(0, 15)) {
    console.error(`   - [${issue.route || 'Global'}] ${issue.issue}`);
  }
  process.exit(1);
} else {
  console.log('🎉 100% TECHNICAL SEO VALIDATION PASSED: 0 ERRORS DETECTED!\n');
  process.exit(0);
}
