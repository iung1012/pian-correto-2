-- Migração para PostgreSQL: Tabelas de Admin e Opções de Produtos
-- Execute este SQL no Supabase SQL Editor

-- Tabela de usuários admin
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Tabela de categorias de produtos
CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de tipos de produtos
CREATE TABLE IF NOT EXISTS product_types (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de classificações de produtos
CREATE TABLE IF NOT EXISTS product_classifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de linhas de produtos
CREATE TABLE IF NOT EXISTS product_lines (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_product_categories_sort ON product_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_product_types_sort ON product_types(sort_order);
CREATE INDEX IF NOT EXISTS idx_product_classifications_sort ON product_classifications(sort_order);
CREATE INDEX IF NOT EXISTS idx_product_lines_sort ON product_lines(sort_order);

-- Comentários nas tabelas
COMMENT ON TABLE admin_users IS 'Usuários administradores do sistema';
COMMENT ON TABLE product_categories IS 'Categorias de produtos (ex: Cachorros, Gatos)';
COMMENT ON TABLE product_types IS 'Tipos de produtos (ex: Ração Seca, Ração Úmida)';
COMMENT ON TABLE product_classifications IS 'Classificações de produtos (ex: Premium, Super Premium)';
COMMENT ON TABLE product_lines IS 'Linhas de produtos (ex: MikDog, MikCat)';

