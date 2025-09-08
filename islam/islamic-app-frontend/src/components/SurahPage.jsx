import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SurahPage.css'; // سنقوم بتحديث هذا الملف أيضًا

// هذا الملف يحتوي على رقم الصفحة التي تبدأ فيها كل سورة
import surahStarts from '../data/surah-page-starts.json';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();

  // الحالة لتتبع رقم الصفحة الحالية
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // عند تحميل المكون، ابحث عن الصفحة التي تبدأ بها السورة
    const startingPage = surahStarts[surahNumber];
    if (startingPage) {
      setCurrentPage(startingPage);
    }
    setLoading(false);
  }, [surahNumber]);

  // دالة لتقليب الصفحات
  const goToNextPage = () => {
    if (currentPage > 1) { // صفحات المصحف معكوسة، فالصفحة التالية رقمها أقل
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage < 604) { // 604 هو عدد صفحات مصحف المدينة
      setCurrentPage(prev => prev + 1);
    }
  };

  // دالة لتنسيق رقم الصفحة (e.g., 1 -> 001, 12 -> 012, 123 -> 123)
  const formatPageNumber = (num) => {
    return num.toString().padStart(3, '0');
  };

  // رابط صورة الصفحة الحالية
  const imageUrl = `https://everyayah.com/data/images_png/1/${formatPageNumber(currentPage)}.png`;

  if (loading) {
    return <div className="loading-message">جاري تحميل المصحف...</div>;
  }

  return (
    <div className="mushaf-container">
      <div className="mushaf-page-wrapper">
        <img src={imageUrl} alt={`صفحة رقم ${currentPage}`} className="mushaf-page-image" />
        
        {/* أزرار التقليب */}
        <button className="nav-button prev-page" onClick={goToPreviousPage}>&#9664;</button>
        <button className="nav-button next-page" onClick={goToNextPage}>&#9654;</button>
      </div>

      <div className="mushaf-toolbar">
        <button onClick={() => navigate('/quran')} className="back-to-index-btn">
          العودة للفهرس
        </button>
        <span className="page-number-display">صفحة {currentPage}</span>
      </div>
    </div>
  );
};

export default SurahPage;
