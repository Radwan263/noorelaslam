import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 👇 التغيير هنا: سنستورد الملفات مباشرة
// import axios from 'axios'; // لم نعد بحاجة إليه
import styles from './HadithListPage.module.css';

const HADITHS_PER_PAGE = 20;

// 👇 استيراد مباشر للملفات من مجلد src/data
import bukhariData from '../../data/ara-bukhari.json';
import muslimData from '../../data/ara-muslim.json';
import nasaiData from '../../data/ara-nasai.json';
import abudawudData from '../../data/ara-abudawud.json';
import tirmidhiData from '../../data/ara-tirmidhi.json';
import ibnmajahData from '../../data/ara-ibnmajah.json';
import malikData from '../../data/ara-malik.json';


const HadithListPage = () => {
  const { collectionName } = useParams();
  const navigate = useNavigate();
  
  const [allHadiths, setAllHadiths] = useState([]); 
  const [displayedHadiths, setDisplayedHadiths] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 👇 تحديث الخريطة لتستخدم البيانات المستوردة مباشرة
  const collectionMap = {
    'bukhari': { data: bukhariData, title: 'صحيح البخاري' },
    'muslim': { data: muslimData, title: 'صحيح مسلم' },
    'nasai': { data: nasaiData, title: 'سنن النسائي' },
    'abudawud': { data: abudawudData, title: 'سنن أبي داود' },
    'tirmidhi': { data: tirmidhiData, title: 'جامع الترمذي' },
    'ibnmajah': { data: ibnmajahData, title: 'سنن ابن ماجه' },
    'malik': { data: malikData, title: 'موطأ مالك' },
  };

  useEffect(() => {
    // أصبح الكود أبسط بكثير الآن
    const loadLocalHadiths = () => {
      const collectionInfo = collectionMap[collectionName];
      if (!collectionInfo || !collectionInfo.data) {
        setError('الكتاب المطلوب غير متوفر.');
        setLoading(false);
        return;
      }

      setCollectionTitle(collectionInfo.title);
      setLoading(true);
      setError(null);

      const hadiths = collectionInfo.data.hadiths;
      setAllHadiths(hadiths);
      setDisplayedHadiths(hadiths.slice(0, HADITHS_PER_PAGE));
      setHasMore(hadiths.length > HADITHS_PER_PAGE);
      
      setLoading(false);
    };

    loadLocalHadiths();
  }, [collectionName]);

  // دالة تحميل المزيد تبقى كما هي تمامًا
  const loadMoreHadiths = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    const newHadiths = allHadiths.slice(0, nextPage * HADITHS_PER_PAGE);
    setDisplayedHadiths(newHadiths);
    setPage(nextPage);
    setHasMore(newHadiths.length < allHadiths.length);
  }, [page, loading, hasMore, allHadiths]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الحديث!');
  };

  // باقي الكود الخاص بالعرض (return) يبقى كما هو تمامًا
  if (loading && page === 1) {
    return <div className={styles.loadingMessage}>جاري تحميل الأحاديث...</div>;
  }

  if (error) {
    return (
      <div className={`${styles.hadithListContainer} ${styles.errorContainer}`}>
        <h2 className={styles.errorTitle}>حدث خطأ</h2>
        <p className={styles.errorText}>{error}</p>
        <button onClick={() => navigate('/hadith')} className={styles.backButton}>
          العودة إلى قائمة الكتب
        </button>
      </div>
    );
  }

  return (
    <div className={styles.hadithListContainer}>
      <header className={styles.header}>
        <h1>{collectionTitle}</h1>
        <button onClick={() => navigate('/hadith')} className={styles.backButton}>
          العودة
        </button>
      </header>

      <div className={styles.hadithsGrid}>
        {displayedHadiths.map(hadith => (
          <div key={hadith.hadithnumber} className={styles.hadithCard}>
            <div className={styles.hadithContent}>
              <p className={styles.hadithNumber}>حديث رقم: {hadith.hadithnumber}</p>
              <p className={styles.hadithText}>{hadith.text}</p>
            </div>
            <div className={styles.hadithActions}>
              <button onClick={() => copyToClipboard(hadith.text)}>نسخ</button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button onClick={loadMoreHadiths} className={styles.loadMoreButton}>
            تحميل المزيد من الأحاديث
          </button>
        </div>
      )}
    </div>
  );
};

export default HadithListPage;
