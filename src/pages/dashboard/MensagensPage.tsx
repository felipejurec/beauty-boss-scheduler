
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MensagensPage = () => {
  // Exemplo de conversas (simulado)
  const conversations = [
    { id: 1, name: 'Maria Silva', lastMessage: 'Olá, gostaria de confirmar meu horário amanhã!', time: '14:30', unread: true },
    { id: 2, name: 'João Santos', lastMessage: 'Obrigado pelo atendimento!', time: '10:15', unread: false },
    { id: 3, name: 'Ana Oliveira', lastMessage: 'Preciso remarcar meu horário', time: '09:45', unread: true },
    { id: 4, name: 'Pedro Costa', lastMessage: 'Até amanhã!', time: 'Ontem', unread: false },
  ];

  // Exemplo de mensagens de uma conversa (simulado)
  const messages = [
    { id: 1, sender: 'other', text: 'Olá, gostaria de confirmar meu horário amanhã!', time: '14:30' },
    { id: 2, sender: 'me', text: 'Olá Maria! Claro, seu horário está confirmado para amanhã às 15h para o serviço de corte.', time: '14:32' },
    { id: 3, sender: 'other', text: 'Perfeito! Obrigada pela confirmação.', time: '14:33' },
    { id: 4, sender: 'me', text: 'Por nada! Estamos à sua disposição.', time: '14:34' },
  ];
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Mensagens</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Conversas</CardTitle>
            <CardDescription>Seus clientes</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className={`flex items-start space-x-4 p-3 rounded-md cursor-pointer ${
                    conversation.id === 1 ? 'bg-brand-50' : 'hover:bg-gray-100'
                  }`}
                >
                  <Avatar>
                    <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{conversation.name}</p>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 flex flex-col h-full">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Maria Silva</CardTitle>
                <CardDescription>Online</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'me' 
                      ? 'bg-brand-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-brand-100' : 'text-gray-500'
                  }`}>{message.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input placeholder="Escreva sua mensagem..." className="flex-1" />
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MensagensPage;
