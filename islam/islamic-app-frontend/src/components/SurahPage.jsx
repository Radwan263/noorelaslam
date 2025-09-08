import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SurahPage.css'; // 👈 *** هذا هو السطر الأهم للتأكد من وجوده وصحته ***

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentSurahNum = parseInt(surahNumber, 10);

  useEffect(() => {
    if (isNaN(currentSurahNum) || currentSurahNum < 1 || currentSurahNum > 114) {
      navigate('/quran'); 
      return;
    }

    const fetchSurah = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${currentSurahNum}`);
        setSurah(response.data.data);
        setError(null);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات السورة. يرجى المحاولة مرة أخرى.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    // 👇 إضافة window.scrollTo للتأكد من أن الصفحة تبدأ من الأعلى عند التنقل 👇
    window.scrollTo(0, 0); 
  }, [currentSurahNum, navigate]);

  const goToNextSurah = () => {
    if (currentSurahNum < 114) {
      navigate(`/quran/${currentSurahNum + 1}`);
    }
  };

  const goToPrevSurah = () => {
    if (currentSurahNum > 1) {
      navigate(`/quran/${currentSurahNum - 1}`);
    }
  };

  if (loading) {
    return <div className="loading-message">جاري تحميل السورة...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="surah-display-container">
      <header className="surah-header">
        <h1>{surah.name}</h1>
        <p>
          {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.numberOfAyahs} آية
        </p>
      </header>

      {surah.ayahs.map((ayah) => (
        <div key={ayah.number} className="ayah-container">
          <p className="ayah-text">
            {ayah.text}
            <span className="ayah-number">({ayah.numberInSurah})</span>
          </p>
        </div>
      ))}

      <div className="surah-navigation-toolbar">
        <button 
          onClick={goToPrevSurah} 
          className="nav-arrow-btn"
          disabled={currentSurahNum === 1}
        >
          السابق
        </button>
        <button onClick={() => navigate('/quran')} className="back-button-surah">
          العودة للفهرس
        </button>
        <button 
          onClick={goToNextSurah} 
          className="nav-arrow-btn"
          disabled={currentSurahNum === 114}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
