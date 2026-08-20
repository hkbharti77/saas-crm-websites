import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir, fileList = []) {
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

const allFiles = getHtmlFiles('dist');
console.log('🔍 Auditing total HTML files in dist:', allFiles.length);

let issues = 0;
const canonicals = new Set();
const titles = new Set();
const descriptions = new Set();

for (const file of allFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = file.replace('dist', '').replace(/\\/g, '/').replace(/\/index\.html$/, '') || '/';

  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : null;

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i) || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/i);
  const desc = descMatch ? descMatch[1] : null;

  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
  const canon = canonMatch ? canonMatch[1] : null;

  const rootStart = html.indexOf('<div id="root">');
  const rootEnd = html.indexOf('</body>');
  const rootLen = rootStart !== -1 && rootEnd !== -1 ? rootEnd - rootStart : 0;

  const hasSchema = html.includes('application/ld+json');
  const isNoindex = html.includes('noindex');
  const expectedCanon = 'https://www.gyanvaniai.online' + (route === '/' ? '/' : route);

  if (!title || title.includes('Loading')) {
    console.error(`❌ Title issue on ${route}:`, title);
    issues++;
  }
  if (!desc) {
    console.error(`❌ Missing description on ${route}`);
    issues++;
  }
  if (canon !== expectedCanon) {
    console.error(`❌ Canonical mismatch on ${route}: Found "${canon}", Expected "${expectedCanon}"`);
    issues++;
  }
  if (rootLen < 200) {
    console.error(`❌ Root content empty/too short on ${route} (${rootLen} chars)`);
    issues++;
  }
  if (isNoindex) {
    console.error(`❌ Unexpected noindex on ${route}`);
    issues++;
  }

  if (canon) canonicals.add(canon);
  if (title) titles.add(title);
  if (desc) descriptions.add(desc);
}

console.log('----------------------------------------------------');
console.log(`✅ Total Pages Checked: ${allFiles.length}`);
console.log(`✅ Unique Self-Canonical URLs: ${canonicals.size} / ${allFiles.length}`);
console.log(`✅ Unique Page Titles: ${titles.size} / ${allFiles.length}`);
console.log(`✅ Unique Descriptions: ${descriptions.size} / ${allFiles.length}`);
console.log(`🏁 Total Audit Issues: ${issues}`);
console.log('----------------------------------------------------');
