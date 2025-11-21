import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Crown, Gem } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProductLineCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slideData = [
    {
      title: "Linha Super Premium",
      description: "Prioritá - O máximo em tecnologia nutricional",
      category: "Super Premium",
      icon: <Gem className="h-6 w-6" />,
      gradient: "from-yellow-400 to-yellow-500",
      src: "https://i.postimg.cc/fL0kBkCY/O-que-ha-de-mais-avanc-ado-em-nutric-a-o-animal.png",
    },
    {
      title: "Linha Premium Especial",
      description: "Máxima nutrição com fórmulas especiais",
      category: "Premium Especial",
      icon: <Crown className="h-6 w-6" />,
      gradient: "from-orange-500 to-orange-600",
      src: "https://i.postimg.cc/tR15P5HM/3.png",
    },
    {
      title: "Linha Premium",
      description: "Nutrição superior com ingredientes premium",
      category: "Premium",
      icon: <Award className="h-6 w-6" />,
      gradient: "from-red-600 to-red-700",
      src: "https://i.postimg.cc/NMnKBmJy/1.png",
    },
    {
      title: "Linha Standard",
      description: "Qualidade premium com excelente custo-benefício",
      category: "Standard",
      icon: <Star className="h-6 w-6" />,
      gradient: "from-gray-600 to-gray-700",
      src: "/banner-pian-feed.png",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);

  return (
    <section className="py-12 section-gray-light section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-[75px] font-black text-pian-black mb-4 font-barlow-condensed uppercase tracking-wider">NOSSAS LINHAS</h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-300">
          {slideData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="relative h-[500px] sm:h-[600px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.src})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
                </div>

                <div className="relative z-10 h-full flex items-center">
                  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-white space-y-6">
                      <div className={`inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r ${slide.gradient} rounded-full`}>
                        {slide.icon}
                        <span className="font-black font-montserrat uppercase tracking-wider">{slide.title.toUpperCase()}</span>
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-montserrat text-white uppercase tracking-wider">
                        {slide.description.toUpperCase()}
                      </h3>
                      
                      <button
                        onClick={() => navigate(`/products?category=${encodeURIComponent(slide.category)}`)}
                        className="inline-flex items-center px-8 py-4 bg-pian-yellow text-pian-black hover:bg-pian-yellow-dark transition-all duration-300 transform hover:scale-105 font-bold font-montserrat shadow-lg"
                      >
                        EXPLORAR {slide.title.toUpperCase()}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pian-yellow hover:bg-pian-yellow-dark p-3 transition-all duration-300 z-20 shadow-lg">
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pian-yellow hover:bg-pian-yellow-dark p-3 transition-all duration-300 z-20 shadow-lg">
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {slideData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-pian-yellow scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 relative font-bold font-barlow-condensed">
          {/* Linha vermelha decorativa */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-pian-red"></div>
          {slideData.map((slide, index) => (
            <Link
              key={index}
              to={`/products?category=${encodeURIComponent(slide.category)}`}
              className={`p-4 transition-all duration-300 transform hover:-translate-y-2 relative ${
                index === currentSlide ? 'bg-pian-yellow shadow-2xl scale-105' : 'bg-white hover:bg-gray-50'
              }`}
              style={{
                backgroundImage: index === currentSlide 
                  ? 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                  : 'radial-gradient(circle at 30% 40%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.02) 0%, transparent 50%)',
                boxShadow: index === currentSlide 
                  ? '0 10px 20px rgba(253, 213, 40, 0.2), 0 4px 8px rgba(0, 0, 0, 0.05)'
                  : '0 4px 12px rgba(0, 0, 0, 0.04), 0 2px 5px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div className="text-center space-y-2">
                <h4 className={`font-bold font-montserrat text-sm ${
                  index === currentSlide ? 'text-pian-black' : 'text-gray-900'
                }`}>{slide.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductLineCarousel;