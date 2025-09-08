/* src/components/SurahPage.css - بناء جديد وبسيط */

.surah-display-container {
  color: white;
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Amiri', serif;
}

.surah-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #00796b;
  padding-bottom: 1rem;
}

.surah-header h1 {
  font-size: 3rem;
  margin: 0;
}

.surah-header p {
  font-size: 1.2rem;
  color: #ccc;
  margin: 0.5rem 0 0 0;
}

.ayah-container {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid #004d40;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem; /* 👇 هذا هو الفاصل بين الآيات 👇 */
}

.ayah-text {
  font-size: 1.8rem;
  line-height: 2.5; /* زيادة المسافة بين السطور لتسهيل القراءة */
  text-align: right;
}

.ayah-number {
  color: #00bfa5;
  font-size: 1.2rem;
  margin-left: 0.5rem;
}

.loading-message, .error-message {
  color: white;
  text-align: center;
  font-size: 1.5rem;
  padding: 5rem 0;
}

.back-button-surah {
  display: block;
  width: fit-content;
  margin: 2rem auto 0 auto;
  background-color: #00796b;
  color: white;
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: 'Amiri', serif;
}
