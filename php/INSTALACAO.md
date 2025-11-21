# Guia de Instalação - Timeline PHP

## Requisitos do Servidor

- **PHP**: 7.0 ou superior
- **Apache**: Com mod_rewrite habilitado
- **Permissões**: Leitura/escrita para .htaccess

## Estrutura de Arquivos

```
php/
├── .htaccess              # Configuração de URLs
├── config.php             # Configurações gerais
├── index.php              # Página inicial
├── sobre.php              # Página da timeline (principal)
├── produtos.php           # Página de produtos
├── timeline-data.php      # Dados da timeline
├── test-timeline.php      # Teste de API
├── includes/
│   ├── header.php         # Cabeçalho do site
│   └── footer.php         # Rodapé do site
└── api/
    ├── produtos.php       # API de produtos
    └── produto.php        # API de produto individual
```

## Passo a Passo de Instalação

### 1. Upload dos Arquivos

Faça upload de todos os arquivos da pasta `php/` para o diretório raiz do seu servidor web:

```bash
# Exemplo usando SCP
scp -r php/* usuario@servidor:/var/www/html/

# Ou usando FTP
# Use seu cliente FTP preferido para fazer upload
```

### 2. Configurar Permissões

```bash
# Dar permissões adequadas
chmod 755 php/
chmod 644 php/*.php
chmod 644 php/.htaccess
chmod 755 php/includes/
chmod 644 php/includes/*.php
```

### 3. Verificar mod_rewrite

Certifique-se de que o mod_rewrite está habilitado no Apache:

```bash
# Ubuntu/Debian
sudo a2enmod rewrite
sudo service apache2 restart

# CentOS/RHEL
# Edite /etc/httpd/conf/httpd.conf
# Descomente: LoadModule rewrite_module modules/mod_rewrite.so
sudo service httpd restart
```

### 4. Configurar Virtual Host (Opcional)

Se estiver usando virtual hosts, adicione:

```apache
<VirtualHost *:80>
    ServerName seu-dominio.com.br
    DocumentRoot /var/www/html/php

    <Directory /var/www/html/php>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### 5. Testar a Instalação

Acesse as seguintes URLs para verificar:

1. **Página inicial**: `http://seu-dominio.com.br/`
2. **Timeline**: `http://seu-dominio.com.br/sobre`
3. **API Timeline**: `http://seu-dominio.com.br/api/timeline`

## URLs Disponíveis

A aplicação responde nas seguintes URLs:

### Páginas
- `/` - Página inicial
- `/sobre` - Página da timeline (principal)
- `/historia` - Redireciona para timeline
- `/timeline` - Redireciona para timeline
- `/produtos` - Página de produtos
- `/blog` - Blog
- `/distribuidores` - Distribuidores
- `/contato` - Contato

### API
- `/api/timeline` - Retorna dados da timeline em JSON
- `/api/produtos` - Lista de produtos
- `/api/produto/{id}` - Produto específico

## Configuração Adicional

### 1. Configurar config.php

Edite `php/config.php` para ajustar:

```php
// URL do site
define('SITE_URL', 'https://seu-dominio.com.br');

// WhatsApp
define('WHATSAPP_NUMBER', '5511999999999');
define('WHATSAPP_MESSAGE', 'Olá! Gostaria de mais informações...');
```

### 2. Configurar Supabase (se necessário)

```php
define('SUPABASE_URL', 'sua-url-supabase');
define('SUPABASE_ANON_KEY', 'sua-chave-anon');
```

## Adicionar Novos Marcos na Timeline

Para adicionar um novo evento histórico:

1. Abra `php/timeline-data.php`
2. Adicione um novo item ao array:

```php
[
    'year' => '2026',
    'title' => 'Novo Marco Histórico',
    'image' => 'https://sua-imagem-url.jpg',
    'description' => 'Descrição completa do evento...'
]
```

