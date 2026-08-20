import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
  '/privacy',
  '/terms',
  '/services/whatsapp-coexistence',
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
  '/admin/login',
  '/admin/dashboard',
  '/admin/create',
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
  const { render } = await import(`file://${ssrModulePath.replace(/\\/g, '/')}`);

  // 2. Read template HTML from dist
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }
  const baseTemplate = fs.readFileSync(templatePath, 'utf8');

  // 3. Render each route
  let successCount = 0;

  for (const url of routes) {
    const helmetContext = {};
    const { appHtml, helmet } = render(url, helmetContext);

    let html = baseTemplate;

    // Clean up template head: remove default fallback data-rh tags and title from index.html
    html = html.replace(/<title[^>]*>.*?<\/title>/gis, '');
    html = html.replace(/<meta[^>]*data-rh="true"[^>]*\/?>/gis, '');
    html = html.replace(/<link[^>]*data-rh="true"[^>]*\/?>/gis, '');

    // Extract head elements from React 19 render output
    const extractedHeadTags = [];

    const headTagMatches = appHtml.match(/<(title|meta|link)[^>]*>.*?<\/(title|meta|link)>|<(title|meta|link)[^>]*\/?>/gis) || [];
    for (const tag of headTagMatches) {
      extractedHeadTags.push(tag);
    }

    const scriptSchemaMatches = appHtml.match(/<script\s+type="application\/ld\+json"[^>]*>.*?<\/script>/gis) || [];
    for (const tag of scriptSchemaMatches) {
      extractedHeadTags.push(tag);
    }

    // Also check Helmet object if populated
    if (helmet) {
      if (helmet.title) extractedHeadTags.push(helmet.title.toString());
      if (helmet.meta) extractedHeadTags.push(helmet.meta.toString());
      if (helmet.link) extractedHeadTags.push(helmet.link.toString());
      if (helmet.script) extractedHeadTags.push(helmet.script.toString());
    }

    // Deduplicate head tags by key/name/rel/property
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
      html = html.replace('</head>', `    ${formattedHead}\n  </head>`);
    }

    // Clean up extracted head tags from appHtml so they don't bloat body
    let cleanAppHtml = appHtml
      .replace(/<(title|meta|link)[^>]*>.*?<\/(title|meta|link)>|<(title|meta|link)[^>]*\/?>/gis, '')
      .replace(/<script\s+type="application\/ld\+json"[^>]*>.*?<\/script>/gis, '');

    // Inject rendered DOM inside #root
    html = html.replace('<div id="root"></div>', `<div id="root">${cleanAppHtml}</div>`);

    // For inner pages, remove the homepage-specific fallback noscript
    if (url !== '/') {
      html = html.replace(/<!-- SEO Semantic Fallback Content.*?<\/noscript>/gis, '');
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

  // 4. Cleanup SSR bundle
  if (fs.existsSync(ssrOutDir)) {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }

  console.log(`✅ SSG Pre-rendering completed: Successfully generated ${successCount} distinct HTML pages.`);
}

prerender().catch((err) => {
  console.error('❌ SSG Pre-rendering failed:', err);
  process.exit(1);
});
