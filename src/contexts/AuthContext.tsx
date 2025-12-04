import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginAdmin, checkAdminStatus } from '../lib/admin-api';

interface AdminUserContext {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: Date;
  lastLogin: Date | null;
}

interface AuthContextType {
  user: AdminUserContext | null;
  session: { userId: string } | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'pian_admin_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUserContext | null>(null);
  const [session, setSession] = useState<{ userId: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há sessão salva
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        restoreSession(sessionData.userId);
      } catch (error) {
        console.error('Error restoring session:', error);
        localStorage.removeItem(STORAGE_KEY);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  async function restoreSession(userId: string) {
    try {
      const result = await checkAdminStatus(userId);
      if (result && result.user) {
        // Converte strings ISO para Date
        const userData: AdminUserContext = {
          ...result.user,
          createdAt: new Date(result.user.createdAt),
          lastLogin: result.user.lastLogin ? new Date(result.user.lastLogin) : null,
        };
        setUser(userData);
        setSession({ userId: userData.id });
        setIsAdmin(true);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error restoring session:', error);
      localStorage.removeItem(STORAGE_KEY);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const result = await loginAdmin(email, password);
      
      if ('user' in result) {
        // Converte strings ISO para Date
        const userData: AdminUserContext = {
          ...result.user,
          createdAt: new Date(result.user.createdAt),
          lastLogin: result.user.lastLogin ? new Date(result.user.lastLogin) : null,
        };
        setUser(userData);
        setSession({ userId: userData.id });
        setIsAdmin(true);
        
        // Salva sessão no localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: userData.id }));
        
        return { error: null };
      } else {
        return { 
          error: { 
            message: result.error || 'Email ou senha incorretos' 
          } 
        };
      }
    } catch (error) {
      console.error('Error signing in:', error);
      return { 
        error: { 
          message: 'Erro ao fazer login. Tente novamente.' 
        } 
      };
    }
  }

  async function signOut() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  }

  const value = {
    user,
    session,
    isAdmin,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
