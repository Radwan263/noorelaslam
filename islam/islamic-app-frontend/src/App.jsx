// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// لاحقًا سنضيف الصفحات الأخرى هنا
// import QuranPage from './pages/QuranPage'; 

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* المسار الرئيسي "/" سيعرض الصفحة الرئيسية */}
        <Route path="/" element={<HomePage />} />
        
        {/* لاحقًا سنضيف مسارات الصفحات الأخرى */}
        {/* <Route path="/quran" element={<QuranPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
