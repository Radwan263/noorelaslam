import React from 'react';
import './AuthPage.css';

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>تسجيل الدخول</h2>
        <input type="email" placeholder="البريد الإلكتروني" />
        <input type="password" placeholder="كلمة المرور" />
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">تذكرني</label>
        </div>
        <button>دخول</button>
        <p>ليس لديك حساب؟ <a href="/register">أنشئ حسابًا جديدًا</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
