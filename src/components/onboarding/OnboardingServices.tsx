
import React, { useState, useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { getServicesByBusinessType } from '@/lib/mock-data';

const OnboardingServices = () => {
  const { state, addService, removeService, loadDefaultServices } = useOnboarding();
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState(60);
  const [newServicePrice, setNewServicePrice] = useState(0);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    // Load default services based on business type if no services are defined yet
    if (state.businessType && state.services.length === 0) {
      loadDefaultServices(state.businessType);
    }
  }, [state.businessType]);

  const handleAddService = () => {
    if (newServiceName.trim() && newServiceDuration > 0 && newServicePrice > 0) {
      addService(newServiceName, newServiceDuration, newServicePrice);
      resetForm();
    }
  };

  const handleStartEdit = (index: number) => {
    const service = state.services[index];
    setNewServiceName(service.name);
    setNewServiceDuration(service.duration);
    setNewServicePrice(service.price);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setNewServiceName('');
    setNewServiceDuration(60);
    setNewServicePrice(0);
    setIsEditing(false);
    setEditIndex(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    } else if (minutes === 60) {
      return '1 hora';
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      } else {
        return `${hours}h ${remainingMinutes}min`;
      }
    }
  };

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">
        Configure os serviços que você oferece
      </p>
      
      <div className="space-y-4 mb-8">
        {state.services.length > 0 ? (
          state.services.map((service, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <div className="text-sm text-gray-500 flex gap-2">
                    <span>{formatDuration(service.duration)}</span> • 
                    <span>{formatPrice(service.price)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleStartEdit(index)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => removeService(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhum serviço adicionado. Adicione seus serviços abaixo.
          </div>
        )}
      </div>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">{isEditing ? 'Editar Serviço' : 'Adicionar Serviço'}</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">Nome do serviço</label>
            <Input
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              placeholder="Ex: Corte de Cabelo"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm mb-1 block">Duração (minutos)</label>
              <Input
                type="number"
                min="15"
                step="15"
                value={newServiceDuration}
                onChange={(e) => setNewServiceDuration(Number(e.target.value))}
                placeholder="60"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm mb-1 block">Preço (R$)</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(Number(e.target.value))}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            {isEditing && (
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            )}
            <Button onClick={handleAddService} disabled={!newServiceName.trim() || newServiceDuration <= 0 || newServicePrice <= 0}>
              {isEditing ? 'Atualizar' : 'Adicionar'} Serviço
            </Button>
          </div>
        </div>
      </Card>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Você poderá adicionar, editar ou remover serviços a qualquer momento.
      </p>
    </div>
  );
};

export default OnboardingServices;
