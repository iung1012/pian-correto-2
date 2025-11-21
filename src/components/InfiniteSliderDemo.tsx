import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import { useState } from "react";
import ProductModal from "./ProductModal";

// Linha 1 - Produtos Prioritá (Super Premium) - Duplicados para preencher
const prioritaProducts = [
  { id: 49, title: "Prioritá Adulto", image: "https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para cães adultos" },
  { id: 50, title: "Prioritá Filhote", image: "https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para filhotes" },
  { id: 51, title: "Prioritá Cat Adulto", image: "https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png", category: "Super Premium", type: "Gatos", line: "Ração Seca", description: "Super premium para gatos" },
  // Duplicações múltiplas para preencher completamente a linha
  { id: 49, title: "Prioritá Adulto", image: "https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para cães adultos" },
  { id: 50, title: "Prioritá Filhote", image: "https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para filhotes" },
  { id: 51, title: "Prioritá Cat Adulto", image: "https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png", category: "Super Premium", type: "Gatos", line: "Ração Seca", description: "Super premium para gatos" },
  { id: 49, title: "Prioritá Adulto", image: "https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para cães adultos" },
  { id: 50, title: "Prioritá Filhote", image: "https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para filhotes" },
  { id: 51, title: "Prioritá Cat Adulto", image: "https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png", category: "Super Premium", type: "Gatos", line: "Ração Seca", description: "Super premium para gatos" },
  { id: 49, title: "Prioritá Adulto", image: "https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para cães adultos" },
  { id: 50, title: "Prioritá Filhote", image: "https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para filhotes" },
  { id: 51, title: "Prioritá Cat Adulto", image: "https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png", category: "Super Premium", type: "Gatos", line: "Ração Seca", description: "Super premium para gatos" },
  { id: 49, title: "Prioritá Adulto", image: "https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para cães adultos" },
  { id: 50, title: "Prioritá Filhote", image: "https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para filhotes" },
  { id: 51, title: "Prioritá Cat Adulto", image: "https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png", category: "Super Premium", type: "Gatos", line: "Ração Seca", description: "Super premium para gatos" },
  { id: 49, title: "Prioritá Adulto", image: "https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para cães adultos" },
  { id: 50, title: "Prioritá Filhote", image: "https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para filhotes" },
  { id: 51, title: "Prioritá Cat Adulto", image: "https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png", category: "Super Premium", type: "Gatos", line: "Ração Seca", description: "Super premium para gatos" },
  { id: 49, title: "Prioritá Adulto", image: "https://i.postimg.cc/VN0Y8ygK/PRIORITA-ADULTO-LADO.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para cães adultos" },
  { id: 50, title: "Prioritá Filhote", image: "https://i.postimg.cc/4xSJq46K/PRIORITA-FILHOTE.png", category: "Super Premium", type: "Cães", line: "Ração Seca", description: "Super premium para filhotes" },
  { id: 51, title: "Prioritá Cat Adulto", image: "https://i.postimg.cc/TYQ2jJhJ/PRIORITA-CAT-ADULTO-2.png", category: "Super Premium", type: "Gatos", line: "Ração Seca", description: "Super premium para gatos" },
];

