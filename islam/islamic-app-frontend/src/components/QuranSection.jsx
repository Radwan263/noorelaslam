import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuranSection() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // جلب قائمة السور من واجهة برمجة التطبيقات
    axios.get('https://api.alquran.cloud/v1/surah')
      .then(response => {
        setSurahs(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching surahs:", error);
        setError("حدث خطأ أثناء تحميل قائمة السور. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      });
  }, []); // useEffect يعمل مرة واحدة فقط عند تحميل المكون

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* رأس الصفحة مع العنوان */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700" style={{ fontFamily: 'Amiri, serif' }}>
            القرآن الكريم
          </h1>
          <p className="text-gray-500 mt-2">
            قائمة سور القرآن الكريم (114 سورة)
          </p>
        </div>

        {/* عرض رسالة التحميل أو الخطأ */}
        {loading && <p className="text-center text-gray-500">جاري تحميل السور...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* شبكة عرض السور */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        )}
      </div>
    </div>
  );
}

export default QuranSection;
