import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SurahPage.module.css'; 

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentSurahNum = parseInt(surahNumber, 10);

    if (isNaN(currentSurahNum) || currentSurahNum < 1 || currentSurahNum > 114) {
      navigate('/quran'); 
      return;
    }

    const fetchSurah = async () => {
      setLoading(true);
      setError(null);
      setSurah(null); // مسح البيانات القديمة

      try {
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${currentSurahNum}`);
        setSurah(response.data.data);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات السورة. يرجى المحاولة مرة أخرى.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    window.scrollTo(0, 0); 

  // 👇 *** هذا هو التعديل الوحيد والمهم *** 👇
  // نحن نراقب `surahNumber` مباشرة من `useParams`.
  }, [surahNumber, navigate]); 

  const goToNextSurah = () => {
    const nextSurahNum = parseInt(surahNumber, 10) + 1;
    if (nextSurahNum <= 114) {
      navigate(`/quran/${nextSurahNum}`);
    }
  };

  const goToPrevSurah = () => {
    const prevSurahNum = parseInt(surahNumber, 10) - 1;
    if (prevSurahNum >= 1) {
      navigate(`/quran/${prevSurahNum}`);
    }
  };

  if (loading) {
    return <div className={styles.loadingMessage}>جاري تحميل السورة...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (!surah) {
    return null; // لا تعرض شيئًا إذا لم تكن هناك بيانات
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
          disabled={parseInt(surahNumber, 10) === 1}
        >
          السابق
        </button>
        <button onClick={() => navigate('/quran')} className={styles.backButtonSurah}>
          العودة للفهرس
        </button>
        <button 
          onClick={goToNextSurah} 
          className={styles.navArrowBtn}
          disabled={parseInt(surahNumber, 10) === 114}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
