import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SurahPage.module.css';
import surahPageMapping from './surahPageMapping';

// --- القائمة النهائية بالمعرفات الصحيحة 100% من الـ API ---
const recitersList = [
  { id: 'Abd_El_Basit_Murattal_64kb_m.mp3', name: 'عبد الباسط عبد الصمد' },
  { id: 'Al-Hussary_64kb_m.mp3', name: 'محمود خليل الحصري' },
  { id: 'Fares_Abbad_64kb_m.mp3', name: 'فارس عباد' },
  { id: 'Al-Galeel_64kb_m.mp3', name: 'خالد الجليل' },
  { id: 'Yasser_Ad-Dussary_128kb_m.mp3', name: 'ياسر الدوسري' },
  { id: 'Nasser_Al_qatami_128kb_m.mp3', name: 'ناصر القطامي' },
  { id: 'Abdurrahmaan_As-Sudais_192kb_m.mp3', name: 'عبد الرحمن السديس' },
  { id: 'Alafasy_128kb_m.mp3', name: 'مشاري راشد العفاسي' },
  { id: 'Maher_AlMuaiqly_64kb_m.mp3', name: 'ماهر المعيقلي' },
  { id: 'Al-Minshawi_Murattal_128kb_m.mp3', name: 'محمد صديق المنشاوي' },
  { id: 'Saood_Ash-Shuraym_128kb_m.mp3', name: 'سعود الشريم' },
  { id: 'Ahmed_Al_Ajmi_128kb_m.mp3', name: 'أحمد بن علي العجمي' },
];
// ---------------------------------------------------------

const SurahPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedReciterId, setSelectedReciterId] = useState('Abd_El_Basit_Murattal_64kb_m.mp3'); // القارئ الافتراضي بالمعرف الصحيح
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const totalPages = 604;
  const formattedPageNumber = String(currentPage).padStart(3, '0');
  const imageUrl = `https://ia800101.us.archive.org/32/items/z_20240806xx/${formattedPageNumber}.jpg`;

  useEffect(() => {
    let surahNumber = 1;
    for (let i = surahPageMapping.length - 1; i >= 0; i--) {
      if (currentPage >= surahPageMapping[i].page) {
        surahNumber = surahPageMapping[i].surah;
        break;
      }
    }
    
    const formattedSurahNumber = String(surahNumber).padStart(3, '0');
    
    // --- هذا هو السطر الذي تم تصحيحه بالخادم والمعرف الصحيح ---
    const newAudioUrl = `https://server13.mp3quran.net/${selectedReciterId}/${formattedSurahNumber}.mp3`;
    // ---------------------------------------------------------
    setAudioUrl(newAudioUrl);

  }, [currentPage, selectedReciterId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.src) {
        audioRef.current.play().catch(error => console.error("Audio Playback Error:", error));
      }
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setIsLoading(true);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.backButton}>الرئيسية</button>
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

      <div className={styles.audioControls}>
        <select onChange={(e) => setSelectedReciterId(e.target.value)} value={selectedReciterId} className={styles.reciterSelect}>
          {recitersList.map(reciter => (
            <option key={reciter.id} value={reciter.id}>{reciter.name}</option>
          ))}
        </select>
        <button onClick={togglePlayPause} className={styles.playButton}>
          {isPlaying ? '❚❚ إيقاف' : '▶ تشغيل'}
        </button>
      </div>

      <div className={styles.navigation}>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>الصفحة التالية</button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>الصفحة السابقة</button>
      </div>
    </div>
  );
};

export default SurahPage;
