import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbvrbelxnilqncnhclie.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidnJiZWx4bmlscW5jbmhjbGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODM4NTksImV4cCI6MjA3Nzg1OTg1OX0.ckK0RNA9RtghSgNgnUF8KaXmVN_rNdtmocbV8VI_4t0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProduct(productName: string) {
  console.log(`🔍 Verificando produto: ${productName}\n`);
  
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, updated_at')
    .ilike('name', `%${productName}%`)
    .limit(1);

  if (error) {
    console.error('❌ Erro:', error);
    return;
  }

  if (!products || products.length === 0) {
    console.log('❌ Produto não encontrado');
    return;
  }

  const product = products[0];
  console.log(`✅ Produto encontrado: ${product.name} (ID: ${product.id})`);
  console.log(`📅 Última atualização: ${product.updated_at}\n`);

  if (!product.description) {
    console.log('❌ Descrição vazia!');
    return;
  }

  console.log('📄 Descrição completa:');
  console.log('='.repeat(80));
  console.log(product.description);
  console.log('='.repeat(80));
  console.log('');

  // Verificar seções
  const hasComposicao = /##\s*COMPOSIÇÃO BÁSICA/i.test(product.description);
  const hasEnriquecimento = /##\s*ENRIQUECIMENTO/i.test(product.description);
  const hasNiveis = /##\s*NÍVEIS DE GARANTIA/i.test(product.description);

  console.log('📋 Seções encontradas:');
  console.log(`   COMPOSIÇÃO BÁSICA: ${hasComposicao ? '✅' : '❌'}`);
  console.log(`   ENRIQUECIMENTO: ${hasEnriquecimento ? '✅' : '❌'}`);
  console.log(`   NÍVEIS DE GARANTIA: ${hasNiveis ? '✅' : '❌'}`);
  console.log('');

  // Extrair seções
  if (hasComposicao) {
    const match = product.description.match(/##\s*COMPOSIÇÃO BÁSICA\s*([\s\S]*?)(?=##|$)/i);
    if (match) {
      console.log('📝 COMPOSIÇÃO BÁSICA:');
      console.log(match[1].trim().substring(0, 200) + '...');
      console.log('');
    }
  }

  if (hasEnriquecimento) {
    const match = product.description.match(/##\s*ENRIQUECIMENTO[\s\S]*?([\s\S]*?)(?=##|$)/i);
    if (match) {
      console.log('📝 ENRIQUECIMENTO:');
      console.log(match[1].trim().substring(0, 200) + '...');
      console.log('');
    }
  }

  if (hasNiveis) {
    const match = product.description.match(/##\s*NÍVEIS DE GARANTIA\s*([\s\S]*?)(?=##|$)/i);
    if (match) {
      console.log('📝 NÍVEIS DE GARANTIA:');
      console.log(match[1].trim().substring(0, 200) + '...');
      console.log('');
    }
  }
}

// Verificar o primeiro produto da lista
const productName = process.argv[2] || 'PATÊ DOG & DOGS FRANGO';
checkProduct(productName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Erro:', error);
    process.exit(1);
  });

