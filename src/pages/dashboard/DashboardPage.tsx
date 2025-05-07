
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  PlusCircle, 
  TrendingUp, 
  TrendingDown,
  Users,
  ArrowRight,
  Bell,
  Scissors
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock data - would be replaced with real data from backend
const appointments = [
  { id: 1, time: '09:00', clientName: 'Maria Silva', service: 'Corte de Cabelo', duration: 45 },
  { id: 2, time: '11:00', clientName: 'João Santos', service: 'Barba', duration: 30 },
  { id: 3, time: '14:30', clientName: 'Ana Oliveira', service: 'Coloração', duration: 120 },
  { id: 4, time: '17:00', clientName: 'Carlos Ferreira', service: 'Hidratação', duration: 60 },
];

const topServices = [
  { id: 1, name: 'Corte de Cabelo', count: 24, growth: 5 },
  { id: 2, name: 'Coloração', count: 18, growth: -2 },
  { id: 3, name: 'Hidratação', count: 15, growth: 3 },
];

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { currentUser } = useAuth();
  
  // Calculate agenda occupation rate (mock data)
  const occupationRate = 65;
  const monthlyRevenue = 3750;
  const revenueGrowth = 12;
  
  return (
    <PageContainer>
      {/* Cabeçalho do Dashboard */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{currentUser?.businessName || 'Seu Negócio'}</h1>
          <p className="text-muted-foreground">
            {format(new Date(), "'Hoje é' EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
            Conta Ativa
          </Badge>
          <Button variant="outline" size="sm" className="gap-1">
            <Bell className="h-4 w-4" /> 3
          </Button>
        </div>
      </div>
      
      {/* Visão Rápida */}
      <h2 className="text-xl font-semibold mb-4">Visão Rápida</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Agenda do Dia */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand-600" />
              Agenda de Hoje
            </CardTitle>
            <CardDescription>Agendamentos para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.length > 0 ? (
                appointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-50 text-brand-700 font-medium p-2 rounded w-14 text-center">
                        {appointment.time}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.clientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{appointment.duration} min</div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground py-2">Nenhum agendamento para hoje</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button size="sm" variant="outline" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </CardFooter>
        </Card>
        
        {/* Total de Agendamentos */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-600" />
              Ocupação da Agenda
            </CardTitle>
            <CardDescription>Status dos agendamentos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Ocupação semanal</span>
                <span className="text-sm font-medium">{occupationRate}%</span>
              </div>
              <Progress value={occupationRate} className="h-2" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{appointments.length}</p>
                <p className="text-sm text-muted-foreground">Agendamentos hoje</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Agendamentos semana</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button size="sm" variant="outline" className="w-full">
              Ver Agenda Completa
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Receita do Mês */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-600" />
              Receita do Mês
            </CardTitle>
            <CardDescription>Desempenho financeiro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">R$ {monthlyRevenue.toLocaleString('pt-BR')}</p>
            <div className="flex items-center">
              {revenueGrowth > 0 ? (
                <>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{revenueGrowth}%
                  </Badge>
                  <span className="text-sm ml-2 text-muted-foreground">em relação ao mês anterior</span>
                </>
              ) : (
                <>
                  <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    {revenueGrowth}%
                  </Badge>
                  <span className="text-sm ml-2 text-muted-foreground">em relação ao mês anterior</span>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button size="sm" variant="outline" className="w-full">
              Ver Relatório Financeiro
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Segunda linha de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Serviços Populares */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scissors className="h-5 w-5 text-brand-600" />
              Serviços Populares
            </CardTitle>
            <CardDescription>Os serviços mais agendados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-50 text-brand-700 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                      {service.id}
                    </div>
                    <span>{service.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{service.count} agendados</span>
                    {service.growth > 0 ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700">+{service.growth}%</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700">{service.growth}%</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button size="sm" variant="outline" className="w-full">
              Gerenciar Serviços
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Clientes Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-600" />
              Clientes Recentes
            </CardTitle>
            <CardDescription>Últimos clientes atendidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 font-medium">
                      {appointment.clientName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{appointment.clientName}</p>
                      <p className="text-sm text-muted-foreground">Último serviço: {appointment.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button size="sm" variant="outline" className="w-full">
              Ver Todos os Clientes
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Próximos Passos / Onboarding */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Próximos Passos</CardTitle>
          <CardDescription>Complete estas tarefas para configurar seu negócio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 p-2 rounded-full text-brand-600">
                <Scissors className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Cadastre seus serviços</h3>
                <p className="text-sm text-muted-foreground">Adicione os serviços que você oferece com preços e duração</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">Configurar</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 p-2 rounded-full text-brand-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Configure sua agenda</h3>
                <p className="text-sm text-muted-foreground">Defina seus horários de disponibilidade para agendamentos</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">Configurar</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 p-2 rounded-full text-brand-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Importe seus clientes</h3>
                <p className="text-sm text-muted-foreground">Adicione sua base de clientes para facilitar agendamentos</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">Configurar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default DashboardPage;
