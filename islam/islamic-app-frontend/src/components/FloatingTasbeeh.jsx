// src/components/FloatingTasbeeh.jsx

import React, { useState, useEffect } from 'react';
import styles from './FloatingTasbeeh.module.css';

const FloatingTasbeeh = () => {
  const [count, setCount] = useState(0);

  // دالة لزيادة العدد وحفظه
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('tasbeeh_current_count', newCount);
    
    // تحديث الإجمالي أيضًا
    const total = parseInt(localStorage.getItem('tasbeeh_total_count') || '0', 10);
    localStorage.setItem('tasbeeh_total_count', total + 1);
  };

  // مراقبة التغييرات في localStorage لتحديث العداد
  useEffect(() => {
    const updateCount = () => {
      const savedCount = localStorage.getItem('tasbeeh_current_count');
      if (savedCount) {
        setCount(parseInt(savedCount, 10));
      }
    };

    // التحديث الأولي
    updateCount();

    // الاستماع لأي تغييرات في التخزين من نوافذ أخرى
    window.addEventListener('storage', updateCount);

    // التنظيف عند إغلاق المكون
    return () => {
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <div className={styles.floatingContainer} onClick={increment}>
      <span className={styles.floatingCount}>{count}</span>
      <div className={styles.floatingLabel}>تسبيح</div>
    </div>
  );
};

export default FloatingTasbeeh;
