<?php
require_once 'config.php';
$timelineData = include 'timeline-data.php';

$pageTitle = 'Sobre Nós - Nossa História';
$pageDescription = 'Conheça a história da Pian Alimentos, mais de 30 anos de tradição no mercado de nutrição animal.';

include 'includes/header.php';
?>

<style>
    .timeline-container {
        scrollbar-width: thin;
        scrollbar-color: #DC2626 #E5E7EB;
    }

    .timeline-container::-webkit-scrollbar {
        height: 8px;
    }

    .timeline-container::-webkit-scrollbar-track {
        background: #E5E7EB;
        border-radius: 10px;
    }

    .timeline-container::-webkit-scrollbar-thumb {
        background: #DC2626;
        border-radius: 10px;
    }

    .timeline-container::-webkit-scrollbar-thumb:hover {
        background: #B91C1C;
    }

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

    .modal-content {
        animation: modalFadeIn 0.3s ease-out;
    }
</style>

<!-- Hero Section -->
<section class="relative h-[400px] overflow-hidden bg-gradient-to-br from-pian-black via-gray-900 to-pian-black">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(253,213,40,0.15),transparent_70%)]"></div>

    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
        <div class="max-w-3xl">
            <h1 class="text-5xl md:text-7xl font-black text-white mb-4 font-barlow-condensed uppercase leading-tight">
                Nossa <span class="text-pian-yellow">História</span>
            </h1>
            <p class="text-xl text-gray-300">
                Mais de 3 décadas de tradição, qualidade e inovação no mercado de nutrição animal
            </p>
        </div>
    </div>
</section>

<!-- Timeline Section -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <!-- Year Navigation -->
        <div class="max-w-7xl mx-auto mb-12">
            <div class="relative">
                <!-- Progress Line Background -->
                <div class="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>

                <!-- Animated Progress Line -->
                <div id="progress-line" class="absolute top-6 left-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full transition-all duration-500" style="width: 0%"></div>

                <!-- Year Buttons -->
                <div class="flex justify-between items-center relative">
                    <?php foreach ($timelineData as $index => $item): ?>
                        <button
                            onclick="navigateToYear(<?php echo $index; ?>)"
                            class="year-btn <?php echo $index === 0 ? 'active' : ''; ?> relative z-10 w-12 h-12 rounded-full border-4 transition-all duration-300 font-bold text-sm <?php echo $index === 0 ? 'bg-gradient-to-r from-red-500 to-red-600 border-white text-white shadow-lg scale-110' : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:scale-105'; ?>"
                            data-index="<?php echo $index; ?>">
                            <?php echo $item['year']; ?>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <!-- Timeline Content -->
        <div id="timeline-container" class="timeline-container relative max-w-7xl mx-auto overflow-x-auto scroll-smooth pb-8">
            <div class="flex gap-8 min-w-max">
                <?php foreach ($timelineData as $index => $item): ?>
                    <div class="timeline-item flex-shrink-0 w-80 md:w-96" data-index="<?php echo $index; ?>">
                        <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold <?php echo $index === 0 ? 'text-red-600' : 'text-neutral-500'; ?> text-center mb-6 font-barlow-condensed transition-colors duration-500">
                            <?php echo $item['year']; ?>
                        </h3>
                        <div class="px-4 <?php echo $index === 0 ? 'opacity-100 scale-100' : 'opacity-70 scale-95'; ?> transition-all duration-500">
                            <h4 class="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">
                                <?php echo htmlspecialchars($item['title']); ?>
                            </h4>
                            <div class="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative mb-2"
                                 onclick="openImageModal('<?php echo htmlspecialchars($item['image']); ?>', '<?php echo htmlspecialchars($item['title']); ?>')">
                                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                                    <div class="bg-white/90 rounded-full p-3">
                                        <svg class="h-6 w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <img src="<?php echo htmlspecialchars($item['image']); ?>"
                                     alt="<?php echo htmlspecialchars($item['title']); ?>"
                                     class="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                     onerror="this.src='https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400'">
                            </div>
                            <p class="text-xs text-gray-500 italic font-barlow-condensed mb-3">Arquivo pessoal</p>
                            <p class="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed">
                                <?php echo htmlspecialchars($item['description']); ?>
                            </p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Navigation Instructions -->
        <div class="max-w-7xl mx-auto px-4 text-center mt-8">
            <p class="text-gray-600 text-sm">
                Clique nos anos acima ou deslize horizontalmente para navegar pela nossa história
            </p>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
        <div class="bg-gradient-to-br from-pian-yellow to-pian-yellow-dark rounded-2xl p-8 shadow-xl relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 text-center">
                <h2 class="text-4xl md:text-5xl font-bold text-pian-black mb-4 font-barlow-condensed uppercase tracking-wider">
                    Mais de 3 Décadas de Tradição, Infinitas Possibilidades
                </h2>
                <p class="text-pian-black/80 mb-6 max-w-2xl mx-auto font-barlow-condensed text-lg">
                    De uma pequena produção familiar em 1984 até nos tornarmos referência nacional em nutrição animal. Nossa história continua sendo escrita todos os dias.
                </p>
                <a href="/produtos" class="inline-flex items-center px-8 py-4 bg-pian-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl font-bold font-barlow-condensed">
                    Conheça Nossos Produtos
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Image Modal -->
<div id="image-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center p-4" onclick="closeImageModal()">
    <div class="modal-content relative max-w-6xl max-h-[90vh] w-full" onclick="event.stopPropagation()">
        <button onclick="closeImageModal()" class="absolute -top-12 right-0 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200 z-10">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>

        <img id="modal-image" src="" alt="" class="w-full h-full object-contain rounded-xl shadow-2xl">

        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
            <p id="modal-caption" class="text-white text-lg font-bold text-center font-barlow-condensed mb-1"></p>
            <p class="text-white/80 text-sm italic text-center font-barlow-condensed">Arquivo pessoal</p>
        </div>
    </div>
