import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Loader2,
  Package,
  Tag,
  Award,
  Layers,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { 
  getProductOptions, 
  createProductOption, 
  updateProductOption, 
  deleteProductOption,
  ProductOption,
  OptionType 
} from '../lib/product-options-api';

const OPTION_TYPES: { 
  type: OptionType; 
  label: string; 
  icon: React.ReactNode; 
  gradient: string;
  border: string;
}[] = [
  { 
    type: 'category', 
    label: 'Animais', 
    icon: <Package className="h-5 w-5" />, 
    gradient: 'from-blue-500 to-blue-600',
    border: 'border-blue-700'
  },
  { 
    type: 'type', 
    label: 'Tipos', 
    icon: <Tag className="h-5 w-5" />, 
    gradient: 'from-purple-500 to-purple-600',
    border: 'border-purple-700'
  },
  { 
    type: 'classification', 
    label: 'Classificações', 
    icon: <Award className="h-5 w-5" />, 
    gradient: 'from-orange-500 to-orange-600',
    border: 'border-orange-700'
  },
  { 
    type: 'line', 
    label: 'Linhas', 
    icon: <Layers className="h-5 w-5" />, 
    gradient: 'from-green-500 to-green-600',
    border: 'border-green-700'
  },
];

const ProductOptions = () => {
  const [selectedType, setSelectedType] = useState<OptionType>('category');
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingSortOrder, setEditingSortOrder] = useState(0);
  const [newName, setNewName] = useState('');
  const [newSortOrder, setNewSortOrder] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchOptions();
  }, [selectedType]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function fetchOptions() {
    setLoading(true);
    try {
      const data = await getProductOptions(selectedType);
      setOptions(data);
    } catch (error) {
      showToast('Erro ao carregar opções', 'error');
    } finally {
      setLoading(false);
    }
  }

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
  }

  function startEdit(option: ProductOption) {
    setEditingId(option.id);
    setEditingName(option.name);
    setEditingSortOrder(option.sortOrder);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingName('');
    setEditingSortOrder(0);
  }

  async function handleSave() {
    if (!editingId || !editingName.trim()) return;

    const result = await updateProductOption(selectedType, editingId, editingName.trim(), editingSortOrder);
    
    if ('error' in result) {
      showToast(result.error, 'error');
    } else {
      showToast('Opção atualizada com sucesso!', 'success');
      cancelEdit();
      fetchOptions();
    }
  }

  async function handleCreate() {
    if (!newName.trim()) {
      showToast('Nome é obrigatório', 'error');
      return;
    }

    const result = await createProductOption(selectedType, newName.trim(), newSortOrder);
    
    if ('error' in result) {
      showToast(result.error, 'error');
    } else {
      showToast('Opção criada com sucesso!', 'success');
      setNewName('');
      setNewSortOrder(0);
      fetchOptions();
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja excluir "${name}"?`)) return;

    const result = await deleteProductOption(selectedType, id);
    
    if ('error' in result) {
      showToast(result.error, 'error');
    } else {
      showToast('Opção excluída com sucesso!', 'success');
      fetchOptions();
    }
  }

  const currentType = OPTION_TYPES.find(t => t.type === selectedType)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 p-6 lg:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 bg-gradient-to-br ${currentType.gradient} rounded-xl shadow-lg text-white`}>
              {currentType.icon}
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2 font-barlow-condensed uppercase tracking-wider">
                Gerenciar Opções
              </h1>
              <p className="text-gray-600 font-barlow-condensed text-lg">
                Gerencie as opções de Animal, Tipo, Classificação e Linha
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            {OPTION_TYPES.map((type) => (
              <button
                key={type.type}
                onClick={() => setSelectedType(type.type)}
                className={`group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-barlow-condensed border-2 transition-all duration-300 ${
                  selectedType === type.type
                    ? `bg-gradient-to-r ${type.gradient} text-white ${type.border} shadow-lg scale-105`
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:scale-105'
                }`}
              >
                {type.icon}
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8">
          {/* Add New */}
          <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <h3 className="text-lg font-black text-gray-900 mb-4 font-barlow-condensed uppercase">
              Adicionar Nova Opção
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={`Nome da ${currentType.label.toLowerCase()}`}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pian-red focus:ring-2 focus:ring-pian-red/20 font-barlow-condensed"
                />
              </div>
              <div className="w-full md:w-32">
                <input
                  type="number"
                  placeholder="Ordem"
                  value={newSortOrder}
                  onChange={(e) => setNewSortOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pian-red focus:ring-2 focus:ring-pian-red/20 font-barlow-condensed"
                />
              </div>
              <button
                onClick={handleCreate}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pian-red to-red-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold font-barlow-condensed"
              >
                <Plus className="h-5 w-5" />
                Adicionar
              </button>
            </div>
          </div>

          {/* List */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-pian-red" />
            </div>
          ) : options.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-700 mb-2 font-barlow-condensed uppercase">
                Nenhuma opção cadastrada
              </h3>
              <p className="text-gray-500 font-barlow-condensed">
                Adicione a primeira opção acima
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                >
                  {editingId === option.id ? (
                    <>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full px-4 py-2 bg-white border-2 border-pian-red rounded-lg focus:outline-none focus:ring-2 focus:ring-pian-red/20 font-barlow-condensed font-bold"
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          value={editingSortOrder}
                          onChange={(e) => setEditingSortOrder(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 bg-white border-2 border-pian-red rounded-lg focus:outline-none focus:ring-2 focus:ring-pian-red/20 font-barlow-condensed"
                        />
                      </div>
                      <button
                        onClick={handleSave}
                        className="p-2.5 text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 rounded-xl border-2 border-green-300 hover:border-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        title="Salvar"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2.5 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 rounded-xl border-2 border-gray-300 hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        title="Cancelar"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <div className="font-black text-gray-900 font-barlow-condensed text-lg">{option.name}</div>
                        <div className="text-sm text-gray-500 font-barlow-condensed">Ordem: {option.sortOrder}</div>
                      </div>
                      <button
                        onClick={() => startEdit(option)}
                        className="p-2.5 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-xl border-2 border-blue-300 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        title="Editar"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(option.id, option.name)}
                        className="p-2.5 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl border-2 border-red-300 hover:border-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        title="Excluir"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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

export default ProductOptions;

