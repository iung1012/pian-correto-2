import React, { useState, useEffect } from 'react';
import { supabase, Product, ProductInsert } from '../lib/supabase';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';
import { getProductOptions, ProductOption } from '../lib/product-options-api';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<ProductInsert>({
    name: '',
    image: '',
    description: '',
    category: 'Cães',
    type: 'Ração Seca',
    line: '',
    classification: 'Standard',
    display_priority: 2,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState<ProductOption[]>([]);
  const [types, setTypes] = useState<ProductOption[]>([]);
  const [classifications, setClassifications] = useState<ProductOption[]>([]);
  const [lines, setLines] = useState<ProductOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    async function loadOptions() {
      setLoadingOptions(true);
      try {
        const [cats, typs, classifs, lins] = await Promise.all([
          getProductOptions('category'),
          getProductOptions('type'),
          getProductOptions('classification'),
          getProductOptions('line'),
        ]);
        setCategories(cats);
        setTypes(typs);
        setClassifications(classifs);
        setLines(lins);
        
        // Se não há produto sendo editado, define valores padrão
        if (!product && cats.length > 0) {
          setFormData(prev => ({ ...prev, category: cats[0].name }));
        }
        if (!product && typs.length > 0) {
          setFormData(prev => ({ ...prev, type: typs[0].name }));
        }
        if (!product && classifs.length > 0) {
          setFormData(prev => ({ ...prev, classification: classifs[0].name }));
        }
      } catch (error) {
        console.error('Error loading options:', error);
      } finally {
        setLoadingOptions(false);
      }
    }
    loadOptions();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        image: product.image,
        description: product.description,
        category: product.category,
        type: product.type,
        line: product.line || '',
        classification: product.classification || 'Standard',
        display_priority: product.display_priority || 2,
      });
      setImagePreview(product.image);
    }
  }, [product]);

  useEffect(() => {
    if (formData.image) {
      const timer = setTimeout(() => {
        setImagePreview(formData.image);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.image]);

  function validateForm(): boolean {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'URL da imagem é obrigatória';
    } else if (!formData.image.match(/^(https?:\/\/|\/)/)) {
      newErrors.image = 'URL inválida';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        line: formData.line?.trim() || null,
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(dataToSubmit)
          .eq('id', product.id);

        if (error) throw error;
        onSuccess('Produto atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([dataToSubmit]);

        if (error) throw error;
        onSuccess('Produto criado com sucesso!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ submit: 'Erro ao salvar produto. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof ProductInsert, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-pian-black shadow-2xl">
        <div className="sticky top-0 bg-pian-black text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black font-barlow-condensed uppercase">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 transition-colors"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="p-4 bg-red-50 border-2 border-red-500 text-red-800 font-barlow-condensed">
              {errors.submit}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-pian-red font-barlow-condensed`}
                  placeholder="Ex: MikDog Premium Adulto"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 font-barlow-condensed">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  URL da Imagem *
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.image ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-pian-red font-barlow-condensed`}
                  placeholder="https://exemplo.com/imagem.jpg ou /imagem-local.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600 font-barlow-condensed">{errors.image}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  Descrição *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.description ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-pian-red font-barlow-condensed resize-none`}
                  placeholder="Descreva o produto..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 font-barlow-condensed">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  Categoria (Animal) *
                </label>
                {loadingOptions ? (
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    <span className="text-gray-500 font-barlow-condensed">Carregando...</span>
                  </div>
                ) : (
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:outline-none focus:border-pian-red font-barlow-condensed"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  Tipo de Produto *
                </label>
                {loadingOptions ? (
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    <span className="text-gray-500 font-barlow-condensed">Carregando...</span>
                  </div>
                ) : (
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:outline-none focus:border-pian-red font-barlow-condensed"
                  >
                    {types.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  Classificação *
                </label>
                {loadingOptions ? (
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    <span className="text-gray-500 font-barlow-condensed">Carregando...</span>
                  </div>
                ) : (
                  <select
                    value={formData.classification}
                    onChange={(e) => handleChange('classification', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:outline-none focus:border-pian-red font-barlow-condensed"
                  >
                    {classifications.map((classif) => (
                      <option key={classif.id} value={classif.name}>
                        {classif.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  Linha (Opcional)
                </label>
                {loadingOptions ? (
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    <span className="text-gray-500 font-barlow-condensed">Carregando...</span>
                  </div>
                ) : (
                  <select
                    value={formData.line || ''}
                    onChange={(e) => handleChange('line', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:outline-none focus:border-pian-red font-barlow-condensed"
                  >
                    <option value="">Nenhuma linha</option>
                    {lines.map((line) => (
                      <option key={line.id} value={line.name}>
                        {line.name}
                      </option>
                    ))}
                  </select>
                )}
                <p className="mt-1 text-sm text-gray-500 font-barlow-condensed">
                  Selecione uma linha ou deixe em branco
                </p>
              </div>

              <div>
                <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                  Prioridade de Exibição *
                </label>
                <select
                  value={formData.display_priority}
                  onChange={(e) => handleChange('display_priority', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:outline-none focus:border-pian-red font-barlow-condensed"
                >
                  <option value="1">Alta (MikCat/MikDog)</option>
                  <option value="2">Normal (Outras marcas)</option>
                </select>
                <p className="mt-1 text-sm text-gray-500 font-barlow-condensed">
                  Produtos com prioridade alta aparecem primeiro
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-black text-pian-black mb-2 font-barlow-condensed uppercase">
                Pré-visualização da Imagem
              </label>
              <div className="flex-1 border-2 border-gray-200 bg-gray-50 p-4 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-[500px] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={imagePreview ? 'hidden' : 'text-center text-gray-400'}>
                  <ImageIcon className="h-24 w-24 mx-auto mb-4" />
                  <p className="font-barlow-condensed">Aguardando URL da imagem...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold font-barlow-condensed hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-pian-red text-white font-bold font-barlow-condensed hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                product ? 'Atualizar Produto' : 'Criar Produto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
