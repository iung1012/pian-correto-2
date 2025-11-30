import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Dog, Cat, Fish, Package, Cookie, X } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { supabase, Product } from '../lib/supabase';

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Cachorros');
  const [selectedLine, setSelectedLine] = useState('Super Premium');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Linhas de ração baseadas na categoria selecionada (sempre na ordem hierárquica)
  const getAvailableLines = (category: string) => {
    if (category === 'Cachorros' || category === 'Gatos') {
      return [
        { name: 'Super Premium', color: 'bg-gray-600 text-white' },
        { name: 'Premium Especial', color: 'bg-gray-600 text-white' },
        { name: 'Premium', color: 'bg-gray-600 text-white' },
        { name: 'Standard', color: 'bg-gray-600 text-white' },
      ];
    }
    // Peixes, Alimentos Úmidos e Snacks não têm filtros de linha
    return [];
  };

  // Função para obter a primeira linha disponível para uma categoria
  const getFirstAvailableLine = (category: string): string => {
    const lines = getAvailableLines(category);
    return lines.length > 0 ? lines[0].name : '';
  };

  useEffect(() => {
    const categoryParam = new URLSearchParams(location.search).get('category');
    if (categoryParam) {
      const categoryMap: { [key: string]: string } = {
        'Gatos': 'Gatos',
        'Cachorros': 'Cachorros',
        'Cães': 'Cachorros',
        'Peixes': 'Peixes',
        'Alimentos Úmidos': 'Alimentos Úmidos',
        'Snacks': 'Snacks'
      };

      const mappedCategory = categoryMap[categoryParam] || 'Cachorros';
      setSelectedCategory(mappedCategory);
      setSelectedLine(getFirstAvailableLine(mappedCategory));
    }
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      // Adicionar timestamp para evitar cache
      const timestamp = new Date().getTime();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const productList = products;

  // Categorias principais
  const mainCategories = [
    { name: 'Cachorros', icon: <Dog className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' },
    { name: 'Gatos', icon: <Cat className="h-4 w-4" />, color: 'bg-green-100 text-green-800' },
    { name: 'Alimentos Úmidos', icon: <Package className="h-4 w-4" />, color: 'bg-pink-100 text-pink-800' },
    { name: 'Snacks', icon: <Cookie className="h-4 w-4" />, color: 'bg-amber-100 text-amber-800' },
    { name: 'Peixes', icon: <Fish className="h-4 w-4" />, color: 'bg-teal-100 text-teal-800' },
  ];

  // Filtrar produtos
  const getCategoryFilteredProducts = () => {
    return products.filter(product => {
      const matchesSearch = searchTerm ? 
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.description?.toLowerCase().includes(searchTerm.toLowerCase())) : 
        true;

      // Se não há categoria selecionada, retorna todos os produtos que correspondem à busca
      if (!selectedCategory) {
        return matchesSearch;
      }

      let matchesCategory = false;

      if (selectedCategory === 'Cachorros') {
        // Excluir alimentos úmidos (sachê e enlatado/patê) da categoria Cachorros
        matchesCategory = product.category === 'Cães' && 
                         product.type !== 'Alimento Úmido' &&
                         product.line !== 'Sachê' &&
                         product.line !== 'Enlatado';
      } else if (selectedCategory === 'Gatos') {
        // Excluir alimentos úmidos da categoria Gatos também
        matchesCategory = product.category === 'Gatos' && 
                         product.type !== 'Alimento Úmido' &&
                         product.line !== 'Sachê' &&
                         product.line !== 'Enlatado';
      } else if (selectedCategory === 'Peixes') {
        matchesCategory = product.category === 'Peixes';
      } else if (selectedCategory === 'Alimentos Úmidos') {
        matchesCategory = product.type === 'Alimento Úmido' || 
                         product.line === 'Sachê' || 
                         product.line === 'Enlatado';
      } else if (selectedCategory === 'Snacks') {
        matchesCategory = product.type === 'Snack';
      }

      return matchesSearch && matchesCategory;
    });
  };

  const categoryFilteredProducts = getCategoryFilteredProducts();

  // Verificar se existe algum produto na linha selecionada
  const hasProductsInSelectedLine = categoryFilteredProducts.some(
    product => product.classification === selectedLine
  );

  const filteredProducts = categoryFilteredProducts.filter(product => {
    // Se não há linha selecionada ou se a linha selecionada não tem produtos, mostra todos
    if (!selectedLine || !hasProductsInSelectedLine) {
      return true;
    }
    return product.classification === selectedLine;
  });

  const classificationOrder = { 'Super Premium': 1, 'Premium Especial': 2, 'Premium': 3, 'Standard': 4 };
  const lineOrder = { 'Sachê': 1, 'Enlatado': 2 };
  const sortedProducts = filteredProducts.sort((a, b) => {
    const sortOrderA = a.sort_order ?? 9999;
    const sortOrderB = b.sort_order ?? 9999;

    if (sortOrderA !== sortOrderB) {
      return sortOrderA - sortOrderB;
    }

    const priorityA = a.display_priority || 2;
    const priorityB = b.display_priority || 2;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const lineOrderA = lineOrder[a.line as keyof typeof lineOrder] || 999;
    const lineOrderB = lineOrder[b.line as keyof typeof lineOrder] || 999;
    if (lineOrderA !== lineOrderB) {
      return lineOrderA - lineOrderB;
    }

    const orderA = classificationOrder[a.classification as keyof typeof classificationOrder] || 5;
    const orderB = classificationOrder[b.classification as keyof typeof classificationOrder] || 5;
    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.name.localeCompare(b.name);
  });

  // Função para gerar sugestões de autocomplete
  const getSuggestions = (term: string): Product[] => {
    if (term.length < 2) return [];
    
    const termLower = term.toLowerCase();
    return products
      .filter(product => {
        const matchesName = product.name.toLowerCase().includes(termLower);
        const matchesDescription = product.description?.toLowerCase().includes(termLower);
        return matchesName || matchesDescription;
      })
      .slice(0, 5); // Limitar a 5 sugestões
  };

  // Atualizar sugestões quando o termo de busca muda
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const newSuggestions = getSuggestions(searchTerm);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado nas sugestões
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionSelect = (product: Product) => {
    setSearchTerm(product.name);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    searchInputRef.current?.blur();
    
    // Filtrar para mostrar apenas o produto selecionado
    setSelectedCategory('');
    setSelectedLine('');
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);

    // Filtrar produtos da nova categoria
    const newCategoryProducts = products.filter(product => {
      if (category === 'Cachorros') {
        // Excluir alimentos úmidos (sachê e enlatado/patê) da categoria Cachorros
        return product.category === 'Cães' && 
               product.type !== 'Alimento Úmido' &&
               product.line !== 'Sachê' &&
               product.line !== 'Enlatado';
      } else if (category === 'Gatos') {
        // Excluir alimentos úmidos da categoria Gatos também
        return product.category === 'Gatos' && 
               product.type !== 'Alimento Úmido' &&
               product.line !== 'Sachê' &&
               product.line !== 'Enlatado';
      } else if (category === 'Peixes') {
        return product.category === 'Peixes';
      } else if (category === 'Alimentos Úmidos') {
        return product.type === 'Alimento Úmido' || 
               product.line === 'Sachê' || 
               product.line === 'Enlatado';
      } else if (category === 'Snacks') {
        return product.type === 'Snack';
      }
      return false;
    });

    // Encontrar a primeira linha disponível que tem produtos na hierarquia
    const hierarchy = ['Super Premium', 'Premium Especial', 'Premium', 'Standard'];
    const availableLines = getAvailableLines(category).map(line => line.name);

    let firstLineWithProducts = '';
    for (const line of hierarchy) {
      if (availableLines.includes(line) && newCategoryProducts.some(p => p.classification === line)) {
        firstLineWithProducts = line;
        break;
      }
    }

    setSelectedLine(firstLineWithProducts || '');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search with Autocomplete - Modern Design */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-in-up">
          <div className="relative group">
            {/* Glow effect on focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pian-red via-pian-yellow to-pian-red rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300"></div>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400 z-10 transition-colors duration-200 group-focus-within:text-pian-red" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar rações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3.5 sm:py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-pian-black focus:outline-none focus:ring-2 focus:ring-pian-red/50 focus:border-pian-red shadow-lg hover:shadow-xl transition-all duration-300 font-bold font-barlow-condensed text-base sm:text-lg rounded-2xl"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowSuggestions(false);
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pian-red transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-gray-100"
                  aria-label="Limpar busca"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Autocomplete Suggestions - Modern Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-3 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto animate-fade-in-up"
                style={{ animationDelay: '0.1s' }}
              >
                {suggestions.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionSelect(product)}
                    className={`w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-pian-red/10 hover:to-pian-yellow/10 transition-all duration-200 border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl ${
                      index === selectedSuggestionIndex ? 'bg-gradient-to-r from-pian-red/20 to-pian-yellow/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-lg p-1.5 border border-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-pian-black font-barlow-condensed truncate text-sm sm:text-base">
                          {product.name}
                        </p>
                        {product.description && (
                          <p className="text-xs sm:text-sm text-gray-600 truncate mt-0.5">
                            {product.description.substring(0, 50)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Category Filter - Modern Design */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 animate-fade-in-up px-2" style={{ animationDelay: '0.2s' }}>
          {mainCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => handleCategorySelect(category.name)}
              className={`group relative flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 transition-all duration-300 font-bold font-barlow-condensed border-2 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-pian-red to-red-600 text-white shadow-xl scale-105 border-pian-red'
                  : 'bg-white text-pian-black border-gray-200 hover:border-pian-red hover:bg-gray-50 hover:scale-105 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Shimmer effect on active */}
              {selectedCategory === category.name && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
              
              {/* Icon */}
              <span className={`relative z-10 transition-transform duration-300 ${selectedCategory === category.name ? 'text-white' : 'text-gray-600 group-hover:text-pian-red'} ${selectedCategory === category.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                {category.icon && category.icon}
              </span>
              
              {/* Text */}
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Line Filter - Modern Design */}
        {getAvailableLines(selectedCategory).length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 animate-fade-in-up px-2" style={{ animationDelay: '0.3s' }}>
            {getAvailableLines(selectedCategory).map((line) => (
              <button
                key={line.name}
                onClick={() => setSelectedLine(line.name)}
                className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 transition-all duration-300 font-bold font-barlow-condensed border-2 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl overflow-hidden whitespace-nowrap ${
                  selectedLine === line.name
                    ? 'bg-gradient-to-r from-pian-red to-red-600 text-white shadow-lg scale-105 border-pian-red'
                    : 'bg-white text-pian-black border-gray-200 hover:border-pian-red hover:bg-gray-50 hover:scale-105 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Shimmer effect on active */}
                {selectedLine === line.name && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
                
                <span className="relative z-10">{line.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pian-red"></div>
            </div>
            ) : sortedProducts.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
               {sortedProducts.map((product, index) => (
                 <div
                   key={product.id}
                   className="animate-fade-in-up"
                   style={{ animationDelay: `${index * 0.05}s` }}
                 >
                   <ProductCard
                     {...product}
                     onViewDetails={() => handleViewDetails(product)}
                   />
                 </div>
               ))}
             </div>
          ) : (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-pian-black/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-pian-black mb-2 font-bold font-barlow-condensed">Nenhum produto encontrado</h3>
              <p className="text-pian-black/70 mb-4 font-bold font-barlow-condensed">
                {`Não encontramos produtos para "${selectedCategory}"${selectedLine ? ` na linha "${selectedLine}"` : ''}`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLine('');
                }}
                className="px-8 py-4 bg-pian-red text-white hover:bg-red-700 font-bold font-barlow-condensed shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ProductSection;