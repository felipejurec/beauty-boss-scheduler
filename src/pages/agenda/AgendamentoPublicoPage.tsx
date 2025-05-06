
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePicker } from '@/components/DatePicker';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Step components
const BemVindoStep = ({ email, setEmail, onNext }: { email: string, setEmail: (email: string) => void, onNext: () => void }) => {
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Bem-vindo ao agendamento</CardTitle>
        <CardDescription>
          Para começar, digite seu e-mail abaixo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu-email@exemplo.com" 
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={!isValid}
          onClick={onNext}
        >
          Próximo
        </Button>
      </CardFooter>
    </>
  );
};

const CadastroStep = ({ 
  nome, 
  setNome, 
  telefone, 
  setTelefone, 
  onNext, 
  onBack 
}: { 
  nome: string, 
  setNome: (nome: string) => void, 
  telefone: string, 
  setTelefone: (telefone: string) => void, 
  onNext: () => void,
  onBack: () => void
}) => {
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    setIsValid(nome.length >= 3 && telefone.length >= 8);
  };

  React.useEffect(() => {
    validateForm();
  }, [nome, telefone]);

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Cadastro rápido</CardTitle>
        <CardDescription>
          Preencha seus dados para continuar com o agendamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input 
              id="nome" 
              placeholder="Seu nome completo" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input 
              id="telefone" 
              placeholder="(00) 00000-0000" 
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button disabled={!isValid} onClick={onNext}>
          Próximo
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};

