import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuranSection from './components/QuranSection';
import SurahPage from './components/SurahPage'; // <-- إضافة جديدة
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
          {/* 👇 إضافة المسار الجديد لصفحة السورة 👇 */}
          <Route path="/surah/:surahNumber" element={<SurahPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
