/**
 * IndexNow Multi-Engine Submission
 * Submits URLs to Google, Bing, Yandex, Seznam, and other search engines
 * Supports both batch submission and single URL updates
 */

import fs from 'node:fs';
import path from 'node:path';

const INDEXNOW_KEY = 'e58f9214b74a49c693a19b88c42ef84a';
const HOST = 'www.gyanvaniai.online';
const BASE_URL = 'https://www.gyanvaniai.online';

// IndexNow endpoints (all use the same API spec)
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',  // Primary endpoint (routes to all engines)
  'https://www.bing.com/indexnow',      // Bing/Microsoft
  'https://yandex.com/indexnow'         // Yandex
];

function getHtmlFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getHtmlFiles(filePath, fileList);
      } else if (file.endsWith('.html')) {
        fileList.push(filePath);
      }
    });
  } catch {
    console.warn(`Warning: Could not read directory ${dir}`);
  }
  return fileList;
}

async function submitToIndexNow(urlList, endpoint) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'GyanVaniAi-IndexNow/1.0'
      },
      body: JSON.stringify(payload)
    });

    const status = response.status;
    const statusText = response.statusText;
    
    // IndexNow returns 200 for success, 202 for accepted
    if (status === 200 || status === 202) {
      return { success: true, status, statusText, endpoint };
    } else {
      const text = await response.text();
      return { success: false, status, statusText, error: text, endpoint };
    }
  } catch (error) {
    return { success: false, error: error?.message || 'Unknown error', endpoint };
  }
}

async function submitSingleUrl(url) {
  console.log(`\n🔗 Single URL Submission: ${url}`);
  
  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(endpoint => submitToIndexNow([url], endpoint))
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      console.log(`✅ ${INDEXNOW_ENDPOINTS[index]}: ${result.value.status} ${result.value.statusText}`);
    } else {
      const error = result.reason || result.value?.error;
      console.log(`❌ ${INDEXNOW_ENDPOINTS[index]}: ${error}`);
    }
  });
}

async function submitBatch() {
  console.log('🔍 Scanning dist folder for pages...\n');
  
  // Check if dist folder exists
  if (!fs.existsSync('dist')) {
    console.log('⚠️  dist folder not found. Using manual URL list instead.\n');
    
    // Fallback to predefined URL list
    const urlList = [
      `${BASE_URL}/`,
      `${BASE_URL}/about`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/security`,
      `${BASE_URL}/documentation`,
      `${BASE_URL}/services/whatsapp-coexistence`,
      `${BASE_URL}/services/whatsapp-automation`,
      `${BASE_URL}/services/sales-automation`,
      `${BASE_URL}/services/lead-management`,
      `${BASE_URL}/services/ai-development`,
      `${BASE_URL}/services/ai-agent-development`,
      `${BASE_URL}/services/ai-chatbots`,
      `${BASE_URL}/services/crm-development`,
      `${BASE_URL}/services/voice-bot-assistant`,
      `${BASE_URL}/services/whatsapp-calling-agent`,
      `${BASE_URL}/services/phone-call-agent`,
      `${BASE_URL}/services/ivr-solutions`,
      `${BASE_URL}/services/human-handoff-systems`,
      `${BASE_URL}/services/hrms-development`,
      `${BASE_URL}/services/erp-development`,
      `${BASE_URL}/services/web-development`,
      `${BASE_URL}/services/mobile-app-development`,
      `${BASE_URL}/industries/healthcare`,
      `${BASE_URL}/industries/education`,
      `${BASE_URL}/industries/finance`,
      `${BASE_URL}/industries/manufacturing`,
      `${BASE_URL}/industries/enterprise`,
      `${BASE_URL}/industries/real-estate`,
      `${BASE_URL}/industries/retail`,
      `${BASE_URL}/industries/logistics`,
      `${BASE_URL}/industries/hospitality`,
      `${BASE_URL}/industries/legal`,
      `${BASE_URL}/industries/travel`,
      `${BASE_URL}/industries/government`,
      `${BASE_URL}/privacy`,
      `${BASE_URL}/terms`
    ];
    
    console.log(`📊 Using ${urlList.length} predefined URLs\n`);
    await submitUrls(urlList);
    return;
  }
  
  const allFiles = getHtmlFiles('dist');
  const urlList = allFiles
    .map(file => file.replace('dist', '').replace(/\\/g, '/').replace(/\/index\.html$/, '') || '/')
    .filter(route => !route.startsWith('/admin') && !route.includes('/404'))
    .map(route => BASE_URL + route);

  console.log(`� Found ${urlList.length} pages to submit\n`);
  await submitUrls(urlList);
}

async function submitUrls(urlList) {
  console.log('URLs to submit:');
  urlList.forEach(url => console.log(`  - ${url}`));
  console.log('\n🚀 Submitting to IndexNow endpoints...\n');

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(endpoint => submitToIndexNow(urlList, endpoint))
  );

  console.log('\n📈 Submission Results:\n');
  results.forEach((result, index) => {
    const endpoint = INDEXNOW_ENDPOINTS[index];
    if (result.status === 'fulfilled' && result.value.success) {
      console.log(`✅ ${endpoint}`);
      console.log(`   Status: ${result.value.status} ${result.value.statusText}`);
      console.log(`   URLs: ${urlList.length} submitted`);
    } else {
      const error = result.reason || result.value?.error || 'Unknown error';
      console.log(`❌ ${endpoint}`);
      console.log(`   Error: ${error}`);
    }
    console.log('');
  });

  console.log('🎯 IndexNow submission completed!');
  console.log('\n💡 Supported Search Engines:');
  console.log('   ✓ Bing (Microsoft)');
  console.log('   ✓ Yandex');
  console.log('   ✓ Seznam.cz');
  console.log('   ✓ Naver');
  console.log('   ✓ DuckDuckGo (via Bing)');
  console.log('\n⚠️  Note: Google does not support IndexNow.');
  console.log('   For Google: Use Google Search Console or submit sitemap.');
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.length > 0 && args[0].startsWith('http')) {
  // Single URL mode
  submitSingleUrl(args[0]);
} else {
  // Batch mode
  submitBatch();
}
