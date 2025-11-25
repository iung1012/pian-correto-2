import React, { useState } from 'react';
import { updateProductsNutrition } from '../lib/update-product-nutrition';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const UpdateNutrition = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ updated: number; notFound: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const result = await updateProductsNutrition();
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm border-2 border-gray-200 p-6">
          <h1 className="text-4xl font-black text-pian-black font-barlow-condensed uppercase mb-4">
            Atualizar Informações Nutricionais
          </h1>
          
          <p className="text-gray-600 mb-6 font-barlow-condensed">
            Esta ferramenta atualiza as informações nutricionais (composição, enriquecimento e níveis de garantia) 
            dos produtos de alimentos úmidos (sachês e patês) no banco de dados.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-800 text-sm font-barlow-condensed">
              <strong>Atenção:</strong> Esta ação irá atualizar as descrições dos seguintes produtos:
            </p>
            <ul className="list-disc list-inside mt-2 text-yellow-800 text-sm space-y-1">
              <li>SACHÊ DOG & DOGS SABOR CARNE</li>
              <li>SACHÊ CAT & CATS CARNE</li>
              <li>SACHÊ CAT & CATS FRANGO</li>
              <li>SACHÊ DOG & DOGS FILHOTES CARNE</li>
              <li>PATÊ DOG & DOGS FRANGO</li>
              <li>PATÊ DOG & DOGS CARNE</li>
              <li>PATÊ DOG & DOGS FÍGADO</li>
              <li>PATÊ DOG & DOGS CARNE FILHOTE</li>
              <li>PATÊ CAT & CATS FÍGADO</li>
              <li>PATÊ CAT & CATS FRANGO</li>
              <li>PATÊ CAT & CATS PEIXE</li>
              <li>PATÊ CAT & CATS CARNE</li>
            </ul>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full px-6 py-4 font-bold font-barlow-condensed text-lg transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pian-red text-white hover:bg-red-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Atualizando...
              </span>
            ) : (
              'Atualizar Produtos'
            )}
          </button>

          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800 font-barlow-condensed font-bold">Erro: {error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800 font-barlow-condensed font-bold">Atualização concluída!</p>
              </div>
              <div className="text-green-800 text-sm space-y-1 font-barlow-condensed">
                <p>✓ Produtos atualizados: <strong>{result.updated}</strong></p>
                <p>⚠ Produtos não encontrados: <strong>{result.notFound}</strong></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateNutrition;

