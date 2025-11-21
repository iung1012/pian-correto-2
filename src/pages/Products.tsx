import React from 'react';
import ProductSection from '../components/ProductSection';

const Products = () => {
  return (
    <div className="pt-16">
      {/* Hero Section - Clean and Elegant */}
      <section className="py-16 bg-pian-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FDD528 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #FDD528 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main title */}
            <h1 className="text-[75px] font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider">
            </h1>
            <h1 className="text-[95px] font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider">
              PRODUTOS
            </h1>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-pian-red mx-auto mb-6"></div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-bold font-barlow-condensed leading-relaxed">
              Descubra nossa linha completa de rações desenvolvidas com ingredientes selecionados
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductSection />
    </div>
  );
};

export default Products;