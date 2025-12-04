import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Loader2, 
  AlertCircle, 
  FileText, 
  Package, 
  TrendingUp,
  BarChart3,
  Filter,
  X,
  CheckCircle2,
  XCircle,
  Sparkles,
  Settings,
  List
} from 'lucide-react';
import ProductForm from '../components/ProductForm';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
      showToast('Erro ao carregar produtos', 'error');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(products.filter(p => p.id !== id));
      setDeleteProduct(null);
      showToast('Produto excluído com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao excluir produto', 'error');
      console.error('Error deleting product:', error);
    }
  }

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function handleAdd() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function handleFormClose() {
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  function handleFormSuccess(message: string) {
    showToast(message, 'success');
    fetchProducts();
    handleFormClose();
  }

  const classifications = ['Todos', 'Standard', 'Premium', 'Premium Especial', 'Super Premium'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.classification === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: products.length,
    standard: products.filter(p => p.classification === 'Standard').length,
    premium: products.filter(p => p.classification === 'Premium').length,
    premiumEspecial: products.filter(p => p.classification === 'Premium Especial').length,
    superPremium: products.filter(p => p.classification === 'Super Premium').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 p-6 lg:p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-pian-red to-red-600 rounded-xl shadow-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2 font-barlow-condensed uppercase tracking-wider flex items-center gap-3">
                  Painel Admin
                  <Sparkles className="h-6 w-6 text-pian-yellow" />
                </h1>
                <p className="text-gray-600 font-barlow-condensed text-lg">
                  Gerencie o catálogo de produtos da Pian Alimentos
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/options"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold font-barlow-condensed border-2 border-indigo-700"
              >
                <List className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span>Gerenciar Opções</span>
              </Link>
              <Link
                to="/admin/update-nutrition"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pian-yellow to-yellow-400 text-pian-black rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold font-barlow-condensed border-2 border-yellow-300"
              >
                <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span>Atualizar Nutrição</span>
              </Link>
              <button
                onClick={handleAdd}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pian-red to-red-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold font-barlow-condensed border-2 border-red-700"
              >
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                <span>Novo Produto</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="group bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-red-700 font-barlow-condensed uppercase tracking-wider">Total</div>
                <Package className="h-5 w-5 text-red-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-red-900 font-barlow-condensed">{stats.total}</div>
              <div className="text-xs text-red-600 font-barlow-condensed mt-1">Produtos</div>
            </div>
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-blue-700 font-barlow-condensed uppercase tracking-wider">Standard</div>
                <BarChart3 className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-blue-900 font-barlow-condensed">{stats.standard}</div>
              <div className="text-xs text-blue-600 font-barlow-condensed mt-1">Produtos</div>
            </div>
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-orange-700 font-barlow-condensed uppercase tracking-wider">Premium</div>
                <TrendingUp className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-orange-900 font-barlow-condensed">{stats.premium}</div>
              <div className="text-xs text-orange-600 font-barlow-condensed mt-1">Produtos</div>
            </div>
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-purple-700 font-barlow-condensed uppercase tracking-wider">Premium Especial</div>
                <Sparkles className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-purple-900 font-barlow-condensed">{stats.premiumEspecial}</div>
              <div className="text-xs text-purple-600 font-barlow-condensed mt-1">Produtos</div>
            </div>
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-yellow-700 font-barlow-condensed uppercase tracking-wider">Super Premium</div>
                <TrendingUp className="h-5 w-5 text-yellow-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-yellow-900 font-barlow-condensed">{stats.superPremium}</div>
              <div className="text-xs text-yellow-600 font-barlow-condensed mt-1">Produtos</div>
            </div>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-pian-red to-red-600 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 font-barlow-condensed uppercase">Filtros e Busca</h2>
                <p className="text-sm text-gray-500 font-barlow-condensed">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-pian-red transition-colors" />
              <input
                type="text"
                placeholder="Pesquisar produtos por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-pian-red focus:bg-white focus:ring-2 focus:ring-pian-red/20 transition-all font-barlow-condensed placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {classifications.map(classification => (
                <button
                  key={classification}
                  onClick={() => setSelectedCategory(classification)}
                  className={`group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold font-barlow-condensed border-2 transition-all duration-300 ${
                    selectedCategory === classification
                      ? 'bg-gradient-to-r from-pian-red to-red-600 text-white border-red-700 shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-pian-red hover:bg-red-50 hover:scale-105'
                  }`}
                >
                  {selectedCategory === classification && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  <span>{classification}</span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <Loader2 className="h-16 w-16 animate-spin text-pian-red mb-4" />
              <p className="text-gray-600 font-barlow-condensed font-bold">Carregando produtos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <AlertCircle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-700 mb-2 font-barlow-condensed uppercase">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 font-barlow-condensed mb-6">
                Ajuste os filtros ou adicione novos produtos
              </p>
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pian-red to-red-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold font-barlow-condensed"
              >
                <Plus className="h-5 w-5" />
                Adicionar Primeiro Produto
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-black text-gray-900 font-barlow-condensed uppercase text-xs tracking-wider">Imagem</th>
                    <th className="text-left py-4 px-6 font-black text-gray-900 font-barlow-condensed uppercase text-xs tracking-wider">Nome</th>
                    <th className="text-left py-4 px-6 font-black text-gray-900 font-barlow-condensed uppercase text-xs tracking-wider">Animal</th>
                    <th className="text-left py-4 px-6 font-black text-gray-900 font-barlow-condensed uppercase text-xs tracking-wider">Tipo</th>
                    <th className="text-left py-4 px-6 font-black text-gray-900 font-barlow-condensed uppercase text-xs tracking-wider">Classificação</th>
                    <th className="text-left py-4 px-6 font-black text-gray-900 font-barlow-condensed uppercase text-xs tracking-wider">Linha</th>
                    <th className="text-right py-4 px-6 font-black text-gray-900 font-barlow-condensed uppercase text-xs tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 group">
                      <td className="py-5 px-6">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 group-hover:border-pian-red transition-all shadow-sm group-hover:shadow-md"
                            onError={(e) => {
                              e.currentTarget.src = '/fallback-product.svg';
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="font-black text-gray-900 font-barlow-condensed text-base mb-1">{product.name}</div>
                        <div className="text-sm text-gray-500 font-barlow-condensed line-clamp-2 max-w-xs">{product.description}</div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg font-bold font-barlow-condensed text-xs border border-blue-200">
                          <Package className="h-3.5 w-3.5" />
                          {product.category}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg font-bold font-barlow-condensed text-xs border border-purple-200">
                          {product.type}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-800 rounded-lg font-bold font-barlow-condensed text-xs border border-orange-200">
                          <Sparkles className="h-3.5 w-3.5" />
                          {product.classification || 'Standard'}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        {product.line ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-lg font-bold font-barlow-condensed text-xs border border-green-200">
                            {product.line}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-barlow-condensed text-sm">-</span>
                        )}
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="group p-2.5 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-xl border-2 border-blue-300 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            title="Editar produto"
                          >
                            <Edit className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => setDeleteProduct(product)}
                            className="group p-2.5 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl border-2 border-red-300 hover:border-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            title="Excluir produto"
                          >
                            <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {deleteProduct && (
        <DeleteConfirmModal
          product={deleteProduct}
          onConfirm={() => handleDelete(deleteProduct.id)}
          onCancel={() => setDeleteProduct(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border-2 backdrop-blur-sm ${
            toast.type === 'success'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800'
              : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-800'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            )}
            <p className="font-bold font-barlow-condensed text-base">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
