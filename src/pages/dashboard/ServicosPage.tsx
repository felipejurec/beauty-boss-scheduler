
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

const ServicosPage = () => {
  // Exemplo de serviços (simulado)
  const services = [
    { id: 1, name: 'Corte de Cabelo', duration: '45 min', price: 'R$ 70,00' },
    { id: 2, name: 'Barba', duration: '30 min', price: 'R$ 40,00' },
    { id: 3, name: 'Coloração', duration: '120 min', price: 'R$ 200,00' },
    { id: 4, name: 'Manicure', duration: '60 min', price: 'R$ 60,00' },
    { id: 5, name: 'Pedicure', duration: '60 min', price: 'R$ 60,00' },
  ];
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Serviços</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Serviços</CardTitle>
          <div className="flex w-full items-center space-x-2 pt-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar serviços..."
                className="w-full pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id} className="cursor-pointer hover:bg-muted">
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>{service.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ServicosPage;
