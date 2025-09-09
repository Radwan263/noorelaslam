import React, { useState, useEffect } from 'react';
import styles from './PrayerTimes.module.css';

const PrayerTimes = () => {
  const [timings, setTimings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // لنبدأ بدون تحميل
  const [permissionRequested, setPermissionRequested] = useState(false);

  const fetchPrayerTimes = (latitude, longitude) => {
    setLoading(true);
    setError(null);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    fetch(`https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=5`)
      .then(response => response.ok ? response.json() : Promise.reject('فشل الاتصال بالشبكة'))
      .then(data => {
        if (data.code === 200) {
          setTimings(data.data.timings);
        } else {
          throw new Error('خطأ في البيانات المستلمة');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleLocationRequest = () => {
    setPermissionRequested(true);
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchPrayerTimes(latitude, longitude);
        },
        (err) => {
          setError('تم رفض الوصول إلى الموقع. لا يمكن عرض المواقيت.');
          setLoading(false);
        }
      );
    } else {
      setError('متصفحك لا يدعم تحديد الموقع.');
    }
  };

  // --- محتوى العرض ---
  let content;
  if (loading) {
    content = <p className={styles.loadingText}>جاري حساب مواقيت الصلاة...</p>;
  } else if (error) {
    content = (
      <>
        <p className={styles.error}>{error}</p>
        <button onClick={handleLocationRequest} className={styles.locationButton}>
          حاول مرة أخرى
        </button>
      </>
    );
  } else if (timings) {
    const prayerNames = { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
    content = (
      <>
        <h2 className={styles.title}>مواقيت الصلاة</h2>
        <div className={styles.prayerGrid}>
          {Object.entries(prayerNames).map(([key, name]) => (
            <div key={key} className={styles.prayerCard}>
              <p className={styles.prayerName}>{name}</p>
              <p className={styles.prayerTime}>{timings[key]}</p>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    // الحالة الافتراضية قبل طلب الموقع
    content = (
      <>
        <p className={styles.loadingText}>سيتم عرض مواقيت الصلاة هنا قريباً...</p>
        <button onClick={handleLocationRequest} className={styles.locationButton}>
          تحديد الموقع
        </button>
      </>
    );
  }

  return (
    <div className={styles.prayerContainer}>
      {content}
    </div>
  );
};

export default PrayerTimes;
