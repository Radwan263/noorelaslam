// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuranSection from './components/QuranSection';

function App() {
  return (
    // السطر الذي سنقوم بتعديله
    <div className="min-h-screen bg-black bg-opacity-25">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<QuranSection />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
