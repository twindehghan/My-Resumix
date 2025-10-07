import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing. Please check your .env file. The app will proceed with mock data, but authentication will not work.");
}

// We export the client even if the keys are missing, 
// so the app doesn't crash. AuthProvider will handle the disabled state.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
