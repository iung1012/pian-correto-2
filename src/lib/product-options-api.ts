const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ProductOption {
  id: string;
  name: string;
  sortOrder: number;
  createdAt: string;
}

export type OptionType = 'category' | 'type' | 'classification' | 'line';

/**
 * Busca todas as opções de uma categoria
 */
export async function getProductOptions(type: OptionType): Promise<ProductOption[]> {
  try {
    const response = await fetch(`${API_URL}/api/product-options/${type}`);
    const data = await response.json();
    
    if (response.ok && data.success) {
      return data.options;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching ${type} options:`, error);
    return [];
  }
}

/**
 * Cria uma nova opção
 */
export async function createProductOption(
  type: OptionType,
  name: string,
  sortOrder: number = 0
): Promise<{ option: ProductOption } | { error: string }> {
  try {
    const response = await fetch(`${API_URL}/api/product-options/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, sortOrder }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { option: data.option };
    } else {
      return { error: data.error || 'Erro ao criar opção' };
    }
  } catch (error) {
    console.error(`Error creating ${type} option:`, error);
    return { error: 'Erro de conexão' };
  }
}

/**
 * Atualiza uma opção
 */
export async function updateProductOption(
  type: OptionType,
  id: string,
  name: string,
  sortOrder: number
): Promise<{ option: ProductOption } | { error: string }> {
  try {
    const response = await fetch(`${API_URL}/api/product-options/${type}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, sortOrder }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { option: data.option };
    } else {
      return { error: data.error || 'Erro ao atualizar opção' };
    }
  } catch (error) {
    console.error(`Error updating ${type} option:`, error);
    return { error: 'Erro de conexão' };
  }
}

/**
 * Deleta uma opção
 */
export async function deleteProductOption(
  type: OptionType,
  id: string
): Promise<{ success: boolean } | { error: string }> {
  try {
    const response = await fetch(`${API_URL}/api/product-options/${type}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true };
    } else {
      return { error: data.error || 'Erro ao deletar opção' };
    }
  } catch (error) {
    console.error(`Error deleting ${type} option:`, error);
    return { error: 'Erro de conexão' };
  }
}

