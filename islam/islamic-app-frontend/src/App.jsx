import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import QuranSection from './components/QuranSection.jsx';
import SurahPage from './components/SurahPage.jsx';
// 👇 تم تغيير اسم المكون هنا إلى الاسم الصحيح 👇
import HadithCollectionsPage from './components/HadithCollectionsPage.jsx'; 

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
          <Route path="/surah/:surahNumber" element={<SurahPage />} />
          {/* 👇 تم تحديث المسار ليعرض المكون الصحيح 👇 */}
          <Route path="/hadith" element={<HadithCollectionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
