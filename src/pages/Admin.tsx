import React, { useState, useEffect } from 'react';
import { supabase, Product } from '../lib/supabase';
import { Plus, Edit, Trash2, Search, Loader2, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm border-2 border-gray-200 mb-8 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-black text-pian-black font-barlow-condensed uppercase">
                Painel Admin
              </h1>
              <p className="text-gray-600 mt-2 font-barlow-condensed">
                Gerencie o catálogo de produtos
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 bg-pian-red text-white font-bold font-barlow-condensed hover:bg-red-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Novo Produto
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 p-4 border-l-4 border-pian-red">
              <div className="text-sm text-gray-600 font-barlow-condensed">Total</div>
              <div className="text-2xl font-black text-pian-black font-barlow-condensed">{stats.total}</div>
            </div>
            <div className="bg-gray-50 p-4 border-l-4 border-blue-500">
              <div className="text-sm text-gray-600 font-barlow-condensed">Standard</div>
              <div className="text-2xl font-black text-pian-black font-barlow-condensed">{stats.standard}</div>
            </div>
            <div className="bg-gray-50 p-4 border-l-4 border-orange-500">
              <div className="text-sm text-gray-600 font-barlow-condensed">Premium</div>
              <div className="text-2xl font-black text-pian-black font-barlow-condensed">{stats.premium}</div>
            </div>
            <div className="bg-gray-50 p-4 border-l-4 border-purple-500">
              <div className="text-sm text-gray-600 font-barlow-condensed">Premium Especial</div>
              <div className="text-2xl font-black text-pian-black font-barlow-condensed">{stats.premiumEspecial}</div>
            </div>
            <div className="bg-gray-50 p-4 border-l-4 border-yellow-500">
              <div className="text-sm text-gray-600 font-barlow-condensed">Super Premium</div>
              <div className="text-2xl font-black text-pian-black font-barlow-condensed">{stats.superPremium}</div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm border-2 border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 text-pian-black focus:outline-none focus:ring-2 focus:ring-pian-red focus:border-pian-red font-barlow-condensed"
              />
            </div>
            <div className="flex gap-2">
              {classifications.map(classification => (
                <button
                  key={classification}
                  onClick={() => setSelectedCategory(classification)}
                  className={`px-4 py-3 font-bold font-barlow-condensed border-2 transition-colors ${
                    selectedCategory === classification
                      ? 'bg-pian-red text-white border-pian-red'
                      : 'bg-white text-pian-black border-gray-200 hover:border-pian-red'
                  }`}
                >
                  {classification}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-pian-red" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2 font-barlow-condensed">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 font-barlow-condensed">
                Ajuste os filtros ou adicione novos produtos
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-black text-pian-black font-barlow-condensed uppercase">Imagem</th>
                    <th className="text-left py-4 px-4 font-black text-pian-black font-barlow-condensed uppercase">Nome</th>
                    <th className="text-left py-4 px-4 font-black text-pian-black font-barlow-condensed uppercase">Animal</th>
                    <th className="text-left py-4 px-4 font-black text-pian-black font-barlow-condensed uppercase">Tipo</th>
                    <th className="text-left py-4 px-4 font-black text-pian-black font-barlow-condensed uppercase">Classificação</th>
                    <th className="text-left py-4 px-4 font-black text-pian-black font-barlow-condensed uppercase">Linha</th>
                    <th className="text-right py-4 px-4 font-black text-pian-black font-barlow-condensed uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover border-2 border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = '/fallback-product.svg';
                          }}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-pian-black font-barlow-condensed">{product.name}</div>
                        <div className="text-sm text-gray-600 font-barlow-condensed">{product.description}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold font-barlow-condensed text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 font-bold font-barlow-condensed text-sm">
                          {product.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 font-bold font-barlow-condensed text-sm">
                          {product.classification || 'Standard'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {product.line ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 font-bold font-barlow-condensed text-sm">
                            {product.line}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-barlow-condensed">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 border-2 border-blue-600 transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setDeleteProduct(product)}
                            className="p-2 text-red-600 hover:bg-red-50 border-2 border-red-600 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-5 w-5" />
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
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className={`px-6 py-4 shadow-lg border-2 ${
            toast.type === 'success'
              ? 'bg-green-50 border-green-500 text-green-800'
              : 'bg-red-50 border-red-500 text-red-800'
          }`}>
            <p className="font-bold font-barlow-condensed">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
