/*
  # Add sort_order column to products table

  ## Overview
  Adds a custom sort order field to enable specific product ordering within categories
  as requested by the client.

  ## Changes
  1. New Column
    - `sort_order` (integer) - Custom sort position for products
    - Default value: 9999 (for products without explicit ordering)
    - Lower numbers = higher position in list

  2. Indexes
    - Add index on sort_order for efficient sorting queries
    - Composite index on (category, classification, sort_order) for optimal performance

  ## Purpose
  - Enable custom product ordering within each category
  - Maintain specific sequence as defined by business requirements
  - Support flexible reordering without code changes
  - Products with no explicit order appear last (sort_order = 9999)

  ## Product Order Mapping
  The following products will be assigned specific sort_order values:
  
  ### Prioritá Line (Super Premium)
  1. Priorita Adulto
  2. Priorita Mini Adulto
  3. Priorita Junior
  4. Priorita Mini Junior
  5. Priorita Gatos Adultos Castrados

  ### MikDog Premium Especial
  6. Mikdog Premium Especial Médio e Grande Porte
  7. Mikdog Premium Especial Pequeno Porte
  8. Mikdog Premium Especial Filhotes
  9. Mikdog Premium Especial Refeição Todo Dia

  ### MikCat Premium Especial
  10. Mikcat Premium Especial Gatos Castrados
  11. Mikcat Premium Especial Gatos Adultos
  12. Mikcat Premium Especial Gatos Filhotes

  ### MikDog Premium
  13-20. Various MikDog Premium products

  ### MikCat Premium
  21-28. Various MikCat Premium products

  ### Dog & Dogs and Cat & Cats (Premium/Standard)
  29-35. Dog & Dogs and Cat & Cats products

  ### Rookie, Tornado Lines (Standard)
  36-40. Rookie and Tornado products

  ### Other Standard Brands
  41-44. Zecão, Zequinha, Gerrys, Lili, Lupy, Zecat
*/

-- Add sort_order column with default value
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 9999;

-- Add index for efficient sorting
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order);

-- Add composite index for category-based sorting
CREATE INDEX IF NOT EXISTS idx_products_category_sort ON products(category, classification, sort_order);

-- Add check constraint to ensure valid sort order values
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_sort_order_check;
ALTER TABLE products ADD CONSTRAINT products_sort_order_check 
  CHECK (sort_order > 0);

-- Update existing products with their sort order based on the specified sequence
-- This will be refined by the classify-products script, but we set some initial values here

-- Priorita Products (Super Premium) - Order 1-5
UPDATE products SET sort_order = 1 WHERE UPPER(name) LIKE '%PRIORIT_ ADULTO%' AND UPPER(name) NOT LIKE '%MINI%' AND UPPER(name) NOT LIKE '%GATOS%';
UPDATE products SET sort_order = 2 WHERE UPPER(name) LIKE '%PRIORIT_ MINI ADULTO%';
UPDATE products SET sort_order = 3 WHERE UPPER(name) LIKE '%PRIORIT_ JUNIOR%' AND UPPER(name) NOT LIKE '%MINI%';
UPDATE products SET sort_order = 4 WHERE UPPER(name) LIKE '%PRIORIT_ MINI JUNIOR%';
UPDATE products SET sort_order = 5 WHERE UPPER(name) LIKE '%PRIORIT_%GATOS%CASTRADO%';

-- MikDog Premium Especial - Order 6-9
UPDATE products SET sort_order = 6 WHERE UPPER(name) LIKE '%MIKDOG%PREMIUM ESPECIAL%' AND UPPER(name) LIKE '%MEDIO%';
UPDATE products SET sort_order = 7 WHERE UPPER(name) LIKE '%MIKDOG%PREMIUM ESPECIAL%PEQUENO%';
UPDATE products SET sort_order = 8 WHERE UPPER(name) LIKE '%MIKDOG%PREMIUM ESPECIAL%FILHOTE%';
UPDATE products SET sort_order = 9 WHERE UPPER(name) LIKE '%MIKDOG%PREMIUM ESPECIAL%REFEIC%';

-- MikCat Premium Especial - Order 10-12
UPDATE products SET sort_order = 10 WHERE UPPER(name) LIKE '%MIKCAT%PREMIUM ESPECIAL%CASTRADO%';
UPDATE products SET sort_order = 11 WHERE UPPER(name) LIKE '%MIKCAT%PREMIUM ESPECIAL%ADULTO%' AND UPPER(name) NOT LIKE '%CASTRADO%';
UPDATE products SET sort_order = 12 WHERE UPPER(name) LIKE '%MIKCAT%PREMIUM ESPECIAL%FILHOTE%';
