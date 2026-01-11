import React, { useState, useEffect } from 'react';
// 👇 1. شيلنا HashRouter/Router من هنا خالص
import { Routes, Route } from 'react-router-dom';

// استيراد الصفحات (زي ما هي عندك)
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
import TasbeehPage from './pages/TasbeehPage';

function App() {
  // كود النت سيبه زي ما هو أو شيله مؤقتاً للتجربة
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>لا يوجد اتصال بالإنترنت</h1>
      </div>
    );
  }

  return (
    // 👇 2. هنا كان فيه <Router>.. شلناه وحطينا div عادي
    <div className="app-container">
      <Routes>
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
        <Route path="/tasbeeh" element={<TasbeehPage />} />
      </Routes>
    </div>
  );
}

export default App;
