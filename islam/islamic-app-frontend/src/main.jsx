import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// 👇 استيراد الراوتر الخاص بالموبايل
import { HashRouter } from 'react-router-dom';
// 👇 استيراد متحكم الثيم (عشان وضع الليل والنهار)
import { ThemeProvider } from './context/ThemeContext';

// ==========================================
// 🚨 بداية كود كشف الأخطاء (زي ما هو) 🚨
// ==========================================

window.onerror = function(message, source, lineno, colno, error) {
  alert('❌ خطأ في الكود (System Error):\n' + message + '\n📍 في السطر: ' + lineno);
};

window.addEventListener('unhandledrejection', function(event) {
  alert('❌ خطأ في البيانات (Promise Error):\n' + event.reason);
});

// ==========================================
// 🏁 نهاية كود كشف الأخطاء
// ==========================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. غلفنا التطبيق بـ ThemeProvider عشان الألوان تشتغل */}
    <ThemeProvider>
      {/* 2. وغلفناه بـ HashRouter عشان التنقل يشتغل في الـ APK */}
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
