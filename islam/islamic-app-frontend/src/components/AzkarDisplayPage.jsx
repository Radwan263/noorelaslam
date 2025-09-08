import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import azkarData from '../data/azkar.json';
import './AzkarDisplayPage.css'; // سننشئ هذا الملف الآن

const AzkarDisplayPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState(null);
  const [azkarList, setAzkarList] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const currentCategory = azkarData.categories.find(c => c.id === categoryId);
    const currentAzkar = azkarData.azkar[categoryId] || [];
    
    setCategory(currentCategory);
    setAzkarList(currentAzkar);

    // إعداد الحالة الأولية للعدادات
    const initialCounts = {};
    currentAzkar.forEach(zikr => {
      initialCounts[zikr.id] = zikr.count;
    });
    setCounts(initialCounts);
  }, [categoryId]);

  const handleCounterClick = (zikrId) => {
    setCounts(prevCounts => {
      const newCount = prevCounts[zikrId] > 0 ? prevCounts[zikrId] - 1 : 0;
      // يمكنك إضافة اهتزاز هنا إذا أردت
      if (newCount === 0) {
        // navigator.vibrate(100); // اهتزاز خفيف عند الانتهاء
      }
      return { ...prevCounts, [zikrId]: newCount };
    });
  };

  if (!category) {
    return <div className="loading-message">جاري التحميل...</div>;
  }

  return (
    <div className="azkar-display-container">
      <header className="azkar-display-header">
        <h1>{category.title}</h1>
        <p>{`(${azkarList.length} ذكر)`}</p>
        <button onClick={() => navigate('/azkar')} className="back-to-categories-btn">
          العودة للفئات
        </button>
      </header>

      <div className="azkar-list">
        {azkarList.map((zikr) => (
          <div key={zikr.id} className={`zikr-card ${counts[zikr.id] === 0 ? 'completed' : ''}`}>
            <div className="zikr-content">
              <p className="zikr-text">{zikr.content}</p>
              {zikr.description && <p className="zikr-description">{zikr.description}</p>}
            </div>
            <div className="zikr-counter-section">
              <button 
                className="counter-button"
                onClick={() => handleCounterClick(zikr.id)}
              >
                <span className="counter-number">{counts[zikr.id]}</span>
              </button>
              <div className="counter-label">مرات التكرار</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AzkarDisplayPage;
