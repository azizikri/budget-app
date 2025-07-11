import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import { beasties } from 'vite-plugin-beasties';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    beasties({
      options: {
        preload: 'swap',
        pruneSource: true, // Enable pruning CSS files
      },
    }),

  ],
})
