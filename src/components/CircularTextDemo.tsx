import React from 'react';
import CircularText from "./ui/circular-text";

const CircularTextDemo = () => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center p-8 bg-gradient-to-br from-orange-50 via-white to-orange-50/50">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 font-montserrat">
            Nutrição Premium para seu Pet
          </h2>
          <p className="text-gray-600 max-w-md mx-auto font-montserrat">
            Fórmulas fechadas desenvolvidas com os melhores ingredientes
          </p>
        </div>
        
        <CircularText
          text="FÓRMULA FECHADA SEM EVENTUAIS SUBSTITUTIVOS • ALTA PALATABILIDADE • NUTRIÇÃO • "
          spinDuration={20} 
          onHover="speedUp" 
          className="text-yellow-600 dark:text-white"
          radius={120}
          fontSize={14}
        />
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-montserrat">
            Passe o mouse para acelerar a animação
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-400 font-montserrat">
            <span>• Ingredientes Premium</span>
            <span>• Livre de Artificiais</span>
            <span>• 40 Anos de Tradição</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CircularTextDemo };