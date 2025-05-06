
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUser } from '@/lib/mock-data';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, whatsapp: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // In a real implementation, we would check with Supabase here
        const savedUser = localStorage.getItem('beauty_boss_user');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - would be replaced with Supabase auth
      if (email === mockUser.email && password === 'password') {
        setCurrentUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('beauty_boss_user', JSON.stringify(mockUser));
        toast.success("Login realizado com sucesso!");
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error("Falha no login: " + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, whatsapp: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock signup - would be replaced with Supabase auth
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        whatsapp,
        isSubscribed: false
      };
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('beauty_boss_user', JSON.stringify(newUser));
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      toast.error("Falha no cadastro: " + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Mock logout - would be replaced with Supabase auth
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('beauty_boss_user');
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Falha ao sair: " + (error as Error).message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
