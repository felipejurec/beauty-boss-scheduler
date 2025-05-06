
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Clock, DollarSign, User } from 'lucide-react';
import { mockAppointments, mockClients, mockServices } from '@/lib/mock-data';

const DashboardPage = () => {
  // Calculate today's appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayAppointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.datetime);
    return appointmentDate >= today && appointmentDate < tomorrow;
  });
  
  // Calculate revenue data
  const revenueToday = todayAppointments.reduce((sum, appointment) => {
    const service = mockServices.find(s => s.id === appointment.serviceId);
    return sum + (service?.price || 0);
  }, 0);

  const upcomingAppointment = mockAppointments.find(appointment => {
    const appointmentDate = new Date(appointment.datetime);
    return appointmentDate >= new Date();
  });

  const upcomingAppointmentDetails = upcomingAppointment ? {
    clientName: mockClients.find(c => c.id === upcomingAppointment.clientId)?.name || 'Cliente',
    serviceName: mockServices.find(s => s.id === upcomingAppointment.serviceId)?.name || 'Serviço',
    datetime: new Date(upcomingAppointment.datetime)
  } : null;

  const stats = [
    { 
      title: 'Agendamentos Hoje', 
      value: todayAppointments.length, 
      icon: <Calendar className="h-5 w-5 text-brand-500" />,
      color: 'bg-brand-50 text-brand-500',
      link: '/dashboard/agenda'
    },
    { 
      title: 'Total de Clientes', 
      value: mockClients.length, 
      icon: <User className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50 text-blue-500',
      link: '/dashboard/clientes'
    },
    { 
      title: 'Serviços Disponíveis', 
      value: mockServices.length, 
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50 text-purple-500',
      link: '/dashboard/servicos'
    },
    { 
      title: 'Faturamento Hoje', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(revenueToday), 
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      color: 'bg-green-50 text-green-500',
      link: '/dashboard/financeiro'
    }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Visão Geral</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={stat.link}>
                    <span className="sr-only">Ver detalhes</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Appointment Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Próximo Agendamento</CardTitle>
            <CardDescription>Detalhes do seu próximo atendimento</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointmentDetails ? (
              <div>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{upcomingAppointmentDetails.clientName}</h3>
                    <p className="text-sm text-gray-500">{upcomingAppointmentDetails.serviceName}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{formatTime(upcomingAppointmentDetails.datetime)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{formatDate(upcomingAppointmentDetails.datetime)}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button asChild>
                    <Link to="/dashboard/agenda">
                      Ver todos os agendamentos
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Nenhum agendamento programado</p>
                <Button asChild>
                  <Link to="/dashboard/agenda">Ver agenda</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Quick Actions Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse as principais funções do sistema</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
              <Link to="/dashboard/agenda/novo">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Novo Agendamento</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
              <Link to="/dashboard/clientes/novo">
                <User className="h-6 w-6 mb-2" />
                <span>Novo Cliente</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
              <Link to="/dashboard/servicos/novo">
                <Clock className="h-6 w-6 mb-2" />
                <span>Novo Serviço</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
              <Link to="/dashboard/configuracoes">
                <Settings className="h-6 w-6 mb-2" />
                <span>Configurações</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Public Scheduling Link Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Link de Agendamento Público</CardTitle>
            <CardDescription>Compartilhe este link com seus clientes para que eles façam agendamentos online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-gray-50 p-3 rounded-lg flex-1 w-full truncate">
                <p className="truncate">https://beautyscheduler.com/agendamento/seu-salao</p>
              </div>
              <Button>Copiar Link</Button>
            </div>
            
            <div className="mt-4 p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Dica:</strong> Adicione este link à sua bio no Instagram, Facebook e WhatsApp para facilitar o agendamento 
                pelos seus clientes!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
