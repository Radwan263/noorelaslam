import React, { useState } from 'react';
import styles from './SadaqaJariya.module.css'; // سننشئ هذا الملف بعد قليل

const SadaqaJariyaPage = () => {
  // بيانات وهمية مؤقتة. لاحقًا، ستأتي هذه من قاعدة البيانات
  const [prayers, setPrayers] = useState([
    { id: 1, name: 'فلان الفلاني', status: 'هو', dua: 'اللهم اغفر له وارحمه', likes: 120 },
    { id: 2, name: 'فلانة الفلانية', status: 'هي', dua: 'اللهم اجعل قبرها روضة من رياض الجنة', likes: 250 },
  ]);

  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState('هو');
  const [newDua, setNewDua] = useState('');

  // دالة لإضافة اسم جديد
  const handleAddPrayer = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDua.trim()) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    const newPrayer = {
      id: Date.now(), // استخدام الوقت الحالي كمعرف فريد مؤقت
      name: newName,
      status: newStatus,
      dua: newDua,
      likes: 0,
    };
    setPrayers([newPrayer, ...prayers]); // إضافة الاسم الجديد في بداية القائمة
    // تفريغ الحقول
    setNewName('');
    setNewDua('');
  };

  // دالة لزيادة عدد القلوب (الدعوات)
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

      {/* نموذج الإضافة */}
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

      {/* قائمة الأسماء */}
      <div className={styles.prayersList}>
        {prayers.map(prayer => (
          <div key={prayer.id} className={styles.prayerCard}>
            <div className={styles.prayerInfo}>
              <h4 className={styles.prayerName}>{prayer.name}</h4>
              <p className={styles.prayerDua}>"{prayer.dua}"</p>
            </div>
            <div className={styles.likeSection} onClick={() => handleLike(prayer.id)}>
              <span className={styles.heartIcon}>❤️</span>
              <span className={styles.likeCount}>{prayer.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SadaqaJariyaPage;
