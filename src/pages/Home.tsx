import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductLineCarousel from '../components/ProductLineCarousel';
import { InfiniteSliderHorizontal } from '../components/InfiniteSliderDemo';

const Home = () => {
  return (
    <div>
      <HeroBanner />

      {/* Da Nossa Família Para a Sua */}
      <section className="py-20 bg-white section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-[75px] font-black text-gray-900 mb-6 font-barlow-condensed leading-tight uppercase tracking-wider">
                DA NOSSA FAMÍLIA PARA A SUA
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pian-red to-pian-red rounded-full mb-6"></div>
              <p className="text-base text-gray-700 leading-relaxed font-montserrat">
                Nossa história começou em 1984, em Paraí-RS, e se mistura com a própria trajetória da família Pian.
                O amor que temos pelos pets deu início ao que hoje, mais de 30 anos depois, é a Pian Alimentos,
                uma empresa comprometida com a saúde e o bem-estar dos animais e que desenvolve produtos de alta qualidade,
                com um ingrediente mais que especial: o carinho.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-pian-red text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold font-montserrat text-sm"
              >
                Conheça nossa história
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Vídeo */}
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-pian-yellow/20">
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/_aMQwmiu3uU"
                    title="Pian Alimentos - História da Família"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center py-8 bg-white">
        <div className="flex items-center gap-4 max-w-md">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pian-red to-pian-red"></div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-pian-red animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-pian-yellow animate-pulse delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-pian-red animate-pulse delay-200"></div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-pian-red to-pian-red"></div>
        </div>
      </div>

      {/* Typewriter Text Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-[45px] font-bold text-gray-900 font-barlow-condensed leading-tight px-4 tracking-tight">
              NA PIAN, COLOCAMOS AMOR NO QUE CRIAMOS E TRABALHAMOS COM <span className="inline-block relative overflow-hidden">
               <span className="text-red-600 typewriter-changing-word"></span>
              </span><br />
              PARA ENTREGAR QUALIDADE.
            </h1>
          </div>
        </div>
      </section>

      <InfiniteSliderHorizontal />

      <ProductLineCarousel />

      {/* Banner acima do carrossel */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <a href="https://postimg.cc/xJDtwhWc" target="_blank" rel="noopener noreferrer">
              <img
                src="https://i.postimg.cc/0QrFwqnd/Banner-certificacao-Pian.png"
                alt="Banner-certificacao-Pian"
                className="w-full max-w-6xl mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Pet Category Buttons */}
      <section className="py-16 bg-white section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-[75px] font-black text-gray-900 mb-6 font-barlow-condensed leading-tight uppercase tracking-wider">
              QUAL ALIMENTO VOCÊ PROCURA?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Botão Gatos */}
            <Link
              to="/products?category=Gatos"
              className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl bg-white"
            >
              <div className="relative p-8 flex flex-col items-center text-center bg-white">
                {/* High contrast background */}

                {/* Image container */}
                <div className="relative z-10 mb-6">
                  <img
                    src="https://i.postimg.cc/RZNfbz6r/gato.png"
                    alt="Produtos para Gatos"
                    className="w-48 h-48 object-contain mx-auto"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 font-barlow-condensed uppercase tracking-wider">
                    GATOS
                  </h3>
                  <div className="inline-flex items-center px-6 py-3 bg-pian-yellow text-pian-black hover:bg-pian-yellow-dark transition-all duration-300 font-bold font-montserrat">
                    <span className="font-bold font-barlow-condensed uppercase">VER PRODUTOS</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Botão Cães */}
            <Link
              to="/products?category=Cachorros"
              className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl bg-white"
            >
              <div className="relative p-8 flex flex-col items-center text-center bg-white">
                {/* High contrast background */}

                {/* Image container */}
                <div className="relative z-10 mb-6">
                  <img
                    src="https://i.postimg.cc/jd8PXjjQ/cachorro.png"
                    alt="Produtos para Cães"
                    className="w-48 h-48 object-contain mx-auto"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 font-barlow-condensed uppercase tracking-wider">
                    CÃES
                  </h3>
                  <div className="inline-flex items-center px-6 py-3 bg-pian-yellow hover:bg-pian-yellow-dark text-pian-black transition-all duration-300 font-bold font-montserrat">
                    <span className="font-bold font-barlow-condensed uppercase">VER PRODUTOS</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;