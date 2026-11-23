import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getCloudinaryClient,
  isValidCloudinaryAccountUrl,
  isValidCloudinaryUrl,
  resetCloudinaryClientCache,
} from '../api/_cloudinary.js';

test('isValidCloudinaryUrl accepts valid cloudinary URLs and rejects invalid values', () => {
  assert.equal(isValidCloudinaryUrl('cloudinary://12345:secret@demo_cloud'), true);
  assert.equal(isValidCloudinaryUrl('  cloudinary://key:sec@cloud?secure=true  '), true);
  assert.equal(isValidCloudinaryUrl(''), false);
  assert.equal(isValidCloudinaryUrl('   '), false);
  assert.equal(isValidCloudinaryUrl(undefined), false);
  assert.equal(isValidCloudinaryUrl('https://res.cloudinary.com/demo'), false);
  assert.equal(isValidCloudinaryUrl('placeholder'), false);
  assert.equal(isValidCloudinaryUrl('cloudinary://'), false);
});

test('isValidCloudinaryAccountUrl validates account:// protocol', () => {
  assert.equal(isValidCloudinaryAccountUrl('account://key:secret@acct'), true);
  assert.equal(isValidCloudinaryAccountUrl('cloudinary://key:secret@cloud'), false);
  assert.equal(isValidCloudinaryAccountUrl(''), false);
});

test('getCloudinaryClient returns null gracefully for missing or malformed CLOUDINARY_URL', async () => {
  resetCloudinaryClientCache();
  assert.equal(await getCloudinaryClient(''), null);
  assert.equal(await getCloudinaryClient('https://invalid-protocol.example'), null);
  assert.equal(await getCloudinaryClient('not-a-url'), null);
});

test('getCloudinaryClient initializes client when given a valid cloudinary:// URL', async () => {
  resetCloudinaryClientCache();
  const client = await getCloudinaryClient('cloudinary://123456:mysecret@testcloud');
  assert.ok(client);
  assert.equal(typeof client.url, 'function');
  assert.equal(client.config().cloud_name, 'testcloud');
  resetCloudinaryClientCache();
});

test('vite.config.js loads cleanly even when process.env.CLOUDINARY_URL is invalid', async () => {
  const prev = process.env.CLOUDINARY_URL;
  const prevBackend = process.env.VITE_BACKEND_URL;
  process.env.CLOUDINARY_URL = 'https://invalid-cloudinary-url.example.com';
  process.env.VITE_BACKEND_URL = 'http://localhost:5000';

  try {
    const { default: viteConfigFactory } = await import('../vite.config.js');
    const resolved =
      typeof viteConfigFactory === 'function'
        ? await viteConfigFactory({ mode: 'development', command: 'serve' })
        : viteConfigFactory;
    assert.ok(resolved);
    assert.equal(resolved.server?.port, 3000);
    if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
      assert.equal(
        resolved.define?.['import.meta.env.VITE_BACKEND_URL'],
        JSON.stringify('https://api-cms.gyanvaniai.info')
      );
      assert.equal(resolved.server?.proxy?.['/api']?.target, 'https://api-cms.gyanvaniai.info');
    }
  } finally {
    if (prev === undefined) {
      delete process.env.CLOUDINARY_URL;
    } else {
      process.env.CLOUDINARY_URL = prev;
    }
    if (prevBackend === undefined) {
      delete process.env.VITE_BACKEND_URL;
    } else {
      process.env.VITE_BACKEND_URL = prevBackend;
    }
  }
});
