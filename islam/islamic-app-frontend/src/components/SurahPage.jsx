import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SurahPage.css';
import surahStarts from '../data/surah-page-starts.json';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isComponentLoading, setIsComponentLoading] = useState(true); // تحميل المكون الأولي
  const [isImageLoading, setIsImageLoading] = useState(true); // 👇 حالة جديدة لتحميل الصورة 👇

  useEffect(() => {
    const startingPage = surahStarts[surahNumber];
    if (startingPage) {
      setCurrentPage(startingPage);
    }
    setIsComponentLoading(false);
  }, [surahNumber]);

  // 👇 دالة جديدة يتم استدعاؤها عند اكتمال تحميل الصورة 👇
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // 👇 دالة جديدة يتم استدعاؤها عند حدوث خطأ في تحميل الصورة 👇
  const handleImageError = () => {
    console.error("خطأ في تحميل صورة الصفحة.");
    setIsImageLoading(false); // إيقاف التحميل حتى لو حدث خطأ لعرض رسالة بديلة
  };

  // عند تغيير الصفحة، أعد ضبط حالة تحميل الصورة
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage < 604) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // 👇 استخدام مصدر الصور الجديد والموثوق من quran.com 👇
  const imageUrl = `https://images.quran.com/images/p${currentPage}.png`;

  if (isComponentLoading) {
    return <div className="loading-message">جاري تهيئة المصحف...</div>;
  }

  return (
    <div className="mushaf-container">
      <div className="mushaf-page-wrapper">
        {/* 👇 إظهار مؤشر التحميل أثناء تحميل الصورة 👇 */}
        {isImageLoading && <div className="image-loading-spinner"></div>}
        
        <img
          key={imageUrl} // استخدام key لإجبار React على إعادة تحميل المكون عند تغيير الرابط
          src={imageUrl}
          alt={`صفحة رقم ${currentPage}`}
          className="mushaf-page-image"
          onLoad={handleImageLoad} // استدعاء الدالة عند نجاح التحميل
          onError={handleImageError} // استدعاء الدالة عند فشل التحميل
          style={{ visibility: isImageLoading ? 'hidden' : 'visible' }} // إخفاء الصورة حتى تكتمل
        />
        
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