3. Salve o arquivo
4. As alterações serão aplicadas automaticamente

## Personalização

### Cores

As cores são definidas no Tailwind config (em `includes/header.php`):

```javascript
colors: {
    'pian-red': '#DC2626',
    'pian-yellow': '#FDD528',
    'pian-yellow-dark': '#EAB308',
    'pian-black': '#1A1A1A'
}
```

### Animações

As animações do modal podem ser ajustadas em `sobre.php`:

```css
@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
```

## Solução de Problemas

### Problema: Erro 404 nas URLs

**Solução**:
1. Verifique se mod_rewrite está habilitado
2. Confirme que .htaccess está na pasta raiz
3. Verifique permissões do .htaccess (644)

### Problema: Imagens não carregam no modal

**Solução**:
1. Verifique URLs das imagens em `timeline-data.php`
2. Teste as URLs diretamente no navegador
3. Verifique o console do navegador para erros

### Problema: Modal não abre ao clicar

**Solução**:
1. Abra o console do navegador (F12)
2. Procure por erros JavaScript
3. Verifique se o JavaScript está carregando corretamente

### Problema: Scroll não funciona suavemente

**Solução**:
1. Teste em outro navegador
2. Verifique se CSS está carregando
3. Limpe cache do navegador

## Otimização de Performance

### 1. Compressão GZIP

Já está configurada no .htaccess:

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### 2. Cache de Imagens

Configure cache para imagens:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

### 3. CDN (Opcional)

Para melhor performance, considere usar um CDN para imagens:

```php
// Em timeline-data.php
'image' => 'https://cdn.seu-dominio.com/timeline/1984.jpg'
```

## Backup

Antes de fazer alterações, sempre faça backup:

```bash
# Backup completo
tar -czf backup-timeline-$(date +%Y%m%d).tar.gz php/

# Backup apenas dos dados
cp php/timeline-data.php php/timeline-data.php.backup
```

## Segurança

### 1. Proteger arquivos sensíveis

O .htaccess já protege arquivos ocultos:

```apache
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>
```

### 2. Validação de dados

Todos os dados são filtrados com `htmlspecialchars()`:

```php
<?php echo htmlspecialchars($item['title']); ?>
```

### 3. HTTPS

Force HTTPS (já configurado no .htaccess):

```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Monitoramento

### Logs do Apache

Monitore erros em:

```bash
# Ubuntu/Debian
tail -f /var/log/apache2/error.log

# CentOS/RHEL
tail -f /var/log/httpd/error_log
```

### Logs de Acesso

```bash
# Ubuntu/Debian
tail -f /var/log/apache2/access.log

# CentOS/RHEL
tail -f /var/log/httpd/access_log
```

## Suporte

Para problemas ou dúvidas:

1. Verifique os logs do Apache
2. Teste a API: `/api/timeline`
3. Verifique o console do navegador
4. Consulte a documentação completa em `README-TIMELINE.md`

## Checklist de Instalação

- [ ] PHP 7.0+ instalado
- [ ] mod_rewrite habilitado
- [ ] Arquivos enviados para o servidor
- [ ] Permissões configuradas (755/644)
- [ ] .htaccess no lugar correto
- [ ] config.php configurado
- [ ] Testado: página inicial funciona
- [ ] Testado: `/sobre` carrega a timeline
- [ ] Testado: clique nas imagens abre modal
- [ ] Testado: navegação por anos funciona
- [ ] Testado: API `/api/timeline` retorna JSON

## Próximos Passos

Após a instalação bem-sucedida:

1. ✓ Teste todas as funcionalidades
2. ✓ Configure SSL/HTTPS
3. ✓ Configure backups automáticos
4. ✓ Monitore logs regularmente
5. ✓ Otimize imagens para web
6. ✓ Configure CDN (opcional)
7. ✓ Implemente analytics (opcional)

---

**Versão**: 1.0.0
**Última atualização**: 2025-11-11
