
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight, Loader2 } from 'lucide-react';
import { subscriptionPlans } from '@/lib/mock-data';
import { toast } from 'sonner';
import { useOnboarding } from '@/contexts/OnboardingContext';

const OnboardingComplete = () => {
  const navigate = useNavigate();
  const { saveOnboardingData, isSubmitting } = useOnboarding();
  
  const handleSubscribe = async (planId: string) => {
    try {
      // Salvar todos os dados de onboarding antes de prosseguir
      const { success, error } = await saveOnboardingData();
      
      if (success) {
        toast.success(`Plano ${planId} selecionado! Redirecionando para pagamento...`);
        // Mock subscription process - in a real app, we'd redirect to Stripe
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error(`Erro ao salvar dados: ${error}`);
      }
    } catch (error) {
      console.error('Erro ao finalizar onboarding:', error);
    }
  };

  const handleStartTrial = async () => {
    try {
      const { success, error } = await saveOnboardingData();
      if (success) {
        navigate('/dashboard');
      } else {
        toast.error(`Erro ao salvar dados: ${error}`);
      }
    } catch (error) {
      console.error('Erro ao iniciar período de teste:', error);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="mx-auto bg-green-100 text-green-600 rounded-full h-16 w-16 flex items-center justify-center mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold">Perfeito, tudo configurado!</h3>
        <p className="text-gray-600 mt-2">
          Escolha seu plano e comece a usar a plataforma agora mesmo
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id} className={`overflow-hidden flex flex-col ${plan.id === 'pro' ? 'border-brand-400 shadow-md' : ''}`}>
            {plan.id === 'pro' && (
              <div className="bg-brand-400 text-white text-center py-2 font-medium">
                Mais Popular
              </div>
            )}
            <CardContent className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleSubscribe(plan.id)}
                className={plan.id === 'pro' ? 'bg-brand-500 hover:bg-brand-600' : ''}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : 'Selecionar plano'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-gray-500 mb-4">
          Todos os planos incluem 7 dias de teste gratuito.
          <br />
          Sem compromisso, cancele a qualquer momento.
        </p>
        <Button 
          variant="outline" 
          onClick={handleStartTrial} 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              Começar meu período de teste <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingComplete;
