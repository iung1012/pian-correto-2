import { supabase, ProductInsert } from './supabase';
import { getProductSortOrder } from './product-order';

const products: ProductInsert[] = [
  { name: 'Lupydog', image: '/lupy-dog-7kg-1.png', description: 'Ração completa para cães adultos', category: 'Standard', type: 'Cães', display_priority: 2 },
  { name: 'Lilidog', image: '/lili-dog.jpg', description: 'Nutrição balanceada para cães', category: 'Standard', type: 'Cães', display_priority: 2 },
  { name: 'Zecão', image: '/zeca-o-original-2.jpg', description: 'Ração econômica para cães', category: 'Standard', type: 'Cães', display_priority: 2 },
  { name: 'Gerrys', image: '/gerrys-20kg.jpg', description: 'Nutrição completa e balanceada', category: 'Standard', type: 'Cães', display_priority: 2 },
  { name: 'Zecat', image: 'https://i.postimg.cc/6qmFnddV/ZECA-O-ORIGINAL-2.jpg', description: 'Ração completa para gatos', category: 'Standard', type: 'Gatos', display_priority: 2 },
  { name: 'Dog & Dogs Adultos', image: 'https://i.postimg.cc/4NyWTRs0/Dog-Dogs-Adultos.jpg', description: 'Ração premium para cães adultos', category: 'Premium', type: 'Cães', display_priority: 2 },
  { name: 'Dog & Dogs Filhotes', image: 'https://i.postimg.cc/kg8FnnZT/Dog-Dogs-Filhotes.jpg', description: 'Ração premium para filhotes', category: 'Premium', type: 'Cães', display_priority: 2 },
  { name: 'Dog & Dogs Pequeno Porte', image: 'https://i.postimg.cc/XqHxyQcx/Dog-Dogs-Peq-Racas.jpg', description: 'Ração premium para cães pequenos', category: 'Premium', type: 'Cães', display_priority: 2 },
  { name: 'MikDog Premium Adulto', image: 'https://i.postimg.cc/BbH2B3Fh/Mikdog-Premium-Adulto.jpg', description: 'Linha premium para cães adultos', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Senior', image: 'https://i.postimg.cc/jjDwhK0z/MIKDOG-SENIOR.jpg', description: 'Ração premium para cães idosos', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Natural', image: 'https://i.postimg.cc/fbq7wBZv/MIKDOG-NATURAL.jpg', description: 'Ração natural premium', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Nuggets', image: 'https://i.postimg.cc/nhHqB6hk/MIKDOG-NUGGETS.jpg', description: 'Ração em formato nuggets', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Filhotes', image: 'https://i.postimg.cc/13Hcdyj2/MIKDOG-FILHOTES.jpg', description: 'Ração premium para filhotes', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Refeição', image: 'https://i.postimg.cc/brctJ551/MIKDOG-REFEICAO.jpg', description: 'Ração completa para refeições', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Vegetais', image: 'https://i.postimg.cc/LsGqC72G/MIKDOG-VEGETAIS.jpg', description: 'Ração com vegetais', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Pequenas Raças', image: 'https://i.postimg.cc/VL9jSYmv/MIKDOG-PEQ-RACAS.jpg', description: 'Ração para cães pequenos', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Carne com Ossinhos', image: 'https://i.postimg.cc/0NydRLgQ/MIKDOG-CARNE-COM-OSSINHOS.jpg', description: 'Ração com carne e ossinhos', category: 'Premium', type: 'Cães', display_priority: 1 },
  { name: 'Cat & Cats Adultos', image: 'https://i.postimg.cc/BntkN1jX/Cat-Cats-Adultos.jpg', description: 'Ração premium para gatos adultos', category: 'Premium', type: 'Gatos', display_priority: 2 },
  { name: 'Cat & Cats Nuggets', image: 'https://i.postimg.cc/mZwnsSMP/Cat-Cats-Nuggets.jpg', description: 'Ração em formato nuggets para gatos', category: 'Premium', type: 'Gatos', display_priority: 2 },
  { name: 'MikCat Premium', image: 'https://i.postimg.cc/W4NDQTPF/MIKCAT-ADULTO-FRANGO.jpg', description: 'Ração premium sabor frango', category: 'Premium', type: 'Gatos', display_priority: 1 },
  { name: 'MikCat Adultos', image: 'https://i.postimg.cc/mrmc4Jbd/Mikcat-Adutos.jpg', description: 'Ração premium para gatos adultos', category: 'Premium', type: 'Gatos', display_priority: 1 },
  { name: 'MikDog Sachê Carne', image: 'https://i.postimg.cc/26BWCY0z/MIKDOG-SACHES-ADULTO-CARNE-MOCKUP.jpg', description: 'Sachê sabor carne', category: 'Premium', type: 'Cães', line: 'Sachê', display_priority: 1 },
  { name: 'MikDog Sachê RPM Carne', image: 'https://i.postimg.cc/mkYFFwxJ/MIKDOG-SACHES-ADULTO-RPM-CARNE-MOCKUP.jpg', description: 'Sachê RPM sabor carne', category: 'Premium', type: 'Cães', line: 'Sachê', display_priority: 1 },
  { name: 'MikDog Sachê RPM Frango', image: 'https://i.postimg.cc/x1TbcM6p/MIKDOG-SACHES-ADULTO-RPM-FRANGO-MOCKUP.jpg', description: 'Sachê RPM sabor frango', category: 'Premium', type: 'Cães', line: 'Sachê', display_priority: 1 },
  { name: 'Dog & Dogs Sachê Carne Adultos', image: 'https://i.postimg.cc/hv6TBw0F/Dog-Dogs-Sache-Carne-Adultos.jpg', description: 'Sachê carne para adultos', category: 'Premium', type: 'Cães', line: 'Sachê', display_priority: 2 },
  { name: 'Dog & Dogs Sachê Carne Filhotes', image: 'https://i.postimg.cc/9fCTCyyf/Dog-Dogs-Sache-Carne-Filhotes.jpg', description: 'Sachê carne para filhotes', category: 'Premium', type: 'Cães', line: 'Sachê', display_priority: 2 },
  { name: 'Dog & Dogs Enlatado Carne', image: 'https://i.postimg.cc/V6zFG3KD/Dog-Dogs-Enlatado-Carne.jpg', description: 'Ração enlatada sabor carne', category: 'Premium', type: 'Cães', line: 'Enlatado', display_priority: 2 },
  { name: 'Dog & Dogs Enlatado Frango', image: 'https://i.postimg.cc/pr6YdyR6/Dog-Dogs-Enlatado-Frango.jpg', description: 'Ração enlatada sabor frango', category: 'Premium', type: 'Cães', line: 'Enlatado', display_priority: 2 },
  { name: 'Dog & Dogs Enlatado Fígado', image: 'https://i.postimg.cc/ZRjx1VgZ/Dog-Dogs-Enlatado-Figado.jpg', description: 'Ração enlatada sabor fígado', category: 'Premium', type: 'Cães', line: 'Enlatado', display_priority: 2 },
  { name: 'Dog & Dogs Enlatado Carne Filhotes', image: 'https://i.postimg.cc/tJTNyFQ6/Dog-Dogs-Enlatado-Carne-Filhotes.jpg', description: 'Ração enlatada para filhotes', category: 'Premium', type: 'Cães', line: 'Enlatado', display_priority: 2 },
  { name: 'MikDog Snacks Carne', image: 'https://i.postimg.cc/jdTfYGPb/Mikdog-Snacks-Carne-60g.jpg', description: 'Snacks sabor carne 60g', category: 'Premium', type: 'Cães', line: 'Snacks', display_priority: 1 },
  { name: 'Cat & Cats Enlatado Peixe', image: 'https://i.postimg.cc/wM6bNtKx/Cat-Cats-Enlatado-Peixe.jpg', description: 'Ração enlatada sabor peixe', category: 'Premium', type: 'Gatos', line: 'Enlatado', display_priority: 2 },
  { name: 'Cat & Cats Enlatado Frango', image: 'https://i.postimg.cc/QMTPZGkD/Cat-Cats-Enlatado-Frango.jpg', description: 'Ração enlatada sabor frango', category: 'Premium', type: 'Gatos', line: 'Enlatado', display_priority: 2 },
  { name: 'Cat & Cats Enlatado Carne', image: 'https://i.postimg.cc/ydCGVQvZ/Cat-Cats-Enlatado-Carne.jpg', description: 'Ração enlatada sabor carne', category: 'Premium', type: 'Gatos', line: 'Enlatado', display_priority: 2 },
  { name: 'Cat & Cats Enlatado Fígado', image: 'https://i.postimg.cc/4xMM0Ncw/Cat-Cats-Enlatado-Figado.jpg', description: 'Ração enlatada sabor fígado', category: 'Premium', type: 'Gatos', line: 'Enlatado', display_priority: 2 },
  { name: 'Cat & Cats Sachê Carne', image: 'https://i.postimg.cc/0yLWfXgB/Cat-Cats-Saches-Carne.jpg', description: 'Sachê sabor carne', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 2 },
  { name: 'Cat & Cats Sachê Frango', image: 'https://i.postimg.cc/xCQsrk1G/Cat-Cats-Saches-Frango.jpg', description: 'Sachê sabor frango', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 2 },
  { name: 'MikCat Sachê Adulto Atum', image: 'https://i.postimg.cc/dQLHTZx1/MIKCAT-SACHES-ADULTO-ATUM-MOCKUP.jpg', description: 'Sachê sabor atum', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 1 },
  { name: 'MikCat Sachê Adulto Carne', image: 'https://i.postimg.cc/g2qNPVnM/MIKCAT-SACHES-ADULTO-CARNE-MOCKUP.jpg', description: 'Sachê sabor carne', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 1 },
  { name: 'MikCat Sachê Adulto Salmão', image: 'https://i.postimg.cc/NG9D0qK2/MIKCAT-SACHES-ADULTO-SALMAO-MOCKUP.jpg', description: 'Sachê sabor salmão', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 1 },
  { name: 'MikCat Sachê Adulto Cordeiro', image: 'https://i.postimg.cc/NML4TZbV/MIKCAT-SACHES-ADULTO-CORDEIRO-MOCKUP.jpg', description: 'Sachê sabor cordeiro', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 1 },
  { name: 'MikCat Sachê Filhote Carne', image: 'https://i.postimg.cc/65ChdrL9/MIKCAT-SACHES-FILHOTE-CARNE-MOCKUP.jpg', description: 'Sachê para filhotes', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 1 },
  { name: 'MikCat Sachê Castrados Frango', image: 'https://i.postimg.cc/qvb6nqYJ/Mockup-MIKCAT-SACHES-Gatos-Castrados-Frango-ao-Molho.jpg', description: 'Sachê para gatos castrados', category: 'Premium', type: 'Gatos', line: 'Sachê', display_priority: 1 },
  { name: 'MikDog Premium Especial Filhotes', image: 'https://i.postimg.cc/4NR6NKCj/Mikdog-Premium-Especial-Filhotes.jpg', description: 'Fórmula especial para filhotes', category: 'Premium Especial', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Premium Especial Pequeno Porte', image: 'https://i.postimg.cc/pLqzZq9t/Mikdog-Premium-Especial-Pequeno-Porte.jpg', description: 'Fórmula especial pequeno porte', category: 'Premium Especial', type: 'Cães', display_priority: 1 },
  { name: 'MikDog Premium Especial Refeições', image: 'https://i.postimg.cc/59C5VBrw/MIKDOG-PREMIUM-ESPECIAL-ADULTO-REFEICOES-TODO-DIA.jpg', description: 'Fórmula especial refeições', category: 'Premium Especial', type: 'Cães', display_priority: 1 },
  { name: 'MikCat Premium Especial Filhotes', image: 'https://i.postimg.cc/SRMjWKc5/MIKCAT-PREMIUM-ESPECIAL-FILHOTES.jpg', description: 'Fórmula especial para filhotes', category: 'Premium Especial', type: 'Gatos', display_priority: 1 },
  { name: 'MikCat Premium Especial Castrados', image: 'https://i.postimg.cc/KzVRkT3B/MIKCAT-PREMIUM-ESPECIAL-CASTRADOS.jpg', description: 'Fórmula especial para castrados', category: 'Premium Especial', type: 'Gatos', display_priority: 1 },
  { name: 'Prioritá Adulto', image: 'https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png', description: 'Super premium para cães adultos', category: 'Super Premium', type: 'Cães', display_priority: 2 },
  { name: 'Prioritá Filhote', image: 'https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png', description: 'Super premium para filhotes', category: 'Super Premium', type: 'Cães', display_priority: 2 },
  { name: 'Prioritá Cat Adulto', image: 'https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png', description: 'Super premium para gatos', category: 'Super Premium', type: 'Gatos', display_priority: 2 },
  { name: 'ProPeixe Junior', image: 'https://i.postimg.cc/NMfvrqh9/PROPEIXE-JUNIOR-2.png', description: 'Ração especial para peixes jovens', category: 'Premium', type: 'Peixes', display_priority: 2 },
];

export async function seedProducts() {
  try {
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (fetchError) {
      console.error('Error checking existing products:', fetchError);
      return;
    }

    if (existingProducts && existingProducts.length > 0) {
      console.log('Products already exist in database. Skipping seed.');
      return;
    }

    const productsWithSortOrder = products.map(product => ({
      ...product,
      sort_order: getProductSortOrder(product.name)
    }));

    const { data, error } = await supabase
      .from('products')
      .insert(productsWithSortOrder)
      .select();

    if (error) {
      console.error('Error seeding products:', error);
      return;
    }

    console.log(`Successfully seeded ${data?.length || 0} products`);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}
