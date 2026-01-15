import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // دالة عشان نعرف إحنا واقفين في أنهي صفحة
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      {/* 🏠 زر الرئيسية */}
      <button 
        className={`nav-item ${isActive('/') ? 'active' : ''}`} 
        onClick={() => navigate('/')}
      >
        <span className="icon">🏠</span>
        <span className="label">الرئيسية</span>
      </button>

      {/* 📖 زر القرآن */}
      <button 
        className={`nav-item ${isActive('/quran') ? 'active' : ''}`} 
        onClick={() => navigate('/quran')}
      >
        <span className="icon">📖</span>
        <span className="label">القرآن</span>
      </button>

      {/* 🕌 زر الصلاة */}
      <button 
        className={`nav-item ${isActive('/prayer') ? 'active' : ''}`} 
        onClick={() => navigate('/prayer')}
      >
        <span className="icon">🕌</span>
        <span className="label">الصلاة</span>
      </button>

      {/* ☰ زر المزيد */}
      <button 
        className={`nav-item ${isActive('/more') ? 'active' : ''}`} 
        onClick={() => navigate('/more')}
      >
        <span className="icon">☰</span>
        <span className="label">المزيد</span>
      </button>
    </div>
  );
};

export default BottomNav;
