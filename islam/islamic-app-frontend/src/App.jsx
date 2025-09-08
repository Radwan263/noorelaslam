// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuranSection from './components/QuranSection'; // اسم المكون الخاص بك

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* عندما يكون الرابط هو الصفحة الرئيسية، اعرض HomePage */}
        <Route path="/" element={<HomePage />} />
            
        {/* عندما يكون الرابط هو /quran، اعرض QuranSection */}
        <Route path="/quran" element={<QuranSection />} />
      </Routes>
    </div>
  );
}

export default App;
