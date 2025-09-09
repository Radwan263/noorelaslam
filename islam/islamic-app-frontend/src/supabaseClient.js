// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// قراءة المتغيرات الآمنة من ملف .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// إنشاء الاتصال باستخدام المتغيرات الآمنة
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
