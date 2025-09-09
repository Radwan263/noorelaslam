import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SurahPage.module.css';

const SurahPage = () => {
  const { surahNumber } = useParams(); // للحصول على رقم السورة من الرابط
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!surahNumber) return;

    setLoading(true);
    setError(null);

    // استخدام fetch لجلب تفاصيل السورة وآياتها
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('فشل في الاتصال بالشبكة');
        }
        return response.json();
      })
      .then(data => {
        setSurahData(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching surah ${surahNumber}:`, error);
        setError('حدث خطأ أثناء تحميل بيانات السورة.');
        setLoading(false);
      });
  }, [surahNumber]); // useEffect يعمل كلما تغير رقم السورة

  if (loading) {
    return <div className={styles.statusMessage}>جاري تحميل السورة...</div>;
  }

  if (error) {
    return <div className={styles.statusMessage} style={{ color: 'red' }}>{error}</div>;
  }

  if (!surahData) {
    return <div className={styles.statusMessage}>لم يتم العثور على بيانات السورة.</div>;
  }

  return (
    <div className={styles.surahPageContainer}>
      <div className={styles.surahHeader}>
        <h1>{surahData.name}</h1>
        <p>({surahData.englishName})</p>
        <p>{surahData.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surahData.numberOfAyahs} آية</p>
      </div>
      <div className={styles.ayahContainer}>
        {surahData.ayahs.map(ayah => (
          <div key={ayah.number} className={styles.ayah}>
            <p className={styles.ayahText}>
              {ayah.text} <span className={styles.ayahNumber}>({ayah.numberInSurah})</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahPage;
