import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './QuranSection.module.css';

const QuranSection = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // استخدام fetch المدمجة في المتصفح بدلاً من axios
    fetch('https://api.alquran.cloud/v1/surah')
      .then(response => {
        if (!response.ok) {
          throw new Error('فشل في الاتصال بالشبكة');
        }
        return response.json();
      })
      .then(data => {
        setSurahs(data.data); // API يضع السور داخل data.data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching surahs:", error);
        setError('حدث خطأ أثناء تحميل قائمة السور.');
        setLoading(false);
      });
  }, []); // useEffect يعمل مرة واحدة فقط عند تحميل المكون

  if (loading) {
    return <div className={styles.statusMessage}>جاري تحميل قائمة السور...</div>;
  }

  if (error) {
    return <div className={styles.statusMessage} style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className={styles.quranContainer}>
      <h1 className={styles.title}>القرآن الكريم</h1>
      <div className={styles.surahGrid}>
        {surahs.map(surah => (
          <Link to={`/surah/${surah.number}`} key={surah.number} className={styles.surahCard}>
            <div className={styles.surahNumber}>{surah.number}</div>
            <div className={styles.surahInfo}>
              <h3 className={styles.surahNameArabic}>{surah.name}</h3>
              <p className={styles.surahNameEnglish}>{surah.englishName}</p>
            </div>
            <div className={styles.revelationType}>
              <span>{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuranSection;
