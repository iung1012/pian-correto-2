import React from 'react';
import ProductSection from '../components/ProductSection';

const Products = () => {
  return (
    <div>
      {/* Hero Section - Clean and Elegant */}
      <section className="py-16 relative overflow-hidden">
        {/* Background com imagem desfocada */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{
              backgroundImage: 'url(/banner-produtos-background.jpg)',
              filter: 'blur(2px)',
            }}
          ></div>
          {/* Overlay escuro para contraste */}
          <div className="absolute inset-0 bg-pian-black/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[95px] font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider break-words px-2">
              PRODUTOS
            </h1>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-pian-red mx-auto mb-6"></div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-bold font-barlow-condensed leading-relaxed">
              DESCUBRA A NOSSA LINHA COMPLETA DE NUTRIÇÃO.
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