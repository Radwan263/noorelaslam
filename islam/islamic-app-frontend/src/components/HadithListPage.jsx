import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // سنظل نستخدمه لأنه أفضل طريقة لجلب الملفات المحلية في Vite
import styles from './HadithListPage.module.css';

const HADITHS_PER_PAGE = 20;

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

  const collectionMap = {
    'bukhari': { filePath: '/data/bukhari.json', title: 'صحيح البخاري' },
    // يمكنك إضافة باقي الكتب هنا بنفس الطريقة في المستقبل
    // 'muslim': { filePath: '/data/muslim.json', title: 'صحيح مسلم' },
  };

  useEffect(() => {
    const fetchLocalHadiths = async () => {
      const collectionInfo = collectionMap[collectionName];
      if (!collectionInfo) {
        setError('الكتاب المطلوب غير متوفر محليًا.');
        setLoading(false);
        return;
      }

      setCollectionTitle(collectionInfo.title);
      setLoading(true);
      setError(null);

      try {
        // 👇 التغيير الجوهري: نقرأ الآن من الملف المحلي مباشرة 👇
        const response = await axios.get(collectionInfo.filePath);
        
        if (response.data && response.data.hadiths) {
          setAllHadiths(response.data.hadiths);
          setDisplayedHadiths(response.data.hadiths.slice(0, HADITHS_PER_PAGE));
          setHasMore(response.data.hadiths.length > HADITHS_PER_PAGE);
        } else {
          throw new Error('الملف المحلي للأحاديث فارغ أو تالف.');
        }
      } catch (err) {
        console.error("Error fetching local hadiths:", err);
        setError('حدث خطأ أثناء قراءة ملف الأحاديث المحلي.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocalHadiths();
  }, [collectionName]);

  // دالة تحميل المزيد تبقى كما هي تمامًا، لا تحتاج لأي تغيير
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
