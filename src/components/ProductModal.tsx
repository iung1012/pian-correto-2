import React, { useState, useEffect, useRef } from 'react';
import { X, Package, Award, Beef, Activity, ChevronLeft, ChevronRight, Loader2, ChevronUp } from 'lucide-react';

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
  const [imageLoading, setImageLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Animações e efeitos
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Navegação por teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      const hasGuiaAlimentar = product.classification !== 'Linha Peixes' &&
        product.classification !== 'Linha Snacks' &&
        product.classification !== 'Alimentos Úmidos' &&
        product.type !== 'Alimento Úmido' &&
        !product.name.includes('PRÓPEIXES') &&
        !product.name.includes('PROPEIXES');
      
      if (hasGuiaAlimentar) {
        if (e.key === 'ArrowLeft') {
          setCurrentSlide((prev) => (prev - 1 + guiaAlimentarImages.length) % guiaAlimentarImages.length);
        }
        if (e.key === 'ArrowRight') {
          setCurrentSlide((prev) => (prev + 1) % guiaAlimentarImages.length);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, product]);

  // Scroll to top quando produto muda
  useEffect(() => {
    if (contentRef.current && isOpen) {
      contentRef.current.scrollTop = 0;
      setImageLoading(true);
    }
  }, [product.id, isOpen]);

  // Detectar scroll para mostrar botão "voltar ao topo"
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowScrollTop(contentRef.current.scrollTop > 300);
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

    const enriquecimentoMatch = description.match(/##\s*ENRIQUECIMENTO[\s\S]*?\n([\s\S]*?)(?=##\s*NÍVEIS|##\s*DIFERENCIAIS|$)/i);
    if (enriquecimentoMatch) {
      let enriquecimento = enriquecimentoMatch[1].trim();
      if (enriquecimento.includes('|')) {
        enriquecimento = enriquecimento.split('|').map(item => item.trim()).filter(item => item).join('\n');
      }
      sections.enriquecimento = enriquecimento;
    }

    const niveisMatch = description.match(/##\s*NÍVEIS DE GARANTIA[\s\S]*?\n([\s\S]*?)(?=##\s*DIFERENCIAIS|##\s*DESCRIÇÃO|$)/i);
    if (niveisMatch) {
      let niveis = niveisMatch[1].trim();
      niveis = niveis.replace(/^\d+\.\s*/, '');
      if (niveis.includes('|')) {
        niveis = niveis.split('|').map(item => item.trim()).filter(item => item).join('\n');
      }
      sections.niveis = niveis;
    }

    const diferenciaisMatch = description.match(/##\s*DIFERENCIAIS\s*([\s\S]*?)$/i);
    if (diferenciaisMatch) {
      sections.diferenciais = diferenciaisMatch[1].trim();
    }

    return sections;
  };

  const formatNiveisGarantia = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map((line, index) => {
      line = line.trim();
      if (!line) return null;
      
      return (
        <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-600 mt-2"></span>
          <span className="text-gray-800 text-xs sm:text-sm leading-relaxed flex-1 font-barlow-condensed">{line}</span>
        </div>
      );
    });
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
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-600 mt-2"></span>
                <span className="text-gray-800 text-xs sm:text-sm leading-relaxed flex-1 font-barlow-condensed">{item}</span>
              </div>
            ))}
          </div>
        );
      }

      if (isTechnicalSection) {
        return (
          <li key={index} className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg mb-2 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-600 mt-2"></span>
            <span className="text-gray-800 text-xs sm:text-sm leading-relaxed flex-1 font-barlow-condensed">{line}</span>
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
    <div 
      className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className={`bg-white max-w-7xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200 relative transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 z-30 p-2 sm:p-3 bg-white/90 hover:bg-white text-gray-800 hover:text-pian-red transition-all duration-300 group rounded-full shadow-lg hover:scale-110 border border-gray-200"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Hero Header - Modern Design */}
        <div className="bg-gradient-to-br from-pian-black via-gray-900 to-pian-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FDD528 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #FDD528 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10 px-4 sm:px-8 py-6 sm:py-8 text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-3 sm:mb-4">
              <span className="inline-block bg-gray-600/90 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider font-barlow-condensed rounded-full">
                {product.category}
              </span>
              {product.type && (
                <span className="inline-block bg-gray-600/90 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider font-barlow-condensed rounded-full">
                  {product.type}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 font-barlow-condensed uppercase tracking-wider leading-tight px-2">
              {product.name}
            </h1>

            <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-pian-red mx-auto"></div>
          </div>
        </div>

        {/* Content Area - Modern Grid Layout */}
        <div 
          ref={contentRef}
          className="overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-200px)] bg-gradient-to-b from-white to-gray-50 scroll-smooth"
        >
          <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
            {/* Product Image - Modern Card */}
            <div className="max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in-up">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-8 lg:p-12 border border-gray-100">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <Loader2 className="h-12 w-12 text-gray-400 animate-spin" />
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out ${
                        imageLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                      onLoad={() => setImageLoading(false)}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/fallback-product.svg';
                        setImageLoading(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Information Sections - Modern Grid */}
            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
              {!hasAnyContent && (
                <div className="text-center py-16 animate-fade-in-up">
                  <p className="text-gray-600 text-lg font-barlow-condensed">
                    Informações detalhadas em breve.
                  </p>
                </div>
              )}

              {/* Diferenciais - FIRST SECTION */}
              {sections.isStructured && sections.diferenciais && (
                <div className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                    <div className="bg-gradient-to-r from-gray-600 via-gray-650 to-gray-700 px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white font-barlow-condensed uppercase tracking-wide">
                          Diferenciais
                        </h2>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 bg-white">
                      <ul className="space-y-3 sm:space-y-4 text-center">
                        {formatText(sections.diferenciais, true)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Simple Description Display */}
              {!sections.isStructured && sections.simpleDescription && (
                <div className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                    <div className="bg-gradient-to-r from-gray-600 via-gray-650 to-gray-700 px-4 sm:px-6 py-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white font-barlow-condensed uppercase">
                          Sobre o Produto
                        </h2>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
                      <div className="text-gray-800 leading-relaxed text-sm sm:text-base">
                        {formatText(sections.simpleDescription)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid Layout para seções técnicas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Descrição */}
                {sections.isStructured && sections.descricao && (
                  <div className="group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 h-full">
                      <div className="bg-gradient-to-r from-gray-600 via-gray-650 to-gray-700 px-4 sm:px-6 py-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="relative flex items-center justify-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <h2 className="text-lg sm:text-xl font-bold text-white font-barlow-condensed uppercase">
                            Descrição
                          </h2>
                        </div>
                      </div>

                      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
                        <div className="text-gray-800 leading-relaxed text-sm sm:text-base">
                          {formatText(sections.descricao)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Composição */}
                {sections.isStructured && sections.composicao && (
                  <div className="group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 h-full">
                      <div className="bg-gradient-to-r from-gray-700 via-gray-750 to-gray-800 px-4 sm:px-6 py-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="relative flex items-center justify-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Beef className="h-5 w-5 text-white" />
                          </div>
                          <h2 className="text-lg sm:text-xl font-bold text-white font-barlow-condensed uppercase">
                            Composição Básica
                          </h2>
                        </div>
                      </div>

                      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
                        <div className="text-gray-800 text-sm leading-relaxed">
                          {formatText(sections.composicao)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enriquecimento */}
              {sections.isStructured && sections.enriquecimento && (
                <div className="group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                    <div className="bg-gradient-to-r from-gray-700 via-gray-750 to-gray-800 px-4 sm:px-6 py-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white font-barlow-condensed uppercase">
                          Enriquecimento Mínimo por KG
                        </h2>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formatNiveisGarantia(sections.enriquecimento)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Níveis de Garantia */}
              {sections.isStructured && sections.niveis && (
                <div className="group animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                    <div className="bg-gradient-to-r from-gray-700 via-gray-750 to-gray-800 px-4 sm:px-6 py-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white font-barlow-condensed uppercase">
                          Níveis de Garantia
                        </h2>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formatNiveisGarantia(sections.niveis)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Guia Alimentar Section */}
              {product.classification !== 'Linha Peixes' &&
               product.classification !== 'Linha Snacks' &&
               product.classification !== 'Alimentos Úmidos' &&
               product.type !== 'Alimento Úmido' &&
               !product.name.includes('PRÓPEIXES') &&
               !product.name.includes('PROPEIXES') && (
                <div className="group animate-fade-in-up mt-8" style={{ animationDelay: '0.6s' }}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                    <div className="bg-gradient-to-r from-gray-600 via-gray-650 to-gray-700 px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white font-barlow-condensed uppercase tracking-wide">
                          Guia Alimentar
                        </h2>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
                      <p className="text-justify text-gray-800 text-sm sm:text-base leading-relaxed mb-6 font-semibold font-barlow-condensed">
                        Toda introdução de um novo alimento deve ser gradual e crescente. Para uma perfeita adaptação do sistema digestório sugerimos o seguinte programa:
                      </p>

                      {/* Carousel */}
                      <div className="relative group/carousel">
                        <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200">
                          <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-50 to-white">
                            <img
                              src={guiaAlimentarImages[currentSlide]}
                              alt={`Guia Alimentar - Etapa ${currentSlide + 1}`}
                              className="w-full h-full object-contain transition-opacity duration-300"
                            />
                          </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                          onClick={prevSlide}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10 opacity-0 group-hover/carousel:opacity-100 border border-gray-200"
                          aria-label="Anterior"
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>

                        <button
                          onClick={nextSlide}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10 opacity-0 group-hover/carousel:opacity-100 border border-gray-200"
                          aria-label="Próximo"
                        >
                          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                          {guiaAlimentarImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                  ? 'bg-gray-700 w-8'
                                  : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                              aria-label={`Ir para slide ${index + 1}`}
                            />
                          ))}
                        </div>

                        {/* Counter */}
                        <div className="text-center mt-4 text-sm text-gray-600 font-barlow-condensed font-semibold">
                          Etapa {currentSlide + 1} de {guiaAlimentarImages.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-30 p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-slide-up"
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
