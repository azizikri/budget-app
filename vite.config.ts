import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import { beasties } from 'vite-plugin-beasties';

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
