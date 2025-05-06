
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/DatePicker";
import { BarChart, AreaChart, PieChart, LineChart } from "recharts";
import { Bar, Area, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FilePdf, Download, Mail, Calendar, FileSpreadsheet } from "lucide-react"; // Fixed import
import PageContainer from '@/components/PageContainer';
import { toast } from "sonner";

const mockAgendamentosData = [
  { name: 'Jan', confirmados: 40, pendentes: 24, cancelados: 10 },
  { name: 'Fev', confirmados: 30, pendentes: 13, cancelados: 5 },
  { name: 'Mar', confirmados: 20, pendentes: 8, cancelados: 3 },
  { name: 'Abr', confirmados: 27, pendentes: 15, cancelados: 7 },
  { name: 'Mai', confirmados: 35, pendentes: 18, cancelados: 9 },
  { name: 'Jun', confirmados: 42, pendentes: 20, cancelados: 8 },
];

const mockServicosData = [
  { name: 'Corte', value: 400 },
  { name: 'Coloração', value: 300 },
  { name: 'Manicure', value: 300 },
  { name: 'Pedicure', value: 200 },
  { name: 'Design de Sobrancelhas', value: 278 },
  { name: 'Maquiagem', value: 189 },
];

const mockProfissionaisData = [
  { name: 'Ana', agendamentos: 120, receita: 5000 },
  { name: 'Pedro', agendamentos: 98, receita: 4200 },
  { name: 'Carla', agendamentos: 86, receita: 3800 },
  { name: 'João', agendamentos: 99, receita: 4100 },
];

const mockFinanceiroData = [
  { name: 'Jan', receita: 4000, despesas: 2400, lucro: 1600 },
  { name: 'Fev', receita: 3000, despesas: 1398, lucro: 1602 },
  { name: 'Mar', receita: 2000, despesas: 980, lucro: 1020 },
  { name: 'Abr', receita: 2780, despesas: 1508, lucro: 1272 },
  { name: 'Mai', receita: 1890, despesas: 980, lucro: 910 },
  { name: 'Jun', receita: 2390, despesas: 1228, lucro: 1162 },
];

const mockClientesData = [
  { name: 'Jan', novos: 40, recorrentes: 24 },
  { name: 'Fev', novos: 30, recorrentes: 13 },
  { name: 'Mar', novos: 20, recorrentes: 38 },
  { name: 'Abr', novos: 27, recorrentes: 39 },
  { name: 'Mai', novos: 18, recorrentes: 48 },
  { name: 'Jun', novos: 23, recorrentes: 50 },
];

