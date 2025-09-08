import React from 'react';
import './AuthPage.css';

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>إنشاء حساب جديد</h2>
        <input type="text" placeholder="اسم المستخدم" />
        <input type="email" placeholder="البريد الإلكتروني" />
        <input type="password" placeholder="كلمة المرور" />
        <button>إنشاء حساب</button>
        <p>لديك حساب بالفعل؟ <a href="/login">سجل الدخول</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
