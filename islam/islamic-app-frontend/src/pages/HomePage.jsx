import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // تأكد من أن هذا الملف موجود ومستورد

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
      </main>
    </div>
  );
};

export default HomePage;
