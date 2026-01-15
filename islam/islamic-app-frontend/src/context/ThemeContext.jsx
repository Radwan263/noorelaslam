import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // بنشوف لو المستخدم كان مختار وضع قبل كده، لو لا بنخليه 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'light');

  useEffect(() => {
    // 1. حفظ الاختيار في ذاكرة الموبايل
    localStorage.setItem('appTheme', theme);
    // 2. تغيير الكلاس بتاع الصفحة كلها (body)
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
