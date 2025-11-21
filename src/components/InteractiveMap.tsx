import React, { useState } from 'react';
import { MapPin, Globe, Package, Truck } from 'lucide-react';

const InteractiveMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const exportCountries = [
    {
      id: 'uruguay',
      name: 'Uruguai',
      color: '#f97316',
      position: { x: 68, y: 78 },
      info: 'Primeiro país de exportação da PIAN desde 2007'
    },
    {
      id: 'chile',
      name: 'Chile',
      color: '#ea580c',
      position: { x: 45, y: 75 },
      info: 'Mercado estratégico na costa do Pacífico'
    },
    {
      id: 'bolivia',
      name: 'Bolívia',
      color: '#c2410c',
      position: { x: 55, y: 65 },
      info: 'Parceria sólida no coração da América do Sul'
    },
    {
      id: 'paraguay',
      name: 'Paraguai',
      color: '#9a3412',
      position: { x: 62, y: 70 },
      info: 'Vizinho estratégico com forte demanda'
    },
    {
      id: 'peru',
      name: 'Peru',
      color: '#7c2d12',
      position: { x: 42, y: 58 },
      info: 'Mercado em crescimento na região andina'
    },
    {
      id: 'colombia',
      name: 'Colômbia',
      color: '#fed7aa',
      position: { x: 38, y: 35 },
      info: 'Porta de entrada para o norte da América do Sul'
    }
  ];

  return (
    <section className="py-20 section-dark-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Globe className="h-12 w-12 text-pian-yellow mr-4 animate-spin" style={{ animationDuration: '10s' }} />
            <h2 className="text-[75px] font-black text-white font-barlow-condensed uppercase tracking-wider">
              Presença Internacional
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-montserrat">
            A PIAN ALIMENTOS exporta seus produtos para diversos países da América Latina, 
            levando qualidade e tradição além das fronteiras brasileiras
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mapa Interativo */}
          <div className="relative">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pian-yellow/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center font-montserrat">
                Países de Exportação
              </h3>
              
              {/* Container do Mapa */}
              <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden border border-gray-600">
                {/* Mapa SVG da América Latina */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                >
                  {/* Contorno da América do Sul */}
                  <path
                    d="M35 25 Q40 20 45 25 L50 30 Q55 25 60 30 L65 35 Q70 30 75 35 L75 40 Q80 45 75 50 L70 55 Q75 60 70 65 L65 70 Q70 75 65 80 L60 85 Q55 90 50 85 L45 80 Q40 85 35 80 L30 75 Q25 70 30 65 L35 60 Q30 55 35 50 L40 45 Q35 40 35 35 Z"
                    fill="rgba(34, 197, 94, 0.2)"
                    stroke="rgba(34, 197, 94, 0.4)"
                    strokeWidth="0.5"
                    className="animate-pulse"
                  />
                  
                  {/* Brasil destacado */}
                  <path
                    d="M45 35 Q55 30 65 35 L70 40 Q75 45 70 50 L65 55 Q70 60 65 65 L60 70 Q55 75 50 70 L45 65 Q40 60 45 55 L50 50 Q45 45 45 40 Z"
                    fill="rgba(249, 115, 22, 0.3)"
                    stroke="rgba(249, 115, 22, 0.6)"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />

                  {/* Pontos dos países de exportação */}
                  {exportCountries.map((country, index) => (
                    <g key={country.id}>
                      {/* Círculo pulsante */}
                      <circle
                        cx={country.position.x}
                        cy={country.position.y}
                        r="3"
                        fill={country.color}
                        className="animate-ping"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      />
                      {/* Ponto principal */}
                      <circle
                        cx={country.position.x}
                        cy={country.position.y}
                        r="2"
                        fill={country.color}
                        stroke="white"
                        strokeWidth="0.5"
                        className="cursor-pointer hover:r-3 transition-all duration-300"
                        onMouseEnter={() => setHoveredCountry(country.id)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={() => setSelectedCountry(selectedCountry === country.id ? null : country.id)}
                      />
                      {/* Label do país */}
                      {(hoveredCountry === country.id || selectedCountry === country.id) && (
                        <g>
                          <rect
                            x={country.position.x - 8}
                            y={country.position.y - 8}
                            width="16"
                            height="6"
                            fill="rgba(0,0,0,0.8)"
                            rx="2"
                            className="animate-fade-in"
                          />
                          <text
                            x={country.position.x}
                            y={country.position.y - 5}
                            textAnchor="middle"
                            fill="white"
                            fontSize="2"
                            fontWeight="bold"
                          >
                            {country.name}
                          </text>
                        </g>
                      )}
                    </g>
                  ))}

                  {/* Linhas conectando Brasil aos países */}
                  {exportCountries.map((country, index) => (
                    <line
                      key={`line-${country.id}`}
                      x1="57"
                      y1="52"
                      x2={country.position.x}
                      y2={country.position.y}
                      stroke={country.color}
                      strokeWidth="0.5"
                      strokeDasharray="2,1"
                      className="animate-pulse"
                      style={{ 
                        animationDelay: `${index * 0.3}s`,
                        opacity: hoveredCountry === country.id || selectedCountry === country.id ? 1 : 0.3
                      }}
                    />
                  ))}
                </svg>

                {/* Legenda Brasil */}
                <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-pian-yellow/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-pian-yellow rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-white font-montserrat">Brasil (Sede)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações dos Países */}
          <div className="space-y-6">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-pian-yellow/20">
              <div className="flex items-center mb-6">
                <Package className="h-8 w-8 text-pian-yellow mr-3" />
                <h3 className="text-2xl font-bold text-white font-montserrat">Mercados Internacionais</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exportCountries.map((country, index) => (
                  <div
                    key={country.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 backdrop-blur-sm ${
                      selectedCountry === country.id
                        ? 'border-pian-yellow bg-pian-yellow/10 shadow-lg'
                        : 'border-gray-600 bg-gray-800/50 hover:border-pian-yellow/50 hover:bg-pian-yellow/5'
                    }`}
                    onClick={() => setSelectedCountry(selectedCountry === country.id ? null : country.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full animate-pulse"
                        style={{ backgroundColor: country.color }}
                      ></div>
                      <div>
                        <h4 className="font-bold text-white font-montserrat">{country.name}</h4>
                        {selectedCountry === country.id && (
                          <p className="text-sm text-gray-300 mt-1 animate-fade-in font-montserrat">
                            {country.info}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-pian-yellow to-pian-yellow-dark rounded-2xl p-6 text-pian-black text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 animate-bounce" />
                <div className="text-2xl font-bold font-montserrat">6</div>
                <div className="text-sm opacity-90 font-montserrat">Países</div>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white text-center border border-pian-yellow/20">
                <Globe className="h-8 w-8 mx-auto mb-2 animate-spin" style={{ animationDuration: '3s' }} />
                <div className="text-2xl font-bold font-montserrat">2007</div>
                <div className="text-sm opacity-90 font-montserrat">Desde</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-pian-yellow/20">
              <h4 className="text-lg font-bold text-white mb-2 font-montserrat">
                Expansão Internacional
              </h4>
              <p className="text-gray-300 text-sm mb-4 font-montserrat">
                Levamos a qualidade PIAN ALIMENTOS para além das fronteiras, 
                conquistando mercados internacionais com nossos produtos premium.
              </p>
              <div className="flex items-center text-pian-yellow font-bold">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm font-montserrat">Clique nos países para mais informações</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;