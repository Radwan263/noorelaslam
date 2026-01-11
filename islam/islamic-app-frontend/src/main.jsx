import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// 👇 استيراد الراوتر الخاص بالموبايل (مهم جداً)
import { HashRouter } from 'react-router-dom';

// ==========================================
// 🚨 بداية الكود السحري لكشف الأخطاء 🚨
// ==========================================

// 1. كود بيمسك أي خطأ برمجي (Syntax Error / Crash)
window.onerror = function(message, source, lineno, colno, error) {
  // هيظهر رسالة تنبيه على الموبايل بالتفاصيل
  alert('❌ خطأ في الكود (System Error):\n' + message + '\n📍 في السطر: ' + lineno);
};

// 2. كود بيمسك أخطاء الشبكة والبيانات (Network / Promise Error)
window.addEventListener('unhandledrejection', function(event) {
  alert('❌ خطأ في البيانات (Promise Error):\n' + event.reason);
});

// ==========================================
// 🏁 نهاية كود كشف الأخطاء
// ==========================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* تغليف التطبيق بـ HashRouter عشان يشتغل APK */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
