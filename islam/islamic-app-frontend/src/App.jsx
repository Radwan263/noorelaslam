// ... (باقي الاستيرادات)
import DuasCategoriesPage from './components/DuasCategoriesPage'; // إضافة جديدة
import DuasPage from './components/DuasPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* ... (باقي المسارات) */}
        <Route path="/duas" element={<DuasCategoriesPage />} /> {/* تعديل */}
        <Route path="/duas/:categoryId" element={<DuasPage />} /> {/* تعديل */}
        {/* ... (باقي المسارات) */}
      </Routes>
    </Router>
  );
}

export default App;
