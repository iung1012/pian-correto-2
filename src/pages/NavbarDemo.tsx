import React from 'react';
import { NavbarDemo } from '../components/NavbarDemo';

const NavbarDemoPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-montserrat">
              Navbar Menu Component
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
              Demonstração do componente de navegação com menus dropdown animados
            </p>
          </div>

          {/* Navbar Demo */}
          <div className="relative">
            <NavbarDemo />
            
            {/* Content to show navbar interaction */}
            <div className="mt-32 space-y-16">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat">
                  Navegação Interativa
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
                  Passe o mouse sobre os itens do menu acima para ver as animações e submenus. 
                  O navbar está fixo no topo da página e se adapta ao conteúdo.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Animações Fluidas</h3>
                  <p className="text-gray-600 font-montserrat">Transições suaves com Framer Motion para uma experiência premium</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Menu Responsivo</h3>
                  <p className="text-gray-600 font-montserrat">Adaptação perfeita para diferentes tamanhos de tela</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Conteúdo Rico</h3>
                  <p className="text-gray-600 font-montserrat">Suporte a imagens, links e conteúdo personalizado nos menus</p>
                </div>
              </div>

              {/* Spacer for demonstration */}
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">
                    Scroll para testar o comportamento fixo
                  </h3>
                  <p className="text-gray-600 font-montserrat">
                    O navbar permanece fixo no topo durante a rolagem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NavbarDemoPage;