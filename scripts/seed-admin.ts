import { createAdmin } from '../src/lib/admin-auth';

async function seedAdmin() {
  console.log('🌱 Criando usuário admin de teste...\n');

  const email = 'admin@pian.com.br';
  const password = 'admin123';
  const fullName = 'Administrador Principal';

  const admin = await createAdmin(email, password, fullName);

  if (admin) {
    console.log('✅ Usuário admin criado com sucesso!\n');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Senha:', password);
    console.log('👤 Nome:', admin.fullName);
    console.log('\n⚠️  IMPORTANTE: Altere a senha após o primeiro login!\n');
  } else {
    console.log('❌ Erro ao criar usuário admin. Verifique se já existe um usuário com este email.\n');
  }
}

seedAdmin()
  .catch((error) => {
    console.error('Erro:', error);
    process.exit(1);
  })
  .finally(async () => {
    const { prisma } = await import('../src/lib/prisma');
    await prisma.$disconnect();
  });

