import React, { useState } from 'react';
import { useEffect } from 'react';
import { Heart, Award, Users, Leaf, Shield, Recycle, FlaskConical, Truck, CheckCircle, Info } from 'lucide-react';
import { InteractiveImageAccordion } from './ui/interactive-image-accordion';

const AboutSection = () => {
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
    {
      icon: <FlaskConical className="h-10 w-10" style={{ color: '#FDD528' }} />,
      title: 'Fórmulas Fechadas',
      description: 'Formula fechada sem eventuais substitutivos',
      tooltip: 'Formula fechada sem eventuais substitutivos - receitas exclusivas desenvolvidas pela nossa equipe tecnica, garantindo qualidade e diferenciacao no mercado'
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: 'Boas Praticas de Fabricacao',
      description: 'Certificacao BPF garantindo seguranca',
      tooltip: 'Seguimos rigorosamente as Boas Praticas de Fabricacao (BPF), que sao normas de qualidade que garantem a seguranca, higiene e controle em todas as etapas de producao'
    },
    {
      icon: <Recycle className="h-10 w-10 text-green-500" />,
      title: 'Embalagens Biodegradaveis',
      description: 'Compromisso com o meio ambiente',
      tooltip: 'Utilizamos embalagens que se decompoem naturalmente, reduzindo o impacto ambiental e contribuindo para um planeta mais sustentavel'
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-purple-500" />,
      title: 'Livre de Artificiais',
      description: 'Sem corantes e aromatizantes artificiais',
      tooltip: 'Nossos produtos sao livres de corantes e aromatizantes artificiais, priorizando ingredientes naturais para a saude dos pets'
    },
    {
      icon: <Heart className="h-10 w-10" style={{ color: '#FDD528' }} />,
      title: 'Nutricao Responsavel',
      description: 'Cuidado em cada ingrediente',
      tooltip: 'Desenvolvemos produtos pensando na saude integral dos pets, com ingredientes selecionados e balanceamento nutricional adequado para cada fase da vida'
    },
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: 'Inovacao Sustentavel',
      description: 'Tecnologia que respeita a natureza',
      tooltip: 'Investimos em tecnologias e processos que respeitam o meio ambiente, criando produtos inovadores de forma sustentavel'
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" style={{ color: '#FDD528' }} />,
      title: 'Amor pelos Animais',
      description: 'Nossa paixao pelos pets guia cada decisao que tomamos'
    },
    {
      icon: <Award className="h-8 w-8" style={{ color: '#FCC02A' }} />,
      title: 'Qualidade Premium',
      description: 'Ingredientes selecionados e processos rigorosos de qualidade'
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: 'Tradicao Familiar',
      description: 'Mais de tres decadas de experiencia e confianca'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 section-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* História da Empresa */}
        <div className="bg-yellow-50 rounded-3xl p-8 lg:p-12 mb-16 border-2 border-pian-yellow/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight font-montserrat text-gray-900">
              A PIAN ALIMENTOS: TRADIÇÃO E INOVAÇÃO
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-pian-yellow to-pian-yellow-dark rounded-full mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed font-montserrat">
            </p>
            <p className="text-sm sm:text-sm md:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed font-montserrat">
              A <strong className="text-pian-yellow">Pian Alimentos Nutrição Pet</strong> nasceu em Paraí-RS do amor pelos pets e do compromisso com a saúde e o bem-estar animal. Unindo tradição familiar com tecnologia de ponta, desenvolvemos produtos de alta qualidade, com fórmulas nutricionais fechadas e seguras.
            </p>
            <p className="text-sm sm:text-sm md:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed font-montserrat">
              Nossas parcerias sólidas refletem a confiança construída ao longo de mais de 30 anos de história.
            </p>
            <p className="text-sm text-gray-600 mb-6 sm:mb-8 leading-relaxed font-montserrat">
              Cada produto carrega nosso compromisso com a excelência, a segurança e um ingrediente essencial: o carinho.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 rounded-xl bg-white hover:bg-yellow-100 transition-all duration-300 hover:shadow-md border border-pian-yellow/30">
                  <div className="flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 font-montserrat">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-montserrat">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="mt-8 lg:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-pian-yellow/20">
              <div className="relative w-full h-0 pb-[56.25%]">
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
          </div>
        </div>

        {/* Seção de Diferenciais */}
        <div 
          className="rounded-3xl p-8 lg:p-12 mb-16"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
            `,
            boxShadow: `
              0 20px 40px rgba(0, 0, 0, 0.1),
              0 8px 16px rgba(0, 0, 0, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `
          }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[45px] font-black text-gray-900 mb-4 sm:mb-6 leading-tight font-barlow-condensed uppercase tracking-wider">
            </h2>
            <h2 className="text-[75px] font-black text-gray-900 mb-4 sm:mb-6 leading-tight font-barlow-condensed uppercase tracking-wider">
              NUTRIÇÃO RESPONSÁVEL, INOVAÇÃO E CARINHO.
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-pian-yellow to-pian-yellow-dark rounded-full mx-auto mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 font-montserrat">
            </p>
            <p className="text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 font-montserrat">
              Na Pian Alimentos, desenvolvemos rações com fórmula fechada sem eventuais substitutivos, livres de corantes e aromatizantes artificiais, 
              priorizando a saúde e o bem-estar dos pets. Utilizamos embalagens biodegradáveis, seguimos boas práticas de 
              fabricação e investimos em produtos inovadores que respeitam o meio ambiente e atendem as necessidades reais 
              dos nossos amigos de quatro patas.
            </p>
          </div>

          {/* Interactive Accordion */}
          <div className="flex justify-center">
            <InteractiveImageAccordion />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;