// 👇 1. استيراد المكتبة (ده أهم سطر كان ناقص)
import { createClient } from '@supabase/supabase-js';

// 2. قراءة المفاتيح من ملف البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 👇 3. إنشاء الاتصال (بدون كلمة window)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
