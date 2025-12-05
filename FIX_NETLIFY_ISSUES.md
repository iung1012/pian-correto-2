# 🔧 Correções Aplicadas - Problemas no Netlify

## ✅ Problemas Corrigidos

### 1. Erro 404 em `/api/admin/login`

**Problema**: O redirect geral do SPA estava capturando as rotas de API antes dos redirects específicos.

**Solução**: 
- Reorganizei os redirects no `netlify.toml`
- Redirects de API agora vêm **ANTES** do redirect geral
- Adicionei `force = true` para garantir que sejam aplicados

**Arquivo**: `netlify.toml`

### 2. Erro de ícone PWA ausente

**Problema**: Os ícones `pwa-192x192.png` e `pwa-512x512.png` não existiam.

**Solução Temporária**:
- Configurei o PWA para usar `logo-pian.png` como ícone
- Isso resolve o erro imediatamente

**Arquivo**: `vite.config.ts`

**Solução Permanente** (opcional):
1. Crie ícones específicos:
   - `public/pwa-192x192.png` (192x192 pixels)
   - `public/pwa-512x512.png` (512x512 pixels)
2. Use o logo da Pian como base
3. Ou use um gerador online: https://realfavicongenerator.net/

## 🚀 Próximos Passos

1. **Fazer novo deploy no Netlify**:
   ```bash
   git add .
   git commit -m "fix: corrigir redirects de API e ícones PWA"
   git push origin main
   ```

2. **Verificar se funcionou**:
   - Acesse: `https://seu-site.netlify.app/api/admin/login`
   - Deve retornar JSON (não HTML)
   - Teste o login em `/login`

3. **Se ainda houver erro 404**:
   - Verifique se as functions foram compiladas:
     - Netlify Dashboard > Functions
     - Deve aparecer: `admin-login`, `admin-check`, etc.
   - Verifique os logs:
     - Netlify Dashboard > Functions > admin-login > Logs

## 🔍 Troubleshooting Adicional

### Se a API ainda retornar 404:

1. **Verificar se as functions existem**:
   - No Netlify Dashboard, vá em **Functions**
   - Deve listar todas as functions

2. **Verificar build logs**:
   - Netlify Dashboard > Deploys > [último deploy] > Build log
   - Procure por erros de compilação das functions

3. **Testar function diretamente**:
   - Acesse: `https://seu-site.netlify.app/.netlify/functions/admin-login`
   - Deve retornar erro de método (não 404)

### Se os ícones PWA ainda derem erro:

1. Verifique se `logo-pian.png` existe em `public/`
2. Se não existir, crie ícones manualmente ou use um gerador online
3. Atualize o `vite.config.ts` para usar os novos ícones

## 📝 Notas

- Os redirects agora estão na ordem correta
- As functions devem funcionar após o próximo deploy
- Os ícones PWA estão usando o logo como fallback

