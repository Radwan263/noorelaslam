import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// 👇 1. تغيير طريقة الاستيراد
import styles from './SurahPage.module.css'; 

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentSurahNum = parseInt(surahNumber, 10);

  useEffect(() => {
    if (isNaN(currentSurahNum) || currentSurahNum < 1 || currentSurahNum > 114) {
      navigate('/quran'); 
      return;
    }

    const fetchSurah = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${currentSurahNum}`);
        setSurah(response.data.data);
        setError(null);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات السورة. يرجى المحاولة مرة أخرى.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    window.scrollTo(0, 0); 
  }, [currentSurahNum, navigate]);

  const goToNextSurah = () => {
    if (currentSurahNum < 114) {
      navigate(`/quran/${currentSurahNum + 1}`);
    }
  };

  const goToPrevSurah = () => {
    if (currentSurahNum > 1) {
      navigate(`/quran/${currentSurahNum - 1}`);
    }
  };

  // 👇 2. تغيير أسماء الكلاسات لتستخدم كائن styles
  if (loading) {
    return <div className={styles.loadingMessage}>جاري تحميل السورة...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.surahDisplayContainer}>
      <header className={styles.surahHeader}>
        <h1>{surah.name}</h1>
        <p>
          {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.numberOfAyahs} آية
        </p>
      </header>

      {surah.ayahs.map((ayah) => (
        <div key={ayah.number} className={styles.ayahContainer}>
          <p className={styles.ayahText}>
            {ayah.text}
            <span className={styles.ayahNumber}>({ayah.numberInSurah})</span>
          </p>
        </div>
      ))}

      <div className={styles.surahNavigationToolbar}>
        <button 
          onClick={goToPrevSurah} 
          className={styles.navArrowBtn}
          disabled={currentSurahNum === 1}
        >
          السابق
        </button>
        <button onClick={() => navigate('/quran')} className={styles.backButtonSurah}>
          العودة للفهرس
        </button>
        <button 
          onClick={goToNextSurah} 
          className={styles.navArrowBtn}
          disabled={currentSurahNum === 114}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
