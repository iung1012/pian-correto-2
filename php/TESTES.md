# Guia de Testes - Timeline PHP

## 🧪 Checklist de Testes

Use este guia para validar todas as funcionalidades antes do deploy em produção.

## 1. Testes de Instalação

### ✓ Verificar Arquivos
```bash
# Confirme que todos os arquivos existem
ls -la php/sobre.php
ls -la php/timeline-data.php
ls -la php/.htaccess
ls -la php/includes/header.php
ls -la php/includes/footer.php
```

**Resultado esperado**: Todos os arquivos listados sem erros.

### ✓ Verificar Permissões
```bash
# Verificar permissões
ls -la php/*.php
```

**Resultado esperado**: `-rw-r--r--` (644) para arquivos PHP.

### ✓ Testar mod_rewrite
```bash
# Verificar se está habilitado
apache2ctl -M | grep rewrite
```

**Resultado esperado**: `rewrite_module (shared)`.

## 2. Testes de Página

### ✓ Página Inicial
```bash
curl -I http://localhost/
```

**Resultado esperado**: `HTTP/1.1 200 OK`

### ✓ Página Timeline
```bash
curl -I http://localhost/sobre
```

**Resultado esperado**: `HTTP/1.1 200 OK`

### ✓ Rotas Alternativas
```bash
curl -I http://localhost/historia
curl -I http://localhost/timeline
```

**Resultado esperado**: Ambas retornam `HTTP/1.1 200 OK`

### ✓ API Timeline
```bash
curl http://localhost/api/timeline
```

**Resultado esperado**: JSON com 15 itens da timeline.

## 3. Testes de Interface

### ✓ Teste 1: Carregar Página
1. Abra: `http://localhost/sobre`
2. **Verificar**:
   - [ ] Hero section carrega
   - [ ] 15 botões de anos visíveis
   - [ ] Barra de progresso aparece
   - [ ] Primeiro item (1984) destacado em vermelho
   - [ ] Outros anos em cinza

**Status esperado**: ✅ Todos os itens visíveis

### ✓ Teste 2: Navegação por Anos
1. Clique no ano "1987"
2. **Verificar**:
   - [ ] Scroll suave até 1987
   - [ ] Ano 1987 fica vermelho
   - [ ] Barra de progresso avança
   - [ ] Conteúdo 1987 em destaque (opacity 100%)
   - [ ] Outros itens ficam mais transparentes

**Status esperado**: ✅ Navegação funciona

### ✓ Teste 3: Scroll Manual
1. Use scroll horizontal (mouse ou dedo)
2. Arraste para a direita
3. **Verificar**:
   - [ ] Scroll é suave
   - [ ] Botões de anos atualizam automaticamente
   - [ ] Barra de progresso acompanha
   - [ ] Item atual sempre em destaque

**Status esperado**: ✅ Scroll sincronizado

### ✓ Teste 4: Click nas Imagens
1. Clique na imagem de 1984
2. **Verificar**:
   - [ ] Modal abre imediatamente
   - [ ] Animação fade-in suave
   - [ ] Imagem em tela cheia
   - [ ] Fundo escuro com blur
   - [ ] Botão X visível no topo
   - [ ] Legenda visível embaixo

**Status esperado**: ✅ Modal funciona

### ✓ Teste 5: Fechar Modal
Teste 3 formas de fechar:

**A. Botão X**
1. Abra modal
2. Clique no botão X
3. **Verificar**: [ ] Modal fecha com animação

**B. Click Fora**
1. Abra modal
2. Clique fora da imagem
3. **Verificar**: [ ] Modal fecha

**C. Tecla ESC**
1. Abra modal
2. Pressione ESC
3. **Verificar**: [ ] Modal fecha

**Status esperado**: ✅ Todas as 3 formas funcionam

### ✓ Teste 6: Hover nas Imagens
1. Passe o mouse sobre uma imagem (sem clicar)
2. **Verificar**:
   - [ ] Ícone de lupa aparece
   - [ ] Imagem dá zoom leve
   - [ ] Overlay escuro semi-transparente
   - [ ] Cursor vira "pointer"

