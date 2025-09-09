// src/supabaseClient.js

// هذا السطر يخبر Vite أن يقرأ المتغيرات الآمنة من ملف .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// هذا السطر ينشئ الاتصال باستخدام المكتبة التي حملناها في index.html
export const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
