import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HadithListPage.css';
import hadithFrame from '../assets/hadith-frame.png';

const HadithListPage = () => {
  const { collectionName } = useParams();
  const navigate = useNavigate();
  const [hadiths, setHadiths] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`https://api.sunnah.com/v1/collections/${collectionName}/hadiths?limit=25&page=1`);
        
        if (response.data && response.data.data.length > 0) {
          setHadiths(response.data.data);
        } else {
          throw new Error('لم يتم العثور على أحاديث لهذا الكتاب.');
        }

        const collectionInfo = await axios.get(`https://api.sunnah.com/v1/collections/${collectionName}`);
        setCollectionTitle(collectionInfo.data.data.title);

      } catch (err) {
        console.error("Error fetching hadiths:", err);
        setError('حدث خطأ أثناء تحميل الأحاديث. قد يكون الكتاب غير متوفر أو هناك مشكلة في الشبكة. يرجى المحاولة مرة أخرى.');
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
      navigator.share({ title: 'حديث شريف', text: text }).catch(console.error);
    } else {
      alert('المشاركة غير مدعومة في هذا المتصفح.');
    }
  };

  // عرض رسالة التحميل
  if (loading) {
    return <div className="loading-message">جاري تحميل الأحاديث...</div>;
  }

  // 👇 عرض رسالة الخطأ بشكل محسن 👇
  if (error) {
    return (
      <div className="hadith-list-container error-container">
        <h2 className="error-title">حدث خطأ</h2>
        <p className="error-text">{error}</p>
        <button onClick={() => navigate('/hadith')} className="back-to-collections-btn">
          العودة إلى قائمة الكتب
        </button>
      </div>
    );
  }

  // عرض الأحاديث عند النجاح
  return (
    <div className="hadith-list-container">
      <header className="hadith-list-header">
        <h1>{collectionTitle}</h1>
        <button onClick={() => navigate('/hadith')} className="back-to-collections-btn">
          العودة إلى قائمة الكتب
        </button>
      </header>

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
    </div>
  );
};

export default HadithListPage;
