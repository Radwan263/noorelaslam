import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import QuranSection from './components/QuranSection.jsx';
import SurahPage from './components/SurahPage.jsx';
import HadithCollectionsPage from './components/HadithCollectionsPage.jsx';
import HadithListPage from './components/HadithListPage.jsx';
import AzkarCategoriesPage from './components/AzkarCategoriesPage.jsx';
import AzkarDisplayPage from './components/AzkarDisplayPage.jsx';

// 👇 استيراد المكونات الهيكلية الجديدة 👇
import DuasPage from './components/DuasPage.jsx';
import AsmaulHusnaPage from './components/AsmaulHusnaPage.jsx';
import SadaqaJariyaPage from './components/SadaqaJariyaPage.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* المسارات الحالية */}
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
          <Route path="/surah/:surahNumber" element={<SurahPage />} />
          <Route path="/hadith" element={<HadithCollectionsPage />} />
          <Route path="/hadith/:collectionName" element={<HadithListPage />} />
          <Route path="/azkar" element={<AzkarCategoriesPage />} />
          <Route path="/azkar/:categoryId" element={<AzkarDisplayPage />} />

          {/* 👇 المسارات الجديدة التي أضفناها 👇 */}
          <Route path="/duas" element={<DuasPage />} />
          <Route path="/asma-ul-husna" element={<AsmaulHusnaPage />} />
          <Route path="/sadaqa-jariya" element={<SadaqaJariyaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