</div>

<script>
const totalItems = <?php echo count($timelineData); ?>;
let currentIndex = 0;

function navigateToYear(index) {
    currentIndex = index;
    const container = document.getElementById('timeline-container');
    const itemWidth = window.innerWidth < 768 ? 320 : 384;
    const scrollLeft = index * (itemWidth + 32);

    container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });

    updateYearButtons();
    updateProgressLine();
    updateTimelineItems();
}

function updateYearButtons() {
    const buttons = document.querySelectorAll('.year-btn');
    buttons.forEach((btn, index) => {
        if (index <= currentIndex) {
            btn.className = 'year-btn active relative z-10 w-12 h-12 rounded-full border-4 transition-all duration-300 font-bold text-sm bg-gradient-to-r from-red-500 to-red-600 border-white text-white shadow-lg scale-110';
        } else {
            btn.className = 'year-btn relative z-10 w-12 h-12 rounded-full border-4 transition-all duration-300 font-bold text-sm bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:scale-105';
        }
    });
}

function updateProgressLine() {
    const progressPercentage = totalItems > 1 ? (currentIndex / (totalItems - 1)) * 100 : 0;
    document.getElementById('progress-line').style.width = progressPercentage + '%';
}

function updateTimelineItems() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        const title = item.querySelector('h3');
        const content = item.querySelector('.px-4');

        if (index === currentIndex) {
            title.className = 'text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 text-center mb-6 font-barlow-condensed transition-colors duration-500';
            content.className = 'px-4 opacity-100 scale-100 transition-all duration-500';
        } else if (index < currentIndex) {
            title.className = 'text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-6 font-barlow-condensed transition-colors duration-500';
            content.className = 'px-4 opacity-70 scale-95 transition-all duration-500';
        } else {
            title.className = 'text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-500 text-center mb-6 font-barlow-condensed transition-colors duration-500';
            content.className = 'px-4 opacity-70 scale-95 transition-all duration-500';
        }
    });
}

document.getElementById('timeline-container').addEventListener('scroll', function(e) {
    const scrollLeft = e.target.scrollLeft;
    const itemWidth = window.innerWidth < 768 ? 320 : 384;
    const gap = 32;
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalItems) {
        currentIndex = newIndex;
        updateYearButtons();
        updateProgressLine();
        updateTimelineItems();
    }
});

function openImageModal(src, caption) {
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('modal-image');
    const captionEl = document.getElementById('modal-caption');

    img.src = src;
    img.alt = caption;
    captionEl.textContent = caption;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateProgressLine();
});
</script>

<?php include 'includes/footer.php'; ?>
