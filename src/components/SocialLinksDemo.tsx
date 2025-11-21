import React from 'react';
import { SocialLinks } from "./ui/social-links";

const socials = [
  {
    name: "Instagram",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=64&h=64&fit=crop&crop=center",
    url: "https://www.instagram.com/pian.alimentos"
  },
  {
    name: "Facebook",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=64&h=64&fit=crop&crop=center",
    url: "https://www.facebook.com/pian.alimentos/"
  },
];

export function SocialLinksDemo() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-montserrat">
            Siga a PIAN ALIMENTOS
          </h1>
          <p className="text-gray-600 mb-8 font-montserrat">
            Conecte-se conosco nas redes sociais para novidades, dicas sobre nutrição pet e muito mais!
          </p>
        </div>
        <SocialLinks socials={socials} />
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-500 font-montserrat">
            Clique nos links para visitar nossas redes sociais
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-400 font-montserrat">
            <span>@pian.alimentos</span>
            <span>•</span>
            <span>40 anos de tradição</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export function SocialLinksCustomGap() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat">
            Principais Redes Sociais
          </h2>
          <p className="text-gray-600 mb-6 font-montserrat">
            Instagram e Facebook - Nossos canais principais
          </p>
        </div>
        <SocialLinks 
          socials={socials.slice(0, 2)} 
          className="gap-4" 
        />
        <div className="text-sm text-gray-500 font-montserrat">
          <p>Passe o mouse sobre os links para ver as animações</p>
        </div>
      </div>
    </main>
  );
}

export default {
  SocialLinksDemo,
  SocialLinksCustomGap,
};