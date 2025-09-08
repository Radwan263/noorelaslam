import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ... (كل استيرادات المكونات السابقة تبقى كما هي)
import HomePage from './pages/HomePage.jsx';
import QuranSection from './components/QuranSection.jsx';
import SurahPage from './components/SurahPage.jsx';
import HadithCollectionsPage from './components/HadithCollectionsPage.jsx';
import HadithListPage from './components/HadithListPage.jsx';
import AzkarCategoriesPage from './components/AzkarCategoriesPage.jsx';
import AzkarDisplayPage from './components/AzkarDisplayPage.jsx';
import DuasPage from './components/DuasPage.jsx';
import AsmaulHusnaPage from './components/AsmaulHusnaPage.jsx';
import SadaqaJariyaPage from './components/SadaqaJariyaPage.jsx';

// 👇 استيراد صفحات تسجيل الدخول الجديدة 👇
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* ... (كل المسارات السابقة تبقى كما هي) ... */}
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
          <Route path="/surah/:surahNumber" element={<SurahPage />} />
          <Route path="/hadith" element={<HadithCollectionsPage />} />
          <Route path="/hadith/:collectionName" element={<HadithListPage />} />
          <Route path="/azkar" element={<AzkarCategoriesPage />} />
          <Route path="/azkar/:categoryId" element={<AzkarDisplayPage />} />
          <Route path="/duas" element={<DuasPage />} />
          <Route path="/asma-ul-husna" element={<AsmaulHusnaPage />} />
          <Route path="/sadaqa-jariya" element={<SadaqaJariyaPage />} />

          {/* 👇 المسارات الجديدة لتسجيل الدخول 👇 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
