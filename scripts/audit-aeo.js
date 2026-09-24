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

console.log('🤖 Starting Answer Engine Optimization (AEO) & GEO Audit...');

// 1. Audit public AI discovery files
const llmsPath = path.resolve('public', 'llms.txt');
const llmsFullPath = path.resolve('public', 'llms-full.txt');
const llmSummaryJsonPath = path.resolve('public', 'api', 'llm-summary.json');
const robotsPath = path.resolve('public', 'robots.txt');

let aeoErrors = 0;

if (!fs.existsSync(llmsPath)) {
  console.error('❌ Missing public/llms.txt standard file');
  aeoErrors++;
} else {
  console.log('✅ Found public/llms.txt (LLM Summary Standard)');
}

if (!fs.existsSync(llmsFullPath)) {
  console.error('❌ Missing public/llms-full.txt file');
  aeoErrors++;
} else {
  console.log('✅ Found public/llms-full.txt (Full Technical Reference)');
}

if (!fs.existsSync(llmSummaryJsonPath)) {
  console.error('❌ Missing public/api/llm-summary.json machine readable summary');
  aeoErrors++;
} else {
  console.log('✅ Found public/api/llm-summary.json (Machine Readable API)');
}

if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const requiredBots = ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'];
  for (const bot of requiredBots) {
    if (!robotsContent.includes(bot)) {
      console.warn(`⚠️ Warning: ${bot} not explicitly declared in robots.txt`);
    }
  }
}

// 2. Audit prerendered HTML pages in dist (if built)
const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.log('ℹ️ dist directory does not exist yet. Run "npm run build" to test prerendered HTML pages.');
} else {
  const htmlFiles = getHtmlFiles(distDir);
  console.log(`🔍 Auditing ${htmlFiles.length} prerendered HTML files for AEO schemas & semantic data...`);

  let schemaCount = 0;
  let speakableCount = 0;
  let directAnswerCount = 0;

  for (const file of htmlFiles) {
    const route = file.replace(distDir, '').replace(/\\/g, '/').replace(/\/index\.html$/, '') || '/';
    if (route.startsWith('/admin') || route.includes('404')) continue;

    const html = fs.readFileSync(file, 'utf8');

    // Check JSON-LD
    const hasJsonLd = html.includes('application/ld+json');
    if (!hasJsonLd) {
      console.error(`❌ Missing JSON-LD Schema on route ${route}`);
      aeoErrors++;
    } else {
      schemaCount++;
    }

    // Check Speakable or AEO Direct Answer
    const hasSpeakable = html.includes('SpeakableSpecification') || html.includes('speakable');
    const hasAeoAnswer = html.includes('aeo-answer-block') || html.includes('Direct Answer') || html.includes('acceptedAnswer');

    if (hasSpeakable) speakableCount++;
    if (hasAeoAnswer) directAnswerCount++;

    // Check H1 tag present
    if (!html.includes('<h1')) {
      console.error(`❌ Missing <h1> tag on route ${route}`);
      aeoErrors++;
    }
  }

  console.log(`✅ JSON-LD Structured Data: ${schemaCount} / ${htmlFiles.length} pages`);
  console.log(`✅ Speakable Specification Schemas: ${speakableCount} / ${htmlFiles.length} pages`);
  console.log(`✅ Direct Answer AEO Blocks: ${directAnswerCount} / ${htmlFiles.length} pages`);
}

console.log('----------------------------------------------------');
console.log(`🏁 Total AEO Audit Issues: ${aeoErrors}`);
console.log('----------------------------------------------------');

if (aeoErrors > 0) {
  process.exit(1);
} else {
  console.log('🎉 AEO Audit Passed Successfully!');
}
