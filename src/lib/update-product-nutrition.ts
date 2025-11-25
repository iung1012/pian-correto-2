import { supabase } from './supabase';

// Função para atualizar apenas as seções nutricionais, preservando o resto
function updateDescriptionSections(
  currentDescription: string,
  composicao: string,
  enriquecimento: string,
  niveis: string
): string {
  let updated = currentDescription || '';

  // Atualizar ou adicionar seção COMPOSIÇÃO BÁSICA
  const composicaoSection = `## COMPOSIÇÃO BÁSICA\n${composicao}`;
  if (updated.includes('## COMPOSIÇÃO BÁSICA')) {
    updated = updated.replace(/##\s*COMPOSIÇÃO BÁSICA[\s\S]*?(?=##|$)/i, composicaoSection);
  } else {
    updated = updated ? `${updated}\n\n${composicaoSection}` : composicaoSection;
  }

  // Atualizar ou adicionar seção ENRIQUECIMENTO
  const enriquecimentoSection = `## ENRIQUECIMENTO MÍNIMO POR KG\n${enriquecimento}`;
  if (updated.includes('## ENRIQUECIMENTO')) {
    updated = updated.replace(/##\s*ENRIQUECIMENTO[\s\S]*?(?=##|$)/i, enriquecimentoSection);
  } else {
    updated = `${updated}\n\n${enriquecimentoSection}`;
  }

  // Atualizar ou adicionar seção NÍVEIS DE GARANTIA
  const niveisSection = `## NÍVEIS DE GARANTIA\n${niveis}`;
  if (updated.includes('## NÍVEIS DE GARANTIA')) {
    updated = updated.replace(/##\s*NÍVEIS DE GARANTIA[\s\S]*?(?=##|$)/i, niveisSection);
  } else {
    updated = `${updated}\n\n${niveisSection}`;
  }

  return updated.trim();
}

// Dados dos produtos
const productsData = [
  {
    name: 'SACHÊ DOG & DOGS SABOR CARNE',
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
    name: 'SACHÊ CAT & CATS CARNE',
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
    name: 'SACHÊ CAT & CATS FRANGO',
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
  }
];

// Função para atualizar os produtos
export async function updateProductsNutrition() {
  console.log('Iniciando atualização de informações nutricionais...');
  
  let updated = 0;
  let notFound = 0;
  
  for (const productData of productsData) {
    try {
      // Buscar produto pelo nome (case insensitive)
      const { data: products, error: searchError } = await supabase
        .from('products')
        .select('id, name, description')
        .ilike('name', `%${productData.name}%`);
      
      if (searchError) {
        console.error(`Erro ao buscar produto ${productData.name}:`, searchError);
        continue;
      }
      
      if (!products || products.length === 0) {
        console.warn(`Produto não encontrado: ${productData.name}`);
        notFound++;
        continue;
      }
      
      // Atualizar cada produto encontrado
      for (const product of products) {
        const currentDescription = product.description || '';
        const updatedDescription = updateDescriptionSections(
          currentDescription,
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
          console.error(`Erro ao atualizar produto ${product.name} (ID: ${product.id}):`, updateError);
        } else {
          console.log(`✓ Atualizado: ${product.name} (ID: ${product.id})`);
          updated++;
        }
      }
    } catch (error) {
      console.error(`Erro ao processar ${productData.name}:`, error);
    }
  }
  
  console.log(`\n✅ Atualização concluída!`);
  console.log(`   - Produtos atualizados: ${updated}`);
  console.log(`   - Produtos não encontrados: ${notFound}`);
  
  return { updated, notFound };
}

// Para executar diretamente (descomente se necessário)
// updateProductsNutrition();

