import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient'; 
import styles from './SadaqaJariya.module.css';

const SadaqaJariyaPage = () => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // حالة جديدة لتتبع الأخطاء
  const [newName, setNewName] = useState('');
  const [newDua, setNewDua] = useState('');

  // --- سنستخدم useCallback لجعل الدالة أكثر استقرارًا ---
  const fetchPrayers = useCallback(async () => {
    setLoading(true);
    setError(null); // إعادة تعيين الخطأ عند كل محاولة جلب

    const { data, error: fetchError } = await supabase
      .from('prayers')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      setError('فشل في تحميل البيانات من قاعدة البيانات. يرجى المحاولة مرة أخرى.');
    } else {
      setPrayers(data || []); // التأكد من أن الحالة لا تكون null
    }
    setLoading(false);
  }, []);

  // --- جلب البيانات عند تحميل المكون لأول مرة ---
  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  // --- إضافة دعاء جديد ---
  const handleAddPrayer = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDua.trim()) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const { error: insertError } = await supabase
      .from('prayers')
      .insert([{ name: newName, dua: newDua, likes: 0 }]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      alert('حدث خطأ أثناء إضافة الدعاء.');
    } else {
      // بعد الإضافة الناجحة، قم بجلب القائمة المحدثة بالكامل من قاعدة البيانات
      // هذا أضمن من تحديث الحالة محليًا
      setNewName('');
      setNewDua('');
      await fetchPrayers(); 
    }
  };

  // --- تحديث عدد القلوب ---
  const handleLike = async (id, currentLikes) => {
    const newLikes = (currentLikes || 0) + 1;
    
    // تحديث الحالة محليًا فورًا لتجربة مستخدم أفضل
    setPrayers(prayers.map(p => 
      p.id === id ? { ...p, likes: newLikes } : p
    ));

    // ثم إرسال التحديث إلى قاعدة البيانات في الخلفية
    const { error: updateError } = await supabase
      .from('prayers')
      .update({ likes: newLikes })
      .eq('id', id);

    if (updateError) {
      console.error('Supabase like error:', updateError);
      // إذا فشل التحديث، أعد الحالة إلى ما كانت عليه
      setPrayers(prayers.map(p => 
        p.id === id ? { ...p, likes: currentLikes } : p
      ));
      alert('فشل تحديث عدد القلوب.');
    }
  };

  // --- عرض واجهة المستخدم ---
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          prayers.length > 0 ? (
            prayers.map(prayer => (
              <div key={prayer.id} className={styles.prayerCard}>
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
              <p>لا توجد أسماء مضافة حاليًا. كن أول من يضيف اسمًا للدعاء له.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SadaqaJariyaPage;
