import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: Date;
  lastLogin: Date | null;
}

/**
 * Verifica se o email e senha são válidos
 */
export async function verifyAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      return null;
    }

    // Verifica a senha
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return null;
    }

    // Atualiza último login
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // Retorna sem a senha
    return {
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      createdAt: admin.createdAt,
      lastLogin: admin.lastLogin,
    };
  } catch (error) {
    console.error('Error verifying admin:', error);
    return null;
  }
}

/**
 * Verifica se um usuário é admin (por ID)
 */
export async function checkAdminStatus(userId: string): Promise<boolean> {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: userId },
    });
    return admin !== null;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Cria um novo usuário admin
 */
export async function createAdmin(
  email: string,
  password: string,
  fullName?: string
): Promise<AdminUser | null> {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.adminUser.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName: fullName || null,
      },
    });

    return {
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      createdAt: admin.createdAt,
      lastLogin: admin.lastLogin,
    };
  } catch (error) {
    console.error('Error creating admin:', error);
    return null;
  }
}

