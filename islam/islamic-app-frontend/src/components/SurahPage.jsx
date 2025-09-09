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
      setSurah(null);

      try {
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${currentSurahNum}`);
        setSurah(response.data.data);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات السورة.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    window.scrollTo(0, 0);
  }, [surahNumber, navigate]);

  const goToSurah = (num) => {
    if (num >= 1 && num <= 114) {
      navigate(`/quran/${num}`);
    }
  };

  if (loading) return <div className={styles.message}>جاري تحميل السورة...</div>;
  if (error) return <div className={styles.message}>{error}</div>;
  if (!surah) return <div className={styles.message}>لا توجد بيانات لعرضها.</div>;

  const currentNum = parseInt(surahNumber, 10);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{surah.name}</h1>
        <p>{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.numberOfAyahs} آية</p>
      </header>

      <div className={styles.ayahsContainer}>
        {surah.ayahs.map((ayah) => (
          <p key={ayah.number} className={styles.ayahText}>
            {ayah.text} <span className={styles.ayahNumber}>({ayah.numberInSurah})</span>
          </p>
        ))}
      </div>

      <footer className={styles.footer}>
        <button onClick={() => goToSurah(currentNum - 1)} disabled={currentNum === 1}>السابق</button>
        <button onClick={() => navigate('/quran')}>الفهرس</button>
        <button onClick={() => goToSurah(currentNum + 1)} disabled={currentNum === 114}>التالي</button>
      </footer>
    </div>
  );
};

export default SurahPage;
