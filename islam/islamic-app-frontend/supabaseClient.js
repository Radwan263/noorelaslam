// 👇 استيراد الدالة من المكتبة اللي سطبناها (بدل window.supabase)
import { createClient } from '@supabase/supabase-js';

// قراءة المتغيرات من ملف .env (زي ما هي)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 👇 إنشاء الاتصال بالطريقة الصحيحة
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
