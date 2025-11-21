import React from 'react';
import DistributorsSection from '../components/DistributorsSection';
import { Lock, ExternalLink, Shield, Users, MapPin, Eye, EyeOff } from 'lucide-react';

const Distributors = () => {
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === 'PianAlimentos') {
      window.open('https://drive.google.com/drive/folders/1zyncMGhLEvO1nc2Z7_VakWunZwy2wTD-?usp=sharing', '_blank');
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
    <div className="pt-16">
      {/* Hero Section - Clean and Elegant */}
      <section className="py-16 bg-pian-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 dark-pattern-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FDD528 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #FDD528 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main title */}
            <h1 className="text-[95px] font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider">
              DISTRIBUIDORES
            </h1>

            {/* Decorative line */}
            <div className="w-24 h-1 bg-pian-red mx-auto mb-6"></div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-bold font-barlow-condensed leading-relaxed">
              Área exclusiva para nossos parceiros distribuidores
            </p>
          </div>
        </div>
      </section>

      {/* Área Restrita com design aprimorado */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Card principal da área restrita */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl animate-fade-in-up">
              {/* Header do card */}
              <div className="bg-gradient-to-r from-pian-yellow to-pian-yellow-dark px-8 py-6 relative overflow-hidden">
                {/* Animação de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4">
                    <Lock className="h-8 w-8 text-pian-black" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-pian-black mb-1 font-bold font-barlow-condensed">
                      Área Restrita
                    </h2>
                  </div>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="px-8 py-12 text-center animate-fade-in-delay">
                {/* Botão principal */}
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="group inline-flex items-center px-10 py-4 bg-pian-yellow text-pian-black rounded-2xl hover:bg-pian-yellow-dark transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl font-bold text-lg animate-bounce-subtle relative overflow-hidden font-bold font-barlow-condensed"
                >
                  {/* Efeito de brilho no botão */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Lock className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  <span className="relative z-10">CLIQUE E ACESSE</span>
                  <ExternalLink className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="text-gray-400 text-sm mt-4 animate-fade-in-delay-2 font-bold font-barlow-condensed">
                  Acesso restrito mediante senha fornecida pela equipe comercial
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-barlow-condensed">
                  Área do Distribuidor
                </h3>
                <p className="text-gray-600 font-barlow-condensed">
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
                    className="w-full px-4 py-3 pr-12 border border-yellow-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 font-barlow-condensed"
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
                  <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg font-barlow-condensed">
                    {error}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-bold font-barlow-condensed"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-bold font-barlow-condensed"
                  >
                    Acessar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributors;