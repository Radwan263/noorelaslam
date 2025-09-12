import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SurahPage.module.css';
// بيانات بداية كل سورة في أي صفحة (مهم جدًا)
import surahPageMapping from './surahPageMapping'; 

const SurahPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // حالات الصوت الجديدة
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // للتحكم في عنصر الصوت

  const totalPages = 604;
  const imageUrl = `https://qurancomplex.gov.sa/wp-content/uploads/2022/10/${currentPage}.png`;

  // 1. جلب قائمة القراء عند تحميل المكون
  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const response = await axios.get('https://www.mp3quran.net/api/v3/reciters?language=ar');
        // فلترة القراء لنأخذ فقط من لديهم تلاوة كاملة (مرتل)
        const filteredReciters = response.data.reciters.filter(r => r.moshaf.some(m => m.name === 'مرتل'));
        setReciters(filteredReciters);
        // اختيار قارئ افتراضي (مثلاً: عبد الباسط عبد الصمد)
        const defaultReciter = filteredReciters.find(r => r.id === 7);
        setSelectedReciter(defaultReciter);
      } catch (error) {
        console.error("Failed to fetch reciters:", error);
      }
    };
    fetchReciters();
  }, []);

  // 2. تحديث رابط الصوت عند تغير القارئ أو الصفحة
  useEffect(() => {
    if (selectedReciter) {
      // البحث عن السورة التي تبدأ في الصفحة الحالية
      let surahNumber = 1;
      for (let i = surahPageMapping.length - 1; i >= 0; i--) {
        if (currentPage >= surahPageMapping[i].page) {
          surahNumber = surahPageMapping[i].surah;
          break;
        }
      }
      
      // تنسيق رقم السورة ليكون 3 أرقام
      const formattedSurahNumber = String(surahNumber).padStart(3, '0');
      
      // الحصول على رابط الخادم الخاص بالمصحف المرتل
      const moshaf = selectedReciter.moshaf.find(m => m.name === 'مرتل');
      if (moshaf) {
        const newAudioUrl = `${moshaf.server}/${formattedSurahNumber}.mp3`;
        setAudioUrl(newAudioUrl);
      }
    }
  }, [currentPage, selectedReciter]);

  // 3. دوال التحكم في الصوت
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // دوال التنقل بين الصفحات
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
      setIsPlaying(false); // إيقاف الصوت عند تغيير الصفحة
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setIsLoading(true);
      setIsPlaying(false); // إيقاف الصوت عند تغيير الصفحة
    }
  };

  const handleReciterChange = (event) => {
    const reciterId = parseInt(event.target.value, 10);
    const reciter = reciters.find(r => r.id === reciterId);
    setSelectedReciter(reciter);
    setIsPlaying(false); // إيقاف الصوت عند تغيير القارئ
  };

  return (
    <div className={styles.pageContainer}>
      {/* عنصر الصوت المخفي */}
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onEnded={() => setIsPlaying(false)}
      />

      <div className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          الرئيسية
        </button>
        <div className={styles.pageNumber}>صفحة {currentPage}</div>
      </div>

      <div className={styles.imageWrapper}>
        {isLoading && <div className={styles.loader}>جاري تحميل الصفحة...</div>}
        <img
          src={imageUrl}
          alt={`صفحة ${currentPage} من القرآن الكريم`}
          className={styles.quranImage}
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>

      {/* شريط التحكم الجديد */}
      <div className={styles.audioControls}>
        <select onChange={handleReciterChange} value={selectedReciter ? selectedReciter.id : ''}>
          {reciters.map(reciter => (
            <option key={reciter.id} value={reciter.id}>
              {reciter.name}
            </option>
          ))}
        </select>
        <button onClick={togglePlayPause} className={styles.playButton}>
          {isPlaying ? '❚❚ إيقاف' : '▶ تشغيل'}
        </button>
      </div>

      <div className={styles.navigation}>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          الصفحة التالية
        </button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          الصفحة السابقة
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
