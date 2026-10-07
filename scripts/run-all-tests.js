/**
 * run-all-tests.js
 * Cross-platform runner for all test suites in scripts/
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const testFiles = [
  'scripts/test-p4d-editorial-review.js',
  'scripts/test-p4e-internal-links.js',
  'scripts/test-p4f-content-refresh.js',
  'scripts/test-p5a-public-blog.js',
  'scripts/test-p5b-search.js',
  'scripts/test-p5c-seo-growth.js',
  'scripts/test-p5d-conversion-cta.js',
  'scripts/test-p5e-personalization.js',
  'scripts/test-p5f-content-growth.js'
];

console.log('🧪 RUNNING ALL AVAILABLE TEST SUITES...\n');

let failedSuites = 0;

for (const relFile of testFiles) {
  const fullPath = path.resolve(rootDir, relFile);
  console.log(`▶ Executing ${relFile}...`);
  const result = spawnSync('node', [fullPath], {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env
  });

  if (result.status !== 0) {
    console.error(`❌ Suite failed: ${relFile} (exit code ${result.status})`);
    failedSuites++;
  }
}

console.log('\n==================================================');
if (failedSuites === 0) {
  console.log(`✅ ALL ${testFiles.length} TEST SUITES PASSED CLEANLY!`);
  console.log('==================================================\n');
  process.exit(0);
} else {
  console.error(`❌ ${failedSuites} of ${testFiles.length} TEST SUITES FAILED!`);
  console.log('==================================================\n');
  process.exit(1);
}
