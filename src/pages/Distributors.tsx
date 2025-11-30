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
      {/* Hero Section */}
      <section className="py-16 bg-pian-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FDD528 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #FDD528 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider break-words px-2">
              DISTRIBUIDORES
            </h1>
            <div className="w-24 h-1 bg-pian-red mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-barlow-condensed leading-relaxed">
              Área exclusiva para nossos parceiros distribuidores
            </p>
          </div>
        </div>
      </section>

      {/* Área Restrita - Clean Design */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            {/* Header - Yellow Section */}
            <div className="bg-pian-yellow px-8 py-8 text-center">
              <div className="flex items-center justify-center gap-4">
                <Lock className="h-8 w-8 text-pian-black" />
                <h2 className="text-2xl md:text-3xl font-black text-pian-black font-barlow-condensed uppercase tracking-wider">
                  ÁREA RESTRITA
                </h2>
              </div>
            </div>

            {/* Content - Dark Section */}
            <div className="bg-pian-black px-8 py-12 text-center">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-pian-yellow text-pian-black rounded-lg hover:bg-yellow-500 transition-colors font-bold text-lg font-barlow-condensed uppercase tracking-wide"
              >
                <Lock className="h-5 w-5" />
                <span>CLIQUE E ACESSE</span>
                <ExternalLink className="h-5 w-5" />
              </button>

              <p className="text-white/70 text-sm mt-6 font-barlow-condensed max-w-md mx-auto">
                Acesso restrito mediante senha fornecida pela equipe comercial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Senha - Clean Design */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-pian-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-pian-black" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 font-barlow-condensed uppercase">
                  Área do Distribuidor
                </h3>
                <p className="text-gray-600 font-barlow-condensed">
                  Digite a senha para acessar o conteúdo exclusivo
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pian-yellow transition-colors font-barlow-condensed"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm text-center p-3 rounded-lg font-barlow-condensed">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-bold font-barlow-condensed"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-pian-yellow text-pian-black rounded-lg hover:bg-yellow-500 transition-colors font-bold font-barlow-condensed"
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
