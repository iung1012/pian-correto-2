import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Dog, Cat, Fish, Package, Cookie } from 'lucide-react';
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
  const location = useLocation();

  // Linhas de ração baseadas na categoria selecionada (sempre na ordem hierárquica)
  const getAvailableLines = (category: string) => {
    if (category === 'Cachorros' || category === 'Gatos') {
      return [
        { name: 'Super Premium', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' },
        { name: 'Premium Especial', color: 'bg-orange-600 text-white' },
        { name: 'Premium', color: 'bg-gradient-to-r from-red-600 to-red-700 text-white' },
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
    { name: 'Peixes', icon: <Fish className="h-4 w-4" />, color: 'bg-teal-100 text-teal-800' },
    { name: 'Alimentos Úmidos', icon: <Package className="h-4 w-4" />, color: 'bg-pink-100 text-pink-800' },
    { name: 'Snacks', icon: <Cookie className="h-4 w-4" />, color: 'bg-amber-100 text-amber-800' },
  ];

  // Filtrar produtos
  const getCategoryFilteredProducts = () => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCategory = false;

      if (selectedCategory === 'Cachorros') {
        matchesCategory = product.category === 'Cães';
      } else if (selectedCategory === 'Gatos') {
        matchesCategory = product.category === 'Gatos';
      } else if (selectedCategory === 'Peixes') {
        matchesCategory = product.category === 'Peixes';
      } else if (selectedCategory === 'Alimentos Úmidos') {
        matchesCategory = product.type === 'Alimento Úmido';
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

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);

    // Filtrar produtos da nova categoria
    const newCategoryProducts = products.filter(product => {
      if (category === 'Cachorros') {
        return product.category === 'Cães';
      } else if (category === 'Gatos') {
        return product.category === 'Gatos';
      } else if (category === 'Peixes') {
        return product.category === 'Peixes';
      } else if (category === 'Alimentos Úmidos') {
        return product.type === 'Alimento Úmido';
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
        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar rações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-white border-2 border-pian-black/20 text-pian-black focus:outline-none focus:ring-2 focus:ring-pian-red focus:border-pian-red shadow-lg font-bold font-barlow-condensed text-lg"
            />
          </div>
        </div>

        {/* Main Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {mainCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategorySelect(category.name)}
              className={`flex items-center space-x-3 px-8 py-4 transition-all duration-300 font-bold font-barlow-condensed border-2 text-lg ${
                selectedCategory === category.name
                  ? 'bg-pian-red text-white shadow-xl scale-105 border-pian-red'
                  : 'bg-white text-pian-black border-pian-black/20 hover:bg-pian-black/5 hover:scale-105 hover:border-pian-red shadow-md'
              }`}
            >
              {category.icon && category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Line Filter */}
        {getAvailableLines(selectedCategory).length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {getAvailableLines(selectedCategory).map((line) => (
              <button
                key={line.name}
                onClick={() => setSelectedLine(line.name)}
                className={`px-6 py-3 transition-all duration-300 font-bold font-barlow-condensed border-2 ${
                  selectedLine === line.name
                    ? 'bg-pian-red text-white shadow-lg scale-105 border-pian-red'
                    : 'bg-white text-pian-black border-pian-black/20 hover:bg-pian-black/5 hover:scale-105 hover:border-pian-red'
                }`}
              >
                {line.name}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onViewDetails={() => handleViewDetails(product)}
                />
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