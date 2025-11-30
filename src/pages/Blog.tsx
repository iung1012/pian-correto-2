import React from 'react';
import BlogSection from '../components/BlogSection';

const Blog = () => {
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            {/* Main title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-bold font-barlow-condensed uppercase tracking-wider break-words px-2">
              BLOG
            </h1>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-pian-red mx-auto mb-6"></div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-bold font-barlow-condensed leading-relaxed">
              Dicas, novidades e informações especializadas sobre nutrição animal
            </p>
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <BlogSection />

      {/* Newsletter */}
      <section className="py-16 bg-pian-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold text-white mb-4 font-barlow-condensed break-words px-2">
            RECEBA NOSSAS NOVIDADES
          </h2>
          <p className="text-lg text-gray-300 mb-8 font-bold font-barlow-condensed">
            Assine nossa newsletter e receba dicas exclusivas sobre nutrição animal
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 bg-white text-pian-black border-0 focus:outline-none focus:ring-2 focus:ring-pian-yellow font-montserrat"
            />
            <button className="px-6 py-3 bg-pian-yellow text-pian-black hover:bg-pian-yellow-dark transition-all duration-300 shadow-md hover:shadow-lg font-medium font-montserrat">
              Assinar
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mt-4 font-bold font-barlow-condensed">
            Não enviamos spam. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;