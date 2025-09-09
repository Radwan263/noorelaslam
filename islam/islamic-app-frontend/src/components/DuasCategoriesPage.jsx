import React from 'react';
import { Link } from 'react-router-dom';
import duasData from '../data/duas.json';
import styles from './DuasPage.module.css';

const DuasCategoriesPage = () => {
  const { categories } = duasData;
  const colors = ['#4A90E2', '#50E3C2', '#F5A623', '#BD10E0', '#9013FE', '#D0021B'];

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>فئات الأدعية</h1>
      <div className={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <Link 
            to={`/duas/${category.id}`} 
            key={category.id} 
            className={styles.categoryCard}
            style={{ borderTop: `5px solid ${colors[index % colors.length]}` }}
          >
            <h2 className={styles.categoryName}>{category.name}</h2>
            <p className={styles.categoryDescription}>{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DuasCategoriesPage;
