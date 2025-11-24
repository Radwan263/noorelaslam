import React, { useState, useEffect } from 'react';
// 1. تأكد من استخدام HashRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// استيراد الصفحات والمكونات الحالية
import HomePage from './pages/HomePage';
import QuranSection from './components/QuranSection';
import SurahPage from './components/SurahPage';
import HadithCollectionsPage from './components/HadithCollectionsPage';
import HadithListPage from './components/HadithListPage';
import AzkarCategoriesPage from './components/AzkarCategoriesPage';
import AzkarDisplayPage from './components/AzkarDisplayPage';
import DuasCategoriesPage from './components/DuasCategoriesPage';
import DuasPage from './components/DuasPage';
import SadaqaJariyaPage from './components/SadaqaJariyaPage'; 

// استيراد صفحة التسبيح
import TasbeehPage from './pages/TasbeehPage';

function App() {
  // إضافة حالة للتحقق من الاتصال بالإنترنت
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // إضافة مستمعي الأحداث للتحقق من حالة الاتصال
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // تنظيف مستمعي الأحداث عند إزالة المكون
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // إذا لم يكن هناك اتصال، اعرض رسالة بدلاً من التطبيق
  if (!isOnline) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px', 
        fontSize: '20px', 
        color: '#333', // لون نص مناسب
        backgroundColor: '#f0f0f0', // خلفية فاتحة
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1>لا يوجد اتصال بالإنترنت</h1>
        <p>الرجاء التحقق من اتصالك بالشبكة والمحاولة مرة أخرى.</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* المسارات القديمة */}
        <Route path="/" element={<HomePage />} />
        <Route path="/quran" element={<QuranSection />} />
        <Route path="/surah/:surahNumber" element={<SurahPage />} />
        <Route path="/hadith" element={<HadithCollectionsPage />} />
        <Route path="/hadith/:collectionName" element={<HadithListPage />} />
        <Route path="/azkar" element={<AzkarCategoriesPage />} />
        <Route path="/azkar/:categoryId" element={<AzkarDisplayPage />} />
        <Route path="/duas" element={<DuasCategoriesPage />} />
        <Route path="/duas/:categoryId" element={<DuasPage />} />
        <Route path="/sadaqa-jariya" element={<SadaqaJariyaPage />} />

        {/* مسار صفحة التسبيح */}
        <Route path="/tasbeeh" element={<TasbeehPage />} />

      </Routes>
    </Router>
  );
}

export default App;
