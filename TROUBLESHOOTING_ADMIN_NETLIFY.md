# 🔧 Troubleshooting: Admin não funciona no Netlify

## ⚠️ Problema Principal

O sistema de admin usa **SQLite** com Prisma, que **NÃO funciona bem em ambiente serverless** do Netlify.

### Por que não funciona?

1. **Sistema de arquivos efêmero**: Cada invocação de function pode ter um sistema de arquivos diferente
2. **Banco não persistente**: O arquivo SQLite não persiste entre invocações
3. **Localização do banco**: O Prisma precisa encontrar o arquivo `dev.db` no caminho correto

## 🔍 Como Diagnosticar

### 1. Verificar Logs no Netlify

1. Acesse o painel do Netlify
2. Vá em **Functions** > **admin-login**
3. Veja os logs de erro

Erros comuns:
- `Cannot find module` ou `ENOENT` - banco não encontrado
- `SQLITE_BUSY` - banco não acessível
- `PrismaClientInitializationError` - erro de conexão

### 2. Testar a Function Diretamente

Acesse: `https://seu-site.netlify.app/.netlify/functions/admin-login`

Deve retornar um erro ou resposta JSON (não HTML).

## ✅ Soluções

### Solução 1: Migrar para PostgreSQL (RECOMENDADO)

O projeto já usa Supabase, então podemos usar o PostgreSQL do Supabase:

#### Passo 1: Atualizar Schema do Prisma

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Passo 2: Criar Tabelas no Supabase

Execute este SQL no Supabase SQL Editor:

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

-- Tabelas de opções de produtos
CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_types (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_classifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_lines (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Passo 3: Configurar DATABASE_URL no Netlify

No painel do Netlify (Site settings > Environment variables):

```
DATABASE_URL=postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres
```

**Como obter a URL:**
1. Acesse o Supabase Dashboard
2. Vá em **Settings** > **Database**
3. Copie a **Connection string** (URI)
4. Substitua `[YOUR-PASSWORD]` pela senha do banco

#### Passo 4: Criar Usuário Admin

Execute no Supabase SQL Editor:

```sql
-- Criar usuário admin (senha: admin123 - hash bcrypt)
INSERT INTO admin_users (email, password, full_name)
VALUES (
  'admin@pian.com.br',
  '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq',
  'Administrador'
);
```

**Para gerar hash da senha:**
```bash
npm run seed-admin
# Isso criará o hash correto
```

### Solução 2: Usar Netlify Blob Store (Experimental)

Armazenar o banco SQLite no Netlify Blob Store:

1. Instalar `@netlify/blobs`
2. Fazer upload/download do banco no Blob Store
3. Modificar as functions para usar o Blob Store

**Nota**: Esta solução é mais complexa e experimental.

### Solução 3: Hospedar Servidor Separadamente

Manter o servidor Express em outro serviço (Railway, Render, Fly.io):

1. Hospedar `server/index.ts` em outro serviço
2. Configurar `VITE_API_URL` no Netlify apontando para esse serviço
3. Manter SQLite no servidor externo

## 🚀 Implementação Rápida (PostgreSQL)

Vou criar um script para facilitar a migração. Quer que eu implemente?

## 📋 Checklist

- [ ] Verificar logs no Netlify
- [ ] Decidir qual solução usar
- [ ] Se PostgreSQL: configurar DATABASE_URL
- [ ] Se PostgreSQL: criar tabelas no Supabase
- [ ] Se PostgreSQL: criar usuário admin
- [ ] Testar login no site

## 🔗 Links Úteis

- [Supabase Database](https://supabase.com/docs/guides/database)
- [Prisma PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Netlify Functions Logs](https://docs.netlify.com/functions/logs/)

