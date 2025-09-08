import React from 'react';
import { useNavigate } from 'react-router-dom';
import azkarData from '../data/azkar.json'; // <-- استيراد البيانات من ملفنا المحلي
import './AzkarCategoriesPage.css'; // <-- سننشئ هذا الملف بعد قليل

const AzkarCategoriesPage = () => {
  const navigate = useNavigate();
  const categories = azkarData.categories;

  const handleCategoryClick = (categoryId) => {
    navigate(`/azkar/${categoryId}`);
  };

  return (
    <div className="azkar-categories-container">
      <header className="azkar-categories-header">
        <h1 className="azkar-main-title">الأذكار</h1>
        <p className="azkar-subtitle">اختر نوع الأذكار الذي تود قراءته</p>
      </header>

      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AzkarCategoriesPage;
