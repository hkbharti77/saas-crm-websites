import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { v2 as cloudinary } from 'cloudinary';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env for Cloudinary uploads
  process.env.CLOUDINARY_URL = env.CLOUDINARY_URL || process.env.CLOUDINARY_URL;

  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,
      secure: true,
    });
  }

  return {
    plugins: [
      react(),
      {
        name: 'api-upload-dev-server',
        configureServer(server) {
          // Handle Uploads locally via Cloudinary
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

                if (!imageBase64) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ error: 'Missing imageBase64 parameter' }));
                }

                const dataUri = imageBase64.startsWith('data:')
                  ? imageBase64
                  : `data:${contentType || 'image/png'};base64,${imageBase64}`;

                const cleanFileName = (fileName || 'image')
                  .toLowerCase()
                  .replace(/\.[^/.]+$/, '')
                  .replace(/[^a-z0-9]/g, '-');

                const uploadResponse = await cloudinary.uploader.upload(dataUri, {
                  folder: 'blog',
                  public_id: `${Date.now()}-${cleanFileName}`,
                  resource_type: 'auto',
                });

                const host = req.headers.host || 'localhost:5173';
                const protocol = host.includes('localhost') ? 'http' : 'https';
                const maskedUrl = `${protocol}://${host}/media/${uploadResponse.public_id}`;

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  url: maskedUrl,
                  key: uploadResponse.public_id
                }));
              } catch (err) {
                console.error('Dev Upload Error');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Failed to upload image' }));
              }
            });
          });

          // Handle /media/ requests locally by streaming Cloudinary images secretly
          server.middlewares.use('/media', async (req, res, next) => {
            try {
              const urlParts = (req.url || '').split('?')[0];
              const mediaKey = urlParts.replace(/^\/+/, '');
              if (!mediaKey) return next();

              const secureUrl = cloudinary.url(mediaKey, {
                secure: true,
                resource_type: 'image',
              });

              const response = await fetch(secureUrl);
              if (!response.ok) return next();

              const contentType = response.headers.get('content-type') || 'image/png';
              res.setHeader('Content-Type', contentType);
              res.setHeader('Cache-Control', 'public, max-age=31536000');

              const arrayBuffer = await response.arrayBuffer();
              return res.end(Buffer.from(arrayBuffer));
            } catch (err) {
              return next();
            }
          });
        },
      },
    ],
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('react-phone-number-input') || id.includes('libphonenumber-js')) return 'vendor-phone';
            }
          }
        }
      }
    }
  };
});
