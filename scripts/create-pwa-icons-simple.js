/**
 * Script simples para criar ícones PWA placeholder
 * Cria ícones simples com fundo amarelo e texto "P"
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// SVG simples para os ícones
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#FDD528"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.6}" font-weight="bold" fill="#000000" text-anchor="middle" dominant-baseline="middle">P</text>
</svg>
`;

// Criar ícones como SVG (será convertido para PNG manualmente ou via build)
const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' }
];

// Por enquanto, vamos criar um arquivo de instrução
// O usuário pode usar um gerador online ou criar manualmente
console.log('📱 Para criar os ícones PWA:');
console.log('');
console.log('Opção 1: Use um gerador online');
console.log('   - https://realfavicongenerator.net/');
console.log('   - https://www.pwabuilder.com/imageGenerator');
console.log('');
console.log('Opção 2: Use o logo-pian.png como base');
console.log('   - Redimensione para 192x192 e salve como pwa-192x192.png');
console.log('   - Redimensione para 512x512 e salve como pwa-512x512.png');
console.log('');
console.log('Opção 3: Crie ícones simples');
console.log('   - Use qualquer editor de imagem');
console.log('   - Fundo: #FDD528 (amarelo Pian)');
console.log('   - Tamanhos: 192x192 e 512x512');
console.log('');

// Criar arquivos SVG temporários que podem ser convertidos
sizes.forEach(({ size, name }) => {
  const svgPath = path.join(publicDir, name.replace('.png', '.svg'));
  const svgContent = createIconSVG(size);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Criado: ${name.replace('.png', '.svg')} (${size}x${size})`);
});

console.log('');
console.log('💡 Os arquivos SVG foram criados. Converta para PNG usando:');
console.log('   - Um editor de imagem (GIMP, Photoshop, etc)');
console.log('   - Ou um conversor online');

