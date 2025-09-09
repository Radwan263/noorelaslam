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

  const currentSurahNum = parseInt(surahNumber, 10);

  // 👇 *** هذا هو الجزء الذي سنقوم بتعديله *** 👇
  useEffect(() => {
    // التأكد من أن رقم السورة صالح قبل أي شيء
    if (isNaN(currentSurahNum) || currentSurahNum < 1 || currentSurahNum > 114) {
      navigate('/quran'); 
      return;
    }

    const fetchSurah = async () => {
      // 1. إعادة حالة التحميل إلى true في كل مرة نبدأ فيها طلبًا جديدًا
      setLoading(true); 
      setSurah(null); // اختياري: مسح البيانات القديمة فورًا
      setError(null);

      try {
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${currentSurahNum}`);
        setSurah(response.data.data);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات السورة. يرجى المحاولة مرة أخرى.');
        console.error(err);
      } finally {
        // 2. إيقاف التحميل بعد انتهاء الطلب (سواء نجح أو فشل)
        setLoading(false);
      }
    };

    fetchSurah();
    window.scrollTo(0, 0); 

  // 👇 *** هذا هو التعديل الأهم *** 👇
  // الآن useEffect سيعمل من جديد كلما تغير `currentSurahNum`
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

  if (loading) {
    return <div className={styles.loadingMessage}>جاري تحميل السورة...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  // التأكد من وجود بيانات السورة قبل محاولة عرضها
  if (!surah) {
    return null; // أو عرض رسالة خطأ أخرى
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
