import React, { useState, useEffect, useRef } from 'react';
import styles from './PrayerTimes.module.css';

// === الخطوة 1: قائمة المؤذنين مع روابطهم ===
const reciters = [
  { id: 'afasy', name: 'مشاري راشد العفاسي', url: 'https://www.islamcan.com/audio/adhan/azan-mishary-rashid-alafasy.mp3' },
  { id: 'basit', name: 'عبد الباسط عبد الصمد', url: 'https://www.islamcan.com/audio/adhan/azan-abdul-basit.mp3' },
  { id: 'qatatami', name: 'ناصر القطامي', url: 'https://www.islamcan.com/audio/adhan/azan-nasser-al-qatami.mp3' },
  { id: 'madina', name: 'أذان المدينة المنورة', url: 'https://www.islamcan.com/audio/adhan/azan-madina.mp3' },
  { id: 'makkah', name: 'أذان مكة المكرمة', url: 'https://www.islamcan.com/audio/adhan/azan-makkah.mp3' },
  { id: 'egypt', name: 'أذان (مصر)', url: 'https://www.islamcan.com/audio/adhan/azan-egypt.mp3' },
  { id: 'syria', name: 'أذان (سوريا)', url: 'https://www.islamcan.com/audio/adhan/azan-syria.mp3' },
];

