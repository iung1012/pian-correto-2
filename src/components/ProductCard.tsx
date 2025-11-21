import React from 'react';
import { Dog, Cat, Fish, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  type?: string;
  classification?: string;
  onViewDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  description,
  category,
  type,
  classification,
  onViewDetails
}) => {
  const getClassificationColor = (classif: string) => {
    switch (classif) {
      case 'Super Premium':
        return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500';
      case 'Premium Especial':
        return 'bg-orange-600';
      case 'Premium':
        return 'bg-gradient-to-r from-red-600 to-red-700';
      case 'Standard':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getAnimalIcon = (animalCategory: string) => {
    switch (animalCategory) {
      case 'Cães':
        return <Dog className="h-5 w-5" />;
      case 'Gatos':
        return <Cat className="h-5 w-5" />;
      case 'Peixes':
        return <Fish className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 flex flex-col h-full border-l-4 border-pian-red"
      onClick={onViewDetails}
    >
      <div className="relative p-4 pb-3">
        <div className="w-full h-48 bg-white overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.currentTarget;
              const fallback = document.createElement('div');
              fallback.className = 'flex items-center justify-center h-full w-full bg-white border-2 border-dashed border-gray-300';
              fallback.innerHTML = `
                <div class="text-center p-4">
                  <div class="w-12 h-12 mx-auto mb-3 bg-gray-200 flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div class="text-gray-700 text-xs font-medium leading-tight">${name}</div>
                </div>
              `;
              target.parentElement?.replaceChild(fallback, target);
            }}
          />
        </div>
        
        {/* Ícone de informações */}
        <div className="absolute top-4 right-4">
          <div className="w-7 h-7 bg-pian-black/10 text-pian-black flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:bg-pian-red group-hover:text-white">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      {/* Informações do produto */}
      <div className="px-4 pb-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-pian-black group-hover:text-pian-red transition-colors duration-300 mb-2 leading-tight font-barlow-condensed">
          {name}
        </h3>
        
        {/* Badges */}
        <div className="flex flex-col gap-2 mt-3">
          {classification && type !== 'Alimento Úmido' && type !== 'Snack' && category !== 'Peixes' && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs font-bold font-barlow-condensed">Linha {classification}</span>
              <div className="text-pian-red flex items-center justify-center">
                {getAnimalIcon(category)}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Indicador visual de clicável */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-pian-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default ProductCard;