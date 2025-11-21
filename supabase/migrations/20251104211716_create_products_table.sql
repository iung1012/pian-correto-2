/*
  # Create products table for pet food catalog

  1. New Tables
    - `products`
      - `id` (bigint, primary key, auto-increment) - Unique identifier for each product
      - `name` (text, not null) - Product name
      - `image` (text, not null) - Product image URL
      - `description` (text, not null) - Product description
      - `category` (text, not null) - Product category (Standard, Premium, Premium Especial, Super Premium)
      - `type` (text, not null) - Animal type (Cães, Gatos, Peixes)
      - `line` (text, nullable) - Product line (Sachê, Enlatado, Snacks, etc.)
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record last update timestamp

  2. Indexes
    - Index on `category` for efficient filtering
    - Index on `type` for efficient filtering
    - Index on `name` for search functionality

  3. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anyone can view products)
    - Add policy for authenticated insert/update/delete (admin operations)

  ## Important Notes
  1. The table uses bigint for id with auto-increment for scalability
  2. All product fields are required except `line` which is optional
  3. Timestamps are automatically managed with defaults and triggers
  4. Public read access allows the website to display products without authentication
  5. Write operations require authentication for admin panel security
*/

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS products (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  line text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_products_updated_at'
  ) THEN
    CREATE TRIGGER update_products_updated_at
      BEFORE UPDATE ON products
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);