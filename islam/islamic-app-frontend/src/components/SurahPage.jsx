import React, { useState, useEffect } from 'react';
// === الخطوة 1: استيراد useNavigate للتنقل ===
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SurahPage.module.css';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate(); // <-- للتحكم في التنقل

  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تحويل رقم السورة من نص إلى رقم صحيح
  const currentSurahNumber = parseInt(surahNumber, 10);

  useEffect(() => {
    if (!currentSurahNumber) return;

    setLoading(true);
    setError(null);
    setSurahData(null); // <-- إعادة تعيين البيانات عند تحميل سورة جديدة

    fetch(`https://api.alquran.cloud/v1/surah/${currentSurahNumber}`)
      .then(response => {
        if (!response.ok) throw new Error('فشل في الاتصال بالشبكة');
        return response.json();
      })
      .then(data => {
        setSurahData(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching surah ${currentSurahNumber}:`, error);
        setError('حدث خطأ أثناء تحميل بيانات السورة.');
        setLoading(false);
      });
  }, [currentSurahNumber]); // <-- الاعتماد على الرقم الصحيح

  // === الخطوة 2: دوال التنقل ===
  const goToNextSurah = () => {
    if (currentSurahNumber < 114) {
      navigate(`/surah/${currentSurahNumber + 1}`);
    }
  };

  const goToPreviousSurah = () => {
    if (currentSurahNumber > 1) {
      navigate(`/surah/${currentSurahNumber - 1}`);
    }
  };

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

      {/* === الخطوة 3: إضافة أزرار التنقل === */}
      <div className={styles.navigationButtons}>
        {currentSurahNumber > 1 && (
          <button onClick={goToPreviousSurah} className={styles.navButton}>
            → السورة السابقة
          </button>
        )}
        {currentSurahNumber < 114 && (
          <button onClick={goToNextSurah} className={styles.navButton}>
            السورة التالية ←
          </button>
        )}
      </div>
    </div>
  );
};

export default SurahPage;
