import type { Handler } from '@netlify/functions';
import { createResponse, handleCORS, parseBody } from './_helpers';
import { verifyAdmin } from '../../src/lib/admin-auth';

// Validação de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

// Validação de senha
function isValidPassword(password: string): boolean {
  // Mínimo 6 caracteres, máximo 128
  return password.length >= 6 && password.length <= 128;
}

// Sanitização de input
function sanitizeInput(input: string): string {
  return input.trim().slice(0, 255);
}

export const handler: Handler = async (event, context) => {
  const requestOrigin = event.headers.origin || event.headers.referer || null;
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return handleCORS(requestOrigin);
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' }, {}, requestOrigin);
  }

  try {
    const body = parseBody(event);
    const { email, password } = body;

    // Validação de inputs
    if (!email || !password) {
      return createResponse(400, { error: 'Email e senha são obrigatórios' }, {}, requestOrigin);
    }

    // Sanitizar e validar email
    const sanitizedEmail = sanitizeInput(email);
    if (!isValidEmail(sanitizedEmail)) {
      return createResponse(400, { error: 'Email inválido' }, {}, requestOrigin);
    }

    // Validar senha
    if (!isValidPassword(password)) {
      return createResponse(400, { error: 'Senha inválida' }, {}, requestOrigin);
    }

    // Sempre executar verificação (proteção contra timing attacks)
    const admin = await verifyAdmin(sanitizedEmail, password);

    // Mensagem genérica para não vazar informações
    if (!admin) {
      // Log de tentativa falhada (sem expor email em produção)
      console.warn('Tentativa de login falhada');
      return createResponse(401, {
        error: 'Credenciais inválidas',
      }, {}, requestOrigin);
    }

    // Log de login bem-sucedido
    console.info(`Login bem-sucedido: ${admin.email}`);

    return createResponse(200, {
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        createdAt: admin.createdAt.toISOString(),
        lastLogin: admin.lastLogin?.toISOString() || null,
      },
    }, {}, requestOrigin);
  } catch (error: any) {
    console.error('Error in login:', error);
    
    // Log detalhado para debug
    if (error.message) {
      console.error('Error message:', error.message);
    }
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    
    // Mensagem mais específica para erros de banco de dados
    const errorMessage = error.message || 'Erro desconhecido';
    if (errorMessage.includes('SQLite') || errorMessage.includes('ENOENT') || errorMessage.includes('database')) {
      console.error('⚠️ ERRO DE BANCO DE DADOS: SQLite não funciona em ambiente serverless do Netlify.');
      console.error('💡 SOLUÇÃO: Migre para PostgreSQL (Supabase). Veja TROUBLESHOOTING_ADMIN_NETLIFY.md');
    }
    
    return createResponse(500, {
      error: 'Erro ao processar requisição',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    }, {}, requestOrigin);
  }
};

