import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HadithCollectionsPage.css'; // سننشئ هذا الملف أيضًا

const HadithCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // جلب قائمة كتب الحديث من API
        const response = await axios.get('https://api.sunnah.com/v1/collections');
        const filteredData = response.data.data.filter(col => col.hasBooks);
        setCollections(filteredData);
      } catch (error) {
        console.error("Error fetching Hadith collections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const handleCollectionClick = (collectionName) => {
    // سيتم تفعيل هذا لاحقًا للانتقال لصفحة الأحاديث
    // navigate(`/hadith/${collectionName}`);
    alert(`تم اختيار كتاب: ${collectionName}`);
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
