import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SurahPage.css'; // سنقوم بإنشاء هذا الملف لاحقًا

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
        // ملاحظة: هذا الرابط يجلب السورة كاملة. لاحقًا سنقسمها لصفحات.
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
    <div className="surah-page-container">
      <div className="mushaf-page">
        <div className="page-header">
          <h1>{surah.name}</h1>
        </div>
        <div className="page-content">
          {surah.ayahs.map((ayah, index) => (
            <span key={index} className="ayah-text">
              {ayah.text} <span className="ayah-number">({ayah.numberInSurah})</span>
            </span>
          ))}
        </div>
        <div className="page-footer">
          <p>رقم الصفحة (سيتم إضافته لاحقًا)</p>
        </div>
      </div>

      <button onClick={() => navigate('/')} className="back-button">
        العودة إلى الفهرس
      </button>
    </div>
  );
};

export default SurahPage;
