import type { Handler } from '@netlify/functions';

export interface Response {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

// Lista de origens permitidas (configurar via variável de ambiente)
const getAllowedOrigins = (): string[] => {
  const allowed = process.env.ALLOWED_ORIGINS || process.env.URL || '';
  return allowed.split(',').filter(Boolean).map(origin => origin.trim());
};

// Verifica se a origem da requisição é permitida
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  
  const allowedOrigins = getAllowedOrigins();
  
  // Em desenvolvimento, permitir localhost
  if (process.env.NODE_ENV === 'development' || !process.env.URL) {
    allowedOrigins.push('http://localhost:5173', 'http://localhost:3000', 'http://localhost:8888');
  }
  
  return allowedOrigins.some(allowed => 
    origin === allowed || origin.startsWith(allowed)
  );
}

// Obtém a origem permitida para CORS
function getAllowedOrigin(requestOrigin: string | null): string {
  if (isOriginAllowed(requestOrigin)) {
    return requestOrigin || '*';
  }
  // Se não for permitida, retorna a primeira origem permitida ou '*'
  const allowed = getAllowedOrigins();
  return allowed[0] || '*';
}

export function createResponse(
  statusCode: number,
  data: any,
  headers: Record<string, string> = {},
  requestOrigin: string | null = null
): Response {
  const allowedOrigin = getAllowedOrigin(requestOrigin);
  
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      ...headers,
    },
    body: JSON.stringify(data),
  };
}

export function handleCORS(requestOrigin: string | null): Response | null {
  const allowedOrigin = getAllowedOrigin(requestOrigin);
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400', // 24 horas
    },
    body: '',
  };
}

export function parseBody(event: any): any {
  if (!event.body) return {};
  try {
    return JSON.parse(event.body);
  } catch {
    return {};
  }
}

