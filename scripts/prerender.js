import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrOutDir = path.resolve(rootDir, 'dist-ssr');

const routes = [
  '/',
  '/about',
  '/blog',
  '/pricing',
  '/pricing/starter',
  '/pricing/growth',
  '/pricing/scale',
  '/pricing/enterprise',
  '/security',
  '/documentation',
  '/privacy',
  '/terms',
  '/unsubscribe',
  '/services/whatsapp-coexistence',
  '/services/sales-automation',
  '/services/lead-management',
  '/services/crm-development',
  '/services/ai-chatbots',
  '/services/whatsapp-automation',
  '/services/voice-bot-assistant',
  '/services/whatsapp-calling-agent',
  '/services/phone-call-agent',
  '/services/ivr-solutions',
  '/services/human-handoff-systems',
  '/services/ai-development',
  '/services/ai-agent-development',
  '/services/hrms-development',
  '/services/erp-development',
  '/services/web-development',
  '/services/mobile-app-development',
  '/industries/healthcare',
  '/industries/education',
  '/industries/finance',
  '/industries/manufacturing',
  '/industries/enterprise',
  '/industries/real-estate',
  '/industries/retail',
  '/industries/logistics',
  '/industries/hospitality',
  '/industries/legal',
  '/industries/travel',
  '/industries/government',
  '/blog/multi-agent-orchestration-future',
  '/blog/secure-rag-pipelines-enterprise',
  '/blog/whatsapp-business-api-automation',
  '/services/whatsapp-catalog-crm',
  '/tools/whatsapp-pricing-calculator',
  '/guides/crm-migration',
  '/resources/voice-ai-latency-benchmark',
  '/resources/sip-architecture',
  '/resources/voice-ai-infrastructure',
  '/resources/mcp-ai-agent-tool-calling',
  '/resources/where-to-find-us',
  '/compare',
  '/compare/wati-vs-respond-io-vs-gyanvaniai',
  '/compare/custom-ai-crm-vs-off-the-shelf',
  '/seo/ai-visibility',
  '/404'
];

