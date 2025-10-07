import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// A factory for a mock client to prevent the app from crashing when Supabase is not configured.
const createMockClient = (errorMessage: string): SupabaseClient => {
  console.warn(errorMessage);

  const genericError = { name: 'AuthError', message: errorMessage };

  const mockAuth = {
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Immediately inform listeners that there is no session.
      callback('INITIAL_SESSION', null);
      return {
        data: { subscription: { unsubscribe: () => {} } },
      };
    },
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { session: null, user: null }, error: genericError }),
    signUp: () => Promise.resolve({ data: { session: null, user: null }, error: genericError }),
    signInWithOAuth: () => Promise.resolve({ data: { provider: 'google', url: '#' }, error: genericError }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ data: {}, error: genericError }),
  };

  return {
    auth: mockAuth,
    from: (table: string) => ({
        select: () => Promise.resolve({ data: [], error: { message: `Supabase not configured. Cannot query ${table}.` } }),
        insert: () => Promise.resolve({ data: [], error: { message: `Supabase not configured. Cannot insert into ${table}.` } }),
        update: () => Promise.resolve({ data: [], error: { message: `Supabase not configured. Cannot update ${table}.` } }),
        delete: () => Promise.resolve({ data: [], error: { message: `Supabase not configured. Cannot delete from ${table}.` } }),
    }),
  } as any; // Using 'as any' because the mock doesn't fully implement SupabaseClient
};


let supabaseInstance: SupabaseClient;

if (supabaseUrl && typeof supabaseUrl === 'string' && supabaseUrl.startsWith('http') && supabaseAnonKey && typeof supabaseAnonKey === 'string') {
    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (error: any) {
        const message = `Error initializing Supabase client: ${error.message}. Please check your VITE_SUPABASE_URL in the .env file.`;
        supabaseInstance = createMockClient(message);
    }
} else {
    const message = "Supabase environment variables are missing or invalid. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly in your .env file.";
    supabaseInstance = createMockClient(message);
}

export const supabase = supabaseInstance;
