import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // سنقوم بإنشاء هذا الملف إذا لم يكن موجودًا

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
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

        {/* 👇 البطاقة الجديدة التي تمت إضافتها 👇 */}
        <div className="menu-item" onClick={() => navigate('/hadith')}>
          <div className="menu-item-icon">📜</div>
          <h2 className="menu-item-title">الأحاديث النبوية</h2>
          <p className="menu-item-description">تصفح كتب الحديث الشريف</p>
        </div>

        {/* يمكنك إضافة المزيد من البطاقات هنا مستقبلاً */}
        {/*
        <div className="menu-item" onClick={() => navigate('/prayer-times')}>
          <div className="menu-item-icon">🕌</div>
          <h2 className="menu-item-title">مواقيت الصلاة</h2>
          <p className="menu-item-description">اعرف أوقات الصلاة لمدينتك</p>
        </div>
        */}
      </main>
    </div>
  );
};

export default HomePage;
