// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuran, FaBookOpen, FaPrayingHands, FaHandHoldingHeart, FaUser, FaCommentDots, FaMoon } from 'react-icons/fa';
import './HomePage.css';
import logo from '../assets/logo.png'; // استيراد الشعار

const menuItems = [
  { to: "/quran", icon: <FaQuran />, text: "القرآن الكريم" },
  { to: "/tafsir", icon: <FaBookOpen />, text: "تفسير القرآن" },
  { to: "/hadith", icon: <FaCommentDots />, text: "الأحاديث" },
  { to: "/azkar", icon: <FaMoon />, text: "الأذكار" },
  { to: "/dua", icon: <FaPrayingHands />, text: "الأدعية" },
  { to: "/charity", icon: <FaHandHoldingHeart />, text: "صدقة جارية" },
  { to: "/developer", icon: <FaUser />, text: "عن المطور" },
];

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="title-section">
        {/* إضافة الشعار هنا */}
        <img src={logo} alt="شعار نور الإسلام" className="logo-image" />

        <div className="welcome-message">
          <p>مرحبا بك في</p>
          <h1 className="main-title">نور الإسلام</h1>
          <p className="project-name">noorelaslam</p>
        </div>
      </div>

      <nav className="buttons-grid">
        {menuItems.map((item) => (
          <Link key={item.to} to={item.to} className="icon-button">
            <div className="button-icon">{item.icon}</div>
            <span className="button-text">{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default HomePage;
