/*
  # Fix Security Issues

  ## Changes Made
  
  1. **RLS Policy Optimization**
     - Updated `Admin users can read own data` policy to use `(select auth.uid())` instead of `auth.uid()`
     - Updated `Admin users can update own last_login` policy to use `(select auth.uid())` instead of `auth.uid()`
     - This prevents re-evaluation of auth.uid() for each row, improving performance at scale
  
  2. **Remove Unused Indexes**
     - Dropped `idx_products_category` (unused index)
     - Dropped `idx_products_type` (unused index)
     - Dropped `idx_admin_users_email` (redundant - unique constraint already exists)
  
  3. **Fix Function Search Path**
     - Updated `update_updated_at_column` function to use immutable search_path
     - Added `SET search_path = ''` to prevent search path manipulation attacks
*/

-- Fix RLS policies for admin_users table
DROP POLICY IF EXISTS "Admin users can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update own last_login" ON admin_users;

CREATE POLICY "Admin users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Admin users can update own last_login"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Remove unused indexes
DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_type;
DROP INDEX IF EXISTS idx_admin_users_email;

-- Fix function search path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;