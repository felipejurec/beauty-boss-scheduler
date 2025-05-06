
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BusinessType } from '@/types';
import { mockBusinessTypes } from '@/lib/mock-data';

const OnboardingBusinessType = () => {
  const { state, setBusinessType } = useOnboarding();

  const handleSelect = (type: BusinessType) => {
    setBusinessType(type);
  };

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">
        Selecione o tipo do seu negócio para personalizarmos sua experiência
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mockBusinessTypes.map((type) => (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer transition-all border-2 p-4 flex flex-col items-center hover:border-brand-300 hover:shadow-md",
              state.businessType === type.id 
                ? "border-brand-400 bg-brand-50" 
                : "border-transparent"
            )}
            onClick={() => handleSelect(type.id)}
          >
            <div className="text-4xl mb-2">{type.icon}</div>
            <h3 className="font-medium text-center">{type.name}</h3>
          </Card>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Não se preocupe, você poderá personalizar todos os detalhes depois.
      </p>
    </div>
  );
};

export default OnboardingBusinessType;
