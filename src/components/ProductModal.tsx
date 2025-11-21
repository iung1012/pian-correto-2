import React, { useState } from 'react';
import { X, Package, Award, Beef, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductModalProps {
  product: {
    id: number;
    name: string;
    image: string;
    description: string;
    category: string;
    type?: string;
    classification?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const guiaAlimentarImages = [
    'https://i.postimg.cc/xTMpWBLY/1.png',
    'https://i.postimg.cc/WbgYQxgC/3.png',
    'https://i.postimg.cc/CMW6rwnS/4.png',
    'https://i.postimg.cc/3JmfPzm6/5.png',
    'https://i.postimg.cc/qB9ZDp6p/6.png',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % guiaAlimentarImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + guiaAlimentarImages.length) % guiaAlimentarImages.length);
  };

  if (!isOpen) return null;

  const parseDescription = (description: string) => {
    if (!description) {
      return {
        descricao: '',
        composicao: '',
        enriquecimento: '',
        niveis: '',
        diferenciais: '',
        isStructured: false,
        simpleDescription: ''
      };
    }

    const hasStructuredSections = /##\s*(DESCRIÇÃO|COMPOSIÇÃO|ENRIQUECIMENTO|NÍVEIS|DIFERENCIAIS)/i.test(description);

    if (!hasStructuredSections) {
      return {
        descricao: '',
        composicao: '',
        enriquecimento: '',
        niveis: '',
        diferenciais: '',
        isStructured: false,
        simpleDescription: description.trim()
      };
    }

    const sections = {
      descricao: '',
      composicao: '',
      enriquecimento: '',
      niveis: '',
      diferenciais: '',
      isStructured: true,
      simpleDescription: ''
    };

    const descMatch = description.match(/##\s*DESCRIÇÃO\s*([\s\S]*?)(?=##|$)/i);
    if (descMatch) {
      sections.descricao = descMatch[1].trim();
    }

    const composicaoMatch = description.match(/##\s*COMPOSIÇÃO BÁSICA\s*([\s\S]*?)(?=##|$)/i);
    if (composicaoMatch) {
      sections.composicao = composicaoMatch[1].trim();
    }

    const enriquecimentoMatch = description.match(/##\s*ENRIQUECIMENTO MÍNIMO POR KG\s*([\s\S]*?)(?=##|$)/i);
    if (enriquecimentoMatch) {
      sections.enriquecimento = enriquecimentoMatch[1].trim();
    }

    const niveisMatch = description.match(/##\s*NÍVEIS DE GARANTIA\s*([\s\S]*?)(?=##|$)/i);
    if (niveisMatch) {
      sections.niveis = niveisMatch[1].trim();
    }

    const diferenciaisMatch = description.match(/##\s*DIFERENCIAIS\s*([\s\S]*?)$/i);
    if (diferenciaisMatch) {
      sections.diferenciais = diferenciaisMatch[1].trim();
    }

    return sections;
  };

  const formatText = (text: string, isDiferenciais: boolean = false, isTechnicalSection: boolean = false) => {
    return text.split('\n').map((line, index) => {
      line = line.trim();
      if (!line) return null;

      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={index} className="font-bold text-pian-black mt-4 mb-2 text-base">
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      }

      if (line.startsWith('- ') || line.startsWith('✓ ') || line.startsWith('•')) {
        return (
          <li
            key={index}
            className={`leading-relaxed ${isDiferenciais ? 'text-gray-900 text-base uppercase list-none' : 'ml-4 text-gray-800 text-sm'}`}
            style={isDiferenciais ? { fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: '700' } : undefined}
          >
            {line.replace(/^- |^✓ |^• /, '')}
          </li>
        );
      }

      if (line.startsWith('*')) {
        return (
          <p key={index} className="text-gray-600 italic text-xs mt-2">
            {line}
          </p>
        );
      }

      if (line.includes('|')) {
        const items = line.split('|').map(item => item.trim()).filter(item => item);
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg">
                <span className="text-pian-red font-bold text-xs">•</span>
                <span className="text-gray-800 text-xs leading-relaxed flex-1">{item}</span>
              </div>
            ))}
          </div>
        );
      }

      if (isTechnicalSection) {
        return (
          <li key={index} className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg mb-2">
            <span className="text-pian-red font-bold text-xs">•</span>
            <span className="text-gray-800 text-xs leading-relaxed flex-1">{line}</span>
          </li>
        );
      }

      return (
        <p key={index} className={`leading-relaxed mb-2 ${isDiferenciais ? 'text-gray-900 text-base' : 'text-gray-800 text-sm'}`}>
          {line}
        </p>
      );
    });
  };

  const sections = parseDescription(product.description || '');
  const hasAnyContent = sections.isStructured
    ? (sections.descricao || sections.composicao || sections.enriquecimento || sections.niveis || sections.diferenciais)
    : sections.simpleDescription;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl rounded-3xl border border-pian-yellow/20 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-pian-black/90 hover:bg-pian-red text-white transition-all duration-300 group rounded-full shadow-lg hover:scale-110"
          aria-label="Fechar"
        >
          <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Hero Header - Inspired by Distributors */}
        <div className="bg-pian-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FDD528 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #FDD528 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10 px-8 py-8 text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="inline-block bg-pian-yellow text-pian-black px-4 py-2 text-xs font-bold uppercase tracking-wider font-barlow-condensed">
                {product.category}
              </span>
              {product.type && (
                <span className="inline-block bg-pian-red text-white px-4 py-2 text-xs font-bold uppercase tracking-wider font-barlow-condensed">
                  {product.type}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider">
              {product.name}
            </h1>

            <div className="w-24 h-1 bg-pian-red mx-auto"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] bg-white">
          <div className="p-8 lg:p-12">
            {/* Product Image Card */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 bg-white">
                <div className="p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain mx-auto transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/fallback-product.svg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Information Sections */}
            <div className="max-w-5xl mx-auto space-y-6">
              {!hasAnyContent && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg font-barlow-condensed">
                    Informações detalhadas em breve.
                  </p>
                </div>
              )}

              {/* Diferenciais - FIRST SECTION */}
              {sections.isStructured && sections.diferenciais && (
                <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-pian-red to-red-700 px-6 py-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    <div className="flex items-center justify-center">
                      <Award className="h-7 w-7 text-white mr-3" />
                      <h2 className="text-2xl font-bold text-white font-barlow-condensed uppercase tracking-wide">
                        Diferenciais
                      </h2>
                    </div>
                  </div>

                  <div className="px-10 py-8 bg-white">
                    <ul className="space-y-3 text-center">
                      {formatText(sections.diferenciais, true)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Simple Description Display (for products without structured format) */}
              {!sections.isStructured && sections.simpleDescription && (
                <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-pian-yellow to-pian-yellow-dark px-6 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    <div className="flex items-center justify-center">
                      <Package className="h-6 w-6 text-pian-black mr-3" />
                      <h2 className="text-xl font-bold text-pian-black font-barlow-condensed uppercase">
                        Sobre o Produto
                      </h2>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-white">
                    <div className="text-gray-800 leading-relaxed">
                      {formatText(sections.simpleDescription)}
                    </div>
                  </div>
                </div>
              )}

              {/* Descrição */}
              {sections.isStructured && sections.descricao && (
                <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-pian-yellow to-pian-yellow-dark px-6 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    <div className="flex items-center justify-center">
                      <Award className="h-6 w-6 text-pian-black mr-3" />
                      <h2 className="text-xl font-bold text-pian-black font-barlow-condensed uppercase">
                        Descrição
                      </h2>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-white">
                    <div className="text-gray-800 leading-relaxed">
                      {formatText(sections.descricao)}
                    </div>
                  </div>
                </div>
              )}

              {/* Composição */}
              {sections.isStructured && sections.composicao && (
                <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    <div className="flex items-center justify-center">
                      <Beef className="h-6 w-6 text-white mr-3" />
                      <h2 className="text-xl font-bold text-white font-barlow-condensed uppercase">
                        Composição Básica
                      </h2>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-white">
                    <div className="text-gray-800 text-sm leading-relaxed">
                      {formatText(sections.composicao)}
                    </div>
                  </div>
                </div>
              )}

              {/* Enriquecimento */}
              {sections.isStructured && sections.enriquecimento && (
                <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    <div className="flex items-center justify-center">
                      <Activity className="h-6 w-6 text-white mr-3" />
                      <h2 className="text-xl font-bold text-white font-barlow-condensed uppercase">
                        Enriquecimento Mínimo por KG
                      </h2>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-white">
                    <ul className="space-y-1.5 text-sm text-gray-800 leading-relaxed">
                      {formatText(sections.enriquecimento, false, true)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Níveis de Garantia */}
              {sections.isStructured && sections.niveis && (
                <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    <div className="flex items-center justify-center">
                      <Package className="h-6 w-6 text-white mr-3" />
                      <h2 className="text-xl font-bold text-white font-barlow-condensed uppercase">
                        Níveis de Garantia
                      </h2>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-white">
                    <ul className="space-y-1.5 text-sm text-gray-800 leading-relaxed">
                      {formatText(sections.niveis, false, true)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Guia Alimentar Section - Only for relevant products */}
              {product.classification !== 'Linha Peixes' &&
               product.classification !== 'Linha Snacks' &&
               product.classification !== 'Alimentos Úmidos' &&
               product.type !== 'Alimento Úmido' &&
               !product.name.includes('PRÓPEIXES') &&
               !product.name.includes('PROPEIXES') && (
                <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 mt-8">
                  <div className="bg-gradient-to-r from-pian-yellow to-pian-yellow-dark px-6 py-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    <div className="flex items-center justify-center">
                      <Package className="h-7 w-7 text-pian-black mr-3" />
                      <h2 className="text-2xl font-bold text-pian-black font-barlow-condensed uppercase tracking-wide">
                        Guia Alimentar
                      </h2>
                    </div>
                  </div>

                  <div className="px-8 py-8 bg-white">
                    <p className="text-justify text-gray-800 text-base leading-relaxed mb-6 font-semibold">
                      Toda introdução de um novo alimento deve ser gradual e crescente. Para uma perfeita adaptação do sistema digestório sugerimos o seguinte programa:
                    </p>

                    {/* Carousel */}
                    <div className="relative">
                      <div className="overflow-hidden rounded-2xl shadow-lg">
                        <div className="relative aspect-[16/9] bg-white">
                          <img
                            src={guiaAlimentarImages[currentSlide]}
                            alt={`Guia Alimentar - Etapa ${currentSlide + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-pian-black/80 hover:bg-pian-red text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Anterior"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-pian-black/80 hover:bg-pian-red text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Próximo"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex justify-center gap-2 mt-6">
                        {guiaAlimentarImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${
                              index === currentSlide
                                ? 'bg-pian-red w-8'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Ir para slide ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Counter */}
                      <div className="text-center mt-4 text-sm text-gray-600 font-barlow-condensed">
                        Etapa {currentSlide + 1} de {guiaAlimentarImages.length}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
