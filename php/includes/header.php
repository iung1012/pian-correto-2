<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' - ' . SITE_NAME : SITE_NAME; ?></title>
    <meta name="description" content="<?php echo isset($pageDescription) ? $pageDescription : 'Pian Alimentos - Rações de qualidade para seu pet'; ?>">
    <link rel="icon" type="image/png" href="/logo-pian.png">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'pian-red': '#DC2626',
                        'pian-yellow': '#FDD528',
                        'pian-yellow-dark': '#EAB308',
                        'pian-black': '#1A1A1A'
                    },
                    fontFamily: {
                        'barlow-condensed': ['"Barlow Condensed"', 'sans-serif'],
                        'sans': ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>

    <style>
        @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
            animation: shimmer 3s infinite;
        }

        .smooth-scroll {
            scroll-behavior: smooth;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
    </style>
</head>
<body class="font-sans smooth-scroll">
    <!-- Header/Navigation -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center">
                    <img src="/logo-pian.png" alt="Pian Alimentos" class="h-12 md:h-16">
                </a>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-gray-700 hover:text-pian-red transition-colors font-semibold">Início</a>
                    <a href="/produtos" class="text-gray-700 hover:text-pian-red transition-colors font-semibold">Produtos</a>
                    <a href="/sobre" class="text-gray-700 hover:text-pian-red transition-colors font-semibold">Sobre</a>
                    <a href="/blog" class="text-gray-700 hover:text-pian-red transition-colors font-semibold">Blog</a>
                    <a href="/distribuidores" class="text-gray-700 hover:text-pian-red transition-colors font-semibold">Distribuidores</a>
                    <a href="/contato" class="bg-pian-red text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-bold">Contato</a>
                </div>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="md:hidden p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4">
                <a href="/" class="block py-2 text-gray-700 hover:text-pian-red transition-colors font-semibold">Início</a>
                <a href="/produtos" class="block py-2 text-gray-700 hover:text-pian-red transition-colors font-semibold">Produtos</a>
                <a href="/sobre" class="block py-2 text-gray-700 hover:text-pian-red transition-colors font-semibold">Sobre</a>
                <a href="/blog" class="block py-2 text-gray-700 hover:text-pian-red transition-colors font-semibold">Blog</a>
                <a href="/distribuidores" class="block py-2 text-gray-700 hover:text-pian-red transition-colors font-semibold">Distribuidores</a>
                <a href="/contato" class="block py-2 text-pian-red font-bold">Contato</a>
            </div>
        </nav>
    </header>

    <div class="pt-20">
