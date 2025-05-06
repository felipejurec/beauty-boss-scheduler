
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  bio: z.string().optional(),
});

const businessFormSchema = z.object({
  businessName: z.string().min(2, { message: 'Nome do negócio deve ter pelo menos 2 caracteres' }),
  address: z.string().min(5, { message: 'Endereço deve ter pelo menos 5 caracteres' }),
  phone: z.string().min(8, { message: 'Telefone deve ter pelo menos 8 caracteres' }),
});

const ConfiguracoesPage = () => {
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: 'João Silva',
      email: 'joao@email.com',
      bio: 'Profissional com 10 anos de experiência no setor de beleza.',
    },
  });

  const businessForm = useForm<z.infer<typeof businessFormSchema>>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      businessName: 'Salão Beleza',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      phone: '(11) 99999-8888',
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    console.log(data);
    // Implementar lógica para salvar
  };

  const onBusinessSubmit = (data: z.infer<typeof businessFormSchema>) => {
    console.log(data);
    // Implementar lógica para salvar
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="business">Negócio</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Perfil</CardTitle>
              <CardDescription>Atualize seus dados pessoais</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biografia</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>
                          Breve descrição sobre você que será exibida no seu perfil.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Salvar alterações</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Negócio</CardTitle>
              <CardDescription>Atualize os dados do seu negócio</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...businessForm}>
                <form onSubmit={businessForm.handleSubmit(onBusinessSubmit)} className="space-y-4">
                  <FormField
                    control={businessForm.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Negócio</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={businessForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={businessForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Salvar alterações</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Gerencie como recebe notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Confirmações de Agendamento</p>
                  <p className="text-sm text-muted-foreground">Receba notificações quando um cliente confirmar um agendamento</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Lembretes de Agendamento</p>
                  <p className="text-sm text-muted-foreground">Receba lembretes antes de cada agendamento</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mensagens de Clientes</p>
                  <p className="text-sm text-muted-foreground">Receba notificações quando um cliente enviar uma mensagem</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atualizações do Sistema</p>
                  <p className="text-sm text-muted-foreground">Receba notificações sobre atualizações e novidades do sistema</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default ConfiguracoesPage;
