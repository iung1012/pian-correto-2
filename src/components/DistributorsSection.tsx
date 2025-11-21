import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ExternalLink } from 'lucide-react';

const DistributorsSection = ({ showPasswordModal, setShowPasswordModal }: { 
  showPasswordModal: boolean; 
  setShowPasswordModal: (show: boolean) => void; 
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'pianalimentos') {
      // Redirecionar para o link do drive
      window.open('https://postimg.cc/y30fz3pW', '_blank');
      setShowPasswordModal(false);
      setPassword('');
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setError('');
  };

  return (
    <>
      {/* Área Restrita */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Área Restrita
        </h2>
        
        <button
          onClick={() => setShowPasswordModal(true)}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold font-montserrat"
        >
          <Lock className="mr-3 h-5 w-5" />
          Área do Distribuidor
          <ExternalLink className="ml-3 h-5 w-5" />
        </button>
      </div>

      {/* Modal de Senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">
                  Área do Distribuidor
                </h3>
                <p className="text-gray-600 font-montserrat">
                  Digite a senha para acessar o conteúdo exclusivo
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="w-full px-4 py-3 pr-12 border border-yellow-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 font-montserrat"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg font-montserrat">
                    {error}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-bold font-montserrat"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-bold font-montserrat"
                  >
                    Acessar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DistributorsSection;