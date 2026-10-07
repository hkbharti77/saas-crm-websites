import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('🤖 Starting Measurable Answer Engine Optimization (AEO) Audit...');

const llmsPath = path.resolve('public', 'llms.txt');
const llmsFullPath = path.resolve('public', 'llms-full.txt');
const llmSummaryJsonPath = path.resolve('public', 'api', 'llm-summary.json');
const robotsPath = path.resolve('public', 'robots.txt');
const distDir = path.resolve('dist');

const report = {
  timestamp: new Date().toISOString(),
  targetDomain: 'https://www.gyanvaniai.com',
  score: {
    total: 0,
    max: 100,
    breakdown: {
      manifests: { score: 0, max: 25 },
      consistency: { score: 0, max: 25 },
      structuredData: { score: 0, max: 25 },
      semanticDirectAnswers: { score: 0, max: 25 }
    }
  },
  manifestAudit: {},
  factualConsistencyAudit: {},
  robotsAudit: {},
  htmlPagesAudit: {
    totalPages: 0,
    speakableCoverage: 0,
    faqCoverage: 0,
    jsonLdCoverage: 0
  },
  errors: [],
  warnings: []
};

// 1. Audit public AI discovery files (Max 25 pts)
console.log('1️⃣ Auditing Machine-Readable Manifests (llms.txt, llms-full.txt, llm-summary.json)...');
let manifestScore = 0;

if (fs.existsSync(llmsPath)) {
  manifestScore += 8;
  const content = fs.readFileSync(llmsPath, 'utf8');
  report.manifestAudit.llmsTxt = {
    exists: true,
    bytes: content.length,
    hasPricing: content.includes('1,999') && content.includes('4,999') && content.includes('9,999'),
    hasCoexistence: content.includes('WhatsApp Coexistence')
  };
} else {
  report.errors.push('Missing public/llms.txt');
}

if (fs.existsSync(llmsFullPath)) {
  manifestScore += 8;
  const content = fs.readFileSync(llmsFullPath, 'utf8');
  report.manifestAudit.llmsFullTxt = {
    exists: true,
    bytes: content.length,
    hasCoexistenceMatrix: content.includes('Setup Comparison Matrix')
  };
} else {
  report.errors.push('Missing public/llms-full.txt');
}

if (fs.existsSync(llmSummaryJsonPath)) {
  manifestScore += 9;
  try {
    const json = JSON.parse(fs.readFileSync(llmSummaryJsonPath, 'utf8'));
    report.manifestAudit.llmSummaryJson = {
      exists: true,
      validJson: true,
      productsCount: json.coreProducts?.length || 0,
      plansCount: json.pricing?.plans?.length || 0,
      faqsCount: json.directAnswerFaqs?.length || 0
    };
  } catch (err) {
    report.errors.push(`Invalid JSON in public/api/llm-summary.json: ${err.message}`);
  }
} else {
  report.errors.push('Missing public/api/llm-summary.json');
}
report.score.breakdown.manifests.score = manifestScore;

// 2. Factual Consistency & Superlative Audit (Max 25 pts)
console.log('2️⃣ Auditing Factual Consistency & Marketing Claims...');
let consistencyScore = 0;

if (fs.existsSync(llmsPath) && fs.existsSync(llmSummaryJsonPath)) {
  const llmsTxt = fs.readFileSync(llmsPath, 'utf8');
  const summaryJson = fs.readFileSync(llmSummaryJsonPath, 'utf8');
  const fullTxt = fs.existsSync(llmsFullPath) ? fs.readFileSync(llmsFullPath, 'utf8') : '';

  // Check pricing parity
  const has1999 = llmsTxt.includes('1,999') && summaryJson.includes('1999');
  const has4999 = llmsTxt.includes('4,999') && summaryJson.includes('4999');
  const has9999 = llmsTxt.includes('9,999') && summaryJson.includes('9999');
  const pricingConsistent = has1999 && has4999 && has9999;

  // Check URL parity (must use www.gyanvaniai.com)
  const hasOldDomain = llmsTxt.includes('gyanvaniai.online') || fullTxt.includes('gyanvaniai.online') || summaryJson.includes('gyanvaniai.online');
  const hasNonWww = llmsTxt.includes('https://gyanvaniai.com') || fullTxt.includes('https://gyanvaniai.com') || summaryJson.includes('https://gyanvaniai.com');

  // Check for unsupported superlatives
  const badSuperlatives = ['zero-hallucination', 'best in the world', 'top-rated AI CRM', 'guaranteed first place'];
  let foundSuperlative = false;
  for (const sup of badSuperlatives) {
    if (llmsTxt.toLowerCase().includes(sup) || summaryJson.toLowerCase().includes(sup) || fullTxt.toLowerCase().includes(sup)) {
      report.warnings.push(`Detected marketing claim to tone down: "${sup}"`);
      foundSuperlative = true;
    }
  }

  // Check representation of technical cornerstone guides
  const hasCloudApiGuide = llmsTxt.includes('whatsapp-business-api-automation') || summaryJson.includes('whatsapp-business-api-automation');
  const hasAgentGuide = llmsTxt.includes('multi-agent-orchestration-future') || summaryJson.includes('multi-agent-orchestration-future');
  const hasRagGuide = llmsTxt.includes('secure-rag-pipelines-enterprise') || summaryJson.includes('secure-rag-pipelines-enterprise');
  const guidesRepresented = hasCloudApiGuide && hasAgentGuide && hasRagGuide;

  if (pricingConsistent) consistencyScore += 8;
  if (!hasNonWww && !hasOldDomain) consistencyScore += 7;
  if (!foundSuperlative) consistencyScore += 5;
  if (guidesRepresented) consistencyScore += 5;

  report.factualConsistencyAudit = {
    pricingConsistent,
    canonicalDomainStrict: !hasNonWww && !hasOldDomain,
    unsupportedSuperlativesClean: !foundSuperlative,
    cornerstoneGuidesRepresented: guidesRepresented
  };
}
report.score.breakdown.consistency.score = consistencyScore;

