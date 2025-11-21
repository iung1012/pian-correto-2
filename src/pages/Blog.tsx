import React from 'react';
import BlogSection from '../components/BlogSection';

const Blog = () => {
  const categories = [
    { name: 'Nutrição', count: 45, color: 'bg-pian-yellow text-pian-black' },
    { name: 'Saúde', count: 38, color: 'bg-pian-red text-white' },
    { name: 'Comportamento', count: 32, color: 'bg-pian-black text-white' },
    { name: 'Cuidados', count: 28, color: 'bg-pian-yellow text-pian-black' },
    { name: 'Filhotes', count: 25, color: 'bg-pian-red text-white' },
    { name: 'Dicas', count: 22, color: 'bg-pian-black text-white' }
  ];

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-bold font-barlow-condensed uppercase tracking-wider">
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

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-[75px] font-black text-gray-900 mb-3 font-barlow-condensed uppercase tracking-wider">
              CATEGORIAS
            </h2>
            <p className="text-gray-600 font-montserrat">
              Explore nossos artigos por categoria
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div key={index} className={`px-4 py-2 ${category.color} hover:opacity-90 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md`}>
                <span className="font-medium font-montserrat">{category.name}</span>
                <span className="ml-2 text-sm font-montserrat">({category.count})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <BlogSection />

      {/* Newsletter */}
      <section className="py-16 bg-pian-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[45px] font-bold text-white mb-4 font-barlow-condensed">
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