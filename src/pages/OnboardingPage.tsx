
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingBusinessType from '@/components/onboarding/OnboardingBusinessType';
import OnboardingProfessionals from '@/components/onboarding/OnboardingProfessionals';
import OnboardingServices from '@/components/onboarding/OnboardingServices';
import OnboardingSchedule from '@/components/onboarding/OnboardingSchedule';
import OnboardingComplete from '@/components/onboarding/OnboardingComplete';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OnboardingPage = () => {
  const { state, setStep } = useOnboarding();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleNext = () => {
    setStep(state.step + 1);
  };

  const handleBack = () => {
    if (state.step > 1) {
      setStep(state.step - 1);
    }
  };

  const steps = [
    { title: 'Tipo de Negócio', component: OnboardingBusinessType },
    { title: 'Profissionais', component: OnboardingProfessionals },
    { title: 'Serviços', component: OnboardingServices },
    { title: 'Agenda', component: OnboardingSchedule },
    { title: 'Conclusão', component: OnboardingComplete },
  ];

  const CurrentStepComponent = steps[state.step - 1]?.component;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <Logo className="mx-auto" />
          <p className="text-gray-500 mt-2">Vamos configurar seu negócio</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBack} disabled={state.step === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
              <CardTitle className="text-xl">
                {steps[state.step - 1]?.title}
              </CardTitle>
              <div className="w-24" />
            </div>
          </CardHeader>

          <CardContent>
            {CurrentStepComponent && <CurrentStepComponent />}
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <div>
              Passo {state.step} de {steps.length}
            </div>
            {state.step < steps.length && (
              <Button onClick={handleNext}>
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} BeautyBoss. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
