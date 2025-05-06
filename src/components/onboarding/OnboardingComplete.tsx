
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';
import { subscriptionPlans } from '@/lib/mock-data';
import { toast } from 'sonner';

const OnboardingComplete = () => {
  const navigate = useNavigate();
  
  const handleSubscribe = (planId: string) => {
    toast.success(`Plano ${planId} selecionado! Redirecionando para pagamento...`);
    // Mock subscription process - in a real app, we'd redirect to Stripe
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
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
              >
                Selecionar plano
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
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Começar meu período de teste <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingComplete;
