/**
 * Automated SEO Health Monitor
 * Checks critical SEO factors and generates reports
 * Run weekly via cron or CI/CD pipeline
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.gyanvaniai.online';
const CRITICAL_PAGES = [
  '/',
  '/about',
  '/blog',
  '/services/whatsapp-coexistence',
  '/services/crm-development',
  '/services/ai-chatbots',
  '/services/sales-automation',
  '/services/lead-management'
];

const checks = {
  passed: [],
  warnings: [],
  errors: []
};

console.log('🔍 SEO Health Monitor Starting...\n');
console.log('=' .repeat(60));

// Check 1: Verify sitemap exists
console.log('\n📋 Checking Sitemap...');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  checks.passed.push(`✓ Sitemap exists with ${urlCount} URLs`);
  console.log(`  ✓ Sitemap found: ${urlCount} URLs`);
  
  // Check if all critical pages are in sitemap
  CRITICAL_PAGES.forEach(page => {
    const fullUrl = BASE_URL + page;
    if (!sitemap.includes(fullUrl)) {
      checks.errors.push(`✗ Critical page missing from sitemap: ${page}`);
      console.log(`  ✗ Missing: ${page}`);
    }
  });
} else {
  checks.errors.push('✗ sitemap.xml not found');
  console.log('  ✗ sitemap.xml not found');
}

// Check 2: Verify robots.txt
console.log('\n🤖 Checking robots.txt...');
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  checks.passed.push('✓ robots.txt exists');
  console.log('  ✓ robots.txt found');
  
  // Check for sitemap reference
  if (robots.includes('Sitemap:')) {
    checks.passed.push('✓ Sitemap URL in robots.txt');
    console.log('  ✓ Sitemap URL present');
  } else {
    checks.warnings.push('⚠ Sitemap URL missing from robots.txt');
    console.log('  ⚠ Sitemap URL missing');
  }
  
  // Check for major search engines
  const searchEngines = ['Googlebot', 'Bingbot', 'Yandex', 'DuckDuckBot', 'Baiduspider'];
  searchEngines.forEach(bot => {
    if (robots.includes(bot)) {
      checks.passed.push(`✓ ${bot} directive present`);
    }
  });
} else {
  checks.errors.push('✗ robots.txt not found');
  console.log('  ✗ robots.txt not found');
}

// Check 3: Verify IndexNow key file
console.log('\n🔑 Checking IndexNow Key...');
const indexNowKeyPath = path.join(__dirname, '../public/e58f9214b74a49c693a19b88c42ef84a.txt');
if (fs.existsSync(indexNowKeyPath)) {
  checks.passed.push('✓ IndexNow key file exists');
  console.log('  ✓ IndexNow key file found');
} else {
  checks.warnings.push('⚠ IndexNow key file missing');
  console.log('  ⚠ IndexNow key file missing');
}

// Check 4: Verify favicon and icons
console.log('\n🖼️ Checking Favicons and Icons...');
const iconFiles = [
  'favicon.ico',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest'
];

iconFiles.forEach(file => {
  const iconPath = path.join(__dirname, '../public', file);
  if (fs.existsSync(iconPath)) {
    checks.passed.push(`✓ ${file} exists`);
    console.log(`  ✓ ${file}`);
  } else {
    checks.warnings.push(`⚠ ${file} missing`);
    console.log(`  ⚠ ${file} missing`);
  }
});

// Check 5: Verify llms.txt for AI search engines
console.log('\n🤖 Checking AI Search Engine Optimization...');
const llmsPath = path.join(__dirname, '../public/llms.txt');
if (fs.existsSync(llmsPath)) {
  const llms = fs.readFileSync(llmsPath, 'utf8');
  checks.passed.push('✓ llms.txt exists');
  console.log('  ✓ llms.txt found');
  
  // Check if it has substantial content
  if (llms.length > 500) {
    checks.passed.push('✓ llms.txt has comprehensive content');
    console.log(`  ✓ Content size: ${llms.length} characters`);
  } else {
    checks.warnings.push('⚠ llms.txt content is minimal');
    console.log(`  ⚠ Content too short: ${llms.length} characters`);
  }
} else {
  checks.errors.push('✗ llms.txt not found (needed for ChatGPT, Perplexity, Claude)');
  console.log('  ✗ llms.txt not found');
}

// Check 6: Verify schema files
console.log('\n📊 Checking Schema.org Files...');
const schemaPath = path.join(__dirname, '../src/utils/schemas.js');
if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  checks.passed.push('✓ Schema definitions exist');
  console.log('  ✓ schemas.js found');
  
  // Check for important schema types
  const schemaTypes = [
    'organizationSchema',
    'websiteSchema',
    'serviceSchema',
    'articleSchema',
    'breadcrumbSchema',
    'faqSchema'
  ];
  
  schemaTypes.forEach(type => {
    if (schemaContent.includes(type)) {
      checks.passed.push(`✓ ${type} defined`);
      console.log(`  ✓ ${type}`);
    } else {
      checks.warnings.push(`⚠ ${type} missing`);
      console.log(`  ⚠ ${type} missing`);
    }
  });
} else {
  checks.errors.push('✗ schemas.js not found');
  console.log('  ✗ schemas.js not found');
}

// Check 7: Verify SEO helper utilities
console.log('\n🛠️ Checking SEO Utilities...');
const seoHelpersPath = path.join(__dirname, '../src/utils/seoHelpers.js');
if (fs.existsSync(seoHelpersPath)) {
  checks.passed.push('✓ SEO helpers exist');
  console.log('  ✓ seoHelpers.js found');
} else {
  checks.warnings.push('⚠ seoHelpers.js not found');
  console.log('  ⚠ seoHelpers.js not found');
}

// Check 8: Check for common SEO issues
console.log('\n⚠️  Common SEO Issues Check...');
const indexHtmlPath = path.join(__dirname, '../index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Check for meta tags
  if (indexHtml.includes('meta name="description"')) {
    checks.passed.push('✓ Meta description present in index.html');
    console.log('  ✓ Meta description found');
  } else {
    checks.errors.push('✗ Meta description missing');
    console.log('  ✗ Meta description missing');
  }
  
  if (indexHtml.includes('link rel="canonical"')) {
    checks.passed.push('✓ Canonical tag present');
    console.log('  ✓ Canonical tag found');
  } else {
    checks.warnings.push('⚠ Canonical tag missing in index.html');
    console.log('  ⚠ Canonical tag missing');
  }
  
  // Check for Open Graph tags
  if (indexHtml.includes('property="og:')) {
    checks.passed.push('✓ Open Graph tags present');
    console.log('  ✓ Open Graph tags found');
  } else {
    checks.errors.push('✗ Open Graph tags missing');
    console.log('  ✗ Open Graph tags missing');
  }
  
  // Check for Twitter Card tags
  if (indexHtml.includes('twitter:card')) {
    checks.passed.push('✓ Twitter Card tags present');
    console.log('  ✓ Twitter Card tags found');
  } else {
    checks.warnings.push('⚠ Twitter Card tags missing');
    console.log('  ⚠ Twitter Card tags missing');
  }
}

// Check 9: Package.json SEO scripts
console.log('\n📦 Checking npm Scripts...');
const packagePath = path.join(__dirname, '../package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const scripts = packageJson.scripts || {};
  
  if (scripts['seo:submit'] || scripts['postbuild']) {
    checks.passed.push('✓ SEO automation scripts configured');
    console.log('  ✓ SEO scripts found');
  } else {
    checks.warnings.push('⚠ SEO automation scripts not configured');
    console.log('  ⚠ SEO automation missing');
  }
}

// Generate Report
console.log('\n' + '='.repeat(60));
console.log('\n📊 SEO HEALTH REPORT SUMMARY\n');
console.log(`✅ Passed: ${checks.passed.length} checks`);
console.log(`⚠️  Warnings: ${checks.warnings.length} issues`);
console.log(`❌ Errors: ${checks.errors.length} critical issues\n`);

if (checks.errors.length > 0) {
  console.log('❌ CRITICAL ERRORS:');
  checks.errors.forEach(error => console.log(`  ${error}`));
  console.log('');
}

if (checks.warnings.length > 0) {
  console.log('⚠️  WARNINGS:');
  checks.warnings.forEach(warning => console.log(`  ${warning}`));
  console.log('');
}

// Calculate score
const totalChecks = checks.passed.length + checks.warnings.length + checks.errors.length;
const score = Math.round((checks.passed.length / totalChecks) * 100);

console.log(`🎯 SEO Health Score: ${score}/100\n`);

if (score >= 90) {
  console.log('🌟 Excellent! Your SEO setup is in great shape.');
} else if (score >= 75) {
  console.log('👍 Good! Address warnings to improve further.');
} else if (score >= 60) {
  console.log('⚠️  Fair. Several improvements needed.');
} else {
  console.log('❌ Poor. Urgent SEO improvements required.');
}

console.log('\n' + '='.repeat(60));
console.log('\n💡 RECOMMENDATIONS:\n');
console.log('1. Run "npm run seo:submit" after deploying changes');
console.log('2. Monitor Google Search Console weekly');
console.log('3. Check Bing Webmaster Tools monthly');
console.log('4. Update sitemap when adding new pages');
console.log('5. Test Core Web Vitals with PageSpeed Insights');
console.log('6. Verify structured data with Google Rich Results Test');
console.log('7. Check mobile-friendliness with Google Mobile-Friendly Test');
console.log('8. Monitor indexing status in Google Search Console\n');

// Save report to file
const reportPath = path.join(__dirname, '../seo-report.json');
const report = {
  timestamp: new Date().toISOString(),
  score,
  passed: checks.passed.length,
  warnings: checks.warnings.length,
  errors: checks.errors.length,
  details: checks
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`📄 Detailed report saved to: seo-report.json\n`);

// Exit with error code if critical issues found
process.exit(checks.errors.length > 0 ? 1 : 0);
