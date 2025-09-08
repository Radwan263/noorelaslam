import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HadithListPage.css'; // سننشئ هذا الملف الآن
import hadithFrame from '../assets/hadith-frame.png'; // استيراد صورة الإطار

const HadithListPage = () => {
  const { collectionName } = useParams();
  const navigate = useNavigate();
  const [hadiths, setHadiths] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        setLoading(true);
        // جلب أول 25 حديث من الكتاب المحدد
        const response = await axios.get(`https://api.sunnah.com/v1/collections/${collectionName}/hadiths?limit=25&page=1`);
        setHadiths(response.data.data);
        // جلب معلومات الكتاب (مثل العنوان العربي)
        const collectionInfo = await axios.get(`https://api.sunnah.com/v1/collections/${collectionName}`);
        setCollectionTitle(collectionInfo.data.data.title);
      } catch (error) {
        console.error("Error fetching hadiths:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [collectionName]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الحديث!');
  };

  const shareHadith = (text) => {
    if (navigator.share) {
      navigator.share({
        title: 'حديث شريف',
        text: text,
      }).catch(console.error);
    } else {
      alert('المشاركة غير مدعومة في هذا المتصفح.');
    }
  };

  return (
    <div className="hadith-list-container">
      <header className="hadith-list-header">
        <h1>{loading ? 'جاري التحميل...' : collectionTitle}</h1>
        <button onClick={() => navigate('/hadith')} className="back-to-collections-btn">
          العودة إلى قائمة الكتب
        </button>
      </header>

      {loading ? (
        <div className="loading-message">جاري تحميل الأحاديث...</div>
      ) : (
        <div className="hadiths-grid">
          {hadiths.map(hadith => (
            <div key={hadith.hadithNumber} className="hadith-card" style={{ backgroundImage: `url(${hadithFrame})` }}>
              <div className="hadith-content">
                <p className="hadith-text" dir="rtl">{hadith.hadith[0].body}</p>
                <div className="hadith-info" dir="rtl">
                  <span className="hadith-grade">درجة الحديث: {hadith.hadith[0].grade}</span>
                </div>
              </div>
              <div className="hadith-actions">
                <button onClick={() => copyToClipboard(hadith.hadith[0].body)}>نسخ</button>
                <button onClick={() => shareHadith(hadith.hadith[0].body)}>مشاركة</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HadithListPage;
