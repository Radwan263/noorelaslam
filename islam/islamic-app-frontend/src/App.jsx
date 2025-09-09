import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- استيراد الصفحات والمكونات الرئيسية ---

// افترضت وجود صفحة رئيسية في هذا المسار
import HomePage from './pages/HomePage'; 

// --- استيراد مكونات الأقسام المختلفة ---

// قسم القرآن الكريم
import QuranSection from './components/QuranSection';
import SurahPage from './components/SurahPage';

// قسم الحديث النبوي
import HadithCollectionsPage from './components/HadithCollectionsPage';
import HadithListPage from './components/HadithListPage';

// قسم الأذكار
import AzkarCategoriesPage from './components/AzkarCategoriesPage';
import AzkarDisplayPage from './components/AzkarDisplayPage';

// قسم الأدعية
import DuasCategoriesPage from './components/DuasCategoriesPage';
import DuasPage from './components/DuasPage';

// قسم صدقة جارية (القسم الجديد)
import SadaqaJariyaPage from './components/SadaqaJariyaPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- المسار الرئيسي --- */}
        <Route path="/" element={<HomePage />} />

        {/* --- مسارات قسم القرآن الكريم --- */}
        <Route path="/quran" element={<QuranSection />} />
        <Route path="/surah/:surahNumber" element={<SurahPage />} />

        {/* --- مسارات قسم الحديث النبوي --- */}
        <Route path="/hadith" element={<HadithCollectionsPage />} />
        <Route path="/hadith/:collectionName" element={<HadithListPage />} />

        {/* --- مسارات قسم الأذكار --- */}
        <Route path="/azkar" element={<AzkarCategoriesPage />} />
        <Route path="/azkar/:categoryId" element={<AzkarDisplayPage />} />

        {/* --- مسارات قسم الأدعية --- */}
        <Route path="/duas" element={<DuasCategoriesPage />} />
        <Route path="/duas/:categoryId" element={<DuasPage />} />
        
        {/* --- مسار قسم صدقة جارية --- */}
        <Route path="/sadaqa" element={<SadaqaJariyaPage />} />

        {/* يمكنك إضافة مسارات أخرى هنا (مثل تسجيل الدخول، الإعدادات، إلخ) */}
        
      </Routes>
    </Router>
  );
}

export default App;