// 3. AI Crawler Permissions in robots.txt (Integrated check)
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  const bots = ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'cohere-ai'];
  const botStatus = {};
  let allBotsAllowed = true;
  for (const b of bots) {
    const isDeclared = robots.includes(b);
    botStatus[b] = isDeclared;
    if (!isDeclared) allBotsAllowed = false;
  }
  const hasAdminDisallow = robots.includes('Disallow: /admin/');
  report.robotsAudit = {
    botsDeclared: botStatus,
    allBotsAllowed,
    adminProtected: hasAdminDisallow
  };
}

// 4. Pre-rendered HTML Pages Audit (Max 50 pts across Structured Data & Direct Answers)
console.log('3️⃣ Auditing Pre-rendered Pages for Speakable, FAQ & Direct Answers...');
let structuredDataScore = 0;
let semanticDirectAnswerScore = 0;

if (fs.existsSync(distDir)) {
  const htmlFiles = getHtmlFiles(distDir);
  const indexableFiles = htmlFiles.filter(f => {
    const route = f.replace(distDir, '').replace(/\\/g, '/').replace(/\/index\.html$/, '') || '/';
    return !route.startsWith('/admin') && !route.includes('404');
  });

  report.htmlPagesAudit.totalPages = indexableFiles.length;

  let jsonLdCount = 0;
  let speakableCount = 0;
  let directAnswerCount = 0;
  let faqSchemaCount = 0;

  for (const file of indexableFiles) {
    const html = fs.readFileSync(file, 'utf8');

    if (html.includes('application/ld+json')) jsonLdCount++;
    if (html.includes('SpeakableSpecification') || html.includes('speakable')) speakableCount++;
    if (html.includes('FAQPage') || html.includes('acceptedAnswer')) faqSchemaCount++;
    if (html.includes('aeo-answer-block') || html.includes('Direct Answer') || html.includes('faq-answer')) directAnswerCount++;
  }

  report.htmlPagesAudit.jsonLdCoverage = jsonLdCount;
  report.htmlPagesAudit.speakableCoverage = speakableCount;
  report.htmlPagesAudit.faqCoverage = faqSchemaCount;
  report.htmlPagesAudit.directAnswerCoverage = directAnswerCount;

  // Structured Data scoring (25 pts)
  if (jsonLdCount >= indexableFiles.length * 0.95) structuredDataScore += 12;
  if (speakableCount >= indexableFiles.length * 0.90) structuredDataScore += 13;

  // Semantic direct answers scoring (25 pts)
  if (faqSchemaCount >= indexableFiles.length * 0.70) semanticDirectAnswerScore += 13;
  if (directAnswerCount >= indexableFiles.length * 0.70) semanticDirectAnswerScore += 12;
}

report.score.breakdown.structuredData.score = structuredDataScore;
report.score.breakdown.semanticDirectAnswers.score = semanticDirectAnswerScore;

report.score.total = 
  report.score.breakdown.manifests.score +
  report.score.breakdown.consistency.score +
  report.score.breakdown.structuredData.score +
  report.score.breakdown.semanticDirectAnswers.score;

console.log('====================================================');
console.log(`📊 AEO IMPLEMENTATION READINESS SCORE: ${report.score.total} / 100`);
console.log(`   - Machine Manifests:       ${report.score.breakdown.manifests.score} / 25`);
console.log(`   - Factual Consistency:     ${report.score.breakdown.consistency.score} / 25`);
console.log(`   - Structured Data/Voice:   ${report.score.breakdown.structuredData.score} / 25`);
console.log(`   - Semantic Direct Answers: ${report.score.breakdown.semanticDirectAnswers.score} / 25`);
console.log('====================================================');

const outPath = path.resolve('aeo-readiness-report.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`📄 Comprehensive AEO audit report saved to: ${outPath}`);

if (report.score.total >= 90) {
  console.log('🎉 AEO Implementation Audit PASSED with Grade A readiness!');
  process.exit(0);
} else {
  console.warn('⚠️ AEO readiness score below 90%. Review report for improvements.');
  process.exit(0);
}
