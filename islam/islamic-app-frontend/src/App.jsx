import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// استيراد الصفحات والمكونات الرئيسية
import HomePage from './pages/HomePage'; // افترضت وجود هذا الملف

// استيراد مكونات قسم القرآن
import QuranSection from './components/QuranSection';
import SurahPage from './components/SurahPage';

// استيراد مكونات قسم الحديث
import HadithCollectionsPage from './components/HadithCollectionsPage';
import HadithListPage from './components/HadithListPage';

// استيراد مكونات قسم الأذكار
import AzkarCategoriesPage from './components/AzkarCategoriesPage';
import AzkarDisplayPage from './components/AzkarDisplayPage';

// استيراد مكونات قسم الأدعية (الجديد)
import DuasCategoriesPage from './components/DuasCategoriesPage';
import DuasPage from './components/DuasPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* المسار الرئيسي */}
        <Route path="/" element={<HomePage />} />

        {/* مسارات قسم القرآن */}
        <Route path="/quran" element={<QuranSection />} />
        <Route path="/surah/:surahNumber" element={<SurahPage />} />

        {/* مسارات قسم الحديث */}
        <Route path="/hadith" element={<HadithCollectionsPage />} />
        <Route path="/hadith/:collectionName" element={<HadithListPage />} />

        {/* مسارات قسم الأذكار */}
        <Route path="/azkar" element={<AzkarCategoriesPage />} />
        <Route path="/azkar/:categoryId" element={<AzkarDisplayPage />} />

        {/* مسارات قسم الأدعية */}
        <Route path="/duas" element={<DuasCategoriesPage />} />
        <Route path="/duas/:categoryId" element={<DuasPage />} />
        
        {/* يمكنك إضافة مسارات أخرى هنا (مثل تسجيل الدخول، الإعدادات، إلخ) */}
      </Routes>
    </Router>
  );
}

export default App;
