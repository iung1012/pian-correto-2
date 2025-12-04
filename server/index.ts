import express from 'express';
import cors from 'cors';
import { verifyAdmin, checkAdminStatus } from '../src/lib/admin-auth';
import {
  getProductOptions,
  createProductOption,
  updateProductOption,
  deleteProductOption,
  OptionType,
} from '../src/lib/product-options';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rota de login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const admin = await verifyAdmin(email, password);

    if (admin) {
      return res.json({ 
        success: true, 
        user: admin 
      });
    } else {
      return res.status(401).json({ 
        error: 'Email ou senha incorretos' 
      });
    }
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ 
      error: 'Erro ao fazer login' 
    });
  }
});

// Rota para verificar status admin
app.get('/api/admin/check/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const isAdmin = await checkAdminStatus(userId);
    
    if (isAdmin) {
      const { prisma } = await import('../src/lib/prisma');
      const admin = await prisma.adminUser.findUnique({
        where: { id: userId },
      });

      if (admin) {
        return res.json({
          success: true,
          user: {
            id: admin.id,
            email: admin.email,
            fullName: admin.fullName,
            createdAt: admin.createdAt,
            lastLogin: admin.lastLogin,
          }
        });
      }
    }

    return res.status(401).json({ 
      success: false, 
      error: 'Usuário não autorizado' 
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ 
      error: 'Erro ao verificar status' 
    });
  }
});

// Rotas para gerenciar opções de produtos
app.get('/api/product-options/:type', async (req, res) => {
  try {
    const { type } = req.params;
    if (!['category', 'type', 'classification', 'line'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }
    const options = await getProductOptions(type as OptionType);
    return res.json({ success: true, options });
  } catch (error) {
    console.error('Error fetching options:', error);
    return res.status(500).json({ error: 'Erro ao buscar opções' });
  }
});

app.post('/api/product-options/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { name, sortOrder } = req.body;

    if (!['category', 'type', 'classification', 'line'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const option = await createProductOption(type as OptionType, name.trim(), sortOrder || 0);

    if (option) {
      return res.json({ success: true, option });
    } else {
      return res.status(400).json({ error: 'Erro ao criar opção. Nome pode já existir.' });
    }
  } catch (error) {
    console.error('Error creating option:', error);
    return res.status(500).json({ error: 'Erro ao criar opção' });
  }
});

app.put('/api/product-options/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const { name, sortOrder } = req.body;

    if (!['category', 'type', 'classification', 'line'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const option = await updateProductOption(type as OptionType, id, name.trim(), sortOrder || 0);

    if (option) {
      return res.json({ success: true, option });
    } else {
      return res.status(400).json({ error: 'Erro ao atualizar opção' });
    }
  } catch (error) {
    console.error('Error updating option:', error);
    return res.status(500).json({ error: 'Erro ao atualizar opção' });
  }
});

app.delete('/api/product-options/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;

    if (!['category', 'type', 'classification', 'line'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    const success = await deleteProductOption(type as OptionType, id);

    if (success) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ error: 'Erro ao deletar opção' });
    }
  } catch (error) {
    console.error('Error deleting option:', error);
    return res.status(500).json({ error: 'Erro ao deletar opção' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Admin rodando em http://localhost:${PORT}`);
});

