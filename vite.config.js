import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/blog',
        '/privacy',
        '/terms',
        '/services/ai-development',
        '/services/ai-agent-development',
        '/services/crm-development',
        '/industries/healthcare-crm',
        '/services/whatsapp-automation',
        '/services/hrms-development',
        '/services/erp-development',
        '/services/web-development',
        '/services/mobile-app-development'
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        port: 3000,
        host: 'localhost'
      }
    })
  ],
})
