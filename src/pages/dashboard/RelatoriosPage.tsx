
import React from 'react';
import { FileText, Download } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RelatoriosPage = () => {
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Relatórios</h1>
      </div>
      
      <Tabs defaultValue="financeiros" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="financeiros">Financeiros</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financeiros">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard 
              title="Faturamento Mensal" 
              description="Relatório de faturamento do mês" 
              icon={<FileText />} 
            />
            <ReportCard 
              title="Faturamento por Serviço" 
              description="Relatório detalhado por tipo de serviço" 
              icon={<FileText />} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="clientes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard 
              title="Novos Clientes" 
              description="Relatório de novos clientes" 
              icon={<FileText />} 
            />
            <ReportCard 
              title="Clientes Recorrentes" 
              description="Análise de clientes frequentes" 
              icon={<FileText />} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="agendamentos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard 
              title="Agendamentos por Dia" 
              description="Distribuição de agendamentos diários" 
              icon={<FileText />} 
            />
            <ReportCard 
              title="Horários mais Populares" 
              description="Análise dos horários mais agendados" 
              icon={<FileText />} 
            />
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ReportCard = ({ title, description, icon }: ReportCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="text-brand-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="pt-4">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Download className="h-4 w-4" /> Baixar Relatório
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatoriosPage;
