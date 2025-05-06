
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatePicker } from '@/components/DatePicker';
import { Download, FilePie, FileBarChart, Users, Calendar, DollarSign, Download as ExportIcon } from 'lucide-react';

// Mock data for demonstration purposes - in a real app, this would come from Supabase
const agendamentos = [
  { data: '2023-05-01', servico: 'Corte de Cabelo', profissional: 'Maria', status: 'confirmado', valor: 70 },
  { data: '2023-05-01', servico: 'Barba', profissional: 'João', status: 'confirmado', valor: 40 },
  { data: '2023-05-02', servico: 'Coloração', profissional: 'Maria', status: 'cancelado', valor: 200 },
  { data: '2023-05-03', servico: 'Manicure', profissional: 'Ana', status: 'pendente', valor: 60 },
  { data: '2023-05-03', servico: 'Pedicure', profissional: 'Ana', status: 'confirmado', valor: 60 },
  { data: '2023-05-04', servico: 'Corte de Cabelo', profissional: 'João', status: 'confirmado', valor: 70 },
  { data: '2023-05-05', servico: 'Barba', profissional: 'João', status: 'no-show', valor: 40 },
  { data: '2023-05-06', servico: 'Coloração', profissional: 'Maria', status: 'confirmado', valor: 200 },
];

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Function to aggregate data for charts
const getAgendamentosByStatus = () => {
  const statusCount = { confirmado: 0, cancelado: 0, pendente: 0, 'no-show': 0 };
  agendamentos.forEach(a => {
    statusCount[a.status as keyof typeof statusCount]++;
  });
  
  return Object.keys(statusCount).map(status => ({
    name: status,
    value: statusCount[status as keyof typeof statusCount]
  }));
};

const getServicosMaisSolicitados = () => {
  const servicosCount: Record<string, number> = {};
  agendamentos.forEach(a => {
    servicosCount[a.servico] = (servicosCount[a.servico] || 0) + 1;
  });
  
  return Object.keys(servicosCount).map(servico => ({
    name: servico,
    value: servicosCount[servico]
  })).sort((a, b) => b.value - a.value);
};

const getAgendamentosPorProfissional = () => {
  const profissionalCount: Record<string, number> = {};
  agendamentos.forEach(a => {
    profissionalCount[a.profissional] = (profissionalCount[a.profissional] || 0) + 1;
  });
  
  return Object.keys(profissionalCount).map(profissional => ({
    name: profissional,
    agendamentos: profissionalCount[profissional]
  }));
};

const getReceitaPorProfissional = () => {
  const profissionalReceita: Record<string, number> = {};
  agendamentos.forEach(a => {
    if (a.status === 'confirmado') {
      profissionalReceita[a.profissional] = (profissionalReceita[a.profissional] || 0) + a.valor;
    }
  });
  
  return Object.keys(profissionalReceita).map(profissional => ({
    name: profissional,
    receita: profissionalReceita[profissional]
  }));
};

// Calculate mock data for financial report
const receitaTotal = agendamentos
  .filter(a => a.status === 'confirmado')
  .reduce((sum, a) => sum + a.valor, 0);

