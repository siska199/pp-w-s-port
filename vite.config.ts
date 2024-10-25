import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), basicSsl()],
  define: {
    global: 'window',
  },
  server: {
    https: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
