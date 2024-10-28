import basicSsl from '@vitejs/plugin-basic-ssl'
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
    basicSsl(),
    checker({
      typescript: true
    })
  ],
  define: {
    global: 'window'
  },
  server: {
    https: true,
    port: 5173,
    host: true,
    watch: {
      usePolling: true
    },
    hmr: {
      port: 5174
    }
  },
  preview: {
    port: 3000,
    strictPort: true
  }
})
