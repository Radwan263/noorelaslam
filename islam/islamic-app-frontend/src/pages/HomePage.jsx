import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './HomePage.module.css';

// --- استيراد المكون الجديد ---
import PrayerTimes from '../components/PrayerTimes'; // <-- الخطوة 1: استيراد مكون مواقيت الصلاة

// --- المكونات المنبثقة (Pop-ups) ---
const SideMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={`${styles['side-menu']} ${isOpen ? styles.open : ''}`}>
        <h3>القائمة الرئيسية</h3>
        <Link to="/login" onClick={onClose}>تسجيل الدخول</Link>
        <Link to="/register" onClick={onClose}>إنشاء حساب</Link>
      </div>
    </>
  );
};

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles['search-modal']}>
        <h3>ابحث في محتوى التطبيق</h3>
        <input type="text" placeholder="اكتب اسم سورة، حديث، ذكر..." />
        <button>بحث</button>
      </div>
    </>
  );
};

// --- المكون الرئيسي للصفحة ---
const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <div className={styles['home-page']}>
      <div className={styles['top-bar']}>
        <button className={styles['top-bar-btn']} onClick={() => setSearchOpen(true)}>🔍</button>
        <button className={styles['top-bar-btn']} onClick={() => setMenuOpen(true)}>☰</button>
      </div>

      <SideMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />

      <header className={styles['home-header']}>
        <h1>تطبيق إسلامي</h1>
        <p>وجهتك الإيمانية المتكاملة</p>
      </header>

      <main className={styles['home-grid']}>
        <div className={styles['home-card']} onClick={() => navigate('/quran')}>
          <span className={styles['card-icon']}>📖</span>
          <h2>القرآن الكريم</h2>
          <p>تصفح وقراءة السور القرآنية</p>
        </div>
        <div className={styles['home-card']} onClick={() => navigate('/hadith')}>
          <span className={styles['card-icon']}>📜</span>
          <h2>الأحاديث النبوية</h2>
          <p>تصفح كتب الحديث الشريف</p>
        </div>
        <div className={styles['home-card']} onClick={() => navigate('/azkar')}>
          <span className={styles['card-icon']}>🤲</span>
          <h2>الأذكار</h2>
          <p>حصن المسلم اليومي</p>
        </div>
        <div className={styles['home-card']} onClick={() => navigate('/duas')}>
          <span className={styles['card-icon']}>🙌</span>
          <h2>أدعية وفضلها</h2>
          <p>أدعية من القرآن والسنة</p>
        </div>
        <div className={styles['home-card']} onClick={() => navigate('/asma-ul-husna')}>
          <span className={styles['card-icon']}>✨</span>
          <h2>أسماء الله الحسنى</h2>
          <p>تعرف على أسماء الله وصفاته</p>
        </div>
        <div className={styles['home-card']} onClick={() => navigate('/sadaqa-jariya')}>
          <span className={styles['card-icon']}>❤️</span>
          <h2>صدقة جارية</h2>
          <p>ادعُ لمن تحب وتصدق بالدعاء</p>
        </div>
      </main>

      {/* --- تم تعديل هذا الجزء --- */}
      <footer className={styles['home-footer']}>
        {/* الخطوة 2: وضع المكون هنا بدلاً من المحتوى الثابت */}
        <PrayerTimes />
      </footer>
    </div>
  );
};

export default HomePage;
