
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

const ClientesPage = () => {
  // Exemplo de clientes (simulado)
  const clients = [
    { id: 1, name: 'Maria Silva', phone: '(11) 99123-4567', email: 'maria@email.com', lastVisit: '15/04/2025' },
    { id: 2, name: 'João Santos', phone: '(11) 98765-4321', email: 'joao@email.com', lastVisit: '10/04/2025' },
    { id: 3, name: 'Ana Oliveira', phone: '(11) 97654-3210', email: 'ana@email.com', lastVisit: '05/04/2025' },
    { id: 4, name: 'Pedro Costa', phone: '(11) 96543-2109', email: 'pedro@email.com', lastVisit: '01/04/2025' },
  ];
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Clientes</CardTitle>
          <div className="flex w-full items-center space-x-2 pt-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                className="w-full pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Última Visita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="cursor-pointer hover:bg-muted">
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ClientesPage;
