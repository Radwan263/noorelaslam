import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// --- الإضافة الجديدة ---
// 1. استيراد صفحة التسبيح
import TasbeehPage from './pages/TasbeehPage';

function App() {
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

        {/* --- الإضافة الجديدة --- */}
        {/* 2. إضافة مسار لصفحة التسبيح */}
        <Route path="/tasbeeh" element={<TasbeehPage />} />

      </Routes>
    </Router>
  );
}

export default App;
