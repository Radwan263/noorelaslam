import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import azkarData from '../data/azkar.json';
import './AzkarDisplayPage.css';

const AzkarDisplayPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState(null);
  const [azkarList, setAzkarList] = useState([]);
  // 👇 الحالة الجديدة لتتبع العد الحالي (يبدأ من صفر) 👇
  const [currentCounts, setCurrentCounts] = useState({});

  useEffect(() => {
    const currentCategory = azkarData.categories.find(c => c.id === categoryId);
    const currentAzkar = azkarData.azkar[categoryId] || [];
    
    setCategory(currentCategory);
    setAzkarList(currentAzkar);

    // إعداد الحالة الأولية للعدادات (كلها تبدأ من صفر)
    const initialCounts = {};
    currentAzkar.forEach(zikr => {
      initialCounts[zikr.id] = 0;
    });
    setCurrentCounts(initialCounts);
  }, [categoryId]);

  // 👇 تحديث منطق الضغط على العداد 👇
  const handleCounterClick = (zikrId) => {
    setCurrentCounts(prevCounts => {
      const newCount = prevCounts[zikrId] + 1;
      const requiredCount = azkarList.find(z => z.id === zikrId).count;

      // اهتزاز خفيف عند الوصول للعدد المطلوب
      if (newCount === requiredCount) {
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
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
        {azkarList.map((zikr) => {
          const currentCount = currentCounts[zikr.id] || 0;
          const isCompleted = currentCount >= zikr.count;

          return (
            <div key={zikr.id} className={`zikr-card ${isCompleted ? 'completed' : ''}`}>
              <div className="zikr-content">
                <p className="zikr-text">{zikr.content}</p>
                {zikr.description && <p className="zikr-description">{zikr.description}</p>}
              </div>
              <div className="zikr-counter-section">
                <button 
                  className="counter-button"
                  onClick={() => handleCounterClick(zikr.id)}
                >
                  <span className="counter-number">{currentCount}</span>
                </button>
                {/* 👇 عرض العدد المطلوب كمرجع 👇 */}
                <div className="counter-label">المطلوب: {zikr.count}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AzkarDisplayPage;
