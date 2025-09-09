import React, { useState, useEffect } from 'react';
import styles from './SadaqaJariya.module.css';

// بيانات وهمية للبدء بها
const initialData = [
  { id: 1, name: 'فلان الفلاني', status: 'هو', dua: 'اللهم اغفر له وارحمه', likes: 120, date: '2024-05-10' },
  { id: 2, name: 'فلانة الفلانية', status: 'هي', dua: 'اللهم اجعل قبرها روضة من رياض الجنة', likes: 250, date: '2024-05-09' },
];

const SadaqaJariyaPage = () => {
  // استخدام البيانات الأولية مباشرة لتجنب أي مشاكل مع useEffect
  const [prayers, setPrayers] = useState(initialData);
  
  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState('هو');
  const [newDua, setNewDua] = useState('');

  const handleAddPrayer = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDua.trim()) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    const newPrayer = {
      id: Date.now(),
      name: newName,
      status: newStatus,
      dua: newDua,
      likes: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setPrayers(prevPrayers => [newPrayer, ...prevPrayers]);
    setNewName('');
    setNewDua('');
  };

  const handleLike = (id) => {
    setPrayers(prevPrayers => 
      prevPrayers.map(p => 
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  // التحقق من أن الأنماط تم استيرادها
  if (!styles) {
    return <div>Error: CSS Module not loaded.</div>;
  }

  return (
    <div className={styles.sadaqaContainer}>
      <h1 className={styles.pageTitle}>صدقة جارية من الدعاء</h1>
      <p className={styles.pageDescription}>
        "إِذَا مَاتَ ابْنُ آدَمَ انْقَطَعَ عَمَلُهُ إِلا مِنْ ثَلاثٍ..."
      </p>

      <form className={styles.addForm} onSubmit={handleAddPrayer}>
        <h3>أضف اسمًا ليصل إليه دعاؤنا</h3>
        <input 
          type="text" 
          placeholder="اكتب الاسم هنا" 
          className={styles.inputField}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className={styles.statusSelector}>
          <label>
            <input type="radio" name="status" value="هو" checked={newStatus === 'هو'} onChange={() => setNewStatus('هو')} /> هو
          </label>
          <label>
            <input type="radio" name="status" value="هي" checked={newStatus === 'هي'} onChange={() => setNewStatus('هي')} /> هي
          </label>
        </div>
        <textarea 
          placeholder="اكتب الدعاء المستحب" 
          className={styles.textareaField}
          value={newDua}
          onChange={(e) => setNewDua(e.target.value)}
        ></textarea>
        <button type="submit" className={styles.publishButton}>نشر</button>
      </form>

      <div className={styles.prayersList}>
        {/* التحقق من أن `prayers` هي مصفوفة قبل استخدام .map */}
        {Array.isArray(prayers) && prayers.length > 0 ? (
          prayers.map(prayer => (
            <div key={prayer.id} className={styles.prayerCard}>
              <div className={styles.prayerInfo}>
                <h4 className={styles.prayerName}>{prayer.name}</h4>
                <p className={styles.prayerDua}>"{prayer.dua}"</p>
                <p className={styles.prayerDate}>أضيف بتاريخ: {prayer.date}</p>
              </div>
              <div className={styles.likeSection} onClick={() => handleLike(prayer.id)}>
                <span className={styles.heartIcon}>❤️</span>
                <span className={styles.likeCount}>{prayer.likes}</span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>لا توجد أسماء مضافة حاليًا. كن أول من يضيف اسمًا للدعاء له.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SadaqaJariyaPage;
