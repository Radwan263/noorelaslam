import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // تأكد من استخدام .jsx
import './index.css';     // ملف الأنماط العام

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
