import { createProductOption } from '../src/lib/product-options';

async function seedProductOptions() {
  console.log('🌱 Criando opções padrão de produtos...\n');

  // Categories
  console.log('📦 Criando categorias (Animais)...');
  await createProductOption('category', 'Cães', 1);
  await createProductOption('category', 'Gatos', 2);
  await createProductOption('category', 'Peixes', 3);

  // Types
  console.log('🏷️  Criando tipos...');
  await createProductOption('type', 'Ração Seca', 1);
  await createProductOption('type', 'Alimento Úmido', 2);
  await createProductOption('type', 'Snack', 3);

  // Classifications
  console.log('⭐ Criando classificações...');
  await createProductOption('classification', 'Standard', 4);
  await createProductOption('classification', 'Premium', 3);
  await createProductOption('classification', 'Premium Especial', 2);
  await createProductOption('classification', 'Super Premium', 1);

  // Lines
  console.log('📚 Criando linhas...');
  await createProductOption('line', 'Mikdog', 1);
  await createProductOption('line', 'Mikcat', 2);
  await createProductOption('line', 'Prioritá', 3);
  await createProductOption('line', 'Dog & Dogs', 4);
  await createProductOption('line', 'Cat & Cats', 5);
  await createProductOption('line', 'Própeixes', 6);

  console.log('\n✅ Opções padrão criadas com sucesso!\n');
}

seedProductOptions()
  .catch((error) => {
    console.error('Erro:', error);
    process.exit(1);
  })
  .finally(async () => {
    const { prisma } = await import('../src/lib/prisma');
    await prisma.$disconnect();
  });

