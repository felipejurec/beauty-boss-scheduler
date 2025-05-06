
import React from 'react';
import { Settings } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPage = () => {
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos Hoje</CardTitle>
            <CardDescription>Visão geral dos agendamentos de hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-2">Nenhum agendamento para hoje</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Total de clientes cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-2">Adicione seus primeiros clientes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Serviços</CardTitle>
            <CardDescription>Serviços disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-2">Configure seus serviços</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
            <CardDescription>Configure sua conta para começar a utilizar o sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-brand-100 p-2 rounded-full">
                  <Settings className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-medium">Configurar seu perfil</h3>
                  <p className="text-sm text-muted-foreground">Adicione suas informações profissionais e personalize sua conta</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand-100 p-2 rounded-full">
                  <Settings className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-medium">Cadastrar serviços</h3>
                  <p className="text-sm text-muted-foreground">Adicione os serviços que você oferece com preços e duração</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand-100 p-2 rounded-full">
                  <Settings className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-medium">Configurar sua agenda</h3>
                  <p className="text-sm text-muted-foreground">Defina seus horários de disponibilidade para atendimentos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
