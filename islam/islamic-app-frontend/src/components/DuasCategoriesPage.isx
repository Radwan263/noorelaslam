import React from 'react';
import { useNavigate } from 'react-router-dom';
import duasData from '../data/duas.json';
import styles from './DuasCategoriesPage.module.css'; // سننشئ هذا الملف

const DuasCategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.categoriesContainer}>
      <header className={styles.categoriesHeader}>
        <h1>فصول الأدعية والأذكار</h1>
        <p>من كتاب الأدعية والأذكار للشيخ عبدالله سراج الدين</p>
      </header>
      <div className={styles.categoriesList}>
        {duasData.categories.map(category => (
          <div 
            key={category.id} 
            className={styles.categoryCard}
            onClick={() => navigate(`/duas/${category.id}`)}
          >
            {category.title}
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        العودة للرئيسية
      </button>
    </div>
  );
};

export default DuasCategoriesPage;
