import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tbvrbelxnilqncnhclie.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidnJiZWx4bmlscW5jbmhjbGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODM4NTksImV4cCI6MjA3Nzg1OTg1OX0.ckK0RNA9RtghSgNgnUF8KaXmVN_rNdtmocbV8VI_4t0';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Missing Supabase environment variables. Using fallback values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  type: string;
  line?: string;
  classification?: string;
  display_priority?: number;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductInsert {
  name: string;
  image: string;
  description: string;
  category: string;
  type: string;
  line?: string;
  classification?: string;
  display_priority?: number;
  sort_order?: number;
}

export interface ProductUpdate extends Partial<ProductInsert> {}
