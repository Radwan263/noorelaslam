import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TasbeehPage.module.css';

const TasbeehPage = () => {
  const navigate = useNavigate();
  
  // حالة لتخزين العدد الحالي
  const [count, setCount] = useState(0);
  
  // حالة لتخزين إجمالي التسبيحات
  const [totalCount, setTotalCount] = useState(0);

  // استخدام useEffect لقراءة القيم المحفوظة من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedCount = localStorage.getItem('tasbeeh_current_count');
    const savedTotal = localStorage.getItem('tasbeeh_total_count');
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
    if (savedTotal) {
      setTotalCount(parseInt(savedTotal, 10));
    }
  }, []);

  // دالة لزيادة العدد
  const increment = () => {
    const newCount = count + 1;
    const newTotal = totalCount + 1;
    setCount(newCount);
    setTotalCount(newTotal);
    // حفظ القيم الجديدة في localStorage
    localStorage.setItem('tasbeeh_current_count', newCount);
    localStorage.setItem('tasbeeh_total_count', newTotal);
  };

  // دالة لإعادة تعيين العداد الحالي فقط
  const resetCurrent = () => {
    setCount(0);
    localStorage.setItem('tasbeeh_current_count', 0);
  };
  
  // دالة لإعادة تعيين كل شيء
  const resetAll = () => {
    if (window.confirm('هل أنت متأكد أنك تريد تصفير العداد الإجمالي؟')) {
      setCount(0);
      setTotalCount(0);
      localStorage.setItem('tasbeeh_current_count', 0);
      localStorage.setItem('tasbeeh_total_count', 0);
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
      </div>
    </div>
  );
};

export default TasbeehPage;
