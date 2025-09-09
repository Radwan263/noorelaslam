import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './HadithListPage.module.css'; // استخدام CSS Modules

const HadithListPage = () => {
  const { collectionName } = useParams();
  const navigate = useNavigate();
  const [hadiths, setHadiths] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // قاموس لترجمة أسماء الكتب إلى ما يفهمه الـ API الجديد
  const collectionMap = {
    'bukhari': { apiName: 'bukhari', title: 'صحيح البخاري' },
    'muslim': { apiName: 'muslim', title: 'صحيح مسلم' },
    'nasai': { apiName: 'nasai', title: 'سنن النسائي' },
    'abudawud': { apiName: 'abudawud', title: 'سنن أبي داود' },
    'tirmidhi': { apiName: 'tirmidhi', title: 'جامع الترمذي' },
    'ibnmajah': { apiName: 'ibnmajah', title: 'سنن ابن ماجه' },
    'malik': { apiName: 'malik', title: 'موطأ مالك' },
  };

  useEffect(() => {
    const fetchHadiths = async () => {
      const collectionInfo = collectionMap[collectionName];
      if (!collectionInfo) {
        setError('الكتاب المطلوب غير متوفر.');
        setLoading(false);
        return;
      }

      setCollectionTitle(collectionInfo.title);
      setLoading(true);
      setError(null);

      try {
        // استخدام الـ API الجديد، المفتوح والمجاني
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${collectionInfo.apiName}.json`);
        
        if (response.data && response.data.hadiths) {
          setHadiths(response.data.hadiths);
        } else {
          throw new Error('لم يتم العثور على أحاديث لهذا الكتاب.');
        }

      } catch (err) {
        console.error("Error fetching hadiths:", err);
        setError('حدث خطأ أثناء تحميل الأحاديث. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [collectionName]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الحديث!');
  };

  if (loading) {
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
        {hadiths.map(hadith => (
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
    </div>
  );
};

export default HadithListPage;
