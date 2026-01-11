import React, { useState, useEffect, useRef } from 'react';
import styles from './PrayerTimes.module.css';
// 👇 استيراد مكتبة الـ GPS الخاصة بالموبايل
import { Geolocation } from '@capacitor/geolocation';

const reciters = [
  { id: 'afasy', name: 'مشاري راشد العفاسي', url: 'https://www.islamcan.com/audio/adhan/azan-mishary-rashid-alafasy.mp3' },
  { id: 'basit', name: 'عبد الباسط عبد الصمد', url: 'https://www.islamcan.com/audio/adhan/azan-abdul-basit.mp3' },
  { id: 'qatatami', name: 'ناصر القطامي', url: 'https://www.islamcan.com/audio/adhan/azan-nasser-al-qatami.mp3' },
  { id: 'madina', name: 'أذان المدينة المنورة', url: 'https://www.islamcan.com/audio/adhan/azan-madina.mp3' },
  { id: 'makkah', name: 'أذان مكة المكرمة', url: 'https://www.islamcan.com/audio/adhan/azan-makkah.mp3' },
  { id: 'egypt', name: 'أذان (مصر)', url: 'https://www.islamcan.com/audio/adhan/azan-egypt.mp3' },
  { id: 'syria', name: 'أذان (سوريا)', url: 'https://www.islamcan.com/audio/adhan/azan-syria.mp3' },
];

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
      .then(res => res.ok ? res.json() : Promise.reject('فشل في جلب البيانات'))
      .then(data => {
        if (data.code === 200) setTimings(data.data.timings);
        else setError('خطأ في الخدمة');
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

  // دالة طلب الموقع الجديدة والمعدلة للموبايل ✅
  const handleLocationRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      // طلب الإذن من المستخدم بشكل إجباري
      const permission = await Geolocation.requestPermissions();
      
      if (permission.location === 'granted') {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
        fetchPrayerTimes(latitude, longitude);
      } else {
        setError('يجب الموافقة على إذن الموقع لتحديد مواقيت الصلاة.');
        setLoading(false);
      }
    } catch (err) {
      setError('تأكد من تفعيل الـ GPS في موبايلك.');
      setLoading(false);
    }
  };

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
        nextPrayerFound = { ...prayerTimesToday[0] };
        nextPrayerFound.date = new Date(nextPrayerFound.date);
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
              audioRef.current.play().catch(e => console.log(e));
            }
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timings, audioPermission, selectedReciter]);

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
      audioRef.current.play().then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }).catch(() => {});
    }
  };

  const handleReciterChange = (event) => {
    const reciterId = event.target.value;
    setSelectedReciter(reciterId);
    localStorage.setItem('selectedReciter', reciterId);
  };

  let content;
  if (loading) {
    content = <p className={styles.loadingText}>جاري تحديد موقعك وحساب المواقيت...</p>;
  } else if (error) {
    content = <><p className={styles.error}>{error}</p><button onClick={handleLocationRequest} className={styles.locationButton}>حاول مرة أخرى</button></>;
  } else if (timings) {
    const prayerNames = { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
    content = (
      <>
        <div className={styles.reciterSelector}>
          <label htmlFor="reciter-select">صوت المؤذن:</label>
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
          <button onClick={handleEnableAudio} className={styles.locationButton}>🔊 تفعيل صوت الأذان</button>
        ) : (
          <button onClick={handleChangeLocation} className={styles.changeLocationButton}>تحديث الموقع</button>
        )}
      </>
    );
  } else {
    content = <><p className={styles.loadingText}>يرجى تحديد موقعك لعرض المواقيت.</p><button onClick={handleLocationRequest} className={styles.locationButton}>📍 تحديد الموقع</button></>;
  }

  return (
    <div className={styles.prayerContainer}>
      {content}
      <audio ref={audioRef} preload="auto"></audio>
    </div>
  );
}

export default FinalPrayerTimes;

