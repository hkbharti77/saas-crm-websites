import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import {
  analyzeVisibilityProbeResult,
  evaluateTechnicalGeoHealth,
  evaluateBrowserSeoReadiness,
  PRIORITY_SERP_ROUTES,
} from './src/utils/aiVisibilityAnalyzer.js';

dotenv.config();
if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });
}

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';
const ROOT_DIR = process.cwd();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) return null;
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function safeReadFile(relativePath: string): string {
  const fullPath = path.resolve(ROOT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) return '';
  return fs.readFileSync(fullPath, 'utf8');
}

async function createServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Live Technical GEO / AEO & Browser SEO Health Inspector
  app.get('/api/ai-visibility/health', (_req: Request, res: Response) => {
    try {
      const sitemapXml = safeReadFile('public/sitemap.xml');
      const report = evaluateTechnicalGeoHealth({
        robotsTxt: safeReadFile('public/robots.txt'),
        llmsTxt: safeReadFile('public/llms.txt'),
        llmsFullTxt: safeReadFile('public/llms-full.txt'),
        llmSummaryRaw: safeReadFile('public/api/llm-summary.json'),
        rssXml: safeReadFile('public/rss.xml'),
        sitemapXml,
        indexHtml: safeReadFile('index.html'),
        schemasJs: safeReadFile('src/utils/schemas.js'),
      });

      const prerenderedPages: Record<string, string> = {};
      for (const item of PRIORITY_SERP_ROUTES) {
        const cleanRoute = item.route.replace(/^\/+|\/+$/g, '');
        const distRelPath = cleanRoute ? `dist/${cleanRoute}/index.html` : 'dist/index.html';
        const content = safeReadFile(distRelPath);
        if (content) {
          prerenderedPages[item.route] = content;
        }
      }

      const browserSeo = evaluateBrowserSeoReadiness({
        vercelJsonRaw: safeReadFile('vercel.json'),
        sitemapXml,
        headerJsx: safeReadFile('src/components/Header.jsx'),
        prerenderedPages,
      });

      res.status(200).json({ ok: true, report, browserSeo });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to inspect technical GEO health.';
      res.status(500).json({ ok: false, error: message });
    }
  });

  // Live Google Search-Grounded Gemini AI Visibility Probe
  app.post('/api/ai-visibility/probe', async (req: Request, res: Response) => {
    const rawQuery = typeof req.body?.query === 'string' ? req.body.query.trim() : '';
    if (!rawQuery) {
      res.status(400).json({ ok: false, error: 'Please provide a search query to probe.' });
      return;
    }
    if (rawQuery.length > 300) {
      res.status(400).json({ ok: false, error: 'Query must be 300 characters or fewer.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        ok: false,
        code: 'GEMINI_API_KEY_MISSING',
        error:
          'GEMINI_API_KEY is not configured in the server environment. Configure it in Settings > Secrets to enable live Search-grounded Gemini visibility probes.',
      });
      return;
    }

    try {
      const startedAt = Date.now();
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: rawQuery,
        config: {
          systemInstruction:
            'Answer the user search query objectively and concisely using live Google Search results. Name the top relevant software platforms, vendors, or engineering providers found in current search results and briefly explain why each is relevant. Do not invent brands or URLs.',
          tools: [{ googleSearch: {} }],
        },
      });

      const answerText = response.text ?? '';
      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const webSearchQueries =
        response.candidates?.[0]?.groundingMetadata?.webSearchQueries ?? [];

      const analysis = analyzeVisibilityProbeResult({
        query: rawQuery,
        answerText,
        groundingChunks,
      });

      res.status(200).json({
        ok: true,
        model: 'gemini-4-hydrogen',
        platform: 'Gemini',
        checkedAt: new Date().toISOString(),
        durationMs: Date.now() - startedAt,
        webSearchQueries,
        answerText,
        analysis,
      });
    } catch (err: unknown) {
      const errorObj = err as { status?: number; message?: string };
      const status = typeof errorObj?.status === 'number' && errorObj.status >= 400 ? errorObj.status : 502;
      let message =
        errorObj?.message || 'Live Gemini Search grounding request failed. Please retry shortly.';
      if (typeof message === 'string' && message.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(message);
          if (parsed?.error?.message) {
            message = parsed.error.message;
          }
        } catch {
          /* keep original message */
        }
      }
      res.status(status).json({
        ok: false,
        error: message,
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(ROOT_DIR, 'dist');
    app.use(express.static(distDir, { extensions: ['html'] }));
    app.get('/{*splat}', (req: Request, res: Response) => {
      const cleanPath = req.path.replace(/^\/+|\/+$/g, '');
      const prerenderedPath = cleanPath
        ? path.join(distDir, cleanPath, 'index.html')
        : path.join(distDir, 'index.html');
      if (fs.existsSync(prerenderedPath)) {
        res.sendFile(prerenderedPath);
        return;
      }
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gyan VaniAi server listening on http://localhost:${PORT} (${IS_PROD ? 'production' : 'development'})`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
