import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SurahPage.css';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تحويل رقم السورة إلى عدد صحيح للعمليات الحسابية
  const currentSurahNum = parseInt(surahNumber, 10);

  useEffect(() => {
    // التأكد من أن رقم السورة ضمن النطاق الصحيح (1-114)
    if (currentSurahNum < 1 || currentSurahNum > 114) {
      navigate('/quran'); // إذا كان الرقم خاطئًا، ارجع للفهرس
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
  }, [currentSurahNum, navigate]); // نعتمد على الرقم الصحيح الآن

  // --- دوال التنقل ---
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

      {/* 👇 --- شريط التنقل الجديد في الأسفل --- 👇 */}
      <div className="surah-navigation-toolbar">
        <button 
          onClick={goToPrevSurah} 
          className="nav-arrow-btn"
          disabled={currentSurahNum === 1} // تعطيل الزر في سورة الفاتحة
        >
          السابق
        </button>
        <button onClick={() => navigate('/quran')} className="back-button-surah">
          العودة للفهرس
        </button>
        <button 
          onClick={goToNextSurah} 
          className="nav-arrow-btn"
          disabled={currentSurahNum === 114} // تعطيل الزر في سورة الناس
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
