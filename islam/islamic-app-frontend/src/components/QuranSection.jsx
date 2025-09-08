// src/components/QuranSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fallbackSurahs } from '../data/surahs-fallback.js';
import './QuranSection.css'; // سنستخدم نفس ملف التنسيق

// استيراد صورة الإطار
import surahFrame from '../assets/surah-frame.png';

function QuranSection() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then(response => {
        setSurahs(response.data.data);
      })
      .catch(error => {
        console.error("API fetch failed, using fallback:", error);
        setSurahs(fallbackSurahs);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSurahClick = (surah) => {
    alert(`سيتم فتح صفحة سورة: ${surah.name}`);
  };

  return (
    <div dir="rtl" className="quran-section-container">
      <div className="quran-title-header">
        <h1 className="quran-main-title">القرآن الكريم</h1>
        <p className="quran-subtitle">فهرس السور</p>
      </div>

      {loading && <p className="loading-message">جاري تحميل السور...</p>}

      {!loading && (
        <div className="surah-list">
          {surahs.map((surah) => (
            <div
              key={surah.number}
              className="surah-card"
              // هنا نستخدم الصورة الواحدة كخلفية لكل الكروت
              style={{ backgroundImage: `url(${surahFrame})` }}
              onClick={() => handleSurahClick(surah)}
            >
              <div className="surah-info">
                <span className="surah-number">{surah.number}</span>
                <span className="surah-name">{surah.name}</span>
              </div>
              <span className="surah-details">
                {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.numberOfAyahs} آيات
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuranSection;
