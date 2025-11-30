import { useEffect, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';

const PWAUpdatePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] = useState<(() => void) | null>(null);

  useEffect(() => {
    // Verificar se há atualizações disponíveis
    if ('serviceWorker' in navigator) {
      let refreshing = false;

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nova versão disponível
                setUpdateServiceWorker(() => () => {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                });
                setShowPrompt(true);
              }
            });
          }
        });
      });

      // Verificar atualizações periodicamente
      setInterval(() => {
        navigator.serviceWorker.ready.then((registration) => {
          registration.update();
        });
      }, 60 * 60 * 1000); // A cada hora
    }
  }, []);

  const handleUpdate = () => {
    if (updateServiceWorker) {
      updateServiceWorker();
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white border-2 border-pian-yellow rounded-lg shadow-2xl p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
          <RefreshCw className="h-6 w-6 text-pian-yellow" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">Nova versão disponível!</h3>
          <p className="text-sm text-gray-600">Atualize para obter as últimas melhorias.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-pian-yellow text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors text-sm"
          >
            Atualizar
          </button>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;

