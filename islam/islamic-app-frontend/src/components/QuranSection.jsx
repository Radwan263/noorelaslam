import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './QuranSection.module.css'; // سننشئ هذا الملف

const QuranSection = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Failed to fetch surahs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  if (loading) {
    return <div className={styles.loadingMessage}>جاري تحميل الفهرس...</div>;
  }

  return (
    <div className={styles.quranSectionContainer}>
      <header className={styles.quranTitleHeader}>
        <h1 className={styles.quranMainTitle}>القرآن الكريم</h1>
        <p className={styles.quranSubtitle}>اختر السورة التي تود قراءتها</p>
      </header>
      <div className={styles.surahList}>
        {surahs.map(surah => (
          <div 
            key={surah.number} 
            className={styles.surahCard} 
            onClick={() => navigate(`/quran/${surah.number}`)}
          >
            <div className={styles.surahInfo}>
              <div className={styles.surahNumber}>{surah.number}</div>
              <div className={styles.surahName}>{surah.name}</div>
            </div>
            <div className={styles.surahDetails}>
              {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.numberOfAyahs} آية
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranSection;
