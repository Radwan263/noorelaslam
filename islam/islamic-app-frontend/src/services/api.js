// src/services/api.js
import axios from 'axios';

// إنشاء نسخة خاصة من axios مع إعدادات افتراضية
const apiClient = axios.create({
  // الرابط الأساسي للواجهة الخلفية الخاصة بك
  baseURL: 'https://radwan2633.pythonanywhere.com/',
      
  // إعدادات أخرى يمكنك إضافتها لاحقًا
  headers: {
    'Content-Type': 'application/json',
  }
});

// تصدير هذه النسخة لاستخدامها في كل مكان في التطبيق
export default apiClient;

