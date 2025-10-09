import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  console.error('Expected: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  console.error('Current values:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing'
  });
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

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
