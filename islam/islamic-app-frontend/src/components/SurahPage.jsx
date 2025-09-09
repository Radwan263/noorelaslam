import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SurahPage.module.css';

// --- قائمة القراء (لا تغيير هنا) ---
const reciters = [
    { identifier: 'ar.alafasy', name: 'مشاري راشد العفاسي' },
    { identifier: 'ar.mahermuaiqly', name: 'ماهر المعيقلي' },
    { identifier: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد (مرتل)' },
    { identifier: 'ar.saoodshuraym', name: 'سعود الشريم' },
    { identifier: 'ar.sudais', name: 'عبد الرحمن السديس' },
    { identifier: 'ar.minshawi', name: 'محمد صديق المنشاوي (مرتل)' },
    { identifier: 'ar.muhammadjibreel', name: 'محمد جبريل' },
    { identifier: 'ar.husary', name: 'محمود خليل الحصري' },
    { identifier: 'ar.ahmedajamy', name: 'أحمد بن علي العجمي' },
    { identifier: 'ar.yasseraddousari', name: 'ياسر الدوسري' },
    { identifier: 'ar.abdulbasitmujawwad', name: 'عبد الباسط عبد الصمد (مجود)' },
    { identifier: 'ar.minshawimujawwad', name: 'محمد صديق المنشاوي (مجود)' },
    { identifier: 'ar.husarymujawwad', name: 'محمود خليل الحصري (مجود)' },
    { identifier: 'ar.abdullahbasfar', name: 'عبدالله بصفر' },
    { identifier: 'ar.salahbudair', name: 'صلاح بو خاطر' },
    { identifier: 'ar.faresabbad', name: 'فارس عباد' },
    { identifier: 'ar.saadghamidi', name: 'سعد الغامدي' },
    { identifier: 'ar.ibrahimakhbar', name: 'إبراهيم الأخضر' },
];

const SurahPage = () => {
    const { surahNumber } = useParams();
    const navigate = useNavigate();

    // --- حالات الواجهة ---
    const [surahTextData, setSurahTextData] = useState(null);
    const [surahAudioData, setSurahAudioData] = useState(null);
    const [selectedReciter, setSelectedReciter] = useState(reciters[0].identifier);
    const [loadingText, setLoadingText] = useState(true);
    const [loadingAudio, setLoadingAudio] = useState(false);
    const [error, setError] = useState(null);

    // === الخطوة 1: حالات جديدة للتحكم في قائمة التشغيل ===
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0); // مؤشر للآية الحالية
    const audioRef = useRef(null); // للتحكم في مشغل الصوت مباشرة

    const currentSurahNumber = parseInt(surahNumber, 10);

    // --- جلب نص السورة (لا تغيير هنا) ---
    useEffect(() => {
        if (!currentSurahNumber) return;
        setLoadingText(true);
        setError(null);
        setSurahTextData(null);
        setSurahAudioData(null);
        setCurrentAyahIndex(0); // إعادة تعيين مؤشر الآية

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

    // --- جلب صوت السورة (لا تغيير هنا) ---
    useEffect(() => {
        if (!currentSurahNumber || !selectedReciter) return;
        setLoadingAudio(true);
        setSurahAudioData(null);
        setCurrentAyahIndex(0); // إعادة تعيين مؤشر الآية

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

    // === الخطوة 2: منطق تشغيل الآية التالية تلقائيًا ===
    const handleAyahEnded = () => {
        const isLastAyah = currentAyahIndex === surahAudioData.ayahs.length - 1;
        if (!isLastAyah) {
            // إذا لم تكن الآية الأخيرة، انتقل إلى التالية
            setCurrentAyahIndex(prevIndex => prevIndex + 1);
        }
    };

    // === الخطوة 3: تحديث مشغل الصوت عند تغير الآية ===
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play(); // تشغيل الآية الجديدة تلقائيًا
        }
    }, [currentAyahIndex]);


    // --- دوال التنقل (لا تغيير هنا) ---
    const goToNextSurah = () => {
        if (currentSurahNumber < 114) navigate(`/surah/${currentSurahNumber + 1}`);
    };
    const goToPreviousSurah = () => {
        if (currentSurahNumber > 1) navigate(`/surah/${currentSurahNumber - 1}`);
    };

    // --- عرض الواجهة ---
    if (loadingText) return <div className={styles.statusMessage}>جاري تحميل السورة...</div>;
    if (error) return <div className={styles.statusMessage} style={{ color: 'red' }}>{error}</div>;
    if (!surahTextData) return <div className={styles.statusMessage}>لم يتم العثور على بيانات السورة.</div>;

    return (
        <div className={styles.surahPageContainer}>
            {/* ... قسم الهيدر واختيار القارئ (لا تغيير هنا) ... */}
            <div className={styles.surahHeader}>
                <h1>{surahTextData.name}</h1>
                <p>({surahTextData.englishName})</p>
                <p>{surahTextData.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surahTextData.numberOfAyahs} آية</p>
            </div>

            <div className={styles.audioSection}>
                <div className={styles.reciterSelector}>
                    <label htmlFor="reciter-select">اختر القارئ:</label>
                    <select id="reciter-select" value={selectedReciter} onChange={(e) => setSelectedReciter(e.target.value)}>
                        {reciters.map(reciter => (<option key={reciter.identifier} value={reciter.identifier}>{reciter.name}</option>))}
                    </select>
                </div>

                {loadingAudio && <p className={styles.audioStatus}>جاري تحميل التلاوة...</p>}
                
                {/* === الخطوة 4: تعديل مشغل الصوت ليعمل مع قائمة التشغيل === */}
                {surahAudioData && surahAudioData.ayahs && surahAudioData.ayahs.length > 0 && (
                    <div className={styles.audioPlayerWrapper}>
                        <audio
                            ref={audioRef}
                            controls
                            autoPlay
                            src={surahAudioData.ayahs[currentAyahIndex].audio}
                            onEnded={handleAyahEnded} // <-- هذا هو مفتاح الحل
                            className={styles.audioPlayer}
                        >
                            متصفحك لا يدعم عنصر الصوت.
                        </audio>
                        <p className={styles.currentAyahIndicator}>
                            الآية قيد التشغيل: {currentAyahIndex + 1} / {surahAudioData.ayahs.length}
                        </p>
                    </div>
                )}
            </div>

            {/* ... عرض الآيات وأزرار التنقل (لا تغيير هنا) ... */}
            <div className={styles.ayahContainer}>
                {surahTextData.ayahs.map((ayah, index) => (
                    <div 
                        key={ayah.number} 
                        // تمييز الآية التي يتم تشغيلها
                        className={`${styles.ayah} ${index === currentAyahIndex ? styles.ayahPlaying : ''}`}
                    >
                        <p className={styles.ayahText}>
                            {ayah.text} <span className={styles.ayahNumber}>({ayah.numberInSurah})</span>
                        </p>
                    </div>
                ))}
            </div>

            <div className={styles.navigationButtons}>
                {currentSurahNumber > 1 && (<button onClick={goToPreviousSurah} className={styles.navButton}>→ السورة السابقة</button>)}
                {currentSurahNumber < 114 && (<button onClick={goToNextSurah} className={styles.navButton}>السورة التالية ←</button>)}
            </div>
        </div>
    );
};

export default SurahPage;
