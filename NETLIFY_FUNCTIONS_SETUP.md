# 🚀 Configuração de Netlify Functions

Este projeto foi configurado para usar **Netlify Functions** ao invés de um servidor Express tradicional.

## 📁 Estrutura

```
netlify/
└── functions/
    ├── _helpers.ts           # Helpers para CORS e respostas
    ├── admin-login.ts        # POST /api/admin/login
    ├── admin-check.ts        # GET /api/admin/check/:userId
    └── product-options.ts    # CRUD /api/product-options/:type
```

## ⚠️ IMPORTANTE: Banco de Dados SQLite

O projeto usa **SQLite** com Prisma, que pode ter limitações em ambiente serverless:

### Problema
- Cada invocação de function no Netlify pode ter um sistema de arquivos diferente
- O banco SQLite precisa estar acessível e persistente
- Arquivos locais podem não persistir entre invocações

### Soluções Recomendadas

#### Opção 1: Migrar para PostgreSQL (Recomendado)
Use o Supabase PostgreSQL que já está configurado no projeto:

1. Atualizar o schema do Prisma para usar PostgreSQL
2. Configurar `DATABASE_URL` no Netlify apontando para Supabase
3. Executar migrations no Supabase

#### Opção 2: Usar Netlify Blob Store (Experimental)
Armazenar o banco SQLite no Netlify Blob Store (requer configuração adicional).

#### Opção 3: Usar Serviço Externo
Hospedar o banco SQLite em um serviço externo (S3, etc.) e baixar na inicialização da function.

## 🔧 Configuração

### 1. Variáveis de Ambiente no Netlify

Configure no painel do Netlify (Site settings > Environment variables):

```env
# Supabase (já configurado)
VITE_SUPABASE_URL=https://tbvrbelxnilqncnhclie.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_aqui

# Database (se usar PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# API URL (opcional - deixe vazio para usar redirects automáticos)
VITE_API_URL=
```

### 2. Build e Deploy

O Netlify automaticamente:
- Detecta as functions em `netlify/functions/`
- Compila TypeScript para JavaScript
- Expõe as functions em `/.netlify/functions/nome-da-function`

### 3. Redirects

Os redirects estão configurados no `netlify.toml`:

- `/api/admin/login` → `/.netlify/functions/admin-login`
- `/api/admin/check/*` → `/.netlify/functions/admin-check/:splat`
- `/api/product-options/*` → `/.netlify/functions/product-options/:splat`

Isso permite que o código frontend continue usando `/api/...` e funcione tanto em desenvolvimento quanto em produção.

## 🧪 Testando Localmente

Para testar as functions localmente, use o Netlify CLI:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar servidor local
netlify dev
```

Isso iniciará:
- O frontend em `http://localhost:8888`
- As functions em `http://localhost:8888/.netlify/functions/...`

## 📝 Notas

- As functions são executadas em ambiente serverless (cold start pode ocorrer)
- Timeout padrão: 10 segundos (pode ser aumentado no `netlify.toml`)
- Memória padrão: 1024 MB (pode ser ajustada)

## 🔗 Links Úteis

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Prisma Serverless](https://www.prisma.io/docs/guides/deployment/serverless)

