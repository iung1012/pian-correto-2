import React, { useState } from 'react';
import { FlipReveal, FlipRevealItem } from './ui/flip-reveal';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const ProductFlipReveal = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    // Linha Standard - Cães
    { id: 1, name: 'Lupydog', image: 'https://i.postimg.cc/3RKMTr8G/Lupy-Dog-7kg-1.png', description: 'Ração completa para cães adultos', category: 'Standard', type: 'Cães' },
    { id: 2, name: 'Lilidog', image: 'https://i.postimg.cc/HxjrkznT/LILI-DOG.jpg', description: 'Nutrição balanceada para cães', category: 'Standard', type: 'Cães' },
    { id: 3, name: 'Zecão', image: 'https://i.postimg.cc/6qmFnddV/ZECA-O-ORIGINAL-2.jpg', description: 'Ração econômica para cães', category: 'Standard', type: 'Cães' },
    { id: 4, name: 'Gerrys', image: 'https://i.postimg.cc/TwHWVSFy/Gerrys-20kg.jpg', description: 'Nutrição completa e balanceada', category: 'Standard', type: 'Cães' },
    
    // Linha Premium - Cães
    { id: 6, name: 'Dog & Dogs Adultos', image: 'https://i.postimg.cc/4NyWTRs0/Dog-Dogs-Adultos.jpg', description: 'Ração premium para cães adultos', category: 'Premium', type: 'Cães' },
    { id: 7, name: 'Dog & Dogs Filhotes', image: 'https://i.postimg.cc/kg8FnnZT/Dog-Dogs-Filhotes.jpg', description: 'Ração premium para filhotes', category: 'Premium', type: 'Cães' },
    { id: 9, name: 'MikDog Premium Adulto', image: 'https://i.postimg.cc/BbH2B3Fh/Mikdog-Premium-Adulto.jpg', description: 'Linha premium para cães adultos', category: 'Premium', type: 'Cães' },
    { id: 10, name: 'MikDog Senior', image: 'https://i.postimg.cc/jjDwhK0z/MIKDOG-SENIOR.jpg', description: 'Ração premium para cães idosos', category: 'Premium', type: 'Cães' },
    
    // Linha Premium - Gatos
    { id: 18, name: 'Cat & Cats Adultos', image: 'https://i.postimg.cc/BntkN1jX/Cat-Cats-Adultos.jpg', description: 'Ração premium para gatos adultos', category: 'Premium', type: 'Gatos' },
    { id: 20, name: 'MikCat Premium', image: 'https://i.postimg.cc/W4NDQTPF/MIKCAT-ADULTO-FRANGO.jpg', description: 'Ração premium sabor frango', category: 'Premium', type: 'Gatos' },
    
    // Linha Super Premium
    { id: 49, name: 'Prioritá Adulto', image: 'https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png', description: 'Super premium para cães adultos', category: 'Super Premium', type: 'Cães' },
    { id: 51, name: 'Prioritá Cat Adulto', image: 'https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png', description: 'Super premium para gatos', category: 'Super Premium', type: 'Gatos' },
  ];

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center gap-8">
          <ToggleGroup
            type="single"
            className="bg-gray-900 rounded-lg border-2 border-pian-yellow p-2 shadow-lg"
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value || 'all')}
          >
            <ToggleGroupItem 
              value="all" 
              className="px-4 py-2 font-bold font-montserrat text-white data-[state=on]:bg-pian-yellow data-[state=on]:text-pian-black border border-transparent data-[state=on]:border-white"
            >
              Todos
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="Standard" 
              className="px-4 py-2 font-bold font-montserrat text-white data-[state=on]:bg-pian-yellow data-[state=on]:text-pian-black border border-transparent data-[state=on]:border-white"
            >
              Standard
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="Premium" 
              className="px-4 py-2 font-bold font-montserrat text-white data-[state=on]:bg-pian-yellow data-[state=on]:text-pian-black border border-transparent data-[state=on]:border-white"
            >
              Premium
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="Super Premium" 
              className="px-4 py-2 font-bold font-montserrat text-white data-[state=on]:bg-pian-yellow data-[state=on]:text-pian-black border border-transparent data-[state=on]:border-white"
            >
              Super Premium
            </ToggleGroupItem>
          </ToggleGroup>

          <FlipReveal 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full" 
            keys={[selectedCategory]} 
            showClass="flex" 
            hideClass="hidden"
          >
            {products.map((product) => (
              <FlipRevealItem key={product.id} flipKey={product.category}>
                <div className="w-full">
                  <ProductCard 
                    {...product} 
                    onViewDetails={() => handleViewDetails(product)}
                  />
                </div>
              </FlipRevealItem>
            ))}
          </FlipReveal>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ProductFlipReveal;