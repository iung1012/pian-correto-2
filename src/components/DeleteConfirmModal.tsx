import React from 'react';
import { Product } from '../lib/supabase';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  product,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full border-4 border-red-600 shadow-2xl">
        <div className="bg-red-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-black font-barlow-condensed uppercase">
              Confirmar Exclusão
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4 font-barlow-condensed text-lg">
              Tem certeza que deseja excluir este produto?
            </p>

            <div className="bg-gray-50 border-2 border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover border-2 border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-product.svg';
                  }}
                />
                <div>
                  <h3 className="font-black text-pian-black font-barlow-condensed">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-barlow-condensed">
                    {product.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-bold font-barlow-condensed">
                      {product.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold font-barlow-condensed">
                      {product.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 p-4 mb-6">
            <p className="text-red-800 font-bold font-barlow-condensed text-sm">
              Esta ação não pode ser desfeita. O produto será removido permanentemente do banco de dados.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold font-barlow-condensed hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 text-white font-bold font-barlow-condensed hover:bg-red-700 transition-colors"
            >
              Excluir Produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
