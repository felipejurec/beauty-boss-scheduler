
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Definir um tipo para representar o usuário com dados do perfil
interface UserWithProfile extends User {
  name?: string;
  whatsapp?: string;
  profileData?: any;
}

interface AuthContextType {
  currentUser: UserWithProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, whatsapp: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserWithProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Função para buscar os dados do perfil do usuário
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setCurrentUser(prev => 
          prev ? { ...prev, name: data.name, whatsapp: data.whatsapp, profileData: data } : null
        );
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  };
  
  // Função para atualizar os dados do perfil
  const refreshProfile = async () => {
    if (currentUser?.id) {
      await fetchUserProfile(currentUser.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          const userWithProfile = newSession.user as UserWithProfile;
          setCurrentUser(userWithProfile);
          
          // Buscar dados do perfil em um setTimeout para evitar loops
          setTimeout(() => {
            fetchUserProfile(userWithProfile.id);
          }, 0);
        } else {
          setCurrentUser(null);
        }
        
        setIsAuthenticated(!!newSession);
      }
    );

    // Check for existing session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(data.session);
        
        if (data.session?.user) {
          const userWithProfile = data.session.user as UserWithProfile;
          setCurrentUser(userWithProfile);
          
          // Buscar os dados do perfil
          await fetchUserProfile(userWithProfile.id);
        } else {
          setCurrentUser(null);
        }
        
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      const errorMessage = (error as Error).message || 'Falha no login';
      toast.error("Falha no login: " + errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, whatsapp: string, password: string) => {
    setIsLoading(true);
    try {
      // Signup usando o Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, whatsapp }
        }
      });
      
      if (error) throw error;
      
      // Atualizar o perfil com WhatsApp após a criação automática via trigger
      if (data.user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ whatsapp })
          .eq('id', data.user.id);
          
        if (updateError) console.error('Erro ao atualizar WhatsApp:', updateError);
      }
      
      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmar sua conta.");
    } catch (error) {
      const errorMessage = (error as Error).message || 'Falha no cadastro';
      toast.error("Falha no cadastro: " + errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      const errorMessage = (error as Error).message || 'Falha ao sair';
      toast.error("Falha ao sair: " + errorMessage);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        session,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        refreshProfile,
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
