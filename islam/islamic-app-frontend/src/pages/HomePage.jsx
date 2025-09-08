import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// مكون مؤقت لعرض مواقيت الصلاة
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

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">تطبيق إسلامي</h1>
        <p className="home-subtitle">وجهتك الإيمانية المتكاملة</p>
        
        {/* 👇 إضافة ويدجت مواقيت الصلاة 👇 */}
        <PrayerTimesWidget />
      </header>
      
      <main className="menu-container">
        {/* بطاقة القرآن الكريم */}
        <div className="menu-item" onClick={() => navigate('/quran')}>
          <div className="menu-item-icon">📖</div>
          <h2 className="menu-item-title">القرآن الكريم</h2>
          <p className="menu-item-description">تصفح وقراءة السور القرآنية</p>
        </div>

        {/* بطاقة الأحاديث النبوية */}
        <div className="menu-item" onClick={() => navigate('/hadith')}>
          <div className="menu-item-icon">📜</div>
          <h2 className="menu-item-title">الأحاديث النبوية</h2>
          <p className="menu-item-description">تصفح كتب الحديث الشريف</p>
        </div>

        {/* بطاقة الأذكار */}
        <div className="menu-item" onClick={() => navigate('/azkar')}>
          <div className="menu-item-icon">🤲</div>
          <h2 className="menu-item-title">الأذكار</h2>
          <p className="menu-item-description">حصن المسلم اليومي</p>
        </div>

        {/* 👇 بطاقة الأدعية الجديدة 👇 */}
        <div className="menu-item" onClick={() => navigate('/duas')}>
          <div className="menu-item-icon">🙌</div>
          <h2 className="menu-item-title">أدعية وفضلها</h2>
          <p className="menu-item-description">أدعية من القرآن والسنة</p>
        </div>

        {/* 👇 بطاقة أسماء الله الحسنى الجديدة 👇 */}
        <div className="menu-item" onClick={() => navigate('/asma-ul-husna')}>
          <div className="menu-item-icon">✨</div>
          <h2 className="menu-item-title">أسماء الله الحسنى</h2>
          <p className="menu-item-description">تعرف على أسماء الله وصفاته</p>
        </div>

        {/* 👇 بطاقة صدقة جارية الجديدة 👇 */}
        <div className="menu-item" onClick={() => navigate('/sadaqa-jariya')}>
          <div className="menu-item-icon">❤️</div>
          <h2 className="menu-item-title">صدقة جارية</h2>
          <p className="menu-item-description">ادعُ لمن تحب وتصدق بالدعاء</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
