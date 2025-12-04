const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: string; // ISO string
  lastLogin: string | null; // ISO string
}

/**
 * Faz login do admin via API
 */
export async function loginAdmin(email: string, password: string): Promise<{ user: AdminUser } | { error: string }> {
  try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { user: data.user };
    } else {
      return { error: data.error || 'Erro ao fazer login' };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return { error: 'Erro de conexão. Verifique se o servidor está rodando.' };
  }
}

/**
 * Verifica status do admin via API
 */
export async function checkAdminStatus(userId: string): Promise<{ user: AdminUser } | null> {
  try {
    const response = await fetch(`${API_URL}/api/admin/check/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { user: data.user };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return null;
  }
}

