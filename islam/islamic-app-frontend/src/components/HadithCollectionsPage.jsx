import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // <-- تم تعطيل axios مؤقتًا
import { useNavigate } from 'react-router-dom';
import './HadithCollectionsPage.css';

// 👇 بيانات وهمية (مؤقتة) لقائمة كتب الحديث 👇
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
  const [loading, setLoading] = useState(true); // سيبقى true لثانية واحدة لمحاكاة التحميل
  const navigate = useNavigate();

  useEffect(() => {
    // تم استبدال طلب الشبكة بالبيانات الوهمية
    setCollections(mockCollections);
    
    // محاكاة وقت التحميل
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // نصف ثانية

    // تنظيف المؤقت
    return () => clearTimeout(timer);
  }, []);

  // استبدل الدالة القديمة بهذه
const handleCollectionClick = (collectionName) => {
  // الاسم الذي نرسله في الرابط يجب أن يكون بالإنجليزية (مثل 'bukhari')
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
              onClick={() => handleCollectionClick(collection.title)}
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
