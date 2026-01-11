import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, "./src"),
    },
  },
  // 👇 ده التعديل الوحيد المطلوب عشان يمنع إيرور fsevents
  optimizeDeps: {
    exclude: ['fsevents']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://radwan2633.pythonanywhere.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
