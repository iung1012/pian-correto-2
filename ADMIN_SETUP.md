# 🔐 Guia de Configuração de Usuários Admin

## ✅ Verificação Rápida

Após criar um novo usuário admin, verifique se está tudo configurado corretamente:

### 1. Verificar se o usuário foi criado no Supabase Auth
- Acesse o painel do Supabase
- Vá em **Authentication → Users**
- Confirme que o usuário existe com o email correto

### 2. Verificar se o usuário está na tabela `admin_users`
Execute este SQL no **SQL Editor** do Supabase:

```sql
SELECT 
  id, 
  email, 
  full_name, 
  created_at, 
  last_login 
FROM admin_users
ORDER BY created_at DESC;
```

### 3. Testar o Login
1. Acesse a página de login: `/login`
2. Use o email e senha do usuário criado
3. Se tudo estiver correto, você será redirecionado para `/admin`

---

## 📝 Como Criar um Novo Usuário Admin

### Método 1: Via Painel do Supabase (Recomendado)

#### Passo 1: Criar usuário no Supabase Auth
1. Acesse o painel do Supabase
2. Vá em **Authentication → Users**
3. Clique em **"Add user"** ou **"Invite user"**
4. Preencha:
   - **Email**: email do administrador
   - **Password**: senha segura
   - **Auto Confirm User**: ✅ (marcar para ativar imediatamente)
5. Clique em **"Create user"**
6. **Copie o UUID do usuário** (aparece na lista de usuários)

#### Passo 2: Adicionar à tabela `admin_users`
1. No Supabase, vá em **SQL Editor**
2. Execute o seguinte SQL (substitua os valores):

```sql
INSERT INTO admin_users (id, email, full_name)
VALUES (
  'UUID_DO_USUARIO_AQUI',  -- Cole o UUID copiado no passo 1
  'email@exemplo.com',      -- Email do usuário
  'Nome do Administrador'   -- Nome completo (opcional)
);
```

### Método 2: Via SQL (Avançado)

Se você já tem o UUID do usuário, pode criar diretamente:

```sql
-- Substitua os valores abaixo
INSERT INTO admin_users (id, email, full_name)
VALUES (
  '00000000-0000-0000-0000-000000000000',  -- UUID do auth.users
  'admin@pian.com.br',                      -- Email
  'Administrador Principal'                 -- Nome
)
ON CONFLICT (id) DO NOTHING;  -- Evita erro se já existir
```

---

## 🔍 Verificar Usuários Admin Existentes

### Listar todos os admins
```sql
SELECT 
  au.id,
  au.email,
  au.full_name,
  au.created_at,
  au.last_login,
  CASE 
    WHEN au.last_login IS NULL THEN 'Nunca logou'
    ELSE 'Já logou'
  END as status
FROM admin_users au
ORDER BY au.created_at DESC;
```

### Verificar se um email específico é admin
```sql
SELECT * 
FROM admin_users 
WHERE email = 'email@exemplo.com';
```

### Ver últimos logins
```sql
SELECT 
  email,
  full_name,
  last_login,
  CASE 
    WHEN last_login > NOW() - INTERVAL '7 days' THEN 'Ativo (últimos 7 dias)'
    WHEN last_login > NOW() - INTERVAL '30 days' THEN 'Ativo (últimos 30 dias)'
    WHEN last_login IS NULL THEN 'Nunca logou'
    ELSE 'Inativo'
  END as status
FROM admin_users
ORDER BY last_login DESC NULLS LAST;
```

---

## 🗑️ Remover Acesso Admin

### Remover um usuário admin (mantém o usuário no Auth)
```sql
DELETE FROM admin_users 
WHERE email = 'email@exemplo.com';
```

### Remover e deletar o usuário completamente
1. Primeiro, remova da tabela `admin_users`:
```sql
DELETE FROM admin_users 
WHERE email = 'email@exemplo.com';
```

2. Depois, delete do Supabase Auth:
   - Vá em **Authentication → Users**
   - Encontre o usuário
   - Clique em **"Delete user"**

---

## 🔄 Atualizar Informações do Admin

### Atualizar nome
```sql
UPDATE admin_users 
SET full_name = 'Novo Nome'
WHERE email = 'email@exemplo.com';
```

### Atualizar email (se mudou no Auth também)
```sql
UPDATE admin_users 
SET email = 'novo@email.com'
WHERE email = 'email@antigo.com';
```

---

## ⚠️ Troubleshooting

### Problema: "Email ou senha incorretos"
- ✅ Verifique se o usuário existe em **Authentication → Users**
- ✅ Confirme que a senha está correta
- ✅ Verifique se o email está escrito corretamente

### Problema: Login funciona mas não acessa o painel admin
- ✅ Verifique se o usuário está na tabela `admin_users`:
```sql
SELECT * FROM admin_users WHERE email = 'seu@email.com';
```
- ✅ Se não estiver, adicione usando o SQL do Método 2 acima
- ✅ Verifique se o UUID na tabela `admin_users` corresponde ao UUID do usuário no Auth

### Problema: Erro de permissão ao inserir na tabela
- ✅ Certifique-se de estar usando o SQL Editor do Supabase (não via aplicação)
- ✅ Verifique se as políticas RLS estão ativas (normalmente não bloqueiam inserções via SQL Editor)

---

## 📊 Estatísticas de Uso

### Ver quantos admins existem
```sql
SELECT COUNT(*) as total_admins FROM admin_users;
```

### Ver admins ativos (últimos 30 dias)
```sql
SELECT COUNT(*) as admins_ativos
FROM admin_users
WHERE last_login > NOW() - INTERVAL '30 days';
```

---

## 🔒 Segurança

### Boas Práticas
- ✅ Use senhas fortes (mínimo 12 caracteres, com letras, números e símbolos)
- ✅ Não compartilhe credenciais
- ✅ Revise periodicamente os usuários admin
- ✅ Remova acesso de usuários que não precisam mais
- ✅ Monitore os últimos logins

### Verificar segurança
```sql
-- Ver admins que nunca fizeram login (possivelmente criados por engano)
SELECT email, full_name, created_at
FROM admin_users
WHERE last_login IS NULL
ORDER BY created_at DESC;
```

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs do console do navegador (F12)
2. Verifique os logs do Supabase (Dashboard → Logs)
3. Confirme que todas as migrações foram executadas
4. Verifique se as políticas RLS estão configuradas corretamente

---

**Última atualização**: 2024

