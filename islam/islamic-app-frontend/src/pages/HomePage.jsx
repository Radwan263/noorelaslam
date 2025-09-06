import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // سنقوم بتحديث هذا الملف بشكل كبير
import { FaQuran, FaBook, FaPrayingHands, FaHandHoldingHeart, FaDotCircle, FaMosque } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="islamic-theme-container">
      {/* هذا الجزء سيكون داخل القوس الأبيض في الخلفية */}
      <div className="content-area">
        <img src="/logo.png" alt="شعار نور الإسلام" className="home-logo" />
        <h1 className="main-title">نور الإسلام</h1>

        <nav className="buttons-grid">
          <Link to="/quran" className="frame-button">
            <span className="button-text">القرآن الكريم</span>
          </Link>
          <Link to="/hadith" className="frame-button">
            <span className="button-text">الأحاديث</span>
          </Link>
          <Link to="/azkar" className="frame-button">
            <span className="button-text">الأذكار</span>
          </Link>
          <Link to="/duas" className="frame-button">
            <span className="button-text">الأدعية</span>
          </Link>
          <Link to="/sadaqa" className="frame-button">
            <span className="button-text">صدقة جارية</span>
          </Link>
          <Link to="/tasbih" className="frame-button">
            <span className="button-text">السبحة</span>
          </Link>
          <Link to="/prayer-times" className="frame-button">
            <span className="button-text">أوقات الصلاة</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
