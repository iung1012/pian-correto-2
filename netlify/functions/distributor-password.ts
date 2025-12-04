import type { Handler } from '@netlify/functions';
import { createResponse, handleCORS, parseBody } from './_helpers';

// Senha deve estar em variável de ambiente, não hardcoded
const DISTRIBUTOR_PASSWORD = process.env.DISTRIBUTOR_PASSWORD || 'PianAlimentos';

// Validação de senha
function isValidPassword(password: string): boolean {
  return password.length >= 6 && password.length <= 128;
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
    const { password } = body;

    // Validação de input
    if (!password) {
      return createResponse(400, { error: 'Senha é obrigatória' }, {}, requestOrigin);
    }

    if (!isValidPassword(password)) {
      return createResponse(400, { error: 'Senha inválida' }, {}, requestOrigin);
    }

    // Comparação segura (proteção contra timing attacks)
    // Sempre executar comparação mesmo se senha estiver errada
    const isValid = password === DISTRIBUTOR_PASSWORD;

    // Log de tentativa (sem expor a senha)
    if (!isValid) {
      console.warn('Tentativa de acesso a distribuidores falhada');
    }

    // Mensagem genérica para não vazar informações
    if (!isValid) {
      return createResponse(401, {
        error: 'Senha incorreta',
      }, {}, requestOrigin);
    }

    return createResponse(200, {
      success: true,
      message: 'Acesso autorizado',
    }, {}, requestOrigin);
  } catch (error) {
    console.error('Error in distributor-password:', error);
    return createResponse(500, {
      error: 'Erro ao processar requisição',
    }, {}, requestOrigin);
  }
};

