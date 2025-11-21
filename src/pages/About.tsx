import React, { useState } from 'react';
import { useEffect } from 'react';
import { Heart, Award, Users, Leaf, Shield, Recycle, FlaskConical, Truck, CheckCircle, Info } from 'lucide-react';
import Timeline from '../components/Timeline';

const About = () => {
  const [hoveredDifferential, setHoveredDifferential] = useState<number | null>(null);

  useEffect(() => {
    // Remove cursor after typewriter animation completes
    const timer = setTimeout(() => {
      const typewriterElement = document.querySelector('.typewriter-text');
      if (typewriterElement) {
        typewriterElement.classList.add('finished');
      }
    }, 5000); // 0.5s delay + 4s animation + 0.5s buffer

    return () => clearTimeout(timer);
  }, []);

  const differentials = [
    { icon: <FlaskConical className="h-8 w-8 text-orange-500" />, title: 'Fórmulas Fechadas', description: 'Fórmula fechada sem eventuais substitutivos', tooltip: 'Fórmula fechada sem eventuais substitutivos - receitas exclusivas desenvolvidas pela nossa equipe técnica' },
    { icon: <Shield className="h-8 w-8 text-blue-500" />, title: 'Boas Práticas', description: 'Certificação BPF garantindo segurança', tooltip: 'Seguimos rigorosamente as Boas Práticas de Fabricação' },
    { icon: <Recycle className="h-8 w-8 text-green-500" />, title: 'Embalagens Biodegradáveis', description: 'Compromisso com o meio ambiente', tooltip: 'Embalagens que se decompõem naturalmente' },
    { icon: <CheckCircle className="h-8 w-8 text-purple-500" />, title: 'Livre de Artificiais', description: 'Sem corantes e aromatizantes artificiais', tooltip: 'Produtos livres de corantes e aromatizantes artificiais' },
    { icon: <Heart className="h-8 w-8 text-red-500" />, title: 'Nutrição Responsável', description: 'Cuidado em cada ingrediente', tooltip: 'Produtos pensados na saúde integral dos pets' },
    { icon: <Leaf className="h-8 w-8 text-green-600" />, title: 'Inovação Sustentável', description: 'Tecnologia que respeita a natureza', tooltip: 'Tecnologias e processos sustentáveis' },
  ];

  const values = [
    { icon: <Heart className="h-6 w-6 text-orange-500" />, title: 'Amor pelos Animais', description: 'Paixão que guia cada decisão' },
    { icon: <Award className="h-6 w-6 text-orange-500" />, title: 'Qualidade', description: 'Excelência em cada produto' },
    { icon: <Users className="h-6 w-6 text-orange-500" />, title: 'Família', description: 'Valores familiares em tudo que fazemos' }
  ];

  const gallery = [
    { src: '/api/placeholder/400/300', title: 'Fábrica Moderna', desc: 'Instalações de última geração' },
    { src: '/api/placeholder/400/300', title: 'Controle de Qualidade', desc: 'Laboratório próprio' },
    { src: '/api/placeholder/400/300', title: 'Equipe Técnica', desc: 'Profissionais especializados' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 section-yellow-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-pian-black mb-6 font-montserrat leading-tight">
            <h1 className="text-[75px] font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider">
            <h1 className="text-[95px] font-black text-white mb-4 font-barlow-condensed uppercase tracking-wider">
              <span className="text-red-600 font-italic animate-writing-effect">uma história de família</span>
            </h1>
            </h1>
            </h1>

            {/* YouTube Video */}
            <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/_aMQwmiu3uU" 
                title="Pian Alimentos - História da Família" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 1: Origens */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 section-divider pt-8">
            <h2 className="text-[75px] font-black text-gray-900 mb-6 font-barlow-condensed uppercase tracking-wider">Nossas Origens</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6 font-montserrat">
              <p className="text-justify">
                Desde 1984, nossa trajetória tem sido guiada por união, trabalho e espírito empreendedor, valores transmitidos pelos nossos pais e fortalecidos ao longo das gerações. Nascemos no campo, com raízes firmes na agricultura e na criação de animais, e crescemos movidos pelo propósito de oferecer nutrição de qualidade aos pets.
              </p>
              <p className="text-justify">
                Nosso caminho começou com a produção de milho e a criação de suínos. Para alimentar os próprios
                animais, a família passou a fabricar ração em pequena escala, o que trouxe mais controle, economia
                e, principalmente, resultados surpreendentes. Foi ali que reconhecemos nosso potencial: nutrir com
                qualidade, carinho e responsabilidade.
              </p>
            </div>
            
            {/* Imagem */}
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <img
                  src="https://i.postimg.cc/SR5FgDh6/secao-1.jpg"
                  alt="Nossas Origens - Pian Alimentos"
                  className="w-full h-auto object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeo Institucional */}
      <section className="py-16 section-white section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Vídeo */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-[75px] font-black text-gray-900 mb-4 font-barlow-condensed uppercase tracking-wider">Nossa História em Vídeo</h2>
                <p className="text-2xl text-gray-600 font-bold font-barlow-condensed">Conheça mais sobre nossa trajetória e valores</p>
              </div>
              <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl border-2 border-pian-yellow/30">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/KN2eC5Y4WR8" 
                  title="Pian Alimentos - Vídeo Institucional" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
            </div>

            {/* Texto Crescimento e Inovação */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-[75px] font-black text-gray-900 mb-6 font-barlow-condensed uppercase tracking-wider">Crescimento e Inovação</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6 font-montserrat">
                <p className="text-justify">
                  Com o aumento da demanda e o fortalecimento da experiência, investimos na criação de uma marca 
                  própria, no desenvolvimento de fórmulas nutricionais fechadas e na construção de uma fábrica 
                  moderna, com sede em Paraí-RS. Nossa produção passou a ser orientada por critérios técnicos 
                  rigorosos, com foco em ingredientes de alta digestibilidade, livres de corantes e aromatizantes 
                  artificiais, respeitando as reais necessidades nutricionais de cães e gatos.
                </p>
                <p className="text-justify">
                  Ao longo dos anos, a Pian Alimentos investiu continuamente em tecnologia de ponta, adotando 
                  processos modernos e sistemas avançados de controle de qualidade que garantem segurança, 
                  eficiência e padronização em cada produto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 2: Crescimento e Inovação */}

      {/* Bloco 3: Presente e Futuro */}
      <section className="py-16 section-yellow-light section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[75px] font-black text-gray-900 mb-6 font-barlow-condensed uppercase tracking-wider">Presente e Futuro</h2>
          </div>
          <div className="max-w-6xl mx-auto prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6 font-montserrat">
            <p className="text-justify">
              Com mais de 60 produtos distribuídos em 11 marcas, a Pian Alimentos está presente em todo o Brasil
              e exporta para países da América Latina e África. Nosso crescimento também se reflete na construção
              de uma rede sólida de parceiros comerciais e representantes, que compartilham de nossos valores e
              nos ajudam a levar nossa missão ainda mais longe.
            </p>
            <p className="text-justify">
              Hoje, somos uma empresa que une tradição, inovação e afeto em cada detalhe. Crescemos com base 
              nos laços familiares e seguimos com o olhar voltado para o futuro da nutrição animal. Evoluímos 
              com o mercado, sem jamais esquecer nossas origens.
            </p>
            <p className="text-justify">
              Porque, para nós, alimentar um pet é um ato de amor. E é com esse sentimento que seguimos 
              escrevendo, todos os dias, a nossa história.
            </p>
          </div>
          
          {/* Mensagem especial */}
          <div className="mt-12 text-center">
            <div className="space-y-6">
              <p className="text-3xl md:text-4xl font-bold text-red-600 italic mb-6 font-dancing animate-fade-in-up">
                Pian Alimentos: a gente entende esse amor.
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 font-montserrat animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Da nossa família para a sua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 section-gray-light section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[75px] font-black text-gray-900 mb-6 font-barlow-condensed uppercase tracking-wider">Nossos Valores</h2>
          </div>
          
          {/* Banner Nossos Diferenciais */}
          <div className="text-center">
            <a href="https://postimg.cc/3yrdc4pB" target="_blank" rel="noopener noreferrer">
              <img
                src="https://i.postimg.cc/5tLLj82Z/IMG-8503-1.png"
                alt="Nossos Diferenciais - Pian"
                className="w-full max-w-6xl mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Banner Certificação */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <a href="https://postimg.cc/xJDtwhWc" target="_blank" rel="noopener noreferrer">
              <img
                src="https://i.postimg.cc/0QrFwqnd/Banner-certificacao-Pian.png"
                alt="Banner-certificacao-Pian"
                className="w-full max-w-6xl mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />
    </div>
  );
};

export default About;