"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Quem Somos">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/about">Nossa História</HoveredLink>
            <HoveredLink to="/about">40 Anos de Tradição</HoveredLink>
            <HoveredLink to="/about">Missão e Valores</HoveredLink>
            <HoveredLink to="/about">Fórmulas Fechadas</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Produtos">
          <div className="text-sm p-4 space-y-6">
            {/* Por Marca */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 font-barlow-condensed">Por Marca</h4>
              <div className="grid grid-cols-2 gap-4">
                <HoveredLink to="/products?search=Prioritá">Prioritá</HoveredLink>
                <HoveredLink to="/products?search=MikDog">MikDog</HoveredLink>
                <HoveredLink to="/products?search=MikCat">MikCat</HoveredLink>
                <HoveredLink to="/products?search=Dog%20%26%20Dogs">Dog & Dogs</HoveredLink>
                <HoveredLink to="/products?search=Cat%20%26%20Cats">Cat & Cats</HoveredLink>
                <HoveredLink to="/products?search=Gerrys">Gerrys</HoveredLink>
                <HoveredLink to="/products?search=Lupydog">Lupydog</HoveredLink>
                <HoveredLink to="/products?search=Lilidog">Lilidog</HoveredLink>
                <HoveredLink to="/products?search=Zecão">Zecão</HoveredLink>
                <HoveredLink to="/products?search=Zecat">Zecat</HoveredLink>
                <HoveredLink to="/products?search=ProPeixe">ProPeixe</HoveredLink>
              </div>
            </div>
            
            {/* Por Linha */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 font-barlow-condensed">Por Linha</h4>
              <div className="grid grid-cols-2 gap-4">
                <HoveredLink to="/products?category=Super%20Premium">Super Premium</HoveredLink>
                <HoveredLink to="/products?category=Premium%20Especial">Premium Especial</HoveredLink>
                <HoveredLink to="/products?category=Premium">Premium</HoveredLink>
                <HoveredLink to="/products?category=Standard">Standard</HoveredLink>
              </div>
            </div>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Serviços">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/distributors">Encontre um Distribuidor</HoveredLink>
            <HoveredLink to="/distributors">Seja um Distribuidor</HoveredLink>
            <HoveredLink to="/blog">Blog e Dicas</HoveredLink>
            <HoveredLink to="/contact">Suporte Técnico</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Contato">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/contact">Fale Conosco</HoveredLink>
            <HoveredLink to="/contact#location">Nossa Localização</HoveredLink>
            <HoveredLink to="/contact">Telefone: (54) 3358-2222</HoveredLink>
            <HoveredLink to="/contact">Email: contato@pianalimentos.com.br</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;