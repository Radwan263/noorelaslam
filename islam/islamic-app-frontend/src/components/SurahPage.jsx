import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SurahPage.css'; // استيراد ملف CSS العادي

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        // استخدام الرابط الموثوق لجلب السورة
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
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
  }, [surahNumber]);

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

      {/* عرض كل آية في حاوية منفصلة */}
      {surah.ayahs.map((ayah) => (
        <div key={ayah.number} className="ayah-container">
          <p className="ayah-text">
            {ayah.text}
            <span className="ayah-number">({ayah.numberInSurah})</span>
          </p>
        </div>
      ))}

      <button onClick={() => navigate('/quran')} className="back-button-surah">
        العودة إلى الفهرس
      </button>
    </div>
  );
};

export default SurahPage;
