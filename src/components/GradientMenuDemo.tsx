import React from 'react';
import GradientMenu from "./ui/gradient-menu";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Menu Gradiente PIAN ALIMENTOS
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Menu interativo com animações fluidas e gradientes personalizados
          </p>
        </div>
        <GradientMenu />
        <div className="text-sm text-gray-500 space-y-1">
          <p>• Clique em "Produtos" para ver o submenu</p>
          <p>• Passe o mouse sobre os itens para ver as animações</p>
          <p>• Navegação totalmente funcional</p>
        </div>
      </div>
    </div>
  );
};

export { DemoOne };