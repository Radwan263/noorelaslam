import React, { useState, useEffect } from 'react';
// 👇 1. شيلنا HashRouter من هنا، وخلينا Routes و Route بس
import { Routes, Route } from 'react-router-dom';

// استيراد الصفحات
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
  
  // ⚠️ ملحوظة: أنا لغيت كود "قطع النت" مؤقتاً
  // عشان التطبيق يفتح معاك حتى لو النت فاصل وتتأكد إنه شغال
  // لأن تطبيقات القرآن والأذكار المفروض تفتح أوفلاين عادي

  return (
    // 👇 2. مسحنا الـ <Router> اللي كان هنا، وسيبنا الـ div أو الـ Routes علطول
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
