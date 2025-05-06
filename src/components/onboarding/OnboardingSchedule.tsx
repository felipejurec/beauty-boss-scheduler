
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OnboardingSchedule = () => {
  const { state, setSchedule } = useOnboarding();

  const daysOfWeek = [
    { id: 'monday', name: 'Segunda-feira' },
    { id: 'tuesday', name: 'Terça-feira' },
    { id: 'wednesday', name: 'Quarta-feira' },
    { id: 'thursday', name: 'Quinta-feira' },
    { id: 'friday', name: 'Sexta-feira' },
    { id: 'saturday', name: 'Sábado' },
    { id: 'sunday', name: 'Domingo' },
  ];

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7; // Starting from 7 AM
    return {
      value: `${hour.toString().padStart(2, '0')}:00`,
      label: `${hour}:00${hour < 12 ? ' AM' : ' PM'}`.replace('12:00 PM', '12:00 PM (meio-dia)').replace('12:00 AM', '0:00 AM')
    };
  });

  const handleToggleDay = (day: string, enabled: boolean) => {
    setSchedule(day, enabled, state.schedule.days[day].start, state.schedule.days[day].end);
  };

  const handleStartTimeChange = (day: string, time: string) => {
    setSchedule(day, state.schedule.days[day].enabled, time, state.schedule.days[day].end);
  };

  const handleEndTimeChange = (day: string, time: string) => {
    setSchedule(day, state.schedule.days[day].enabled, state.schedule.days[day].start, time);
  };

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">
        Configure sua agenda de disponibilidade
      </p>
      
      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <Card key={day.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Switch 
                  checked={state.schedule.days[day.id].enabled}
                  onCheckedChange={(checked) => handleToggleDay(day.id, checked)}
                />
                <Label className={`${!state.schedule.days[day.id].enabled ? 'text-gray-400' : ''}`}>
                  {day.name}
                </Label>
              </div>
              
              <div className="flex space-x-2">
                <Select 
                  value={state.schedule.days[day.id].start} 
                  onValueChange={(value) => handleStartTimeChange(day.id, value)}
                  disabled={!state.schedule.days[day.id].enabled}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Início" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.slice(0, -1).map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <span className="text-gray-500 flex items-center">até</span>
                
                <Select 
                  value={state.schedule.days[day.id].end} 
                  onValueChange={(value) => handleEndTimeChange(day.id, value)}
                  disabled={!state.schedule.days[day.id].enabled}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Fim" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.slice(1).map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Esta é sua configuração padrão. Você poderá personalizar dias específicos no calendário depois.
      </p>
    </div>
  );
};

export default OnboardingSchedule;
