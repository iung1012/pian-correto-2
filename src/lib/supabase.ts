import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
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
