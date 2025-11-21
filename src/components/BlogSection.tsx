import React from 'react';
import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Share2 } from 'lucide-react';
import BlogModal from './BlogModal';

const BlogSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: 'Como escolher a ração ideal para seu cão',
      excerpt: 'Guia completo com critérios científicos e práticos para escolher a melhor alimentação para seu cão em cada fase da vida.',
      image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '18 de Novembro, 2025',
      readTime: '8 min',
      category: 'Nutrição',
      content: `
        <h2>A importância da escolha correta</h2>
        <p>Escolher a ração ideal para seu cão é uma das decisões mais importantes que você pode tomar como tutor responsável. A alimentação adequada impacta diretamente na saúde, energia, qualidade do pelo, sistema imunológico e longevidade do seu companheiro de quatro patas. Estudos mostram que cães alimentados com rações de alta qualidade podem viver até 2 anos a mais do que aqueles com alimentação inadequada.</p>

        <h3>Entendendo os rótulos das rações</h3>
        <p>Aprender a ler os rótulos é fundamental. Os ingredientes são listados em ordem decrescente de quantidade. Uma ração de qualidade deve ter:</p>
        <ul>
          <li><strong>Fonte proteica identificada como primeiro ingrediente:</strong> Procure por "carne de frango", "carne bovina" ou "salmão" em vez de apenas "proteína animal" ou "subprodutos"</li>
          <li><strong>Percentual mínimo de proteína:</strong> 18% para adultos e 22% para filhotes</li>
          <li><strong>Gorduras saudáveis:</strong> Ômega 3 e 6 para pele e pelo</li>
          <li><strong>Carboidratos de qualidade:</strong> Arroz integral, batata doce e aveia são melhores que milho e trigo</li>
          <li><strong>Vitaminas e minerais:</strong> Complexo B, vitaminas A, D, E e minerais essenciais</li>
        </ul>

        <h3>Fatores individuais a considerar</h3>
        <h4>Idade do animal</h4>
        <p><strong>Filhotes (até 12 meses):</strong> Necessitam de rações específicas com maior teor proteico e cálcio para desenvolvimento ósseo e muscular. O DHA é fundamental para desenvolvimento cerebral.</p>
        <p><strong>Adultos (1-7 anos):</strong> Rações de manutenção balanceadas que sustentam a energia diária sem promover ganho de peso.</p>
        <p><strong>Idosos (7+ anos):</strong> Fórmulas com menos calorias, mais fibras e suplementação de glucosamina para articulações.</p>

        <h4>Porte do cão</h4>
        <p><strong>Raças pequenas:</strong> Metabolismo acelerado, precisam de kibbles menores e maior densidade calórica por porção.</p>
        <p><strong>Raças médias:</strong> Necessidades equilibradas com foco em manutenção de peso ideal.</p>
        <p><strong>Raças grandes e gigantes:</strong> Precisam de suporte articular extra e controle de crescimento para evitar displasia.</p>

        <h4>Nível de atividade física</h4>
        <p>Cães de trabalho, esportistas ou muito ativos podem precisar de até 40% mais calorias que cães sedentários do mesmo porte. Rações para cães ativos têm maior concentração de proteínas e gorduras.</p>

        <h4>Condições de saúde especiais</h4>
        <ul>
          <li><strong>Sensibilidade digestiva:</strong> Rações hipoalergênicas ou com proteína hidrolisada</li>
          <li><strong>Problemas renais:</strong> Baixo teor de fósforo e proteína controlada</li>
          <li><strong>Diabetes:</strong> Alto teor de fibras e baixo índice glicêmico</li>
          <li><strong>Problemas cardíacos:</strong> Redução de sódio e suplementação com taurina</li>
          <li><strong>Sobrepeso:</strong> Rações light com L-carnitina</li>
        </ul>

        <h3>Categorias de rações no mercado</h3>
        <h4>Rações Econômicas</h4>
        <p>Geralmente contêm subprodutos e ingredientes de menor qualidade. Podem resultar em maior volume de fezes e menor aproveitamento nutricional.</p>

        <h4>Rações Premium</h4>
        <p>Ingredientes de média qualidade, melhor digestibilidade e formulações mais específicas por idade e porte.</p>

        <h4>Rações Super Premium</h4>
        <p>Proteínas de alta qualidade, ingredientes nobres, conservantes naturais e formulações científicas avançadas. Melhor custo-benefício no longo prazo pela maior digestibilidade.</p>

        <h4>Rações Premium Especial</h4>
        <p>Formulações holísticas com ingredientes naturais, probióticos, prebióticos e nutracêuticos. Máxima qualidade e biodisponibilidade.</p>

        <h3>Processo de transição alimentar</h3>
        <p>Ao mudar a ração do seu cão, siga este protocolo de 10 dias:</p>
        <ul>
          <li><strong>Dias 1-3:</strong> 75% ração antiga + 25% ração nova</li>
          <li><strong>Dias 4-6:</strong> 50% ração antiga + 50% ração nova</li>
          <li><strong>Dias 7-9:</strong> 25% ração antiga + 75% ração nova</li>
          <li><strong>Dia 10:</strong> 100% ração nova</li>
        </ul>
        <p>Monitore as fezes durante a transição. Fezes muito moles ou diarreia indicam que o processo precisa ser mais lento.</p>

        <h3>Sinais de uma alimentação adequada</h3>
        <ul>
          <li>Pelo brilhante e sedoso</li>
          <li>Pele saudável sem descamação</li>
          <li>Fezes firmes e em quantidade moderada</li>
          <li>Energia e disposição adequadas</li>
          <li>Peso ideal mantido</li>
          <li>Boa musculatura</li>
          <li>Dentes limpos e gengivas rosadas</li>
        </ul>

        <h3>Mitos comuns sobre rações</h3>
        <p><strong>Mito 1:</strong> "Ração sem grãos é sempre melhor" - Falso. A maioria dos cães tolera grãos bem, e eles fornecem energia e fibras importantes.</p>
        <p><strong>Mito 2:</strong> "Devo variar a ração frequentemente" - Falso. Mudanças constantes podem causar problemas digestivos. Mantenha a mesma ração quando ela funciona bem.</p>
        <p><strong>Mito 3:</strong> "Ração cara é desperdício" - Falso. Rações premium têm maior digestibilidade, você alimenta menos e o cão absorve mais nutrientes, resultando em melhor saúde e menor custo veterinário.</p>

        <p><strong>Conclusão:</strong> Invista tempo na escolha da ração ideal. Consulte sempre um médico veterinário, especialmente se seu cão tem necessidades especiais. A ração certa é um investimento na saúde e longevidade do seu melhor amigo!</p>
      `
    },
    {
      id: 2,
      title: 'Alimentação de filhotes: guia completo',
      excerpt: 'Protocolo detalhado de nutrição para filhotes desde o nascimento até a fase adulta, com cronogramas e quantidades específicas para cada raça.',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '15 de Novembro, 2025',
      readTime: '10 min',
      category: 'Cuidados',
      content: `
        <h2>Nutrição na fase mais importante da vida</h2>
        <p>Os primeiros meses de vida são cruciais para o desenvolvimento saudável do filhote. Uma alimentação adequada nesta fase estabelece as bases para uma vida longa e saudável, prevenindo problemas futuros e garantindo crescimento adequado dos ossos, músculos, cérebro e sistema imunológico. Erros nutricionais nesta fase podem ter consequências irreversíveis.</p>

        <h3>Fase Neonatal (0-4 semanas): O poder do leite materno</h3>
        <p>O leite materno é o alimento perfeito, contendo:</p>
        <ul>
          <li><strong>Colostro (primeiras 72h):</strong> Rico em anticorpos (imunoglobulinas), proteínas e vitaminas. Essencial para a imunidade do filhote</li>
          <li><strong>Leite de transição (3-14 dias):</strong> Composição gradualmente muda, mantendo alto valor nutricional</li>
          <li><strong>Leite maduro (após 2 semanas):</strong> Composição estável com todos os nutrientes necessários</li>
        </ul>
        <p><strong>Quando o leite materno não está disponível:</strong> Use substitutos específicos para filhotes caninos. Leite de vaca é inadequado e pode causar diarreia severa. Fórmulas comerciais devem ser aquecidas a 37-38°C.</p>

        <h3>Fase de Desmame (4-8 semanas): Transição gradual</h3>
        <p>O desmame deve ser gradual para evitar estresse digestivo:</p>
        <h4>Semana 4:</h4>
        <ul>
          <li>Introduza ração premium para filhotes umedecida com água morna formando uma papinha</li>
          <li>Ofereça 3-4 vezes ao dia em pequenas quantidades</li>
          <li>Mantenha acesso ao leite materno</li>
        </ul>
        <h4>Semana 5-6:</h4>
        <ul>
          <li>Reduza gradualmente a água na ração</li>
          <li>Aumente a frequência para 4-5 refeições diárias</li>
          <li>Filhotes começam a depender menos do leite materno</li>
        </ul>
        <h4>Semana 7-8:</h4>
        <ul>
          <li>Ração completamente seca (kibbles)</li>
          <li>Desmame completo aos 8 semanas</li>
          <li>Água fresca sempre disponível</li>
        </ul>

        <h3>Fase de Crescimento Rápido (2-6 meses): Nutrição intensa</h3>
        <p>Esta é a fase de crescimento mais acelerado. A alimentação deve ser:</p>
        <ul>
          <li><strong>Alta em proteína:</strong> Mínimo 28-30% para desenvolvimento muscular</li>
          <li><strong>Cálcio e fósforo balanceados:</strong> Proporção 1.2:1 para formação óssea adequada</li>
          <li><strong>DHA:</strong> Ácido graxo essencial para desenvolvimento cerebral e visual</li>
          <li><strong>Vitaminas do complexo B:</strong> Suporte ao metabolismo energético</li>
        </ul>

        <h4>Frequência alimentar por idade:</h4>
        <ul>
          <li><strong>2-3 meses:</strong> 4 refeições por dia (manhã, meio-dia, tarde, noite)</li>
          <li><strong>3-6 meses:</strong> 3 refeições por dia (manhã, tarde, noite)</li>
          <li><strong>6-12 meses:</strong> 2 refeições por dia (manhã e noite)</li>
        </ul>

        <h4>Quantidade diária por porte (2-6 meses):</h4>
        <ul>
          <li><strong>Raças pequenas (até 10kg adulto):</strong> 3-4% do peso corporal atual</li>
          <li><strong>Raças médias (10-25kg adulto):</strong> 4-5% do peso corporal atual</li>
          <li><strong>Raças grandes (25-45kg adulto):</strong> 5-6% do peso corporal atual</li>
          <li><strong>Raças gigantes (45kg+ adulto):</strong> 6-7% do peso corporal atual</li>
        </ul>

        <h3>Fase de Crescimento Moderado (6-12 meses): Consolidação</h3>
        <p>O ritmo de crescimento desacelera, mas as necessidades ainda são elevadas:</p>
        <ul>
          <li>Mantenha ração para filhotes até pelo menos 12 meses</li>
          <li>Raças grandes e gigantes devem usar ração específica até 18-24 meses</li>
          <li>Ajuste porções mensalmente conforme o ganho de peso</li>
          <li>Monitore condição corporal - filhote deve estar magro, mas não magro demais</li>
        </ul>

        <h3>Nutrientes críticos para filhotes</h3>
        <h4>Proteína (28-32%)</h4>
        <p>Fundamental para crescimento muscular. Fontes ideais: frango, carne bovina, cordeiro, peixe. Evite rações com "subprodutos" como principal fonte proteica.</p>

        <h4>Cálcio e Fósforo</h4>
        <p>Essenciais para ossos e dentes. Excesso é tão prejudicial quanto falta, especialmente em raças grandes. NUNCA suplemente sem orientação veterinária.</p>

        <h4>DHA (Ácido docosahexaenoico)</h4>
        <p>Encontrado em óleo de peixe, crucial para desenvolvimento do cérebro e retina. Filhotes com DHA adequado têm melhor capacidade de aprendizado.</p>

        <h4>Prebióticos e Probióticos</h4>
        <p>Fortalecem o sistema digestivo e imunológico. Busque rações que contenham FOS, MOS ou culturas de Lactobacillus.</p>

        <h3>Sinais de nutrição adequada</h3>
        <ul>
          <li><strong>Crescimento consistente:</strong> Ganho de peso semanal regular</li>
          <li><strong>Energia apropriada:</strong> Ativo mas não hiperativo</li>
          <li><strong>Pelo brilhante:</strong> Macio e sem falhas</li>
          <li><strong>Fezes firmes:</strong> Marrom, formadas, sem odor excessivo</li>
          <li><strong>Desenvolvimento muscular:</strong> Costelas devem ser sentidas mas não visíveis</li>
          <li><strong>Olhos brilhantes:</strong> Claros e alertas</li>
          <li><strong>Gengivas rosadas:</strong> Boa perfusão sanguínea</li>
        </ul>

        <h3>Erros comuns a evitar</h3>
        <ul>
          <li><strong>Superalimentação:</strong> Causa obesidade e problemas articulares, especialmente em raças grandes</li>
          <li><strong>Ração de adulto prematura:</strong> Não fornece nutrientes suficientes para crescimento</li>
          <li><strong>Suplementação não orientada:</strong> Pode desequilibrar minerais e causar problemas ósseos</li>
          <li><strong>Alimentação inconsistente:</strong> Mudanças frequentes de ração causam problemas digestivos</li>
          <li><strong>Petiscos excessivos:</strong> Não devem ultrapassar 5% das calorias diárias</li>
          <li><strong>Alimentos humanos:</strong> Muitos são tóxicos ou desequilibram a dieta</li>
        </ul>

        <h3>Sinais de alerta nutricional</h3>
        <p>Consulte imediatamente um veterinário se observar:</p>
        <ul>
          <li>Perda de peso ou ganho insuficiente</li>
          <li>Diarreia persistente</li>
          <li>Vômitos frequentes</li>
          <li>Letargia excessiva</li>
          <li>Pelo opaco ou queda de pelo</li>
          <li>Barriga inchada (pode indicar vermes)</li>
          <li>Fraqueza nas patas traseiras</li>
          <li>Convulsões (pode ser hipoglicemia)</li>
        </ul>

        <h3>Transição para ração de adulto</h3>
        <p>Momento varia por porte:</p>
        <ul>
          <li><strong>Raças pequenas:</strong> 10-12 meses</li>
          <li><strong>Raças médias:</strong> 12-15 meses</li>
          <li><strong>Raças grandes:</strong> 15-18 meses</li>
          <li><strong>Raças gigantes:</strong> 18-24 meses</li>
        </ul>
        <p>Faça a transição gradual em 10-14 dias para evitar problemas digestivos.</p>

        <p><strong>Conclusão:</strong> A nutrição adequada de filhotes é um investimento na saúde futura do cão. Escolha sempre rações premium específicas para filhotes, siga as recomendações de quantidade, mantenha horários regulares e monitore o desenvolvimento. Consultas veterinárias regulares garantem que o crescimento está no caminho certo!</p>
      `
    },
    {
      id: 3,
      title: 'Cuidados especiais com cães idosos',
      excerpt: 'Aprenda como adaptar a alimentação e cuidados para garantir qualidade de vida na terceira idade.',
      image: 'https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '12 de Novembro, 2025',
      readTime: '9 min',
      category: 'Saúde',
      content: `
        <h2>A terceira idade canina</h2>
        <p>Cães idosos merecem cuidados especiais para manter sua qualidade de vida. A alimentação adequada é fundamental nesta fase da vida.</p>
        
        <h3>Quando um cão é considerado idoso?</h3>
        <ul>
          <li>Cães pequenos: a partir dos 10-12 anos</li>
          <li>Cães médios: a partir dos 8-10 anos</li>
          <li>Cães grandes: a partir dos 6-8 anos</li>
        </ul>
        
        <h3>Necessidades nutricionais especiais:</h3>
        <h4>Proteína de alta qualidade</h4>
        <p>Cães idosos precisam de proteínas facilmente digestíveis para manter a massa muscular.</p>
        
        <h4>Menos calorias</h4>
        <p>Metabolismo mais lento requer menos calorias para evitar o sobrepeso.</p>
        
        <h4>Suplementos importantes</h4>
        <ul>
          <li>Glucosamina e condroitina para articulações</li>
          <li>Ômega 3 para função cerebral</li>
          <li>Antioxidantes para o sistema imunológico</li>
        </ul>
        
        <h3>Sinais de alerta:</h3>
        <p>Mudanças no apetite, dificuldade para mastigar, perda de peso ou ganho excessivo devem ser avaliados por um veterinário.</p>
        
        <p>Com os cuidados adequados, seu companheiro idoso pode ter muitos anos felizes pela frente!</p>
      `
    },
    {
      id: 4,
      title: 'Nutrição felina: necessidades especiais dos gatos',
      excerpt: 'Guia científico completo sobre as necessidades nutricionais únicas dos felinos como carnívoros obrigatórios, incluindo nutrientes essenciais e estratégias de hidratação.',
      image: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '10 de Novembro, 2025',
      readTime: '9 min',
      category: 'Nutrição',
      content: `
        <h2>Os felinos são únicos</h2>
        <p>Os gatos possuem necessidades nutricionais muito específicas que os diferenciam dos cães. Como carnívoros obrigatórios, eles precisam de uma dieta rica em proteínas animais e nutrientes específicos.</p>
        
        <h3>Nutrientes essenciais para gatos:</h3>
        <h4>Taurina</h4>
        <p>Aminoácido essencial que os gatos não conseguem produzir em quantidade suficiente. Fundamental para a saúde cardíaca e visual.</p>
        
        <h4>Arginina</h4>
        <p>Outro aminoácido crucial para o metabolismo felino, especialmente para a eliminação de amônia.</p>
        
        <h4>Ácido araquidônico</h4>
        <p>Ácido grasso essencial encontrado apenas em tecidos animais, importante para a pele e pelo.</p>
        
        <h3>Características da alimentação felina:</h3>
        <ul>
          <li>Preferem múltiplas pequenas refeições ao longo do dia</li>
          <li>Necessitam de alta concentração proteica (mínimo 26%)</li>
          <li>Baixa tolerância a carboidratos</li>
          <li>Precisam de estímulo para beber água</li>
        </ul>
        
        <h3>Sinais de boa alimentação:</h3>
        <p>Pelo brilhante, energia adequada, peso ideal e boa hidratação são indicadores de uma nutrição felina adequada.</p>
      `
    },
    {
      id: 5,
      title: 'Hidratação: a importância da água para pets',
      excerpt: 'Descubra por que a hidratação adequada é fundamental para a saúde do seu pet e como estimulá-la.',
      image: 'https://images.pexels.com/photos/1346086/pexels-photo-1346086.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '8 de Novembro, 2025',
      readTime: '7 min',
      category: 'Saúde',
      content: `
        <h2>Água: o nutriente esquecido</h2>
        <p>A água é o nutriente mais importante para qualquer ser vivo, mas muitas vezes é negligenciada na rotina dos pets. Uma hidratação adequada é essencial para todas as funções corporais.</p>
        
        <h3>Funções da água no organismo:</h3>
        <ul>
          <li>Regulação da temperatura corporal</li>
          <li>Transporte de nutrientes</li>
          <li>Eliminação de toxinas</li>
          <li>Lubrificação das articulações</li>
          <li>Digestão adequada</li>
        </ul>
        
        <h3>Quantidade diária recomendada:</h3>
        <h4>Para cães:</h4>
        <p>Aproximadamente 60-70ml por kg de peso corporal por dia.</p>
        
        <h4>Para gatos:</h4>
        <p>Cerca de 50-60ml por kg de peso corporal por dia.</p>
        
        <h3>Como estimular o consumo de água:</h3>
        <ul>
          <li>Mantenha sempre água fresca e limpa disponível</li>
          <li>Use bebedouros de fonte para gatos</li>
          <li>Adicione água à ração seca</li>
          <li>Ofereça alimentos úmidos</li>
          <li>Coloque múltiplos pontos de água pela casa</li>
        </ul>
        
        <h3>Sinais de desidratação:</h3>
        <p>Gengivas secas, letargia, perda de elasticidade da pele e urina concentrada são sinais de alerta que requerem atenção veterinária imediata.</p>
      `
    },
    {
      id: 6,
      title: 'Transição alimentar: como mudar a ração sem estresse',
      excerpt: 'Aprenda o método correto para fazer a transição alimentar e evitar problemas digestivos.',
      image: 'https://images.pexels.com/photos/1288398/pexels-photo-1288398.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '5 de Novembro, 2025',
      readTime: '8 min',
      category: 'Cuidados',
      content: `
        <h2>Mudança gradual é a chave</h2>
        <p>Mudar a ração do seu pet de forma abrupta pode causar problemas digestivos como diarreia, vômitos e desconforto. A transição gradual é essencial para o bem-estar do animal.</p>
        
        <h3>Cronograma de transição (7-10 dias):</h3>
        <h4>Dias 1-2:</h4>
        <p>75% da ração antiga + 25% da ração nova</p>
        
        <h4>Dias 3-4:</h4>
        <p>50% da ração antiga + 50% da ração nova</p>
        
        <h4>Dias 5-6:</h4>
        <p>25% da ração antiga + 75% da ração nova</p>
        
        <h4>Dia 7 em diante:</h4>
        <p>100% da ração nova</p>
        
        <h3>Sinais de que a transição está indo bem:</h3>
        <ul>
          <li>Fezes normais e bem formadas</li>
          <li>Apetite mantido</li>
          <li>Ausência de vômitos</li>
          <li>Comportamento normal</li>
        </ul>
        
        <h3>Quando prolongar a transição:</h3>
        <p>Pets com estômago sensível, idosos ou com histórico de problemas digestivos podem precisar de uma transição mais lenta, de até 14 dias.</p>
        
        <p>Se houver qualquer sinal de desconforto digestivo, volte à proporção anterior e consulte um veterinário.</p>
      `
    },
    {
      id: 7,
      title: 'Obesidade em pets: prevenção e tratamento',
      excerpt: 'Protocolo completo de prevenção e reversão da obesidade canina e felina, com estratégias nutricionais e planos de exercícios personalizados.',
      image: 'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2 de Novembro, 2025',
      readTime: '10 min',
      category: 'Saúde',
      content: `
        <h2>Um problema crescente</h2>
        <p>A obesidade em pets é uma das condições mais comuns na medicina veterinária moderna. Estima-se que mais de 50% dos cães e gatos estejam acima do peso ideal.</p>
        
        <h3>Causas da obesidade:</h3>
        <ul>
          <li>Superalimentação</li>
          <li>Falta de exercícios</li>
          <li>Petiscos em excesso</li>
          <li>Castração (reduz metabolismo)</li>
          <li>Predisposição genética</li>
          <li>Problemas hormonais</li>
        </ul>
        
        <h3>Como identificar o sobrepeso:</h3>
        <h4>Teste das costelas:</h4>
        <p>Você deve conseguir sentir as costelas com uma leve pressão das mãos.</p>
        
        <h4>Cintura visível:</h4>
        <p>Vista de cima, o pet deve ter uma cintura definida atrás das costelas.</p>
        
        <h3>Estratégias para o controle de peso:</h3>
        <ul>
          <li>Ração específica para controle de peso</li>
          <li>Porções medidas e controladas</li>
          <li>Exercícios regulares e adequados</li>
          <li>Redução de petiscos</li>
          <li>Acompanhamento veterinário regular</li>
        </ul>
        
        <h3>Benefícios do peso ideal:</h3>
        <p>Pets no peso ideal vivem mais, têm menos problemas articulares, melhor qualidade de vida e menor risco de doenças como diabetes.</p>
      `
    },
    {
      id: 8,
      title: 'Alergias alimentares em pets: identificação e manejo',
      excerpt: 'Como reconhecer sinais de alergia alimentar e quais medidas tomar para o bem-estar do seu pet.',
      image: 'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '30 de Outubro, 2025',
      readTime: '9 min',
      category: 'Saúde',
      content: `
        <h2>Reconhecendo as alergias alimentares</h2>
        <p>As alergias alimentares em pets são mais comuns do que muitos tutores imaginam. Identificar os sinais precocemente é fundamental para o tratamento adequado.</p>
        
        <h3>Sintomas mais comuns:</h3>
        <h4>Sintomas cutâneos:</h4>
        <ul>
          <li>Coceira excessiva</li>
          <li>Vermelhidão na pele</li>
          <li>Feridas por lambedura</li>
          <li>Perda de pelo</li>
          <li>Otite recorrente</li>
        </ul>
        
        <h4>Sintomas digestivos:</h4>
        <ul>
          <li>Diarreia crônica</li>
          <li>Vômitos frequentes</li>
          <li>Gases excessivos</li>
          <li>Perda de apetite</li>
        </ul>
        
        <h3>Alérgenos mais comuns:</h3>
        <ul>
          <li>Proteínas: frango, carne bovina, cordeiro</li>
          <li>Grãos: trigo, milho, soja</li>
          <li>Laticínios</li>
          <li>Ovos</li>
        </ul>
        
        <h3>Diagnóstico e tratamento:</h3>
        <p>O diagnóstico é feito através de dieta de eliminação, onde se remove os possíveis alérgenos e se reintroduz gradualmente para identificar o causador.</p>
        
        <h3>Rações hipoalergênicas:</h3>
        <p>Existem rações especiais com proteínas hidrolisadas ou fontes proteicas alternativas que podem ajudar pets com alergias alimentares.</p>
      `
    },
    {
      id: 9,
      title: 'Benefícios da ração úmida para pets',
      excerpt: 'Conheça as vantagens dos alimentos úmidos e como incorporá-los na dieta do seu pet.',
      image: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '28 de Outubro, 2025',
      readTime: '8 min',
      category: 'Nutrição',
      content: `
        <h2>Alimentos úmidos: mais que um mimo</h2>
        <p>As rações úmidas não são apenas um agrado para os pets, mas oferecem benefícios nutricionais importantes que complementam a alimentação seca.</p>
        
        <h3>Principais benefícios:</h3>
        <h4>Hidratação extra</h4>
        <p>Alimentos úmidos contêm 70-80% de água, ajudando na hidratação diária do pet.</p>
        
        <h4>Palatabilidade superior</h4>
        <p>O aroma e textura dos alimentos úmidos são mais atrativos, especialmente para pets seletivos.</p>
        
        <h4>Digestibilidade</h4>
        <p>A textura macia facilita a digestão, ideal para pets idosos ou com problemas dentários.</p>
        
        <h3>Quando usar alimentos úmidos:</h3>
        <ul>
          <li>Pets que bebem pouca água</li>
          <li>Animais em recuperação</li>
          <li>Pets idosos com dificuldades de mastigação</li>
          <li>Como complemento nutricional</li>
          <li>Para estimular o apetite</li>
        </ul>
        
        <h3>Combinando úmido e seco:</h3>
        <p>A combinação de ração seca e úmida pode oferecer o melhor dos dois mundos: praticidade, limpeza dental e hidratação extra.</p>
        
        <p>Consulte sempre um veterinário para determinar a melhor proporção para seu pet.</p>
      `
    },
    {
      id: 10,
      title: 'Exercícios e alimentação: a dupla perfeita',
      excerpt: 'Como equilibrar atividade física e nutrição para manter seu pet saudável e em forma.',
      image: 'https://images.pexels.com/photos/1612847/pexels-photo-1612847.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '25 de Outubro, 2025',
      readTime: '9 min',
      category: 'Comportamento',
      content: `
        <h2>Movimento e nutrição andam juntos</h2>
        <p>A combinação de exercícios adequados com uma alimentação balanceada é a fórmula para um pet saudável, feliz e com qualidade de vida.</p>
        
        <h3>Benefícios dos exercícios:</h3>
        <ul>
          <li>Controle de peso</li>
          <li>Fortalecimento muscular</li>
          <li>Saúde cardiovascular</li>
          <li>Bem-estar mental</li>
          <li>Redução de comportamentos destrutivos</li>
        </ul>
        
        <h3>Exercícios por porte do cão:</h3>
        <h4>Cães pequenos:</h4>
        <p>Caminhadas curtas, brincadeiras em casa, 30-45 minutos diários.</p>
        
        <h4>Cães médios:</h4>
        <p>Caminhadas moderadas, corridas leves, 45-60 minutos diários.</p>
        
        <h4>Cães grandes:</h4>
        <p>Caminhadas longas, corridas, natação, 60-90 minutos diários.</p>
        
        <h3>Alimentação pré e pós-exercício:</h3>
        <h4>Antes do exercício:</h4>
        <p>Evite alimentar 2 horas antes de atividades intensas para prevenir torção gástrica.</p>
        
        <h4>Após o exercício:</h4>
        <p>Aguarde 30 minutos para oferecer comida, mas água deve estar sempre disponível.</p>
        
        <h3>Para gatos:</h3>
        <p>Estimule brincadeiras com brinquedos interativos, arranhadores e circuitos. Sessões de 10-15 minutos várias vezes ao dia.</p>
      `
    },
    {
      id: 11,
      title: 'Petiscos saudáveis: como escolher e quando oferecer',
      excerpt: 'Guia completo sobre petiscos: tipos, frequência e como usar na educação do seu pet.',
      image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '22 de Outubro, 2025',
      readTime: '7 min',
      category: 'Cuidados',
      content: `
        <h2>Petiscos: prazer com responsabilidade</h2>
        <p>Os petiscos são uma excelente ferramenta para demonstrar carinho e auxiliar no treinamento, mas devem ser oferecidos com moderação e critério.</p>
        
        <h3>Regra dos 10%:</h3>
        <p>Os petiscos não devem representar mais que 10% das calorias diárias do pet para não desequilibrar a nutrição.</p>
        
        <h3>Tipos de petiscos saudáveis:</h3>
        <h4>Petiscos naturais:</h4>
        <ul>
          <li>Pedaços de cenoura</li>
          <li>Maçã sem sementes</li>
          <li>Abóbora cozida</li>
          <li>Batata doce assada</li>
        </ul>
        
        <h4>Petiscos comerciais:</h4>
        <ul>
          <li>Biscoitos sem açúcar</li>
          <li>Sticks dentais</li>
          <li>Petiscos liofilizados</li>
          <li>Ossos recreativos seguros</li>
        </ul>
        
        <h3>Petiscos no treinamento:</h3>
        <p>Use petiscos pequenos e saborosos como recompensa imediata. A recompensa deve vir logo após o comportamento desejado.</p>
        
        <h3>Alimentos proibidos:</h3>
        <ul>
          <li>Chocolate</li>
          <li>Uva e passa</li>
          <li>Cebola e alho</li>
          <li>Abacate</li>
          <li>Xilitol (adoçante)</li>
        </ul>
        
        <p>Lembre-se: o carinho pode ser demonstrado de muitas formas além da comida!</p>
      `
    },
    {
      id: 12,
      title: 'Saúde dental: alimentação e cuidados bucais',
      excerpt: 'A importância da saúde bucal dos pets e como a alimentação pode ajudar na prevenção.',
      image: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '20 de Outubro, 2025',
      readTime: '8 min',
      category: 'Saúde',
      content: `
        <h2>Sorriso saudável, pet feliz</h2>
        <p>A saúde dental é fundamental para o bem-estar geral dos pets. Problemas bucais podem afetar não apenas a alimentação, mas também órgãos vitais como coração e rins.</p>
        
        <h3>Sinais de problemas dentais:</h3>
        <ul>
          <li>Mau hálito persistente</li>
          <li>Tártaro visível nos dentes</li>
          <li>Gengivas vermelhas ou sangrantes</li>
          <li>Dificuldade para mastigar</li>
          <li>Perda de apetite</li>
          <li>Pawing na boca</li>
        </ul>
        
        <h3>Como a ração ajuda:</h3>
        <h4>Ração seca:</h4>
        <p>A textura crocante ajuda na remoção mecânica da placa bacteriana durante a mastigação.</p>
        
        <h4>Rações dentais especiais:</h4>
        <p>Fórmulas específicas com textura e ingredientes que promovem a limpeza dental.</p>
        
        <h3>Cuidados complementares:</h3>
        <ul>
          <li>Escovação regular dos dentes</li>
          <li>Brinquedos dentais</li>
          <li>Ossos recreativos seguros</li>
          <li>Petiscos dentais</li>
          <li>Limpeza profissional veterinária</li>
        </ul>
        
        <h3>Prevenção desde cedo:</h3>
        <p>Acostume filhotes com a manipulação da boca e escovação desde pequenos. A prevenção é sempre mais eficaz que o tratamento.</p>
        
        <p>Consultas veterinárias regulares incluem sempre avaliação da saúde bucal.</p>
      `
    }
  ];

  const handleReadMore = (post: any) => {
    setSelectedArticle(post);
    setIsModalOpen(true);
  };

  const handleShare = (post: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.origin + `/blog/${post.id}`
      }).catch(() => {
        // Fallback se a API de compartilhamento falhar ou for negada
        const url = window.location.origin + `/blog/${post.id}`;
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copiado para a área de transferência!');
        });
      });
    } else {
      // Fallback para navegadores que não suportam Web Share API
      const url = window.location.origin + `/blog/${post.id}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copiado para a área de transferência!');
      });
    }
  };

  return (
    <section id="blog" className="py-20 section-gray-light section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-[75px] font-black text-white font-barlow-condensed uppercase tracking-wider">
            BLOG
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-pian-yellow text-pian-black px-4 py-2 rounded-full text-sm font-bold font-montserrat">
                    {post.category.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-pian-yellow-dark transition-colors duration-300 font-montserrat">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 font-montserrat">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-end text-sm text-gray-500 mb-4">
                  <button
                    onClick={(e) => handleShare(post, e)}
                    className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                    title="Compartilhar"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 font-bold font-barlow-condensed">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <button 
                    onClick={() => handleReadMore(post)}
                    className="flex items-center bg-pian-yellow text-pian-black px-4 py-2 hover:bg-pian-yellow-dark transition-colors duration-200 font-helvetica-bold"
                  >
                    LER MAIS
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-pian-yellow text-pian-black rounded-xl hover:bg-pian-yellow-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-helvetica-bold"
          >
            VER TODOS OS ARTIGOS
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Blog Modal */}
      {selectedArticle && (
        <BlogModal
          article={selectedArticle}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default BlogSection;