# 🔐 Sistema de Autenticação Admin com Prisma + SQLite

## ✅ Configuração Completa

O sistema de autenticação admin agora usa **Prisma + SQLite** ao invés do Supabase Auth, mantendo o Supabase apenas para produtos.

## 🚀 Como Usar

### 1. Iniciar o Servidor de Desenvolvimento

Para rodar o front-end e a API juntos:

```bash
npm run dev:all
```

Isso inicia:
- **API Admin** em `http://localhost:3001`
- **Front-end** em `http://localhost:5173`

### 2. Ou iniciar separadamente

**Terminal 1 - API:**
```bash
npm run dev:server
```

**Terminal 2 - Front-end:**
```bash
npm run dev
```

## 👤 Credenciais de Teste

Após executar `npm run seed-admin`, você terá:

- **Email**: `admin@pian.com.br`
- **Senha**: `admin123`

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

## 📁 Estrutura

```
├── prisma/
│   ├── schema.prisma          # Schema do banco SQLite
│   ├── dev.db                 # Banco de dados SQLite
│   └── migrations/            # Migrações do Prisma
├── server/
│   └── index.ts               # API Express para autenticação
├── src/
│   ├── lib/
│   │   ├── prisma.ts          # Cliente Prisma
│   │   ├── admin-auth.ts      # Funções de autenticação (server-side)
│   │   └── admin-api.ts       # Cliente API (client-side)
│   └── contexts/
│       └── AuthContext.tsx    # Context de autenticação
└── scripts/
    └── seed-admin.ts          # Script para criar usuário admin
```

## 🔧 Comandos Disponíveis

```bash
# Criar usuário admin
npm run seed-admin

# Rodar API + Front-end juntos
npm run dev:all

# Apenas API
npm run dev:server

# Apenas Front-end
npm run dev
```

## 🔒 Segurança

- ✅ Senhas são hasheadas com `bcryptjs`
- ✅ Validação no servidor (API Express)
- ✅ Sessão armazenada no `localStorage`
- ✅ Verificação de status admin em cada requisição

## 📝 Criar Novo Usuário Admin

Execute o script de seed:

```bash
npm run seed-admin
```

Ou edite `scripts/seed-admin.ts` para criar usuários personalizados.

## 🐛 Troubleshooting

### Erro: "Erro de conexão. Verifique se o servidor está rodando."

**Solução**: Certifique-se de que a API está rodando:
```bash
npm run dev:server
```

### Erro: "Unable to open the database file"

**Solução**: Execute a migration:
```bash
npx prisma migrate dev
```

### Erro: "Email ou senha incorretos"

**Solução**: Verifique se o usuário foi criado:
```bash
npm run seed-admin
```

## 📊 Banco de Dados

O banco SQLite está localizado em `prisma/dev.db`.

Para visualizar os dados:
```bash
npx prisma studio
```

Isso abrirá o Prisma Studio em `http://localhost:5555`.

