import type { Handler } from '@netlify/functions';
import { createResponse, handleCORS } from './_helpers';
import { checkAdminStatus } from '../../src/lib/admin-auth';
import { prisma } from '../../src/lib/prisma';

// Validação de UUID
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export const handler: Handler = async (event, context) => {
  const requestOrigin = event.headers.origin || event.headers.referer || null;
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return handleCORS(requestOrigin);
  }

  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return createResponse(405, { error: 'Method not allowed' }, {}, requestOrigin);
  }

  try {
    // Extract userId from path
    // Path can be: /.netlify/functions/admin-check/:userId or /api/admin/check/:userId
    const pathParts = event.path.split('/').filter(Boolean);
    let userId: string | undefined;
    
    // Try to find userId after 'check' or 'admin-check'
    const checkIndex = pathParts.findIndex(p => p === 'check' || p === 'admin-check');
    if (checkIndex !== -1 && pathParts[checkIndex + 1]) {
      userId = pathParts[checkIndex + 1];
    } else {
      // Fallback: last part of path
      userId = pathParts[pathParts.length - 1];
    }

    if (!userId) {
      return createResponse(400, { error: 'User ID é obrigatório' }, {}, requestOrigin);
    }

    // Validar formato do UUID
    if (!isValidUUID(userId)) {
      return createResponse(400, { error: 'ID inválido' }, {}, requestOrigin);
    }

    const isAdmin = await checkAdminStatus(userId);

    if (isAdmin) {
      const admin = await prisma.adminUser.findUnique({
        where: { id: userId },
      });

      if (admin) {
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
      }
    }

    return createResponse(401, {
      success: false,
      error: 'Usuário não autorizado',
    }, {}, requestOrigin);
  } catch (error) {
    console.error('Error checking admin status:', error);
    return createResponse(500, {
      error: 'Erro ao verificar status',
    }, {}, requestOrigin);
  }
};

