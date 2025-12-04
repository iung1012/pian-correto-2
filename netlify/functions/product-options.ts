import type { Handler } from '@netlify/functions';
import { createResponse, handleCORS, parseBody } from './_helpers';
import {
  getProductOptions,
  createProductOption,
  updateProductOption,
  deleteProductOption,
  OptionType,
} from '../../src/lib/product-options';

export const handler: Handler = async (event, context) => {
  const requestOrigin = event.headers.origin || event.headers.referer || null;
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return handleCORS(requestOrigin);
  }

  try {
    // Extract type and id from path
    // Path can be: /.netlify/functions/product-options/:type/:id? or /api/product-options/:type/:id?
    const pathParts = event.path.split('/').filter(Boolean);
    const typeIndex = pathParts.findIndex(p => p === 'product-options');
    
    if (typeIndex === -1) {
      return createResponse(400, { error: 'Caminho inválido' });
    }
    
    const type = pathParts[typeIndex + 1] as OptionType;
    const id = pathParts[typeIndex + 2];

    // Validate type
    if (!type || !['category', 'type', 'classification', 'line'].includes(type)) {
      return createResponse(400, { error: 'Tipo inválido' }, {}, requestOrigin);
    }

    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        // GET /api/product-options/:type
        const options = await getProductOptions(type);
        return createResponse(200, {
          success: true,
          options: options.map((opt) => ({
            id: opt.id,
            name: opt.name,
            sortOrder: opt.sortOrder,
            createdAt: opt.createdAt.toISOString(),
          })),
        }, {}, requestOrigin);

      case 'POST':
        // POST /api/product-options/:type
        const body = parseBody(event);
        const { name, sortOrder } = body;

        const sanitizedName = name?.trim().slice(0, 100) || '';
        if (!sanitizedName || sanitizedName.length < 1) {
          return createResponse(400, { error: 'Nome é obrigatório' }, {}, requestOrigin);
        }

        const newOption = await createProductOption(type, sanitizedName, sortOrder || 0);

        if (newOption) {
          return createResponse(200, {
            success: true,
            option: {
              id: newOption.id,
              name: newOption.name,
              sortOrder: newOption.sortOrder,
              createdAt: newOption.createdAt.toISOString(),
            },
          }, {}, requestOrigin);
        } else {
          return createResponse(400, {
            error: 'Erro ao criar opção. Nome pode já existir.',
          }, {}, requestOrigin);
        }

      case 'PUT':
        // PUT /api/product-options/:type/:id
        if (!id || !isValidUUID(id)) {
          return createResponse(400, { error: 'ID inválido' }, {}, requestOrigin);
        }

        const updateBody = parseBody(event);
        const { name: updateName, sortOrder: updateSortOrder } = updateBody;

        const sanitizedUpdateName = updateName?.trim().slice(0, 100) || '';
        if (!sanitizedUpdateName || sanitizedUpdateName.length < 1) {
          return createResponse(400, { error: 'Nome é obrigatório' }, {}, requestOrigin);
        }

        const updatedOption = await updateProductOption(
          type,
          id,
          sanitizedUpdateName,
          updateSortOrder || 0
        );

        if (updatedOption) {
          return createResponse(200, {
            success: true,
            option: {
              id: updatedOption.id,
              name: updatedOption.name,
              sortOrder: updatedOption.sortOrder,
              createdAt: updatedOption.createdAt.toISOString(),
            },
          }, {}, requestOrigin);
        } else {
          return createResponse(400, { error: 'Erro ao atualizar opção' }, {}, requestOrigin);
        }

      case 'DELETE':
        // DELETE /api/product-options/:type/:id
        if (!id || !isValidUUID(id)) {
          return createResponse(400, { error: 'ID inválido' }, {}, requestOrigin);
        }

        const success = await deleteProductOption(type, id);

        if (success) {
          return createResponse(200, { success: true }, {}, requestOrigin);
        } else {
          return createResponse(400, { error: 'Erro ao deletar opção' }, {}, requestOrigin);
        }

      default:
        return createResponse(405, { error: 'Method not allowed' }, {}, requestOrigin);
    }
  } catch (error) {
    console.error('Error in product-options:', error);
    return createResponse(500, { error: 'Erro ao processar requisição' }, {}, requestOrigin);
  }
};

// Validação de UUID
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

