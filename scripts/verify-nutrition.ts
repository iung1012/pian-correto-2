import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbvrbelxnilqncnhclie.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidnJiZWx4bmlscW5jbmhjbGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODM4NTksImV4cCI6MjA3Nzg1OTg1OX0.ckK0RNA9RtghSgNgnUF8KaXmVN_rNdtmocbV8VI_4t0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lista de produtos que devem ter informações nutricionais
const productsToCheck = [
  'SACHÊ DOG & DOGS SABOR CARNE',
  'SACHÊ CAT & CATS CARNE',
  'SACHÊ CAT & CATS FRANGO',
  'SACHÊ DOG & DOGS FILHOTES CARNE',
  'PATÊ DOG & DOGS FRANGO',
  'PATÊ DOG & DOGS CARNE',
  'PATÊ DOG & DOGS FÍGADO',
  'PATÊ DOG & DOGS CARNE FILHOTE',
  'PATÊ CAT & CATS FÍGADO',
  'PATÊ CAT & CATS FRANGO',
  'PATÊ CAT & CATS PEIXE',
  'PATÊ CAT & CATS CARNE'
];

async function verifyProducts() {
  console.log('🔍 Verificando produtos...\n');
  
  let allOk = true;
  const results: Array<{
    name: string;
    id: number;
    hasComposicao: boolean;
    hasEnriquecimento: boolean;
    hasNiveis: boolean;
    status: string;
  }> = [];

  for (const productName of productsToCheck) {
    try {
      // Buscar produto pelo nome
      const { data: products, error } = await supabase
        .from('products')
        .select('id, name, description')
        .ilike('name', `%${productName}%`);

      if (error) {
        console.error(`❌ Erro ao buscar ${productName}:`, error);
        allOk = false;
        continue;
      }

      if (!products || products.length === 0) {
        console.warn(`⚠️  Produto não encontrado: ${productName}`);
        results.push({
          name: productName,
          id: 0,
          hasComposicao: false,
          hasEnriquecimento: false,
          hasNiveis: false,
          status: 'NÃO ENCONTRADO'
        });
        allOk = false;
        continue;
      }

      // Verificar cada produto encontrado
      for (const product of products) {
        const description = product.description || '';
        
        const hasComposicao = /##\s*COMPOSIÇÃO BÁSICA/i.test(description);
        const hasEnriquecimento = /##\s*ENRIQUECIMENTO/i.test(description);
        const hasNiveis = /##\s*NÍVEIS DE GARANTIA/i.test(description);

        const isComplete = hasComposicao && hasEnriquecimento && hasNiveis;
        const status = isComplete ? '✅ OK' : '❌ INCOMPLETO';

        if (!isComplete) {
          allOk = false;
        }

        results.push({
          name: product.name,
          id: product.id,
          hasComposicao,
          hasEnriquecimento,
          hasNiveis,
          status
        });

        // Mostrar detalhes se estiver incompleto
        if (!isComplete) {
          console.log(`\n${status} - ${product.name} (ID: ${product.id})`);
          console.log(`   COMPOSIÇÃO: ${hasComposicao ? '✅' : '❌'}`);
          console.log(`   ENRIQUECIMENTO: ${hasEnriquecimento ? '✅' : '❌'}`);
          console.log(`   NÍVEIS: ${hasNiveis ? '✅' : '❌'}`);
          
          if (description) {
            const preview = description.substring(0, 200).replace(/\n/g, ' ');
            console.log(`   Preview: ${preview}...`);
          } else {
            console.log(`   ⚠️  Descrição vazia!`);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Erro ao verificar ${productName}:`, error);
      allOk = false;
    }
  }

  // Resumo
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA VERIFICAÇÃO');
  console.log('='.repeat(60));
  
  const okCount = results.filter(r => r.status === '✅ OK').length;
  const incompleteCount = results.filter(r => r.status === '❌ INCOMPLETO').length;
  const notFoundCount = results.filter(r => r.status === 'NÃO ENCONTRADO').length;

  console.log(`\n✅ Produtos completos: ${okCount}`);
  console.log(`❌ Produtos incompletos: ${incompleteCount}`);
  console.log(`⚠️  Produtos não encontrados: ${notFoundCount}`);
  console.log(`📦 Total verificado: ${results.length}`);

  // Lista detalhada
  console.log('\n' + '-'.repeat(60));
  console.log('📋 LISTA DETALHADA:');
  console.log('-'.repeat(60));
  
  results.forEach(result => {
    const icons = [
      result.hasComposicao ? '✅' : '❌',
      result.hasEnriquecimento ? '✅' : '❌',
      result.hasNiveis ? '✅' : '❌'
    ];
    console.log(`${result.status} | ${result.name} (ID: ${result.id})`);
    console.log(`   COMP | ENRIQ | NÍVEIS: ${icons.join('  |  ')}`);
  });

  if (allOk) {
    console.log('\n✨ Todos os produtos estão atualizados corretamente!');
  } else {
    console.log('\n⚠️  Alguns produtos precisam ser atualizados.');
    console.log('   Execute: npm run update-nutrition');
  }

  return { allOk, results };
}

// Executar verificação
verifyProducts()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro fatal:', error);
    process.exit(1);
  });

