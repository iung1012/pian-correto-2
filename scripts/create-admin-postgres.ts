import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@pian.com.br';
    const password = 'admin123';
    const fullName = 'Administrador';

    // Verificar se já existe
    const existing = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existing) {
      console.log('✅ Usuário admin já existe!');
      console.log(`   Email: ${existing.email}`);
      return;
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Nome: ${admin.fullName}`);
    console.log(`   🔑 Senha: ${password}`);
    console.log('\n⚠️  IMPORTANTE: Altere a senha após o primeiro login!');
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

