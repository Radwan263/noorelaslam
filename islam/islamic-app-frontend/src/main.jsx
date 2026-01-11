import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// 👇 1. استيراد HashRouter من المكتبة
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👇 2. تغليف التطبيق بـ HashRouter عشان يشتغل على الموبايل */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
