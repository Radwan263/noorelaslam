import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurahPage.css'; // انتبه: قمنا بتغيير اسم ملف CSS وطريقة استيراده

const SurahPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = 604;
  const imageUrl = `https://qurancomplex.gov.sa/wp-content/uploads/2022/10/${currentPage}.png`;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setIsLoading(true);
    }
  };

  return (
    <div className="pageContainer">
      <div className="header">
        <button onClick={() => navigate('/')} className="backButton">
          الرئيسية
        </button>
        <div className="pageNumber">صفحة {currentPage}</div>
      </div>

      <div className="imageWrapper">
        {isLoading && <div className="loader">جاري تحميل الصفحة...</div>}
        <img
          src={imageUrl}
          alt={`صفحة ${currentPage} من القرآن الكريم`}
          className="quranImage"
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>

      <div className="navigation">
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          الصفحة التالية
        </button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          الصفحة السابقة
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
