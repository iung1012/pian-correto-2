import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-white bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.5fr] gap-12">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center justify-start mb-6">
              <img
                src="https://i.postimg.cc/yY2XtMKV/logo-pian.png"
                alt="Pian Alimentos"
                className="h-24 w-auto border-4 border-pian-yellow rounded-lg p-2 bg-white shadow-lg"
                onError={(e) => {
                  e.currentTarget.outerHTML = '<span className="text-2xl font-bold font-montserrat">PIAN ALIMENTOS</span>';
                }}
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-base">
              Mais de 3 décadas de tradição em nutrição animal. Fórmulas fechadas desenvolvidas com amor e dedicação para o seu pet.
            </p>
            <p className="font-medium italic text-3xl" style={{ fontFamily: 'Brush Script MT, cursive', color: '#FDD528' }}>
              A gente entende esse amor.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-barlow-condensed uppercase tracking-wide" style={{ color: '#FDD528' }}>
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/distributors" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Distribuidores
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Produtos */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-barlow-condensed uppercase tracking-wide" style={{ color: '#FDD528' }}>
              Nossos Produtos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Super%20Premium" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Linha Super Premium
                </Link>
              </li>
              <li>
                <Link to="/products?category=Premium%20Especial" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Linha Premium Especial
                </Link>
              </li>
              <li>
                <Link to="/products?category=Premium" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Linha Premium
                </Link>
              </li>
              <li>
                <Link to="/products?category=Standard" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Linha Standard
                </Link>
              </li>
              <li>
                <Link to="/products?category=Alimentos%20Úmidos" className="text-gray-300 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed text-base block">
                  Rações Úmidas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-barlow-condensed uppercase tracking-wide" style={{ color: '#FDD528' }}>
              Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#FDD528' }} />
                <span className="text-gray-300 font-semibold font-barlow-condensed text-base">(54) 3358-2222</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#FDD528' }} />
                <span className="text-gray-300 font-semibold font-barlow-condensed text-base break-all">pian@pian.com.br</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#FDD528' }} />
                <span className="text-gray-300 font-semibold font-barlow-condensed text-base leading-relaxed">
                  RS-324, 1369<br />
                  Paraí - RS, 95360-000
                </span>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="mt-8">
              <h4 className="text-base font-bold mb-4 font-barlow-condensed uppercase tracking-wide" style={{ color: '#FDD528' }}>
                Siga-nos
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/pian.alimentos/?locale=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-pian-yellow transition-all duration-200 group"
                >
                  <Facebook className="h-5 w-5 text-gray-300 group-hover:text-black transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/pian.alimentos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-pian-yellow transition-all duration-200 group"
                >
                  <Instagram className="h-5 w-5 text-gray-300 group-hover:text-black transition-colors" />
                </a>
                <a
                  href="https://www.youtube.com/@Pian_alimentos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-pian-yellow transition-all duration-200 group"
                >
                  <Youtube className="h-5 w-5 text-gray-300 group-hover:text-black transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t mt-12 pt-8" style={{ borderColor: '#2a2a2a' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-base font-semibold font-barlow-condensed">
              EP Mídia Brasil Ltda. 2025.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-base">
              <a href="#" className="text-gray-400 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-pian-yellow transition-colors duration-200 font-semibold font-barlow-condensed">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;