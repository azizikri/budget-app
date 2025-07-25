import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import { beasties } from 'vite-plugin-beasties';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
      filename: 'stats.html',
    }),
    beasties({
      options: {
        preload: 'swap',
        pruneSource: true,
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts'
            }
          }
        ],
        // Exclude dev dependencies from precaching
        globIgnores: [
          '**/node_modules/**/*',
          '**/.vite/**/*',
          '**/dist/**/*',
          '**/dev-dist/**/*'
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Kalkulator Budget Bulanan',
        short_name: 'Budget App',
        description: 'Aplikasi kalkulator budget bulanan untuk alokasi keuangan pribadi Anda',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'id',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: false // Disable PWA in development to avoid chunk issues
      }
    })
  ],
  optimizeDeps: {
    holdUntilCrawlEnd: false,
  },
  server: {
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/components/AllocationCards.tsx',
        './src/components/AllocationProgress.tsx',
        './src/components/IncomeInput.tsx',
        './src/components/InvestmentBreakdown.tsx',
        './src/components/NeedsChecklist.tsx'
      ]
    }
  },
  css: {
    preprocessorMaxWorkers: true
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
} satisfies UserConfig)