import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbvrbelxnilqncnhclie.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidnJiZWx4bmlscW5jbmhjbGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODM4NTksImV4cCI6MjA3Nzg1OTg1OX0.ckK0RNA9RtghSgNgnUF8KaXmVN_rNdtmocbV8VI_4t0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para atualizar apenas as seções nutricionais, preservando DESCRIÇÃO e DIFERENCIAIS
function updateDescriptionSections(
  currentDescription: string,
  descricao: string,
  diferenciais: string,
  composicao: string,
  enriquecimento: string,
  niveis: string
): string {
  let updated = currentDescription || '';

  // Extrair DESCRIÇÃO existente se houver
  const descMatch = updated.match(/##\s*DESCRIÇÃO\s*([\s\S]*?)(?=##|$)/i);
  const existingDesc = descMatch ? descMatch[1].trim() : '';
  
  // Extrair DIFERENCIAIS existentes se houver
  const difMatch = updated.match(/##\s*DIFERENCIAIS\s*([\s\S]*?)(?=##|$)/i);
  const existingDif = difMatch ? difMatch[1].trim() : '';

  // Usar descrição e diferenciais fornecidos, ou manter os existentes
  const finalDescricao = descricao || existingDesc;
  const finalDiferenciais = diferenciais || existingDif;

  // Remover todas as seções antigas
  updated = updated.replace(/##\s*DESCRIÇÃO[\s\S]*?(?=##|$)/gi, '');
  updated = updated.replace(/##\s*COMPOSIÇÃO[\s\S]*?(?=##|$)/gi, '');
  updated = updated.replace(/##\s*ENRIQUECIMENTO[\s\S]*?(?=##|$)/gi, '');
  updated = updated.replace(/##\s*NÍVEIS DE GARANTIA[\s\S]*?(?=##|$)/gi, '');
  updated = updated.replace(/##\s*DIFERENCIAIS[\s\S]*?(?=##|$)/gi, '');
  updated = updated.trim();

  // Construir a descrição completa na ordem correta
  const sections: string[] = [];

  if (finalDescricao) {
    sections.push(`## DESCRIÇÃO\n${finalDescricao}`);
  }

  if (finalDiferenciais) {
    sections.push(`## DIFERENCIAIS\n${finalDiferenciais}`);
  }

  if (composicao) {
    sections.push(`## COMPOSIÇÃO BÁSICA\n${composicao}`);
  }

  if (enriquecimento) {
    sections.push(`## ENRIQUECIMENTO POR QUILOGRAMA DE PRODUTO\n${enriquecimento}`);
  }

  if (niveis) {
    sections.push(`## NÍVEIS DE GARANTIA POR QUILOGRAMA DE PRODUTO\n${niveis}`);
  }

  // Se havia conteúdo antes, manter apenas o que não é seção estruturada
  const nonSectionContent = updated.split(/##\s*/).filter(part => {
    const trimmed = part.trim();
    return trimmed && !trimmed.match(/^(DESCRIÇÃO|COMPOSIÇÃO|ENRIQUECIMENTO|NÍVEIS|DIFERENCIAIS)/i);
  }).join('\n\n').trim();

  const result = nonSectionContent 
    ? `${nonSectionContent}\n\n${sections.join('\n\n')}`
    : sections.join('\n\n');

  return result.trim();
}

// Dados completos dos produtos
const productsData = [
  {
    name: 'SACHÊ CAT & CATS CARNE',
    descricao: `Alimento úmido desenvolvido para gatos adultos de todas as raças. Com sabor irresistível de carne, textura macia e fórmula completa e balanceada, o sachê Cat & Cats Carne oferece palatabilidade, hidratação e nutrientes essenciais para a saúde diária do seu gato. Ideal para complementar refeições com muito mais sabor e qualidade.`,
    diferenciais: `Pronto para servir
Alimento Premium
Sem adição de corantes artificiais.`,
    composicao: `Coração de bovinos, carne de aves, fígado de suínos, farinha de vísceras de aves, óleo de aves, farinha de trigo, água, goma guar, ácido fólico, ácido pantotênico, biotina, cloreto de colina, cloreto de potássio, cloreto de sódio, dióxido de titânio, DL-metionina, etilenodiaminotetraacetato de sódio (E.D.T.A. sódico), glicose, L-glicina, niacina, óxido de zinco, taurina, tripolifosfato de sódio, vitaminas (A, B1, B12, B2, B6, D3, E, K3), corante caramelo e aditivo antioxidante.`,
    enriquecimento: `Ácido fólico (mín.) ..........................0,3 mg
Biotina (mín.) ................................0,04 mg
Colina (mín.) ................................. 250 mg
Metionina (mín.) .............................400 mg
Taurina (mín.) .................................610 mg
Vitamina A (mín.) ........................5.000 UI
Vitamina B1 (mín.) ..........................1,5 mg
Vitamina B2 (mín.) .............................6 mg
Vitamina B6 (mín.) .............................6 mg
Vitamina B12 (mín.) .........................15 µg
Vitamina D3 (mín.) .........................300 UI
Vitamina E (mín.) ..............................40 UI
Vitamina K3 (mín.) .......................0,07 mg
Zinco (mín.) .....................................1,8 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................2.000 mg
Extrato etéreo (mín.) ............................31 g
Fósforo (mín.) ..............................2.000 mg
Matéria fibrosa (máx.) .........................18 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.400 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................400 mg
Umidade (máx.) .................................830 g`
  },
  {
    name: 'SACHÊ DOG & DOGS SABOR CARNE',
    descricao: `O sachê Dog & Dogs Carne é um alimento úmido, desenvolvido para oferecer sabor, maciez e alta palatabilidade. Produzido com ingredientes selecionados e cozido a vapor, garante textura suculenta e aroma irresistível para o seu cão.`,
    diferenciais: `Alimento para cães adultos
Rico em vitaminas e minerais essenciais
Produzido com ingredientes selecionados`,
    composicao: `Coração de bovinos, fígado de suínos, carne de aves, farinha de vísceras de aves, óleo de aves, farinha de trigo, água, goma guar, ácido fólico, ácido pantotênico, biotina, cloreto de colina, cloreto de potássio, cloreto de sódio, etilenodiaminotetraacetato de sódio (E.D.T.A sódico), glicose, niacina, óxido de zinco, tripolifosfato de sódio, vitaminas (A, B1, B12, B2, B6, D3, E e K3) e corante caramelo.`,
    enriquecimento: `Ácido fólico (mín.) ........................0,16 mg
Ácido pantotênico (mín.) .................4,4 mg
Biotina (mín.) ................................0,04 mg
Colina (mín.) ...................................468 mg
Niacina (mín.) ..................................4,7 mg
Vitamina A (mín.) ........................1.700 UI
Vitamina B1 (mín.) ........................0,62 mg
Vitamina B2 (mín.) ..........................1,5 mg
Vitamina B6 (mín.) ..........................0,5 mg
Vitamina B12 (mín.) .........................13 µg
Vitamina D3 (mín.) .........................230 UI
Vitamina E (mín.) ..............................23 UI
Vitamina K3 (mín.) .......................0,03 mg
Zinco (mín.) ......................................90 mg`,
    niveis: `Cálcio (máx.) ...............................4.950 mg
Cálcio (mín.) ................................1.450 mg
Extrato etéreo (mín.) ............................32 g
Fósforo (mín.) .................................950 mg
Matéria fibrosa (máx.) .................2.100 mg
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.250 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................250 mg
Umidade (máx.) .................................830 g`
  },
  {
    name: 'SACHÊ CAT & CATS FRANGO',
    descricao: `Sachê CAT & CATS Frango é um alimento úmido balanceado, desenvolvido para complementar as necessidades nutricionais de gatos adultos de todas as raças. Preparado ao molho e cozido a vapor, oferece alta palatabilidade e textura suave, tornando a refeição muito mais saborosa para o seu gato.`,
    diferenciais: `Alimento premium
Sem conservantes artificiais
Indicado para todas as raças`,
    composicao: `Carne de aves, fígado de suínos, farinha de vísceras de aves, óleo de aves, farinha de trigo, água, goma guar, ácido fólico, ácido pantotênico, biotina, cloreto de colina, cloreto de potássio, cloreto de sódio, dióxido de titânio, DL-metionina, etilenodiaminotetraacetato de sódio (E.D.T.A. sódico), glicose, L-glicina, niacina, óxido de zinco, taurina, tripolifosfato de sódio, vitaminas (A, B1, B12, B2, B6, D3, E, K3).`,
    enriquecimento: `Ácido fólico (mín.) ..........................0,3 mg
Biotina (mín.) ................................0,04 mg
Colina (mín.) ................................. 250 mg
Metionina (mín.) .............................400 mg
Taurina (mín.) .................................610 mg
Vitamina A (mín.) ........................5.000 UI
Vitamina B1 (mín.) ..........................1,5 mg
Vitamina B2 (mín.) .............................6 mg
Vitamina B6 (mín.) .............................6 mg
Vitamina B12 (mín.) .........................15 µg
Vitamina D3 (mín.) .........................300 UI
Vitamina E (mín.) ..............................40 UI
Vitamina K3 (mín.) .......................0,07 mg
Zinco (mín.) .....................................1,8 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................2.000 mg
Extrato etéreo (mín.) ............................31 g
Fósforo (mín.) ..............................2.000 mg
Matéria fibrosa (máx.) .........................18 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.400 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................400 mg
Umidade (máx.) .................................830 g`
  },
  {
    name: 'PATÊ DOG & DOGS FRANGO',
    descricao: `Desenvolvido especialmente para atender às necessidades nutricionais de Cães Adultos. Nossa fórmula é pensada para garantir o máximo de sabor e saúde, sendo a escolha perfeita para cães que buscam mais palatabilidade ou precisam de um reforço na hidratação.`,
    diferenciais: `Produto natural
Sem aromas artificiais
Sem conservantes`,
    composicao: `Carne de aves, miúdos de suínos, farinha de vísceras de aves, óleo de aves, água, goma carragena, goma tara, goma guar, cloreto de sódio, tripolifosfato de sódio, cloreto de potássio, glicose, L-glicina, óxido de zinco, cloreto de colina, niacina, ácido pantotênico, ácido fólico, biotina, vitamina B1, vitamina B2, vitamina B6, vitamina K3, vitamina B12, vitamina A, vitamina D3, vitamina E, etilenodiaminotetraacetato (E.D.T.A. sódico) e aditivo antioxidante.`,
    enriquecimento: `Ácido Fólico (mín.) ..........................38 mg
Ácido Pantotênico (mín.) ................225 mg
Biotina (mín.) ..................................6,8 mg
Colina (mín.) ................................1.700 mg
Glicina (mín.) .......................................15 g
Glicose (mín.) ......................................60 g
Niacina (mín.) .................................865 mg
Vitamina A (mín.) ....................420.000 UI
Vitamina B1 (mín.) .........................270 mg
Vitamina B2 (mín.) .........................200 mg
Vitamina B6 (mín.) .........................200 mg
Vitamina B12 (mín.) ..................1.390 mcg
Vitamina D3 (mín.) ....................31.200 UI
Vitamina E (mín.) .........................4.100 UI
Vitamina K3 (mín.) ........................140 mg
Zinco (mín.) .................................4.200 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................1.500 mg
Extrato etéreo (mín.) ............................50 g
Fósforo (máx.) .............................4.000 mg
Fósforo (mín.) ..............................1.300 mg
Matéria fibrosa (máx.) .........................20 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.900 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................100 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'PATÊ CAT & CATS FÍGADO',
    descricao: `O Sachê Cat & Cats Fígado oferece uma refeição nutritiva e irresistível para o paladar felino. Produzido com proteínas de alta qualidade, garante excelente aceitação e uma alimentação equilibrada.`,
    diferenciais: `Proteína de alta qualidade
Fórmula com antioxidantes
Sem corantes artificiais`,
    composicao: `Miúdos de suínos, carne de aves, carne de salmão, água, goma carragena, goma tara, goma guar, glicose, dióxido de titânio, L-glicina, DL-metionina, taurina, L-arginina, óxido de zinco, cloreto de potássio, tripolifosfato de sódio, cloreto de sódio, niacina, cloreto de colina, ácido pantotênico, ácido fólico, biotina, vitamina B1, vitamina B6, vitamina B2, vitamina K3, vitamina B12, vitamina A, vitamina D3, vitamina E, etilenodiaminotetraacetato de sódio (E.D.T.A. sódico), corante caramelo e aditivo antioxidante.`,
    enriquecimento: `Ácido fólico (mín.) ...........................40 mg
Ácido pantotênico (mín.) ................325 mg
Arginina (mín.) ............................4.400 mg
Biotina (mín.) ................................0,03 mg
Colina (mín.) ................................1.700 mg
Dióxido de titânio (mín.) .....................68 g
Glicose (mín.) ....................................100 g
Glicina (mín.) .......................................15 g
Metionina (mín.) ..................................12 g
Niacina (mín.) ..............................2.000 mg
Taurina (mín.) ..............................6.900 mg
Vitamina A (mín.) ....................376.000 UI
Vitamina B1 (mín.) .........................280 mg
Vitamina B2 (mín.) .........................200 mg
Vitamina B6 (mín.) .........................200 mg
Vitamina B12 (mín.) ..................1.000 mcg
Vitamina D3 (mín.) ....................33.000 UI
Vitamina E (mín.) .........................2.000 UI
Vitamina K3 (mín.) ........................136 mg
Zinco (mín.) .................................4.000 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................2.000 mg
Extrato etéreo (mín.) ............................30 g
Fósforo (máx.) .............................8.000 mg
Fósforo (mín.) ..............................2.000 mg
Matéria fibrosa (máx.) .........................20 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.400 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................500 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'SACHÊ DOG & DOGS FILHOTES CARNE',
    descricao: `Desenvolvida especialmente para cães, Dog e Dogs Filhotes sabor Carne é a escolha perfeita para complementar o cardápio do seu pet, trazendo energia, vitalidade e uma alimentação saudável para o seu companheiro.`,
    diferenciais: `Alto Sabor de Carne
Proteína de alta qualidade
Sem corantes artificiais`,
    composicao: `Coração de bovinos, fígado de suínos, carne de aves, farinha de vísceras de aves, óleo de aves, farinha de trigo, água, goma guar, ácido fólico, ácido pantotênico, biotina, cloreto de colina, cloreto de potássio, cloreto de sódio, etilenodiaminotetraacetato de sódio (E.D.T.A sódico), glicose, niacina, óxido de zinco, tripolifosfato de sódio, vitaminas (A, B1, B12, B2, B6, D3, E e K3) e corante caramelo.`,
    enriquecimento: `Ácido fólico (mín.) ........................0,16 mg
Ácido pantotênico (mín.) .................4,4 mg
Biotina (mín.) ................................0,04 mg
Colina (mín.) ................................. 468 mg
Niacina (mín.) ..................................4,7 mg
Vitamina A (mín.) ........................1.700 UI
Vitamina B1 (mín.) ........................0,62 mg
Vitamina B2 (mín.) ..........................1,5 mg
Vitamina B6 (mín.) ..........................0,5 mg
Vitamina B12 (mín.) .........................13 µg
Vitamina D3 (mín.) .........................230 UI
Vitamina E (mín.) ..............................23 UI
Vitamina K3 (mín.) .......................0,03 mg
Zinco (mín.) ......................................90 mg`,
    niveis: `Cálcio (máx.) ...............................4.950 mg
Cálcio (mín.) ................................1.450 mg
Extrato etéreo (mín.) ............................32 g
Fósforo (mín.) .................................950 mg
Matéria fibrosa (máx.) .................2.100 mg
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.250 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................250 mg
Umidade (máx.) .................................830 g`
  },
  {
    name: 'PATÊ CAT & CATS FRANGO',
    descricao: `Patê Cat & Cats Frango oferece uma experiência alimentar rica em sabor e nutrientes! Com uma textura de patê suave e irresistível, este alimento úmido é perfeito para agradar o paladar do seu felino e, ao mesmo tempo, cuidar da sua saúde.`,
    diferenciais: `Proteína de alta qualidade
Textura Suave
Fonte de Energia`,
    composicao: `Carne de aves, carne de salmão, miúdos de suínos, água, goma carragena, goma tara, goma guar, glicose, dióxido de titânio, L-glicina, DL-metionina, taurina, L-arginina, óxido de zinco, cloreto de potássio, tripolifosfato de sódio, cloreto de sódio, niacina, cloreto de colina, ácido pantotênico, ácido fólico, biotina, vitamina B1, vitamina B6, vitamina B2, vitamina K3, vitamina B12, vitamina A, vitamina D3, vitamina E, etilenodiaminotetraacetato de sódio (E.D.T.A. sódico) e aditivo antioxidante.`,
    enriquecimento: `Ácido fólico (mín.) ...........................40 mg
Ácido pantotênico (mín.) ................325 mg
Arginina (mín.) ............................4.400 mg
Biotina (mín.) ................................0,03 mg
Colina (mín.) ................................1.700 mg
Dióxido de titânio (mín.) .....................68 g
Glicose (mín.) ....................................100 g
Glicina (mín.) .......................................15 g
Metionina (mín.) ..................................12 g
Niacina (mín.) ..............................2.000 mg
Taurina (mín.) ..............................6.900 mg
Vitamina A (mín.) ....................376.000 UI
Vitamina B1 (mín.) .........................280 mg
Vitamina B2 (mín.) .........................200 mg
Vitamina B6 (mín.) .........................200 mg
Vitamina B12 (mín.) ..................1.000 mcg
Vitamina D3 (mín.) ....................33.000 UI
Vitamina E (mín.) .........................2.000 UI
Vitamina K3 (mín.) ........................136 mg
Zinco (mín.) .................................4.000 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................2.000 mg
Extrato etéreo (mín.) ............................30 g
Fósforo (máx.) .............................8.000 mg
Fósforo (mín.) ..............................2.000 mg
Matéria fibrosa (máx.) .........................20 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.400 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................500 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'PATÊ DOG & DOGS CARNE',
    descricao: `Patê Dog & Dogs Carne é um alimento úmido, ideal para cães adultos, combinando o sabor irresistível da carne com a hidratação essencial que seu pet precisa.`,
    diferenciais: `Proteína de alta qualidade
Alta Digestibilidade
Textura Suave`,
    composicao: `Miúdos de suínos, carne de aves, farinha de vísceras de aves, óleo de aves, água, goma carragena, goma tara, goma guar, cloreto de sódio, tripolifosfato de sódio, cloreto de potássio, glicose, L-glicina, óxido de zinco, cloreto de colina, niacina, ácido pantotênico, ácido fólico, biotina, vitamina B1, vitamina B2, vitamina B6, vitamina K3, vitamina B12, vitamina A, vitamina D3, vitamina E, etilenodiaminotetraacetato (E.D.T.A. sódico) e aditivo antioxidante.`,
    enriquecimento: `Ácido Fólico (mín.) ..........................38 mg
Ácido Pantotênico (mín.) ................225 mg
Biotina (mín.) ..................................6,8 mg
Colina (mín.) ................................1.700 mg
Glicina (mín.) .......................................15 g
Glicose (mín.) ......................................60 g
Niacina (mín.) .................................865 mg
Vitamina A (mín.) ....................420.000 UI
Vitamina B1 (mín.) .........................270 mg
Vitamina B2 (mín.) .........................200 mg
Vitamina B6 (mín.) .........................200 mg
Vitamina B12 (mín.) ..................1.390 mcg
Vitamina D3 (mín.) ....................31.200 UI
Vitamina E (mín.) .........................4.100 UI
Vitamina K3 (mín.) ........................140 mg
Zinco (mín.) .................................4.200 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................1.500 mg
Extrato etéreo (mín.) ............................50 g
Fósforo (máx.) .............................4.000 mg
Fósforo (mín.) ..............................1.300 mg
Matéria fibrosa (máx.) .........................20 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.900 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................100 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'PATÊ CAT & CATS PEIXE',
    descricao: `Desenvolvido para gatos adultos, o patê Cat & Cats Peixe é um alimento úmido que combina o irresistível sabor do peixe com uma fórmula nutritiva que contribui para a saúde e o bem-estar do seu companheiro.`,
    diferenciais: `Proteína Qualidade
Vitalidade e Energia
Textura Suculenta`,
    composicao: `Carne de salmão, miúdos de suínos, carne de aves, água, goma carragena, goma tara, goma guar, glicose, dióxido de titânio, L-glicina, DL-metionina, taurina, L-arginina, óxido de zinco, cloreto de potássio, tripolifosfato de sódio, cloreto de sódio, niacina, cloreto de colina, ácido pantotênico, ácido fólico, biotina, vitamina B1, vitamina B6, vitamina B2, vitamina K3, vitamina B12, vitamina A, vitamina D3, vitamina E, etilenodiaminotetraacetato de sódio (E.D.T.A. sódico) e aditivo antioxidante.`,
    enriquecimento: `Ácido fólico (mín.) ...........................40 mg
Ácido pantotênico (mín.) ................325 mg
Arginina (mín.) ............................4.400 mg
Biotina (mín.) ................................0,03 mg
Colina (mín.) ................................1.700 mg
Dióxido de titânio (mín.) .....................68 g
Glicose (mín.) ....................................100 g
Glicina (mín.) .......................................15 g
Metionina (mín.) ..................................12 g
Niacina (mín.) ..............................2.000 mg
Taurina (mín.) ..............................6.900 mg
Vitamina A (mín.) ....................376.000 UI
Vitamina B1 (mín.) .........................280 mg
Vitamina B2 (mín.) .........................200 mg
Vitamina B6 (mín.) .........................200 mg
Vitamina B12 (mín.) ..................1.000 mcg
Vitamina D3 (mín.) ....................33.000 UI
Vitamina E (mín.) .........................2.000 UI
Vitamina K3 (mín.) ........................136 mg
Zinco (mín.) .................................4.000 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................2.000 mg
Extrato etéreo (mín.) ............................30 g
Fósforo (máx.) .............................8.000 mg
Fósforo (mín.) ..............................2.000 mg
Matéria fibrosa (máx.) .........................20 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.400 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................500 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'PATÊ DOG & DOGS FÍGADO',
    descricao: `Alimento úmido que combina um sabor rico e intenso no sabor fígado, com a qualidade de produtos selecionados. Desenvolvido para cães adultos, o patê Dog & Dogs Fígado é a opção perfeita para recompensar e cuidar do seu companheiro de quatro patas.`,
    diferenciais: `Produtos selecionados
Proteína de alta qualidade
Textura Suculenta`,
    composicao: `Miúdos de suínos, carne de aves, gordura de frango, farinha de vísceras de aves, óleo de aves, água, goma carragena, goma tara, goma guar, corante caramelo natural, cloreto de sódio, tripolifosfato de sódio, cloreto de potássio, glicose, L-glicina, óxido de zinco, cloreto de colina, niacina, ácido pantotênico, ácido fólico, biotina, vitamina B1, vitamina B2, vitamina B6, vitamina K3, vitamina B12, vitamina A, vitamina D3, vitamina E, etilenodiaminotetraacetato (E.D.T.A. sódico) e aditivo antioxidante.`,
    enriquecimento: `Ácido Fólico (mín.) ..........................38 mg
Ácido Pantotênico (mín.) ................225 mg
Biotina (mín.) ..................................6,8 mg
Colina (mín.) ................................1.700 mg
Glicina (mín.) .......................................15 g
Glicose (mín.) ......................................60 g
Niacina (mín.) .................................865 mg
Vitamina A (mín.) ....................420.000 UI
Vitamina B1 (mín.) .........................270 mg
Vitamina B2 (mín.) .........................200 mg
Vitamina B6 (mín.) .........................200 mg
Vitamina B12 (mín.) ..................1.390 mcg
Vitamina D3 (mín.) ....................31.200 UI
Vitamina E (mín.) .........................4.100 UI
Vitamina K3 (mín.) ........................140 mg
Zinco (mín.) .................................4.200 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................1.500 mg
Extrato etéreo (mín.) ............................50 g
Fósforo (máx.) .............................4.000 mg
Fósforo (mín.) ..............................1.300 mg
Matéria fibrosa (máx.) .........................20 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.900 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................100 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'PATÊ DOG & DOGS CARNE FILHOTE',
    descricao: `O patê Dog & Dogs Carne foi cuidadosamente formulado para complementar as necessidades energéticas e de desenvolvimento do seu pet. Garantia de qualidade, produtos selecionados e fonte rica em proteína para o seu filhote.`,
    diferenciais: `Proteína de Alta Qualidade
Sem substitutivos
Altamente palatável`,
    composicao: `Miúdos de suínos, carne de aves, farinha de vísceras de aves, óleo de aves, água, goma carragena, goma tara, goma guar, cloreto de sódio, tripolifosfato de sódio, cloreto de potássio, dióxido de titânio, óxido de zinco, cloreto de colina, niacina, ácido pantotênico, ácido fólico, biotina, vitaminas B1, vitaminas B2, vitaminas B6, vitaminas K3, vitaminas B12, vitaminasA, vitaminas D3, vitaminas E, etilenodiaminotetraacetato (E.D.T.A. sódico) e aditivo antioxidante.`,
    enriquecimento: `Ácido Fólico (mín.) ..........................44 mg
Ácido Pantotênico (mín.) ................370 mg
Biotina (mín.) ..................................7,8 mg
Colina (mín.) ................................1.700 mg
Dióxido de titânio (mín.) .....................68 g
Niacina (mín.) .................................980 mg
Vitamina A (mín.) ....................480.000 UI
Vitamina B1 (mín.) .........................310 mg
Vitamina B2 (mín.) .........................230 mg
Vitamina B6 (mín.) .........................230 mg
Vitamina B12 (mín.) ..................1.550 mcg
Vitamina D3 (mín.) ....................35.800 UI
Vitamina E (mín.) .........................4.700 UI
Vitamina K3 (mín.) .........................160mg
Zinco (mín.) .................................4.200 mg`,
    niveis: `Cálcio (máx.) ...............................4.800 mg
Cálcio (mín.) ................................3.600 mg
Extrato etéreo (mín.) ............................70 g
Fósforo (mín.) ..............................3.000 mg
Fósforo (máx.) .............................4.000 mg
Matéria fibrosa (máx.) .........................25 g
Matéria mineral (máx.) ........................25 g
Potássio (mín.) .............................2.000 mg
Proteína Bruta (mín.) ...........................90 g
Sódio (mín.) ....................................100 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'PATÊ CAT & CATS CARNE',
    descricao: `O patê Cat & Cats Carne é um alimento úmido e a forma ideal de complementar a dieta do seu felino, oferecendo um sabor que ele ama e, ao mesmo tempo, auxiliando na ingestão de líquidos.`,
    diferenciais: `Alta palatabilidade
Textura Suculenta
Proteína de Alta Qualidade`,
    composicao: `Miúdos de suínos, carne de aves, carne de salmão, água, goma carragena, goma tara, goma guar, glicose, dióxido de titânio, L-glicina, DL-metionina, taurina, L-arginina, óxido de zinco, cloreto de potássio, tripolifosfato de sódio, cloreto de sódio, niacina, cloreto de colina, ácido pantotênico, ácido fólico, biotina, vitamina B1, vitamina B6, vitamina B2, vitamina K3, vitamina B12, vitamina A, vitamina D3, vitamina E, etilenodiaminotetraacetato de sódio (E.D.T.A. sódico) e aditivo antioxidante.`,
    enriquecimento: `Ácido fólico (mín.) ...........................40 mg
Ácido pantotênico (mín.) ................325 mg
Arginina (mín.) ............................4.400 mg
Biotina (mín.) ................................0,03 mg
Colina (mín.) ................................1.700 mg
Dióxido de titânio (mín.) .....................68 g
Glicose (mín.) .....................................100g
Glicina (mín.) ........................................15g
Metionina (mín.) ...................................15g
Niacina (mín.) ..............................2.000 mg
Taurina (mín.) ..............................6.900 mg
Vitamina A (mín.) ....................376.000 UI
Vitamina B1 (mín.) .........................280 mg
Vitamina B2 (mín.) .........................200 mg
Vitamina B6 (mín.) .........................200 mg
Vitamina B12 (mín.) ..................1.000 mcg
Vitamina D3 (mín.) ....................33.000 UI
Vitamina E (mín.) .........................2.000 UI
Vitamina K3 (mín.) ........................136 mg
Zinco (mín.) .................................4.000 mg`,
    niveis: `Cálcio (máx.) ...............................5.000 mg
Cálcio (mín.) ................................2.000 mg
Extrato etéreo (mín.) ............................30 g
Fósforo (máx.) .............................8.000 mg
Fósforo (mín.) ..............................2.000 mg
Matéria fibrosa (máx.) .........................20 g
Matéria mineral (máx.) ........................30 g
Potássio (mín.) .............................1.400 mg
Proteína Bruta (mín.) ...........................80 g
Sódio (mín.) ....................................500 mg
Umidade (máx.) .................................820 g`
  },
  {
    name: 'Mikdog Snack Carne',
    descricao: `O Snack para cães Mikdog sabor carne é uma ótima opção de lanchinho para o seu amigo de quatro patas. Formulado com ingredientes selecionados, o alimento é prático, leve e ajuda a manter a dieta do cão balanceada. O Snack para cães Mikdog sabor carne é o petisco ideal para todas as fases do animal, da filhote à adulta. Promove a saciedade e tem fácil digestão.`,
    diferenciais: `100% satisfação garantida
Fórmulas fechadas
Sem substitutivos`,
    composicao: `Farinha de carne e ossos de bovinos, farinha de vísceras, farelo de soja (GM a partir de Agrobacterium sp), farelo de glúten de milho*, farinha de trigo, fécula de mandioca, óleo de aves, fígado de suínos, hidrolisado de fígado de aves, melaço de cana, colágeno, cloreto de sódio, sorbato de potássio, propilenoglicol, antioxidante BHA e BHT, corante caramelo e corante vermelho ponceau 4R.*Espécies doadoras do gene: Agrobacterium tumefaciens, Bacillus thuringiensis, Streptomyces tumefaciens, Streptomyces viridochromogenes.`,
    enriquecimento: '',
    niveis: `Cálcio (máx.) ...............................20 g
Cálcio (mín.) ................................10 g
Extrato etéreo (mín.) ............................50 g
Fósforo (mín.) ..............................8.000 mg
Matéria fibrosa (máx.) .........................30 g
Matéria mineral (máx.) ........................100 g
Proteína Bruta (mín.) ...........................300 g
Umidade (máx.) .................................260 g`
  },
  {
    name: 'MIKDOG SNACK FRANGO',
    descricao: `Para a hora do lanche do seu pet, escolha Snack para cães Mikdog sabor Frango. O alimento é prático, promove a saciedade, é de fácil digestão e mais: ajuda a manter a dieta do seu cão, seja ele adulto ou filhote, equilibrada. O Snack para cães Mikdog sabor Frango é elaborado com ingredientes de alta qualidade, e é um ótimo complemento para alimentação.`,
    diferenciais: `100% satisfação garantida
Fórmulas fechadas
Sem substitutivos`,
    composicao: `Farinha de vísceras de aves, farelo de soja (GM a partir de Agrobacterium sp), farelo de glúten de milho*, farinha de trigo, fécula de mandioca, óleo de aves, fígado de suínos, hidrolisado de fígado de aves, melaço de cana, colágeno, cloreto de sódio, sorbato de potássio, propilenoglicol, antioxidante BHA e BHT e corante caramelo.*Espécies doadoras do gene: Agrobacterium tumefaciens, Bacillus thuringiensis, Streptomyces tumefaciens, Streptomyces viridochromogenes.`,
    enriquecimento: '',
    niveis: `Cálcio (máx.) ...............................20 g
Cálcio (mín.) ................................10 g
Extrato etéreo (mín.) ............................50 g
Fósforo (mín.) ..............................8.000 mg
Matéria fibrosa (máx.) .........................30 g
Matéria mineral (máx.) ........................100 g
Proteína Bruta (mín.) ...........................300 g
Umidade (máx.) .................................260 g`
  }
];

// Função principal
async function updateProductsNutrition() {
  console.log('🚀 Iniciando atualização completa de informações nutricionais...\n');
  
  let updated = 0;
  let notFound = 0;
  let errors = 0;
  
  for (const productData of productsData) {
    try {
      // Buscar produto pelo nome (case insensitive, busca parcial)
      const { data: products, error: searchError } = await supabase
        .from('products')
        .select('id, name, description')
        .ilike('name', `%${productData.name}%`);
      
      if (searchError) {
        console.error(`❌ Erro ao buscar produto ${productData.name}:`, searchError);
        errors++;
        continue;
      }
      
      if (!products || products.length === 0) {
        console.warn(`⚠️  Produto não encontrado: ${productData.name}`);
        notFound++;
        continue;
      }
      
      // Atualizar cada produto encontrado
      for (const product of products) {
        const currentDescription = product.description || '';
        const updatedDescription = updateDescriptionSections(
          currentDescription,
          productData.descricao,
          productData.diferenciais,
          productData.composicao,
          productData.enriquecimento,
          productData.niveis
        );
        
        const { error: updateError } = await supabase
          .from('products')
          .update({ 
            description: updatedDescription,
            updated_at: new Date().toISOString()
          })
          .eq('id', product.id);
        
        if (updateError) {
          console.error(`❌ Erro ao atualizar produto ${product.name} (ID: ${product.id}):`, updateError);
          errors++;
        } else {
          console.log(`✅ Atualizado: ${product.name} (ID: ${product.id})`);
          updated++;
        }
      }
    } catch (error) {
      console.error(`❌ Erro ao processar ${productData.name}:`, error);
      errors++;
    }
  }
  
  console.log(`\n📊 Resumo da atualização:`);
  console.log(`   ✅ Produtos atualizados: ${updated}`);
  console.log(`   ⚠️  Produtos não encontrados: ${notFound}`);
  console.log(`   ❌ Erros: ${errors}`);
  console.log(`\n✨ Atualização concluída!`);
  
  return { updated, notFound, errors };
}

// Executar diretamente
updateProductsNutrition()
  .then(() => {
    console.log('\n✅ Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro fatal:', error);
    process.exit(1);
  });

