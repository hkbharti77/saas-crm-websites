import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env for local S3 uploads
  process.env.AWS_ACCESS_KEY_ID = env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  process.env.AWS_SECRET_ACCESS_KEY = env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  process.env.AWS_S3_BUCKET_NAME = env.AWS_S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;
  process.env.AWS_REGION = env.AWS_REGION || process.env.AWS_REGION;

  return {
    plugins: [
      react(),
      {
        name: 'api-s3-dev-server',
        configureServer(server) {
          // 1. Handle S3 Uploads locally
          server.middlewares.use('/api/upload', async (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              return res.end();
            }

            if (req.method !== 'POST') {
              res.statusCode = 405;
              return res.end(JSON.stringify({ error: 'Method not allowed' }));
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const parsedBody = JSON.parse(body);
                const { imageBase64, fileName, contentType } = parsedBody;

                if (!imageBase64 || !fileName) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ error: 'Missing parameters' }));
                }

                const s3Client = new S3Client({
                  region: process.env.AWS_REGION || 'ap-south-1',
                  credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
                  },
                });

                const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const timestamp = Date.now();
                const cleanFileName = fileName.toLowerCase().replace(/[^a-z0-9.]/g, '-');
                const s3Key = `blog/${timestamp}-${cleanFileName}`;
                const bucketName = process.env.AWS_S3_BUCKET_NAME || 'gyanvaniai-prod-bucket';

                await s3Client.send(
                  new PutObjectCommand({
                    Bucket: bucketName,
                    Key: s3Key,
                    Body: buffer,
                    ContentType: contentType || 'image/png',
                    CacheControl: 'public, max-age=31536000',
                  })
                );

                const host = req.headers.host || 'localhost:5173';
                const protocol = host.includes('localhost') ? 'http' : 'https';
                const maskedUrl = `${protocol}://${host}/media/${s3Key}`;

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, url: maskedUrl, key: s3Key }));
              } catch (err) {
                console.error('Dev S3 Upload Error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: err.message }));
              }
            });
          });

          // 2. Handle /media/ Requests locally using AWS S3 GetObjectCommand
          server.middlewares.use('/media', async (req, res, next) => {
            try {
              const urlParts = (req.url || '').split('?')[0];
              const s3Key = urlParts.replace(/^\/+/, '');
              if (!s3Key) return next();

              const s3Client = new S3Client({
                region: process.env.AWS_REGION || 'ap-south-1',
                credentials: {
                  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
                },
              });

              const getCommand = new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME || 'gyanvaniai-prod-bucket',
                Key: s3Key,
              });

              const s3Response = await s3Client.send(getCommand);
              res.setHeader('Content-Type', s3Response.ContentType || 'image/png');
              res.setHeader('Cache-Control', 'public, max-age=31536000');

              const byteArray = await s3Response.Body.transformToByteArray();
              return res.end(Buffer.from(byteArray));
            } catch (err) {
              console.error('Dev S3 Fetch Error:', err);
              return next();
            }
          });
        },
      },
      prerender({
        routes: [
          '/blog',
          '/privacy',
          '/terms',
          '/services/ai-development',
          '/services/ai-agent-development',
          '/services/crm-development',
          '/industries/healthcare-crm',
          '/services/whatsapp-automation',
          '/services/whatsapp-coexistence',
          '/services/hrms-development',
          '/services/erp-development',
          '/services/web-development',
          '/services/mobile-app-development',
        ],
        renderer: '@prerenderer/renderer-jsdom',
        server: {
          port: 3000,
          host: 'localhost',
        },
      }),
    ],
  };
});
