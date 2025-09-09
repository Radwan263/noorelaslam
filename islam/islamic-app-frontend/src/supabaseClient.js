// src/supabaseClient.js

// ملاحظة: لقد قمنا بإزالة سطر "import { createClient } from '@supabase/supabase-js'"
// لأنه كان يسبب فشل البناء على Netlify.

// الخطوة 1: قراءة المتغيرات الآمنة التي أضفتها في إعدادات Netlify
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// الخطوة 2: إنشاء الاتصال باستخدام مكتبة Supabase التي تم تحميلها في index.html
// نحن نصل إليها عبر "window.supabase"
export const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
