import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import azkarData from '../data/azkar.json';
import './AzkarDisplayPage.css';

const AzkarDisplayPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState(null);
  const [azkarList, setAzkarList] = useState([]);
  const [currentCounts, setCurrentCounts] = useState({});
  // 👇 حالة جديدة لتجميع الأذكار حسب الفئة (للرقية) 👇
  const [groupedAzkar, setGroupedAzkar] = useState({});

  useEffect(() => {
    const currentCategory = azkarData.categories.find(c => c.id === categoryId);
    const currentAzkar = azkarData.azkar[categoryId] || [];
    
    setCategory(currentCategory);
    setAzkarList(currentAzkar);

    // تجميع الأذكار إذا كانت من الرقية الشرعية
    if (categoryId === 'ruqya') {
      const groups = currentAzkar.reduce((acc, zikr) => {
        const groupKey = zikr.category || 'عام';
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(zikr);
        return acc;
      }, {});
      setGroupedAzkar(groups);
    } else {
      setGroupedAzkar({}); // إفراغ المجموعات للفئات الأخرى
    }

    const initialCounts = {};
    currentAzkar.forEach(zikr => {
      initialCounts[zikr.id] = 0;
    });
    setCurrentCounts(initialCounts);
  }, [categoryId]);

  const handleCounterClick = (zikrId) => {
    setCurrentCounts(prevCounts => {
      const newCount = prevCounts[zikrId] + 1;
      const requiredCount = azkarList.find(z => z.id === zikrId).count;
      if (newCount === requiredCount && navigator.vibrate) {
        navigator.vibrate(100);
      }
      return { ...prevCounts, [zikrId]: newCount };
    });
  };

  const handleResetClick = (zikrId) => {
    setCurrentCounts(prevCounts => ({ ...prevCounts, [zikrId]: 0 }));
  };

  const completedCount = azkarList.filter(zikr => (currentCounts[zikr.id] || 0) >= zikr.count).length;
  const totalAzkar = azkarList.length;
  const progressPercentage = totalAzkar > 0 ? (completedCount / totalAzkar) * 100 : 0;

  const renderZikrCard = (zikr) => {
    const currentCount = currentCounts[zikr.id] || 0;
    const isCompleted = currentCount >= zikr.count;
    return (
      <div key={zikr.id} className={`zikr-card ${isCompleted ? 'completed' : ''}`}>
        <div className="zikr-content">
          <p className="zikr-text">{zikr.content}</p>
          {zikr.description && <p className="zikr-description">{zikr.description}</p>}
        </div>
        <div className="zikr-counter-section">
          {currentCount > 0 && (
            <button className="reset-button" onClick={() => handleResetClick(zikr.id)}>
              &#x21BA;
            </button>
          )}
          <button className="counter-button" onClick={() => handleCounterClick(zikr.id)}>
            <span className="counter-number">{currentCount}</span>
          </button>
          <div className="counter-label">المطلوب: {zikr.count}</div>
        </div>
      </div>
    );
  };

  if (!category) {
    return <div className="loading-message">جاري التحميل...</div>;
  }

  return (
    <div className="azkar-display-container">
      <header className="azkar-display-header">
        <h1>{category.title}</h1>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="progress-text">{`أكملت ${completedCount} من ${totalAzkar}`}</p>
        <button onClick={() => navigate('/azkar')} className="back-to-categories-btn">
          العودة للفئات
        </button>
      </header>

      <div className="azkar-list">
        {/* 👇 منطق العرض الجديد 👇 */}
        {categoryId === 'ruqya' ? (
          Object.keys(groupedAzkar).map(groupName => (
            <div key={groupName} className="zikr-group">
              <h2 className="zikr-group-title">{groupName}</h2>
              {groupedAzkar[groupName].map(zikr => renderZikrCard(zikr))}
            </div>
          ))
        ) : (
          azkarList.map(zikr => renderZikrCard(zikr))
        )}
      </div>
    </div>
  );
};

export default AzkarDisplayPage;