// Linha 2 - Produtos Mik (MikDog e MikCat)
const mikProducts = [
  { id: 9, title: "MikDog Premium Adulto", image: "https://i.postimg.cc/BbH2B3Fh/Mikdog-Premium-Adulto.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Linha premium para cães adultos" },
  { id: 10, title: "MikDog Senior", image: "https://i.postimg.cc/jjDwhK0z/MIKDOG-SENIOR.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para cães idosos" },
  { id: 11, title: "MikDog Natural", image: "https://i.postimg.cc/fbq7wBZv/MIKDOG-NATURAL.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração natural premium" },
  { id: 12, title: "MikDog Nuggets", image: "https://i.postimg.cc/nhHqB6hk/MIKDOG-NUGGETS.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração em formato nuggets" },
  { id: 13, title: "MikDog Filhotes", image: "https://i.postimg.cc/13Hcdyj2/MIKDOG-FILHOTES.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para filhotes" },
  { id: 14, title: "MikDog Refeição", image: "https://i.postimg.cc/brctJ551/MIKDOG-REFEICAO.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração completa para refeições" },
  { id: 15, title: "MikDog Vegetais", image: "https://i.postimg.cc/LsGqC72G/MIKDOG-VEGETAIS.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração com vegetais" },
  { id: 16, title: "MikDog Pequenas Raças", image: "https://i.postimg.cc/VL9jSYmv/MIKDOG-PEQ-RACAS.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração para cães pequenos" },
  { id: 17, title: "MikDog Carne com Ossinhos", image: "https://i.postimg.cc/0NydRLgQ/MIKDOG-CARNE-COM-OSSINHOS.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração com carne e ossinhos" },
  { id: 20, title: "MikCat Premium", image: "https://i.postimg.cc/W4NDQTPF/MIKCAT-ADULTO-FRANGO.jpg", category: "Premium", type: "Gatos", line: "Ração Seca", description: "Ração premium sabor frango" },
  { id: 21, title: "MikCat Adultos", image: "https://i.postimg.cc/mrmc4Jbd/Mikcat-Adutos.jpg", category: "Premium", type: "Gatos", line: "Ração Seca", description: "Ração premium para gatos adultos" },
  { id: 44, title: "MikDog Premium Especial Filhotes", image: "https://i.postimg.cc/4NR6NKCj/Mikdog-Premium-Especial-Filhotes.jpg", category: "Premium Especial", type: "Cães", line: "Ração Seca", description: "Fórmula especial para filhotes" },
  { id: 45, title: "MikDog Premium Especial Pequeno Porte", image: "https://i.postimg.cc/pLqzZq9t/Mikdog-Premium-Especial-Pequeno-Porte.jpg", category: "Premium Especial", type: "Cães", line: "Ração Seca", description: "Fórmula especial pequeno porte" },
  { id: 46, title: "MikDog Premium Especial Refeições", image: "https://i.postimg.cc/59C5VBrw/MIKDOG-PREMIUM-ESPECIAL-ADULTO-REFEICOES-TODO-DIA.jpg", category: "Premium Especial", type: "Cães", line: "Ração Seca", description: "Fórmula especial refeições" },
  { id: 47, title: "MikCat Premium Especial Filhotes", image: "https://i.postimg.cc/SRMjWKc5/MIKCAT-PREMIUM-ESPECIAL-FILHOTES.jpg", category: "Premium Especial", type: "Gatos", line: "Ração Seca", description: "Fórmula especial para filhotes" },
  { id: 48, title: "MikCat Premium Especial Castrados", image: "https://i.postimg.cc/KzVRkT3B/MIKCAT-PREMIUM-ESPECIAL-CASTRADOS.jpg", category: "Premium Especial", type: "Gatos", line: "Ração Seca", description: "Fórmula especial para castrados" },
];

