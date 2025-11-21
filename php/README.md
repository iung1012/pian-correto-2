# Pian Alimentos - Versão PHP

Site institucional da Pian Alimentos desenvolvido em PHP com integração ao Supabase.

## Estrutura de Arquivos

```
php/
├── config.php              # Configurações e conexão com Supabase
├── index.php               # Página inicial
├── produtos.php            # Página de produtos
├── .htaccess              # Configurações do Apache
├── api/
│   ├── produtos.php       # API para listar produtos
│   └── produto.php        # API para produto específico
└── includes/
    ├── header.php         # Cabeçalho do site
    └── footer.php         # Rodapé do site
```

## Requisitos do Servidor

- PHP 7.4 ou superior
- Apache com mod_rewrite habilitado
- cURL habilitado
- Suporte a HTTPS (recomendado)

## Instalação

### 1. Upload dos Arquivos

Faça upload da pasta `php/` para o seu servidor web (public_html, www, ou htdocs).

### 2. Configurar Permissões

```bash
chmod 755 php/
chmod 644 php/*.php
chmod 644 php/.htaccess
```

### 3. Copiar Imagens

Copie todas as imagens da pasta `public/` para a raiz do site PHP:

```bash
cp public/*.jpg php/
cp public/*.png php/
cp public/*.svg php/
cp public/*.webp php/
```

### 4. Configurar .htaccess

O arquivo `.htaccess` já está configurado com:
- URLs amigáveis
- Redirecionamento HTTPS
- Cache de arquivos estáticos
- Compressão GZIP

Se necessário, ajuste as configurações de acordo com seu servidor.

### 5. Testar a Instalação

Acesse seu site:
- Página inicial: `https://seu-site.com.br/`
- Produtos: `https://seu-site.com.br/produtos`
- API: `https://seu-site.com.br/api/produtos`

## Configuração

### Alterar Dados do WhatsApp

Edite o arquivo `config.php`:

```php
define('WHATSAPP_NUMBER', '5511999999999'); // Seu número
define('WHATSAPP_MESSAGE', 'Sua mensagem padrão');
```

### Alterar URL do Site

```php
define('SITE_URL', 'https://seu-site.com.br');
```

## Funcionalidades

### Páginas Disponíveis

- ✅ **Página Inicial** (`index.php`)
- ✅ **Produtos** (`produtos.php`)
- ⏳ Sobre (criar `sobre.php`)
- ⏳ Blog (criar `blog.php`)
- ⏳ Distribuidores (criar `distribuidores.php`)
- ⏳ Contato (criar `contato.php`)

### API REST

#### Listar Todos os Produtos
```
GET /api/produtos
```

#### Filtrar Produtos por Categoria
```
GET /api/produtos?categoria=cachorro
GET /api/produtos?categoria=gato
```

#### Filtrar Produtos por Linha
```
GET /api/produtos?linha=premium
GET /api/produtos?linha=standard
```

#### Buscar Produto Específico
```
GET /api/produto?id=1
```

### Recursos Implementados

- ✅ Conexão com Supabase
- ✅ Sistema de API REST
- ✅ Modal de produtos com todos os dados
- ✅ Filtros de produtos (categoria, linha)
- ✅ Layout responsivo
- ✅ Botão flutuante do WhatsApp
- ✅ Menu mobile
- ✅ Cache de imagens
- ✅ Compressão GZIP
- ✅ URLs amigáveis

## Hospedagem Recomendada

Este site PHP funciona em qualquer hospedagem compartilhada que tenha:

- **Hostinger** - A partir de R$ 6,99/mês
- **HostGator** - A partir de R$ 7,99/mês
- **Locaweb** - A partir de R$ 15,90/mês
- **UOL Host** - A partir de R$ 19,90/mês

## Suporte

O banco de dados já está configurado no Supabase e não requer configuração adicional. As credenciais estão no arquivo `config.php`.

Para adicionar novos produtos ou gerenciar o conteúdo, utilize o painel admin React em `/admin` ou acesse diretamente o Supabase.

## Próximos Passos

1. Criar página "Sobre" (`sobre.php`)
2. Criar página "Blog" (`blog.php`)
3. Criar página "Distribuidores" (`distribuidores.php`)
4. Criar página "Contato" com formulário (`contato.php`)
5. Implementar sistema de envio de email
6. Adicionar Google Analytics
7. Implementar sitemap.xml
8. Configurar robots.txt

## Manutenção

### Atualizar Produtos

Os produtos são gerenciados através do Supabase. Para adicionar/editar:
1. Acesse o painel do Supabase
2. Vá em "Table Editor" > "products"
3. Adicione/edite os produtos

### Backup

Faça backup regularmente de:
- Arquivos PHP
- Imagens
- Banco de dados Supabase (via Dashboard)

## Licença

© 2025 Pian Alimentos - Todos os direitos reservados