const PrayerTimes = () => {
  const [timings, setTimings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeToNextPrayer, setTimeToNextPrayer] = useState(null);
  const [audioPermission, setAudioPermission] = useState(false);
  
  // === الخطوة 2: حالة جديدة لحفظ اختيار المؤذن ===
  const [selectedReciter, setSelectedReciter] = useState(() => {
    return localStorage.getItem('selectedReciter') || reciters[0].id; // القيمة الافتراضية هي العفاسي
  });
  
  const audioRef = useRef(null);

  // --- دالة جلب مواقيت الصلاة (لا تغيير) ---
  const fetchPrayerTimes = (latitude, longitude) => {
    setLoading(true);
    setError(null);
    const date = new Date();
    fetch(`https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=5`)
      .then(res => res.ok ? res.json() : Promise.reject('Network error'))
      .then(data => data.code === 200 ? setTimings(data.data.timings) : setError('API error'))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  // --- التحقق من الموقع المحفوظ (لا تغيير) ---
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const { latitude, longitude } = JSON.parse(savedLocation);
      fetchPrayerTimes(latitude, longitude);
    }
  }, []);

  // --- المؤقت الذي يعمل كل ثانية (تحديث بسيط) ---
  useEffect(() => {
    if (!timings) return;
    const prayerNames = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
    
    const interval = setInterval(() => {
      const now = new Date();
      const prayerTimesToday = Object.entries(timings)
        .filter(([key]) => prayerNames[key])
        .map(([name, time]) => {
          const [h, m] = time.split(':');
          const d = new Date();
          d.setHours(h, m, 0, 0);
          return { name, time, date: d };
        })
        .sort((a, b) => a.date - b.date);

      let nextPrayerFound = prayerTimesToday.find(p => p.date > now);
      if (!nextPrayerFound) {
        nextPrayerFound = prayerTimesToday[0];
        nextPrayerFound.date.setDate(nextPrayerFound.date.getDate() + 1);
      }

      if (nextPrayerFound) {
        setNextPrayer({ name: prayerNames[nextPrayerFound.name], time: nextPrayerFound.time });
        const diff = nextPrayerFound.date - now;
        if (diff < 0) return;

        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeToNextPrayer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

        if (hours === 0 && minutes === 0 && seconds === 0 && audioPermission) {
          if (audioRef.current) {
            const reciterUrl = reciters.find(r => r.id === selectedReciter)?.url;
            if (reciterUrl) {
              audioRef.current.src = reciterUrl;
              audioRef.current.play();
            }
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timings, audioPermission, selectedReciter]);

  // --- دوال التعامل مع الموقع (لا تغيير) ---
  const handleLocationRequest = () => { /* ... الكود كما هو ... */ };
  const handleChangeLocation = () => { /* ... الكود كما هو ... */ };

  // --- دالة طلب إذن الصوت (لا تغيير) ---
  const handleEnableAudio = () => {
    setAudioPermission(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      audioRef.current.pause();
    }
  };

  // === الخطوة 3: دالة تغيير المؤذن وحفظ الاختيار ===
  const handleReciterChange = (event) => {
    const reciterId = event.target.value;
    setSelectedReciter(reciterId);
    localStorage.setItem('selectedReciter', reciterId);
  };

  // --- محتوى العرض (تحديث كبير) ---
  let content;
  if (loading) { /* ... */ }
  else if (error) { /* ... */ }
  else if (timings) {
    const prayerNames = { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
    content = (
      <>
        {/* === قائمة اختيار المؤذن الجديدة === */}
        <div className={styles.reciterSelector}>
          <label htmlFor="reciter-select">اختر صوت المؤذن:</label>
          <select id="reciter-select" value={selectedReciter} onChange={handleReciterChange}>
            {reciters.map(reciter => (
              <option key={reciter.id} value={reciter.id}>
                {reciter.name}
              </option>
            ))}
          </select>
        </div>

        {nextPrayer && timeToNextPrayer && (
          <div className={styles.nextPrayerInfo}>
            <p>متبقي على أذان {nextPrayer.name}</p>
            <p className={styles.countdown}>{timeToNextPrayer}</p>
          </div>
        )}
        <div className={styles.prayerGrid}>
          {Object.entries(prayerNames).map(([key, name]) => (
            <div key={key} className={styles.prayerCard}>
              <p className={styles.prayerName}>{name}</p>
              <p className={styles.prayerTime}>{timings[key]}</p>
            </div>
          ))}
        </div>
        {!audioPermission ? (
          <button onClick={handleEnableAudio} className={styles.locationButton}>🔊 تفعيل إشعارات الأذان</button>
        ) : (
          <button onClick={handleChangeLocation} className={styles.changeLocationButton}>تغيير الموقع</button>
        )}
      </>
    );
  } else { /* ... */ }

  return (
    <div className={styles.prayerContainer}>
      {content}
      <audio ref={audioRef} preload="auto"></audio>
    </div>
  );
};

// الكود المكرر لدوال الموقع
const FullPrayerTimes = () => {
    // ... (هذا الجزء لم يتغير، يمكنك نسخه من الكود السابق أو تركه كما هو)
    // ... (يحتوي على useState, useEffect, handleLocationRequest, handleChangeLocation, etc.)
    // ... (من الأفضل دمج كل شيء في مكون واحد كما فعلت في الكود أعلاه)
    // ... (للبساطة، الكود الكامل موجود في الأعلى)
    return <PrayerTimes />; // هذا مجرد مثال
};


// للتأكد من أن الكود كامل، سأعيد كتابة المكون بالكامل هنا بدون تكرار
// تجاهل ما سبق واستخدم هذا الكود الكامل
const FinalPrayerTimes = () => {
  const [timings, setTimings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeToNextPrayer, setTimeToNextPrayer] = useState(null);
  const [audioPermission, setAudioPermission] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(() => localStorage.getItem('selectedReciter') || reciters[0].id);
  const audioRef = useRef(null);

  const fetchPrayerTimes = (latitude, longitude) => {
    setLoading(true);
    setError(null);
    const date = new Date();
    fetch(`https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=5`)
      .then(res => res.ok ? res.json() : Promise.reject('Network error'))
      .then(data => {
        if (data.code === 200) setTimings(data.data.timings);
        else setError('API error');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const { latitude, longitude } = JSON.parse(savedLocation);
      fetchPrayerTimes(latitude, longitude);
    }
  }, []);

  useEffect(() => {
    if (!timings) return;
    const prayerNames = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
    const interval = setInterval(() => {
      const now = new Date();
      const prayerTimesToday = Object.entries(timings)
        .filter(([key]) => prayerNames[key])
        .map(([name, time]) => {
          const [h, m] = time.split(':');
          const d = new Date();
          d.setHours(h, m, 0, 0);
          return { name, time, date: d };
        })
        .sort((a, b) => a.date - b.date);
      let nextPrayerFound = prayerTimesToday.find(p => p.date > now);
      if (!nextPrayerFound) {
        nextPrayerFound = prayerTimesToday[0];
        if(nextPrayerFound) nextPrayerFound.date.setDate(nextPrayerFound.date.getDate() + 1);
      }
      if (nextPrayerFound) {
        setNextPrayer({ name: prayerNames[nextPrayerFound.name], time: nextPrayerFound.time });
        const diff = nextPrayerFound.date - now;
        if (diff < 0) return;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeToNextPrayer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        if (hours === 0 && minutes === 0 && seconds === 0 && audioPermission) {
          if (audioRef.current) {
            const reciterUrl = reciters.find(r => r.id === selectedReciter)?.url;
            if (reciterUrl) {
              audioRef.current.src = reciterUrl;
              audioRef.current.play();
            }
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timings, audioPermission, selectedReciter]);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
          fetchPrayerTimes(latitude, longitude);
        },
        (err) => { setError('تم رفض الوصول إلى الموقع.'); setLoading(false); }
      );
    } else { setError('متصفحك لا يدعم تحديد الموقع.'); }
  };

  const handleChangeLocation = () => {
    localStorage.removeItem('userLocation');
    setTimings(null);
    setError(null);
    setNextPrayer(null);
    setTimeToNextPrayer(null);
  };

  const handleEnableAudio = () => {
    setAudioPermission(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      audioRef.current.pause();
    }
  };

  const handleReciterChange = (event) => {
    const reciterId = event.target.value;
    setSelectedReciter(reciterId);
    localStorage.setItem('selectedReciter', reciterId);
  };

  let content;
  if (loading) {
    content = <p className={styles.loadingText}>جاري حساب مواقيت الصلاة...</p>;
  } else if (error) {
    content = <><p className={styles.error}>{error}</p><button onClick={handleLocationRequest} className={styles.locationButton}>حاول مرة أخرى</button></>;
  } else if (timings) {
    const prayerNames = { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
    content = (
      <>
        <div className={styles.reciterSelector}>
          <label htmlFor="reciter-select">اختر صوت المؤذن:</label>
          <select id="reciter-select" value={selectedReciter} onChange={handleReciterChange}>
            {reciters.map(reciter => <option key={reciter.id} value={reciter.id}>{reciter.name}</option>)}
          </select>
        </div>
        {nextPrayer && timeToNextPrayer && (
          <div className={styles.nextPrayerInfo}>
            <p>متبقي على أذان {nextPrayer.name}</p>
            <p className={styles.countdown}>{timeToNextPrayer}</p>
          </div>
        )}
        <div className={styles.prayerGrid}>
          {Object.entries(prayerNames).map(([key, name]) => (
            <div key={key} className={styles.prayerCard}>
              <p className={styles.prayerName}>{name}</p>
              <p className={styles.prayerTime}>{timings[key]}</p>
            </div>
          ))}
        </div>
        {!audioPermission ? (
          <button onClick={handleEnableAudio} className={styles.locationButton}>🔊 تفعيل إشعارات الأذان</button>
        ) : (
          <button onClick={handleChangeLocation} className={styles.changeLocationButton}>تغيير الموقع</button>
        )}
      </>
    );
  } else {
    content = <><p className={styles.loadingText}>لعرض مواقيت الصلاة، يرجى تحديد موقعك.</p><button onClick={handleLocationRequest} className={styles.locationButton}>تحديد الموقع</button></>;
  }

  return (
    <div className={styles.prayerContainer}>
      {content}
      <audio ref={audioRef} preload="auto"></audio>
    </div>
  );
}

export default FinalPrayerTimes;
