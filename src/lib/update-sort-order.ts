import { supabase } from './supabase';
import { getProductSortOrder } from './product-order';

export async function updateProductsSortOrder() {
  try {
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('*');

    if (fetchError) throw fetchError;

    console.log(`Found ${products?.length || 0} products to update`);

    const updates = [];

    for (const product of products || []) {
      const sortOrder = getProductSortOrder(product.name);

      updates.push({
        id: product.id,
        name: product.name,
        oldSortOrder: product.sort_order,
        newSortOrder: sortOrder
      });

      const { error: updateError } = await supabase
        .from('products')
        .update({ sort_order: sortOrder })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError);
      } else {
        console.log(`Updated ${product.name} with sort_order: ${sortOrder}`);
      }
    }

    console.log('Sort order update complete!');
    console.log('Updates:', updates);

    return updates;
  } catch (error) {
    console.error('Error updating sort order:', error);
    throw error;
  }
}
