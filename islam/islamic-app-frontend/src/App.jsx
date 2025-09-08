import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 👇 تم تصحيح مسار HomePage هنا 👇
import HomePage from './pages/HomePage.jsx'; 
import QuranSection from './components/QuranSection.jsx';
import SurahPage from './components/SurahPage.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
          <Route path="/surah/:surahNumber" element={<SurahPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