**Status esperado**: ✅ Efeito hover ativo

## 4. Testes Mobile

### ✓ Teste 7: Responsividade Mobile
1. Abra DevTools (F12)
2. Ative modo mobile (Ctrl+Shift+M)
3. Selecione "iPhone 12 Pro"
4. **Verificar**:
   - [ ] Timeline se adapta à largura
   - [ ] Botões de anos legíveis
   - [ ] Imagens carregam proporcionalmente
   - [ ] Modal funciona em tela pequena
   - [ ] Touch scroll funciona

**Status esperado**: ✅ Mobile funcional

### ✓ Teste 8: Touch Gestures
No modo mobile:
1. Arraste timeline com o dedo (simular)
2. **Verificar**:
   - [ ] Scroll suave no touch
   - [ ] Navegação atualiza
   - [ ] Sem lag ou travamento

**Status esperado**: ✅ Touch responsivo

## 5. Testes de Performance

### ✓ Teste 9: Tempo de Carregamento
```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost/sobre
```

Crie `curl-format.txt`:
```
time_total: %{time_total}s
size_download: %{size_download} bytes
```

**Resultado esperado**:
- Tempo total < 2 segundos
- Tamanho razoável (< 50KB)

### ✓ Teste 10: Lighthouse Score
1. Abra Chrome DevTools
2. Aba "Lighthouse"
3. Execute auditoria
4. **Verificar**:
   - [ ] Performance > 80
   - [ ] Accessibility > 90
   - [ ] Best Practices > 90
   - [ ] SEO > 90

**Status esperado**: ✅ Scores aceitáveis

## 6. Testes de Dados

### ✓ Teste 11: API Timeline
```bash
curl http://localhost/api/timeline | jq
```

**Verificar JSON retorna**:
```json
{
  "status": "success",
  "total_items": 15,
  "timeline_data": [...],
  "years": ["1984", "1987", ...]
}
```

**Status esperado**: ✅ API funciona

### ✓ Teste 12: Validação de Dados
Verifique cada item tem:
- [ ] `year` (string)
- [ ] `title` (string)
- [ ] `image` (URL válida)
- [ ] `description` (string não vazia)

**Status esperado**: ✅ Dados válidos

## 7. Testes de Segurança

### ✓ Teste 13: XSS Protection
1. Tente adicionar em `timeline-data.php`:
```php
'title' => '<script>alert("XSS")</script>'
```
2. Recarregue página
3. **Verificar**: [ ] Script NÃO executa (texto exibido)

**Status esperado**: ✅ XSS bloqueado por `htmlspecialchars()`

### ✓ Teste 14: File Access
```bash
curl http://localhost/timeline-data.php
```

**Resultado esperado**: Dados PHP, não código fonte.

### ✓ Teste 15: HTTPS Redirect
```bash
curl -I http://localhost/sobre
```

**Verificar**: Header `Location: https://...` (se HTTPS configurado)

## 8. Testes de Browser

### ✓ Teste 16: Cross-Browser
Teste em cada navegador:

**Chrome**
- [ ] Timeline carrega
- [ ] Modal funciona
- [ ] Animações suaves

**Firefox**
- [ ] Timeline carrega
- [ ] Modal funciona
- [ ] Animações suaves

**Safari**
- [ ] Timeline carrega
- [ ] Modal funciona
- [ ] Animações suaves

**Edge**
- [ ] Timeline carrega
- [ ] Modal funciona
- [ ] Animações suaves

**Status esperado**: ✅ Funciona em todos

## 9. Testes de Erro

### ✓ Teste 17: Imagem Quebrada
1. Edite `timeline-data.php`
2. Mude uma URL para inválida: `'image' => 'http://invalid.url/img.jpg'`
3. Recarregue
4. **Verificar**: [ ] Imagem fallback carrega (Pexels)

**Status esperado**: ✅ Fallback funciona

