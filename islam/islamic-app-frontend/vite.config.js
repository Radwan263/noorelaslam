// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