// Linha 3 - Produtos Standard e Dog&Dogs
const standardProducts = [
  { id: 1, title: "Lupydog", image: "https://i.postimg.cc/3RKMTr8G/Lupy-Dog-7kg-1.png", category: "Standard", type: "Cães", line: "Ração Seca", description: "Ração completa para cães adultos" },
  { id: 2, title: "Lilidog", image: "https://i.postimg.cc/HxjrkznT/LILI-DOG.jpg", category: "Standard", type: "Cães", line: "Ração Seca", description: "Nutrição balanceada para cães" },
  { id: 3, title: "Zecão", image: "https://i.postimg.cc/6qmFnddV/ZECA-O-ORIGINAL-2.jpg", category: "Standard", type: "Cães", line: "Ração Seca", description: "Ração econômica para cães" },
  { id: 4, title: "Gerrys", image: "https://i.postimg.cc/TwHWVSFy/Gerrys-20kg.jpg", category: "Standard", type: "Cães", line: "Ração Seca", description: "Nutrição completa e balanceada" },
  { id: 5, title: "Zecat", image: "https://i.postimg.cc/6qmFnddV/ZECA-O-ORIGINAL-2.jpg", category: "Standard", type: "Gatos", line: "Ração Seca", description: "Ração completa para gatos" },
  { id: 6, title: "Dog & Dogs Adultos", image: "https://i.postimg.cc/4NyWTRs0/Dog-Dogs-Adultos.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para cães adultos" },
  { id: 7, title: "Dog & Dogs Filhotes", image: "https://i.postimg.cc/kg8FnnZT/Dog-Dogs-Filhotes.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para filhotes" },
  { id: 8, title: "Dog & Dogs Pequeno Porte", image: "https://i.postimg.cc/XqHxyQcx/Dog-Dogs-Peq-Racas.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para cães pequenos" },
  { id: 18, title: "Cat & Cats Adultos", image: "https://i.postimg.cc/BntkN1jX/Cat-Cats-Adultos.jpg", category: "Premium", type: "Gatos", line: "Ração Seca", description: "Ração premium para gatos adultos" },
  { id: 19, title: "Cat & Cats Nuggets", image: "https://i.postimg.cc/mZwnsSMP/Cat-Cats-Nuggets.jpg", category: "Premium", type: "Gatos", line: "Ração Seca", description: "Ração em formato nuggets para gatos" },
  { id: 22, title: "MikDog Sachê Carne", image: "https://i.postimg.cc/26BWCY0z/MIKDOG-SACHES-ADULTO-CARNE-MOCKUP.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê sabor carne" },
  { id: 23, title: "MikDog Sachê RPM Carne", image: "https://i.postimg.cc/mkYFFwxJ/MIKDOG-SACHES-ADULTO-RPM-CARNE-MOCKUP.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê RPM sabor carne" },
  { id: 24, title: "MikDog Sachê RPM Frango", image: "https://i.postimg.cc/x1TbcM6p/MIKDOG-SACHES-ADULTO-RPM-FRANGO-MOCKUP.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê RPM sabor frango" },
  { id: 25, title: "Dog & Dogs Sachê Carne Adultos", image: "https://i.postimg.cc/hv6TBw0F/Dog-Dogs-Sache-Carne-Adultos.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê carne para adultos" },
  { id: 26, title: "Dog & Dogs Sachê Carne Filhotes", image: "https://i.postimg.cc/9fCTCyyf/Dog-Dogs-Sache-Carne-Filhotes.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê carne para filhotes" },
  { id: 27, title: "Dog & Dogs Enlatado Carne", image: "https://i.postimg.cc/V6zFG3KD/Dog-Dogs-Enlatado-Carne.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada sabor carne" },
  { id: 28, title: "Dog & Dogs Enlatado Frango", image: "https://i.postimg.cc/pr6YdyR6/Dog-Dogs-Enlatado-Frango.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada sabor frango" },
  { id: 29, title: "Dog & Dogs Enlatado Fígado", image: "https://i.postimg.cc/ZRjx1VgZ/Dog-Dogs-Enlatado-Figado.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada sabor fígado" },
  { id: 30, title: "Dog & Dogs Enlatado Carne Filhotes", image: "https://i.postimg.cc/tJTNyFQ6/Dog-Dogs-Enlatado-Carne-Filhotes.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada para filhotes" },
  { id: 31, title: "MikDog Snacks Carne", image: "https://i.postimg.cc/jdTfYGPb/Mikdog-Snacks-Carne-60g.jpg", category: "Premium", type: "Cães", line: "Snacks", description: "Snacks sabor carne 60g" },
  { id: 32, title: "Cat & Cats Enlatado Peixe", image: "https://i.postimg.cc/wM6bNtKx/Cat-Cats-Enlatado-Peixe.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor peixe" },
  { id: 33, title: "Cat & Cats Enlatado Frango", image: "https://i.postimg.cc/QMTPZGkD/Cat-Cats-Enlatado-Frango.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor frango" },
  { id: 34, title: "Cat & Cats Enlatado Carne", image: "https://i.postimg.cc/ydCGVQvZ/Cat-Cats-Enlatado-Carne.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor carne" },
  { id: 35, title: "Cat & Cats Enlatado Fígado", image: "https://i.postimg.cc/4xMM0Ncw/Cat-Cats-Enlatado-Figado.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor fígado" },
  { id: 36, title: "Cat & Cats Sachê Carne", image: "https://i.postimg.cc/0yLWfXgB/Cat-Cats-Saches-Carne.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor carne" },
  { id: 37, title: "Cat & Cats Sachê Frango", image: "https://i.postimg.cc/xCQsrk1G/Cat-Cats-Saches-Frango.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor frango" },
  { id: 38, title: "MikCat Sachê Adulto Atum", image: "https://i.postimg.cc/dQLHTZx1/MIKCAT-SACHES-ADULTO-ATUM-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor atum" },
  { id: 39, title: "MikCat Sachê Adulto Carne", image: "https://i.postimg.cc/g2qNPVnM/MIKCAT-SACHES-ADULTO-CARNE-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor carne" },
  { id: 40, title: "MikCat Sachê Adulto Salmão", image: "https://i.postimg.cc/NG9D0qK2/MIKCAT-SACHES-ADULTO-SALMAO-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor salmão" },
  { id: 41, title: "MikCat Sachê Adulto Cordeiro", image: "https://i.postimg.cc/NML4TZbV/MIKCAT-SACHES-ADULTO-CORDEIRO-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor cordeiro" },
  { id: 42, title: "MikCat Sachê Filhote Carne", image: "https://i.postimg.cc/65ChdrL9/MIKCAT-SACHES-FILHOTE-CARNE-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê para filhotes" },
  { id: 43, title: "MikCat Sachê Castrados Frango", image: "https://i.postimg.cc/qvb6nqYJ/Mockup-MIKCAT-SACHES-Gatos-Castrados-Frango-ao-Molho.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê para gatos castrados" },
];

