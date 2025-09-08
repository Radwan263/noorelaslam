import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">تطبيق إسلامي</h1>
        <p className="home-subtitle">وجهتك الإيمانية المتكاملة</p>
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

        {/* 👇 البطاقة الجديدة لقسم الأذكار 👇 */}
        <div className="menu-item" onClick={() => navigate('/azkar')}>
          <div className="menu-item-icon">🤲</div>
          <h2 className="menu-item-title">الأذكار</h2>
          <p className="menu-item-description">حصن المسلم اليومي</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