async function prerender() {
  console.log('🚀 Starting SSG Pre-rendering...');

  // 1. Build SSR bundle
  await build({
    configFile: false,
    build: {
      ssr: path.resolve(rootDir, 'src/entry-server.jsx'),
      outDir: ssrOutDir,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: 'entry-server.js'
        }
      }
    }
  });

  const ssrModulePath = path.resolve(ssrOutDir, 'entry-server.js');
  const { render } = await import(pathToFileURL(ssrModulePath).href);

  // 2. Read clean Vite template HTML from dist
  const templatePath = path.resolve(distDir, 'index.html');
  const cachedViteTemplatePath = path.resolve(distDir, '.vite-template.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }
  const rawTemplate = fs.readFileSync(templatePath, 'utf8');

  // If dist/index.html is a fresh Vite build (empty #root), cache a pristine copy.
  // If prerender.js is re-run without a fresh Vite build, restore from cached template
  // or strip only the explicit PRERENDER_HEAD markers — NEVER touch Vite's <link rel="stylesheet"> or <script type="module"> tags.
  let baseTemplate;
  if (rawTemplate.includes('<div id="root"></div>') && !rawTemplate.includes('<!-- PRERENDER_HEAD_START -->')) {
    fs.writeFileSync(cachedViteTemplatePath, rawTemplate, 'utf8');
    baseTemplate = rawTemplate;
  } else if (fs.existsSync(cachedViteTemplatePath)) {
    baseTemplate = fs.readFileSync(cachedViteTemplatePath, 'utf8');
  } else {
    baseTemplate = rawTemplate
      .replace(/<div id="root">[\s\S]*?<\/div>\s*(?=<script src="https:\/\/api\.gyanvaniai\.online)/i, '<div id="root"></div>\n\n    ')
      .replace(/\s*<!-- PRERENDER_HEAD_START -->[\s\S]*?<!-- PRERENDER_HEAD_END -->/gi, '');
  }

  // 3. Render each route
  let successCount = 0;

  for (const url of routes) {
    const helmetContext = {};
    const { appHtml, helmet } = render(url, helmetContext);

    let html = baseTemplate;

    // Clean up template head: remove default fallback data-rh tags and static duplicates from index.html
    // IMPORTANT: Never match rel="stylesheet", rel="modulepreload", rel="icon", or rel="manifest"
    html = html.replace(/<title[^>]*>.*?<\/title>/gis, '');
    html = html.replace(/<meta[^>]*data-rh="true"[^>]*\/?>/gis, '');
    html = html.replace(/<link[^>]*data-rh="true"[^>]*\/?>/gis, '');
    html = html.replace(/<meta\s+name="(?:title|description|robots|googlebot|bingbot|keywords|author|theme-color|coverage|distribution|rating|target|audience|geo\.region|geo\.placename|citation_title|citation_publisher|citation_fulltext_html_url|citation_language|mobile-web-app-capable|apple-mobile-web-app-capable|apple-mobile-web-app-status-bar-style|apple-mobile-web-app-title|twitter:[^"]+)"[^>]*\/?>/gis, '');
    html = html.replace(/<meta\s+property="(?:og:[^"]+|article:[^"]+)"[^>]*\/?>/gis, '');
    html = html.replace(/<link\s+rel="(?:canonical|author|alternate|preload)"[^>]*\/?>/gis, '');
    html = html.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gis, '');

    // Extract head elements from React 19 render output
    const extractedHeadTags = [];

    const titleMatches = appHtml.match(/<title[^>]*>[\s\S]*?<\/title>/gis) || [];
    const metaMatches = appHtml.match(/<meta[^>]*\/?>/gis) || [];
    const linkMatches = appHtml.match(/<link[^>]*\/?>/gis) || [];
    const scriptSchemaMatches = appHtml.match(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gis) || [];

    for (const tag of titleMatches) extractedHeadTags.push(tag);
    for (const tag of metaMatches) extractedHeadTags.push(tag);
    for (const tag of linkMatches) extractedHeadTags.push(tag);
    for (const tag of scriptSchemaMatches) extractedHeadTags.push(tag);

    // Also check Helmet object if populated
    if (helmet) {
      if (helmet.title) extractedHeadTags.push(helmet.title.toString());
      if (helmet.meta) extractedHeadTags.push(helmet.meta.toString());
      if (helmet.link) extractedHeadTags.push(helmet.link.toString());
      if (helmet.script) extractedHeadTags.push(helmet.script.toString());
    }

    // Deduplicate head tags by exact string
    const uniqueTags = [];
    const seen = new Set();
    for (const tag of extractedHeadTags) {
      const trimmed = tag.trim();
      if (!trimmed || seen.has(trimmed)) continue;
      seen.add(trimmed);
      uniqueTags.push(trimmed);
    }

    if (uniqueTags.length > 0) {
      const formattedHead = uniqueTags.join('\n    ');
      html = html.replace(
        '</head>',
        `    <!-- PRERENDER_HEAD_START -->\n    ${formattedHead}\n    <!-- PRERENDER_HEAD_END -->\n  </head>`
      );
    }

    // Clean up extracted head tags from appHtml so they don't bloat body
    let cleanAppHtml = appHtml
      .replace(/<title[^>]*>[\s\S]*?<\/title>/gis, '')
      .replace(/<meta[^>]*\/?>/gis, '')
      .replace(/<link[^>]*\/?>/gis, '')
      .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gis, '');

    // Inject rendered DOM inside #root
    html = html.replace('<div id="root"></div>', `<div id="root">${cleanAppHtml}</div>`);

    // For inner pages, remove the homepage-specific fallback noscript
    if (url !== '/') {
      html = html.replace(/<!-- SEO Semantic Fallback Content.*?<\/noscript>/gis, '');
    }

    // Build-time safety assertion: verify Vite production CSS and JS bundles exist in <head>
    const hasBundledCss = /<link\s+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/i.test(html);
    const hasBundledJs = /<script\s+type="module"[^>]+src="\/assets\/[^"]+\.js"/i.test(html);
    if (!hasBundledCss || !hasBundledJs) {
      throw new Error(
        `CRITICAL SSG ASSET ERROR on route "${url}": Missing Vite production ${!hasBundledCss ? 'CSS stylesheet' : 'JS bundle'} in <head>.`
      );
    }

    // Determine target output path
    let filePath;
    if (url === '/') {
      filePath = path.resolve(distDir, 'index.html');
    } else if (url === '/404') {
      filePath = path.resolve(distDir, '404.html');
    } else {
      const cleanUrl = url.replace(/^\/+/, '');
      const routeDir = path.resolve(distDir, cleanUrl);
      fs.mkdirSync(routeDir, { recursive: true });
      filePath = path.resolve(routeDir, 'index.html');
    }

    fs.writeFileSync(filePath, html, 'utf8');
    successCount++;
  }

  // 4. Cleanup temporary artifacts
  if (fs.existsSync(cachedViteTemplatePath)) {
    fs.rmSync(cachedViteTemplatePath, { force: true });
  }
  if (fs.existsSync(ssrOutDir)) {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }

  console.log(`✅ SSG Pre-rendering completed: Successfully generated ${successCount} distinct HTML pages.`);
}

prerender().catch((err) => {
  console.error('❌ SSG Pre-rendering failed:', err);
  process.exit(1);
});
