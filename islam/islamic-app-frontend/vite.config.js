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
  // 👇👇 ده الجزء الجديد اللي هيحل المشكلة بإذن الله
  optimizeDeps: {
    exclude: ['fsevents'] // بنقوله ماتحاولش تعالج الملف ده
  },
  build: {
    rollupOptions: {
      // وهنا بنقوله لو لقيته، اعتبره مش موجود وماتوقفش البناء
      external: ['fsevents', 'path', 'fs'], 
    },
  },
  // 👆👆 نهاية الجزء الجديد
  
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
