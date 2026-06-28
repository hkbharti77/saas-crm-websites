import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/privacy', '/terms'],
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        port: 3000,
        host: 'localhost',
      },
    }),
  ],
})
