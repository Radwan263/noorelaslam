import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SurahPage.module.css';

// === قائمة القراء المتاحين في الـ API (نسخة محدثة وموسعة) ===
const reciters = [
  // -- الأكثر شهرة --
  { identifier: 'ar.alafasy', name: 'مشاري راشد العفاسي' },
  { identifier: 'ar.mahermuaiqly', name: 'ماهر المعيقلي' },
  { identifier: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد (مرتل)' },
  { identifier: 'ar.saoodshuraym', name: 'سعود الشريم' },
  { identifier: 'ar.sudais', name: 'عبد الرحمن السديس' },
  
  // -- قراء مميزون --
  { identifier: 'ar.minshawi', name: 'محمد صديق المنشاوي (مرتل)' },
  { identifier: 'ar.muhammadjibreel', name: 'محمد جبريل' },
  { identifier: 'ar.husary', name: 'محمود خليل الحصري' },
  { identifier: 'ar.ahmedajamy', name: 'أحمد بن علي العجمي' },
  { identifier: 'ar.yasseraddousari', name: 'ياسر الدوسري' },
  
  // -- تلاوات مجودة --
  { identifier: 'ar.abdulbasitmujawwad', name: 'عبد الباسط عبد الصمد (مجود)' },
  { identifier: 'ar.minshawimujawwad', name: 'محمد صديق المنشاوي (مجود)' },
  { identifier: 'ar.husarymujawwad', name: 'محمود خليل الحصري (مجود)' },
  
  // -- قراء آخرون --
  { identifier: 'ar.abdullahbasfar', name: 'عبدالله بصفر' },
  { identifier: 'ar.salahbudair', name: 'صلاح بو خاطر' },
  { identifier: 'ar.faresabbad', name: 'فارس عباد' },
  { identifier: 'ar.saadghamidi', name: 'سعد الغامدي' },
  { identifier: 'ar.ibrahimakhbar', name: 'إبراهيم الأخضر' },
];

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();

  const [surahTextData, setSurahTextData] = useState(null); // بيانات النص
  const [surahAudioData, setSurahAudioData] = useState(null); // بيانات الصوت
  const [selectedReciter, setSelectedReciter] = useState(reciters[0].identifier); // القارئ الافتراضي
  
  const [loadingText, setLoadingText] = useState(true);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [error, setError] = useState(null);

  const currentSurahNumber = parseInt(surahNumber, 10);

  // جلب نص السورة (يعمل مرة واحدة عند تغير السورة)
  useEffect(() => {
    if (!currentSurahNumber) return;

    setLoadingText(true);
    setError(null);
    setSurahTextData(null);
    setSurahAudioData(null); // إعادة تعيين الصوت أيضًا

    fetch(`https://api.alquran.cloud/v1/surah/${currentSurahNumber}`)
      .then(res => res.ok ? res.json() : Promise.reject('Error fetching text'))
      .then(data => {
        setSurahTextData(data.data);
        setLoadingText(false);
      })
      .catch(err => {
        setError('حدث خطأ أثناء تحميل نص السورة.');
        setLoadingText(false);
      });
  }, [currentSurahNumber]);

  // جلب صوت السورة (يعمل عند تغير السورة أو تغير القارئ)
  useEffect(() => {
    if (!currentSurahNumber || !selectedReciter) return;

    setLoadingAudio(true);
    setSurahAudioData(null);

    fetch(`https://api.alquran.cloud/v1/surah/${currentSurahNumber}/${selectedReciter}`)
      .then(res => res.ok ? res.json() : Promise.reject('Error fetching audio'))
      .then(data => {
        setSurahAudioData(data.data);
        setLoadingAudio(false);
      })
      .catch(err => {
        setError('حدث خطأ أثناء تحميل التلاوة الصوتية.');
        setLoadingAudio(false);
      });
  }, [currentSurahNumber, selectedReciter]);

  const goToNextSurah = () => {
    if (currentSurahNumber < 114) navigate(`/surah/${currentSurahNumber + 1}`);
  };

  const goToPreviousSurah = () => {
    if (currentSurahNumber > 1) navigate(`/surah/${currentSurahNumber - 1}`);
  };

  if (loadingText) {
    return <div className={styles.statusMessage}>جاري تحميل السورة...</div>;
  }

  if (error) {
    return <div className={styles.statusMessage} style={{ color: 'red' }}>{error}</div>;
  }

  if (!surahTextData) {
    return <div className={styles.statusMessage}>لم يتم العثور على بيانات السورة.</div>;
  }

  return (
    <div className={styles.surahPageContainer}>
      <div className={styles.surahHeader}>
        <h1>{surahTextData.name}</h1>
        <p>({surahTextData.englishName})</p>
        <p>{surahTextData.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surahTextData.numberOfAyahs} آية</p>
      </div>

      <div className={styles.audioSection}>
        <div className={styles.reciterSelector}>
          <label htmlFor="reciter-select">اختر القارئ:</label>
          <select 
            id="reciter-select" 
            value={selectedReciter} 
            onChange={(e) => setSelectedReciter(e.target.value)}
          >
            {reciters.map(reciter => (
              <option key={reciter.identifier} value={reciter.identifier}>
                {reciter.name}
              </option>
            ))}
          </select>
        </div>

        {loadingAudio && <p className={styles.audioStatus}>جاري تحميل التلاوة...</p>}
        
        {surahAudioData && surahAudioData.ayahs && surahAudioData.ayahs.length > 0 && (
          <div className={styles.audioPlayerWrapper}>
            {/* ملاحظة: بعض القراء يوفرون ملف صوتي واحد للسورة كاملة، والبعض يوفر ملف لكل آية.
                هذا الكود يأخذ الصوت من أول آية وهو غالبًا ما يكون رابط السورة كاملة في هذا الـ API */}
            <audio controls key={surahAudioData.ayahs[0].audio} className={styles.audioPlayer}>
              <source src={surahAudioData.ayahs[0].audio} type="audio/mpeg" />
              متصفحك لا يدعم عنصر الصوت.
            </audio>
          </div>
        )}
      </div>

      <div className={styles.ayahContainer}>
        {surahTextData.ayahs.map(ayah => (
          <div key={ayah.number} className={styles.ayah}>
            <p className={styles.ayahText}>
              {ayah.text} <span className={styles.ayahNumber}>({ayah.numberInSurah})</span>
            </p>
          </div>
        ))}
      </div>

      <div className={styles.navigationButtons}>
        {currentSurahNumber > 1 && (
          <button onClick={goToPreviousSurah} className={styles.navButton}>→ السورة السابقة</button>
        )}
        {currentSurahNumber < 114 && (
          <button onClick={goToNextSurah} className={styles.navButton}>السورة التالية ←</button>
        )}
      </div>
    </div>
  );
};

export default SurahPage;
