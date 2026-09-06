import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { v2 as cloudinary } from 'cloudinary';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env for dev server middleware (AI & Cloudinary)
  Object.keys(env).forEach((key) => {
    if (env[key]) {
      process.env[key] = env[key];
    }
  });

  if (process.env.CLOUDINARY_URL) {
    try {
      cloudinary.config(process.env.CLOUDINARY_URL);
    } catch (e) {
      console.warn('Cloudinary config notice:', e);
    }
  }

  return {
    define: {
      'process.env.AI_PROVIDER': JSON.stringify(env.AI_PROVIDER || env.VITE_AI_PROVIDER || ''),
      'process.env.AI_API_KEY': JSON.stringify(env.AI_API_KEY || env.VITE_AI_API_KEY || ''),
      'process.env.OPENROUTER_API_KEY': JSON.stringify(env.OPENROUTER_API_KEY || env.VITE_OPENROUTER_API_KEY || ''),
      'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY || ''),
      'process.env.ANTHROPIC_API_KEY': JSON.stringify(env.ANTHROPIC_API_KEY || env.VITE_ANTHROPIC_API_KEY || ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || ''),
      'process.env.OPENROUTER_MODEL_NAME': JSON.stringify(env.OPENROUTER_MODEL_NAME || env.VITE_OPENROUTER_MODEL_NAME || ''),
      'process.env.AI_MODEL': JSON.stringify(env.AI_MODEL || env.VITE_AI_MODEL || ''),
      'process.env.AI_MAX_TOKENS': JSON.stringify(env.AI_MAX_TOKENS || env.VITE_AI_MAX_TOKENS || ''),
      'process.env.AI_TEMPERATURE': JSON.stringify(env.AI_TEMPERATURE || env.VITE_AI_TEMPERATURE || ''),
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-upload-dev-server',
        configureServer(server) {
          // Handle AI requests locally in dev server
          server.middlewares.use('/api/ai', async (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              return res.end();
            }

            const mockRes = {
              statusCode: 200,
              headers: {},
              setHeader(k, v) { res.setHeader(k, v); return this; },
              status(code) { this.statusCode = code; return this; },
              json(obj) {
                res.statusCode = this.statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(obj));
                return this;
              },
              end() {
                res.statusCode = this.statusCode;
                res.end();
                return this;
              }
            };

            let body = {};
            if (req.method === 'POST') {
              let raw = '';
              req.on('data', (chunk) => { raw += chunk; });
              await new Promise((resolve) => req.on('end', resolve));
              try { body = JSON.parse(raw); } catch {
                // ignore
              }
            }

            try {
              const { default: handler } = await import('./api/ai.js');
              const urlObj = new URL(req.url, 'http://localhost');
              const mockReq = {
                method: req.method,
                query: Object.fromEntries(urlObj.searchParams),
                body
              };
              await handler(mockReq, mockRes);
            } catch (err) {
              console.error('Dev AI Middleware Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal AI dev middleware error' }));
            }
          });

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
                console.error('Dev Upload Error:', err);
                try {
                  const parsedBody = JSON.parse(body);
                  if (parsedBody && parsedBody.imageBase64) {
                    const fallbackUrl = parsedBody.imageBase64.length <= 500000
                      ? parsedBody.imageBase64
                      : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({
                      success: true,
                      url: fallbackUrl,
                      key: `dev-${Date.now()}`
                    }));
                  }
                } catch {
                  // ignore fallback error
                }

                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: err.message || 'Failed to upload image' }));
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
            } catch {
              return next();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
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
