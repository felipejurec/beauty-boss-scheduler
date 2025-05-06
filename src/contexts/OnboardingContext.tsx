
import React, { createContext, useContext, useState } from 'react';
import { BusinessType, OnboardingState } from '@/types';
import { getServicesByBusinessType } from '@/lib/mock-data';
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
  resetState: () => void;
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
        resetState
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
