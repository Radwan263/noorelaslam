import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuranSection from './components/QuranSection';
import SurahPage from './components/SurahPage';
import HadithCollectionsPage from './components/HadithCollectionsPage';
import HadithListPage from './components/HadithListPage';
import AzkarCategoriesPage from './components/AzkarCategoriesPage';
import AzkarDisplayPage from './components/AzkarDisplayPage';
import DuasPage from './components/DuasPage';
import AsmaulHusnaPage from './components/AsmaulHusnaPage';
import SadaqaJariyaPage from './components/SadaqaJariyaPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// --- مكون جديد لإدارة الـ "key" ---
// هذا المكون سيقوم باستخراج المسار الحالي واستخدامه كـ "key"
// مما يجبر React على إعادة تحميل الصفحة عند تغيير المسار
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/quran" element={<QuranSection />} />
      {/* 👇 السطر الأهم: لا نحتاج لإضافة key هنا لأننا أضفناه في الأعلى 👇 */}
      <Route path="/quran/:surahNumber" element={<SurahPage />} />
      <Route path="/hadith" element={<HadithCollectionsPage />} />
      <Route path="/hadith/:collectionName" element={<HadithListPage />} />
      <Route path="/azkar" element={<AzkarCategoriesPage />} />
      <Route path="/azkar/:category" element={<AzkarDisplayPage />} />
      <Route path="/duas" element={<DuasPage />} />
      <Route path="/asma-ul-husna" element={<AsmaulHusnaPage />} />
      <Route path="/sadaqa-jariya" element={<SadaqaJariyaPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};


function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
