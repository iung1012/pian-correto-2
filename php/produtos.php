<?php
require_once 'config.php';

$pageTitle = 'Produtos';
$pageDescription = 'Conheça nossa linha completa de rações para cães e gatos. Premium e standard.';

include 'includes/header.php';
?>

<!-- Hero -->
<section class="bg-gradient-to-r from-pian-black to-gray-900 py-20">
    <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-black text-white mb-6 font-barlow-condensed uppercase">
            Nossos <span class="text-pian-yellow">Produtos</span>
        </h1>
        <div class="w-24 h-1 bg-pian-red mx-auto mb-6"></div>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Linha completa de rações premium e standard para todas as fases da vida do seu pet
        </p>
    </div>
</section>

<!-- Filtros -->
<section class="bg-white py-8 sticky top-20 z-40 shadow-md">
    <div class="container mx-auto px-4">
        <div class="flex flex-wrap gap-4 justify-center" id="filtros">
            <button class="filtro-btn active" data-filter="all">Todos</button>
            <button class="filtro-btn" data-filter="cachorro">Cães</button>
            <button class="filtro-btn" data-filter="gato">Gatos</button>
            <button class="filtro-btn" data-filter="premium">Premium</button>
            <button class="filtro-btn" data-filter="standard">Standard</button>
        </div>
    </div>
</section>

<!-- Produtos -->
<section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
        <div id="produtos-loading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pian-red"></div>
            <p class="mt-4 text-gray-600">Carregando produtos...</p>
        </div>

        <div id="produtos-grid" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 hidden">
            <!-- Produtos serão carregados aqui via JavaScript -->
        </div>

        <div id="produtos-vazio" class="text-center py-20 hidden">
            <p class="text-2xl text-gray-600">Nenhum produto encontrado</p>
        </div>
    </div>
</section>

<!-- Modal do Produto -->
<div id="produto-modal" class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
    <div class="bg-white max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl rounded-3xl relative">
        <button id="fechar-modal" class="absolute top-6 right-6 z-20 p-3 bg-pian-black hover:bg-pian-red text-white transition-all duration-300 rounded-full shadow-lg">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>

        <div id="modal-conteudo">
            <!-- Conteúdo será carregado via JavaScript -->
        </div>
    </div>
</div>

<style>
.filtro-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 700;
    transition: all 0.3s;
    background: white;
    color: #1A1A1A;
    border: 2px solid #E5E7EB;
}

.filtro-btn:hover {
    background: #FDD528;
    color: #1A1A1A;
    border-color: #FDD528;
    transform: scale(1.05);
}

.filtro-btn.active {
    background: #DC2626;
    color: white;
    border-color: #DC2626;
}

.produto-card {
    background: white;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s;
    cursor: pointer;
}

.produto-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px rgba(0,0,0,0.15);
}

.produto-imagem {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.produto-imagem img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.produto-info {
    padding: 1.5rem;
}

.produto-categoria {
    display: inline-block;
    background: #FDD528;
    color: #1A1A1A;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
}

.produto-nome {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1A1A1A;
    margin-bottom: 0.5rem;
}

.produto-descricao {
    font-size: 0.875rem;
    color: #6B7280;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

<script>
let todosProdutos = [];
let filtroAtual = 'all';

// Carrega produtos
async function carregarProdutos() {
    try {
        const response = await fetch('/api/produtos');
        const result = await response.json();

        if (result.success) {
            todosProdutos = result.data;
            exibirProdutos(todosProdutos);
        } else {
            mostrarVazio();
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        mostrarVazio();
    }

    document.getElementById('produtos-loading').classList.add('hidden');
}

// Exibe produtos
function exibirProdutos(produtos) {
    const grid = document.getElementById('produtos-grid');
    const vazio = document.getElementById('produtos-vazio');

    if (produtos.length === 0) {
        grid.classList.add('hidden');
        vazio.classList.remove('hidden');
        return;
    }

    grid.innerHTML = produtos.map(produto => `
        <div class="produto-card" onclick="abrirModal(${produto.id})">
            <div class="produto-imagem">
                <img src="${produto.image}" alt="${produto.name}" onerror="this.src='/fallback-product.svg'">
            </div>
            <div class="produto-info">
                <span class="produto-categoria">${produto.category}</span>
                <h3 class="produto-nome">${produto.name}</h3>
                <p class="produto-descricao">${produto.description.split('##')[0].substring(0, 100)}...</p>
            </div>
        </div>
    `).join('');

    grid.classList.remove('hidden');
    vazio.classList.add('hidden');
}

function mostrarVazio() {
    document.getElementById('produtos-grid').classList.add('hidden');
    document.getElementById('produtos-vazio').classList.remove('hidden');
}

// Filtros
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filtro = this.dataset.filter;
        filtroAtual = filtro;

        if (filtro === 'all') {
            exibirProdutos(todosProdutos);
        } else {
            const produtosFiltrados = todosProdutos.filter(p =>
                p.category.toLowerCase().includes(filtro) ||
                (p.line && p.line.toLowerCase().includes(filtro))
            );
            exibirProdutos(produtosFiltrados);
        }
    });
});

