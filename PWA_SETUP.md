# Configuração PWA - Pian Alimentos

## ✅ O que foi implementado

O Progressive Web App (PWA) foi configurado com sucesso! O site agora pode ser instalado como um aplicativo em dispositivos móveis e desktop.

### Funcionalidades implementadas:

1. **Service Worker**: Cache automático de recursos para funcionamento offline
2. **Web App Manifest**: Configuração para instalação como app
3. **Notificações de Atualização**: Prompt automático quando há nova versão disponível
4. **Cache Inteligente**: 
   - Cache de recursos estáticos (JS, CSS, HTML, imagens)
   - Cache de fontes do Google
   - Cache de imagens do PostImg
   - Cache de dados do Supabase (7 dias)

## 📱 Como gerar os ícones PWA

Os ícones PWA precisam ser gerados a partir do logo. Você tem duas opções:

### Opção 1: Usando o script automatizado (Recomendado)

1. Instale o Sharp (biblioteca de processamento de imagens):
```bash
npm install -D sharp
```

2. Execute o script:
```bash
node scripts/generate-pwa-icons.js
```

Isso irá gerar automaticamente:
- `public/pwa-192x192.png`
- `public/pwa-512x512.png`

### Opção 2: Gerar manualmente

1. Use uma ferramenta online como:
   - [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - [PWA Builder](https://www.pwabuilder.com/imageGenerator)

2. Use o arquivo `public/logo-pian.png` como base

3. Gere os seguintes tamanhos:
   - 192x192 pixels → salvar como `public/pwa-192x192.png`
   - 512x512 pixels → salvar como `public/pwa-512x512.png`

## 🚀 Como testar o PWA

### Em desenvolvimento:

1. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

2. O PWA estará habilitado em modo de desenvolvimento

### Em produção:

1. Faça o build:
```bash
npm run build
```

2. Teste localmente:
```bash
npm run preview
```

3. Ou faça deploy para um servidor HTTPS (obrigatório para PWA)

### Testar instalação:

1. **Chrome/Edge Desktop**:
   - Abra o DevTools (F12)
   - Vá para a aba "Application" → "Manifest"
   - Clique em "Add to homescreen" ou use o ícone de instalação na barra de endereços

2. **Chrome Mobile (Android)**:
   - Abra o site
   - Toque no menu (3 pontos) → "Adicionar à tela inicial"

3. **Safari (iOS)**:
   - Abra o site
   - Toque no botão de compartilhar → "Adicionar à Tela de Início"

## 📋 Checklist de verificação

- [x] Plugin PWA instalado e configurado
- [x] Manifest.json configurado
- [x] Service Worker configurado
- [x] Meta tags PWA adicionadas
- [x] Componente de atualização criado
- [ ] Ícones PWA gerados (192x192 e 512x512)
- [ ] Testado em dispositivo móvel
- [ ] Testado em desktop
- [ ] Verificado funcionamento offline

## 🔧 Configurações avançadas

As configurações do PWA estão em `vite.config.ts`. Você pode personalizar:

- **Tema**: Cor do tema (`theme_color: '#FDD528'`)
- **Modo de exibição**: `standalone` (como app nativo)
- **Cache**: Estratégias de cache para diferentes recursos
- **Atualizações**: Tipo de registro do service worker

## 📚 Recursos úteis

- [Documentação do vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [MDN - Progressive Web Apps](https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps)
- [PWA Checklist](https://web.dev/pwa-checklist/)

## ⚠️ Importante

- **HTTPS é obrigatório**: PWAs só funcionam em conexões HTTPS (exceto localhost)
- **Ícones são necessários**: Certifique-se de gerar os ícones antes do deploy
- **Teste em dispositivos reais**: Sempre teste a instalação em dispositivos móveis reais

