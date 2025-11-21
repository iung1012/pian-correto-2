import { supabase } from './supabase';
import { getProductSortOrder } from './product-order';

const productClassification = {
  'Super Premium': [
    'PRIORITÁ ADULTO RAÇAS GRANDES',
    'PRIORITÁ ADULTO RAÇAS PEQUENAS',
    'PRIORITÁ GATOS ADULTOS CASTRADOS',
    'PRIORITÁ SUPER PREMIUM JUNIOR RAÇAS MÉDIAS E GRANDES',
    'PRIORITÁ SUPER PREMIUM MINI JUNIOR',
    'PRIORITÁ GATOS ADULTOS'
  ],
  'Premium Especial': [
    'MIKCAT PREMIUM ESPECIAL ADULTO',
    'MIKCAT PREMIUM ESPECIAL ADULTO CASTRADO',
    'MIKCAT PREMIUM ESPECIAL FILHOTE',
    'MIKDOG PREMIUM ESPECIAL ADULTO MÉDIO E GRANDE PORTE',
    'MIKDOG PREMIUM ESPECIAL ADULTO PEQUENO PORTE',
    'MIKDOG PREMIUM ESPECIAL FILHOTES'
  ],
  'Premium': [
    'MIKCAT CARNE',
    'MIKCAT CARNE E PEIXE',
    'MIKCAT CASTRADOS',
    'MIKCAT NUGGETS RECHEADOS',
    'MIKCAT FILHOTE',
    'MIKCAT FRUTOS DO MAR, SALMÃO E FRANGO',
    'MIKCAT MIX',
    'MIKCAT PEIXE',
    'MIGDOG ADULTO RAÇAS PEQUENAS',
    'MIKDOG ADULTO RAÇAS PEQUENAS',
    'MIKDOG CARNE E OSSINHOS',
    'MIKDOG CARNE E VEGETAIS',
    'MIKDOG NUGGETS RECHEADOS',
    'MIKDOG FILHOTE',
    'MIGDOG REFEIÇÃO TODO DIA',
    'MIKDOG REFEIÇÃO TODO DIA',
    'MIKDOG SÊNIOR',
    'PATÊ MIKCAT CARNE',
    'PATÊ MIKCAT FÍGADO',
    'PATÊ MIKCAT FRANGO',
    'PATÊ MIKCAT PEIXE',
    'PATÊ MIKDOG CARNE',
    'PATÊ MIKDOG CARNE COM LEGUMES',
    'PATÊ MIKDOG FÍGADO',
    'PATÊ MIKDOG FILHOTE CARNE',
    'PATÊ MIKDOG FRANGO',
    'PRÓPEIXES',
    'PRÓPEIXES JUNIOR',
    'SACHÊ MIKCAT ATUM AO MOLHO',
    'SACHÊ MIKCAT CARNE AO MOLHO',
    'SACHÊ MIKCAT CORDEIRO AO MOLHO',
    'SACHÊ MIKCAT FILHOTE CARNE AO MOLHO',
    'SACHÊ MIKCAT SALMÃO AO MOLHO',
    'SACHÊ MIKDOG FILHOTE CARNE COM MOLHO',
    'SACHÊ MIKDOG RAÇAS MÉDIAS E GRANDES CARNE COM MOLHO',
    'SACHÊ MIKDOG RAÇAS PEQUENAS CARNE AO MOLHO',
    'SACHÊ MIKDOG RAÇAS PEQUENAS CORDEIRO AO MOLHO',
    'SACHÊ MIKDOG RAÇAS PEQUENAS FRANGO AO MOLHO'
  ],
  'Standard': [
    'CAT E CATS',
    'CAT E CATS CROOC',
    'DOG E DOGS ADULTO',
    'DOG E DOGS FILHOTE',
    'GERRYS',
    'LILI DOG',
    'LUPY DOG',
    'ROOKIE ADULTO',
    'ROOKIE JUNIOR',
    'TORNADO BABY',
    'TORNADO ORIGINAL ADULTO',
    'TORNADO RAÇAS PEQUENAS ADULTAS',
    'ZECÃO ORIGINAL',
    'ZÉCAT',
    'ZEQUINHA'
  ]
};

function normalizeProductName(name: string): string {
  return name
    .toUpperCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[áàâã]/gi, 'A')
    .replace(/[éèê]/gi, 'E')
    .replace(/[íì]/gi, 'I')
    .replace(/[óòôõ]/gi, 'O')
    .replace(/[úù]/gi, 'U')
    .replace(/ç/gi, 'C');
}

function findClassification(productName: string): string {
  const normalizedName = normalizeProductName(productName);

  for (const [classification, products] of Object.entries(productClassification)) {
    for (const product of products) {
      const normalizedProduct = normalizeProductName(product);
      if (normalizedName.includes(normalizedProduct) || normalizedProduct.includes(normalizedName)) {
        return classification;
      }
    }
  }

  return 'Standard';
}

function isPriorityProduct(productName: string): boolean {
  const normalizedName = normalizeProductName(productName);
  return normalizedName.includes('MIKCAT') || normalizedName.includes('MIKDOG');
}

function getDisplayPriority(productName: string): number {
  return isPriorityProduct(productName) ? 1 : 2;
}

export async function classifyAllProducts() {
  try {
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('*');

    if (fetchError) throw fetchError;

    console.log(`Found ${products?.length || 0} products to classify`);

    const updates = [];

    for (const product of products || []) {
      const classification = findClassification(product.name);
      const displayPriority = getDisplayPriority(product.name);
      const sortOrder = getProductSortOrder(product.name);

      updates.push({
        id: product.id,
        name: product.name,
        oldClassification: product.classification,
        newClassification: classification,
        displayPriority,
        sortOrder
      });

      const { error: updateError } = await supabase
        .from('products')
        .update({
          classification,
          display_priority: displayPriority,
          sort_order: sortOrder
        })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError);
      }
    }

    console.log('Classification complete!');
    console.log('Updates:', updates);

    return updates;
  } catch (error) {
    console.error('Error classifying products:', error);
    throw error;
  }
}
