import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    basicSsl(),
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
    strictPort: true,
    open: true
  },
  build: {
    minify: true,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/draft-js')) return 'draft-js'
        }
      }
    },
    sourcemap: true,
    chunkSizeWarningLimit: 300
  },

  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})