const RelatoriosPage = () => {
  const [periodoFiltro, setPeriodoFiltro] = useState('mes');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Status dos agendamentos data
  const statusData = getAgendamentosByStatus();
  
  // Serviços mais solicitados data
  const servicosData = getServicosMaisSolicitados();
  
  // Agendamentos por profissional data
  const profissionalData = getAgendamentosPorProfissional();
  
  // Receita por profissional data
  const receitaData = getReceitaPorProfissional();

  const handleExportCSV = () => {
    alert('Exportando para CSV...');
    // Implementation would generate and download a CSV file
  };

  const handleExportPDF = () => {
    alert('Exportando para PDF...');
    // Implementation would generate and download a PDF file
  };

  const handleEmailReport = () => {
    alert('Enviando relatório por email...');
    // Implementation would send the report via email
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <div className="flex gap-2">
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button onClick={handleExportPDF} variant="outline">
            <ExportIcon className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button onClick={handleEmailReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dia">Dia</SelectItem>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mês</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {periodoFiltro === 'personalizado' && (
          <>
            <div className="flex-1 min-w-[200px]">
              <DatePicker date={startDate} setDate={setStartDate} placeholder="Data inicial" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <DatePicker date={endDate} setDate={setEndDate} placeholder="Data final" />
            </div>
          </>
        )}
      </div>

      <Tabs defaultValue="agendamentos" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="agendamentos">
            <Calendar className="h-4 w-4 mr-2" />
            Agendamentos
          </TabsTrigger>
          <TabsTrigger value="financeiro">
            <DollarSign className="h-4 w-4 mr-2" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="clientes">
            <Users className="h-4 w-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="profissionais">
            <FileBarChart className="h-4 w-4 mr-2" />
            Profissionais
          </TabsTrigger>
        </TabsList>

        {/* Relatório de Agendamentos */}
        <TabsContent value="agendamentos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Status dos Agendamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{ confirmado: { color: '#4CAF50' }, cancelado: { color: '#F44336' }, pendente: { color: '#2196F3' }, 'no-show': { color: '#FF9800' } }}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Serviços Mais Solicitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{ servico1: { color: '#4CAF50' }, servico2: { color: '#2196F3' }, servico3: { color: '#FF9800' } }}>
                    <BarChart
                      data={servicosData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" name="Quantidade" fill="#8884d8" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profissional x Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ Maria: { color: '#4CAF50' }, João: { color: '#2196F3' }, Ana: { color: '#FF9800' } }}>
                  <BarChart
                    data={profissionalData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="agendamentos" name="Agendamentos" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatório Financeiro */}
        <TabsContent value="financeiro">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {receitaTotal.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pagamentos Confirmados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{agendamentos.filter(a => a.status === 'confirmado').length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{agendamentos.filter(a => a.status === 'pendente').length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  R$ {(receitaTotal / agendamentos.filter(a => a.status === 'confirmado').length).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Receita por Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ receita: { color: '#4CAF50' } }}>
                  <LineChart
                    data={[
                      { name: 'Jan', receita: 2400 },
                      { name: 'Fev', receita: 1398 },
                      { name: 'Mar', receita: 9800 },
                      { name: 'Abr', receita: 3908 },
                      { name: 'Mai', receita: receitaTotal },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="receita" name="Receita (R$)" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Detalhamento de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agendamentos.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.servico}</TableCell>
                      <TableCell>{item.profissional}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>R$ {item.valor.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatório de Clientes */}
        <TabsContent value="clientes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">15</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Clientes Novos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">80%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">No-Shows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Novos vs. Recorrentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ novos: { color: '#2196F3' }, recorrentes: { color: '#4CAF50' } }}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Novos', value: 3 },
                        { name: 'Recorrentes', value: 12 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      <Cell fill="#2196F3" />
                      <Cell fill="#4CAF50" />
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cancelamentos e No-Shows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ cancelamentos: { color: '#F44336' }, noShows: { color: '#FF9800' } }}>
                  <LineChart
                    data={[
                      { name: 'Jan', cancelamentos: 1, noShows: 0 },
                      { name: 'Fev', cancelamentos: 2, noShows: 1 },
                      { name: 'Mar', cancelamentos: 0, noShows: 1 },
                      { name: 'Abr', cancelamentos: 1, noShows: 0 },
                      { name: 'Mai', cancelamentos: agendamentos.filter(a => a.status === 'cancelado').length, noShows: agendamentos.filter(a => a.status === 'no-show').length },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="cancelamentos" name="Cancelamentos" stroke="#F44336" />
                    <Line type="monotone" dataKey="noShows" name="No-Shows" stroke="#FF9800" />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatório de Profissionais */}
        <TabsContent value="profissionais">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Agendamentos por Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{ Maria: { color: '#4CAF50' }, João: { color: '#2196F3' }, Ana: { color: '#FF9800' } }}>
                    <BarChart
                      data={profissionalData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="agendamentos" name="Agendamentos" fill="#82ca9d" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Receita por Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{ Maria: { color: '#4CAF50' }, João: { color: '#2196F3' }, Ana: { color: '#FF9800' } }}>
                    <BarChart
                      data={receitaData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="receita" name="Receita (R$)" fill="#8884d8" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avaliações por Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ Maria: { color: '#4CAF50' }, João: { color: '#2196F3' }, Ana: { color: '#FF9800' } }}>
                  <BarChart
                    data={[
                      { name: 'Maria', avaliacao: 4.8 },
                      { name: 'João', avaliacao: 4.5 },
                      { name: 'Ana', avaliacao: 4.9 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="avaliacao" name="Avaliação Média" fill="#FF9800" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default RelatoriosPage;