// Linha 3 - Produtos úmidos (sachês e enlatados)
const wetFoodProducts = [
  { id: 22, title: "MikDog Sachê Carne", image: "https://i.postimg.cc/26BWCY0z/MIKDOG-SACHES-ADULTO-CARNE-MOCKUP.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê sabor carne" },
  { id: 23, title: "MikDog Sachê RPM Carne", image: "https://i.postimg.cc/mkYFFwxJ/MIKDOG-SACHES-ADULTO-RPM-CARNE-MOCKUP.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê RPM sabor carne" },
  { id: 24, title: "MikDog Sachê RPM Frango", image: "https://i.postimg.cc/x1TbcM6p/MIKDOG-SACHES-ADULTO-RPM-FRANGO-MOCKUP.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê RPM sabor frango" },
  { id: 25, title: "Dog & Dogs Sachê Carne Adultos", image: "https://i.postimg.cc/hv6TBw0F/Dog-Dogs-Sache-Carne-Adultos.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê carne para adultos" },
  { id: 26, title: "Dog & Dogs Sachê Carne Filhotes", image: "https://i.postimg.cc/9fCTCyyf/Dog-Dogs-Sache-Carne-Filhotes.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Sachê carne para filhotes" },
  { id: 27, title: "Dog & Dogs Enlatado Carne", image: "https://i.postimg.cc/V6zFG3KD/Dog-Dogs-Enlatado-Carne.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada sabor carne" },
  { id: 28, title: "Dog & Dogs Enlatado Frango", image: "https://i.postimg.cc/pr6YdyR6/Dog-Dogs-Enlatado-Frango.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada sabor frango" },
  { id: 29, title: "Dog & Dogs Enlatado Fígado", image: "https://i.postimg.cc/ZRjx1VgZ/Dog-Dogs-Enlatado-Figado.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada sabor fígado" },
  { id: 30, title: "Dog & Dogs Enlatado Carne Filhotes", image: "https://i.postimg.cc/tJTNyFQ6/Dog-Dogs-Enlatado-Carne-Filhotes.jpg", category: "Premium", type: "Cães", line: "Ração Úmida", description: "Ração enlatada para filhotes" },
  { id: 32, title: "Cat & Cats Enlatado Peixe", image: "https://i.postimg.cc/wM6bNtKx/Cat-Cats-Enlatado-Peixe.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor peixe" },
  { id: 33, title: "Cat & Cats Enlatado Frango", image: "https://i.postimg.cc/QMTPZGkD/Cat-Cats-Enlatado-Frango.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor frango" },
  { id: 34, title: "Cat & Cats Enlatado Carne", image: "https://i.postimg.cc/ydCGVQvZ/Cat-Cats-Enlatado-Carne.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor carne" },
  { id: 35, title: "Cat & Cats Enlatado Fígado", image: "https://i.postimg.cc/4xMM0Ncw/Cat-Cats-Enlatado-Figado.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Ração enlatada sabor fígado" },
  { id: 36, title: "Cat & Cats Sachê Carne", image: "https://i.postimg.cc/0yLWfXgB/Cat-Cats-Saches-Carne.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor carne" },
  { id: 37, title: "Cat & Cats Sachê Frango", image: "https://i.postimg.cc/xCQsrk1G/Cat-Cats-Saches-Frango.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor frango" },
  { id: 38, title: "MikCat Sachê Adulto Atum", image: "https://i.postimg.cc/dQLHTZx1/MIKCAT-SACHES-ADULTO-ATUM-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor atum" },
  { id: 39, title: "MikCat Sachê Adulto Carne", image: "https://i.postimg.cc/g2qNPVnM/MIKCAT-SACHES-ADULTO-CARNE-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor carne" },
  { id: 40, title: "MikCat Sachê Adulto Salmão", image: "https://i.postimg.cc/NG9D0qK2/MIKCAT-SACHES-ADULTO-SALMAO-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor salmão" },
  { id: 41, title: "MikCat Sachê Adulto Cordeiro", image: "https://i.postimg.cc/NML4TZbV/MIKCAT-SACHES-ADULTO-CORDEIRO-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê sabor cordeiro" },
  { id: 42, title: "MikCat Sachê Filhote Carne", image: "https://i.postimg.cc/65ChdrL9/MIKCAT-SACHES-FILHOTE-CARNE-MOCKUP.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê para filhotes" },
  { id: 43, title: "MikCat Sachê Castrados Frango", image: "https://i.postimg.cc/qvb6nqYJ/Mockup-MIKCAT-SACHES-Gatos-Castrados-Frango-ao-Molho.jpg", category: "Premium", type: "Gatos", line: "Ração Úmida", description: "Sachê para gatos castrados" },
];

