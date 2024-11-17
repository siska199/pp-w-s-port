import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    checker({
      typescript: true
    })
  ],
  define: {
    global: 'window'
  },
  server: {
    open: true,
    port: 5173,
    host: true,
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  build: {
    minify: true,
    rollupOptions: {
      treeshake: true
    },
    sourcemap: true
  },

  // esbuild: {
  //   drop: ['console', 'debugger']
  // }
})
