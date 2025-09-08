import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SurahPage.css';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- حالات جديدة لإدارة القرآءات ---
  const [mushafs, setMushafs] = useState([]); // قائمة المصاحف (القرآءات)
  const [selectedMushaf, setSelectedMushaf] = useState(null); // المصحف المختار
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // 1. جلب قائمة المصاحف (القرآءات) عند تحميل المكون لأول مرة
  useEffect(() => {
    const fetchMushafs = async () => {
      try {
        const response = await axios.get('https://api.quranpedia.net/v1/mushafs');
        const availableMushafs = response.data.data;
        setMushafs(availableMushafs);
        // تعيين القراءة الافتراضية (حفص عن عاصم)
        const defaultMushaf = availableMushafs.find(m => m.name.includes('حفص'));
        setSelectedMushaf(defaultMushaf || availableMushafs[0]);
      } catch (err) {
        console.error("Failed to fetch mushafs list", err);
        setError('فشل تحميل قائمة القرآءات.');
      }
    };
    fetchMushafs();
  }, []);

  // 2. جلب بيانات السورة كلما تغير رقم السورة أو المصحف المختار
  useEffect(() => {
    if (!selectedMushaf) return; // لا تفعل شيئًا إذا لم يتم اختيار مصحف بعد

    const fetchSurahData = async () => {
      setLoading(true);
      try {
        const url = `https://api.quranpedia.net/v1/surahs/${surahNumber}?mushaf=${selectedMushaf.id}`;
        const response = await axios.get(url);
        setSurahData(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch surah data", err);
        setError('حدث خطأ أثناء تحميل بيانات السورة. قد تكون هذه السورة غير متوفرة في هذه القراءة.');
        setSurahData(null); // مسح البيانات القديمة عند حدوث خطأ
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahNumber, selectedMushaf]);

  const handleMushafChange = (mushaf) => {
    setSelectedMushaf(mushaf);
    setDropdownOpen(false);
  };

  if (!selectedMushaf) {
    return <div className="loading-message">جاري تحميل قائمة القرآءات...</div>;
  }

  return (
    <div className="surah-display-container">
      <header className="surah-header">
        {/* سيتم عرض اسم السورة من البيانات التي تم جلبها */}
        <h1>{surahData ? surahData.name : 'جاري التحميل...'}</h1>
        
        <div className="qiraah-selector">
          <button className="qiraah-dropdown-btn" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <span>{selectedMushaf.name}</span>
            <span>▼</span>
          </button>
          {isDropdownOpen && (
            <div className="qiraah-dropdown-content">
              {mushafs.map(m => (
                <a key={m.id} onClick={() => handleMushafChange(m)}>
                  {m.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {loading && <div className="loading-message">جاري تحميل الآيات...</div>}
      {error && <div className="error-message">{error}</div>}

      {surahData && surahData.verses.map((ayah) => (
        <div key={ayah.id} className="ayah-container">
          <p className="ayah-text">
            {ayah.text}
            <span className="ayah-number">({ayah.number})</span>
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