// Linha 4 - Demais produtos de ração seca
const dryFoodProducts = [
  { id: 1, title: "Lupydog", image: "https://i.postimg.cc/3RKMTr8G/Lupy-Dog-7kg-1.png", category: "Standard", type: "Cães", line: "Ração Seca", description: "Ração completa para cães adultos" },
  { id: 2, title: "Lilidog", image: "https://i.postimg.cc/HxjrkznT/LILI-DOG.jpg", category: "Standard", type: "Cães", line: "Ração Seca", description: "Nutrição balanceada para cães" },
  { id: 3, title: "Zecão", image: "https://i.postimg.cc/6qmFnddV/ZECA-O-ORIGINAL-2.jpg", category: "Standard", type: "Cães", line: "Ração Seca", description: "Ração econômica para cães" },
  { id: 4, title: "Gerrys", image: "https://i.postimg.cc/TwHWVSFy/Gerrys-20kg.jpg", category: "Standard", type: "Cães", line: "Ração Seca", description: "Nutrição completa e balanceada" },
  { id: 5, title: "Zecat", image: "https://i.postimg.cc/6qmFnddV/ZECA-O-ORIGINAL-2.jpg", category: "Standard", type: "Gatos", line: "Ração Seca", description: "Ração completa para gatos" },
  { id: 6, title: "Dog & Dogs Adultos", image: "https://i.postimg.cc/4NyWTRs0/Dog-Dogs-Adultos.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para cães adultos" },
  { id: 7, title: "Dog & Dogs Filhotes", image: "https://i.postimg.cc/kg8FnnZT/Dog-Dogs-Filhotes.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para filhotes" },
  { id: 8, title: "Dog & Dogs Pequeno Porte", image: "https://i.postimg.cc/XqHxyQcx/Dog-Dogs-Peq-Racas.jpg", category: "Premium", type: "Cães", line: "Ração Seca", description: "Ração premium para cães pequenos" },
  { id: 18, title: "Cat & Cats Adultos", image: "https://i.postimg.cc/BntkN1jX/Cat-Cats-Adultos.jpg", category: "Premium", type: "Gatos", line: "Ração Seca", description: "Ração premium para gatos adultos" },
  { id: 19, title: "Cat & Cats Nuggets", image: "https://i.postimg.cc/mZwnsSMP/Cat-Cats-Nuggets.jpg", category: "Premium", type: "Gatos", line: "Ração Seca", description: "Ração em formato nuggets para gatos" },
  { id: 52, title: "ProPeixe Junior", image: "https://i.postimg.cc/NMfvrqh9/PROPEIXE-JUNIOR-2.png", category: "Premium", type: "Peixes", line: "Ração Seca", description: "Ração especial para peixes jovens" },
];

