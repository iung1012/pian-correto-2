/*
  # Add display_priority column to products table

  1. Changes
    - Add `display_priority` column to `products` table
    - Default value: 2 (normal priority)
    - Lower numbers = higher priority (1 = highest priority for MikCat/MikDog)
    - Add index on display_priority for efficient sorting

  2. Data Updates
    - Set display_priority to 1 for all MikCat and MikDog products
    - All other products remain at default priority of 2

  3. Purpose
    - Enable MikCat and MikDog products to appear first in product listings
    - Maintain flexibility for future priority adjustments
    - Improve user experience by highlighting flagship brands
*/

-- Add display_priority column with default value
ALTER TABLE products ADD COLUMN IF NOT EXISTS display_priority integer DEFAULT 2;

-- Add index for efficient sorting
CREATE INDEX IF NOT EXISTS idx_products_display_priority ON products(display_priority);

-- Update MikCat products to priority 1
UPDATE products 
SET display_priority = 1 
WHERE UPPER(name) LIKE '%MIKCAT%';

-- Update MikDog products to priority 1
UPDATE products 
SET display_priority = 1 
WHERE UPPER(name) LIKE '%MIKDOG%';

-- Add check constraint to ensure valid priority values
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_display_priority_check;
ALTER TABLE products ADD CONSTRAINT products_display_priority_check 
  CHECK (display_priority > 0);