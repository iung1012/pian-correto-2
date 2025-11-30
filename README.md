# Pian Alimentos - Site Institucional

Site institucional da Pian Alimentos Nutrição Pet, desenvolvido com React, TypeScript e Supabase.

## 🚀 Tecnologias

- **React** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilização)
- **Supabase** (backend e autenticação)
- **React Router** (navegação)
- **Lucide React** (ícones)

## 📋 Funcionalidades

- ✅ Página inicial com banner e produtos
- ✅ Catálogo de produtos com filtros e busca
- ✅ Página "Quem Somos" com timeline
- ✅ Página de distribuidores
- ✅ Blog de notícias
- ✅ Página de contato
- ✅ Painel administrativo protegido
- ✅ PWA (Progressive Web App)
- ✅ Botão WhatsApp flutuante
- ✅ Design responsivo

## 🔐 Acesso Admin

Para gerenciar usuários administradores, consulte o guia completo:

📖 **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Guia completo de configuração de usuários admin

### Acesso Rápido
- **Login**: `/login`
- **Painel Admin**: `/admin` (requer autenticação)

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React (Auth, etc)
├── lib/           # Configurações (Supabase, etc)
├── pages/         # Páginas da aplicação
└── App.tsx        # Componente principal
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## 📚 Documentação Adicional

- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Configuração de usuários admin
- **[PWA_SETUP.md](./PWA_SETUP.md)** - Configuração PWA
- **[NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)** - Deploy no Netlify

## 📝 Licença

Proprietário - Pian Alimentos
