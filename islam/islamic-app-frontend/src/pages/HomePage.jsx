import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// --- المكونات المنبثقة (Pop-ups) ---

const SideMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // استدعاء useNavigate هنا
  if (!isOpen) return null;

  // 👇 دالة جديدة للتعامل مع التنقل وإغلاق القائمة 👇
  const handleNavigate = (path) => {
    navigate(path); // أولاً، انتقل إلى الصفحة المطلوبة
    onClose();      // ثانيًا، أغلق القائمة الجانبية
  };

  return (
    <div className="side-menu-overlay" onClick={onClose}>
      <div className="side-menu" onClick={(e) => e.stopPropagation()}>
        <h3>القائمة الرئيسية</h3>
        {/* 👇 استخدام الدالة الجديدة عند النقر 👇 */}
        <a onClick={() => handleNavigate('/login')}>تسجيل الدخول</a>
        <a onClick={() => handleNavigate('/register')}>إنشاء حساب</a>
        {/* يمكن إضافة روابط أخرى هنا مستقبلاً */}
      </div>
    </div>
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

// --- مكون مواقيت الصلاة ---

const PrayerTimesWidget = () => {
  return (
    <div className="prayer-times-widget">
      <p>سيتم عرض مواقيت الصلاة هنا قريبًا...</p>
      <button className="location-button">تحديد الموقع</button>
    </div>
  );
};


// --- المكون الرئيسي للصفحة (لا تغيير هنا) ---

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
