
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessType, OnboardingState } from '@/types';
import { getServicesByBusinessType } from '@/lib/mock-data';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface OnboardingContextType {
  state: OnboardingState;
  setStep: (step: number) => void;
  setBusinessType: (type: BusinessType) => void;
  addProfessional: (name: string) => void;
  removeProfessional: (index: number) => void;
  addService: (name: string, duration: number, price: number) => void;
  removeService: (index: number) => void;
  updateService: (index: number, name: string, duration: number, price: number) => void;
  loadDefaultServices: (businessType: BusinessType) => void;
  setSchedule: (day: string, enabled: boolean, start: string, end: string) => void;
  saveOnboardingData: () => Promise<{ success: boolean, error?: string }>;
  resetState: () => void;
  isSubmitting: boolean;
}

const initialState: OnboardingState = {
  step: 1,
  businessType: null,
  professionals: [{ name: '' }],
  services: [],
  schedule: {
    days: {
      'monday': { enabled: true, start: '09:00', end: '18:00' },
      'tuesday': { enabled: true, start: '09:00', end: '18:00' },
      'wednesday': { enabled: true, start: '09:00', end: '18:00' },
      'thursday': { enabled: true, start: '09:00', end: '18:00' },
      'friday': { enabled: true, start: '09:00', end: '18:00' },
      'saturday': { enabled: true, start: '09:00', end: '14:00' },
      'sunday': { enabled: false, start: '09:00', end: '18:00' },
    }
  }
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<OnboardingState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  // Carregar dados existentes do usuário, se disponíveis
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) return;

      try {
        // Carrega o perfil do usuário
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (profileError) throw profileError;

        // Atualiza o tipo de negócio se disponível
        if (profileData.business_type) {
          setState(prev => ({
            ...prev,
            businessType: profileData.business_type as BusinessType
          }));
        }

        // Carrega os profissionais do usuário
        const { data: professionalsData, error: professionalsError } = await supabase
          .from('professionals')
          .select('*')
          .eq('user_id', currentUser.id);

        if (professionalsError) throw professionalsError;

        if (professionalsData && professionalsData.length > 0) {
          setState(prev => ({
            ...prev,
            professionals: professionalsData.map(prof => ({ name: prof.name }))
          }));
        }

        // Carrega os serviços do usuário
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', currentUser.id);

        if (servicesError) throw servicesError;

        if (servicesData && servicesData.length > 0) {
          setState(prev => ({
            ...prev,
            services: servicesData.map(service => ({
              name: service.name,
              duration: service.duration,
              price: Number(service.price)
            }))
          }));
        }

        // Carrega os horários do usuário
        const { data: schedulesData, error: schedulesError } = await supabase
          .from('schedules')
          .select('*')
          .eq('user_id', currentUser.id);

        if (schedulesError) throw schedulesError;

        if (schedulesData && schedulesData.length > 0) {
          const days = { ...initialState.schedule.days };
          
          schedulesData.forEach(schedule => {
            const dayKey = schedule.day_of_week.toLowerCase();
            if (days[dayKey]) {
              days[dayKey] = {
                enabled: schedule.enabled,
                start: schedule.start_time,
                end: schedule.end_time
              };
            }
          });

          setState(prev => ({
            ...prev,
            schedule: { days }
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    loadUserData();
  }, [currentUser]);

  const setStep = (step: number) => {
    setState(prev => ({ ...prev, step }));
  };

  const setBusinessType = (businessType: BusinessType) => {
    setState(prev => ({ ...prev, businessType }));
  };

  const addProfessional = (name: string) => {
    setState(prev => ({
      ...prev,
      professionals: [...prev.professionals, { name }]
    }));
  };

  const removeProfessional = (index: number) => {
    setState(prev => ({
      ...prev,
      professionals: prev.professionals.filter((_, i) => i !== index)
    }));
  };

  const addService = (name: string, duration: number, price: number) => {
    setState(prev => ({
      ...prev,
      services: [...prev.services, { name, duration, price }]
    }));
    toast.success(`Serviço "${name}" adicionado`);
  };

  const removeService = (index: number) => {
    const serviceName = state.services[index]?.name;
    setState(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
    toast.success(`Serviço "${serviceName}" removido`);
  };

  const updateService = (index: number, name: string, duration: number, price: number) => {
    setState(prev => {
      const updatedServices = [...prev.services];
      updatedServices[index] = { name, duration, price };
      return { ...prev, services: updatedServices };
    });
    toast.success(`Serviço "${name}" atualizado`);
  };

  const loadDefaultServices = (businessType: BusinessType) => {
    const defaultServices = getServicesByBusinessType(businessType);
    setState(prev => ({ ...prev, services: defaultServices }));
    toast.success('Serviços padrão carregados');
  };

  const setSchedule = (day: string, enabled: boolean, start: string, end: string) => {
    setState(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        days: {
          ...prev.schedule.days,
          [day]: { enabled, start, end }
        }
      }
    }));
  };

  const saveOnboardingData = async (): Promise<{ success: boolean, error?: string }> => {
    if (!currentUser) {
      toast.error("Você precisa estar logado para salvar os dados");
      return { success: false, error: "Usuário não está autenticado" };
    }

    setIsSubmitting(true);
    try {
      // Salvar o tipo de negócio no perfil
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ business_type: state.businessType })
        .eq('id', currentUser.id);

      if (profileError) throw profileError;

      // Excluir profissionais existentes e inserir novos
      if (state.professionals.length > 0) {
        // Excluir profissionais existentes
        await supabase
          .from('professionals')
          .delete()
          .eq('user_id', currentUser.id);

        // Inserir novos profissionais
        const professionals = state.professionals
          .filter(p => p.name.trim()) // Remover profissionais sem nome
          .map(p => ({ user_id: currentUser.id, name: p.name }));

        if (professionals.length > 0) {
          const { error: professionalError } = await supabase
            .from('professionals')
            .insert(professionals);

          if (professionalError) throw professionalError;
        }
      }

      // Excluir serviços existentes e inserir novos
      if (state.services.length > 0) {
        // Excluir serviços existentes
        await supabase
          .from('services')
          .delete()
          .eq('user_id', currentUser.id);

        // Inserir novos serviços
        const services = state.services.map(s => ({
          user_id: currentUser.id,
          name: s.name,
          duration: s.duration,
          price: s.price
        }));

        const { error: servicesError } = await supabase
          .from('services')
          .insert(services);

        if (servicesError) throw servicesError;
      }

      // Excluir horários existentes e inserir novos
      // Excluir horários existentes
      await supabase
        .from('schedules')
        .delete()
        .eq('user_id', currentUser.id);

      // Inserir novos horários
      const schedules = Object.entries(state.schedule.days).map(([day, { enabled, start, end }]) => ({
        user_id: currentUser.id,
        day_of_week: day,
        enabled,
        start_time: start,
        end_time: end
      }));

      const { error: schedulesError } = await supabase
        .from('schedules')
        .insert(schedules);

      if (schedulesError) throw schedulesError;

      toast.success("Dados de onboarding salvos com sucesso!");
      return { success: true };
    } catch (error) {
      console.error('Erro ao salvar dados de onboarding:', error);
      const errorMessage = (error as Error).message;
      toast.error("Erro ao salvar dados: " + errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setStep,
        setBusinessType,
        addProfessional,
        removeProfessional,
        addService,
        removeService,
        updateService,
        loadDefaultServices,
        setSchedule,
        saveOnboardingData,
        resetState,
        isSubmitting
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
