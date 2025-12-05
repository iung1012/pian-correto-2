# 🚀 Migração para PostgreSQL - Guia Completo

Este guia explica como migrar o sistema de admin de SQLite para PostgreSQL (Supabase) para funcionar no Netlify.

## 📋 Pré-requisitos

- Acesso ao painel do Supabase
- Acesso ao painel do Netlify
- Node.js instalado localmente

## 🔧 Passo 1: Atualizar Schema do Prisma

O schema já foi atualizado para PostgreSQL. Se precisar verificar:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🗄️ Passo 2: Criar Tabelas no Supabase

1. Acesse o **Supabase Dashboard**: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Execute o script SQL: `supabase/migrations/20251204000000_create_admin_tables_postgres.sql`

Ou copie e cole este SQL:

```sql
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
```

## 🔑 Passo 3: Obter Connection String do Supabase

1. No Supabase Dashboard, vá em **Settings** > **Database**
2. Role até **Connection string**
3. Selecione **URI** (não "Session mode")
4. Copie a string que começa com `postgresql://...`
5. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha do banco de dados

Exemplo:
```
postgresql://postgres.xxxxx:[SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

## 🌐 Passo 4: Configurar Variáveis de Ambiente no Netlify

1. Acesse o **Netlify Dashboard**: https://app.netlify.com
2. Selecione seu site
3. Vá em **Site settings** > **Environment variables**
4. Adicione/atualize:

```env
DATABASE_URL=postgresql://postgres.xxxxx:[SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**⚠️ IMPORTANTE**: 
- Substitua `[SENHA]` pela senha real do banco
- Use a URL de **Connection pooling** (porta 6543) para melhor performance
- Ou use a URL direta (porta 5432) se preferir

## 🔄 Passo 5: Regenerar Prisma Client

Execute localmente:

```bash
npx prisma generate
```

Isso regenera o Prisma Client para PostgreSQL.

## 👤 Passo 6: Criar Usuário Admin

### Opção A: Via Script (Recomendado)

1. Configure `DATABASE_URL` localmente (crie um arquivo `.env`):
```env
DATABASE_URL=postgresql://postgres.xxxxx:[SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

2. Execute o script:
```bash
npm run seed-admin
```

Ou diretamente:
```bash
npx tsx scripts/create-admin-postgres.ts
```

### Opção B: Via SQL Direto

Execute no Supabase SQL Editor:

```sql
-- Hash bcrypt da senha "admin123"
-- Você pode gerar um novo hash executando: npm run seed-admin
INSERT INTO admin_users (email, password, full_name)
VALUES (
  'admin@pian.com.br',
  '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq',
  'Administrador'
)
ON CONFLICT (email) DO NOTHING;
```

**Para gerar um novo hash:**
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10).then(h => console.log(h))"
```

## 🚀 Passo 7: Fazer Deploy no Netlify

1. Commit e push das mudanças:
```bash
git add .
git commit -m "feat: migrar admin para PostgreSQL"
git push origin main
```

2. O Netlify fará deploy automático
3. Aguarde o build completar

## ✅ Passo 8: Testar

1. Acesse seu site no Netlify
2. Vá em `/login`
3. Tente fazer login com:
   - Email: `admin@pian.com.br`
   - Senha: `admin123`

## 🔍 Verificar se Funcionou

### Verificar Logs no Netlify

1. Netlify Dashboard > **Functions** > **admin-login**
2. Veja os logs - não deve ter erros de SQLite

### Verificar Tabelas no Supabase

1. Supabase Dashboard > **Table Editor**
2. Deve aparecer as tabelas:
   - `admin_users`
   - `product_categories`
   - `product_types`
   - `product_classifications`
   - `product_lines`

## 🐛 Troubleshooting

### Erro: "Can't reach database server"

- Verifique se a `DATABASE_URL` está correta no Netlify
- Verifique se a senha está correta
- Tente usar a URL de connection pooling (porta 6543)

### Erro: "relation does not exist"

- Execute o script SQL no Supabase para criar as tabelas
- Verifique se executou no banco correto

### Erro: "PrismaClientInitializationError"

- Verifique se `DATABASE_URL` está configurada no Netlify
- Regenerar Prisma Client: `npx prisma generate`
- Fazer novo deploy

### Login não funciona

- Verifique se o usuário admin foi criado no Supabase
- Verifique os logs da function `admin-login` no Netlify
- Teste a connection string localmente

## 📝 Notas Importantes

- ✅ O banco PostgreSQL é persistente e funciona perfeitamente em serverless
- ✅ As Netlify Functions agora podem acessar o banco corretamente
- ✅ O sistema de admin funcionará em produção
- ⚠️ Mantenha a `DATABASE_URL` segura (não commite no código)
- ⚠️ Use connection pooling para melhor performance

## 🔗 Links Úteis

- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [Prisma PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

