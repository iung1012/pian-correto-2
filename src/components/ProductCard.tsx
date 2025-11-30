import React, { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';

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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 flex flex-col h-full border border-gray-100 animate-fade-in-up"
      onClick={onViewDetails}
    >
      {/* Image Container - Modern Design */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 overflow-hidden">
        {/* Loading State */}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <Loader2 className="h-8 w-8 text-gray-300 animate-spin" />
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-square max-w-full mx-auto">
          {!imageError ? (
            <img
              src={image}
              alt={name}
              className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-110 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="text-gray-500 text-xs font-medium leading-tight">{name}</div>
              </div>
            </div>
          )}
        </div>

        {/* Hover Overlay with Action Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            <ChevronRight className="h-5 w-5 text-pian-red" />
          </div>
        </div>

        {/* Classification Badge - Top Right */}
        {classification && type !== 'Alimento Úmido' && type !== 'Snack' && category !== 'Peixes' && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-block bg-gray-600/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-bold font-barlow-condensed uppercase tracking-wide rounded-full shadow-md">
              {classification}
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info - Clean Layout */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 flex-1 flex flex-col bg-white">
        {/* Product Name */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-pian-red transition-colors duration-300 mb-2 leading-tight font-barlow-condensed line-clamp-2 min-h-[3rem]">
          {name}
        </h3>
        
        {/* Category Badge */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium font-barlow-condensed uppercase tracking-wide">
              {category}
            </span>
            {type && (
              <span className="text-xs text-gray-400 font-medium font-barlow-condensed">
                {type}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Accent Line - Hover Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pian-red via-pian-yellow to-pian-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default ProductCard;