### ✓ Teste 18: JavaScript Desabilitado
1. Desabilite JavaScript no navegador
2. Carregue `/sobre`
3. **Verificar**:
   - [ ] Conteúdo ainda visível
   - [ ] Imagens carregam
   - [ ] Layout não quebra

**Status esperado**: ✅ Conteúdo acessível

## 10. Testes de Acessibilidade

### ✓ Teste 19: Navegação por Teclado
1. Use apenas Tab para navegar
2. **Verificar**:
   - [ ] Botões de anos focáveis
   - [ ] Imagens focáveis
   - [ ] Botão X do modal focável
   - [ ] ESC fecha modal

**Status esperado**: ✅ Teclado funciona

### ✓ Teste 20: Screen Reader
1. Ative leitor de tela (NVDA/JAWS)
2. Navegue pela página
3. **Verificar**:
   - [ ] Títulos lidos corretamente
   - [ ] Alt text das imagens lido
   - [ ] Navegação clara

**Status esperado**: ✅ Acessível

## 📊 Resultados dos Testes

### Template de Relatório

```
DATA: ___________
TESTADOR: ___________

INSTALAÇÃO:
[ ] Arquivos OK
[ ] Permissões OK
[ ] mod_rewrite OK

PÁGINAS:
[ ] Homepage OK
[ ] Timeline OK
[ ] Rotas alternativas OK
[ ] API OK

INTERFACE:
[ ] Carregar página OK
[ ] Navegação anos OK
[ ] Scroll manual OK
[ ] Click imagens OK
[ ] Fechar modal OK
[ ] Hover imagens OK

MOBILE:
[ ] Responsivo OK
[ ] Touch gestures OK

PERFORMANCE:
[ ] Carregamento < 2s
[ ] Lighthouse > 80

DADOS:
[ ] API retorna JSON
[ ] Dados válidos

SEGURANÇA:
[ ] XSS bloqueado
[ ] File access OK
[ ] HTTPS OK

BROWSERS:
[ ] Chrome OK
[ ] Firefox OK
[ ] Safari OK
[ ] Edge OK

ERROS:
[ ] Imagem fallback OK
[ ] JS desabilitado OK

ACESSIBILIDADE:
[ ] Teclado OK
[ ] Screen reader OK

RESULTADO FINAL: ✅ APROVADO / ⚠️ COM RESSALVAS / ❌ REPROVADO

OBSERVAÇÕES:
_________________________________
_________________________________
```

## 🚀 Testes de Produção

Após deploy, teste em produção:

### ✓ Smoke Test
```bash
# Substitua SEU-DOMINIO.COM
curl -I https://SEU-DOMINIO.COM/sobre
curl https://SEU-DOMINIO.COM/api/timeline | jq '.total_items'
```

**Resultado esperado**:
- Status 200
- 15 items

### ✓ End-to-End
1. Abra: `https://SEU-DOMINIO.COM/sobre`
2. Clique todos os 15 anos
3. Abra 3-5 imagens
4. Teste em mobile
5. **Verificar**: Tudo funciona

## 📝 Relatório de Bugs

Se encontrar problemas:

```
BUG #: ___
SEVERIDADE: [ ] Crítico [ ] Alto [ ] Médio [ ] Baixo
DESCRIÇÃO: _________________________________
PASSOS PARA REPRODUZIR:
1. _________________________________
2. _________________________________
3. _________________________________
RESULTADO ESPERADO: _________________________________
RESULTADO ATUAL: _________________________________
BROWSER/OS: _________________________________
SCREENSHOT: _________________________________
```

## ✅ Aprovação Final

Todos os testes passaram?

- [ ] ✅ Instalação OK
- [ ] ✅ Interface OK
- [ ] ✅ Mobile OK
- [ ] ✅ Performance OK
- [ ] ✅ Segurança OK
- [ ] ✅ Browsers OK
- [ ] ✅ Acessibilidade OK

**APROVADO PARA PRODUÇÃO**: _____ (assinatura)

---

**Última atualização**: 2025-11-11