// Modal
async function abrirModal(id) {
    const modal = document.getElementById('produto-modal');
    const conteudo = document.getElementById('modal-conteudo');

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    try {
        const response = await fetch(`/api/produto?id=${id}`);
        const result = await response.json();

        if (result.success) {
            const produto = result.data;
            conteudo.innerHTML = gerarConteudoModal(produto);
        }
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
    }
}

function fecharModal() {
    const modal = document.getElementById('produto-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

document.getElementById('fechar-modal').addEventListener('click', fecharModal);

document.getElementById('produto-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharModal();
    }
});

function gerarConteudoModal(produto) {
    const sections = parseDescription(produto.description);

    return `
        <div class="bg-pian-black py-8 px-8 text-center">
            <span class="inline-block bg-pian-yellow text-pian-black px-4 py-2 text-xs font-bold uppercase mb-4">${produto.category}</span>
            <h1 class="text-4xl font-black text-white mb-4 uppercase">${produto.name}</h1>
            <div class="w-24 h-1 bg-pian-red mx-auto"></div>
        </div>

        <div class="overflow-y-auto max-h-[calc(90vh-200px)] bg-white p-8">
            <div class="max-w-2xl mx-auto mb-8">
                <div class="bg-white rounded-3xl shadow-xl p-8">
                    <img src="${produto.image}" alt="${produto.name}" class="w-full h-64 object-contain mx-auto" onerror="this.src='/fallback-product.svg'">
                </div>
            </div>

            <div class="max-w-4xl mx-auto space-y-6">
                ${sections.diferenciais ? `
                    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 text-center">
                            <h2 class="text-xl font-bold text-white uppercase">Diferenciais</h2>
                        </div>
                        <div class="px-8 py-6">${formatText(sections.diferenciais, true)}</div>
                    </div>
                ` : ''}

                ${sections.descricao ? `
                    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 text-center">
                            <h2 class="text-xl font-bold text-pian-black uppercase">Descrição</h2>
                        </div>
                        <div class="px-8 py-6">${formatText(sections.descricao)}</div>
                    </div>
                ` : ''}

                ${sections.composicao ? `
                    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div class="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 text-center">
                            <h2 class="text-xl font-bold text-white uppercase">Composição Básica</h2>
                        </div>
                        <div class="px-8 py-6 text-sm">${formatText(sections.composicao)}</div>
                    </div>
                ` : ''}

                ${sections.enriquecimento ? `
                    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div class="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 text-center">
                            <h2 class="text-xl font-bold text-white uppercase">Enriquecimento Mínimo por KG</h2>
                        </div>
                        <div class="px-8 py-6 text-sm">${formatText(sections.enriquecimento)}</div>
                    </div>
                ` : ''}

                ${sections.niveis ? `
                    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div class="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 text-center">
                            <h2 class="text-xl font-bold text-white uppercase">Níveis de Garantia</h2>
                        </div>
                        <div class="px-8 py-6 text-sm">${formatText(sections.niveis)}</div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function parseDescription(description) {
    return {
        descricao: (description.match(/##\s*DESCRIÇÃO\s*([\s\S]*?)(?=##|$)/i) || [])[1]?.trim() || '',
        composicao: (description.match(/##\s*COMPOSIÇÃO BÁSICA\s*([\s\S]*?)(?=##|$)/i) || [])[1]?.trim() || '',
        enriquecimento: (description.match(/##\s*ENRIQUECIMENTO MÍNIMO POR KG\s*([\s\S]*?)(?=##|$)/i) || [])[1]?.trim() || '',
        niveis: (description.match(/##\s*NÍVEIS DE GARANTIA\s*([\s\S]*?)(?=##|$)/i) || [])[1]?.trim() || '',
        diferenciais: (description.match(/##\s*DIFERENCIAIS\s*([\s\S]*?)$/i) || [])[1]?.trim() || ''
    };
}

function formatText(text, isDiferenciais = false) {
    return text.split('\n').map(line => {
        line = line.trim();
        if (!line) return '';

        if (line.includes('|')) {
            const items = line.split('|').map(item => item.trim()).filter(item => item);
            return `<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">${items.map(item =>
                `<div class="flex items-start gap-2 bg-gray-50 p-2 rounded-lg">
                    <span class="text-red-600 font-bold">•</span>
                    <span class="text-gray-800 text-xs flex-1">${item}</span>
                </div>`
            ).join('')}</div>`;
        }

        if (line.startsWith('- ') || line.startsWith('✓ ')) {
            const content = line.replace(/^- |^✓ /, '');
            if (isDiferenciais) {
                return `<li class="ml-4 text-gray-900 text-base font-bold uppercase mb-2" style="font-family: Helvetica, Arial, sans-serif;">${content}</li>`;
            }
            return `<li class="ml-4 text-gray-800 text-sm mb-2">${content}</li>`;
        }

        return `<p class="text-gray-800 text-sm mb-2">${line}</p>`;
    }).join('');
}

// Inicializar
carregarProdutos();
</script>

<?php include 'includes/footer.php'; ?>
