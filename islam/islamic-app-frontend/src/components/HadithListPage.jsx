import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// هذا مجرد هيكل أساسي مؤقت
const HadithListPage = () => {
  const { collectionName } = useParams(); // لقراءة اسم الكتاب من الرابط
  const navigate = useNavigate();

  return (
    <div style={{ color: 'white', textAlign: 'center', padding: '5rem', fontFamily: 'Amiri, serif' }}>
      <h1 style={{ fontSize: '3rem' }}>أحاديث كتاب: {collectionName}</h1>
      <p style={{ fontSize: '1.5rem' }}>قريبًا... سيتم عرض الأحاديث هنا.</p>
      <button 
        onClick={() => navigate('/hadith')} 
        style={{ padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer', marginTop: '2rem' }}
      >
        العودة إلى قائمة الكتب
      </button>
    </div>
  );
};

export default HadithListPage;
