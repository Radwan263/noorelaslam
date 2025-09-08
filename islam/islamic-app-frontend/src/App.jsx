import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import QuranSection from './components/QuranSection.jsx';
import SurahPage from './components/SurahPage.jsx';
// 👇 إضافة جديدة (سننشئ هذا الملف بعد قليل)
import HadithPage from './components/HadithPage.jsx'; 

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
          <Route path="/surah/:surahNumber" element={<SurahPage />} />
          {/* 👇 المسار الجديد لقسم الأحاديث 👇 */}
          <Route path="/hadith" element={<HadithPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
