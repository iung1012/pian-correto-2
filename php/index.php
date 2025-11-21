<?php
require_once 'config.php';

$pageTitle = 'Início';
$pageDescription = 'Pian Alimentos - Rações de qualidade premium para seu pet. Nutrição completa para cães e gatos.';

include 'includes/header.php';
?>

<!-- Hero Banner -->
<section class="relative h-[600px] overflow-hidden bg-gradient-to-r from-pian-black to-gray-900">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(253,213,40,0.1),transparent_50%)]"></div>

    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
        <div class="max-w-2xl">
            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 font-barlow-condensed uppercase leading-tight">
                Nutrição de <span class="text-pian-yellow">Qualidade</span> para seu Pet
            </h1>
            <p class="text-xl text-gray-300 mb-8">
                Há mais de 30 anos oferecendo o melhor em rações premium e standard para cães e gatos.
            </p>
            <div class="flex flex-wrap gap-4">
                <a href="/produtos" class="bg-pian-red text-white px-8 py-4 rounded-full hover:bg-red-700 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-lg">
                    Ver Produtos
                </a>
                <a href="/contato" class="bg-pian-yellow text-pian-black px-8 py-4 rounded-full hover:bg-yellow-400 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-lg">
                    Fale Conosco
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Produtos em Destaque -->
<section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-black text-pian-black mb-4 font-barlow-condensed uppercase">
                Nossos Produtos
            </h2>
            <div class="w-24 h-1 bg-pian-red mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <!-- Card Cães -->
            <a href="/produtos?categoria=cachorro" class="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500">
                <div class="absolute inset-0 bg-gradient-to-br from-pian-red to-red-700"></div>
                <div class="relative p-12 text-center">
                    <div class="mb-6">
                        <svg class="w-24 h-24 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                        </svg>
                    </div>
                    <h3 class="text-3xl font-black text-white mb-4 font-barlow-condensed uppercase">
                        Rações para Cães
                    </h3>
                    <p class="text-white text-lg">
                        Nutrição completa para todas as fases da vida do seu cão
                    </p>
                </div>
            </a>

            <!-- Card Gatos -->
            <a href="/produtos?categoria=gato" class="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500">
                <div class="absolute inset-0 bg-gradient-to-br from-pian-yellow to-yellow-600"></div>
                <div class="relative p-12 text-center">
                    <div class="mb-6">
                        <svg class="w-24 h-24 mx-auto text-pian-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                        </svg>
                    </div>
                    <h3 class="text-3xl font-black text-pian-black mb-4 font-barlow-condensed uppercase">
                        Rações para Gatos
                    </h3>
                    <p class="text-pian-black text-lg">
                        Nutrição balanceada especialmente desenvolvida para felinos
                    </p>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- Sobre -->
<section class="py-20 bg-white">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 class="text-4xl md:text-5xl font-black text-pian-black mb-6 font-barlow-condensed uppercase">
                    Mais de 30 Anos de História
                </h2>
                <div class="w-24 h-1 bg-pian-red mb-6"></div>
                <p class="text-gray-700 text-lg mb-4 leading-relaxed">
                    A Pian Alimentos é uma empresa brasileira com mais de três décadas de experiência no mercado de nutrição animal.
                </p>
                <p class="text-gray-700 text-lg mb-6 leading-relaxed">
                    Oferecemos uma linha completa de produtos premium e standard, desenvolvidos com ingredientes selecionados e tecnologia de ponta para garantir a saúde e bem-estar dos pets.
                </p>
                <a href="/sobre" class="inline-block bg-pian-red text-white px-8 py-4 rounded-full hover:bg-red-700 transition-all duration-300 font-bold transform hover:scale-105">
                    Saiba Mais
                </a>
            </div>
            <div class="relative">
                <img src="/ra-es-image.jpg" alt="Sobre Pian" class="rounded-3xl shadow-2xl w-full">
            </div>
        </div>
    </div>
</section>

<!-- Diferenciais -->
<section class="py-20 bg-pian-black text-white relative overflow-hidden">
    <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #FDD528 2px, transparent 2px), radial-gradient(circle at 75% 75%, #FDD528 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-black mb-4 font-barlow-condensed uppercase">
                Por que escolher a <span class="text-pian-yellow">Pian</span>?
            </h2>
            <div class="w-24 h-1 bg-pian-red mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-8">
                <div class="bg-pian-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-pian-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 font-barlow-condensed uppercase">Qualidade Premium</h3>
                <p class="text-gray-300">Ingredientes selecionados e fórmulas balanceadas para a nutrição completa do seu pet</p>
            </div>

            <div class="text-center p-8">
                <div class="bg-pian-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-pian-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 font-barlow-condensed uppercase">30 Anos de Experiência</h3>
                <p class="text-gray-300">Tradição e confiança no mercado de nutrição animal</p>
            </div>

            <div class="text-center p-8">
                <div class="bg-pian-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-pian-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 font-barlow-condensed uppercase">Linha Completa</h3>
                <p class="text-gray-300">Produtos para todas as fases e necessidades dos cães e gatos</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Final -->
<section class="py-20 bg-gradient-to-r from-pian-red to-red-700">
    <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 font-barlow-condensed uppercase">
            Encontre nossos produtos perto de você
        </h2>
        <p class="text-xl text-white mb-8 max-w-2xl mx-auto">
            Trabalhamos com distribuidores em todo o Brasil. Encontre o mais próximo e garanta a melhor nutrição para seu pet.
        </p>
        <a href="/distribuidores" class="inline-block bg-pian-yellow text-pian-black px-8 py-4 rounded-full hover:bg-yellow-400 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-lg">
            Ver Distribuidores
        </a>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
