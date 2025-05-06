
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import PageContainer from '@/components/PageContainer';
import { ArrowRight, Calendar, Clock, Settings, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/signup">
              <Button>Começar Agora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gerencie seu Salão de Beleza com Facilidade
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A plataforma completa para profissionais de beleza gerenciarem agendamentos, 
              clientes e serviços em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-brand-600">
                  Teste Grátis por 7 Dias <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Já tenho uma conta
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <PageContainer>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Tudo o que você precisa para crescer seu negócio
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-brand-400" />}
              title="Agendamento Online"
              description="Seus clientes podem agendar serviços 24/7 através de um link personalizado."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-brand-400" />}
              title="Gestão de Clientes"
              description="Mantenha um cadastro organizado de todos os seus clientes e histórico de serviços."
            />
            <FeatureCard 
              icon={<Settings className="h-10 w-10 text-brand-400" />}
              title="Serviços Personalizados"
              description="Configure seus serviços, preços e duração de acordo com seu negócio."
            />
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-brand-400" />}
              title="Controle de Agenda"
              description="Defina sua disponibilidade e gerencie seus horários com facilidade."
            />
          </div>
        </PageContainer>
      </section>
      
      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <PageContainer>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Planos que cabem no seu bolso
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Escolha o plano ideal para o tamanho do seu negócio
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              title="Básico"
              price="89,90"
              features={[
                "1 profissional",
                "Até 100 agendamentos por mês",
                "Link personalizado para agendamentos",
                "Suporte por email",
              ]}
              buttonText="Começar Trial"
              buttonLink="/signup"
              popular={false}
            />
            <PricingCard 
              title="Profissional"
              price="139,90"
              features={[
                "Até 5 profissionais",
                "Agendamentos ilimitados",
                "Link personalizado para agendamentos",
                "Lembretes por WhatsApp",
                "Suporte prioritário",
              ]}
              buttonText="Começar Trial"
              buttonLink="/signup"
              popular={true}
            />
            <PricingCard 
              title="Empresarial"
              price="269,90"
              features={[
                "Até 15 profissionais",
                "Agendamentos ilimitados",
                "Link personalizado para agendamentos",
                "Lembretes por WhatsApp",
                "Relatórios avançados",
                "Suporte VIP",
              ]}
              buttonText="Começar Trial"
              buttonLink="/signup"
              popular={false}
            />
          </div>
        </PageContainer>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-auto">
        <PageContainer>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo variant="light" className="mb-4" />
              <p className="text-gray-400">
                A plataforma completa para profissionais de beleza gerenciarem seus negócios.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Funcionalidades</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Planos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Preços</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre nós</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Carreiras</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Termos de Serviço</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BeautyBoss. Todos os direitos reservados.</p>
          </div>
        </PageContainer>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  popular?: boolean;
}

const PricingCard = ({ title, price, features, buttonText, buttonLink, popular = false }: PricingCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl overflow-hidden shadow-sm border transition-all hover:shadow-md",
      popular ? "border-brand-400 scale-105 shadow-md" : "border-gray-200"
    )}>
      {popular && (
        <div className="bg-brand-400 text-white text-center py-2 font-medium">
          Mais Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold">R$ {price}</span>
          <span className="text-gray-500">/mês</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link to={buttonLink}>
          <Button 
            className={cn(
              "w-full", 
              popular ? "bg-brand-500 hover:bg-brand-600" : ""
            )}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
