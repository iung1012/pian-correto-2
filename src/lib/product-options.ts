import { prisma } from './prisma';

export interface ProductOption {
  id: string;
  name: string;
  sortOrder: number;
  createdAt: Date;
}

export type OptionType = 'category' | 'type' | 'classification' | 'line';

/**
 * Busca todas as opções de uma categoria
 */
export async function getProductOptions(type: OptionType): Promise<ProductOption[]> {
  try {
    switch (type) {
      case 'category':
        return await prisma.productCategory.findMany({
          orderBy: { sortOrder: 'asc' },
        });
      case 'type':
        return await prisma.productType.findMany({
          orderBy: { sortOrder: 'asc' },
        });
      case 'classification':
        return await prisma.productClassification.findMany({
          orderBy: { sortOrder: 'asc' },
        });
      case 'line':
        return await prisma.productLine.findMany({
          orderBy: { sortOrder: 'asc' },
        });
      default:
        return [];
    }
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
): Promise<ProductOption | null> {
  try {
    switch (type) {
      case 'category':
        return await prisma.productCategory.create({
          data: { name, sortOrder },
        });
      case 'type':
        return await prisma.productType.create({
          data: { name, sortOrder },
        });
      case 'classification':
        return await prisma.productClassification.create({
          data: { name, sortOrder },
        });
      case 'line':
        return await prisma.productLine.create({
          data: { name, sortOrder },
        });
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error creating ${type} option:`, error);
    return null;
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
): Promise<ProductOption | null> {
  try {
    switch (type) {
      case 'category':
        return await prisma.productCategory.update({
          where: { id },
          data: { name, sortOrder },
        });
      case 'type':
        return await prisma.productType.update({
          where: { id },
          data: { name, sortOrder },
        });
      case 'classification':
        return await prisma.productClassification.update({
          where: { id },
          data: { name, sortOrder },
        });
      case 'line':
        return await prisma.productLine.update({
          where: { id },
          data: { name, sortOrder },
        });
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error updating ${type} option:`, error);
    return null;
  }
}

/**
 * Deleta uma opção
 */
export async function deleteProductOption(
  type: OptionType,
  id: string
): Promise<boolean> {
  try {
    switch (type) {
      case 'category':
        await prisma.productCategory.delete({ where: { id } });
        return true;
      case 'type':
        await prisma.productType.delete({ where: { id } });
        return true;
      case 'classification':
        await prisma.productClassification.delete({ where: { id } });
        return true;
      case 'line':
        await prisma.productLine.delete({ where: { id } });
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.error(`Error deleting ${type} option:`, error);
    return false;
  }
}

