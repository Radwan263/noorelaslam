import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 👇 استيراد Link
import './HomePage.css';

// --- المكونات المنبثقة (Pop-ups) ---

const SideMenu = ({ isOpen, onClose }) => {
  // لا حاجة لـ useNavigate هنا بعد الآن
  if (!isOpen) return null;

  return (
    // 👇 الهيكل الجديد: طبقة شفافة منفصلة عن القائمة الفعلية 👇
    <>
      <div className="side-menu-overlay" onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <h3>القائمة الرئيسية</h3>
        {/* 👇 استخدام مكون Link للتنقل الصحيح في React Router 👇 */}
        <Link to="/login" onClick={onClose}>تسجيل الدخول</Link>
        <Link to="/register" onClick={onClose}>إنشاء حساب</Link>
      </div>
    </>
  );
};

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <h3>ابحث في محتوى التطبيق</h3>
        <input type="text" placeholder="اكتب اسم سورة، حديث، ذكر..." />
        <button>بحث</button>
      </div>
    </div>
  );
};

// --- باقي المكونات تبقى كما هي ---

const PrayerTimesWidget = () => {
  return (
    <div className="prayer-times-widget">
      <p>سيتم عرض مواقيت الصلاة هنا قريبًا...</p>
      <button className="location-button">تحديد الموقع</button>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <div className="home-container">
      <div className="top-nav-bar">
        <button className="top-nav-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <button className="top-nav-btn" onClick={() => setSearchOpen(true)}>🔍</button>
      </div>

      <SideMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />

      <header className="home-header">
        <h1 className="home-title">تطبيق إسلامي</h1>
        <p className="home-subtitle">وجهتك الإيمانية المتكاملة</p>
      </header>
      
      <main className="menu-container">
        <div className="menu-item" onClick={() => navigate('/quran')}>
          <div className="menu-item-icon">📖</div>
          <h2 className="menu-item-title">القرآن الكريم</h2>
          <p className="menu-item-description">تصفح وقراءة السور القرآنية</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/hadith')}>
          <div className="menu-item-icon">📜</div>
          <h2 className="menu-item-title">الأحاديث النبوية</h2>
          <p className="menu-item-description">تصفح كتب الحديث الشريف</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/azkar')}>
          <div className="menu-item-icon">🤲</div>
          <h2 className="menu-item-title">الأذكار</h2>
          <p className="menu-item-description">حصن المسلم اليومي</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/duas')}>
          <div className="menu-item-icon">🙌</div>
          <h2 className="menu-item-title">أدعية وفضلها</h2>
          <p className="menu-item-description">أدعية من القرآن والسنة</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/asma-ul-husna')}>
          <div className="menu-item-icon">✨</div>
          <h2 className="menu-item-title">أسماء الله الحسنى</h2>
          <p className="menu-item-description">تعرف على أسماء الله وصفاته</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/sadaqa-jariya')}>
          <div className="menu-item-icon">❤️</div>
          <h2 className="menu-item-title">صدقة جارية</h2>
          <p className="menu-item-description">ادعُ لمن تحب وتصدق بالدعاء</p>
        </div>
      </main>

      <div className="prayer-times-section">
        <PrayerTimesWidget />
      </div>
    </div>
  );
};

export default HomePage;
