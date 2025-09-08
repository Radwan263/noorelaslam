// src/components/QuranSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { surahs as fallbackSurahs } from '../data/surahs-fallback'; // استيراد البيانات الاحتياطية

function QuranSection() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        // محاولة جلب البيانات من الإنترنت
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        if (response.data && response.data.data) {
          setSurahs(response.data.data); // البيانات من الإنترنت
        } else {
          throw new Error("API response is not valid");
        }
      } catch (error) {
        console.error("Failed to fetch from API, using fallback data.", error);
        setError("فشل الاتصال بالخادم، سيتم عرض نسخة محلية.");
        setSurahs(fallbackSurahs); // استخدام البيانات الاحتياطية عند الفشل
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700" style={{ fontFamily: 'Amiri, serif' }}>
            القرآن الكريم
          </h1>
          <p className="text-gray-500 mt-2">
            فهرس سور القرآن الكريم (114 سورة)
          </p>
        </div>

        {loading && <p className="text-center text-gray-500 text-lg">جاري تحميل الفهرس...</p>}
        {error && <p className="text-center text-yellow-600 bg-yellow-100 p-3 rounded-md">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {surahs.map(surah => (
            <div 
              key={surah.number} 
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center hover:shadow-xl hover:bg-teal-50 transition-all duration-300 cursor-pointer"
            >
              <p className="text-lg font-semibold text-teal-800">{surah.number}. {surah.name}</p>
              <p className="text-sm text-gray-600">{surah.englishName}</p>
              <p className="text-xs text-gray-400 mt-2">
                {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.numberOfAyahs} آيات
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuranSection;
