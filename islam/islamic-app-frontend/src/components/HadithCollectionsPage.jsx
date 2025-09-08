import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HadithCollectionsPage.css';

// بيانات وهمية لتجنب مشاكل الشبكة مؤقتًا
const mockCollections = [
  { name: 'bukhari', title: 'صحيح البخاري', totalHadiths: 7563, hasBooks: true },
  { name: 'muslim', title: 'صحيح مسلم', totalHadiths: 7453, hasBooks: true },
  { name: 'nasai', title: 'سنن النسائي', totalHadiths: 5760, hasBooks: true },
  { name: 'abudawud', title: 'سنن أبي داود', totalHadiths: 5274, hasBooks: true },
  { name: 'tirmidhi', title: 'جامع الترمذي', totalHadiths: 3956, hasBooks: true },
  { name: 'ibnmajah', title: 'سنن ابن ماجه', totalHadiths: 4341, hasBooks: true },
  { name: 'malik', title: 'موطأ مالك', totalHadiths: 1861, hasBooks: true },
  { name: 'riyadussalihin', title: 'رياض الصالحين', totalHadiths: 1905, hasBooks: true },
];

const HadithCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setCollections(mockCollections);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // الدالة التي تنقلنا لصفحة الأحاديث
  const handleCollectionClick = (collectionName) => {
    // collectionName هنا هو الاسم الإنجليزي (e.g., 'bukhari')
    navigate(`/hadith/${collectionName}`);
  };

  return (
    <div className="hadith-page-container">
      <header className="hadith-title-header">
        <h1 className="hadith-main-title">كتب الحديث الشريف</h1>
        <p className="hadith-subtitle">اختر الكتاب الذي تود تصفحه</p>
      </header>

      {loading ? (
        <div className="loading-message">جاري تحميل قائمة الكتب...</div>
      ) : (
        <div className="hadith-collections-list">
          {collections.map(collection => (
            <div 
              key={collection.name} 
              className="hadith-collection-card"
              // 👇 التصحيح الجذري هنا: نمرر الاسم الإنجليزي 'collection.name' 👇
              onClick={() => handleCollectionClick(collection.name)}
            >
              <h2 className="collection-title-arabic">{collection.title}</h2>
              <p className="collection-total-hadiths">
                عدد الأحاديث: {collection.totalHadiths}
              </p>
              <p className="collection-name-english">{collection.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HadithCollectionsPage;