const ProductCard = ({ product, index, onClick }: { product: any, index: number, onClick: () => void }) => (
  <div 
    className="w-[160px] h-[200px] rounded-2xl bg-gray-50 shadow-lg p-3 hover:shadow-xl transition-all duration-300 flex-shrink-0 flex flex-col cursor-pointer"
    onClick={onClick}
    style={{
      background: 'linear-gradient(145deg, #f8f9fa, #f1f3f4)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)'
    }}
  >
    {/* Container da imagem com altura fixa, largura fixa e centralização */}
    <div className={`mx-auto flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 mb-3 ${
      product.line === 'Sachê' || product.line === 'Ração Úmida' || product.line === 'Enlatado' || product.line === 'Snacks'
        ? 'h-[160px] w-[120px]' 
        : 'h-[160px] w-[120px]'
    }`}>
      <img
        src={product.image}
        alt={product.title}
        className={`w-full h-full object-contain ${
          product.line === 'Sachê' || product.line === 'Ração Úmida' || product.line === 'Enlatado' || product.line === 'Snacks'
            ? 'p-2' 
            : 'p-1'
        }`}
        loading={index < 10 ? "eager" : "lazy"}
        onError={(e) => {
          const target = e.currentTarget;
          const fallback = document.createElement('div');
          fallback.className = `flex items-center justify-center h-[160px] w-[120px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl`;
          fallback.innerHTML = `
            <div class="text-center p-4">
              <div class="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          `;
          target.parentElement?.replaceChild(fallback, target);
        }}
      />
    </div>
  </div>
);

export function InfiniteSliderHorizontal() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Linha 1 - Produtos Prioritá (direita para esquerda) - Com duplicações */}
          <div className="w-full">
            <InfiniteSlider direction="horizontal" reverse speed="slow">
              {prioritaProducts.map((product, index) => (
                <ProductCard 
                  key={`priorita-${index}`} 
                  product={product} 
                  index={index}
                  onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                />
              ))}
            </InfiniteSlider>
          </div>

          {/* Linha 2 - Produtos Mik (esquerda para direita) */}
          <div className="w-full">
            <InfiniteSlider direction="horizontal" speed="slow">
              {mikProducts.map((product, index) => (
                <ProductCard 
                  key={`mik-${product.title}-${index}`} 
                  product={product} 
                  index={index}
                  onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                />
              ))}
            </InfiniteSlider>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 font-bold font-barlow-condensed">
          <p className="text-gray-900 mb-6 font-montserrat font-bold text-lg">
            MAIS DE 60 PRODUTOS DE ALTA QUALIDADE
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-10 py-5 bg-pian-yellow text-pian-black hover:bg-pian-yellow-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold font-montserrat uppercase tracking-wide"
          >
            VER TODOS OS PRODUTOS
          </a>
        </div>
      </div>

      {/* Modal do Produto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}