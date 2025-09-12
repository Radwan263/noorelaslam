import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SurahPage.module.css';
import surahPageMapping from './surahPageMapping';

const recitersList = [
  { server: 'server7', id: 'basit', name: 'عبد الباسط عبد الصمد' },
  { server: 'server13', id: 'Al-Hussary_128kb_m.mp3', name: 'محمود خليل الحصري' },
  { server: 'server8', id: 'frs_a', name: 'فارس عباد' },
  { server: 'server12', id: 'jleel', name: 'خالد الجليل' },
  { server: 'server11', id: 'yasser', name: 'ياسر الدوسري' },
  { server: 'server11', id: 'qtm', name: 'ناصر القطامي' },
  { server: 'server13', id: 'soudais', name: 'عبد الرحمن السديس' },
  { server: 'server8', id: 'afs', name: 'مشاري راشد العفاسي' },
  { server: 'server12', id: 'maher', name: 'ماهر المعيقلي' },
  { server: 'server10', id: 'minsh', name: 'محمد صديق المنشاوي' },
  { server: 'server7', id: 'shur', name: 'سعود الشريم' },
  { server: 'server10', id: 'ajm', name: 'أحمد بن علي العجمي' },
];

const SurahPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedReciter, setSelectedReciter] = useState(recitersList[0]);
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
    const newAudioUrl = `https://${selectedReciter.server}.mp3quran.net/${selectedReciter.id}/${formattedSurahNumber}.mp3`;
    setAudioUrl(newAudioUrl);

  }, [currentPage, selectedReciter]);

  const handleReciterChange = (event) => {
    const reciterId = event.target.value;
    const reciter = recitersList.find(r => r.id === reciterId);
    setSelectedReciter(reciter);
  };

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

      {/* --- هذا هو القسم الذي تم تعديله --- */}
      <div className={styles.audioControls}>
        <select onChange={handleReciterChange} value={selectedReciter.id} className={styles.reciterSelect}>
          {recitersList.map(reciter => (
            <option key={reciter.id} value={reciter.id}>{reciter.name}</option>
          ))}
        </select>
        <button onClick={togglePlayPause} className={styles.playButton}>
          {isPlaying ? '❚❚ إيقاف' : '▶ تشغيل'}
        </button>
        {/* --- هذا هو الزر الجديد --- */}
        <a 
          href={audioUrl} 
          download 
          className={`${styles.playButton} ${styles.downloadButton}`}
          target="_blank" // يضمن الفتح في نافذة جديدة إذا لم يبدأ التحميل مباشرة
          rel="noopener noreferrer"
        >
          ⤓ تحميل
        </a>
        {/* ------------------------- */}
      </div>
      {/* ------------------------------------ */}

      <div className={styles.navigation}>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>الصفحة التالية</button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>الصفحة السابقة</button>
      </div>
    </div>
  );
};

export default SurahPage;
