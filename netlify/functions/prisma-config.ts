// Configuração do Prisma para ambiente serverless (Netlify Functions)
// O banco de dados SQLite precisa estar acessível no ambiente de execução

import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Em ambiente serverless, o banco precisa estar em um local acessível
// Por padrão, usamos o banco na pasta prisma/
const dbPath = process.env.DATABASE_URL || 
  path.join(__dirname, '../../prisma/dev.db');

// Configura o Prisma Client para usar o caminho correto do banco
process.env.DATABASE_URL = `file:${dbPath}`;

// Singleton pattern para Prisma Client em ambiente serverless
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

