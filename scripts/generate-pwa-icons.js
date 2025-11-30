/**
 * Script para gerar ícones PWA a partir do logo
 * 
 * Requisitos:
 * npm install -D sharp
 * 
 * Uso:
 * node scripts/generate-pwa-icons.js
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const logoPath = join(publicDir, 'logo-pian.png');

const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' }
];

async function generateIcons() {
  try {
    // Verificar se o logo existe
    if (!existsSync(logoPath)) {
      console.error(`❌ Logo não encontrado em: ${logoPath}`);
      console.log('💡 Por favor, certifique-se de que o arquivo logo-pian.png existe na pasta public/');
      process.exit(1);
    }

    console.log('🎨 Gerando ícones PWA...\n');

    // Gerar cada tamanho de ícone
    for (const { size, name } of sizes) {
      const outputPath = join(publicDir, name);
      
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Gerado: ${name} (${size}x${size})`);
    }

    console.log('\n✨ Ícones PWA gerados com sucesso!');
    console.log('📱 Os ícones estão prontos para uso no PWA.');
  } catch (error) {
    console.error('❌ Erro ao gerar ícones:', error.message);
    
    if (error.message.includes('sharp')) {
      console.log('\n💡 Para instalar o sharp, execute:');
      console.log('   npm install -D sharp');
    }
    
    process.exit(1);
  }
}

generateIcons();

