import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // <-- تم تعطيل axios مؤقتًا
import './HadithListPage.css';
import hadithFrame from '../assets/hadith-frame.png';

// 👇 بيانات وهمية (مؤقتة) لحديثين من صحيح البخاري 👇
const mockHadiths = [
  {
    hadithNumber: '1',
    hadith: [{
      body: 'حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ، قَالَ حَدَّثَنَا سُفْيَانُ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الأَنْصَارِيُّ، قَالَ أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ، يَقُولُ سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ ـ رضى الله عنه ـ عَلَى الْمِنْبَرِ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏ "‏ إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ ‏"‏‏.‏',
      grade: 'صحيح'
    }]
  },
  {
    hadithNumber: '2',
    hadith: [{
      body: 'حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، قَالَ أَخْبَرَنَا مَالِكٌ، عَنْ هِشَامِ بْنِ عُرْوَةَ، عَنْ أَبِيهِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ ـ رضى الله عنها ـ أَنَّ الْحَارِثَ بْنَ هِشَامٍ ـ رضى الله عنه ـ سَأَلَ رَسُولَ اللَّهِ صلى الله عليه وسلم فَقَالَ يَا رَسُولَ اللَّهِ كَيْفَ يَأْتِيكَ الْوَحْىُ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏"‏ أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ ـ وَهُوَ أَشَدُّهُ عَلَىَّ ـ فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ، وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلاً فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ ‏"‏‏.‏ قَالَتْ عَائِشَةُ رضى الله عنها وَلَقَدْ رَأَيْتُهُ يَنْزِلُ عَلَيْهِ الْوَحْىُ فِي الْيَوْمِ الشَّدِيدِ الْبَرْدِ فَيَفْصِمُ عَنْهُ وَإِنَّ جَبِينَهُ لَيَتَفَصَّدُ عَرَقًا‏.‏',
      grade: 'صحيح'
    }]
  }
];

const HadithListPage = () => {
  const { collectionName } = useParams();
  const navigate = useNavigate();
  const [hadiths, setHadiths] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState(collectionName); // استخدام اسم المجموعة من الرابط كعنوان مبدئي
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب البيانات
    setHadiths(mockHadiths);
    // يمكنك تعديل العنوان هنا ليكون أكثر جمالاً
    if (collectionName === 'bukhari') {
      setCollectionTitle('صحيح البخاري');
    }
    
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
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
