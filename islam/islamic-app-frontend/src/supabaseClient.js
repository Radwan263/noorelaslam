import { createClient } from '@supabase/supabase-js';

// 👇 رابط مشروعك
const supabaseUrl = "https://zovuyfpudtjvzrzphjap.supabase.co";

// 👇 مفتاح الاتصال (Anon Key)
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdnV5ZnB1ZHRqdnpyenBoamFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODU3OTIsImV4cCI6MjA3Mjk2MTc5Mn0.VYpK6-CPtm7AuKVI0hiU_VBile1xnrHufZFiVcMr2i4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
