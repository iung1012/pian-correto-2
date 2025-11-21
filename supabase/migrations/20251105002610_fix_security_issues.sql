/*
  # Fix Security and Performance Issues

  ## Changes Made
  
  1. **RLS Policy Optimization**
     - Updated `Admin users can read own data` policy to use `(select auth.uid())` for better performance
     - Updated `Admin users can update own last_login` policy to use `(select auth.uid())` for better performance
  
  2. **Remove Unused Indexes**
     - Dropped `idx_products_category` (unused index on products table)
     - Dropped `idx_products_type` (unused index on products table)
     - Dropped `idx_admin_users_email` (duplicate of unique constraint)
  
  3. **Function Security**
     - Updated `update_updated_at_column` function with immutable search_path for security
*/

-- 1. Fix RLS policies to use subquery for better performance
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

-- 2. Drop unused indexes
DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_type;
DROP INDEX IF EXISTS idx_admin_users_email;

-- 3. Fix function search path vulnerability
-- Drop existing functions first
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Recreate with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Recreate trigger if it was dropped
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_products_updated_at'
    ) THEN
        CREATE TRIGGER update_products_updated_at
            BEFORE UPDATE ON products
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;