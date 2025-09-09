import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import duasData from '../data/duas.json';
import styles from './DuasPage.module.css';

// مكون منفصل لكل دعاء لإدارة حالته (العداد) بشكل مستقل
const DuaItem = ({ dua }) => {
  const [count, setCount] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(dua.arabic_text)
      .then(() => {
        alert('تم نسخ الدعاء!'); // يمكنك استبدال هذا بتنبيه أفضل
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className={styles.duaCard}>
      <h3 className={styles.duaTitle}>{dua.title}</h3>
      <p className={styles.duaText}>{dua.arabic_text}</p>
      
      {dua.virtue && <p className={styles.duaVirtue}><strong>الفضل:</strong> {dua.virtue}</p>}
      <p className={styles.duaSource}><strong>المصدر:</strong> {dua.source}</p>
      {dua.notes && <p className={styles.duaNotes}><strong>ملاحظات:</strong> {dua.notes}</p>}

      <div className={styles.duaActions}>
        <button onClick={handleCopy} className={styles.actionButton}>نسخ</button>
        <div className={styles.counter}>
          <button onClick={() => setCount(prev => prev + 1)} className={styles.counterButton}>+</button>
          <span className={styles.countDisplay}>{count}</span>
        </div>
      </div>
    </div>
  );
};

const DuasPage = () => {
  const { categoryId } = useParams();
  const category = duasData.categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>الفئة غير موجودة</h1>
        <Link to="/duas" className={styles.backLink}>العودة إلى الفئات</Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Link to="/duas" className={styles.backLink}>&larr; العودة إلى الفئات</Link>
      <h1 className={styles.pageTitle}>{category.name}</h1>
      <div className={styles.duasContainer}>
        {category.duas.map(dua => (
          <DuaItem key={dua.id} dua={dua} />
        ))}
      </div>
    </div>
  );
};

export default DuasPage;
