
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const AgendaPage = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  
  // Exemplo de agendamentos (simulado)
  const appointments = [
    { id: 1, time: '09:00', client: 'Maria Silva', service: 'Corte de Cabelo', duration: '45 min' },
    { id: 2, time: '10:30', client: 'João Santos', service: 'Barba', duration: '30 min' },
    { id: 3, time: '14:00', client: 'Ana Oliveira', service: 'Coloração', duration: '120 min' },
  ];
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Agenda</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              locale={ptBR}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Agendamentos para {format(date, "dd 'de' MMMM", { locale: ptBR })}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Duração</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.client}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-4 text-muted-foreground">Nenhum agendamento para este dia</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AgendaPage;
