// vite.config.ts
import react from 'file:///S:/my-project-199/s-portofolio/client/node_modules/@vitejs/plugin-react/dist/index.mjs'
import { defineConfig } from 'file:///S:/my-project-199/s-portofolio/client/node_modules/vite/dist/node/index.js'
import checker from 'file:///S:/my-project-199/s-portofolio/client/node_modules/vite-plugin-checker/dist/esm/main.js'
import svgr from 'file:///S:/my-project-199/s-portofolio/client/node_modules/vite-plugin-svgr/dist/index.js'
import tsconfigPaths from 'file:///S:/my-project-199/s-portofolio/client/node_modules/vite-tsconfig-paths/dist/index.js'
var vite_config_default = defineConfig({
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
    port: 3e3,
    strictPort: true
  },
  build: {
    minify: true
  },
  tree
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJTOlxcXFxteS1wcm9qZWN0LTE5OVxcXFxzLXBvcnRvZm9saW9cXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJTOlxcXFxteS1wcm9qZWN0LTE5OVxcXFxzLXBvcnRvZm9saW9cXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9TOi9teS1wcm9qZWN0LTE5OS9zLXBvcnRvZm9saW8vY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBjaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJ1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIHN2Z3IoKSxcbiAgICBjaGVja2VyKHtcbiAgICAgIHR5cGVzY3JpcHQ6IHRydWVcbiAgICB9KVxuICBdLFxuICBkZWZpbmU6IHtcbiAgICBnbG9iYWw6ICd3aW5kb3cnXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIG9wZW46IHRydWUsXG4gICAgcG9ydDogNTE3MyxcbiAgICBob3N0OiB0cnVlLFxuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlXG4gICAgfVxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBzdHJpY3RQb3J0OiB0cnVlXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbWluaWZ5OiB0cnVlLFxuICAgIFxuICB9LFxuICB0cmVlXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UyxPQUFPLFdBQVc7QUFDM1QsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sVUFBVTtBQUNqQixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUVWO0FBQUEsRUFDQTtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
