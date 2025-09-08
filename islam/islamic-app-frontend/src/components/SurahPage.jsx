import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SurahPage.module.css'; // 👈 تغيير هنا
import surahStarts from '../data/surah-page-starts.json';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isComponentLoading, setIsComponentLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const startingPage = surahStarts[surahNumber];
    if (startingPage) {
      setCurrentPage(startingPage);
    }
    setIsComponentLoading(false);
  }, [surahNumber]);

  const handleImageLoad = () => setIsImageLoading(false);
  const handleImageError = () => setIsImageLoading(false);

  useEffect(() => {
    setIsImageLoading(true);
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < 604) setCurrentPage(prev => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const imageUrl = `https://images.quran.com/images/p${currentPage}.png`;

  if (isComponentLoading) {
    return <div className={styles['loading-message']}>جاري تهيئة المصحف...</div>;
  }

  return (
    <div className={styles['mushaf-container']}>
      <div className={styles['mushaf-page-wrapper']}>
        {isImageLoading && <div className={styles['image-loading-spinner']}></div>}
        <img
          key={imageUrl}
          src={imageUrl}
          alt={`صفحة رقم ${currentPage}`}
          className={styles['mushaf-page-image']}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ visibility: isImageLoading ? 'hidden' : 'visible' }}
        />
        <button className={`${styles['nav-button']} ${styles['prev-page']}`} onClick={goToPreviousPage}>&#9664;</button>
        <button className={`${styles['nav-button']} ${styles['next-page']}`} onClick={goToNextPage}>&#9654;</button>
      </div>

      <div className={styles['mushaf-toolbar']}>
        <button onClick={() => navigate('/quran')} className={styles['back-to-index-btn']}>
          العودة للفهرس
        </button>
        <span className={styles['page-number-display']}>صفحة {currentPage}</span>
      </div>
    </div>
  );
};

export default SurahPage;
