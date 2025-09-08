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

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
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

  // تحويل رقم السورة إلى عدد صحيح للمقارنة
  const surahNum = parseInt(surahNumber, 10);

  return (
    <div className="surah-page-container">
      <div className="mushaf-page">
        <div className="page-header">
          <h1>{surah.name}</h1>
        </div>
        <div className="page-content">
          {/* إضافة البسملة (مع شرط عدم عرضها في سورة التوبة "9" أو الفاتحة "1" لأنها جزء منها) */}
          {surahNum !== 1 && surahNum !== 9 && (
            <h2 className="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h2>
          )}

          {surah.ayahs.map((ayah) => (
            <span key={ayah.number} className="ayah-text">
              {/* إزالة البسملة من الآية الأولى إذا كانت السورة ليست الفاتحة */}
              {ayah.numberInSurah === 1 && surahNum !== 1
                ? ayah.text.replace(/^بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\s*/, '')
                : ayah.text}
              <span className="ayah-number">({ayah.numberInSurah})</span>
            </span>
          ))}
        </div>
        <div className="page-footer">
          <p>الجزء: {surah.ayahs[0].juz} - الحزب: {surah.ayahs[0].hizbQuarter}</p>
        </div>
      </div>

      {/* حاوية جديدة للأزرار */}
      <div className="navigation-buttons">
        <button onClick={() => navigate('/quran')} className="back-button">
          العودة إلى السور
        </button>
        <button onClick={() => navigate('/')} className="back-button">
          العودة إلى الرئيسية
        </button>
      </div>
    </div>
  );
};

export default SurahPage;
