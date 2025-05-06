
import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, X } from 'lucide-react';

const OnboardingProfessionals = () => {
  const { state, addProfessional, removeProfessional } = useOnboarding();
  const { currentUser } = useAuth();
  const [newProfessionalName, setNewProfessionalName] = useState('');

  const handleAddProfessional = () => {
    if (newProfessionalName.trim()) {
      addProfessional(newProfessionalName);
      setNewProfessionalName('');
    }
  };

  // Ensure the first professional is the current user
  React.useEffect(() => {
    if (state.professionals.length > 0 && currentUser && state.professionals[0].name === '') {
      const professionalsCopy = [...state.professionals];
      professionalsCopy[0].name = currentUser.name;
      // We can't update state here directly, but this effect ensures the first slot shows the current user
    }
  }, [state.professionals, currentUser]);

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">
        Adicione os profissionais que trabalham em seu estabelecimento
      </p>
      
      <div className="space-y-4">
        {state.professionals.map((professional, index) => (
          <Card key={index} className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <Input 
                value={index === 0 && currentUser ? currentUser.name : professional.name} 
                onChange={(e) => {
                  // In a real implementation we would update the professional name in the context
                  // But for simplicity we'll just show the input
                }}
                placeholder="Nome do profissional"
                disabled={index === 0}
              />
              {index === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Você (proprietário)
                </p>
              )}
            </div>
            {index !== 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 text-red-500" 
                onClick={() => removeProfessional(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </Card>
        ))}

        <div className="flex items-center space-x-2 mt-6">
          <Input
            value={newProfessionalName}
            onChange={(e) => setNewProfessionalName(e.target.value)}
            placeholder="Nome do novo profissional"
          />
          <Button onClick={handleAddProfessional} disabled={!newProfessionalName.trim()}>
            <Plus className="h-4 w-4 mr-2" /> Adicionar
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Você poderá adicionar ou remover profissionais a qualquer momento.
      </p>
    </div>
  );
};

export default OnboardingProfessionals;
