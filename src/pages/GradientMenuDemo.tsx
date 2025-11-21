import React from 'react';
import { DemoOne } from '../components/GradientMenuDemo';

const GradientMenuDemoPage = () => {
  return (
    <div className="pt-16">
      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-montserrat">
              Gradient Menu Component
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
              Menu interativo com gradientes animados e navegação fluida
            </p>
          </div>

          {/* Main Demo */}
          <div className="mb-16">
            <DemoOne />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Gradientes Animados</h3>
              <p className="text-gray-600 font-montserrat">Cada item do menu possui gradientes únicos com animações suaves</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Interações Fluidas</h3>
              <p className="text-gray-600 font-montserrat">Hover effects, cliques e transições com Framer Motion</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Submenus Expansíveis</h3>
              <p className="text-gray-600 font-montserrat">Navegação hierárquica com submenus animados</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GradientMenuDemoPage;