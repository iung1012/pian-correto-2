/*
  # Create Admin Users System

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `full_name` (text)
      - `created_at` (timestamptz, default now())
      - `last_login` (timestamptz)
  
  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated admin users to read their own data
    - Add policy for authenticated admin users to update their last_login
  
  3. Important Notes
    - This table works with Supabase Auth's built-in auth.users table
    - Admin users must be created through Supabase Auth signup
    - Only users with records in this table can access admin features
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Admin users can read their own data
CREATE POLICY "Admin users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Admin users can update their own last_login
CREATE POLICY "Admin users can update own last_login"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