const ServicosStep = ({ 
  servicoSelecionado, 
  setServicoSelecionado, 
  onNext, 
  onBack 
}: { 
  servicoSelecionado: string | null, 
  setServicoSelecionado: (servico: string) => void, 
  onNext: () => void,
  onBack: () => void
}) => {
  // Mock de serviços
  const servicos = [
    { id: '1', nome: 'Corte de Cabelo', preco: 50, duracao: 30 },
    { id: '2', nome: 'Coloração', preco: 120, duracao: 90 },
    { id: '3', nome: 'Manicure', preco: 40, duracao: 45 },
    { id: '4', nome: 'Pedicure', preco: 50, duracao: 45 },
    { id: '5', nome: 'Design de Sobrancelhas', preco: 35, duracao: 30 },
    { id: '6', nome: 'Maquiagem', preco: 80, duracao: 60 },
  ];

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Escolha o serviço</CardTitle>
        <CardDescription>
          Selecione o serviço que deseja agendar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {servicos.map((servico) => (
            <div 
              key={servico.id} 
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                servicoSelecionado === servico.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
              }`}
              onClick={() => setServicoSelecionado(servico.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{servico.nome}</h3>
                  <p className="text-sm text-muted-foreground">{servico.duracao} min</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">R$ {servico.preco}</span>
                  {servicoSelecionado === servico.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button disabled={!servicoSelecionado} onClick={onNext}>
          Próximo
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};

const ProfissionalStep = ({ 
  profissionalSelecionado, 
  setProfissionalSelecionado, 
  onNext, 
  onBack 
}: { 
  profissionalSelecionado: string | null, 
  setProfissionalSelecionado: (profissional: string) => void, 
  onNext: () => void,
  onBack: () => void
}) => {
  // Mock de profissionais
  const profissionais = [
    { id: '1', nome: 'Ana Silva', foto: 'https://i.pravatar.cc/150?img=1', especialidade: 'Cabeleireira' },
    { id: '2', nome: 'Pedro Costa', foto: 'https://i.pravatar.cc/150?img=3', especialidade: 'Colorista' },
    { id: '3', nome: 'Carla Mendes', foto: 'https://i.pravatar.cc/150?img=5', especialidade: 'Manicure' },
    { id: '4', nome: 'João Santos', foto: 'https://i.pravatar.cc/150?img=8', especialidade: 'Barbeiro' },
  ];

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Escolha o profissional</CardTitle>
        <CardDescription>
          Selecione o profissional que realizará o serviço
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profissionais.map((profissional) => (
            <div 
              key={profissional.id} 
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                profissionalSelecionado === profissional.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
              }`}
              onClick={() => setProfissionalSelecionado(profissional.id)}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img 
                    src={profissional.foto} 
                    alt={profissional.nome} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{profissional.nome}</h3>
                  <p className="text-sm text-muted-foreground">{profissional.especialidade}</p>
                </div>
                {profissionalSelecionado === profissional.id && (
                  <div className="ml-auto h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button disabled={!profissionalSelecionado} onClick={onNext}>
          Próximo
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};

const DataHoraStep = ({ 
  dataSelecionada, 
  setDataSelecionada, 
  horarioSelecionado, 
  setHorarioSelecionado, 
  onNext, 
  onBack 
}: { 
  dataSelecionada: Date | undefined, 
  setDataSelecionada: (date: Date | undefined) => void, 
  horarioSelecionado: string | null,
  setHorarioSelecionado: (horario: string) => void,
  onNext: () => void,
  onBack: () => void
}) => {
  // Mock de horários disponíveis
  const horariosDisponiveis = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Escolha a data e horário</CardTitle>
        <CardDescription>
          Selecione quando você deseja agendar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Data</Label>
            <DatePicker
              date={dataSelecionada}
              setDate={setDataSelecionada}
              placeholder="Selecione uma data"
              className="w-full"
            />
          </div>
          
          {dataSelecionada && (
            <div className="space-y-2">
              <Label>Horário</Label>
              <div className="grid grid-cols-3 gap-2">
                {horariosDisponiveis.map((horario) => (
                  <Button
                    key={horario}
                    type="button"
                    variant={horarioSelecionado === horario ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setHorarioSelecionado(horario)}
                  >
                    {horario}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button 
          disabled={!dataSelecionada || !horarioSelecionado} 
          onClick={onNext}
        >
          Próximo
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};

const ConfirmacaoStep = ({ 
  nome,
  email,
  telefone,
  servicoSelecionado,
  profissionalSelecionado,
  dataSelecionada,
  horarioSelecionado,
  onBack,
  onConfirmar
}: { 
  nome: string,
  email: string,
  telefone: string,
  servicoSelecionado: string | null,
  profissionalSelecionado: string | null,
  dataSelecionada: Date | undefined,
  horarioSelecionado: string | null,
  onBack: () => void,
  onConfirmar: () => void
}) => {
  // Mock de serviços e profissionais
  const servicos = {
    '1': { nome: 'Corte de Cabelo', preco: 50 },
    '2': { nome: 'Coloração', preco: 120 },
    '3': { nome: 'Manicure', preco: 40 },
    '4': { nome: 'Pedicure', preco: 50 },
    '5': { nome: 'Design de Sobrancelhas', preco: 35 },
    '6': { nome: 'Maquiagem', preco: 80 },
  };

  const profissionais = {
    '1': { nome: 'Ana Silva' },
    '2': { nome: 'Pedro Costa' },
    '3': { nome: 'Carla Mendes' },
    '4': { nome: 'João Santos' },
  };

  const servicoNome = servicoSelecionado ? servicos[servicoSelecionado as keyof typeof servicos].nome : '';
  const servicoPreco = servicoSelecionado ? servicos[servicoSelecionado as keyof typeof servicos].preco : 0;
  const profissionalNome = profissionalSelecionado ? profissionais[profissionalSelecionado as keyof typeof profissionais].nome : '';
  
  const dataFormatada = dataSelecionada ? 
    new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(dataSelecionada) : '';

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Confirme seu agendamento</CardTitle>
        <CardDescription>
          Verifique os detalhes do seu agendamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cliente</span>
              <span className="font-medium">{nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contato</span>
              <span className="font-medium">{telefone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">E-mail</span>
              <span className="font-medium">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Serviço</span>
              <span className="font-medium">{servicoNome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profissional</span>
              <span className="font-medium">{profissionalNome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data</span>
              <span className="font-medium">{dataFormatada}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Horário</span>
              <span className="font-medium">{horarioSelecionado}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">R$ {servicoPreco.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button onClick={onConfirmar}>
          Confirmar Agendamento
        </Button>
      </CardFooter>
    </>
  );
};

const ConcluidoStep = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-primary/20">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Agendamento concluído!</CardTitle>
        <CardDescription>
          Seu agendamento foi realizado com sucesso.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          Enviamos uma confirmação para o seu e-mail com todos os detalhes.
        </p>
        <p className="text-muted-foreground">
          Lembre-se de chegar 5 minutos antes do horário agendado.
        </p>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button 
          className="w-full" 
          onClick={() => navigate('/agenda/agendar')}
        >
          Fazer novo agendamento
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/')}
        >
          Voltar ao início
        </Button>
      </CardFooter>
    </>
  );
};

const AgendamentoPublicoPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState<string | null>(null);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date>();
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BemVindoStep
            email={email}
            setEmail={setEmail}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <CadastroStep
            nome={nome}
            setNome={setNome}
            telefone={telefone}
            setTelefone={setTelefone}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <ServicosStep
            servicoSelecionado={servicoSelecionado}
            setServicoSelecionado={setServicoSelecionado}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <ProfissionalStep
            profissionalSelecionado={profissionalSelecionado}
            setProfissionalSelecionado={setProfissionalSelecionado}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
          />
        );
      case 5:
        return (
          <DataHoraStep
            dataSelecionada={dataSelecionada}
            setDataSelecionada={setDataSelecionada}
            horarioSelecionado={horarioSelecionado}
            setHorarioSelecionado={setHorarioSelecionado}
            onBack={() => setStep(4)}
            onNext={() => setStep(6)}
          />
        );
      case 6:
        return (
          <ConfirmacaoStep
            nome={nome}
            email={email}
            telefone={telefone}
            servicoSelecionado={servicoSelecionado}
            profissionalSelecionado={profissionalSelecionado}
            dataSelecionada={dataSelecionada}
            horarioSelecionado={horarioSelecionado}
            onBack={() => setStep(5)}
            onConfirmar={() => setStep(7)}
          />
        );
      case 7:
        return (
          <ConcluidoStep />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Meu Salão de Beleza</h1>
          <div className="mt-2 text-center text-sm text-gray-600 flex justify-center gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <span 
                key={i} 
                className={`h-1.5 w-12 rounded-full ${
                  i + 1 === step ? 'bg-primary' : i + 1 < step ? 'bg-primary/50' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="w-full">
          {renderStep()}
        </Card>
      </div>
    </div>
  );
};

export default AgendamentoPublicoPage;