const RelatoriosPage = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes");

  const handleExportPDF = () => {
    toast.success("Relatório exportado em PDF com sucesso!");
  };

  const handleExportCSV = () => {
    toast.success("Relatório exportado em CSV com sucesso!");
  };

  const handleSendEmail = () => {
    toast.success("Relatório enviado por email com sucesso!");
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground mt-2">
            Visualize dados importantes sobre seu negócio e tome decisões informadas.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Selecione o período para visualização dos relatórios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dia">Diário</SelectItem>
                  <SelectItem value="semana">Semanal</SelectItem>
                  <SelectItem value="mes">Mensal</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <DatePicker 
                  date={startDate}
                  setDate={setStartDate}
                  placeholder="Data inicial"
                />
              </div>

              <div>
                <DatePicker
                  date={endDate}
                  setDate={setEndDate}
                  placeholder="Data final"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="agendamentos">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agendamentos" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Status dos Agendamentos</CardTitle>
                  <CardDescription>
                    Visão geral dos agendamentos confirmados, pendentes e cancelados
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleExportPDF}>
                    <FilePdf className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleExportCSV}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleSendEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockAgendamentosData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confirmados" fill="#16a34a" name="Confirmados" />
                    <Bar dataKey="pendentes" fill="#eab308" name="Pendentes" />
                    <Bar dataKey="cancelados" fill="#dc2626" name="Cancelados" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Mais Solicitados</CardTitle>
                  <CardDescription>
                    Distribuição dos serviços mais populares
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockServicosData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockServicosData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profissional x Agendamentos</CardTitle>
                  <CardDescription>
                    Comparação de desempenho entre profissionais
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockProfissionaisData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="agendamentos" fill="#0ea5e9" name="Agendamentos" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Receita Gerada</CardTitle>
                  <CardDescription>
                    Análise de receitas, despesas e lucro
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleExportPDF}>
                    <FilePdf className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleExportCSV}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockFinanceiroData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="receita" stackId="1" stroke="#16a34a" fill="#16a34a" name="Receita" />
                    <Area type="monotone" dataKey="despesas" stackId="1" stroke="#dc2626" fill="#dc2626" name="Despesas" />
                    <Area type="monotone" dataKey="lucro" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" name="Lucro" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                  <CardDescription>
                    Distribuição por método de pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Cartão de Crédito', value: 540 },
                          { name: 'Cartão de Débito', value: 300 },
                          { name: 'Dinheiro', value: 200 },
                          { name: 'PIX', value: 450 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2, 3].map((index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Receita por Profissional</CardTitle>
                  <CardDescription>
                    Total de receita gerada por profissional
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockProfissionaisData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="receita" fill="#16a34a" name="Receita (R$)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clientes" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Clientes Novos vs. Recorrentes</CardTitle>
                  <CardDescription>
                    Comparação entre novos clientes e clientes recorrentes
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleExportPDF}>
                    <FilePdf className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleExportCSV}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockClientesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="novos" stroke="#0ea5e9" name="Novos Clientes" />
                    <Line type="monotone" dataKey="recorrentes" stroke="#16a34a" name="Clientes Recorrentes" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Retenção de Clientes</CardTitle>
                  <CardDescription>
                    Porcentagem de clientes que retornam
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72 flex flex-col justify-center items-center">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">78%</span>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="3"
                        strokeDasharray="78, 100"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 text-center text-muted-foreground">
                    78% dos clientes retornam para um segundo agendamento
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cancelamentos e No-Shows</CardTitle>
                  <CardDescription>
                    Análise de cancelamentos e faltas
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Jan', cancelamentos: 8, noShows: 5 },
                        { name: 'Fev', cancelamentos: 6, noShows: 3 },
                        { name: 'Mar', cancelamentos: 7, noShows: 4 },
                        { name: 'Abr', cancelamentos: 5, noShows: 2 },
                        { name: 'Mai', cancelamentos: 4, noShows: 3 },
                        { name: 'Jun', cancelamentos: 3, noShows: 2 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cancelamentos" fill="#f59e0b" name="Cancelamentos" />
                      <Bar dataKey="noShows" fill="#dc2626" name="No-Shows" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profissionais" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Desempenho por Profissional</CardTitle>
                  <CardDescription>
                    Análise completa de desempenho de cada profissional
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleExportPDF}>
                    <FilePdf className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleExportCSV}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockProfissionaisData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                    <YAxis yAxisId="right" orientation="right" stroke="#16a34a" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="agendamentos" fill="#0ea5e9" name="Agendamentos" />
                    <Bar yAxisId="right" dataKey="receita" fill="#16a34a" name="Receita (R$)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliação dos Profissionais</CardTitle>
                  <CardDescription>
                    Média de avaliações por profissional
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Ana', avaliacao: 4.8 },
                        { name: 'Pedro', avaliacao: 4.5 },
                        { name: 'Carla', avaliacao: 4.9 },
                        { name: 'João', avaliacao: 4.7 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avaliacao" fill="#f59e0b" name="Avaliação Média (0-5)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Serviços por Profissional</CardTitle>
                  <CardDescription>
                    Distribuição de serviços por profissional
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Ana', value: 30 },
                          { name: 'Pedro', value: 25 },
                          { name: 'Carla', value: 25 },
                          { name: 'João', value: 20 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2, 3].map((index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default RelatoriosPage;
