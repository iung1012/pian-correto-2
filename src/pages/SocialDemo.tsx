import React from 'react';
import { SocialLinksDemo, SocialLinksCustomGap } from '../components/SocialLinksDemo';

const SocialDemo = () => {
  return (
    <div className="pt-16">
      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-montserrat">
              Social Links Component
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
              Demonstração do componente de links sociais com animações interativas
            </p>
          </div>

          {/* Standard Demo */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-montserrat">
              Demonstração Padrão
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <SocialLinksDemo />
            </div>
          </div>

          {/* Custom Gap Demo */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-montserrat">
              Espaçamento Customizado
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <SocialLinksCustomGap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialDemo;