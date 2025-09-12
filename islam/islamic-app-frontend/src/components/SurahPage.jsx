import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SurahPage.module.css'; // سنستخدم التصميم الجميل الذي استقرينا عليه

const SurahPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = 604;

  // --- هذا هو السطر السحري بناءً على اكتشافك ---
  // تنسيق رقم الصفحة ليكون 3 أرقام (1 -> 001, 10 -> 010)
  const formattedPageNumber = String(currentPage).padStart(3, '0');
  const imageUrl = `https://ia800101.us.archive.org/32/items/z_20240806xx/${formattedPageNumber}.jpg`;
  // ---------------------------------------------

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setIsLoading(true);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          الرئيسية
        </button>
        <div className={styles.pageNumber}>صفحة {currentPage}</div>
      </div>

      <div className={styles.imageWrapper}>
        {isLoading && <div className={styles.loader}>جاري تحميل الصفحة...</div>}
        <img
          src={imageUrl}
          alt={`صفحة ${currentPage} من القرآن الكريم`}
          className={styles.quranImage}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            // في حال فشل تحميل الصورة، نعرض رسالة خطأ
            setIsLoading(false); 
            console.error(`Failed to load image: ${imageUrl}`);
          }}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>

      <div className={styles.navigation}>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          الصفحة التالية
        </button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          الصفحة السابقة
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
