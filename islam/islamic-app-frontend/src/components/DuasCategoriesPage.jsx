import React from 'react';
import { Link } from 'react-router-dom';
import duasData from '../data/duas.json';
import styles from './DuasPage.module.css';

// يمكننا تعيين أيقونات لكل فئة هنا
const categoryIcons = {
  azkar_sabah_masaa: '☀️', // شمس
  adkar_nawm: '🌙',         // قمر
  adkar_karb: '😥',         // وجه حزين
  adkar_misc: '📿',         // مسبحة
};

const DuasCategoriesPage = () => {
  const { categories } = duasData;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>فئات الأدعية</h1>
      <div className={styles.modernCategoriesContainer}>
        {categories.map((category) => (
          <Link to={`/duas/${category.id}`} key={category.id} className={styles.modernCard}>
            <div className={styles.cardIcon}>{categoryIcons[category.id] || '🤲'}</div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{category.name}</h2>
              <p className={styles.cardDescription}>{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DuasCategoriesPage;
