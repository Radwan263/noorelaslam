import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- إضافة جديدة
import './QuranSection.css';
import surahFrame from '../assets/surah-frame.png';

const QuranSection = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- إضافة جديدة

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // 👇 دالة جديدة للتعامل مع النقر على السورة 👇
  const handleSurahClick = (surahNumber) => {
    navigate(`/surah/${surahNumber}`);
  };

  return (
    <div className="quran-section-container">
      <header className="quran-title-header">
        <h1 className="quran-main-title">القرآن الكريم</h1>
        <p className="quran-subtitle">اختر السورة التي تود قراءتها</p>
      </header>

      {loading ? (
        <div className="loading-message">جاري تحميل قائمة السور...</div>
      ) : (
        <div className="surah-list">
          {surahs.map(surah => (
            // 👇 إضافة onClick هنا 👇
            <div
              key={surah.number}
              className="surah-card"
              style={{ backgroundImage: `url(${surahFrame})` }}
              onClick={() => handleSurahClick(surah.number)}
            >
              <div className="surah-info">
                <div className="surah-number">{surah.number}</div>
                <div className="surah-name-details">
                  <p className="surah-name">{surah.name}</p>
                  <p className="surah-details">
                    {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.numberOfAyahs} آيات
                  </p>
                </div>
              </div>
              <div className="surah-name-english">
                <p>{surah.englishName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuranSection;
