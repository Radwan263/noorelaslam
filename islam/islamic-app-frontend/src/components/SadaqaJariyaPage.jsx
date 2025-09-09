import React, { useState, useEffect } from 'react';
import styles from './SadaqaJariya.module.css';

const SadaqaJariyaPage = () => {
  // البيانات الأولية ستكون فارغة في البداية، ثم نملؤها
  const [prayers, setPrayers] = useState([]);
  
  // استخدام useEffect لمحاكاة تحميل البيانات عند فتح الصفحة لأول مرة
  useEffect(() => {
    // بيانات وهمية مؤقتة. في المستقبل، ستأتي هذه من قاعدة البيانات
    const initialData = [
      { id: 1, name: 'فلان الفلاني', status: 'هو', dua: 'اللهم اغفر له وارحمه', likes: 120, date: '2024-05-10' },
      { id: 2, name: 'فلانة الفلانية', status: 'هي', dua: 'اللهم اجعل قبرها روضة من رياض الجنة', likes: 250, date: '2024-05-09' },
    ];
    setPrayers(initialData);
  }, []); // القوس الفارغ يعني أن هذا التأثير سيعمل مرة واحدة فقط عند تحميل المكون

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
      date: new Date().toISOString().split('T')[0] // إضافة تاريخ اليوم
    };
    setPrayers([newPrayer, ...prayers]);
    setNewName('');
    setNewDua('');
  };

  const handleLike = (id) => {
    setPrayers(prayers.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  return (
    <div className={styles.sadaqaContainer}>
      <h1 className={styles.pageTitle}>صدقة جارية من الدعاء</h1>
      <p className={styles.pageDescription}>
        "إِذَا مَاتَ ابْنُ آدَمَ انْقَطَعَ عَمَلُهُ إِلا مِنْ ثَلاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ"
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
          placeholder="اكتب الدعاء المستحب (مثال: اللهم اغفر له وارحمه)" 
          className={styles.textareaField}
          value={newDua}
          onChange={(e) => setNewDua(e.target.value)}
        ></textarea>
        <button type="submit" className={styles.publishButton}>نشر</button>
      </form>

      {/* --- التحقق المهم هنا --- */}
      <div className={styles.prayersList}>
        {prayers.length > 0 ? (
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
          // رسالة تظهر في حالة عدم وجود أي أسماء
          <div className={styles.emptyState}>
            <p>لا توجد أسماء مضافة حاليًا. كن أول من يضيف اسمًا للدعاء له.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SadaqaJariyaPage;
