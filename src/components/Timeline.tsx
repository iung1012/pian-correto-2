import React from 'react';
import { useState } from 'react';
import { Timeline as TimelineUI } from './ui/timeline';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Timeline = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const openImageModal = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const timelineData = [
    {
      title: '1984',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Inicia a História da PIAN em Paraí-RS</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/W1fXQnvy/1984.jpg"
              alt="Início da PIAN em 1984"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/W1fXQnvy/1984.jpg", "Início da PIAN em 1984")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Tudo começou com a nossa família em 1984, ano em que passamos a adquirir insumos para produzir alimentos para animais na cidade de Paraí, no Rio Grande do Sul. Inicialmente, os produtos eram comercializados apenas na localidade, mas logo, o negócio cresceu.
          </p>
        </div>
      )
    },
    {
      title: '1987',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">A PIAN Chega a Porto Alegre</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/pd06CH0g/Design-sem-nome-28.png"
              alt="PIAN chega a Porto Alegre"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/pd06CH0g/Design-sem-nome-28.png", "PIAN chega a Porto Alegre")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            No ano de 1987, com uma visão empreendedora, chegamos na capital gaúcha, dando início a uma nova etapa para a Pian no mercado pet. Nos anos seguintes, desenvolvemos ainda mais nossa linha de nutrição animal, assim como a distribuição e comercialização de itens relacionados ao segmento.
          </p>
        </div>
      )
    },
    {
      title: '1995',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Primeiro Caminhão Baú</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/d3QRxkL6/1.png"
              alt="Primeiro caminhão baú da PIAN"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/d3QRxkL6/1.png", "Primeiro caminhão baú da PIAN")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Em 1995, a Pian Alimentos adquiriu seu primeiro caminhão baú, utilizado para distribuir as rações que eram produzidas no Paraná. Na imagem, em frente ao caminhão, está Paulo Pian.
          </p>
        </div>
      )
    },
    {
      title: '1998',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Início das Vendas da Marca Mikdog</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/4NdbvcCN/2.png"
              alt="Início da marca Mikdog"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/4NdbvcCN/2.png", "Início da marca Mikdog")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            O ano de 1998 marcou o início das vendas da marca Mikdog, a primeira marca própria da Pian Alimentos.
          </p>
        </div>
      )
    },
    {
      title: '2000',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">A Fábrica da PIAN é Construída em Paraí-RS</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/j5LkkFmC/Design-sem-nome-29.png"
              alt="Construção da fábrica PIAN"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/j5LkkFmC/Design-sem-nome-29.png", "Construção da fábrica PIAN")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Ao longo do tempo, fomos adquirindo uma base sólida de conhecimento e, percebendo o potencial de expansão do mercado, entendemos que era hora de dar um novo passo. Foi então que, em 2000, iniciamos nossas atividades no ramo industrial construindo nossa fábrica na cidade de Paraí-RS, onde produzimos a primeira linha de alimentos secos com maquinário totalmente nacional. No mesmo ano de criação da fábrica, são lançadas ainda as linhas Mikdog e Mikcat.
          </p>
        </div>
      )
    },
    {
      title: '2006',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Primeira Ampliação do Parque Fabril e Início da Produção de Nuggets</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/HnMvT7pg/Design-sem-nome-30.png"
              alt="Primeira ampliação e produção de nuggets"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/HnMvT7pg/Design-sem-nome-30.png", "Primeira ampliação e produção de nuggets")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Em 2006, com a demanda pelos produtos em crescimento, fizemos a primeira expansão do parque fabril, com a implantação de uma tecnologia trazida da França, para a produção de nuggets e de uma segunda linha de alimentos.
          </p>
        </div>
      )
    },
    {
      title: '2007',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Primeira Exportação para o Uruguai</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/65NRwrdB/tempImage1WFKzQ.avif"
              alt="Primeira exportação para o Uruguai"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/65NRwrdB/tempImage1WFKzQ.avif", "Primeira exportação para o Uruguai")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Em 2007, a Pian Alimentos realizou sua primeira exportação, marcando presença no mercado internacional ao enviar produtos para o Uruguai.
          </p>
        </div>
      )
    },
    {
      title: '2008',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Ampliação do Espaço Físico e Extrusora Francesa</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/DysmDrqK/tempImagelWomIM.avif"
              alt="Ampliação e extrusora francesa"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/DysmDrqK/tempImagelWomIM.avif", "Ampliação e extrusora francesa")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Em 2008, houve uma nova ampliação do espaço físico da fábrica e uma extrusora francesa começou a funcionar, aumentando grandemente a capacidade de produção da Pian Alimentos.
          </p>
        </div>
      )
    },
    {
      title: '2009',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Implementação da Linha de Enlatados</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/RZSHJvp5/tempImageVs3Wqz.avif"
              alt="Linha de enlatados"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/RZSHJvp5/tempImageVs3Wqz.avif", "Linha de enlatados")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            A partir de 2009, passamos a desenvolver uma linha de enlatados.
          </p>
        </div>
      )
    },
    {
      title: '2012',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Segunda Ampliação do Parque Fabril</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/YCrWLtnD/tempImage4zbkG4.avif"
              alt="Segunda ampliação do parque fabril"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/YCrWLtnD/tempImage4zbkG4.avif", "Segunda ampliação do parque fabril")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Em 2012, implementamos a terceira linha de produção de alimentos secos, havendo, ainda neste ano, a segunda ampliação do parque fabril.
          </p>
        </div>
      )
    },
    {
      title: '2015',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">A Linha Priorità Super Premium é Criada e a Fábrica Passa pela Terceira Ampliação</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/Ss3t0Gbd/Design-sem-nome-31.png"
              alt="Linha Priorità Super Premium"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/Ss3t0Gbd/Design-sem-nome-31.png", "Linha Priorità Super Premium")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            O ano de 2015 ficou marcado pela criação da linha Priorità Super Premium e pela chegada da primeira máquina de automatização do empacotamento e peletização na fábrica, que passou pela terceira ampliação.
          </p>
        </div>
      )
    },
    {
      title: '2017',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Implementação da Linha de Sachês e Nova Ampliação</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/2S0B4ggh/tempImageCPuh1g.avif"
              alt="Linha de sachês"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/2S0B4ggh/tempImageCPuh1g.avif", "Linha de sachês")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Em 2017 criamos nossa linha de sachês, com tecnologia espanhola e holandesa. Neste mesmo ano, ocorreu uma nova ampliação do espaço físico para aperfeiçoamento da produção da linha de alimentos úmidos.
          </p>
        </div>
      )
    },
    {
      title: '2018',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Quarta Ampliação do Parque Fabril</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/zGxRn445/tempImage2NK9Ci.avif"
              alt="Quarta ampliação do parque fabril"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/zGxRn445/tempImage2NK9Ci.avif", "Quarta ampliação do parque fabril")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Já em 2018, adquirimos a segunda máquina de empacotamento e peletização automatizada, havendo neste ano a quarta ampliação do parque fabril.
          </p>
        </div>
      )
    },
    {
      title: '2022',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Quinta Ampliação do Parque Fabril</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/qMdn0s8T/tempImageLcLUQq.avif"
              alt="Quinta ampliação do parque fabril"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/qMdn0s8T/tempImageLcLUQq.avif", "Quinta ampliação do parque fabril")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            O ano de 2022 marca a nossa mais recente ampliação do parque fabril, que passou por uma nova modernização.
          </p>
        </div>
      )
    },
    {
      title: '2025',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-barlow-condensed mb-4">Novos Horizontes e Expansão Contínua</h3>
          <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <div className="bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <img
              src="https://i.postimg.cc/nLPf1WSj/tempImageX28EAp.avif"
              alt="Novos horizontes e expansão contínua"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openImageModal("https://i.postimg.cc/nLPf1WSj/tempImageX28EAp.avif", "Novos horizontes e expansão contínua")}
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
          </div>
          <p className="text-xs text-gray-500 italic font-barlow-condensed mt-1 mb-3">Arquivo pessoal</p>
          <p className="text-gray-700 text-sm md:text-base font-barlow-condensed leading-relaxed mt-4">
            Em 2025, continuamos nossa jornada de crescimento e inovação, sempre comprometidos com a qualidade dos nossos produtos, redução do impacto ambiental e inovação tecnológica.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full bg-white section-divider relative">
      <div>
        <TimelineUI data={timelineData} />
      </div>
      
      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center">
          <div className="bg-gradient-to-br from-pian-yellow to-pian-yellow-dark rounded-2xl p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-[45px] font-bold text-pian-black mb-4 font-barlow-condensed uppercase tracking-wider">
                Mais de 3 Décadas de Tradição, Infinitas Possibilidades
              </h2>
              <p className="text-pian-black/80 mb-6 max-w-2xl mx-auto font-barlow-condensed">
                De uma pequena produção familiar em 1984 até nos tornarmos referência nacional em nutrição animal. Nossa história continua sendo escrita todos os dias.
              </p>
              <a
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-pian-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl font-bold font-barlow-condensed"
              >
                Conheça Nossa História Completa
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
            >
              <button
                onClick={closeImageModal}
                className="absolute -top-12 right-0 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200 z-10"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              <motion.img
                initial={{ scale: 0.7 }}
                animate={{ scale: 1.05 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                <p className="text-white text-lg font-bold text-center font-barlow-condensed mb-1">
                  {selectedImage.alt}
                </p>
                <p className="text-white/80 text-sm italic text-center font-barlow-condensed">
                  Arquivo pessoal
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;