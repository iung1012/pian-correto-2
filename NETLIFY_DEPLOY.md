# Guia de Deploy no Netlify

## 🚀 Passo a Passo

### 1. Configurar Variáveis de Ambiente no Netlify

1. Acesse o painel do Netlify: https://app.netlify.com
2. Vá em **Site settings** > **Environment variables**
3. Adicione as seguintes variáveis:

```
VITE_SUPABASE_URL = https://tbvrbelxnilqncnhclie.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidnJiZWx4bmlscW5jbmhjbGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODM4NTksImV4cCI6MjA3Nzg1OTg1OX0.ckK0RNA9RtghSgNgnUF8KaXmVN_rNdtmocbV8VI_4t0
```

### 2. Configurações de Build

O arquivo `netlify.toml` já está configurado com:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Redirects**: Configurado para SPA (Single Page Application)

### 3. Deploy

#### Opção A: Via Git (Recomendado)
1. Conecte seu repositório GitHub/GitLab/Bitbucket ao Netlify
2. O Netlify fará deploy automático a cada push

#### Opção B: Deploy Manual
1. Execute localmente: `npm run build`
2. Arraste a pasta `dist` para o Netlify Drop

### 4. Verificar Deploy

Após o deploy, verifique:
- ✅ O site carrega sem erros no console
- ✅ As variáveis de ambiente estão configuradas
- ✅ O roteamento funciona (teste navegar entre páginas)
- ✅ As imagens carregam corretamente

## 🔧 Troubleshooting

### Problema: Site fica em branco/preto

**Solução:**
1. Verifique se as variáveis de ambiente estão configuradas
2. Abra o console do navegador (F12) e verifique erros
3. Verifique se o build foi bem-sucedido no Netlify

### Problema: Erro 404 ao navegar entre páginas

**Solução:**
- O arquivo `_redirects` já está configurado
- Verifique se o arquivo está na pasta `public/`

### Problema: Imagens não carregam

**Solução:**
- As imagens estão hospedadas externamente (PostImg)
- Verifique a conexão com a internet
- Considere migrar para Supabase Storage ou outro CDN

## 📝 Notas Importantes

- ⚠️ As credenciais do Supabase estão hardcoded como fallback no código
- ⚠️ Para produção, sempre use variáveis de ambiente
- ✅ O site está configurado para funcionar mesmo sem variáveis (usando fallback)

## 🔗 Links Úteis

- [Documentação Netlify](https://docs.netlify.com/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

