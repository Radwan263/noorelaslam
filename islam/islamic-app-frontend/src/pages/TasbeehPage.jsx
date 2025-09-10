// src/pages/TasbeehPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client'; // استيراد مهم
import FloatingTasbeeh from '../../components/FloatingTasbeeh'; // تأكد من المسار الصحيح
import styles from './TasbeehPage.module.css';

const TasbeehPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pipWindow, setPipWindow] = useState(null); // حالة لتتبع النافذة العائمة

  useEffect(() => {
    const savedCount = localStorage.getItem('tasbeeh_current_count');
    const savedTotal = localStorage.getItem('tasbeeh_total_count');
    if (savedCount) setCount(parseInt(savedCount, 10));
    if (savedTotal) setTotalCount(parseInt(savedTotal, 10));

    // الاستماع للتغييرات من النافذة العائمة
    const handleStorageChange = () => {
      const updatedCount = localStorage.getItem('tasbeeh_current_count');
      const updatedTotal = localStorage.getItem('tasbeeh_total_count');
      if (updatedCount) setCount(parseInt(updatedCount, 10));
      if (updatedTotal) setTotalCount(parseInt(updatedTotal, 10));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const increment = () => {
    const newCount = count + 1;
    const newTotal = totalCount + 1;
    setCount(newCount);
    setTotalCount(newTotal);
    localStorage.setItem('tasbeeh_current_count', newCount);
    localStorage.setItem('tasbeeh_total_count', newTotal);
  };

  const resetCurrent = () => {
    setCount(0);
    localStorage.setItem('tasbeeh_current_count', 0);
  };

  const resetAll = () => {
    if (window.confirm('هل أنت متأكد أنك تريد تصفير العداد الإجمالي؟')) {
      setCount(0);
      setTotalCount(0);
      localStorage.setItem('tasbeeh_current_count', 0);
      localStorage.setItem('tasbeeh_total_count', 0);
    }
  };

  // --- دالة فتح النافذة العائمة ---
  const openFloatingTasbeeh = async () => {
    if (pipWindow) {
      pipWindow.close();
      setPipWindow(null);
      return;
    }

    try {
      const pip = await window.documentPictureInPicture.requestWindow({
        width: 200,
        height: 200,
      });

      // إنشاء عنصر div ليعمل كتطبيق React صغير داخل النافذة
      const container = pip.document.createElement('div');
      pip.document.body.append(container);
      
      // إضافة الخطوط والأنماط الأساسية للنافذة الجديدة
      const fontLink = pip.document.createElement('link');
      fontLink.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap";
      fontLink.rel = "stylesheet";
      pip.document.head.appendChild(fontLink);

      // عرض مكون React داخل النافذة العائمة
      const root = ReactDOM.createRoot(container);
      root.render(<FloatingTasbeeh />);
      
      setPipWindow(pip);

      // عند إغلاق النافذة، قم بتحديث الحالة
      pip.addEventListener('pagehide', () => {
        setPipWindow(null);
      });

    } catch (error) {
      console.error('فشل فتح النافذة العائمة:', error);
      alert('متصفحك لا يدعم هذه الميزة أو تم رفض الإذن.');
    }
  };

  return (
    <div className={styles.tasbeehContainer}>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        العودة للرئيسية
      </button>
      
      <div className={styles.totalCounter}>
        <p>إجمالي التسبيحات</p>
        <span>{totalCount}</span>
      </div>

      <div className={styles.tasbeehCircle} onClick={increment}>
        <div className={styles.countDisplay}>{count}</div>
        <div className={styles.tapArea}>اضغط هنا للتسبيح</div>
      </div>

      <div className={styles.controls}>
        <button onClick={resetCurrent} className={styles.resetButton}>
          تصفير العداد الحالي
        </button>
        <button onClick={resetAll} className={`${styles.resetButton} ${styles.danger}`}>
          تصفير الإجمالي
        </button>
        {/* --- الزر الجديد --- */}
        <button onClick={openFloatingTasbeeh} className={styles.resetButton}>
          {pipWindow ? 'إغلاق العائمة' : 'فتح التسبيح العائم'}
        </button>
      </div>
    </div>
  );
};

export default TasbeehPage;
