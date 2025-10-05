import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TimeCapsule {
  id: string;
  message: string;
  file_url: string | null;
  file_type: string | null;
  delivery_method: 'email' | 'sms';
  delivery_target: string;
  unlock_date: string;
  is_delivered: boolean;
  created_at: string;
  delivered_at: string | null;
}
