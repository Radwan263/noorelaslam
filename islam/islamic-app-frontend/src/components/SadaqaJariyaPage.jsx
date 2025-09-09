import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient'; 
import styles from './SadaqaJariya.module.css';

const SadaqaJariyaPage = () => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // <<-- متغير جديد لرسالة الخطأ
  const [newName, setNewName] = useState('');
  const [newDua, setNewDua] = useState('');

  const fetchPrayers = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    const { data, error } = await supabase
      .from('prayers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // =================================================================
      // === أهم تغيير: سنعرض رسالة الخطأ الحقيقية من Supabase ===
      // =================================================================
      console.error('Supabase fetch error:', error);
      setErrorMessage(`خطأ من قاعدة البيانات: ${error.message}`); // <<-- هذا هو التغيير الأهم
    } else {
      setPrayers(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  // ... (باقي الكود لم يتغير)
  const handleAddPrayer = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDua.trim()) return;
    const { error } = await supabase.from('prayers').insert([{ name: newName, dua: newDua, likes: 0 }]);
    if (error) {
      alert(`فشل الإضافة: ${error.message}`);
    } else {
      setNewName('');
      setNewDua('');
      await fetchPrayers(); 
    }
  };

  const handleLike = async (id, currentLikes) => {
    const newLikes = (currentLikes || 0) + 1;
    setPrayers(prayers.map(p => p.id === id ? { ...p, likes: newLikes } : p));
    const { error } = await supabase.from('prayers').update({ likes: newLikes }).eq('id', id);
    if (error) {
      alert(`فشل التحديث: ${error.message}`);
      setPrayers(prayers.map(p => p.id === id ? { ...p, likes: currentLikes } : p));
    }
  };

  return (
    <div className={styles.sadaqaContainer}>
      <h1 className={styles.pageTitle}>صدقة جارية من الدعاء</h1>
      <form className={styles.addForm} onSubmit={handleAddPrayer}>
        <h3>أضف اسمًا ليصل إليه دعاؤنا</h3>
        <input type="text" placeholder="اكتب الاسم هنا" className={styles.inputField} value={newName} onChange={(e) => setNewName(e.target.value)} />
        <textarea placeholder="اكتب الدعاء المستحب" className={styles.textareaField} value={newDua} onChange={(e) => setNewDua(e.target.value)}></textarea>
        <button type="submit" className={styles.publishButton}>نشر</button>
      </form>

      <div className={styles.prayersList}>
        {loading && <p>جاري تحميل البيانات...</p>}
            
        {/* === عرض رسالة الخطأ الحقيقية هنا === */}
        {errorMessage && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{errorMessage}</p>}
            
        {!loading && !errorMessage && (
          prayers.length > 0 ? (
            prayers.map(prayer => (
              <div key={prayer.id} className={styles.prayerCard}>
                {/* ... */}
                <div className={styles.prayerInfo}>
                  <h4 className={styles.prayerName}>{prayer.name}</h4>
                  <p className={styles.prayerDua}>"{prayer.dua}"</p>
                  <p className={styles.prayerDate}>أضيف بتاريخ: {new Date(prayer.created_at).toLocaleDateString('ar-EG')}</p>
                </div>
                <div className={styles.likeSection} onClick={() => handleLike(prayer.id, prayer.likes)}>
                  <span className={styles.heartIcon}>❤️</span>
                  <span className={styles.likeCount}>{prayer.likes || 0}</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>لا توجد أسماء مضافة حاليًا.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SadaqaJariyaPage;
