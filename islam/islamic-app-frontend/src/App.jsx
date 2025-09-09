import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// استيراد مكون صفحة صدقة جارية فقط
import SadaqaJariyaPage from './components/SadaqaJariyaPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 
          هذا الكود يجعل صفحة "صدقة جارية" هي الصفحة الرئيسية للتطبيق مؤقتًا.
          عندما تفتح التطبيق، ستظهر هذه الصفحة مباشرة.
        */}
        <Route path="/" element={<SadaqaJariyaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
