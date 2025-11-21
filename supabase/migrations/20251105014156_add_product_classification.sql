/*
  # Add product classification column

  1. Changes
    - Add `classification` column to `products` table
    - Possible values: 'Super Premium', 'Premium Especial', 'Premium', 'Standard'
    - Default value: 'Standard'
*/

-- Add classification column
ALTER TABLE products ADD COLUMN IF NOT EXISTS classification text DEFAULT 'Standard';

-- Add check constraint to ensure valid values
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_classification_check;
ALTER TABLE products ADD CONSTRAINT products_classification_check 
  CHECK (classification IN ('Super Premium', 'Premium Especial', 'Premium', 'Standard'));