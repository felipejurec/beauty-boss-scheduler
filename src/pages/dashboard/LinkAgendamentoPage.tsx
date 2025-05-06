import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, Share2, Link } from "lucide-react";
import { toast } from "sonner";
import PageContainer from '@/components/PageContainer';

const LinkAgendamentoPage = () => {
  const [linkAtivo, setLinkAtivo] = useState(true);
  const [linkPersonalizado, setLinkPersonalizado] = useState('meu-salao');
  const schedulingLink = `beautyscheduler.com/${linkPersonalizado}`;

  const copiarLink = () => {
    navigator.clipboard.writeText(schedulingLink);
    toast.success("Link copiado para a área de transferência");
  };

  const compartilharLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Link de Agendamento',
        text: 'Agende seu horário no meu salão:',
        url: schedulingLink,
      })
      .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      copiarLink();
      toast.info("Link copiado! Compartilhe manualmente.");
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Link de Agendamento</h1>
          <p className="text-muted-foreground mt-2">
            Configure e compartilhe seu link de agendamento para que os clientes possam agendar serviços online.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Link de Agendamento
              <div className="flex items-center gap-2">
                <Switch 
                  checked={linkAtivo} 
                  onCheckedChange={setLinkAtivo} 
                />
                <span className="text-sm font-medium">
                  {linkAtivo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </CardTitle>
            <CardDescription>
              Compartilhe este link com seus clientes para que eles possam agendar serviços online.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="link-personalizado">Link personalizado</Label>
                <div className="flex space-x-2">
                  <div className="flex items-center gap-1 bg-muted px-3 rounded-l-md border border-r-0">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">beautyscheduler.com/</span>
                  </div>
                  <Input
                    id="link-personalizado"
                    value={linkPersonalizado}
                    onChange={(e) => setLinkPersonalizado(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label>Seu link completo</Label>
                <div className="flex">
                  <div className="flex-1 flex items-center bg-muted px-3 py-2 rounded-l-md border">
                    <Link className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">{schedulingLink}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-none border-l-0"
                    onClick={copiarLink}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copiar</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-l-none border-l-0"
                    onClick={compartilharLink}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Compartilhar</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="aparencia">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="aparencia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalização</CardTitle>
                <CardDescription>
                  Personalize a aparência da sua página de agendamento.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-salao">Nome do salão</Label>
                  <Input id="nome-salao" defaultValue="Meu Salão de Beleza" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensagem-boas-vindas">Mensagem de boas-vindas</Label>
                  <Input 
                    id="mensagem-boas-vindas" 
                    defaultValue="Bem-vindo ao agendamento do Meu Salão de Beleza." 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="logo-switch">Mostrar logo</Label>
                  <Switch id="logo-switch" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de agendamento</CardTitle>
                <CardDescription>
                  Configure as opções disponíveis para os clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="escolha-profissional">Permitir escolha de profissional</Label>
                  <Switch id="escolha-profissional" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notificacoes-email">Enviar notificações por e-mail</Label>
                  <Switch id="notificacoes-email" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notificacoes-sms">Enviar notificações por SMS</Label>
                  <Switch id="notificacoes-sms" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="lembrete-agendamento">Enviar lembretes de agendamento</Label>
                  <Switch id="lembrete-agendamento" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pré-visualização</CardTitle>
                <CardDescription>
                  Veja como sua página de agendamento aparecerá para os clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="max-w-md w-full bg-background border rounded-md p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">Meu Salão de Beleza</h3>
                    <p className="text-muted-foreground mt-1">Bem-vindo ao agendamento do Meu Salão de Beleza.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="preview-email">E-mail</Label>
                      <Input id="preview-email" placeholder="Seu e-mail" disabled />
                    </div>
                    <Button className="w-full" disabled>Próximo</Button>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-xs text-muted-foreground">
                      Esta é uma prévia de como sua página de agendamento aparecerá para os clientes.
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="outline" onClick={() => window.open(`/agenda/preview`, '_blank')}>
                    Abrir em nova janela
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default LinkAgendamentoPage;
