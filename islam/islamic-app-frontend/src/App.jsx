import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import QuranSection from './components/QuranSection.jsx';
import SurahPage from './components/SurahPage.jsx';
import HadithCollectionsPage from './components/HadithCollectionsPage.jsx';
import HadithListPage from './components/HadithListPage.jsx'; // <-- إضافة جديدة

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
          <Route path="/surah/:surahNumber" element={<SurahPage />} />
          
          {/* مسارات قسم الحديث */}
          <Route path="/hadith" element={<HadithCollectionsPage />} />
          {/* 👇 المسار الجديد لعرض أحاديث كتاب معين 👇 */}
          <Route path="/hadith/:collectionName" element={<HadithListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
