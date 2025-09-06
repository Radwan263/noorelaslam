import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// استيراد المكونات الموجودة فقط
import Navbar from './components/Navbar';
import QuranSection from './components/QuranSection';
import HomePage from './pages/HomePage';

// تعليق استيراد المكونات غير الموجودة حاليًا
// import HadithSection from './components/HadithSection';
// import AzkarSection from './components/AzkarSection';
// import DuasSection from './components/DuasSection';
// import SadaqaSection from './components/SadaqaSection';
// import TasbihSection from './components/TasbihSection';
// import PrayerTimesSection from './components/PrayerTimesSection';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. الصفحة الرئيسية (موجودة وتعمل) */}
        <Route path="/" element={<HomePage />} />

        {/* 2. صفحة القرآن (موجودة وتعمل) */}
        <Route path="/quran" element={<><Navbar /><QuranSection /></>} />

        {/* تعليق المسارات للمكونات غير الموجودة */}
        {/* 
        <Route path="/hadith" element={<><Navbar /><HadithSection /></>} />
        <Route path="/azkar" element={<><Navbar /><AzkarSection /></>} />
        <Route path="/duas" element={<><Navbar /><DuasSection /></>} />
        <Route path="/sadaqa" element={<><Navbar /><SadaqaSection /></>} />
        <Route path="/tasbih" element={<><Navbar /><TasbihSection /></>} />
        <Route path="/prayer-times" element={<><Navbar /><PrayerTimesSection /></>} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
