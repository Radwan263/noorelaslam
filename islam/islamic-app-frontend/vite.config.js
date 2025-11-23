// vite.config.js
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
  server: {
    proxy: {
      // أي طلب يبدأ بـ /api سيتم تحويله إلى الباك إند
      '/api': {
        target: 'https://radwan2633.pythonanywhere.com', // رابط الباك إند الخاص بك
        changeOrigin: true, // ضروري للتحويل الصحيح
        rewrite: (path) => path.replace(/^\/api/, ''), // إزالة /api من بداية الطلب قبل إرساله
      },
    },
  },
})
