import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import duasData from '../data/duas.json';
import styles from './DuasPage.module.css'; // سنستخدم نفس ملف التنسيق القديم مع تعديلات بسيطة

const DuasPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
      
  // البحث عن الفئة المطابقة في البيانات
  const category = duasData.categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className={styles.duasContainer}>
        <h1 className={styles.duasHeader}>الفئة غير موجودة</h1>
        <button onClick={() => navigate('/duas')} className={styles.backButton}>
          العودة لقائمة الفصول
        </button>
      </div>
    );
  }

  return (
    <div className={styles.duasContainer}>
      <header className={styles.duasHeader}>
        <h1>{category.title}</h1>
        <button onClick={() => navigate('/duas')} className={styles.backButton}>
          العودة لقائمة الفصول
        </button>
      </header>

      <div className={styles.contentArea}>
        {category.content.map((item, index) => {
          if (item.type === 'title') {
            return <h2 key={index} className={styles.contentTitle}>{item.text}</h2>;
          }
          if (item.type === 'paragraph' || item.type === 'hadith') {
            return <p key={index} className={styles.contentText}>{item.text}</p>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default DuasPage;
