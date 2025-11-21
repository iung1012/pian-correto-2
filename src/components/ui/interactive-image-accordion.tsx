import React, { useState } from 'react';

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Fórmulas Fechadas',
    description: 'Fórmula fechada sem eventuais substitutivos',
    imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Boas Práticas de Fabricação',
    description: 'Certificação BPF garantindo segurança',
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Embalagens Biodegradáveis',
    description: 'Compromisso com o meio ambiente',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Livre de Artificiais',
    description: 'Sem corantes e aromatizantes artificiais',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Nutrição Responsável',
    description: 'Cuidado em cada ingrediente',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Inovação Sustentável',
    description: 'Tecnologia que respeita a natureza',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      className={`
        relative h-[400px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[350px]' : 'w-[80px]'}
        shadow-lg hover:shadow-xl
      `}
      onMouseEnter={onMouseEnter}
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
        `,
        boxShadow: `
          0 10px 25px rgba(0, 0, 0, 0.1),
          0 4px 10px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `
      }}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=400&auto=format&fit=crop'; 
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div
          className={`
            text-white transition-all duration-500 ease-in-out
            ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <h3 className="text-xl font-bold mb-2 font-montserrat">
            {item.title}
          </h3>
          <p className="text-sm text-gray-200 font-montserrat">
            {item.description}
          </p>
        </div>
        
        {/* Vertical title for inactive state */}
        <span
          className={`
            absolute text-white text-sm font-bold whitespace-nowrap
            transition-all duration-500 ease-in-out font-montserrat
            ${
              isActive
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 -rotate-90'
            }
          `}
        >
          {item.title}
        </span>
      </div>
    </div>
  );
};

// --- Main Component ---
export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(2);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 overflow-x-auto p-4">
        {accordionItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isActive={index === activeIndex}
            onMouseEnter={() => handleItemHover(index)}
          />
        ))}
      </div>
    </div>
  );
}